import type { MouseEvent as ReactMouseEvent } from 'react';
import { useEffect, useRef } from 'react';

import type { Lang, PlatformEntry, SeriesEntry } from '../../data';
import { getTitle } from '../../data';
import { t } from '../../i18n';
import { fmt } from '../../utils/format';
import { OptionalBadge, PlatformBadge, SeriesTonightBadge } from './Badges';
import { DisneyPlusLink } from './DisneyPlusLink';
import { SeriesEpisodeList } from './SeriesEpisodeList';
import styles from './SeriesRow.module.css';
import { StarRating } from './StarRating';

interface SeriesRowProps {
  entry: SeriesEntry;
  lang: Lang;
  isEpisodeWatched: (index: number) => boolean;
  doneCount: number;
  remainingMinutes: number;
  isOpen: boolean;
  tonightFit: boolean;
  isFuture: boolean;
  platform: PlatformEntry | undefined;
  rating: number;
  disneyPlusHref: string;
  onToggleOpen: () => void;
  onToggleEpisode: (index: number, watched: boolean) => void;
  onBulkToggle: (watched: boolean) => void;
  onRate: (value: number) => void;
  onOpenInfo: () => void;
  onCopiedForDisney: (title: string) => void;
}

export function SeriesRow({
  entry,
  lang,
  isEpisodeWatched,
  doneCount,
  remainingMinutes,
  isOpen,
  tonightFit,
  isFuture,
  platform,
  rating,
  disneyPlusHref,
  onToggleOpen,
  onToggleEpisode,
  onBulkToggle,
  onRate,
  onOpenInfo,
  onCopiedForDisney,
}: SeriesRowProps) {
  const title = getTitle(entry, lang);
  const allDone = doneCount === entry.count;
  const bulkCheckboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bulkCheckboxRef.current) {
      bulkCheckboxRef.current.indeterminate = doneCount > 0 && !allDone;
    }
  }, [doneCount, allDone]);

  const sgClassName = [
    styles.sg,
    isOpen && styles.open,
    allDone && styles.sgDone,
    tonightFit && styles.tnFit,
    isFuture && styles.future,
  ]
    .filter(Boolean)
    .join(' ');

  const handleHeaderClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('[data-bulk]') || target.closest('.info-btn') || target.closest('[data-dp-link]')) return;
    onToggleOpen();
  };

  return (
    <div className={sgClassName} id={`sg-${entry.id}`}>
      <div className={styles.sgHd} onClick={handleHeaderClick}>
        <div className={styles.sgBulk} data-bulk>
          <label>
            <input
              ref={bulkCheckboxRef}
              type="checkbox"
              checked={allDone}
              disabled={isFuture}
              onChange={(event) => onBulkToggle(event.target.checked)}
            />
            <span className="sq" />
          </label>
        </div>
        <div className={styles.sgInfo}>
          <div className={styles.sgName}>{title}</div>
          <div className={styles.sgSub}>
            {entry.opt ? <OptionalBadge lang={lang} /> : null}
            {platform ? <PlatformBadge platform={platform} lang={lang} /> : null}S{entry.season} · {entry.count}{' '}
            {t(lang, 'episodesAbbrev')} ·{' '}
            <span className={styles.sgRemtxt}>
              {doneCount}/{entry.count} · {fmt(remainingMinutes)}
            </span>
          </div>
        </div>
        <SeriesTonightBadge lang={lang} visible={tonightFit} />
        <button type="button" className="info-btn" data-info onClick={onOpenInfo}>
          <span>i</span>
        </button>
        <span className={styles.sgArr} />
      </div>
      <div className={styles.sgFooter}>
        <div className={styles.dpRow}>
          <div className={styles.dpRowInner}>
            <DisneyPlusLink href={disneyPlusHref} title={title} onCopied={onCopiedForDisney} />
          </div>
        </div>
        <StarRating rating={rating} containerClassName={styles.sgStars} onRate={onRate} />
      </div>
      {isOpen && (
        <SeriesEpisodeList
          seriesId={entry.id}
          epMins={entry.epMins}
          isEpisodeWatched={isEpisodeWatched}
          future={isFuture}
          lang={lang}
          onToggleEpisode={onToggleEpisode}
        />
      )}
    </div>
  );
}
