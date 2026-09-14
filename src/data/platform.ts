// Titles not yet released as of the last verification (14/09/2026). Presence in
// this map is the single source of truth for "not out yet" (isFuture()) — excludes
// from totals/evenings/countdown, disables the checkbox, hides the Disney+ link,
// skips it for "up next" and "tonight".
import type { PlatformEntry } from './types';

export const PLAT: Record<string, PlatformEntry> = {
  yfns2: {
    l: 'Bientôt',
    c: 'soon',
    date: 'janvier 2027',
    l_en: 'Coming Soon',
    date_en: 'January 2027',
  },
  visionquest: {
    l: 'Bientôt',
    c: 'soon',
    date: '14 oct. 2026',
    l_en: 'Coming Soon',
    date_en: 'Oct 14, 2026',
  },
  doomsday: {
    l: 'Cinéma',
    c: 'cin',
    date: '18 déc. 2026',
    l_en: 'In Theaters',
    date_en: 'Dec 18, 2026',
  },
  secretwars: {
    l: 'Cinéma',
    c: 'cin',
    date: '17 déc. 2027',
    l_en: 'In Theaters',
    date_en: 'Dec 17, 2027',
  },
};

export function isFuture(id: string): boolean {
  return id in PLAT;
}
