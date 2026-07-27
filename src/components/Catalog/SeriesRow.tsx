// Ported from the .sg markup for series in the legacy js/render.js render(). The
// bulk checkbox's indeterminate state (some but not all episodes watched) is a DOM
// property with no JSX attribute equivalent, hence the ref + effect. Clicking
// anywhere in .sg-hd toggles open/collapsed except on the bulk checkbox or info
// button — same closest()-based guard the original used via document-level
// delegation, just inlined into this component's own click handler.
import { useEffect, useRef } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import type { Lang, PlatformEntry, SeriesEntry } from '../../data/types';
import { getTitle } from '../../data/localize';
import { t } from '../../i18n';
import { fmt } from '../../utils/format';
import { OptionalBadge, PlatformBadge, SeriesTonightBadge } from './Badges';
import { DisneyPlusLink } from './DisneyPlusLink';
import { StarRating } from './StarRating';
import { SeriesEpisodeList } from './SeriesEpisodeList';

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
  const showDisneyPlusLink = !isFuture && !allDone;
  const bulkCheckboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bulkCheckboxRef.current) {
      bulkCheckboxRef.current.indeterminate = doneCount > 0 && !allDone;
    }
  }, [doneCount, allDone]);

  let sgClassName = 'sg';
  if (isOpen) sgClassName += ' open';
  if (allDone) sgClassName += ' sg-done';
  if (tonightFit) sgClassName += ' tn-fit';
  if (isFuture) sgClassName += ' future';

  const handleHeaderClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('.sg-bulk') || target.closest('.info-btn') || target.closest('.dp-link')) return;
    onToggleOpen();
  };

  return (
    <div className={sgClassName} id={`sg-${entry.id}`}>
      <div className="sg-hd" onClick={handleHeaderClick}>
        <div className="sg-bulk">
          <label>
            <input
              ref={bulkCheckboxRef}
              type="checkbox"
              className="sg-chk"
              checked={allDone}
              disabled={isFuture}
              onChange={(event) => onBulkToggle(event.target.checked)}
            />
            <span className="sq" />
          </label>
        </div>
        <div className="sg-info">
          <div className="sg-name">{title}</div>
          <div className="sg-sub">
            {entry.opt ? <OptionalBadge lang={lang} /> : null}
            {platform ? <PlatformBadge platform={platform} lang={lang} /> : null}
            S{entry.season} · {entry.count} {t(lang, 'episodesAbbrev')} ·{' '}
            <span className="sg-remtxt">
              {doneCount}/{entry.count} · {fmt(remainingMinutes)}
            </span>
            <SeriesTonightBadge lang={lang} />
          </div>
        </div>
        <button type="button" className="info-btn" onClick={onOpenInfo}>
          <span>i</span>
        </button>
        <span className="sg-arr" />
      </div>
      {showDisneyPlusLink ? (
        <div className="dp-row dp-row-sg">
          <DisneyPlusLink href={disneyPlusHref} title={title} onCopied={onCopiedForDisney} />
        </div>
      ) : null}
      <StarRating rating={rating} variant="sg-stars" onRate={onRate} />
      <SeriesEpisodeList
        seriesId={entry.id}
        epMins={entry.epMins}
        isEpisodeWatched={isEpisodeWatched}
        future={isFuture}
        lang={lang}
        onToggleEpisode={onToggleEpisode}
      />
    </div>
  );
}
