// Core catalogue types. See PROJET-MCU-TRACKER.md (legacy vanilla-JS doc, still a
// useful reference for the data model and the in-universe/release-order distinction).

export type SectionIndex = 0 | 1 | 2 | 3;

interface BaseEntry {
  id: string;
  title: string; // French base title (English override lives in titles.ts)
  sec: SectionIndex;
  opt: boolean; // optional content (Fox X-Men, Netflix Defenders-verse): hidden in "Essential" mode
}

export interface FilmEntry extends BaseEntry {
  type: 'f';
  m: number; // runtime in minutes
  y: string | null; // in-universe year label shown next to the title, e.g. "1942"
}

export interface SeriesEntry extends BaseEntry {
  type: 's';
  season: number;
  count: number; // episode count
  epMins: number[]; // per-episode runtime in minutes
}

export type CatalogEntry = FilmEntry | SeriesEntry;

export function isFilm(e: CatalogEntry): e is FilmEntry {
  return e.type === 'f';
}

export function isSeries(e: CatalogEntry): e is SeriesEntry {
  return e.type === 's';
}

export interface TmdbRef {
  id: number;
  type: 'movie' | 'tv';
}

// Full French info entry, used for the "i" modal.
export interface InfoEntry {
  synopsis: string;
  director: string;
  cast: string;
  pc?: string; // post-credit scene description; omitted = "not confirmed" for films
  budget: string;
  box: string;
  rt: string; // Rotten Tomatoes score(s)
  triv: string;
  link: string;
  yt: string; // English trailer URL (French override in trailers.ts)
  tmdb?: TmdbRef;
  poster?: string; // verified static TMDB poster path, no API key needed
}

// English overrides: only free-prose fields (never auto-translated) plus the rare
// budget/box/rt case the generic FR->EN transform doesn't cover.
export type InfoOverride = Partial<
  Pick<InfoEntry, 'synopsis' | 'cast' | 'pc' | 'triv' | 'link' | 'budget' | 'box' | 'rt'>
>;

export interface PlatformEntry {
  l: string; // French label, e.g. "Cinéma" / "Bientôt"
  c: 'cin' | 'soon';
  date: string;
  l_en: string;
  date_en: string;
}

export type Lang = 'fr' | 'en';
export type SortMode = 'chrono' | 'release';
export type ViewFilter = 'all' | 'todo';
export type Mode = 'essentiel' | 'tout';
