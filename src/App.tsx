// Assembles the full app: Header, Sidebar, Catalog, Search, Modals, Toast, Footer.
import {useEffect, useMemo, useRef, useState} from 'react';

import {Catalog} from './components/Catalog';
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import {InfoModal, StatsModal} from './components/Modals';
import {SearchBox} from './components/Search';
import {Sidebar} from './components/Sidebar';
import {Toast} from './components/Toast';
import type {SeriesEntry, SortMode} from './data';
import {CATALOG, DOOMSDAY_DATE, getTitle, isFuture, isSeries} from './data';
import {
  useCatalogFilters,
  useCollapseState,
  useLanguage,
  usePlatformDeepLink,
  usePwaIcon,
  useTheme,
  useTmdbPoster,
  useToast,
  useWatchProgress,
} from './hooks';
import {t, trCopiedForDisney} from './i18n';
import {
  cnt,
  daysLeft,
  estimateEvenings,
  futurePendingCount,
  isEntryFullyWatched,
  nextItem,
  nextUnwatchedEpisodeIndex,
  totals,
} from './utils/compute';
import {groupKeyFor, groupsFor, visibleGroups} from './utils/groups';

const SERIES_IDS = CATALOG.filter(isSeries).map((entry) => entry.id);

// Surprise-pick timing: wait for the collapse/scroll layout to settle before scrolling
// to the picked row, then keep the highlight pulse on for a few seconds.
const SURPRISE_SCROLL_DELAY_MS = 120;
const SURPRISE_HIGHLIGHT_MS = 3600;
// Disney+ copy toast truncates long titles so the toast stays one line.
const DISNEY_TOAST_MAX_LEN = 26;

