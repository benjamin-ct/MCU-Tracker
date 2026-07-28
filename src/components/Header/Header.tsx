import type {Lang, Mode, SortMode} from '../../data';
import type {Theme} from '../../hooks';
import {BrandBar} from './BrandBar';
import {DoomsdayCountdown} from './DoomsdayCountdown';
import styles from './Header.module.css';
import {ModeToggle} from './ModeToggle';
import {ProgressStrip} from './ProgressStrip';
import {StatsChips} from './StatsChips';

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
    <div className={styles.top}>
      <BrandBar
        lang={lang}
        sortMode={sortMode}
        theme={theme}
        onToggleLang={onToggleLang}
        onToggleTheme={onToggleTheme}
      />
      <ProgressStrip percentComplete={percentComplete} />
      <div className={styles.hdRow}>
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
