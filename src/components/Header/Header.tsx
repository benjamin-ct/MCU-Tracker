// Composes the 5 header pieces into the sticky .top bar from the legacy index.html —
// a straight 1:1 structural port, only the pieces are now components instead of one
// big imperative render() pass over hand-built DOM.
import type {Lang, Mode, SortMode} from '../../data';
import type {Theme} from '../../hooks';
import {BrandBar} from './BrandBar';
import {ProgressStrip} from './ProgressStrip';
import {StatsChips} from './StatsChips';
import {DoomsdayCountdown} from './DoomsdayCountdown';
import {ModeToggle} from './ModeToggle';

interface HeaderProps {
  lang: Lang;
  sortMode: SortMode;
  theme: Theme;
  mode: Mode;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onModeChange: (mode: Mode) => void;
  remainingMinutes: number;
  watchedMinutes: number;
  percentComplete: number;
  eveningsRemaining: number;
  daysLeft: number;
  futurePendingCount: number;
}

export function Header({
  lang,
  sortMode,
  theme,
  mode,
  onToggleLang,
  onToggleTheme,
  onModeChange,
  remainingMinutes,
  watchedMinutes,
  percentComplete,
  eveningsRemaining,
  daysLeft,
  futurePendingCount,
}: HeaderProps) {
  return (
    <div className="top">
      <BrandBar lang={lang} sortMode={sortMode} theme={theme} onToggleLang={onToggleLang} onToggleTheme={onToggleTheme} />
      <ProgressStrip percentComplete={percentComplete} />
      <div className="hd-row">
        <StatsChips
          remainingMinutes={remainingMinutes}
          watchedMinutes={watchedMinutes}
          percentComplete={percentComplete}
          eveningsRemaining={eveningsRemaining}
          lang={lang}
        />
        <DoomsdayCountdown
          remainingMinutes={remainingMinutes}
          daysLeft={daysLeft}
          futurePendingCount={futurePendingCount}
          lang={lang}
        />
      </div>
      <ModeToggle mode={mode} lang={lang} onChange={onModeChange} />
    </div>
  );
}