function App() {
  const { lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const disneyPlusHref = usePlatformDeepLink();
  usePwaIcon();
  const {
    mode,
    setMode,
    sortMode,
    setSortMode,
    viewFilter,
    setViewFilter,
    searchQuery,
    setSearchQuery,
    tonightMin,
    stepTonightUp,
    stepTonightDown,
  } = useCatalogFilters();
  const {watchDates, ratings, setWatched, setManyWatched, toggleRating, resetProgress, importProgress} =
    useWatchProgress();
  const {fetchPoster} = useTmdbPoster();
  const { message: toastMessage, visible: toastVisible, showToast } = useToast();

  // Chapters start open, series start collapsed — matches cGroup/cSer's initial state
  // in the legacy js/state.js.
  const chapterCollapse = useCollapseState();
  const seriesCollapse = useCollapseState(SERIES_IDS);

  const [openInfoEntryId, setOpenInfoEntryId] = useState<string | null>(null);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const openInfoEntry = openInfoEntryId ? (CATALOG.find((entry) => entry.id === openInfoEntryId) ?? null) : null;

  // Tracks whether a search was already active, so chapters/series only auto-expand
  // at the MOMENT a search starts (not on every keystroke) — matches wasSearching in
  // the legacy js/app.js.
  const wasSearchingRef = useRef(false);

  // Pending surprise-pick timers, cleared on unmount so a late scroll/highlight can't
  // touch the DOM after the app is gone. We intentionally read the ref's live value in
  // cleanup (not a mount-time snapshot): the timers are pushed later by handleSurprise,
  // long after this effect runs once.
  const surpriseTimersRef = useRef<number[]>([]);
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      surpriseTimersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  // Derived catalog computations only depend on watchDates/mode (and, for the visible
  // count, the active sort/search/view filters) — memoized so a keystroke elsewhere or
  // an unrelated re-render doesn't re-walk the whole catalog each time.
  const stats = useMemo(() => totals(CATALOG, watchDates, mode), [watchDates, mode]);
  const percentComplete = stats.totalMinutes > 0 ? Math.round((stats.watchedMinutes / stats.totalMinutes) * 100) : 0;
  const eveningsRemaining = useMemo(() => estimateEvenings(stats.remainingUnitDurations), [stats.remainingUnitDurations]);
  const days = useMemo(() => daysLeft(DOOMSDAY_DATE), []);
  const pendingCount = useMemo(() => futurePendingCount(CATALOG, watchDates, mode), [watchDates, mode]);
  const totalVisibleCount = useMemo(
    () => visibleGroups(CATALOG, sortMode, mode, searchQuery, viewFilter, watchDates).totalVisibleCount,
    [sortMode, mode, searchQuery, viewFilter, watchDates],
  );

  const next = useMemo(() => nextItem(CATALOG, watchDates, mode), [watchDates, mode]);
  const nextEpisodeIndex = next && isSeries(next) ? nextUnwatchedEpisodeIndex(next, watchDates) : -1;

  const handleMarkNext = () => {
    if (!next) return;
    if (isSeries(next)) {
      // Recompute from the current watchDates rather than trusting the render-time
      // nextEpisodeIndex, so a rapid double-click can't mark a stale episode.
      const episodeIndex = nextUnwatchedEpisodeIndex(next, watchDates);
      if (episodeIndex < 0) return;
      setWatched(`${next.id}-e${episodeIndex + 1}`, true);
      if (episodeIndex === next.count - 1) seriesCollapse.setKeyCollapsed(next.id, true);
    } else {
      setWatched(next.id, true);
    }
  };

  const handleSortChange = (nextSortMode: SortMode) => {
    setSortMode(nextSortMode);
    chapterCollapse.expandAll();
  };

  const handleExpandAll = () => {
    chapterCollapse.expandAll();
    seriesCollapse.expandAll();
  };

  const handleCollapseAll = () => {
    chapterCollapse.collapseKeys(groupsFor(CATALOG, sortMode).map((group) => group.key));
    seriesCollapse.collapseKeys(SERIES_IDS);
  };

  const handleBulkToggleSeries = (entry: SeriesEntry, watched: boolean) => {
    setManyWatched(
      entry.epMins.map((_, index) => `${entry.id}-e${index + 1}`),
      watched,
    );
    if (watched) seriesCollapse.setKeyCollapsed(entry.id, true);
  };

  const handleSearchChange = (rawQuery: string) => {
    const isSearchingNow = rawQuery.trim().length > 0;
    if (isSearchingNow && !wasSearchingRef.current) {
      chapterCollapse.expandAll();
      seriesCollapse.expandAll();
    }
    wasSearchingRef.current = isSearchingNow;
    setSearchQuery(rawQuery);
  };

  const handleCopiedForDisney = (title: string) => {
    const short = title.length > DISNEY_TOAST_MAX_LEN ? `${title.slice(0, DISNEY_TOAST_MAX_LEN - 1)}…` : title;
    showToast(trCopiedForDisney(lang, short));
  };

  const handleSurprise = () => {
    const pool = CATALOG.filter((entry) => {
      if (!cnt(entry, mode) || isFuture(entry.id)) return false;
      return !isEntryFullyWatched(entry, watchDates);
    });
    if (!pool.length) {
      showToast(t(lang, 'surpriseNoneLeft'));
      return;
    }
    const pick = pool[Math.floor(Math.random() * pool.length)];
    chapterCollapse.setKeyCollapsed(groupKeyFor(pick, sortMode), false);
    if (pick.type === 's') seriesCollapse.setKeyCollapsed(pick.id, false);
    if (searchQuery.trim()) {
      wasSearchingRef.current = false;
      setSearchQuery('');
    }
    const elementId = pick.type === 'f' ? `r-${pick.id}` : `sg-${pick.id}`;
    const scrollTimer = window.setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('highlight-pulse');
        const clearTimer = window.setTimeout(() => el.classList.remove('highlight-pulse'), SURPRISE_HIGHLIGHT_MS);
        surpriseTimersRef.current.push(clearTimer);
      }
    }, SURPRISE_SCROLL_DELAY_MS);
    surpriseTimersRef.current.push(scrollTimer);
    showToast(`🎲 ${getTitle(pick, lang)}`);
  };

  return (
    <div className="w">
      <Header
        lang={lang}
        sortMode={sortMode}
        theme={theme}
        mode={mode}
        onToggleLang={toggleLang}
        onToggleTheme={toggleTheme}
        onModeChange={setMode}
        remainingMinutes={stats.remainingMinutes}
        watchedMinutes={stats.watchedMinutes}
        percentComplete={percentComplete}
        eveningsRemaining={eveningsRemaining}
        daysLeft={days}
        futurePendingCount={pendingCount}
      />
      <div className="blayout">
        <Sidebar
          lang={lang}
          next={next}
          nextEpisodeIndex={nextEpisodeIndex}
          tonightMin={tonightMin}
          futurePendingCount={pendingCount}
          sortMode={sortMode}
          viewFilter={viewFilter}
          onMarkNext={handleMarkNext}
          onSurprise={handleSurprise}
          onOpenStats={() => setStatsModalOpen(true)}
          onSortChange={handleSortChange}
          onViewFilterChange={setViewFilter}
          onTonightStepUp={stepTonightUp}
          onTonightStepDown={stepTonightDown}
          onExpandAll={handleExpandAll}
          onCollapseAll={handleCollapseAll}
        />
        <div className="mcol">
          <SearchBox
            searchQuery={searchQuery}
            resultCount={totalVisibleCount}
            lang={lang}
            onSearchChange={handleSearchChange}
          />
          <Catalog
            catalog={CATALOG}
            lang={lang}
            sortMode={sortMode}
            mode={mode}
            searchQuery={searchQuery}
            viewFilter={viewFilter}
            tonightMin={tonightMin}
            watchDates={watchDates}
            ratings={ratings}
            isChapterCollapsed={chapterCollapse.isCollapsed}
            onToggleChapter={chapterCollapse.toggle}
            isSeriesCollapsed={seriesCollapse.isCollapsed}
            onToggleSeries={seriesCollapse.toggle}
            disneyPlusHrefFor={() => disneyPlusHref}
            onSetWatched={setWatched}
            onRate={toggleRating}
            onOpenInfo={setOpenInfoEntryId}
            onCopiedForDisney={handleCopiedForDisney}
            onBulkToggleSeries={handleBulkToggleSeries}
          />
          <Footer
            lang={lang}
            watchDates={watchDates}
            ratings={ratings}
            mode={mode}
            onResetProgress={resetProgress}
            onImportData={(data) => {
              importProgress(data);
              if (data.mode) setMode(data.mode);
            }}
            onToast={showToast}
          />
        </div>
      </div>
      <InfoModal
        entry={openInfoEntry}
        lang={lang}
        onClose={() => setOpenInfoEntryId(null)}
        fetchPoster={fetchPoster}
        onPosterError={showToast}
      />
      <StatsModal
        open={statsModalOpen}
        onClose={() => setStatsModalOpen(false)}
        catalog={CATALOG}
        watchDates={watchDates}
        ratings={ratings}
        mode={mode}
        lang={lang}
      />
      <Toast message={toastMessage} visible={toastVisible} />
    </div>
  );
}

export default App;
