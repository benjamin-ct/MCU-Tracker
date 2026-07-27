// Content localization — replaces the old vanilla-JS pattern of mutating shared
// objects in place when the language toggle changes (applyLangToContent() in the
// legacy js/i18n.js). In React, mutating shared data during render is unsafe (it's a
// side effect, and breaks memoization/concurrent rendering), so instead every piece
// of localized content is *derived* from the current `lang` via a selector below —
// nothing is ever mutated, `lang` is just an input like any other prop/state.
import type { CatalogEntry, InfoEntry, Lang, PlatformEntry } from './types';
import { INFO, INFO_EN } from './info';
import { TITLE_EN } from './titles';
import { SEC_FR, SEC_EN, MONTHS_FR, MONTHS_EN } from './sections';
import { TRAILER_FR } from './trailers';

// Most budget/box/rt values only contain digits and two recognizable French turns of
// phrase ("Md$"/"M$" and "critique"/"public"/"pas encore sorti") — transform them
// automatically instead of retyping all 90 entries by hand. The few entries with
// extra French prose (e.g. "au total", "épisode") get an explicit override in
// INFO_EN instead of relying on this generic transform.
export function frMoney(s: string): string {
  if (!s) return s;
  if (/pas encore sorti/.test(s)) return s.replace('pas encore sorti', 'not yet released');
  return s
    .replace(/(~?)(\d[\d.,]*(?:-\d[\d.,]*)?)\s?Md\$/g, (_m, tilde: string, num: string) => `${tilde}$${num}B`)
    .replace(/(~?)(\d[\d.,]*(?:-\d[\d.,]*)?)\s?M\$/g, (_m, tilde: string, num: string) => `${tilde}$${num}M`);
}

export function frRT(s: string): string {
  if (!s) return s;
  if (/pas encore sorti/.test(s)) return s.replace('pas encore sorti', 'not yet released');
  return s.replace(/\bcritique\b/g, 'critics').replace(/\bpublic\b/g, 'audience');
}

export function getTitle(entry: CatalogEntry, lang: Lang): string {
  if (lang === 'en') return TITLE_EN[entry.id] ?? entry.title;
  return entry.title;
}

// Merges the French base INFO entry with the English override (when applicable) and
// the French trailer override (when applicable) — the two overrides are independent
// (a title can have an English synopsis override but keep the English trailer, etc.)
export function getInfo(id: string, lang: Lang): InfoEntry | undefined {
  const base = INFO[id];
  if (!base) return undefined;
  if (lang === 'fr') {
    return { ...base, yt: TRAILER_FR[id] ?? base.yt };
  }
  const override = INFO_EN[id] ?? {};
  return {
    ...base,
    synopsis: override.synopsis ?? base.synopsis,
    cast: override.cast ?? base.cast,
    pc: override.pc ?? base.pc,
    triv: override.triv ?? base.triv,
    link: override.link ?? base.link,
    budget: override.budget ?? frMoney(base.budget),
    box: override.box ?? frMoney(base.box),
    rt: override.rt ?? frRT(base.rt),
  };
}

export function getSectionNames(lang: Lang): string[] {
  return lang === 'en' ? SEC_EN : SEC_FR;
}

export function getMonthNames(lang: Lang): string[] {
  return lang === 'en' ? MONTHS_EN : MONTHS_FR;
}

export function getPlatformLabel(plat: PlatformEntry, lang: Lang): { label: string; date: string } {
  return lang === 'en' ? { label: plat.l_en, date: plat.date_en } : { label: plat.l, date: plat.date };
}
