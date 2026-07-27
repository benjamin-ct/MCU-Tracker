// Ported from the .row markup for films in the legacy js/render.js render(). The
// Disney+ link disappears once watched (or if not yet released), and the watch-date
// pill is always rendered but CSS-hides unless the row carries .done (matching the
// original exactly, including the height/line-height fixes from the pixel-shift fix
// verified on 2026-07-27 — see src/index.css .row-top/.rt-t/.watch-date comments).
import type { FilmEntry, Lang, PlatformEntry } from '../../data/types';
import { getTitle, getMonthNames } from '../../data/localize';
import { trWatchedOn } from '../../i18n';
import { fmt, fmtDayMonth } from '../../utils/format';
import { OptionalBadge, PlatformBadge, TonightBadge } from './Badges';
import { DisneyPlusLink } from './DisneyPlusLink';
import { StarRating } from './StarRating';

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
  const showDisneyPlusLink = !isFuture && !isWatched;

  let rowClassName = 'row';
  if (isWatched) rowClassName += ' done';
  if (tonightFit) rowClassName += ' tn-fit';
  if (isFuture) rowClassName += ' future';

  return (
    <div className={rowClassName} id={`r-${entry.id}`}>
      <div className="row-top">
        <label>
          <input
            type="checkbox"
            checked={isWatched}
            disabled={isFuture}
            onChange={(event) => onToggleWatched(event.target.checked)}
          />
          <span className="sq" />
          <span className="rt">
            <span className="rt-t">
              {title}
              {entry.y ? <span className="rt-yr">({entry.y})</span> : null}
            </span>
            {entry.opt || platform ? (
              <span className="rt-badges">
                {entry.opt ? <OptionalBadge lang={lang} /> : null}
                {platform ? <PlatformBadge platform={platform} lang={lang} /> : null}
              </span>
            ) : null}
            <span className="watch-date">
              {isWatched && watchDateIso ? trWatchedOn(lang, fmtDayMonth(watchDateIso, getMonthNames(lang))) : ''}
            </span>
          </span>
        </label>
        <button type="button" className="info-btn" onClick={onOpenInfo}>
          <span>i</span>
        </button>
        <span className="rt-d">{fmt(entry.m)}</span>
        <TonightBadge lang={lang} />
      </div>
      {showDisneyPlusLink ? (
        <div className="dp-row">
          <DisneyPlusLink href={disneyPlusHref} title={title} onCopied={onCopiedForDisney} />
        </div>
      ) : null}
      <StarRating rating={rating} variant="stars" onRate={onRate} />
    </div>
  );
}
