// Scaffold for visual verification (search/toast/modals still land in later tasks —
// see PROJET-MCU-TRACKER.md migration plan). Wires the hooks and components built so
// far: Header, Sidebar, and now Catalog.
import { useCatalogFilters, useCollapseState, useLanguage, useTheme, useWatchProgress } from './hooks';
import { CATALOG, DOOMSDAY_DATE } from './data';
import {
  daysLeft,
  estimateEvenings,
  futurePendingCount,
  nextItem,
  nextUnwatchedEpisodeIndex,
  totals,
} from './utils/compute';
import { groupsFor } from './utils/groups';
import { isSeries } from './data/types';
import type { CatalogEntry, SeriesEntry, SortMode } from './data/types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Catalog } from './components/Catalog';

// Placeholder until task #26 builds the real platform-detection hook (Android intent://
// vs iOS/desktop HTTPS Universal Link) — this is the non-Android default from the
// legacy js/platform.js, so the link still works everywhere in the meantime.
const DISNEY_PLUS_HREF = 'https://www.disneyplus.com/fr-fr/';

const SERIES_IDS = CATALOG.filter(isSeries).map((entry) => entry.id);

function App() {
  const { lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { mode, setMode, sortMode, setSortMode, viewFilter, setViewFilter, searchQuery, tonightMin, stepTonightUp, stepTonightDown } =
    useCatalogFilters();
  const { watchDates, ratings, setWatched, toggleRating } = useWatchProgress();

  // Chapters start open, series start collapsed — matches cGroup/cSer's initial state
  // in the legacy js/state.js.
  const chapterCollapse = useCollapseState();
  const seriesCollapse = useCollapseState(SERIES_IDS);

  const stats = totals(CATALOG, watchDates, mode);
  const percentComplete = stats.t > 0 ? Math.round((stats.w / stats.t) * 100) : 0;
  const eveningsRemaining = estimateEvenings(stats.remUnits, 150);
  const days = daysLeft(DOOMSDAY_DATE);
  const pendingCount = futurePendingCount(CATALOG, watchDates, mode);

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
          // TODO(#25): wire up the surprise-pick and stats-modal actions once those exist.
          onSurprise={() => {}}
          onOpenStats={() => {}}
          onSortChange={handleSortChange}
          onViewFilterChange={setViewFilter}
          onTonightStepUp={stepTonightUp}
          onTonightStepDown={stepTonightDown}
          onExpandAll={handleExpandAll}
          onCollapseAll={handleCollapseAll}
        />
        <div className="mcol">
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
            disneyPlusHrefFor={() => DISNEY_PLUS_HREF}
            onSetWatched={setWatched}
            onRate={toggleRating}
            // TODO(#24): wire up the info modal once it exists.
            onOpenInfo={() => {}}
            // TODO(#25): wire up the toast system once it exists.
            onCopiedForDisney={() => {}}
            onBulkToggleSeries={handleBulkToggleSeries}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
