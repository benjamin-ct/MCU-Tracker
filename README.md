# MCU-Tracker — Marathon MCU

Un tracker de visionnage pour suivre un marathon complet du Marvel Cinematic Universe dans l'**ordre chronologique interne** (pas l'ordre de sortie) — de *Captain America: First Avenger* (1942 in-universe) jusqu'à *Avengers: Doomsday* (18 déc. 2026).

Vanilla JS, sans framework, sans étape de build. Fonctionne hors-ligne, installable comme PWA ("Ajouter à l'écran d'accueil").

## Utilisation

Ouvre `index.html` dans un navigateur — en local (double-clic) ou via un hébergement statique. Aucune installation ni build requis.

## Fonctionnalités

- Suivi coché/décoché par film et par épisode de série
- Deux modes : **Essentiel** (MCU mainline uniquement) ou **Tout regarder** (inclut les X-Men Fox et les séries Netflix Defenders)
- Recherche (titres FR et VO)
- Filtre "À voir"
- "Ce soir" : indique ce qui rentre dans le temps dispo
- "Film surprise" aléatoire parmi le non-vu
- Countdown vers *Avengers: Doomsday* avec rythme quotidien nécessaire
- Statistiques : temps visionné, progression cumulée (graphique), progression par chapitre, meilleures notes
- Notation 5 étoiles par titre
- Export/Import JSON de la progression
- Fiche détaillée par titre (synopsis, casting, scène post-crédit, budget/box-office, anecdotes, bande-annonce)
- Affiches réelles via l'API TMDB — automatique sur [mcuwatchtimeline.com](https://mcuwatchtimeline.com) (proxy serveur, aucune config visiteur) ; sinon clé personnelle optionnelle à coller dans l'app (voir section TMDB ci-dessous)
- Lien direct vers Disney+
- Icône PWA générée dynamiquement

## Structure du projet

```
index.html                        squelette HTML
css/style.css                     styles
js/data.js                        catalogue des films/séries, infos détaillées
js/platform.js                    détection plateforme + lien profond Disney+
js/state.js                       état, persistance (localStorage), migration
js/compute.js                     calculs dérivés (totaux, filtres, recherche...)
js/render.js                      rendu de la liste principale
js/modals.js                      modale infos, modale statistiques, graphique
js/app.js                         câblage des événements, démarrage de l'app
worker/index.js                   Cloudflare Worker : sert le site + proxy TMDB (clé côté serveur)
wrangler.jsonc                    config du Worker (nom, assets statiques, point d'entrée)
```

Voir `PROJET-MCU-TRACKER.md` pour le détail de l'architecture et les décisions à ne pas régresser.

## TMDB

This product uses the TMDB API but is not endorsed or certified by TMDB.

Sur le déploiement Cloudflare Worker (mcuwatchtimeline.com), les affiches réelles marchent pour tout le monde sans configuration grâce à `worker/index.js`, qui garde la clé côté serveur. Pour l'activer sur ton propre déploiement Cloudflare Worker :

1. Génère une clé (gratuite) sur [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api) — clé v3 ou jeton v4, les deux marchent.
2. Dans le dashboard Cloudflare du Worker : **Settings → Variables et secrets → Ajouter**, type **Secret** (pas "Variable" — un secret n'est jamais réaffiché en clair dans le dashboard une fois enregistré, contrairement à une variable), nom `TMDB_KEY`, valeur = ta clé.
3. Redéploie (ou attends le prochain déploiement déclenché par un push sur `main`) pour que le Worker la prenne en compte.

Sans cette variable configurée (ou sur un hébergement qui n'exécute pas `worker/index.js`, ou en ouvrant `index.html` en local via `file://`), l'app retombe automatiquement sur une clé TMDB personnelle collée dans le bouton "🔑 Affiches TMDB", ou sinon sur l'affiche générée (dégradé + initiales) — jamais de crash.

⚠️ Si une clé a déjà été saisie en type "Variable" (visible en clair dans le dashboard), considère-la comme compromise : régénère-la sur TMDB et ressaisis la nouvelle valeur en type **Secret**.
