// Replaces the TMDB key/poster-cache globals and fetchPosterViaProxy()/
// fetchRealPoster() from the legacy js/platform.js and js/state.js. Deliberately
// returns a typed result instead of showing a toast itself — the calling component
// (the info modal) decides how to present ok/error states, keeping this hook free of
// UI concerns.
import { useCallback } from 'react';
import type { TmdbRef } from '../data/types';
import { useLocalStorageState } from './useLocalStorageState';

const TMDB_KEY_STORAGE_KEY = 'mcu-tmdb-key';
const POSTER_CACHE_STORAGE_KEY = 'mcu-poster-cache';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';

export type PosterFetchResult =
  | { ok: true; url: string | null }
  | { ok: false; error: 'invalid-key' | 'not-found' | 'network' }
  | { ok: false; error: 'http'; httpStatus: number };

// Tries the same-origin proxy first (worker/index.js's /api/tmdb/<type>/<id>, which
// holds a server-side TMDB key via env var, never sent to the browser, and answers for
// everyone with no personal key needed). Returns `undefined` if the proxy didn't
// answer normally (route missing, no server key configured, dev server without the
// worker) so the caller falls back to a personal key instead of giving up outright.
async function fetchPosterViaProxy(tmdbInfo: TmdbRef): Promise<string | null | undefined> {
  try {
    const res = await fetch(`/api/tmdb/${tmdbInfo.type}/${tmdbInfo.id}`);
    if (!res.ok) return undefined;
    const data = (await res.json()) as { poster?: string | null };
    return data.poster ? `${TMDB_IMAGE_BASE}${data.poster}` : null;
  } catch {
    return undefined;
  }
}

export interface UseTmdbPosterResult {
  tmdbKey: string | null;
  setTmdbKey: (key: string | null) => void;
  clearTmdbKey: () => void;
  fetchPoster: (tmdbInfo: TmdbRef) => Promise<PosterFetchResult>;
}

export function useTmdbPoster(): UseTmdbPosterResult {
  const [tmdbKey, setTmdbKeyState] = useLocalStorageState<string | null>(TMDB_KEY_STORAGE_KEY, null, {
    serialize: (value) => value ?? '',
    deserialize: (raw) => raw || null,
  });
  const [posterCache, setPosterCache] = useLocalStorageState<Record<string, string | null>>(
    POSTER_CACHE_STORAGE_KEY,
    {},
  );

  const setTmdbKey = useCallback((key: string | null) => setTmdbKeyState(key), [setTmdbKeyState]);
  const clearTmdbKey = useCallback(() => setTmdbKeyState(null), [setTmdbKeyState]);

  const fetchPoster = useCallback(
    async (tmdbInfo: TmdbRef): Promise<PosterFetchResult> => {
      const cacheKey = `${tmdbInfo.type}:${tmdbInfo.id}`;
      if (cacheKey in posterCache) {
        return { ok: true, url: posterCache[cacheKey] };
      }

      const proxied = await fetchPosterViaProxy(tmdbInfo);
      if (proxied !== undefined) {
        setPosterCache((prev) => ({ ...prev, [cacheKey]: proxied }));
        return { ok: true, url: proxied };
      }

      // Proxy unavailable: fall back to a personal TMDB key pasted locally, if any.
      if (!tmdbKey) return { ok: true, url: null };

      // TMDB offers two different key formats on their settings page, a frequent
      // source of confusion: a 32-char hex "API Key (v3 auth)" (passed as ?api_key=)
      // or a long "Read Access Token (v4 auth)" (150+ chars, contains dots, sent as an
      // Authorization: Bearer header). Detected automatically so either works.
      const isV4 = tmdbKey.length > 60 || tmdbKey.includes('.');
      const url = isV4
        ? `https://api.themoviedb.org/3/${tmdbInfo.type}/${tmdbInfo.id}?language=fr-FR`
        : `https://api.themoviedb.org/3/${tmdbInfo.type}/${tmdbInfo.id}?api_key=${tmdbKey}&language=fr-FR`;
      const opts: RequestInit = isV4 ? { headers: { Authorization: `Bearer ${tmdbKey}` } } : {};

      try {
        const res = await fetch(url, opts);
        if (!res.ok) {
          if (res.status === 401) return { ok: false, error: 'invalid-key' };
          if (res.status === 404) return { ok: false, error: 'not-found' };
          return { ok: false, error: 'http', httpStatus: res.status };
        }
        const data = (await res.json()) as { poster_path?: string | null };
        const posterUrl = data.poster_path ? `${TMDB_IMAGE_BASE}${data.poster_path}` : null;
        setPosterCache((prev) => ({ ...prev, [cacheKey]: posterUrl }));
        return { ok: true, url: posterUrl };
      } catch {
        // Network error: offline, or the request was blocked by the hosting
        // environment (e.g. a sandboxed preview's CSP).
        return { ok: false, error: 'network' };
      }
    },
    [posterCache, tmdbKey, setPosterCache],
  );

  return { tmdbKey, setTmdbKey, clearTmdbKey, fetchPoster };
}
