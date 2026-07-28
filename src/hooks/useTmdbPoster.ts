// Poster lookup via the same-origin worker proxy only (worker/index.js's
// /api/tmdb/<type>/<id>, which holds a server-side TMDB key via env var, never sent to
// the browser, and answers for everyone with no personal key needed). The old
// personal-key fallback (paste-your-own-TMDB-key) was dropped: the proxy is the single
// source of posters now, so there's no key state, no v3/v4 detection and no key modal.
import {useCallback} from 'react';

import type {TmdbRef} from '../data';
import {useLocalStorageState} from './useLocalStorageState';

const POSTER_CACHE_STORAGE_KEY = 'mcu-poster-cache';
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';

// Returns the poster URL, `null` if the proxy confirmed there's no poster for this
// title, or `undefined` if the proxy didn't answer normally (route missing, no server
// key configured, dev server without the worker) — the caller stays silent in that
// last case rather than claiming "no poster".
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

// `source` distinguishes a definitive answer (the proxy checked: poster found, or
// confirmed none) from a silent bail-out (cache hit, or the proxy couldn't answer at
// all) — only a definitive "checked, no poster" should surface a message.
export interface PosterFetchResult {
  url: string | null;
  source: 'cache' | 'proxy' | 'none';
}

export interface UseTmdbPosterResult {
  fetchPoster: (tmdbInfo: TmdbRef) => Promise<PosterFetchResult>;
}

export function useTmdbPoster(): UseTmdbPosterResult {
  // Only real poster URLs are ever cached (see below), so the value type is a plain
  // string rather than string | null.
  const [posterCache, setPosterCache] = useLocalStorageState<Record<string, string>>(POSTER_CACHE_STORAGE_KEY, {});

  const fetchPoster = useCallback(
    async (tmdbInfo: TmdbRef): Promise<PosterFetchResult> => {
      const cacheKey = `${tmdbInfo.type}:${tmdbInfo.id}`;
      if (cacheKey in posterCache) {
        return {url: posterCache[cacheKey], source: 'cache'};
      }

      const proxied = await fetchPosterViaProxy(tmdbInfo);
      if (proxied === undefined) return {url: null, source: 'none'};
      // Only cache a real poster: a `null` ("no poster yet") is deliberately not cached,
      // so a poster added on TMDB later shows up on the next open instead of being stuck
      // behind a permanent negative cache entry.
      if (proxied) setPosterCache((prev) => ({...prev, [cacheKey]: proxied}));
      return {url: proxied, source: 'proxy'};
    },
    [posterCache, setPosterCache],
  );

  return {fetchPoster};
}
