// Ported from the legacy js/i18n.js tr*() functions — strings with plurals or
// interpolated values, too irregular between FR/EN to fit the plain STRINGS dict.
// Each takes `lang` as an explicit parameter, same pattern as data/localize.ts.
import type {Lang} from '../data';
import {t} from './strings';

export function trResultCount(lang: Lang, n: number): string {
  return lang === 'en' ? `${n} result${n !== 1 ? 's' : ''}` : `${n} résultat${n !== 1 ? 's' : ''}`;
}

export function trTitleCount(lang: Lang, n: number): string {
  return lang === 'en' ? `${n} title${n !== 1 ? 's' : ''}` : `${n} titre${n > 1 ? 's' : ''}`;
}

export function trEpisodeCount(lang: Lang, n: number): string {
  return lang === 'en' ? `${n} episode${n > 1 ? 's' : ''}` : `${n} épisode${n > 1 ? 's' : ''}`;
}

export function trRatedCount(lang: Lang, n: number): string {
  return lang === 'en' ? `${n} rated` : `${n} noté${n > 1 ? 's' : ''}`;
}

export function trTmdbErrGeneric(lang: Lang, status: number | string): string {
  return lang === 'en' ? `⚠ TMDB error (${status})` : `⚠ Erreur TMDB (${status})`;
}

export function trAllWatchedFuturePending(lang: Lang, fp: number): string {
  return lang === 'en'
    ? `All available watched <span class="ok">✓</span> · <b>${trTitleCount(lang, fp)}</b> not yet released remaining`
    : `Tout vu de disponible <span class="ok">✓</span> · <b>${trTitleCount(lang, fp)}</b> pas encore sorti${fp > 1 ? 's' : ''} restant${fp > 1 ? 's' : ''}`;
}

export function trMarathonDoneReady(lang: Lang): string {
  return lang === 'en'
    ? `Marathon complete! Ready for Doomsday. <span class="ok">✓</span>`
    : `Marathon terminé ! Prêt pour Doomsday. <span class="ok">✓</span>`;
}

export function trDoomsdayHere(lang: Lang): string {
  return lang === 'en' ? `<b>Doomsday is here!</b> 🎬` : `<b>Doomsday est là !</b> 🎬`;
}

export function trDoomsdayPace(lang: Lang, hPerDay: string | number, cls: string, icon: string): string {
  return lang === 'en'
    ? `Doomsday — Dec 18, 2026 · <b>${hPerDay}/day</b> to finish <span class="${cls}">${icon}</span>`
    : `Doomsday — 18 déc 2026 · <b>${hPerDay}/jour</b> pour finir <span class="${cls}">${icon}</span>`;
}

export function trUpNextEmptyFuture(lang: Lang, fp: number): string {
  return lang === 'en'
    ? `🎬 Everything available is watched — ${trTitleCount(lang, fp)} not yet released`
    : `🎬 Tout est vu de disponible — ${trTitleCount(lang, fp)} pas encore sorti${fp > 1 ? 's' : ''}`;
}

export function trCopiedForDisney(lang: Lang, short: string): string {
  return lang === 'en' ? `📋 "${short}" copied — search on Disney+` : `📋 "${short}" copié — cherche dans Disney+`;
}

export function trAvgRated(lang: Lang, avg: number | string, n: number): string {
  return lang === 'en'
    ? `⭐ Best rated · Average ${avg}/5 (${trRatedCount(lang, n)})`
    : `⭐ Meilleures notes · Moyenne ${avg}/5 (${trRatedCount(lang, n)})`;
}

// New in the port (see src/utils/format.ts): the watched-date pill prefix, split out of
// fmtDayMonth so it's a proper localized string instead of a hardcoded French literal.
export function trWatchedOn(lang: Lang, dayMonth: string): string {
  return `${t(lang, 'watchedOnPrefix')} ${dayMonth}`;
}
