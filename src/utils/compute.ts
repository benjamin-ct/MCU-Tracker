// Ported from the legacy js/compute.js. Every function here used to read module-level
// mutable globals (mode, watchDates, tonightMin, searchQuery) directly. In React those
// values live in state, so each one is now an explicit parameter instead — same logic,
// but callable from any component/hook without relying on shared mutable state.
import type { CatalogEntry, Mode, SectionIndex, SeriesEntry } from '../data/types';
import { isFuture } from '../data/platform';
import { TITLE_EN, INFO, CAST_EXTRA } from '../data';

export type WatchDates = Record<string, string>;

export function isWatched(watchDates: WatchDates, id: string): boolean {
  return Object.prototype.hasOwnProperty.call(watchDates, id);
}

// "Essential" mode hides opt-in content (Fox X-Men, Netflix Defenders-verse).
export function cnt(entry: CatalogEntry, mode: Mode): boolean {
  return mode === 'tout' || !entry.opt;
}

export function sDone(entry: SeriesEntry, watchDates: WatchDates): number {
  return entry.epMins.filter((_, i) => isWatched(watchDates, `${entry.id}-e${i + 1}`)).length;
}

export function sRem(entry: SeriesEntry, watchDates: WatchDates): number {
  return entry.epMins.reduce(
    (sum, m, i) => sum + (isWatched(watchDates, `${entry.id}-e${i + 1}`) ? 0 : m),
    0,
  );
}

// Index of the first unwatched episode, or -1 if every episode is watched.
export function nextUnwatchedEpisodeIndex(entry: SeriesEntry, watchDates: WatchDates): number {
  return entry.epMins.findIndex((_, i) => !isWatched(watchDates, `${entry.id}-e${i + 1}`));
}

export function fitsTonight(entry: CatalogEntry, watchDates: WatchDates, tonightMin: number): boolean {
  if (tonightMin <= 0 || isFuture(entry.id)) return false;
  if (entry.type === 'f') return !isWatched(watchDates, entry.id) && entry.m <= tonightMin;
  return sRem(entry, watchDates) > 0 && sRem(entry, watchDates) <= tonightMin;
}

// Search also matches the English title (even while displaying French, so typing
// "iron man" works regardless of active language) plus cast/director (INFO) and the
// extended cast list (CAST_EXTRA) for secondary roles/appearances not shown in the
// info modal (limited space) but that should still be findable.
export function matchSearch(entry: CatalogEntry, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  if (entry.title.toLowerCase().includes(q)) return true;
  const original = TITLE_EN[entry.id];
  if (original && original.toLowerCase().includes(q)) return true;
  const info = INFO[entry.id];
  if (info?.cast && info.cast.toLowerCase().includes(q)) return true;
  if (info?.director && info.director.toLowerCase().includes(q)) return true;
  const extra = CAST_EXTRA[entry.id];
  if (extra && extra.toLowerCase().includes(q)) return true;
  return false;
}

export function nextItem(catalog: CatalogEntry[], watchDates: WatchDates, mode: Mode): CatalogEntry | null {
  for (const entry of catalog) {
    if (!cnt(entry, mode)) continue;
    if (isFuture(entry.id)) continue;
    if (entry.type === 'f' && !isWatched(watchDates, entry.id)) return entry;
    if (entry.type === 's' && sDone(entry, watchDates) < entry.count) return entry;
  }
  return null;
}

export function daysLeft(doomsday: Date): number {
  return Math.max(0, Math.ceil((doomsday.getTime() - Date.now()) / 86400000));
}

// Bin-packing (first-fit decreasing): places each remaining unit of content into an
// "evening" of ~150min capacity. A single film longer than 150min still takes just one
// evening (it doesn't get split), unlike the naive total/150 calculation which inflated
// the evening count.
export function estimateEvenings(units: number[], cap: number): number {
  if (!units.length) return 0;
  const sorted = units.slice().sort((a, b) => b - a);
  const bins: number[] = [];
  sorted.forEach((unit) => {
    let placed = false;
    for (let i = 0; i < bins.length; i++) {
      if (bins[i] + unit <= cap) {
        bins[i] += unit;
        placed = true;
        break;
      }
    }
    if (!placed) bins.push(unit);
  });
  return bins.length;
}

export interface SectionStats {
  t: number; // total minutes
  w: number; // watched minutes
  n: number; // total unit count (films or episodes)
  d: number; // done unit count
}

export interface Totals {
  t: number;
  w: number;
  r: number; // remaining minutes
  ps: SectionStats[]; // per-section stats, indexed by SectionIndex
  remUnits: number[]; // remaining unit durations, for estimateEvenings()
}

export function totals(catalog: CatalogEntry[], watchDates: WatchDates, mode: Mode): Totals {
  let t = 0;
  let w = 0;
  const ps: SectionStats[] = [0, 1, 2, 3].map(() => ({ t: 0, w: 0, n: 0, d: 0 }));
  const remUnits: number[] = [];
  catalog.forEach((entry) => {
    if (!cnt(entry, mode)) return;
    if (isFuture(entry.id)) return; // not yet released -> excluded from totals/evenings/countdown
    const section = ps[entry.sec];
    if (entry.type === 'f') {
      t += entry.m;
      section.t += entry.m;
      section.n++;
      if (isWatched(watchDates, entry.id)) {
        w += entry.m;
        section.w += entry.m;
        section.d++;
      } else {
        remUnits.push(entry.m);
      }
    } else {
      entry.epMins.forEach((m, i) => {
        const eid = `${entry.id}-e${i + 1}`;
        t += m;
        section.t += m;
        section.n++;
        if (isWatched(watchDates, eid)) {
          w += m;
          section.w += m;
          section.d++;
        } else {
          remUnits.push(m);
        }
      });
    }
  });
  return { t, w, r: t - w, ps, remUnits };
}

// Number of not-yet-released contents still left to watch (never checkable until
// released, so always "pending" by definition).
export function futurePendingCount(catalog: CatalogEntry[], watchDates: WatchDates, mode: Mode): number {
  let n = 0;
  catalog.forEach((entry) => {
    if (!cnt(entry, mode) || !isFuture(entry.id)) return;
    if (entry.type === 'f') {
      if (!isWatched(watchDates, entry.id)) n++;
    } else if (sDone(entry, watchDates) < entry.count) {
      n++;
    }
  });
  return n;
}

export type { SectionIndex };
