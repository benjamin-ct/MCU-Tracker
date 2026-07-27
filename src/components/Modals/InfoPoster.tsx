// Ported from renderPoster()/posterInitials()/applyPosterUrl() (legacy js/modals.js).
// The generated gradient+initials poster always renders first and stays as the
// fallback; a real poster only ever replaces it after a same-origin <img> probe
// confirms it actually loads, so a bad URL/offline network never leaves a broken
// image in its place.
import { useEffect, useState } from 'react';
import type { CatalogEntry, InfoEntry, Lang } from '../../data/types';
import type { PosterFetchResult } from '../../hooks/useTmdbPoster';
import { t, trTmdbErrGeneric } from '../../i18n';

const CHAPTER_GRADIENTS: [string, string][] = [
  ['#1E7A2C', '#0B120C'],
  ['#38BF50', '#0F1E13'],
  ['#5B7FD1', '#12162A'],
  ['#C8941A', '#241C08'],
];

// Words that don't help identify a title (articles/conjunctions, FR+EN) — skipped
// when picking the two "significant" initials shown on the generated poster.
const STOP_WORDS = new Set(['le', 'la', 'les', 'de', 'du', 'des', 'et', 'à', 'a', 'the', 'of', 'and', 'an', 'un', 'une']);

function posterInitials(title: string): string {
  const words = title.replace(/[:().!'’]/g, ' ').split(/\s+/).filter(Boolean);
  const significant = words.filter((word) => !STOP_WORDS.has(word.toLowerCase()));
  const use = significant.length ? significant : words;
  if (use.length === 1) return use[0].slice(0, 2).toUpperCase();
  return (use[0][0] + use[1][0]).toUpperCase();
}

function probeLoad(url: string, onLoaded: (url: string) => void): () => void {
  const probe = new Image();
  let cancelled = false;
  probe.onload = () => {
    if (!cancelled) onLoaded(url);
  };
  // Silent on failure: the generated poster stays in place, nothing to show for it.
  probe.src = url;
  return () => {
    cancelled = true;
  };
}

interface InfoPosterProps {
  entry: CatalogEntry;
  info: InfoEntry | undefined;
  title: string;
  lang: Lang;
  fetchPoster: (tmdbInfo: NonNullable<InfoEntry['tmdb']>) => Promise<PosterFetchResult>;
  onError: (message: string) => void;
}

export function InfoPoster({ entry, info, title, lang, fetchPoster, onError }: InfoPosterProps) {
  const [posterUrl, setPosterUrl] = useState<string | null>(null);

  useEffect(() => {
    setPosterUrl(null);
    let cancelStale: (() => void) | undefined;
    let cancelled = false;

    async function load() {
      if (info?.poster) {
        cancelStale = probeLoad(`https://image.tmdb.org/t/p/w342${info.poster}`, setPosterUrl);
        return;
      }
      if (!info?.tmdb) return;

      const result = await fetchPoster(info.tmdb);
      if (cancelled) return;

      if (!result.ok) {
        if (result.error === 'invalid-key') onError(t(lang, 'tmdbErrInvalidKey'));
        else if (result.error === 'not-found') onError(t(lang, 'tmdbErrNotFound'));
        else if (result.error === 'network') onError(t(lang, 'tmdbErrNetwork'));
        else if (result.error === 'http') onError(trTmdbErrGeneric(lang, result.httpStatus));
        return;
      }

      if (result.url) {
        cancelStale = probeLoad(result.url, setPosterUrl);
      } else if (result.source === 'proxy' || result.source === 'personal-key') {
        // Only a definitive "checked, nothing found" answer gets a message — a cache
        // hit replaying a past null, or no way to even check, stays silent.
        onError(t(lang, 'tmdbNoPoster'));
      }
    }

    load();
    return () => {
      cancelled = true;
      cancelStale?.();
    };
  }, [entry.id, info, fetchPoster, lang, onError]);

  const [gradientStart, gradientEnd] = CHAPTER_GRADIENTS[entry.sec];
  const icon = entry.type === 'f' ? '🎬' : '📺';

  return (
    <div
      className="info-poster"
      style={
        posterUrl
          ? { backgroundImage: `url('${posterUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : { background: `linear-gradient(150deg,${gradientStart},${gradientEnd})` }
      }
    >
      <span className="info-poster-icon">{icon}</span>
      {posterUrl ? null : <span className="info-poster-init">{posterInitials(title)}</span>}
    </div>
  );
}
