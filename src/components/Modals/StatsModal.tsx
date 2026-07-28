// Ported from #stat-modal (legacy index.html) + openStats() (legacy js/modals.js).
import {useEffect, useState} from 'react';

import type {CatalogEntry, Lang, Mode} from '../../data';
import {getSectionNames, getTitle} from '../../data';
import {t, trAvgRated} from '../../i18n';
import {totals, type WatchDates} from '../../utils/compute';
import {fmt} from '../../utils/format';
import {buildCumulativeSeries} from '../../utils/stats';
import {CumulativeChart} from './CumulativeChart';
import {Modal} from './Modal';
import modalStyles from './Modal.module.css';
import styles from './StatsModal.module.css';

const WEEK_MS = 7 * 86400000;

function starsString(rating: number): string {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

interface StatsModalProps {
  open: boolean;
  onClose: () => void;
  catalog: CatalogEntry[];
  watchDates: WatchDates;
  ratings: Record<string, number>;
  mode: Mode;
  lang: Lang;
}

export function StatsModal({ open, onClose, catalog, watchDates, ratings, mode, lang }: StatsModalProps) {
  const {totalMinutes, watchedMinutes, remainingMinutes, sections: sectionStats} = totals(catalog, watchDates, mode);
  const percentComplete = totalMinutes > 0 ? Math.round((watchedMinutes / totalMinutes) * 100) : 0;
  const [time, setTime] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const ratedEntries = catalog
    .filter((entry) => ratings[entry.id])
    .map((entry) => ({ title: getTitle(entry, lang), rating: ratings[entry.id] }));
  const topRated = [...ratedEntries].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const averageRating = ratedEntries.length
    ? (ratedEntries.reduce((sum, x) => sum + x.rating, 0) / ratedEntries.length).toFixed(1)
    : '0';

  const weekAgoIso = new Date(time - WEEK_MS).toISOString();
  const watchedThisWeek = Object.values(watchDates).filter((d) => d >= weekAgoIso).length;
  const series = buildCumulativeSeries(catalog, watchDates);
  const sectionNames = getSectionNames(lang);

  return (
    <Modal open={open} onClose={onClose}>
      <div className={modalStyles.modalTop}>
        <span className={modalStyles.modalH2}>{t(lang, 'statsTitle')}</span>
        <button type="button" className={modalStyles.modalClose} onClick={onClose}>
          ✕
        </button>
      </div>
      <div className={styles.sgrid}>
        <div className={styles.scard}>
          <div className={styles.scardV}>{Math.floor(watchedMinutes / 60)}h</div>
          <div className={styles.scardL}>{t(lang, 'timeWatchedLbl')}</div>
        </div>
        <div className={styles.scard}>
          <div className={styles.scardV}>{percentComplete}%</div>
          <div className={styles.scardL}>{t(lang, 'completedLbl2')}</div>
        </div>
        <div className={styles.scard}>
          <div className={styles.scardV}>{Math.floor(remainingMinutes / 60)}h</div>
          <div className={styles.scardL}>{t(lang, 'remainingLbl2')}</div>
        </div>
        <div className={styles.scard}>
          <div className={styles.scardV}>{watchedThisWeek}</div>
          <div className={styles.scardL}>{t(lang, 'thisWeekLbl')}</div>
        </div>
      </div>
      <div className={styles.ssecTitle}>
        {t(lang, 'cumulativeProgressLbl')}{' '}
        {series.length >= 2 ? <span className={styles.hoverHint}>{t(lang, 'hoverChartHint')}</span> : null}
      </div>
      <div className={styles.chartWrap}>
        <CumulativeChart series={series} totalMinutes={totalMinutes} lang={lang} />
      </div>
      <div className={styles.ssecTitle}>{t(lang, 'progressByChapterLbl')}</div>
      {sectionStats.map((section, index) => {
        const percent =
          section.totalMinutes > 0 ? Math.round((section.watchedMinutes / section.totalMinutes) * 100) : 0;
        return (
          <div className={styles.srow} key={index}>
            <div className={styles.srowHd}>
              <span className={styles.srowN}>{sectionNames[index]}</span>
              <span className={styles.srowP}>
                {percent}% · {fmt(section.watchedMinutes)}
              </span>
            </div>
            <div className={styles.sbar}>
              <div className={styles.sbarF} style={{width: `${percent}%`}}/>
            </div>
          </div>
        );
      })}
      {ratedEntries.length > 0 ? (
        <>
          <div className={styles.sttitle}>{trAvgRated(lang, averageRating, ratedEntries.length)}</div>
          {topRated.map((entry, index) => (
            <div className={styles.stopRow} key={index}>
              <span className={styles.stopRank}>{index + 1}</span>
              <span className={styles.stopTitle}>{entry.title}</span>
              <span className={styles.stopStars}>{starsString(entry.rating)}</span>
            </div>
          ))}
        </>
      ) : (
        <div className={styles.sEmpty}>{t(lang, 'rateHint')}</div>
      )}
    </Modal>
  );
}
