// Ported from the .cdwn element in the legacy index.html + updateCountdown()
// (js/render.js). The i18n helpers now return React nodes (i18n/richText.tsx) instead
// of HTML strings, so the countdown message is rendered as plain JSX children — no
// dangerouslySetInnerHTML anywhere.
import type {ReactNode} from 'react';

import type {Lang} from '../../data';
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
  let message: ReactNode;
  if (remainingMinutes === 0) {
    message = futurePendingCount > 0 ? trAllWatchedFuturePending(lang, futurePendingCount) : trMarathonDoneReady(lang);
  } else if (daysLeft <= 0) {
    message = trDoomsdayHere(lang);
  } else {
    const minutesPerDay = remainingMinutes / daysLeft;
    const isHeavyPace = minutesPerDay > 120;
    message = trDoomsdayPace(lang, fmt(Math.ceil(minutesPerDay)), isHeavyPace);
  }

  return (
    <div className={styles.cdwn}>
      <span className={styles.icon}>🎬</span>
      <span className={styles.txt}>{message}</span>
      <span className={styles.days}>{daysLeft}j</span>
    </div>
  );
}
