// Replaces the legacy js/i18n.js lang global + applyLang()/toggleLang()/initLang().
// The old app mutated E[]/INFO/SEC/MONTHS/PLAT in place on every language change
// (applyLangToContent) and re-rendered the whole DOM by hand (applyLangToStaticDOM).
// Here `lang` is just React state: components re-render declaratively from it, and
// content localization goes through the pure selectors in data/localize.ts instead.
import { useCallback, useEffect, useState } from 'react';

import type { Lang } from '../data';

const STORAGE_KEY = 'mcu-lang';

function readStoredLang(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'fr';
  } catch {
    return 'fr';
  }
}

export interface UseLanguageResult {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

export function useLanguage(): UseLanguageResult {
  const [lang, setLangState] = useState<Lang>(readStoredLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // localStorage unavailable (private browsing / quota) — language still works
      // for the current session, it just won't persist across reloads.
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggleLang = useCallback(() => setLangState((prev) => (prev === 'fr' ? 'en' : 'fr')), []);

  return { lang, setLang, toggleLang };
}
