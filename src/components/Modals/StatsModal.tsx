// Ported from #stat-modal (legacy index.html) + openStats() (legacy js/modals.js).
import {useEffect, useState} from 'react';
import type {CatalogEntry, Lang, Mode} from '../../data';
import {getSectionNames, getTitle} from '../../data';
import {t, trAvgRated} from '../../i18n';
import {fmt} from '../../utils/format';
import {totals, type WatchDates} from '../../utils/compute';
import {buildCumulativeSeries} from '../../utils/stats';
import {Modal} from './Modal';
import {CumulativeChart} from './CumulativeChart';

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
  const { t: totalMinutes, w: watchedMinutes, r: remainingMinutes, ps: sectionStats } = totals(catalog, watchDates, mode);
  const percentComplete = totalMinutes > 0 ? Math.round((watchedMinutes / totalMinutes) * 100) : 0;
  const [time, setTime] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);

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
      <div className="stat-top">
        <span className="stat-h2">{t(lang, 'statsTitle')}</span>
        <button type="button" className="stat-close" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="sgrid">
        <div className="scard">
          <div className="scard-v">{Math.floor(watchedMinutes / 60)}h</div>
          <div className="scard-l">{t(lang, 'timeWatchedLbl')}</div>
        </div>
        <div className="scard">
          <div className="scard-v">{percentComplete}%</div>
          <div className="scard-l">{t(lang, 'completedLbl2')}</div>
        </div>
        <div className="scard">
          <div className="scard-v">{Math.floor(remainingMinutes / 60)}h</div>
          <div className="scard-l">{t(lang, 'remainingLbl2')}</div>
        </div>
        <div className="scard">
          <div className="scard-v">{watchedThisWeek}</div>
          <div className="scard-l">{t(lang, 'thisWeekLbl')}</div>
        </div>
      </div>
      <div className="ssec-title">
        {t(lang, 'cumulativeProgressLbl')}{' '}
        {series.length >= 2 ? (
          <span style={{ fontWeight: 400, textTransform: 'none', color: 'var(--faint)' }}>{t(lang, 'hoverChartHint')}</span>
        ) : null}
      </div>
      <div className="chart-wrap">
        <CumulativeChart series={series} totalMinutes={totalMinutes} lang={lang} />
      </div>
      <div className="ssec-title">{t(lang, 'progressByChapterLbl')}</div>
      {sectionStats.map((section, index) => {
        const percent = section.t > 0 ? Math.round((section.w / section.t) * 100) : 0;
        return (
          <div className="srow" key={index}>
            <div className="srow-hd">
              <span className="srow-n">{sectionNames[index]}</span>
              <span className="srow-p">
                {percent}% · {fmt(section.w)}
              </span>
            </div>
            <div className="sbar">
              <div className="sbar-f" style={{ width: `${percent}%` }} />
            </div>
          </div>
        );
      })}
      {ratedEntries.length > 0 ? (
        <>
          <div className="sttitle">{trAvgRated(lang, averageRating, ratedEntries.length)}</div>
          {topRated.map((entry, index) => (
            <div className="stop-row" key={index}>
              <span className="stop-rank">{index + 1}</span>
              <span className="stop-title">{entry.title}</span>
              <span className="stop-stars">{starsString(entry.rating)}</span>
            </div>
          ))}
        </>
      ) : (
        <div className="s-empty">{t(lang, 'rateHint')}</div>
      )}
    </Modal>
  );
}
