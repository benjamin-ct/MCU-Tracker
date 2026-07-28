// Ported from the .cdwn element in the legacy index.html + updateCountdown()
// (js/render.js). The tr*() i18n helpers return HTML strings (embedded <b>/<span
// class="ok|warn">) rather than plain text, so this is one of the few places that
// still needs dangerouslySetInnerHTML — everything rendered here is internally
// generated (static translations + formatted numbers), never user input.
import type {Lang} from '../../data/types';
import {trAllWatchedFuturePending, trDoomsdayHere, trDoomsdayPace, trMarathonDoneReady} from '../../i18n';
import {fmt} from '../../utils/format';
import styles from './DoomsdayCountdown.module.css';

interface DoomsdayCountdownProps {
  remainingMinutes: number;
  daysLeft: number;
  futurePendingCount: number;
  lang: Lang;
}

export function DoomsdayCountdown({ remainingMinutes, daysLeft, futurePendingCount, lang }: DoomsdayCountdownProps) {
  let html: string;
  if (remainingMinutes === 0) {
    html = futurePendingCount > 0
      ? trAllWatchedFuturePending(lang, futurePendingCount)
      : trMarathonDoneReady(lang);
  } else if (daysLeft <= 0) {
    html = trDoomsdayHere(lang);
  } else {
    const minutesPerDay = remainingMinutes / daysLeft;
    const isHeavyPace = minutesPerDay > 120;
    html = trDoomsdayPace(lang, fmt(Math.ceil(minutesPerDay)), isHeavyPace ? 'warn' : 'ok', isHeavyPace ? '⚡' : '✓');
  }

  return (
    <div className={styles.cdwn}>
      <span className={styles.icon}>🎬</span>
      <span className={styles.txt} dangerouslySetInnerHTML={{__html: html}}/>
      <span className={styles.days}>{daysLeft}j</span>
    </div>
  );
}
