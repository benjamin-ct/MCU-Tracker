// ── LANGUE (FR/EN) ────────────────────────────────────────
// `lang` est l'unique source de vérité pour la langue d'affichage (comme `mode` pour
// Essentiel/Tout, ou `watchDates` pour vu/pas-vu). Toutes les chaînes affichées à
// l'utilisateur passent par ce fichier : soit via t('clé') pour du texte simple, soit
// via une des fonctions tr*() ci-dessous pour du texte avec pluriel/valeurs insérées.
// N'ajoute jamais une chaîne FR en dur ailleurs dans le code — passe par ici.
let lang='fr';

const STRINGS={
  fr:{
    chronoOrder:"Ordre Chronologique",
    remainingLbl:"Restantes",
    modeEssential:"Essentiel",
    modeAll:"Tout regarder",
    surpriseBtn:"🎲 Film surprise",
    statsBtn:"📊 Statistiques",
    filterAll:"Tout",
    filterTodo:"À voir",
    sortChrono:"Chronologique",
    sortRelease:"Ordre de sortie",
    tonightLbl:"Ce soir :",
    expandAll:"tout déplier",
    collapseAll:"tout replier",
    searchPlaceholder:"Rechercher un film ou une série…",
    resetBtn:"Réinitialiser ma progression",
    resetConfirm:"Confirmer la réinitialisation ?",
    exportBtn:"↓ Exporter",
    importBtn:"↑ Importer",
    tmdbBtn:"🔑 Affiches TMDB",
    optionalBadge:"optionnel",
    optionalNote:"sans impact sur le fil principal",
    footerNote1:"Ordre chronologique interne. Séries Netflix et univers Fox marqués optionnel. Durées non sorties = estimations.",
    tmdbHelp1:"Colle ta clé <b>ou</b> ton jeton TMDB — les deux fonctionnent, la page réglages en propose deux : <b>Clé API (v3 auth)</b> (32 caractères) ou <b>Jeton de lecture API (v4 auth)</b> (long jeton). Gratuit : crée un compte sur <a href=\"https://www.themoviedb.org/settings/api\" target=\"_blank\" style=\"color:var(--red)\">themoviedb.org → Paramètres → API</a>.",
    tmdbHelp2:"💡 Si l'affiche ne charge pas, un message d'erreur t'indiquera pourquoi (clé invalide, réseau bloqué, etc.).",
    tmdbInputPlaceholder:"Colle ta clé ici…",
    tmdbSave:"Enregistrer",
    tmdbClear:"Retirer la clé",
    hoursWatchedSuffix:"vues",
    completedSuffix:"terminé",
    eveningsSuffix:"soirées",
    markWatchedBtn:"Marquer vu",
    episodeWatchedBtn:"Épisode vu",
    upNextLbl:"Prochain à voir",
    tonightFitsInline:"ce soir ✓",
    tonightTag:"ce soir",
    episodesAbbrev:"éps",
    episodeWord:"Épisode",
    episodeUnit:"épisode",
    boxOfficeLbl:"Box-office",
    boxOfficeWorldLbl:"Box-office mondial",
    trailerBtn:"▶ Bande-annonce",
    directorLbl:"Réalisation",
    castLbl:"Avec",
    postCreditLbl:"🎬 Post-crédit",
    postCreditUnknown:"Non confirmé pour ce titre",
    triviaLbl:"📌 Anecdote",
    sagaLinkLbl:"🔗 Dans la saga",
    noInfoYet:"Pas encore d'informations détaillées pour ce contenu.",
    chartEmptyMsg:"Regarde et coche des contenus sur plusieurs jours différents pour voir ta courbe de progression ici.",
    statsTitle:"📊 Statistiques",
    timeWatchedLbl:"Temps visionné",
    completedLbl2:"Complété",
    remainingLbl2:"Restant",
    thisWeekLbl:"Cette semaine",
    cumulativeProgressLbl:"Progression cumulée",
    hoverChartHint:"— survole ou touche la courbe",
    progressByChapterLbl:"Progression par chapitre",
    rateHint:"Note les contenus après les avoir cochés pour voir tes stats ici.",
    tmdbErrInvalidKey:"⚠ Clé TMDB invalide ou expirée",
    tmdbErrNotFound:"⚠ Titre introuvable sur TMDB",
    tmdbNoPoster:"Pas d'affiche disponible sur TMDB pour ce titre",
    tmdbErrNetwork:"⚠ Impossible de contacter TMDB (réseau bloqué ou hors-ligne)",
    surpriseNoneLeft:"🎉 Tout est vu (parmi ce qui est sorti) !",
    tmdbKeySaved:"🔑 Clé TMDB enregistrée",
    tmdbKeyRemoved:"Clé TMDB retirée",
    exportedMsg:"↓ Progression exportée",
    importedMsg:"✓ Progression importée !",
    invalidFileMsg:"⚠ Fichier invalide",
    marathonDoneNoFuture:"🎬 Marathon terminé — bravo !",
  },
  en:{
    chronoOrder:"Chronological Order",
    remainingLbl:"Remaining",
    modeEssential:"Essential",
    modeAll:"Watch Everything",
    surpriseBtn:"🎲 Surprise pick",
    statsBtn:"📊 Statistics",
    filterAll:"All",
    filterTodo:"To watch",
    sortChrono:"Chronological",
    sortRelease:"Release order",
    tonightLbl:"Tonight:",
    expandAll:"expand all",
    collapseAll:"collapse all",
    searchPlaceholder:"Search a movie or series…",
    resetBtn:"Reset my progress",
    resetConfirm:"Confirm reset?",
    exportBtn:"↓ Export",
    importBtn:"↑ Import",
    tmdbBtn:"🔑 TMDB Posters",
    optionalBadge:"optional",
    optionalNote:"no impact on the main storyline",
    footerNote1:"Internal chronological order. Netflix series and the Fox universe are marked optional. Unreleased runtimes are estimates.",
    tmdbHelp1:"Paste your TMDB key <b>or</b> token — both work, TMDB's settings page offers two: an <b>API Key (v3 auth)</b> (32 characters) or a <b>Read Access Token (v4 auth)</b> (long token). Free: create an account at <a href=\"https://www.themoviedb.org/settings/api\" target=\"_blank\" style=\"color:var(--red)\">themoviedb.org → Settings → API</a>.",
    tmdbHelp2:"💡 If the poster doesn't load, an error message will tell you why (invalid key, blocked network, etc.).",
    tmdbInputPlaceholder:"Paste your key here…",
    tmdbSave:"Save",
    tmdbClear:"Remove key",
    hoursWatchedSuffix:"watched",
    completedSuffix:"complete",
    eveningsSuffix:"evenings",
    markWatchedBtn:"Mark watched",
    episodeWatchedBtn:"Episode watched",
    upNextLbl:"Up next",
    tonightFitsInline:"tonight ✓",
    tonightTag:"tonight",
    episodesAbbrev:"eps",
    episodeWord:"Episode",
    episodeUnit:"episode",
    boxOfficeLbl:"Box Office",
    boxOfficeWorldLbl:"Worldwide Box Office",
    trailerBtn:"▶ Trailer",
    directorLbl:"Director",
    castLbl:"Starring",
    postCreditLbl:"🎬 Post-credit scene",
    postCreditUnknown:"Not confirmed for this title",
    triviaLbl:"📌 Trivia",
    sagaLinkLbl:"🔗 Saga connection",
    noInfoYet:"No detailed information yet for this title.",
    chartEmptyMsg:"Watch and check off content across several different days to see your progress curve here.",
    statsTitle:"📊 Statistics",
    timeWatchedLbl:"Time watched",
    completedLbl2:"Completed",
    remainingLbl2:"Remaining",
    thisWeekLbl:"This week",
    cumulativeProgressLbl:"Cumulative progress",
    hoverChartHint:"— hover or tap the chart",
    progressByChapterLbl:"Progress by chapter",
    rateHint:"Rate content after checking it off to see your stats here.",
    tmdbErrInvalidKey:"⚠ Invalid or expired TMDB key",
    tmdbErrNotFound:"⚠ Title not found on TMDB",
    tmdbNoPoster:"No poster available on TMDB for this title",
    tmdbErrNetwork:"⚠ Couldn't reach TMDB (blocked network or offline)",
    surpriseNoneLeft:"🎉 Everything's watched (among what's out)!",
    tmdbKeySaved:"🔑 TMDB key saved",
    tmdbKeyRemoved:"TMDB key removed",
    exportedMsg:"↓ Progress exported",
    importedMsg:"✓ Progress imported!",
    invalidFileMsg:"⚠ Invalid file",
    marathonDoneNoFuture:"🎬 Marathon complete — well done!",
  }
};
function t(key){return STRINGS[lang]?.[key]??STRINGS.fr[key]??key;}

