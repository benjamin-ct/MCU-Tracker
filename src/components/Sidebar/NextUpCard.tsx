// Ported from the #prochain element in the legacy index.html + updateProchain()
import type {CatalogEntry, Lang} from '../../data/types';
// (js/render.js). Purely presentational: the "next" entry and its unwatched-episode
// index are computed by the caller via nextItem()/nextUnwatchedEpisodeIndex()
// (src/utils/compute.ts), and marking it watched (plus any series auto-collapse once
// its last episode is checked) is delegated to onMarkNext.
import {isFilm} from '../../data/types';
import {getTitle} from '../../data/localize';
import {t, trUpNextEmptyFuture} from '../../i18n';
import {fmt, fmtE} from '../../utils/format';

interface NextUpCardProps {
  next: CatalogEntry | null;
  nextEpisodeIndex: number;
  tonightMin: number;
  futurePendingCount: number;
  lang: Lang;
  onMarkNext: () => void;
}

export function NextUpCard({ next, nextEpisodeIndex, tonightMin, futurePendingCount, lang, onMarkNext }: NextUpCardProps) {
  let title: string;
  let sub: string | null = null;
  let button: string | null = null;

  if (!next) {
    title = futurePendingCount > 0
      ? trUpNextEmptyFuture(lang, futurePendingCount)
      : t(lang, 'marathonDoneNoFuture');
  } else if (isFilm(next)) {
    title = getTitle(next, lang);
    sub = `${next.y ? `(${next.y}) · ` : ''}${fmt(next.m)}`;
    button = t(lang, 'markWatchedBtn');
  } else {
    title = getTitle(next, lang);
    sub = `S${next.season}·E${nextEpisodeIndex + 1} · ${fmtE(next.epMins[nextEpisodeIndex])}`;
    button = t(lang, 'episodeWatchedBtn');
  }

  const fitsTonight = next !== null && tonightMin > 0 &&
    (isFilm(next) ? next.m : next.epMins[nextEpisodeIndex]) <= tonightMin;

  return (
    <div id="prochain">
      <div style={{ padding: '12px 0 0' }}>
        <div className={`prox${!next ? ' done' : ''}`}>
          <div className="prox-l">
            <div className="prox-eye">{t(lang, 'upNextLbl')}</div>
            <div className="prox-title">{title}</div>
            {sub && (
              <div className="prox-sub">
                {sub}
                {fitsTonight && (
                  <span style={{color: 'var(--green)', fontSize: '10px'}}> · {t(lang, 'tonightFitsInline')}</span>
                )}
              </div>
            )}
          </div>
          {button && (
            <button type="button" className="prox-btn" onClick={onMarkNext}>
              {button}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
