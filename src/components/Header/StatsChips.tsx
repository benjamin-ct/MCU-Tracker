// Ported from the .stats element in the legacy index.html + updateStats() (js/render.js).
// Takes already-computed numbers rather than the raw catalog/watchDates, so it stays a
// pure presentation component — totals()/estimateEvenings() (src/utils/compute.ts) run
// once in the parent and get passed down.
import type {Lang} from '../../data/types';
import {t} from '../../i18n';
import styles from './StatsChips.module.css';

interface StatsChipsProps {
  remainingMinutes: number;
  watchedMinutes: number;
  percentComplete: number;
  eveningsRemaining: number;
  lang: Lang;
}

export function StatsChips({
  remainingMinutes,
  watchedMinutes,
  percentComplete,
  eveningsRemaining,
  lang,
}: StatsChipsProps) {
  const remainingHours = Math.floor(remainingMinutes / 60);
  const remainingExtraMinutes = remainingMinutes % 60;

  return (
    <div className={styles.stats}>
      <div className={styles.statL}>
        <div>
          <span className={styles.rnum}>{remainingHours}</span>
          <span className={styles.runit}>
            {remainingExtraMinutes > 0 ? `h${String(remainingExtraMinutes).padStart(2, '0')}` : 'h'}
          </span>
        </div>
        <div className={styles.rlbl}>{t(lang, 'remainingLbl')}</div>
      </div>
      <div className={styles.chips}>
        <span className={styles.chip}>
          <b>{Math.floor(watchedMinutes / 60)}h</b> {t(lang, 'hoursWatchedSuffix')}
        </span>
        <span className={`${styles.chip} ${styles.accent}`}>
          <b>{percentComplete}%</b> {t(lang, 'completedSuffix')}
        </span>
        <span className={styles.chip}>
          ≈<b>{eveningsRemaining}</b> {t(lang, 'eveningsSuffix')}
        </span>
      </div>
    </div>
  );
}
