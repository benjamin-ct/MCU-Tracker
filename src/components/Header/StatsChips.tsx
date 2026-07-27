// Ported from the .stats element in the legacy index.html + updateStats() (js/render.js).
// Takes already-computed numbers rather than the raw catalog/watchDates, so it stays a
// pure presentation component — totals()/estimateEvenings() (src/utils/compute.ts) run
// once in the parent and get passed down.
import type { Lang } from '../../data/types';
import { t } from '../../i18n';

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
    <div className="stats">
      <div className="stat-l">
        <div>
          <span className="rnum">{remainingHours}</span>
          <span className="runit">
            {remainingExtraMinutes > 0 ? `h${String(remainingExtraMinutes).padStart(2, '0')}` : 'h'}
          </span>
        </div>
        <div className="rlbl">{t(lang, 'remainingLbl')}</div>
      </div>
      <div className="chips">
        <span className="chip">
          <b>{Math.floor(watchedMinutes / 60)}h</b> {t(lang, 'hoursWatchedSuffix')}
        </span>
        <span className="chip red">
          <b>{percentComplete}%</b> {t(lang, 'completedSuffix')}
        </span>
        <span className="chip">
          ≈<b>{eveningsRemaining}</b> {t(lang, 'eveningsSuffix')}
        </span>
      </div>
    </div>
  );
}
