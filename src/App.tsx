// Assembles the full app: Header, Sidebar, Catalog, Search, Modals, Toast, Footer.
import { useRef, useState } from 'react';
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
import { CATALOG, DOOMSDAY_DATE } from './data';
import { getTitle } from './data/localize';
import { isFuture } from './data/platform';
import {
  cnt,
  daysLeft,
  estimateEvenings,
  futurePendingCount,
  isWatched,
  nextItem,
  nextUnwatchedEpisodeIndex,
  sDone,
  totals,
} from './utils/compute';
import { groupKeyFor, groupsFor, visibleGroups } from './utils/groups';
import { isSeries } from './data/types';
import type { CatalogEntry, SeriesEntry, SortMode } from './data/types';
import { t, trCopiedForDisney } from './i18n';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Catalog } from './components/Catalog';
import { InfoModal, StatsModal, TmdbKeyModal } from './components/Modals';
import { SearchBox } from './components/Search';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

const SERIES_IDS = CATALOG.filter(isSeries).map((entry) => entry.id);

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
  const { watchDates, ratings, setWatched, toggleRating, resetProgress, importProgress } = useWatchProgress();
  const { tmdbKey, setTmdbKey, clearTmdbKey, fetchPoster } = useTmdbPoster();
  const { message: toastMessage, visible: toastVisible, showToast } = useToast();

  // Chapters start open, series start collapsed — matches cGroup/cSer's initial state
  // in the legacy js/state.js.
  const chapterCollapse = useCollapseState();
  const seriesCollapse = useCollapseState(SERIES_IDS);

  const [openInfoEntryId, setOpenInfoEntryId] = useState<string | null>(null);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [tmdbModalOpen, setTmdbModalOpen] = useState(false);
  const openInfoEntry = openInfoEntryId ? CATALOG.find((entry) => entry.id === openInfoEntryId) ?? null : null;

  // Tracks whether a search was already active, so chapters/series only auto-expand
  // at the MOMENT a search starts (not on every keystroke) — matches wasSearching in
  // the legacy js/app.js.
  const wasSearchingRef = useRef(false);

  const stats = totals(CATALOG, watchDates, mode);
  const percentComplete = stats.t > 0 ? Math.round((stats.w / stats.t) * 100) : 0;
  const eveningsRemaining = estimateEvenings(stats.remUnits, 150);
  const days = daysLeft(DOOMSDAY_DATE);
  const pendingCount = futurePendingCount(CATALOG, watchDates, mode);
  const { totalVisibleCount } = visibleGroups(CATALOG, sortMode, mode, searchQuery, viewFilter, watchDates);

  const next = nextItem(CATALOG, watchDates, mode);
  const nextEpisodeIndex = next && isSeries(next) ? nextUnwatchedEpisodeIndex(next, watchDates) : -1;

  const handleMarkNext = () => {
    if (!next) return;
    if (isSeries(next)) {
      if (nextEpisodeIndex < 0) return;
      setWatched(`${next.id}-e${nextEpisodeIndex + 1}`, true);
      if (nextEpisodeIndex === next.count - 1) seriesCollapse.setKeyCollapsed(next.id, true);
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
    entry.epMins.forEach((_, index) => setWatched(`${entry.id}-e${index + 1}`, watched));
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
    const short = title.length > 26 ? `${title.slice(0, 25)}…` : title;
    showToast(trCopiedForDisney(lang, short));
  };

  const handleSurprise = () => {
    const pool = CATALOG.filter((entry) => {
      if (!cnt(entry, mode) || isFuture(entry.id)) return false;
      return entry.type === 'f' ? !isWatched(watchDates, entry.id) : sDone(entry, watchDates) < entry.count;
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
    window.setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('highlight-pulse');
        window.setTimeout(() => el.classList.remove('highlight-pulse'), 3600);
      }
    }, 120);
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
        remainingMinutes={stats.r}
        watchedMinutes={stats.w}
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
          <SearchBox searchQuery={searchQuery} resultCount={totalVisibleCount} lang={lang} onSearchChange={handleSearchChange} />
          <Catalog
            catalog={CATALOG as CatalogEntry[]}
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
            onOpenTmdbModal={() => setTmdbModalOpen(true)}
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
        catalog={CATALOG as CatalogEntry[]}
        watchDates={watchDates}
        ratings={ratings}
        mode={mode}
        lang={lang}
      />
      <TmdbKeyModal
        open={tmdbModalOpen}
        tmdbKey={tmdbKey}
        lang={lang}
        onClose={() => setTmdbModalOpen(false)}
        onSave={(key) => {
          setTmdbKey(key);
          showToast(t(lang, key ? 'tmdbKeySaved' : 'tmdbKeyRemoved'));
        }}
        onClear={() => {
          clearTmdbKey();
          showToast(t(lang, 'tmdbKeyRemoved'));
        }}
      />
      <Toast message={toastMessage} visible={toastVisible} />
    </div>
  );
}

export default App;
