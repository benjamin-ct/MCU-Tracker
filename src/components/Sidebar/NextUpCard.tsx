import type {CatalogEntry, Lang} from '../../data/types';
import {isFilm} from '../../data/types';
import {getTitle} from '../../data/localize';
import {t, trUpNextEmptyFuture} from '../../i18n';
import {fmt, fmtE} from '../../utils/format';
import styles from './NextUpCard.module.css';

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
    <div className={styles.prochain}>
      <div className={!next ? `${styles.prox} ${styles.done}` : styles.prox}>
        <div className={styles.proxL}>
          <div className={styles.proxEye}>{t(lang, 'upNextLbl')}</div>
          <div className={styles.proxTitle}>{title}</div>
          {sub && (
            <div className={styles.proxSub}>
              {sub}
              {fitsTonight && (
                <span className={styles.tonightHint}> · {t(lang, 'tonightFitsInline')}</span>
              )}
            </div>
          )}
        </div>
        {button && (
          <button type="button" className={styles.proxBtn} onClick={onMarkNext}>
            {button}
          </button>
        )}
      </div>
    </div>
  );
}
