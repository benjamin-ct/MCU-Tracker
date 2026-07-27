# Marathon MCU — Résumé du projet

## Quoi

Un tracker de visionnage MCU en **vanilla JS, sans framework, sans build**. Deux façons de parcourir le catalogue, commutables par onglet : ordre chronologique interne (par défaut — de Captain America: First Avenger, 1942 in-universe, jusqu'à Avengers: Doomsday, 18 déc. 2026) ou ordre de sortie réelle. Fonctionne comme app locale, PWA installable ("Ajouter à l'écran d'accueil"). Bilingue FR/EN et thème clair/sombre, tous deux commutables dans l'UI (voir "Thème & langue" ci-dessous).

**Utilisateur cible** : Benjamin (@benjamin-ct sur GitHub), qui suit un marathon MCU complet avant la sortie d'Avengers: Doomsday.

## Stack & contraintes

- **Multi-fichiers, zéro build.** L'app était historiquement un seul `index.html` autonome ; elle est maintenant scindée en fichiers à responsabilité unique (voir "Structure des fichiers" ci-dessous), mais **sans étape de build** : les scripts sont chargés en balises classiques (`<script src="js/...">`, pas `type="module"`), justement pour que `index.html` continue de s'ouvrir directement en local (`file://`) sans serveur — un `<script type="module">` casserait ce cas d'usage (CORS bloqué sur `file://`). Pas de dépendances externes sauf Google Fonts (Space Grotesk + DM Mono) et, optionnellement, l'API TMDB.
- **Pas de backend.** Stockage 100% `localStorage` (+ fallback `window.storage` si disponible dans l'environnement Claude).
- **Doit marcher hors-ligne** pour tout sauf : les vraies affiches TMDB et le lien Disney+ (dégradent proprement si pas de réseau).
- **Partage/déploiement** : comme l'app tient maintenant sur plusieurs fichiers, la distribuer veut dire donner tout le dossier (`index.html` + `css/` + `js/`), plus seulement un fichier `index.html`.

## Structure des fichiers

```
index.html       squelette HTML uniquement (markup + <link>/<script> tags), attributs data-i18n*
css/style.css    tous les styles ; variables de thème dans :root + :root[data-theme="light"]
js/data.js       catalogue E[] (contenu FR/neutre), INFO, PLAT, RELEASE_DATE (dates de sortie
                 réelles, pour l'onglet "Ordre de sortie" — indépendant de l'ordre de E[]),
                 constructeurs fil()/ser()/serE(), constantes (ROMANS, SEC, DOOM, MONTHS),
                 frMoney()/frRT() (transfo FR→EN générique), + instantanés FR
                 (TITLE_FR/INFO_FR_SNAPSHOT/PLAT_FR_SNAPSHOT/SEC_FR/MONTHS_FR)
js/data-en.js    overrides anglais : TITLE_EN, INFO_EN (uniquement les champs en prose libre +
                 cas particuliers budget/box/rt), SEC_EN, MONTHS_EN
js/platform.js   détection plateforme (_getPlatform/PLATFORM) + lien profond Disney+ (DP_HREF)
js/state.js      état (watchDates/mode/sortMode/ratings/tmdbKey/posterCache/viewFilter/tonightMin/
                 searchQuery), isWatched/markWatched/markUnwatched, persistance localStorage
                 (lsSet/lsGet/save), migration/boot() (reconcileLegacyChecked, syncModeToggle,
                 syncSortToggle)
js/theme.js      thème clair/sombre (initTheme/applyTheme/toggleTheme), persisté seul (mcu-theme)
js/i18n.js       langue FR/EN : STRINGS{fr,en} + t()/tr*() pour tout le texte d'UI, et
                 applyLangToContent() qui mute E[].title/INFO/SEC/MONTHS/PLAT en place
js/compute.js    calculs dérivés purs, pas de DOM (cnt, sDone, sRem, fitsTonight, matchSearch,
                 nextItem, daysLeft, estimateEvenings, totals)
js/render.js     render() principal (liste des chapitres/films/séries), groupsFor()/groupBadge()/
                 groupKeyFor() (regroupement générique Chronologique/Ordre de sortie), onCheck,
                 étoiles, updateStats/updateCountdown/updateProchain/advanceNext, stepper "ce soir"
js/modals.js     modale info ("i"), modale statistiques + graphique cumulé (SVG), génération
                 d'affiches (dégradé + initiales ou vraie affiche TMDB)
js/app.js        bootstrap : câble tous les écouteurs DOM (filtres, recherche, surprise, toggle,
                 thème, langue, TMDB, export/import, reset), icône PWA, appelle boot() au chargement
worker/index.js  Cloudflare Worker : sert le site (env.ASSETS) + proxy TMDB sur /api/tmdb/*
                 (clé TMDB_KEY côté serveur uniquement, voir "Proxy TMDB" plus bas)
wrangler.jsonc   config du Worker (name, main, assets) — voir "Proxy TMDB"
```

Ordre de chargement des `<script>` = ordre ci-dessus (`data.js` en premier, `app.js` en dernier). Comme ce sont des scripts classiques (pas des modules), tous les fichiers partagent la même portée globale — l'ordre importe pour que chaque fichier puisse référencer ce que les précédents ont déjà défini, exactement comme quand tout était dans un seul `<script>`.

## Design system

- **Thème** : palette Doctor Doom — vert (`--red: #38BF50`, en fait le vert principal malgré le nom de variable) + or (`--purple: #C8941A`, l'armure de Doom), fond quasi-noir (`--bg: #080C09`).
- **Polices** : `Space Grotesk` (titres/UI, var `--g`) + `DM Mono` (données/métadonnées, var `--m`).
- **Élément signature** : bandeau façon pellicule de film (perforations + barre de progression dégradée) en haut de page.
- **Layout** : mobile-first (colonne unique, sidebar en bas), passe en 2 colonnes (sidebar sticky 300px + contenu) à partir de 768px.

## Modèle de données (dans `js/data.js`)

```js
const E = [
  fil(id, titre, chapitre(0-3), durée_min, optionnel, année),
  ser(id, titre, chapitre, saison, nb_épisodes, durée_totale_min, optionnel),
  serE(id, titre, chapitre, saison, [durées_par_épisode], optionnel),
  ...
];
```
- 90 entrées au total (52 films + 38 séries), réparties en 4 chapitres (`SEC` / `ROMANS`) : Avant les Avengers / Saga de l'Infini / Saga du Multivers / Phase 6.
- `opt: true` = contenu "optionnel" (Fox X-Men, Netflix Defenders-verse) — masqué en mode "Essentiel", visible en mode "Tout regarder".

**`PLAT`** — dictionnaire des contenus **pas encore sortis** (dernière vérification : 25/07/2026) : `brandnewday`, `yfns2`, `visionquest`, `doomsday`. C'est la **source unique de vérité** pour "pas encore sorti" via `isFuture(e)` — utilisée pour exclure des totaux/soirées/countdown, désactiver la case à cocher, masquer le lien Disney+, etc. **Ne jamais dupliquer cette logique ailleurs.**

**`INFO`** — dictionnaire par id avec les champs pour la modale "i" : `synopsis`, `director`, `cast` (2-3 noms principaux affichés), `pc` (scène post-crédit), `budget`, `box` (box-office), `rt` (score Rotten Tomatoes), `triv` (anecdote), `link` (connexion à la saga), `yt` (URL bande-annonce — anglaise par défaut, mutée par `applyLangToContent()` en FR quand `TRAILER_FR[id]` existe), `tmdb: {id, type}` (pour fetch API poster uniquement), `poster` (chemin d'affiche statique vérifié, pour les quelques titres où on a une vraie image sans avoir besoin de clé API).

**`IMDB_ID`** — dictionnaire par id, tt-id IMDb vérifié à la main pour les 90 entrées (jamais dérivé de l'API TMDB, voir décision #5 ci-dessous). Les séries splitées en plusieurs saisons partagent le même tt-id (IMDb n'a pas de fiche par saison). `imdbUrl(e)` (`js/modals.js`) construit le lien direct `https://www.imdb.com/title/${tt-id}/` ; repli sur une recherche IMDb seulement si un id venait à manquer pour un futur ajout pas encore mis à jour dans `IMDB_ID`.

**`CAST_EXTRA`** — dictionnaire par id, casting étendu (rôles secondaires/apparitions non affichés dans `INFO[id].cast` faute de place) consulté uniquement par `matchSearch()` (`js/compute.js`) pour que la recherche par acteur trouve un rôle même s'il n'apparaît pas dans la fiche.

**`TRAILER_FR`** — dictionnaire par id, URL YouTube de la bande-annonce française officielle (quand trouvée — 86/90 ; les 4 titres 2026 pas encore promus en France retombent sur la bande-annonce anglaise). Appliqué à `INFO[id].yt` par `applyLangToContent()` quand `lang==='fr'`.

**`RELEASE_DATE`** — dictionnaire par id, date de sortie **réelle** au format ISO (`'YYYY-MM-DD'`), pour les 90 entrées. Sert uniquement à l'onglet "Ordre de sortie" (tri + regroupement par année) — n'a aucun effet sur le marathon en ordre chronologique interne. Dates confirmées pour tout ce qui est déjà sorti ; approximatives (mais dans le bon ordre relatif) pour le très récent/annoncé sans date figée. `releaseYear(id)` en extrait l'année pour le regroupement.

## Onglets Chronologique / Ordre de sortie

- Deux boutons dans la barre de filtres (`#sort-chrono`/`#sort-release`, au-dessus de Tout/À voir) commutent `sortMode` (`'chrono'` par défaut, ou `'release'`), persisté comme `mode`. Le choix Essentiel/Tout regarder (`mode`) et le filtre Tout/À voir (`viewFilter`) s'appliquent **identiquement dans les deux onglets** — ce sont des axes indépendants du sort.
- `groupsFor()` (`js/render.js`) est le seul endroit qui sait comment découper `E` en chapitres repliables selon `sortMode` : 4 chapitres narratifs (`SEC`) en mode `chrono`, un par année de sortie réelle (triés par `RELEASE_DATE`) en mode `release`. `render()` ne fait qu'itérer ce que `groupsFor()` renvoie — pour ajouter un futur 3ᵉ mode de tri, il suffit d'ajouter un cas dans `groupsFor()`.
- Les deux modes partagent un seul Set de replis, `cGroup` (ex-`cSec`), avec des clés préfixées (`chrono-0`, `release-2016`...) pour ne jamais collisionner entre les deux modes ; changer d'onglet vide `cGroup` (on repart toujours sur un affichage tout déplié dans le nouvel onglet).
- Le bouton "Film surprise" doit ouvrir le bon chapitre quel que soit l'onglet actif : `groupKeyFor(e)` calcule la clé de groupe de l'entrée **dans le mode courant**, à ne jamais remplacer par un accès direct à `e.sec`.
- `nextItem()`/`updateProchain()`/le countdown restent basés sur l'ordre chronologique interne (`E[]`) **quel que soit l'onglet affiché** — le marathon recommandé ("prochain à voir") est un concept indépendant de l'onglet de navigation actif, volontairement.
- Un chapitre/année se replie automatiquement dès que son dernier item est coché (`autoCollapseIfGroupDone()`, `js/render.js`, appelée depuis `onCheck()`, le `change` du checkbox groupé d'une série et `advanceNext()`) — jamais au décochage, pour ne pas re-replier un chapitre déjà fini que l'utilisateur aurait rouvert exprès pour le consulter. Même principe déjà en place pour une série individuelle (`cSer`), étendu ici au groupe entier (`cGroup`).

## Thème & langue

- **Thème clair/sombre** : bouton ☀️/🌙 dans le header (`#theme-btn`). État = attribut `data-theme` sur `<html>` (`"dark"` ou `"light"`), lu par les variables CSS dans `css/style.css`. Au tout premier chargement (rien en `localStorage`), part de `prefers-color-scheme` système ; ensuite le choix manuel (persisté dans `mcu-theme`) a toujours priorité et n'est plus jamais écrasé par le système. Toute nouvelle couleur ajoutée au CSS doit passer par une variable (`--xxx`) définie dans les deux blocs `:root`/`:root[data-theme="light"]`, jamais une couleur en dur, sinon elle ne s'adapte pas au thème clair.
- **Langue FR/EN** : bouton `#lang-btn` dans le header (affiche la langue *vers laquelle* basculer, pas la langue actuelle). État = variable globale `lang` (`js/i18n.js`), persistée dans `mcu-lang` (pas de sync via `window.storage` — c'est une préférence d'affichage locale, comme la clé TMDB, pas une donnée de progression). **Aucune chaîne visible par l'utilisateur ne doit être écrite en dur ailleurs que dans `js/i18n.js`** (STRINGS + fonctions `tr*()`) et `js/data.js`/`js/data-en.js` (contenu du catalogue) — toute nouvelle chaîne d'UI passe par `t('cléExistante')` ou une nouvelle entrée dans `STRINGS`.
  - Le contenu (`E[].title`, champs de `INFO`, `SEC`, `MONTHS`, `PLAT[id].l`/`.date`) n'est **pas dupliqué par langue dans le reste du code** : `applyLangToContent()` mute ces mêmes objets en place quand la langue change (exactement comme `mode`/`watchDates` sont mutés en place ailleurs), donc `render.js`/`modals.js`/`app.js` continuent de lire `e.title`, `INFO[id].synopsis`, `SEC[i]` sans changement, quelle que soit la langue active.
  - `js/data.js` ne contient QUE le français (+ les champs neutres `director`/`cast`/`yt`/`tmdb`/`poster`, qui ne sont jamais dupliqués côté anglais). `js/data-en.js` ne contient QUE ce qui diffère en anglais. Pour `budget`/`box`/`rt`, la transformation FR→EN est automatique par défaut (`frMoney()`/`frRT()` dans `data.js`, gèrent `Md$`→`B`, `M$`→`$…M`, `critique/public`→`critics/audience`, `pas encore sorti`→`not yet released`) ; n'ajouter un override dans `INFO_EN` que si le texte français contient un mot qui ne rentre pas dans ce moule (ex. "au total", "épisode", "record pour une série...").
  - **Piège vérifié en prod** : `totals()` retourne un champ nommé `t` (minutes totales) — ne jamais le destructurer sous ce nom (`const{t,...}=totals()`) dans une fonction qui appelle aussi `t('clé')` (la fonction i18n globale), ça masque la fonction et casse silencieusement tout `t(...)` dans la portée (bug réel rencontré dans `updateStats()`/`openStats()`, corrigé en renommant en `tot`).
  - Toute nouvelle entrée dans `E`/`INFO` doit avoir un pendant anglais dans `data-en.js` : `TITLE_EN[id]` seulement si le titre anglais diffère du titre FR affiché (sinon fallback automatique), et `INFO_EN[id]` avec au minimum `synopsis`/`triv`/`link` (+ `pc` si le film en a un, + `cast` si le champ FR contient de la prose descriptive comme "voix"/"narrateur" plutôt que des noms propres).

## Décisions d'architecture importantes (ne pas régresser dessus)

1. **`watchDates` est l'unique source de vérité** pour "vu ou pas" (`isWatched(id)` = `id in watchDates`). Il n'y a **pas** de Set `checked` séparé — ça a existé avant et causait des incohérences (stats "vu cette semaine" fausses). `markWatched(id)` / `markUnwatched(id)` sont les seuls points d'entrée. (`js/state.js`)
2. **`render()` est complet à chaque changement d'état** (pas de patch DOM ciblé). C'est volontaire : ça a corrigé plusieurs bugs de synchronisation (lien Disney+ qui ne disparaissait pas, étoiles, badges). Attention : ne pas ajouter d'animation CSS globale sur les lignes/chapitres (`.row`, `.sg`, `.ch`) — un essai avec `fadeIn` a fait "flasher" tout l'écran puisque tout se re-render à chaque clic. Revers de la médaille : cocher un film/une série change la hauteur de sa ligne (lien Disney+ qui disparaît, date + étoiles qui apparaissent), donc tout ce qui suit se décale d'autant pendant que le scroll, lui, ne bouge pas — décalage visible sous le doigt (bug rapporté et corrigé le 27/07/2026). Toujours appeler `renderKeepingAnchor(anchorId)` plutôt que `render()` nu depuis un handler de checkbox : elle note la position à l'écran de l'élément `anchorId` avant, ré-exécute `render()`, puis corrige le scroll pour que cet élément ne bouge pas. (`js/render.js`)
3. **Le bouton "i" est un frère du `<label>`, jamais un enfant.** Sur mobile, un tap imprécis dans un `<label>` déclenche la checkbox associée même avec `stopPropagation()`. Structure : `.row-top` contient `<label>` (checkbox+titre) + `<button class="info-btn">` comme éléments flex séparés. (`js/render.js`, `css/style.css`)
4. **`window.prompt()` / `alert()` / `confirm()` sont à éviter** — bloqués silencieusement dans l'aperçu Claude (iframe sandboxée). Utiliser de vraies modales HTML (voir `#tmdb-modal` comme modèle).
5. **Toute image/lien externe dépendant d'un fetch doit avoir un fallback gracieux qui marche tout de suite, pas seulement en cas d'erreur.** L'aperçu Claude bloque aussi le chargement d'images/requêtes vers des domaines externes dans certains contextes. Voir `applyPosterUrl()` dans `js/modals.js` : précharge via `new Image()` avec `onerror` avant de remplacer le dégradé généré. Chaîne de repli complète pour les affiches : chemin statique vérifié (`info.poster`) → proxy same-origin `/api/tmdb/...` (Cloudflare Worker, sans clé, voir "Proxy TMDB" ci-dessus) → clé TMDB personnelle collée dans l'app → dégradé généré. **Le bouton IMDb fait exception à "améliorer via l'API" : il ne doit PAS dépendre de TMDB du tout.** Une version précédente utilisait `fetchImdbId()` (external_ids TMDB) pour upgrader un lien de recherche en lien direct — mais ça revient à un lien de recherche pour tout le monde tant qu'aucune clé TMDB n'est configurée, ce qui n'est pas acceptable pour un lien censé être direct. Design actuel : `IMDB_ID` (tt-ids vérifiés à la main, voir "Modèle de données") donne le lien direct **tout de suite, pour tout le monde**, sans aucun fetch ni clé.
6. **Ne jamais mettre un secret (clé API, jeton) dans du JS servi au navigateur**, même via une "variable d'environnement" côté hébergeur — si elle finit dans le bundle client, elle est visible par n'importe qui (onglet réseau, "voir le code source"). Un secret qui doit rester secret vit dans un script serveur (`worker/index.js`, `env.TMDB_KEY` en type **Secret**, jamais "Variable" — une Variable Cloudflare reste affichée en clair dans le dashboard) qui ne renvoie au client que le résultat déjà filtré, jamais la clé elle-même. Voir "Proxy TMDB" ci-dessus.
7. **Filtres "Tout"/"À voir" et boutons "tout déplier"/"tout replier" doivent appeler `render()` explicitement** — ils ne font pas que togguer une classe CSS, sinon les changements ne s'appliquent qu'au prochain re-render déclenché ailleurs.
8. **Le toggle Essentiel/Tout regarder doit être resynchronisé via `syncModeToggle()`** (`js/state.js`) à chaque fois que `mode` change par un autre chemin que son propre clic — ex. après un import JSON. Oublier cet appel laisse la pastille visuelle sur l'ancien mode alors que le contenu affiché a changé (bug corrigé le 26/07/2026).
9. **Le compteur de résultats de recherche doit refléter les entrées réellement visibles**, pas le total des entrées qui matchent — en mode "À voir", les entrées déjà vues sont matchées par la recherche mais masquées en CSS (`body.view-todo .row.done{display:none}`) ; le compte doit être filtré pareil (voir `render()` dans `js/render.js`, bug corrigé le 26/07/2026).
10. **Scripts classiques, jamais `type="module"`**, pour garder `index.html` ouvrable en double-clic (`file://`) sans serveur. Voir "Stack & contraintes" ci-dessus.

## Fonctionnalités déjà en place

- Suivi coché/décoché par film et par épisode, mode Essentiel/Tout regarder
- Deux onglets de navigation : Chronologique (interne) / Ordre de sortie (réelle), voir section dédiée ci-dessus
- Recherche (titre affiché + VO via `TITLE_EN`, + acteur/réalisateur via `INFO[id].cast`/`.director` + rôles secondaires/apparitions via `CAST_EXTRA`), quelle que soit la langue active
- Filtre "À voir" (masque les items/chapitres/séries entièrement vus)
- "Ce soir" (stepper de minutes dispo, highlight les contenus qui rentrent)
- "Film surprise" (aléatoire parmi le non-vu, exclut le pas-sorti)
- Countdown vers Doomsday (18 déc. 2026) avec rythme quotidien nécessaire, et message honnête si contenu non-sorti restant
- Statistiques : temps vu, %, graphique de progression cumulée (SVG, hover/tap interactif), progression par chapitre, meilleures notes
- Notation 5 étoiles par titre (persiste même si décoché ensuite, mais ne s'affiche que si actuellement coché)
- Export/Import JSON de la progression
- Modale "i" par titre : affiche générée (dégradé + initiales, ou vraie affiche TMDB), synopsis, réalisation, casting, scène post-crédit, budget/box-office/RT, anecdote, connexions à la saga, lien bande-annonce (VF via `TRAILER_FR` si dispo, sinon VO), bouton IMDb (jaune/amber, lien direct via `IMDB_ID` — ne dépend jamais de TMDB/clé API)
- Intégration TMDB optionnelle (clé v3 ou v4 auto-détectée) pour affiches réelles uniquement, avec cache localStorage
- Lien profond Disney+ (Universal Link iOS)
- Icône PWA générée dynamiquement (canvas, badge hexagonal vert/or)
- Thème clair/sombre (bouton, respecte la préférence système au premier lancement, puis persisté)
- Langue FR/EN (bouton, persisté) — traduction complète : interface **et** contenu (titres, synopsis, anecdotes, connexions de saga des 90 films/séries)

## Ce qui NE marche PAS dans l'aperçu Claude (mais marche en dehors)

- `window.prompt()` / dialogues natifs → bloqués silencieusement
- Chargement d'images externes (posters TMDB, y compris les chemins statiques vérifiés) → probablement bloqué par CSP, à tester hors aperçu (Safari/Chrome direct, ou déployé)
- Appels `fetch()` vers des APIs externes (TMDB), et le CDN Google Fonts → idem
- **Toujours vérifier un bug potentiel en dehors de l'aperçu Claude avant de conclure à un vrai bug de code** — plusieurs "bugs" rapportés étaient en fait des restrictions d'environnement, confirmées via tests Playwright réels montrant que le code fonctionnait correctement (que ce soit servi en HTTP ou ouvert en `file://`).

## Déploiement

- **GitHub** : repo `benjamin-ct/MCU-Tracker`, branche `main`. Contient `index.html` + `css/` + `js/` + `worker/` + `wrangler.jsonc` + `.assetsignore` + ce fichier + `README.md`. Poussé directement par Claude Code (accès en écriture) — le connecteur GitHub de Claude.ai classique reste lecture seule par design, différent de l'intégration Claude Code.
- **Netlify** : site `mcu-tracker-chrono` (site ID `1bbbb62c-61bf-4998-8bd9-8dac23f1438a`). Déploiement géré par l'utilisateur directement (hors Claude) — ne pas retenter de déployer dessus sans demande explicite.
- **Cloudflare Worker** : site en production sur [mcuwatchtimeline.com](https://mcuwatchtimeline.com) (domaine perso de l'utilisateur), Worker nommé `mcutimeline`, géré par l'utilisateur directement, déployé via `npx wrangler deploy` sur chaque push `main` (git-connecté dans le dashboard Cloudflare). **Ce n'est PAS un projet Cloudflare Pages** malgré le nom — piège vérifié le 27/07/2026 : un premier essai avait ajouté un dossier `functions/` façon Pages Functions, qui n'est jamais exécuté par un Worker (routing par fichiers spécifique à Pages). Le bon mécanisme pour un Worker est `wrangler.jsonc` (`main` + `assets`) + un unique script d'entrée, voir `worker/index.js` et "Proxy TMDB" ci-dessous. Nécessite que `TMDB_KEY` soit configurée en type **Secret** (pas "Variable" — une Variable reste visible en clair dans le dashboard) dans Settings → Variables et secrets, pour que les affiches marchent automatiquement pour les visiteurs.
- **Workflow actuel** : Claude (cette conversation ou une autre) modifie les fichiers directement dans le repo GitHub via Claude Code (accès écriture), commit et push sur `main`.

## Proxy TMDB (`worker/index.js` + `wrangler.jsonc`)

- **But** : sur mcuwatchtimeline.com, aucun visiteur n'a besoin de générer sa propre clé TMDB pour voir les vraies affiches (contrairement à avant, où il fallait coller une clé personnelle dans le bouton "🔑 Affiches TMDB").
- **Pourquoi un Worker qui garde la clé et pas juste une variable d'environnement lue côté client** : une variable d'environnement injectée dans du JS qui tourne dans le navigateur reste visible par n'importe qui (onglet réseau, "voir le code source") — ce n'est pas un vrai secret. `worker/index.js` tourne côté serveur : lui seul lit `env.TMDB_KEY`, et ne renvoie au client que `{poster: "/xxx.jpg"|null}`, jamais la clé ni la réponse TMDB complète.
- **Config** (`wrangler.jsonc`) : `name` doit rester `mcutimeline` (sinon `wrangler deploy` créerait un nouveau Worker au lieu de mettre à jour l'existant) ; `main:"worker/index.js"` = point d'entrée exécuté pour CHAQUE requête ; `assets:{directory:"./",binding:"ASSETS"}` = sert le reste du repo (`index.html`/`css/`/`js/`) tel quel via `env.ASSETS.fetch(request)`. `.assetsignore` (racine) exclut `worker/`, `wrangler.jsonc`, et les fichiers non liés au site (`README.md`, `PROJET-MCU-TRACKER.md`, `.git`) de l'upload en tant qu'assets publics.
- **Route** : `GET /api/tmdb/<movie|tv>/<id>` — `worker/index.js` intercepte ce préfixe dans son `fetch(request,env)`, délègue tout le reste à `env.ASSETS.fetch(request)`. Réponses : `200 {poster}` (y compris `poster:null` si TMDB répond 404 — ce n'est pas une panne, juste "pas d'affiche"), `501` si `TMDB_KEY` n'est pas configurée, `400` si type/id invalide, `502` si TMDB répond une autre erreur ou si le réseau échoue.
- **Client** (`js/modals.js`, `fetchPosterViaProxy()`/`fetchRealPoster()`) : essaie d'abord ce proxy same-origin, sans clé. Si la réponse n'est pas `res.ok` (route absente — `file://`, hébergeur qui n'exécute pas `worker/index.js`, clé serveur pas configurée — ou erreur réseau), retombe sur la clé TMDB personnelle si l'utilisateur en a collé une dans l'app, puis sur l'affiche générée (dégradé + initiales) en dernier recours — jamais de crash, même chaîne de repli que le reste de l'app (voir décision d'architecture #5).
- **Limite connue** : ce proxy ne tourne que via `worker/index.js`, donc seulement sur ce déploiement Cloudflare Worker précis. Un `index.html` ouvert en `file://`, ou hébergé ailleurs (Netlify, une simple Cloudflare Pages sans ce script...), continue de fonctionner exactement comme avant — juste sans le bénéfice du proxy, via les mêmes replis.

## Convention de nommage des ids (dans `js/data.js`, tableau `E`)

- Films MCU mainline : nom court en un mot (`cap1`, `ironman2`, `avengers4`, `thor3`...)
- Séries avec plusieurs saisons : même id de base + suffixe (`dd_s1`/`dd_s2`/`dd_s3` pour Daredevil Netflix, `loki1`/`loki2`, `whatif1`/`2`/`3`)
- Fox X-Men : noms descriptifs (`xfirstclass`, `xdofp`, `xapocalypse`...)
- Tout nouvel ajout doit suivre ces conventions et être inséré au bon endroit chronologique dans `E`, avec une entrée `INFO` complète (tous les champs, y compris `tmdb` si applicable) **et** son pendant dans `js/data-en.js` (voir "Thème & langue" ci-dessus) — sinon le nouveau titre reste en français quand l'utilisateur est en mode anglais.
