// Parametrized messages (plurals / interpolated values) that don't fit the plain
// STRINGS dict in strings.ts. Same per-language-dictionary principle as that file:
// one block per language gathered in MESSAGES: Record<Lang, Messages>, so adding a
// language means adding ONE block here — TypeScript's Record<Lang, …> then forces it
// to be complete, instead of hunting down a `lang === 'en'` ternary in every function.
// The exported tr*() helpers are thin delegations, so call sites stay unchanged.
import type {Lang} from '../data';
import {t} from './strings';

interface Messages {
  resultCount: (n: number) => string;
  titleCount: (n: number) => string;
  episodeCount: (n: number) => string;
  ratedCount: (n: number) => string;
  upNextEmptyFuture: (fp: number) => string;
  copiedForDisney: (short: string) => string;
  avgRated: (avg: number | string, n: number) => string;
}

const FR: Messages = {
  resultCount: (n) => `${n} résultat${n > 1 ? 's' : ''}`,
  titleCount: (n) => `${n} titre${n > 1 ? 's' : ''}`,
  episodeCount: (n) => `${n} épisode${n > 1 ? 's' : ''}`,
  ratedCount: (n) => `${n} noté${n > 1 ? 's' : ''}`,
  upNextEmptyFuture: (fp) => `🎬 Tout est vu de disponible — ${FR.titleCount(fp)} pas encore sorti${fp > 1 ? 's' : ''}`,
  copiedForDisney: (short) => `📋 "${short}" copié — cherche dans Disney+`,
  avgRated: (avg, n) => `⭐ Meilleures notes · Moyenne ${avg}/5 (${FR.ratedCount(n)})`,
};

const EN: Messages = {
  // English pluralizes zero ("0 results"), hence n !== 1 rather than n > 1.
  resultCount: (n) => `${n} result${n !== 1 ? 's' : ''}`,
  titleCount: (n) => `${n} title${n !== 1 ? 's' : ''}`,
  episodeCount: (n) => `${n} episode${n !== 1 ? 's' : ''}`,
  ratedCount: (n) => `${n} rated`,
  upNextEmptyFuture: (fp) => `🎬 Everything available is watched — ${EN.titleCount(fp)} not yet released`,
  copiedForDisney: (short) => `📋 "${short}" copied — search on Disney+`,
  avgRated: (avg, n) => `⭐ Best rated · Average ${avg}/5 (${EN.ratedCount(n)})`,
};

const MESSAGES: Record<Lang, Messages> = {fr: FR, en: EN};

// Falls back to French for an unknown language, mirroring t() in strings.ts.
function m(lang: Lang): Messages {
  return MESSAGES[lang] ?? MESSAGES.fr;
}

export const trResultCount = (lang: Lang, n: number): string => m(lang).resultCount(n);
export const trTitleCount = (lang: Lang, n: number): string => m(lang).titleCount(n);
export const trEpisodeCount = (lang: Lang, n: number): string => m(lang).episodeCount(n);
export const trRatedCount = (lang: Lang, n: number): string => m(lang).ratedCount(n);
export const trUpNextEmptyFuture = (lang: Lang, fp: number): string => m(lang).upNextEmptyFuture(fp);
export const trCopiedForDisney = (lang: Lang, short: string): string => m(lang).copiedForDisney(short);
export const trAvgRated = (lang: Lang, avg: number | string, n: number): string => m(lang).avgRated(avg, n);

// Built from a plain STRINGS key (watchedOnPrefix) + a formatted date, so there's no
// per-language branch to keep here — see src/utils/format.ts / strings.ts.
export function trWatchedOn(lang: Lang, dayMonth: string): string {
  return `${t(lang, 'watchedOnPrefix')} ${dayMonth}`;
}
