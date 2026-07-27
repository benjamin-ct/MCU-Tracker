// Ported from the #prochain element in the legacy index.html + updateProchain()
// (js/render.js). Purely presentational: the "next" entry and its unwatched-episode
// index are computed by the caller via nextItem()/nextUnwatchedEpisodeIndex()
// (src/utils/compute.ts), and marking it watched (plus any series auto-collapse once
// its last episode is checked) is delegated to onMarkNext.
import { isFilm } from '../../data/types';
import type { CatalogEntry, Lang } from '../../data/types';
import { getTitle } from '../../data/localize';
import { t, trUpNextEmptyFuture } from '../../i18n';
import { fmt, fmtE } from '../../utils/format';

interface NextUpCardProps {
  next: CatalogEntry | null;
  nextEpisodeIndex: number;
  tonightMin: number;
  futurePendingCount: number;
  lang: Lang;
  onMarkNext: () => void;
}

export function NextUpCard({ next, nextEpisodeIndex, tonightMin, futurePendingCount, lang, onMarkNext }: NextUpCardProps) {
  if (!next) {
    const message = futurePendingCount > 0 ? trUpNextEmptyFuture(lang, futurePendingCount) : t(lang, 'marathonDoneNoFuture');
    return (
      <div id="prochain">
        <div style={{ padding: '12px 0' }}>
          <div className="prox done">{message}</div>
        </div>
      </div>
    );
  }

  const title = getTitle(next, lang);
  let sub: string;
  let durationLabel: string;
  let buttonLabel: string;
  let unitMinutes: number;

  if (isFilm(next)) {
    sub = next.y ? `(${next.y})` : '';
    durationLabel = fmt(next.m);
    buttonLabel = t(lang, 'markWatchedBtn');
    unitMinutes = next.m;
  } else {
    sub = `S${next.season}·E${nextEpisodeIndex + 1}`;
    durationLabel = fmtE(next.epMins[nextEpisodeIndex]);
    buttonLabel = t(lang, 'episodeWatchedBtn');
    unitMinutes = next.epMins[nextEpisodeIndex];
  }

  const fitsTonight = tonightMin > 0 && unitMinutes <= tonightMin;

  return (
    <div id="prochain">
      <div style={{ padding: '12px 0 0' }}>
        <div className="prox">
          <div className="prox-l">
            <div className="prox-eye">{t(lang, 'upNextLbl')}</div>
            <div className="prox-title">{title}</div>
            <div className="prox-sub">
              {sub ? `${sub} · ` : ''}
              {durationLabel}
              {fitsTonight ? (
                <span style={{ color: 'var(--green)', fontSize: '10px' }}> · {t(lang, 'tonightFitsInline')}</span>
              ) : null}
            </div>
          </div>
          <button type="button" className="prox-btn" onClick={onMarkNext}>
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
