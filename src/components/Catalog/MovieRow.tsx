import {FilmEntry, getMonthNames, getTitle, Lang, PlatformEntry} from '../../data';
import {trWatchedOn} from '../../i18n';
import {fmt, fmtDayMonth} from '../../utils/format';
import {OptionalBadge, PlatformBadge, TonightBadge} from './Badges';
import {DisneyPlusLink} from './DisneyPlusLink';
import styles from './MovieRow.module.css';
import {StarRating} from './StarRating';

interface MovieRowProps {
  entry: FilmEntry;
  lang: Lang;
  isWatched: boolean;
  watchDateIso: string | undefined;
  rating: number;
  tonightFit: boolean;
  isFuture: boolean;
  platform: PlatformEntry | undefined;
  disneyPlusHref: string;
  onToggleWatched: (watched: boolean) => void;
  onRate: (value: number) => void;
  onOpenInfo: () => void;
  onCopiedForDisney: (title: string) => void;
}

export function MovieRow({
  entry,
  lang,
  isWatched,
  watchDateIso,
  rating,
  tonightFit,
  isFuture,
  platform,
  disneyPlusHref,
  onToggleWatched,
  onRate,
  onOpenInfo,
  onCopiedForDisney,
}: MovieRowProps) {
  const title = getTitle(entry, lang);

  const rowClassName = [styles.row, isWatched && styles.done, tonightFit && styles.tnFit, isFuture && styles.future]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rowClassName} id={`r-${entry.id}`}>
      <div className={styles.rowTop}>
        <label>
          <input
            type="checkbox"
            checked={isWatched}
            disabled={isFuture}
            onChange={(event) => onToggleWatched(event.target.checked)}
          />
          <span className="sq" />
          <span className={styles.rt}>
            <span className={styles.rtT}>
              {title}
              {entry.y ? <span className={styles.rtYr}>({entry.y})</span> : null}
            </span>
            {entry.opt || platform ? (
              <span className={styles.rtBadges}>
                {entry.opt ? <OptionalBadge lang={lang} /> : null}
                {platform ? <PlatformBadge platform={platform} lang={lang} /> : null}
              </span>
            ) : null}
            <span className={styles.watchDate}>
              {isWatched && watchDateIso ? trWatchedOn(lang, fmtDayMonth(watchDateIso, getMonthNames(lang))) : ''}
            </span>
          </span>
        </label>
        <button type="button" className="info-btn" onClick={onOpenInfo}>
          <span>i</span>
        </button>
        <span className={styles.rtD}>{fmt(entry.m)}</span>
        <TonightBadge lang={lang} visible={tonightFit}/>
      </div>
      <div className={styles.rowFooter}>
        <div className={styles.dpRow}>
          <div className={styles.dpRowInner}>
            <DisneyPlusLink href={disneyPlusHref} title={title} onCopied={onCopiedForDisney}/>
          </div>
        </div>
        <StarRating rating={rating} containerClassName={styles.stars} onRate={onRate}/>
      </div>
    </div>
  );
}
