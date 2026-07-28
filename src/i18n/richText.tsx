// Rich (JSX) translations — the counterpart to translate.ts for strings that embed
// markup (<b>, coloured <span>, a link). They used to be raw HTML strings rendered via
// dangerouslySetInnerHTML; returning React nodes instead keeps the same output with no
// innerHTML injection, so there's nothing to trust/escape and the markup is type-checked
// like any other JSX.
//
// Same per-language-dictionary shape as strings.ts / translate.ts: one RICH block per
// language, gathered in Record<Lang, …> so adding a language is a single new block the
// compiler forces you to complete — no `lang === 'en'` ternaries to update everywhere.
import type {ReactNode} from 'react';
import type {Lang} from '../data';
import {trTitleCount} from './translate';

interface RichMessages {
  allWatchedFuturePending: (fp: number) => ReactNode;
  marathonDoneReady: ReactNode;
  doomsdayHere: ReactNode;
  doomsdayPace: (hPerDay: string, isHeavyPace: boolean) => ReactNode;
  tmdbHelp: ReactNode;
}

const DOOMSDAY_LABEL: Record<Lang, string> = {
  fr: 'Doomsday — 18 déc 2026',
  en: 'Doomsday — Dec 18, 2026',
};

// Coloured pace indicator — .warn/.ok are global classes scoped under .txt in
// DoomsdayCountdown.module.css.
function paceIcon(isHeavyPace: boolean): ReactNode {
  return <span className={isHeavyPace ? 'warn' : 'ok'}>{isHeavyPace ? '⚡' : '✓'}</span>;
}

function tmdbSettingsLink(label: string): ReactNode {
  return (
    <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noreferrer" style={{color: 'var(--red)'}}>
      {label}
    </a>
  );
}

const FR: RichMessages = {
  allWatchedFuturePending: (fp) => (
    <>
      {DOOMSDAY_LABEL.fr} · <b>{trTitleCount('fr', fp)}</b> pas encore sorti{fp > 1 ? 's' : ''}
    </>
  ),
  marathonDoneReady: (
    <>
      Marathon terminé ! Prêt pour Doomsday. <span className="ok">✓</span>
    </>
  ),
  doomsdayHere: (
    <>
      <b>Doomsday est là !</b> 🎬
    </>
  ),
  doomsdayPace: (hPerDay, isHeavyPace) => (
    <>
      {DOOMSDAY_LABEL.fr} · <b>{hPerDay}/jour</b> pour finir {paceIcon(isHeavyPace)}
    </>
  ),
  tmdbHelp: (
    <>
      Colle ta clé <b>ou</b> ton jeton TMDB — les deux fonctionnent, la page réglages en propose deux :{' '}
      <b>Clé API (v3 auth)</b> (32 caractères) ou <b>Jeton de lecture API (v4 auth)</b> (long jeton). Gratuit : crée un
      compte sur {tmdbSettingsLink('themoviedb.org → Paramètres → API')}.
    </>
  ),
};

const EN: RichMessages = {
  allWatchedFuturePending: (fp) => (
    <>
      {DOOMSDAY_LABEL.en} · <b>{trTitleCount('en', fp)}</b> not yet released
    </>
  ),
  marathonDoneReady: (
    <>
      Marathon complete! Ready for Doomsday. <span className="ok">✓</span>
    </>
  ),
  doomsdayHere: (
    <>
      <b>Doomsday is here!</b> 🎬
    </>
  ),
  doomsdayPace: (hPerDay, isHeavyPace) => (
    <>
      {DOOMSDAY_LABEL.en} · <b>{hPerDay}/day</b> to finish {paceIcon(isHeavyPace)}
    </>
  ),
  tmdbHelp: (
    <>
      Paste your TMDB key <b>or</b> token — both work, TMDB&apos;s settings page offers two: an <b>API Key (v3
      auth)</b>{' '}
      (32 characters) or a <b>Read Access Token (v4 auth)</b> (long token). Free: create an account at{' '}
      {tmdbSettingsLink('themoviedb.org → Settings → API')}.
    </>
  ),
};

const RICH: Record<Lang, RichMessages> = {fr: FR, en: EN};

// Falls back to French for an unknown language, mirroring t() in strings.ts.
function r(lang: Lang): RichMessages {
  return RICH[lang] ?? RICH.fr;
}

export function trAllWatchedFuturePending(lang: Lang, fp: number): ReactNode {
  return r(lang).allWatchedFuturePending(fp);
}

export function trMarathonDoneReady(lang: Lang): ReactNode {
  return r(lang).marathonDoneReady;
}

export function trDoomsdayHere(lang: Lang): ReactNode {
  return r(lang).doomsdayHere;
}

export function trDoomsdayPace(lang: Lang, hPerDay: string, isHeavyPace: boolean): ReactNode {
  return r(lang).doomsdayPace(hPerDay, isHeavyPace);
}

// Help text for the TMDB key modal — the embedded link opens TMDB's API settings page.
export function TmdbHelpText({lang}: { lang: Lang }) {
  return <>{r(lang).tmdbHelp}</>;
}
