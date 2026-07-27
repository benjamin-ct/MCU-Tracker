# Déploiement

Le site tourne sur un **Cloudflare Worker** (pas Cloudflare Pages — voir `PROJET-MCU-TRACKER.md`,
section "Déploiement", pour le piège déjà vérifié à ce sujet), nommé `mcutimeline`, servant
[mcuwatchtimeline.com](https://mcuwatchtimeline.com). Ça n'a pas changé avec la migration React ;
ce qui change, c'est qu'il y a maintenant une étape de build avant de déployer.

## Ce qui a changé depuis la version vanilla JS

| | Avant (vanilla JS) | Maintenant (React) |
|---|---|---|
| Fichiers servis | `index.html`/`css/`/`js/` à la racine du repo | `dist/` (généré par `npm run build`) |
| `wrangler.jsonc` `assets.directory` | `"./"` | `"./dist"` |
| Étape de build | Aucune | `npm ci && npm run build` avant de déployer |
| Déploiement | `npx wrangler deploy` déclenché par Cloudflare sur push `main` (intégration git du dashboard) | GitHub Actions (`.github/workflows/deploy.yml`) — voir ci-dessous |

Le nom du Worker (`mcutimeline`), le point d'entrée (`worker/index.js`, proxy TMDB sur
`/api/tmdb/*`) et la variable secrète `TMDB_KEY` restent identiques — rien à reconfigurer côté
Cloudflare sur ces points-là.

## CI/CD (GitHub Actions)

Trois workflows dans `.github/workflows/` :

- **`ci.yml`** — sur chaque push et PR : `npm ci`, `npm run typecheck`, `npm run lint`,
  `npm run build`. Ne déploie rien, juste la vérification.
- **`preview.yml`** — build + déploie sur un Worker **séparé**, `mcutimeline-preview`
  (voir le bloc `env.preview` dans `wrangler.jsonc`), sur push vers la branche de migration et
  sur les PR vers `main`. Donne une vraie URL à tester avant de fusionner, sans jamais toucher
  au Worker de prod.
- **`deploy.yml`** — build + déploie sur le Worker de **prod** (`mcutimeline`), uniquement sur
  push vers `main` (donc après fusion d'une PR) ou manuellement via "Run workflow"
  (`workflow_dispatch`).

### Secrets requis (à ajouter une seule fois)

Dans les paramètres du repo GitHub (**Settings → Secrets and variables → Actions**), ajouter :

- `CLOUDFLARE_API_TOKEN` — un token Cloudflare avec la permission **"Edit Cloudflare Workers"**
  (créé sur [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)).
- `CLOUDFLARE_ACCOUNT_ID` — l'identifiant du compte Cloudflare propriétaire du Worker (visible
  dans le dashboard Cloudflare, colonne de droite de n'importe quelle page du compte).

Sans ces deux secrets, `ci.yml` continue de fonctionner normalement (il ne les utilise pas) ;
seuls `preview.yml` et `deploy.yml` échoueront à l'étape `wrangler-action` tant qu'ils ne sont
pas configurés.

## Déployer manuellement (sans passer par la CI)

```
npm ci
npm run build
npx wrangler deploy                 # prod (mcutimeline)
npx wrangler deploy --env preview   # préversion (mcutimeline-preview)
```

Nécessite d'être authentifié localement (`npx wrangler login`) avec un compte ayant accès au
Worker `mcutimeline`.

## URL de préversion

Une fois `CLOUDFLARE_API_TOKEN`/`CLOUDFLARE_ACCOUNT_ID` configurés et `preview.yml` exécuté au
moins une fois, le Worker `mcutimeline-preview` est disponible à une URL de la forme
`https://mcutimeline-preview.<ton-sous-domaine>.workers.dev` (sous-domaine visible dans le
dashboard Cloudflare, section Workers & Pages). C'est cette URL qu'il faut utiliser pour la
checklist de vérification manuelle (`VERIFICATION-CHECKLIST.md`) avant de fusionner vers `main`.
