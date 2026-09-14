# MCU-Tracker — Marathon MCU

Un tracker de visionnage pour suivre un marathon complet du Marvel Cinematic Universe dans l'**ordre chronologique
interne** (pas l'ordre de sortie) — de _Captain America: First Avenger_ (1942 in-universe) jusqu'à _Avengers:
Doomsday_ (18 déc. 2026).

React + TypeScript (Vite). Installable comme PWA ("Ajouter à l'écran d'accueil").

## Développement

```
npm install
npm run dev        # serveur de dev (http://localhost:5173)
npm run build      # build de prod dans dist/ (tsc -b && vite build)
npm run preview    # sert le build de dist/ en local
npm run typecheck  # tsc --noEmit
npm run lint       # eslint .
```

Voir `DEPLOY.md` pour le déploiement.

## Fonctionnalités

- Suivi coché/décoché par film et par épisode de série
- Deux modes : **Essentiel** (MCU mainline uniquement) ou **Tout regarder** (inclut les X-Men Fox et les séries Netflix Defenders)
- Deux ordres de navigation : Chronologique (interne) ou Ordre de sortie (réelle)
- Recherche (titres FR et VO, casting, réalisation)
- Filtre "À voir"
- "Ce soir" : indique ce qui rentre dans le temps dispo
- "Film surprise" aléatoire parmi le non-vu
- Countdown vers _Avengers: Doomsday_ avec rythme quotidien nécessaire
- Statistiques : temps visionné, progression cumulée (graphique), progression par chapitre, meilleures notes
- Notation 5 étoiles par titre
- Export/Import JSON de la progression
- Fiche détaillée par titre (synopsis, casting, scène post-crédit, budget/box-office, anecdotes, bande-annonce)
- Affiches réelles via l'API TMDB — automatique sur [mcuwatchtimeline.com](https://mcuwatchtimeline.com) (proxy serveur, aucune config visiteur) ; sinon clé personnelle optionnelle à coller dans l'app (voir section TMDB ci-dessous)
- Lien direct vers Disney+
- Icône PWA générée dynamiquement

## Structure du projet

```
src/
  data/          catalogue typé (90 films/séries), infos détaillées, sélecteurs de
                 localisation purs (types.ts, catalog.ts, info.ts, localize.ts, ...)
  i18n/          chaînes FR/EN (strings.ts) + helpers pluriel/interpolation (translate.ts)
  utils/         calculs dérivés purs (compute.ts, groups.ts, stats.ts, format.ts, links.ts)
  hooks/         état + effets réutilisables (useWatchProgress, useCatalogFilters,
                 useTheme, useLanguage, useTmdbPoster, useCollapseState, useToast, ...)
  components/
    Header/      bandeau du haut (marque, progression, stats, countdown, toggle mode)
    Sidebar/      "prochain à voir", actions, filtres, stepper "ce soir"
    Catalog/      chapitres/films/séries, étoiles, lien Disney+, badges
    Modals/       modale infos, modale statistiques + graphique, modale clé TMDB
    Search/       barre de recherche + compteur de résultats
    Footer/       reset, export/import, note TMDB
    Toast/        notification éphémère
  App.tsx        assemble tout ce qui précède
  main.tsx       point d'entrée Vite
worker/index.js  Cloudflare Worker : sert le site (dist/) + proxy TMDB
wrangler.jsonc   config du Worker (nom, assets, environnement de prévisualisation)
.github/workflows/  CI (typecheck/lint/build) + déploiement (prod + prévisualisation)
```

Voir `PROJET-MCU-TRACKER.md` pour le détail des décisions d'architecture originales (modèle de données, contraintes — la plupart s'appliquent encore après la migration React) et `DEPLOY.md` pour le pipeline de build/déploiement actuel.

## TMDB

This product uses the TMDB API but is not endorsed or certified by TMDB.