// ── Chaînes avec pluriel / valeurs insérées ───────────────
function trResultCount(n){return lang==='en'?`${n} result${n!==1?'s':''}`:`${n} résultat${n!==1?'s':''}`;}
function trTitleCount(n){return lang==='en'?`${n} title${n!==1?'s':''}`:`${n} titre${n>1?'s':''}`;}
function trEpisodeCount(n){return lang==='en'?`${n} episode${n>1?'s':''}`:`${n} épisode${n>1?'s':''}`;}
function trRatedCount(n){return lang==='en'?`${n} rated`:`${n} noté${n>1?'s':''}`;}
function trTmdbErrGeneric(status){return lang==='en'?`⚠ TMDB error (${status})`:`⚠ Erreur TMDB (${status})`;}
function trAllWatchedFuturePending(fp){
  return lang==='en'
    ?`All available watched <span class="ok">✓</span> · <b>${fp}</b> ${trTitleCount(fp)} not yet released remaining`
    :`Tout vu de disponible <span class="ok">✓</span> · <b>${fp}</b> ${trTitleCount(fp)} pas encore sorti${fp>1?'s':''} restant${fp>1?'s':''}`;
}
function trMarathonDoneReady(){
  return lang==='en'
    ?`Marathon complete! Ready for Doomsday. <span class="ok">✓</span>`
    :`Marathon terminé ! Prêt pour Doomsday. <span class="ok">✓</span>`;
}
function trDoomsdayHere(){
  return lang==='en'?`<b>Doomsday is here!</b> 🎬`:`<b>Doomsday est là !</b> 🎬`;
}
function trDoomsdayPace(hPerDay,cls,icon){
  return lang==='en'
    ?`Doomsday — Dec 18, 2026 · <b>${hPerDay}/day</b> to finish <span class="${cls}">${icon}</span>`
    :`Doomsday — 18 déc 2026 · <b>${hPerDay}/jour</b> pour finir <span class="${cls}">${icon}</span>`;
}
function trUpNextEmptyFuture(fp){
  return lang==='en'
    ?`🎬 Everything available is watched — ${trTitleCount(fp)} not yet released`
    :`🎬 Tout est vu de disponible — ${trTitleCount(fp)} pas encore sorti${fp>1?'s':''}`;
}
function trCopiedForDisney(short){
  return lang==='en'?`📋 "${short}" copied — search on Disney+`:`📋 "${short}" copié — cherche dans Disney+`;
}
function trAvgRated(avg,n){
  return lang==='en'?`⭐ Best rated · Average ${avg}/5 (${trRatedCount(n)})`:`⭐ Meilleures notes · Moyenne ${avg}/5 (${trRatedCount(n)})`;
}

