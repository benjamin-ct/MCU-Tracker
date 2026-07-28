// Ported from imdbUrl() (legacy js/platform.js). Deliberately NOT derived from the
// TMDB API: a direct IMDb link (from a hand-verified tt-id) works for everyone
// immediately, with no key to configure. Falls back to an IMDb search on the English
// title if an id is ever missing (e.g. a new title not yet added to imdb.ts).
import type {CatalogEntry} from '../data';
import {IMDB_ID, TITLE_EN} from '../data';

export function imdbUrl(entry: CatalogEntry): string {
  const id = IMDB_ID[entry.id];
  if (id) return `https://www.imdb.com/title/${id}/`;
  const query = TITLE_EN[entry.id] || entry.title;
  return `https://www.imdb.com/find/?q=${encodeURIComponent(query)}&s=tt`;
}
