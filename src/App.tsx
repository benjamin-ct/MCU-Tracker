// Scaffold for visual verification of the Header components (task in progress: the
// sidebar/catalog/search/modals pieces are built in later steps and wired in here
// incrementally — see PROJET-MCU-TRACKER.md migration plan).
import { useCatalogFilters, useLanguage, useTheme, useWatchProgress } from './hooks';
import { CATALOG, DOOMSDAY_DATE } from './data';
import {
  daysLeft,
  estimateEvenings,
  futurePendingCount,
  nextItem,
  nextUnwatchedEpisodeIndex,
  totals,
} from './utils/compute';
import { isSeries } from './data/types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

function App() {
  const { lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { mode, setMode, sortMode, setSortMode, viewFilter, setViewFilter, tonightMin, stepTonightUp, stepTonightDown } =
    useCatalogFilters();
  const { watchDates, setWatched } = useWatchProgress();

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
      // TODO(#23): auto-collapse the series in the catalog's collapse state once its
      // last episode is checked (cSer.add() in the legacy app).
    } else {
      setWatched(next.id, true);
    }
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
          onSortChange={setSortMode}
          onViewFilterChange={setViewFilter}
          onTonightStepUp={stepTonightUp}
          onTonightStepDown={stepTonightDown}
          // TODO(#23): wire up chapter/series collapse state once the catalog exists.
          onExpandAll={() => {}}
          onCollapseAll={() => {}}
        />
      </div>
    </div>
  );
}

export default App;