// ── Contenu (E[].title, INFO, SEC, MONTHS, PLAT) : mutation en place ──────────
// Comme pour `mode`/`watchDates`, on ne duplique pas le rendu par langue : les mêmes
// objets JS (E, INFO, SEC, MONTHS, PLAT) sont mutés en place quand la langue change,
// donc TOUT le reste du code (render.js, modals.js, app.js) continue de lire
// `e.title`, `INFO[id].synopsis`, `SEC[i]`, `MONTHS[i]` sans le moindre changement.
function applyLangToContent(){
  E.forEach(e=>{e.title=lang==='en'?(TITLE_EN[e.id]||TITLE_FR[e.id]):TITLE_FR[e.id];});
  Object.keys(INFO).forEach(id=>{
    const fr=INFO_FR_SNAPSHOT[id],en=INFO_EN[id]||{};
    INFO[id].synopsis = lang==='en' ? (en.synopsis??fr.synopsis) : fr.synopsis;
    INFO[id].cast      = lang==='en' ? (en.cast??fr.cast)           : fr.cast;
    INFO[id].pc        = lang==='en' ? (en.pc??fr.pc)               : fr.pc;
    INFO[id].triv      = lang==='en' ? (en.triv??fr.triv)           : fr.triv;
    INFO[id].link      = lang==='en' ? (en.link??fr.link)           : fr.link;
    INFO[id].budget    = lang==='en' ? (en.budget??frMoney(fr.budget)) : fr.budget;
    INFO[id].box       = lang==='en' ? (en.box??frMoney(fr.box))       : fr.box;
    INFO[id].rt        = lang==='en' ? (en.rt??frRT(fr.rt))            : fr.rt;
  });
  SEC.length=0;SEC.push(...(lang==='en'?SEC_EN:SEC_FR));
  MONTHS.length=0;MONTHS.push(...(lang==='en'?MONTHS_EN:MONTHS_FR));
  Object.keys(PLAT).forEach(id=>{
    const base=PLAT_FR_SNAPSHOT[id];
    PLAT[id].l=lang==='en'?base.l_en:base.l;
    PLAT[id].date=lang==='en'?base.date_en:base.date;
  });
}

// ── Application aux éléments statiques du squelette HTML ─────────────────
function applyLangToStaticDOM(){
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=t(el.dataset.i18n);});
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{el.innerHTML=t(el.dataset.i18nHtml);});
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{el.placeholder=t(el.dataset.i18nPlaceholder);});
  // Le bouton reset peut être affiché en mode "armé" (texte de confirmation) —
  // on ne le retexte que s'il n'est pas en train d'attendre une confirmation.
  const rst=document.getElementById('rst');
  if(rst&&!rst.classList.contains('armed'))rst.textContent=t('resetBtn');
}

function langBtnLabel(){return lang==='en'?'FR':'EN';}

function applyLang(l){
  lang=l;
  lsSet('mcu-lang',lang);
  applyLangToContent();
  applyLangToStaticDOM();
  const btn=document.getElementById('lang-btn');
  if(btn)btn.textContent=langBtnLabel();
  render();
}
function toggleLang(){applyLang(lang==='fr'?'en':'fr');}
function initLang(){
  const saved=lsGet('mcu-lang');
  lang=saved==='en'?'en':'fr';
  applyLangToContent();
  applyLangToStaticDOM();
  const btn=document.getElementById('lang-btn');
  if(btn)btn.textContent=langBtnLabel();
}
