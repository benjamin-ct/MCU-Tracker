// Replaces the legacy js/state.js watchDates/ratings globals and their
// markWatched()/markUnwatched()/reconcileLegacyChecked() helpers. watchDates stays the
// single source of truth (id present = watched, value = ISO watch date) — no separate
// "checked" set, so the two can never drift apart the way they used to in older
// versions (see reconcileLegacyChecked below, which cleans up exactly that drift for
// anyone still carrying an old export/localStorage layout).
import { useCallback, useEffect, useState } from 'react';

import { isWatched as isWatchedId, type WatchDates } from '../utils/compute';

const WATCH_DATES_KEY = 'mcu6-wd';
const LEGACY_CHECKED_KEY = 'mcu6-c';
const LEGACY_CHECKED_KEY_V5 = 'mcu5-c';
const RATINGS_KEY = 'mcu6-r';
const LEGACY_RATINGS_KEY_V5 = 'mcu5-r';

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded / private browsing — progress still works for this session
  }
}

// Light shape guard for imported files: we own the export format, so this isn't meant
// to be bulletproof — just enough that a hand-edited or truncated file can't push a
// non-object (string, number, array) into watchDates/ratings and break the id lookups
// that assume a plain record.
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Cleans up orphaned watch dates (an id present in watchDates but absent from an
// older "checked" array that used to be the source of truth) — protects anyone
// importing/loading an old export or localStorage layout.
function reconcileLegacyChecked(checkedIds: string[], wd: WatchDates | null): WatchDates {
  const valid = new Set(checkedIds);
  const cleaned: WatchDates = wd ? { ...wd } : {};
  Object.keys(cleaned).forEach((id) => {
    if (!valid.has(id)) delete cleaned[id];
  });
  valid.forEach((id) => {
    if (!(id in cleaned)) cleaned[id] = new Date().toISOString();
  });
  return cleaned;
}

// One-time migration from older storage layouts (see legacy js/state.js boot()): mcu5
// never had watch dates, only a "checked" array, so there's nothing to reconcile
// against there beyond treating "checked" as truth.
function readInitialWatchDates(): WatchDates {
  const loadedWD = readJson<WatchDates>(WATCH_DATES_KEY);
  let legacyChecked = readJson<string[]>(LEGACY_CHECKED_KEY);
  if (!loadedWD && !legacyChecked) {
    legacyChecked = readJson<string[]>(LEGACY_CHECKED_KEY_V5);
  }
  if (legacyChecked) return reconcileLegacyChecked(legacyChecked, loadedWD);
  return loadedWD ?? {};
}

function readInitialRatings(): Record<string, number> {
  return readJson<Record<string, number>>(RATINGS_KEY) ?? readJson<Record<string, number>>(LEGACY_RATINGS_KEY_V5) ?? {};
}

export interface ImportedProgressData {
  checked?: string[];
  watchDates?: WatchDates;
  ratings?: Record<string, number>;
}

export interface UseWatchProgressResult {
  watchDates: WatchDates;
  ratings: Record<string, number>;
  isWatched: (id: string) => boolean;
  setWatched: (id: string, watched: boolean) => void;
  setManyWatched: (ids: string[], watched: boolean) => void;
  toggleRating: (id: string, value: number) => void;
  resetProgress: () => void;
  importProgress: (data: ImportedProgressData) => void;
}

export function useWatchProgress(): UseWatchProgressResult {
  const [watchDates, setWatchDates] = useState<WatchDates>(readInitialWatchDates);
  const [ratings, setRatings] = useState<Record<string, number>>(readInitialRatings);

  useEffect(() => writeJson(WATCH_DATES_KEY, watchDates), [watchDates]);
  useEffect(() => writeJson(RATINGS_KEY, ratings), [ratings]);

  const isWatched = useCallback((id: string) => isWatchedId(watchDates, id), [watchDates]);

  const setWatched = useCallback((id: string, watched: boolean) => {
    setWatchDates((prev) => {
      if (watched) return { ...prev, [id]: new Date().toISOString() };
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });
  }, []);

  // Batch variant: applies the same watched/unwatched flip to many ids in a single
  // state update, so toggling a whole series (bulk checkbox, or auto-marking the last
  // episode) rebuilds watchDates once instead of once per episode.
  const setManyWatched = useCallback((ids: string[], watched: boolean) => {
    if (ids.length === 0) return;
    setWatchDates((prev) => {
      const next = { ...prev };
      if (watched) {
        const now = new Date().toISOString();
        ids.forEach((id) => {
          next[id] = now;
        });
      } else {
        ids.forEach((id) => delete next[id]);
      }
      return next;
    });
  }, []);

  // Clicking the currently-set star again clears the rating, same as the legacy app.
  const toggleRating = useCallback((id: string, value: number) => {
    setRatings((prev) => ({ ...prev, [id]: prev[id] === value ? 0 : value }));
  }, []);

  const resetProgress = useCallback(() => {
    setWatchDates({});
    setRatings({});
  }, []);

  const importProgress = useCallback((data: ImportedProgressData) => {
    if (!isRecord(data)) return;
    if (Array.isArray(data.checked)) {
      setWatchDates(
        reconcileLegacyChecked(data.checked, isRecord(data.watchDates) ? (data.watchDates as WatchDates) : null),
      );
    } else if (isRecord(data.watchDates)) {
      setWatchDates(data.watchDates as WatchDates);
    }
    if (isRecord(data.ratings)) setRatings(data.ratings as Record<string, number>);
  }, []);

  return { watchDates, ratings, isWatched, setWatched, setManyWatched, toggleRating, resetProgress, importProgress };
}
