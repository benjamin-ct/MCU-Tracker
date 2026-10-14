// Poster-forward alternative to MovieRow/SeriesRow, used when the sidebar's
// List/Grid toggle (LayoutToggle) is set to "Grille". Deliberately lighter than the
// row views: just enough to browse and mark something watched at a glance (whole
// film, or whole season via the same bulk-toggle semantics as SeriesRow's header
// checkbox). Per-episode toggling, star rating and the Disney+ deep link stay row-only
// — this is a browsing view, not a replacement for the row's full control set.
import type { CatalogEntry, Lang, PlatformEntry } from '../../data';
import type { TmdbRef } from '../../data';
import type { PosterFetchResult } from '../../hooks';
import { OptionalBadge, PlatformBadge } from './Badges';
import styles from './GridCard.module.css';
import { RowPoster } from './RowPoster';

interface GridCardProps {
  entry: CatalogEntry;
  title: string;
  metaText: string;
  lang: Lang;
  isWatched: boolean;
  indeterminate?: boolean;
  isFuture: boolean;
  platform: PlatformEntry | undefined;
  fetchPoster: (tmdbInfo: TmdbRef) => Promise<PosterFetchResult>;
  onToggleWatched: (watched: boolean) => void;
  onOpenInfo: () => void;
}

export function GridCard({
  entry,
  title,
  metaText,
  lang,
  isWatched,
  indeterminate,
  isFuture,
  platform,
  fetchPoster,
  onToggleWatched,
  onOpenInfo,
}: GridCardProps) {
  const cardClassName = [styles.card, isWatched && styles.done, isFuture && styles.future].filter(Boolean).join(' ');

  return (
    <div className={cardClassName}>
      <div className={styles.posterWrap}>
        <RowPoster entry={entry} title={title} fetchPoster={fetchPoster} onClick={onOpenInfo} size="grid" />
        <label className={styles.check}>
          <input
            type="checkbox"
            checked={isWatched}
            disabled={isFuture}
            ref={(el) => {
              if (el) el.indeterminate = Boolean(indeterminate);
            }}
            onChange={(event) => onToggleWatched(event.target.checked)}
          />
          <span className="sq" />
        </label>
        <button type="button" className={`info-btn ${styles.infoBtn}`} onClick={onOpenInfo}>
          <span>i</span>
        </button>
        {platform ? (
          <div className={styles.platformOverlay}>
            <PlatformBadge platform={platform} lang={lang} />
          </div>
        ) : null}
      </div>
      <div className={styles.meta}>
        <div className={styles.title}>{title}</div>
        <div className={styles.sub}>
          <span>{metaText}</span>
          {entry.opt ? <OptionalBadge lang={lang} /> : null}
        </div>
      </div>
    </div>
  );
}
