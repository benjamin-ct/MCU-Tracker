// Ported from the .cdwn element in the legacy index.html + updateCountdown()
// (js/render.js). The i18n helpers now return React nodes (i18n/richText.tsx) instead
// of HTML strings, so the countdown message is rendered as plain JSX children — no
// dangerouslySetInnerHTML anywhere.
import type { ReactNode } from 'react';

import type { Lang } from '../../data';
import { useCountdown } from '../../hooks';
import { trAllWatchedFuturePending, trDoomsdayHere, trDoomsdayPace, trMarathonDoneReady } from '../../i18n';
import { fmt } from '../../utils/format';
import styles from './DoomsdayCountdown.module.css';

interface DoomsdayCountdownProps {
  remainingMinutes: number;
  doomsdayDate: Date;
  futurePendingCount: number;
  lang: Lang;
}

const DAY_UNIT: Record<Lang, string> = { fr: 'j', en: 'd' };

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export function DoomsdayCountdown({
  remainingMinutes,
  doomsdayDate,
  futurePendingCount,
  lang,
}: DoomsdayCountdownProps) {
  // Ticks every second — see useCountdown for why this replaced a once-computed value.
  const { days, hours, minutes, seconds, totalMs } = useCountdown(doomsdayDate);
  // Whole days remaining, rounded up (1h left still counts as "1 day to go"), matching
  // the previous daysLeft() semantics used for the pace math below.
  const daysLeftCeil = Math.max(0, Math.ceil(totalMs / 86400000));

  let message: ReactNode;
  if (remainingMinutes === 0) {
    message = futurePendingCount > 0 ? trAllWatchedFuturePending(lang, futurePendingCount) : trMarathonDoneReady(lang);
  } else if (totalMs <= 0) {
    message = trDoomsdayHere(lang);
  } else {
    const minutesPerDay = remainingMinutes / daysLeftCeil;
    const isHeavyPace = minutesPerDay > 120;
    message = trDoomsdayPace(lang, fmt(Math.ceil(minutesPerDay)), isHeavyPace);
  }

  return (
    <div className={styles.cdwn}>
      <span className={styles.icon}>🎬</span>
      <span className={styles.txt}>{message}</span>
      <span className={styles.days}>
        {totalMs > 0 ? `${days}${DAY_UNIT[lang]} ${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}` : `00:00:00`}
      </span>
    </div>
  );
}
