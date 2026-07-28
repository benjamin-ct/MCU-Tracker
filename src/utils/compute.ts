// Ported from the legacy js/compute.js. Every function here used to read module-level
// mutable globals (mode, watchDates, tonightMin, searchQuery) directly. In React those
// values live in state, so each one is now an explicit parameter instead — same logic,
// but callable from any component/hook without relying on shared mutable state.
import type {CatalogEntry, Mode, SectionIndex, SeriesEntry} from '../data';
import {CAST_EXTRA, INFO, isFuture, TITLE_EN} from '../data';

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
  return entry.epMins.reduce((sum, m, i) => sum + (isWatched(watchDates, `${entry.id}-e${i + 1}`) ? 0 : m), 0);
}

// Index of the first unwatched episode, or -1 if every episode is watched.
export function nextUnwatchedEpisodeIndex(entry: SeriesEntry, watchDates: WatchDates): number {
  return entry.epMins.findIndex((_, i) => !isWatched(watchDates, `${entry.id}-e${i + 1}`));
}

// Single source of truth for "is there nothing left to watch on this entry" — a film is
// done when its id is watched, a series when every episode is. Shared by nextItem,
// futurePendingCount, the "todo" view filter and the surprise picker so they can never
// disagree on what counts as finished.
export function isEntryFullyWatched(entry: CatalogEntry, watchDates: WatchDates): boolean {
  return entry.type === 'f' ? isWatched(watchDates, entry.id) : sDone(entry, watchDates) >= entry.count;
}

export function fitsTonight(entry: CatalogEntry, watchDates: WatchDates, tonightMin: number): boolean {
  if (tonightMin <= 0 || isFuture(entry.id)) return false;
  if (entry.type === 'f') return !isWatched(watchDates, entry.id) && entry.m <= tonightMin;
  const remaining = sRem(entry, watchDates);
  return remaining > 0 && remaining <= tonightMin;
}

// Search also matches the English title (even while displaying French, so typing
// "iron man" works regardless of active language) plus cast/director (INFO) and the
// extended cast list (CAST_EXTRA) for secondary roles/appearances not shown in the
// info modal (limited space) but that should still be findable.
export function matchSearch(entry: CatalogEntry, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  if (entry.title.toLowerCase().includes(q)) return true;
  const original = TITLE_EN[entry.id];
  if (original && original.toLowerCase().includes(q)) return true;
  const info = INFO[entry.id];
  if (info?.cast && info.cast.toLowerCase().includes(q)) return true;
  if (info?.director && info.director.toLowerCase().includes(q)) return true;
  const extra = CAST_EXTRA[entry.id];
  return Boolean(extra && extra.toLowerCase().includes(q));
}

export function nextItem(catalog: CatalogEntry[], watchDates: WatchDates, mode: Mode): CatalogEntry | null {
  for (const entry of catalog) {
    if (!cnt(entry, mode)) continue;
    if (isFuture(entry.id)) continue;
    if (!isEntryFullyWatched(entry, watchDates)) return entry;
  }
  return null;
}

export function daysLeft(doomsday: Date): number {
  return Math.max(0, Math.ceil((doomsday.getTime() - Date.now()) / 86400000));
}

// Capacity of one "evening" of watching, in minutes (~2h30). Used as the bin size when
// estimating how many evenings the remaining content needs.
export const EVENING_CAPACITY_MIN = 150;

// Bin-packing (first-fit decreasing): places each remaining unit of content into an
// "evening" of ~150min capacity. A single film longer than 150min still takes just one
// evening (it doesn't get split), unlike the naive total/150 calculation which inflated
// the evening count.
export function estimateEvenings(units: number[], cap: number = EVENING_CAPACITY_MIN): number {
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
  totalMinutes: number;
  watchedMinutes: number;
  unitCount: number; // total unit count (films or episodes)
  doneCount: number; // watched unit count
}

export interface Totals {
  totalMinutes: number;
  watchedMinutes: number;
  remainingMinutes: number;
  sections: SectionStats[]; // per-section stats, indexed by SectionIndex
  remainingUnitDurations: number[]; // remaining unit durations, for estimateEvenings()
}

export function totals(catalog: CatalogEntry[], watchDates: WatchDates, mode: Mode): Totals {
  let totalMinutes = 0;
  let watchedMinutes = 0;
  const sections: SectionStats[] = [0, 1, 2, 3].map(() => ({
    totalMinutes: 0,
    watchedMinutes: 0,
    unitCount: 0,
    doneCount: 0,
  }));
  const remainingUnitDurations: number[] = [];
  catalog.forEach((entry) => {
    if (!cnt(entry, mode)) return;
    if (isFuture(entry.id)) return; // not yet released -> excluded from totals/evenings/countdown
    const section = sections[entry.sec];
    if (entry.type === 'f') {
      totalMinutes += entry.m;
      section.totalMinutes += entry.m;
      section.unitCount++;
      if (isWatched(watchDates, entry.id)) {
        watchedMinutes += entry.m;
        section.watchedMinutes += entry.m;
        section.doneCount++;
      } else {
        remainingUnitDurations.push(entry.m);
      }
    } else {
      entry.epMins.forEach((m, i) => {
        const eid = `${entry.id}-e${i + 1}`;
        totalMinutes += m;
        section.totalMinutes += m;
        section.unitCount++;
        if (isWatched(watchDates, eid)) {
          watchedMinutes += m;
          section.watchedMinutes += m;
          section.doneCount++;
        } else {
          remainingUnitDurations.push(m);
        }
      });
    }
  });
  return {
    totalMinutes,
    watchedMinutes,
    remainingMinutes: totalMinutes - watchedMinutes,
    sections,
    remainingUnitDurations,
  };
}

// Number of not-yet-released contents still left to watch (never checkable until
// released, so always "pending" by definition).
export function futurePendingCount(catalog: CatalogEntry[], watchDates: WatchDates, mode: Mode): number {
  let n = 0;
  catalog.forEach((entry) => {
    if (!cnt(entry, mode) || !isFuture(entry.id)) return;
    if (!isEntryFullyWatched(entry, watchDates)) n++;
  });
  return n;
}

export type { SectionIndex };
