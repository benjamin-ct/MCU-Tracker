// Small poster thumbnail shown on each catalog row (list view) — same fetch/fallback
// pattern as InfoPoster (Modals), just sized down and without the error toast: a
// missing poster here is just a quieter gradient-with-initials, not worth interrupting
// the user with a message the way a deliberately-opened "i" modal is.
import { useEffect, useState } from 'react';

import type { CatalogEntry, TmdbRef } from '../../data';
import { INFO } from '../../data';
import type { PosterFetchResult } from '../../hooks';
import { TMDB_IMAGE_BASE } from '../../hooks';
import styles from './RowPoster.module.css';

// Same four-chapter palette as InfoPoster's CHAPTER_GRADIENTS, re-declared locally to
// avoid importing a Modals component into Catalog. One colour per saga — bronze for
// the pre-Avengers era, the app's own marquee red for the Infinity Saga, violet for
// the Multiverse Saga, gold for Phase 6 and beyond.
const CHAPTER_GRADIENTS: [string, string][] = [
  ['#A8732E', '#180F07'],
  ['#D62839', '#1A0B0C'],
  ['#7B5CC9', '#140F24'],
  ['#D4A62F', '#1F1708'],
];

const STOP_WORDS = new Set([
  'le',
  'la',
  'les',
  'de',
  'du',
  'des',
  'et',
  'à',
  'a',
  'the',
  'of',
  'and',
  'an',
  'un',
  'une',
]);

function posterInitials(title: string): string {
  const words = title
    .replace(/[:().!']/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
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
  probe.src = url;
  return () => {
    cancelled = true;
  };
}

interface RowPosterProps {
  entry: CatalogEntry;
  title: string;
  fetchPoster: (tmdbInfo: TmdbRef) => Promise<PosterFetchResult>;
  onClick: () => void;
  // 'row' (default): small fixed-size thumbnail for MovieRow/SeriesRow. 'grid': fills
  // its container at a 2:3 poster ratio, for GridCard.
  size?: 'row' | 'grid';
}

export function RowPoster({ entry, title, fetchPoster, onClick, size = 'row' }: RowPosterProps) {
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const info = INFO[entry.id];

  useEffect(() => {
    let cancelStale: (() => void) | undefined;
    let cancelled = false;

    async function load() {
      if (info?.poster) {
        cancelStale = probeLoad(`${TMDB_IMAGE_BASE}${info.poster}`, setPosterUrl);
        return;
      }
      if (!info?.tmdb) return;
      const result = await fetchPoster(info.tmdb);
      if (cancelled || !result.url) return;
      cancelStale = probeLoad(result.url, setPosterUrl);
    }

    load();
    return () => {
      cancelled = true;
      cancelStale?.();
    };
  }, [entry.id, info, fetchPoster]);

  const [gradientStart, gradientEnd] = CHAPTER_GRADIENTS[entry.sec];

  return (
    <button
      type="button"
      className={size === 'grid' ? `${styles.poster} ${styles.posterGrid}` : styles.poster}
      onClick={onClick}
      aria-label={title}
      data-row-poster
      style={
        posterUrl
          ? { backgroundImage: `url('${posterUrl}')` }
          : { background: `linear-gradient(150deg,${gradientStart},${gradientEnd})` }
      }
    >
      {posterUrl ? null : <span className={styles.posterInit}>{posterInitials(title)}</span>}
    </button>
  );
}
