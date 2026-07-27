// Ported from the <ul class="ep-list"> markup in the legacy js/render.js. Always
// rendered — visibility (display:none unless the ancestor .sg carries .open) is
// CSS-driven, same as the original toggling a class on the ancestor rather than
// conditionally building the list.
import type { Lang } from '../../data/types';
import { t } from '../../i18n';
import { fmtE } from '../../utils/format';

interface SeriesEpisodeListProps {
  seriesId: string;
  epMins: number[];
  isEpisodeWatched: (index: number) => boolean;
  future: boolean;
  lang: Lang;
  onToggleEpisode: (index: number, watched: boolean) => void;
}

export function SeriesEpisodeList({
  seriesId,
  epMins,
  isEpisodeWatched,
  future,
  lang,
  onToggleEpisode,
}: SeriesEpisodeListProps) {
  return (
    <ul className="ep-list">
      {epMins.map((minutes, index) => {
        const watched = isEpisodeWatched(index);
        return (
          <li key={index} className={watched ? 'ep-li done' : 'ep-li'} id={`ep-${seriesId}-e${index + 1}`}>
            <label>
              <input
                type="checkbox"
                checked={watched}
                disabled={future}
                onChange={(event) => onToggleEpisode(index, event.target.checked)}
              />
              <span className="sq s" />
              <span className="ep-n">E{String(index + 1).padStart(2, '0')}</span>
              <span className="ep-t">
                {t(lang, 'episodeWord')} {index + 1}
              </span>
              <span className="ep-d">{fmtE(minutes)}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
