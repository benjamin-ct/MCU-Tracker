# Checklist de vérification manuelle — migration React

À faire sur l'URL de préversion (`mcutimeline-preview`, voir `DEPLOY.md`) avant de fusionner
cette PR, idéalement sur un vrai téléphone (iOS/Safari en particulier — voir note en bas). Il n'y
a pas encore de tests automatisés (prompt de migration : "pas de tests automatisés initialement"),
donc cette checklist est la seule vérification avant de basculer la prod.

Coche au fur et à mesure. Si un point échoue, note ce qui s'est passé avant de continuer.

## En-tête

- [ ] Le titre "Marathon MCU" et le sous-titre (Chronologique/Ordre de sortie) s'affichent
- [ ] La barre de progression (dégradé vert, perforations façon pellicule) se remplit
- [ ] Les 3 chiffres (heures restantes, chips "vues"/"terminé"/"soirées") sont cohérents entre eux
- [ ] Le countdown Doomsday affiche un nombre de jours plausible et un rythme quotidien
- [ ] Le toggle Essentiel/Tout regarder change bien les chiffres ci-dessus quand on clique dessus

## Thème et langue

- [ ] Le bouton thème (☀️/🌙) bascule clair/sombre, tout reste lisible dans les deux
- [ ] Au tout premier chargement (mode navigation privée ou après avoir vidé le site data),
      le thème suit la préférence système
- [ ] Le bouton langue (FR/EN) traduit TOUT : en-tête, sidebar, catalogue, modales, footer —
      repérer une chaîne restée en français en mode EN serait un vrai bug à signaler
- [ ] Recharger la page garde le thème et la langue choisis

## Sidebar / colonne de gauche (desktop) ou section du haut (mobile)

- [ ] "Prochain à voir" affiche le bon titre et un bouton "Marquer vu"/"Épisode vu"
- [ ] Cliquer ce bouton coche l'item ET avance sur le suivant
- [ ] "Film surprise" affiche un toast avec un titre non-vu et fait défiler jusqu'à lui (avec un
      halo qui pulse brièvement)
- [ ] "Statistiques" ouvre la modale (voir section dédiée plus bas)
- [ ] Les onglets Chronologique/Ordre de sortie changent l'organisation du catalogue
- [ ] Les filtres Tout/À voir cachent bien les items déjà vus en mode "À voir"
- [ ] Le stepper "Ce soir" (−/+) change la valeur affichée et surligne les items qui rentrent
      dans le temps dispo
- [ ] "tout déplier"/"tout replier" ouvrent/ferment tous les chapitres et toutes les séries

## Catalogue

- [ ] Les 4 chapitres (Avant les Avengers / Saga de l'Infini / Saga du Multivers / Phase 6)
      s'affichent avec le bon badge "vu/total · temps restant"
- [ ] Cocher/décocher un film : la case s'anime, la date "vu le..." apparaît/disparaît, le lien
      Disney+ disparaît une fois vu, les étoiles apparaissent une fois vu
- [ ] **Aucun décalage visuel perceptible** quand on coche/décoche (c'était un bug corrigé avant
      la migration — à re-vérifier spécifiquement sur iOS/Safari, voir note en bas)
- [ ] Cliquer une série l'ouvre/la ferme (liste d'épisodes)
- [ ] Cocher tous les épisodes un par un marque la série comme terminée (bordure verte)
- [ ] La case "cocher toute la série" fonctionne, y compris son état indéterminé (tiret) quand
      certains épisodes seulement sont vus
- [ ] Noter un titre (étoiles) fonctionne ; cliquer la même étoile à nouveau retire la note
- [ ] Le bouton "i" ouvre la fiche détaillée (voir section Modales)
- [ ] Le badge "optionnel" apparaît sur le contenu Fox/Netflix, absent sur le reste
- [ ] Un contenu pas encore sorti (2026) apparaît grisé, sans case cochable, sans lien Disney+

## Recherche

- [ ] Taper un titre (FR ou VO, ex. "iron man") filtre le catalogue et affiche "N résultats"
- [ ] Taper un nom d'acteur/réalisateur filtre aussi correctement
- [ ] Une recherche sans résultat affiche "0 résultat" et aucun chapitre
- [ ] Le bouton ✕ vide la recherche et réaffiche tout

## Modales

- [ ] **Fiche titre** : affiche générée (dégradé + initiales) ou vraie affiche TMDB, synopsis,
      budget/box-office/Rotten Tomatoes si disponibles, boutons bande-annonce/IMDb, réalisation,
      casting, scène post-crédit (ou "non confirmé" pour un film qui n'en a pas), anecdote,
      connexion à la saga
  - [ ] Le bouton IMDb ouvre bien la fiche IMDb du bon titre (pas une recherche générique)
  - [ ] Échap et le clic en dehors de la modale la ferment
- [ ] **Statistiques** : les 4 chiffres (temps vu, %, restant, cette semaine) sont cohérents avec
      l'en-tête ; le graphique de progression cumulée s'affiche si au moins 2 jours différents
      ont du contenu coché, avec un message d'invitation sinon ; le survol/tap du graphique
      affiche une bulle avec la bonne date/valeur ; la progression par chapitre et le classement
      des meilleures notes sont corrects
- [ ] **Clé TMDB** : coller une clé puis "Enregistrer" persiste (recharger la page, la clé est
      toujours là) ; "Retirer la clé" fonctionne ; un toast confirme chaque action

## Footer

- [ ] "Réinitialiser ma progression" nécessite un double clic (le texte change pour confirmer,
      revient à la normale après quelques secondes si on ne confirme pas) puis vide tout
- [ ] "Exporter" télécharge un fichier `.json` nommé avec la date du jour
- [ ] "Importer" ce même fichier restaure exactement l'état exporté (progression, notes, mode)
- [ ] Importer un fichier invalide (pas du JSON) affiche un message d'erreur, ne casse rien

## Responsive

- [ ] Sur mobile (< 768px) : une seule colonne, sidebar en haut du contenu, layout empilé
- [ ] Sur desktop (≥ 768px) : sidebar sticky à gauche (300px), en-tête compact sur 3 rangées
- [ ] Aucun élément qui déborde ou se chevauche à une largeur d'écran intermédiaire (tester en
      redimensionnant la fenêtre progressivement, pas juste aux deux extrêmes)

## PWA / Disney+

- [ ] "Ajouter à l'écran d'accueil" (iOS Safari ou Chrome Android) propose une icône correcte
      (badge hexagonal vert/or avec un "M")
- [ ] Le lien Disney+ copie le titre dans le presse-papiers (toast de confirmation) et ouvre
      Disney+ — sur iOS, ça doit ouvrir l'app Disney+ directement si elle est installée
      (Universal Link), pas juste le site web

## Après avoir tout coché

- [ ] Pas d'erreur dans la console du navigateur (F12 → Console) pendant tout le parcours
      ci-dessus
- [ ] `npm run build` (déjà vérifié par la CI, mais bon rappel) et le déploiement de préversion
      sont bien verts dans l'onglet Actions de GitHub

---

**Note iOS/Safari** : plusieurs correctifs avant la migration (le décalage au clic sur une case
à cocher, le lien profond Disney+) avaient été validés sur Chromium seul faute d'accès direct à
Safari/iOS dans l'environnement de développement, puis corrigés une seconde fois après un retour
utilisateur montrant un écart sur iPhone réel. Vérifier ces deux points spécifiquement sur un
appareil iOS réel reste la vérification la plus utile de cette checklist.
