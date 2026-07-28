// Rich (JSX) translations — the counterpart to translate.ts for strings that embed
// markup (<b>, coloured <span>, a link). They used to be raw HTML strings rendered via
// dangerouslySetInnerHTML; returning React nodes instead keeps the same output with no
// innerHTML injection, so there's nothing to trust/escape and the markup is type-checked
// like any other JSX.
import type {ReactNode} from 'react';

import type {Lang} from '../data';
import {trTitleCount} from './translate';

const DOOMSDAY_LABEL: Record<Lang, string> = {
  en: 'Doomsday — Dec 18, 2026',
  fr: 'Doomsday — 18 déc 2026',
};

export function trAllWatchedFuturePending(lang: Lang, fp: number): ReactNode {
  const count = <b>{trTitleCount(lang, fp)}</b>;
  return lang === 'en' ? (
    <>
      {DOOMSDAY_LABEL.en} · {count} not yet released
    </>
  ) : (
    <>
      {DOOMSDAY_LABEL.fr} · {count} pas encore sorti{fp > 1 ? 's' : ''} restant{fp > 1 ? 's' : ''}
    </>
  );
}

export function trMarathonDoneReady(lang: Lang): ReactNode {
  const check = <span className="ok">✓</span>;
  return lang === 'en' ? (
    <>Marathon complete! Ready for Doomsday. {check}</>
  ) : (
    <>Marathon terminé ! Prêt pour Doomsday. {check}</>
  );
}

export function trDoomsdayHere(lang: Lang): ReactNode {
  return lang === 'en' ? (
    <>
      <b>Doomsday is here!</b> 🎬
    </>
  ) : (
    <>
      <b>Doomsday est là !</b> 🎬
    </>
  );
}

export function trDoomsdayPace(lang: Lang, hPerDay: string, isHeavyPace: boolean): ReactNode {
  const icon = <span className={isHeavyPace ? 'warn' : 'ok'}>{isHeavyPace ? '⚡' : '✓'}</span>;
  return lang === 'en' ? (
    <>
      {DOOMSDAY_LABEL.en} · <b>{hPerDay}/day</b> to finish {icon}
    </>
  ) : (
    <>
      {DOOMSDAY_LABEL.fr} · <b>{hPerDay}/jour</b> pour finir {icon}
    </>
  );
}

// Help text for the TMDB key modal — the link opens TMDB's API settings page.
export function TmdbHelpText({lang}: { lang: Lang }) {
  const link = (
    <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noreferrer" style={{color: 'var(--red)'}}>
      {lang === 'en' ? 'themoviedb.org → Settings → API' : 'themoviedb.org → Paramètres → API'}
    </a>
  );
  return lang === 'en' ? (
    <>
      Paste your TMDB key <b>or</b> token — both work, TMDB&apos;s settings page offers two: an <b>API Key (v3
      auth)</b>{' '}
      (32 characters) or a <b>Read Access Token (v4 auth)</b> (long token). Free: create an account at {link}.
    </>
  ) : (
    <>
      Colle ta clé <b>ou</b> ton jeton TMDB — les deux fonctionnent, la page réglages en propose deux :{' '}
      <b>Clé API (v3 auth)</b> (32 caractères) ou <b>Jeton de lecture API (v4 auth)</b> (long jeton). Gratuit : crée un
      compte sur {link}.
    </>
  );
}
