// Ported from buildCumulativeSeries() (legacy js/modals.js) — builds the day-by-day
// cumulative watched-minutes series backing the stats modal's chart.
import type { CatalogEntry } from '../data/types';
import { isWatched, type WatchDates } from './compute';

export interface CumulativePoint {
  date: string; // ISO 'YYYY-MM-DD'
  cum: number; // cumulative minutes watched through this date
}

export function buildCumulativeSeries(catalog: CatalogEntry[], watchDates: WatchDates): CumulativePoint[] {
  const minutesByDate: Record<string, number> = {};

  catalog.forEach((entry) => {
    if (entry.type === 'f') {
      if (isWatched(watchDates, entry.id) && watchDates[entry.id]) {
        const date = watchDates[entry.id].slice(0, 10);
        minutesByDate[date] = (minutesByDate[date] ?? 0) + entry.m;
      }
    } else {
      entry.epMins.forEach((minutes, index) => {
        const episodeId = `${entry.id}-e${index + 1}`;
        if (isWatched(watchDates, episodeId) && watchDates[episodeId]) {
          const date = watchDates[episodeId].slice(0, 10);
          minutesByDate[date] = (minutesByDate[date] ?? 0) + minutes;
        }
      });
    }
  });

  const dates = Object.keys(minutesByDate).sort();
  let cumulative = 0;
  return dates.map((date) => {
    cumulative += minutesByDate[date];
    return { date, cum: cumulative };
  });
}
