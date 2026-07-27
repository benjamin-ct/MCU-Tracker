// Scaffold for visual verification of the Header components (task in progress: the
// sidebar/catalog/search/modals pieces are built in later steps and wired in here
// incrementally — see PROJET-MCU-TRACKER.md migration plan).
import { useCatalogFilters, useLanguage, useTheme, useWatchProgress } from './hooks';
import { CATALOG, DOOMSDAY_DATE } from './data';
import { daysLeft, estimateEvenings, futurePendingCount, totals } from './utils/compute';
import { Header } from './components/Header';

function App() {
  const { lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { mode, setMode, sortMode } = useCatalogFilters();
  const { watchDates } = useWatchProgress();

  const stats = totals(CATALOG, watchDates, mode);
  const percentComplete = stats.t > 0 ? Math.round((stats.w / stats.t) * 100) : 0;
  const eveningsRemaining = estimateEvenings(stats.remUnits, 150);
  const days = daysLeft(DOOMSDAY_DATE);
  const pendingCount = futurePendingCount(CATALOG, watchDates, mode);

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
    </div>
  );
}

export default App;
