import type {Lang} from '../../data/types';
import {t} from '../../i18n';
import {fmtE} from '../../utils/format';
import styles from './SeriesEpisodeList.module.css';

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
                                    onToggleEpisode
                                  }: SeriesEpisodeListProps) {
  return (
    <ul className={styles.epList}>
      {epMins.map((minutes, index) => {
        const watched = isEpisodeWatched(index);
        return (
          <li
            key={index}
            className={watched ? `${styles.epLi} ${styles.done}` : styles.epLi}
            id={`ep-${seriesId}-e${index + 1}`}
          >
            <label>
              <input
                type="checkbox"
                checked={watched}
                disabled={future}
                onChange={(event) => onToggleEpisode(index, event.target.checked)}
              />
              <span className="sq s" />
              <span className={styles.epN}>E{String(index + 1).padStart(2, '0')}</span>
              <span className={styles.epT}>{t(lang, 'episodeWord')} {index + 1}</span>
              <span className={styles.epD}>{fmtE(minutes)}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
