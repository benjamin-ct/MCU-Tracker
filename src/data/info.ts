// French base info for the "i" modal (synopsis/director/cast/budget/box/rt/trivia/
// saga link/trailer/poster), one entry per catalogue id. See types.ts for the shape.
import type { InfoEntry, InfoOverride } from './types';

export const INFO: Record<string, InfoEntry> = {
  "cap1": {
    "synopsis": "Un jeune homme chétif devient un supersoldat pour combattre HYDRA pendant la Seconde Guerre mondiale.",
    "director": "Joe Johnston",
    "cast": "Chris Evans, Hayley Atwell, Sebastian Stan",
    "pc": "Oui — Nick Fury recrute Steve pour les Avengers.",
    "budget": "~140M$",
    "box": "~370M$",
    "rt": "80% critique / 74% public",
    "triv": "Chris Evans a d'abord refusé le rôle plusieurs fois ; le «Steve chétif» a été fait via doublure + CGI.",
    "link": "Introduit le Tesseract, Crâne Rouge et Bucky ; Steve gelé le fait resurgir dans le présent.",
    "yt": "https://www.youtube.com/watch?v=JerVrbLldXw",
    "tmdb": {
      "id": 1771,
      "type": "movie"
    },
    "poster": "/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg"
  },
  "capmarvel": {
    "synopsis": "Une pilote de l'US Air Force devenue Kree redécouvre son passé humain et son lien avec les Skrulls.",
    "director": "Anna Boden, Ryan Fleck",
    "cast": "Brie Larson, Samuel L. Jackson, Jude Law",
    "pc": "Deux scènes — Carol rejoint les Avengers après le Snap ; Goose recrache le Tesseract.",
    "budget": "~150-175M$",
    "box": "~1.128Md$",
    "rt": "79% critique / 45% public",
    "triv": "Situé en 1995 avec un Samuel L. Jackson rajeuni numériquement ; explique la perte de son œil.",
    "link": "Le bipeur de Fury à la fin d'Infinity War mène directement à ce film puis à Endgame.",
    "yt": "https://www.youtube.com/watch?v=Z1BCujX3pw8",
    "tmdb": {
      "id": 299537,
      "type": "movie"
    },
    "poster": "/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg"
  },
  "ironman1": {
    "synopsis": "Un industriel de l'armement, retenu captif, construit une armure motorisée pour s'échapper et devenir un héros.",
    "director": "Jon Favreau",
    "cast": "Robert Downey Jr., Gwyneth Paltrow, Jeff Bridges",
    "pc": "Oui — Nick Fury évoque l'«Initiative Avengers».",
    "budget": "~140M$",
    "box": "~585M$",
    "rt": "94% critique / 91% public",
    "triv": "Le casting de Robert Downey Jr. était un pari du studio ; Terrence Howard jouait Rhodey (remplacé par Don Cheadle ensuite).",
    "link": "Lance tout le MCU ; la scène post-crédit de Fury prépare Avengers.",
    "yt": "https://www.youtube.com/watch?v=8ugaeA-nMTc",
    "tmdb": {
      "id": 1726,
      "type": "movie"
    },
    "poster": "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg"
  },
  "ironman2": {
    "synopsis": "Tony Stark doit affronter les conséquences de son identité publique et un nouvel ennemi armé de fouets électriques.",
    "director": "Jon Favreau",
    "cast": "Robert Downey Jr., Gwyneth Paltrow, Mickey Rourke",
    "pc": "Oui — le marteau de Thor découvert dans un cratère au Nouveau-Mexique.",
    "budget": "~200M$",
    "box": "~623M$",
    "rt": "71% critique / 71% public",
    "triv": "Introduit Black Widow et War Machine (Don Cheadle) ; Sam Rockwell joue Justin Hammer.",
    "link": "Développe le SHIELD et prépare l'assemblage des Avengers.",
    "yt": "https://www.youtube.com/watch?v=Cp2b1Cm3uw0",
    "tmdb": {
      "id": 10138,
      "type": "movie"
    }
  },
  "hulk": {
    "synopsis": "Bruce Banner, en fuite, cherche un remède à sa condition tout en évitant l'armée américaine.",
    "director": "Louis Leterrier",
    "cast": "Edward Norton, Liv Tyler, Tim Roth",
    "pc": "Oui — Tony Stark propose son aide au Général Ross.",
    "budget": "~150M$",
    "box": "~265M$",
    "rt": "67% critique / 70% public",
    "triv": "Edward Norton jouait Banner, remplacé par Mark Ruffalo dès Avengers.",
    "link": "Le fil Samuel Sterns/«Leader» ne sera payé que 17 ans plus tard dans Captain America: Brave New World.",
    "yt": "https://www.youtube.com/watch?v=XLprSwvVBBc",
    "tmdb": {
      "id": 1724,
      "type": "movie"
    },
    "poster": "/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg"
  },
  "thor1": {
    "synopsis": "Banni sur Terre par son père, le dieu du tonnerre doit apprendre l'humilité pour retrouver ses pouvoirs.",
    "director": "Kenneth Branagh",
    "cast": "Chris Hemsworth, Natalie Portman, Tom Hiddleston",
    "pc": "Oui — Loki manipule Selvig, le Tesseract est montré.",
    "budget": "~150M$",
    "box": "~449M$",
    "rt": "77% critique / 76% public",
    "triv": "Kenneth Branagh réalise ; Chris Hemsworth a obtenu le rôle après que son frère Liam ait auditionné en premier.",
    "link": "Introduit Loki et le Tesseract, préparant Avengers.",
    "yt": "https://www.youtube.com/watch?v=JOddp-nlNvQ",
    "tmdb": {
      "id": 10195,
      "type": "movie"
    },
    "poster": "/prSfAi1xGrhLQNxVSUFh61xQ4Qy.jpg"
  },
  "avengers1": {
    "synopsis": "Nick Fury réunit une équipe de héros pour contrer la menace de Loki et de son armée Chitauri.",
    "director": "Joss Whedon",
    "cast": "Robert Downey Jr., Chris Evans, Scarlett Johansson",
    "pc": "Deux scènes — Thanos sourit ; les Avengers mangent des shawarmas en silence.",
    "budget": "~220M$",
    "box": "~1.519Md$",
    "rt": "91% critique / 91% public",
    "triv": "Écrit et réalisé par Joss Whedon ; la scène des shawarmas a été tournée après la première.",
    "link": "Aboutissement de la Phase 1 ; Thanos révélé en scène post-crédit.",
    "yt": "https://www.youtube.com/watch?v=hA6hldpSTF8",
    "tmdb": {
      "id": 24428,
      "type": "movie"
    }
  },
  "thor2": {
    "synopsis": "Thor doit sauver les neuf royaumes d'une force ancienne, les Ténébreux, menés par Malekith.",
    "director": "Alan Taylor",
    "cast": "Chris Hemsworth, Natalie Portman, Tom Hiddleston",
    "pc": "Deux scènes — le Collectionneur reçoit l'Éther ; Thor et Jane se retrouvent sur Terre.",
    "budget": "~170M$",
    "box": "~644M$",
    "rt": "66% critique / 76% public",
    "triv": "Tournage compliqué avec reshoots ; souvent cité comme l'un des maillons faibles du MCU.",
    "link": "Introduit l'Éther (Pierre de Réalité), remis au Collectionneur.",
    "yt": "https://www.youtube.com/watch?v=npvJ9FTgZbM",
    "tmdb": {
      "id": 76338,
      "type": "movie"
    }
  },
  "ironman3": {
    "synopsis": "Après l'attaque de New York, Tony Stark affronte le terroriste Mandarin tout en luttant contre l'anxiété.",
    "director": "Shane Black",
    "cast": "Robert Downey Jr., Gwyneth Paltrow, Ben Kingsley",
    "pc": "Scène milieu de générique légère (Tony/Bruce), pas de vraie scène post-crédit.",
    "budget": "~200M$",
    "box": "~1.215Md$",
    "rt": "79% critique / 78% public",
    "triv": "Le twist du Mandarin/Trevor Slattery a fait polémique (adressé plus tard dans Shang-Chi).",
    "link": "Trevor Slattery revient dans Shang-Chi et Wonder Man (2026).",
    "yt": "https://www.youtube.com/watch?v=Ke1Y3P9D0Bc",
    "tmdb": {
      "id": 68721,
      "type": "movie"
    }
  },
  "cap2": {
    "synopsis": "Captain America découvre qu'HYDRA a infiltré le SHIELD alors qu'un mystérieux assassin, le Soldat de l'hiver, le traque.",
    "director": "Anthony et Joe Russo",
    "cast": "Chris Evans, Scarlett Johansson, Sebastian Stan",
    "pc": "Deux scènes — Bucky au Smithsonian ; le laboratoire de Strucker avec les jumeaux et le sceptre de Loki.",
    "budget": "~170M$",
    "box": "~714M$",
    "rt": "90% critique / 92% public",
    "triv": "Premier film MCU des frères Russo ; Robert Redford casté pour évoquer les thrillers politiques 70s.",
    "link": "Effondre le SHIELD (révélation HYDRA) et prépare Civil War.",
    "yt": "https://www.youtube.com/watch?v=7SlILk2WMTI",
    "tmdb": {
      "id": 100402,
      "type": "movie"
    }
  },
  "gotg1": {
    "synopsis": "Un groupe de renégats de l'espace s'allie pour empêcher un fanatique de mettre la main sur un orbe surpuissant.",
    "director": "James Gunn",
    "cast": "Chris Pratt, Zoe Saldaña, Dave Bautista",
    "pc": "Oui — Howard the Duck fait une apparition surprise chez le Collectionneur.",
    "budget": "~195M$",
    "box": "~773M$",
    "rt": "92% critique / 92% public",
    "triv": "James Gunn réalise ; la bande-son «Awesome Mix» devient un succès à part entière.",
    "link": "Introduit la Pierre de Pouvoir et Thanos, lançant le MCU cosmique.",
    "yt": "https://www.youtube.com/watch?v=d96cjJhvlMA",
    "tmdb": {
      "id": 118340,
      "type": "movie"
    }
  },
  "gotg2": {
    "synopsis": "Les Gardiens affrontent une nouvelle menace tandis que Peter Quill découvre l'identité de son père céleste.",
    "director": "James Gunn",
    "cast": "Chris Pratt, Zoe Saldaña, Kurt Russell",
    "pc": "Cinq scènes — dont Stan Lee, les Ravagers, et le cocon d'Adam Warlock.",
    "budget": "~200M$",
    "box": "~864M$",
    "rt": "85% critique / 87% public",
    "triv": "Kurt Russell joue Ego ; le film comporte cinq scènes post-génériques.",
    "link": "Révèle les origines de Star-Lord et prépare Adam Warlock.",
    "yt": "https://www.youtube.com/watch?v=dW1BIid8Osg",
    "tmdb": {
      "id": 283995,
      "type": "movie"
    }
  },
  "avengers2": {
    "synopsis": "Tony Stark crée une intelligence artificielle censée protéger le monde, mais Ultron se retourne contre l'humanité.",
    "director": "Joss Whedon",
    "cast": "Robert Downey Jr., Chris Evans, Elizabeth Olsen",
    "pc": "Oui — Thanos enfile le Gantelet en personne.",
    "budget": "~365M$",
    "box": "~1.403Md$",
    "rt": "76% critique / 82% public",
    "triv": "James Spader incarne Ultron en performance capture ; introduit Scarlet Witch et Vision.",
    "link": "Crée Vision et la Pierre de l'Esprit ; Ultron revient dans VisionQuest (2026).",
    "yt": "https://www.youtube.com/watch?v=tmeOjFno6Do",
    "tmdb": {
      "id": 99861,
      "type": "movie"
    }
  },
  "dd_s1": {
    "synopsis": "Avocat aveugle le jour, Matt Murdock devient justicier masqué la nuit pour nettoyer Hell's Kitchen.",
    "director": "Drew Goddard (showrunner)",
    "cast": "Charlie Cox, Vincent D'Onofrio, Deborah Ann Woll",
    "budget": "N/A",
    "box": "N/A",
    "rt": "99% critique / 97% public",
    "triv": "Le combat du couloir en plan-séquence (ép. 2) est devenu culte.",
    "link": "Lance le coin «street-level» Netflix ; Cox et D'Onofrio seront canonisés MCU plus tard.",
    "yt": "https://www.youtube.com/watch?v=nphSbTNMFTo",
    "tmdb": {
      "id": 61889,
      "type": "tv"
    }
  },
  "jj_s1": {
    "synopsis": "Une détective privée dotée de superpouvoirs traque un homme capable de contrôler l'esprit des autres.",
    "director": "Melissa Rosenberg (showrunner)",
    "cast": "Krysten Ritter, David Tennant, Rachael Taylor",
    "budget": "N/A",
    "box": "N/A",
    "rt": "93% critique / 89% public",
    "triv": "David Tennant incarne Kilgrave ; saluée pour son traitement du traumatisme.",
    "link": "Introduit Luke Cage avant son propre spin-off.",
    "yt": "https://www.youtube.com/watch?v=1ulpsMH_bBU",
    "tmdb": {
      "id": 38472,
      "type": "tv"
    }
  },
  "antman1": {
    "synopsis": "Un cambrioleur repenti enfile une combinaison lui permettant de rétrécir pour réaliser un casse crucial.",
    "director": "Peyton Reed",
    "cast": "Paul Rudd, Michael Douglas, Evangeline Lilly",
    "pc": "Deux scènes — le combat avec Falcon ; Hank révèle la combinaison de la Guêpe à Hope.",
    "budget": "~130M$",
    "box": "~519M$",
    "rt": "83% critique / 86% public",
    "triv": "Edgar Wright a quitté le projet ; Peyton Reed a repris la réalisation.",
    "link": "Introduit le Royaume Quantique, crucial pour Endgame.",
    "yt": "https://www.youtube.com/watch?v=pWdKf3MneyI",
    "tmdb": {
      "id": 102899,
      "type": "movie"
    }
  },
  "cap3": {
    "synopsis": "Les Avengers se déchirent sur la question d'un contrôle gouvernemental de leurs actions.",
    "director": "Anthony et Joe Russo",
    "cast": "Chris Evans, Robert Downey Jr., Scarlett Johansson",
    "pc": "Oui — Bucky en cryosommeil au Wakanda, T'Challa construit un nouveau laboratoire.",
    "budget": "~250M$",
    "box": "~1.155Md$",
    "rt": "90% critique / 89% public",
    "triv": "Introduit Spider-Man (Tom Holland) et Black Panther (Chadwick Boseman).",
    "link": "Scinde les Avengers via les Accords de Sokovie, menant à Infinity War.",
    "yt": "https://www.youtube.com/watch?v=dKrVegVI0Us",
    "tmdb": {
      "id": 271110,
      "type": "movie"
    }
  },
  "dd_s2": {
    "synopsis": "Daredevil affronte le Caïd et croise la route du Punisher, tandis qu'Elektra ressurgit de son passé.",
    "director": "Doug Petrie, Marco Ramirez (showrunners)",
    "cast": "Charlie Cox, Jon Bernthal, Élodie Yung",
    "budget": "N/A",
    "box": "N/A",
    "rt": "82% critique / 94% public",
    "triv": "Introduit le Punisher (Jon Bernthal) et Elektra (Élodie Yung).",
    "link": "Bernthal continue jusqu'à Born Again et le spécial 2026.",
    "yt": "https://www.youtube.com/watch?v=eOEnVUf7wZI",
    "tmdb": {
      "id": 61889,
      "type": "tv"
    }
  },
  "lc_s1": {
    "synopsis": "Doté d'une peau incassable, un ex-détenu de Harlem devient malgré lui le protecteur de son quartier.",
    "director": "Cheo Hodari Coker (showrunner)",
    "cast": "Mike Colter, Mahershala Ali, Simone Missick",
    "budget": "N/A",
    "box": "N/A",
    "rt": "96% critique / 76% public",
    "triv": "Ancré dans la culture et la musique de Harlem ; son lancement aurait fait planter Netflix.",
    "link": "Fait partie des Defenders, suite directe de Jessica Jones.",
    "yt": "https://www.youtube.com/watch?v=Gs27S5cLLKc",
    "tmdb": {
      "id": 62126,
      "type": "tv"
    }
  },
  "blackwidow": {
    "synopsis": "Natasha Romanoff affronte son passé dans le programme Red Room et retrouve sa famille d'espionnes.",
    "director": "Cate Shortland",
    "cast": "Scarlett Johansson, Florence Pugh, David Harbour",
    "pc": "Oui — Yelena, recrutée par Valentina, se recueille sur la tombe de Natasha.",
    "budget": "~200M$",
    "box": "~379M$",
    "rt": "79% critique / 88% public",
    "triv": "Sorti en simultané sur Disney+ Premier Access pendant le COVID ; situé après Civil War.",
    "link": "Introduit Yelena Belova et Red Guardian, tous deux dans Thunderbolts*.",
    "yt": "https://www.youtube.com/watch?v=Fp9pNPdNwjI",
    "tmdb": {
      "id": 497698,
      "type": "movie"
    }
  },
  "blackpanther1": {
    "synopsis": "T'Challa devient roi du Wakanda et doit défendre son trône face à un rival aux intentions radicales.",
    "director": "Ryan Coogler",
    "cast": "Chadwick Boseman, Michael B. Jordan, Lupita Nyong'o",
    "pc": "Deux scènes — T'Challa s'adresse à l'ONU ; Bucky réapparaît au Wakanda sous le nom de White Wolf.",
    "budget": "~200M$",
    "box": "~1.349Md$",
    "rt": "96% critique / 79% public",
    "triv": "Premier MCU nommé aux Oscars «meilleur film» (3 statuettes gagnées) ; Ryan Coogler réalise.",
    "link": "Établit le Wakanda et le Vibranium, centraux dans Infinity War.",
    "yt": "https://www.youtube.com/watch?v=xjDjIWPwcPU",
    "tmdb": {
      "id": 284054,
      "type": "movie"
    }
  },
  "spiderman1": {
    "synopsis": "Peter Parker tente de concilier lycée et vie de super-héros sous le mentorat de Tony Stark.",
    "director": "Jon Watts",
    "cast": "Tom Holland, Michael Keaton, Robert Downey Jr.",
    "pc": "Un faux «mid-credit» comique (PSA de Captain America) ; scène post avec Vulture en prison évoquant le Sinistre Six.",
    "budget": "~175M$",
    "box": "~880M$",
    "rt": "92% critique / 87% public",
    "triv": "Premier film co-produit Sony/Marvel ; introduit Mac Gargan (Scorpion).",
    "link": "Le fil Scorpion aboutit dans Spider-Man: Brand New Day (2026).",
    "yt": "https://www.youtube.com/watch?v=rk-dF1lIbIg",
    "tmdb": {
      "id": 315635,
      "type": "movie"
    }
  },
  "drstrange1": {
    "synopsis": "Un chirurgien devenu infirme découvre la magie et les univers parallèles auprès de l'Ancien.",
    "director": "Scott Derrickson",
    "cast": "Benedict Cumberbatch, Tilda Swinton, Chiwetel Ejiofor",
    "pc": "Deux scènes — Thor amène Loki à Strange (teaser Ragnarok) ; Mordo vole les pouvoirs de Pangborn.",
    "budget": "~165M$",
    "box": "~677M$",
    "rt": "89% critique / 86% public",
    "triv": "Le casting de Tilda Swinton en Ancien a fait polémique (whitewashing).",
    "link": "Introduit la Pierre du Temps, cruciale pour Infinity War/Endgame.",
    "yt": "https://www.youtube.com/watch?v=HSzx-zryEgM",
    "tmdb": {
      "id": 284052,
      "type": "movie"
    }
  },
  "thor3": {
    "synopsis": "Thor, prisonnier sur Sakaar, doit combattre son ami Hulk dans l'arène pour sauver Asgard de sa sœur Hela.",
    "director": "Taika Waititi",
    "cast": "Chris Hemsworth, Tom Hiddleston, Cate Blanchett",
    "pc": "Deux scènes — le Grandmaster a survécu à la révolte ; le vaisseau de Thor est intercepté (teaser Infinity War).",
    "budget": "~180M$",
    "box": "~854M$",
    "rt": "93% critique / 87% public",
    "triv": "Taika Waititi réalise et double Korg ; réinvention comique très improvisée.",
    "link": "Détruit Asgard, menant directement à l'ouverture d'Infinity War.",
    "yt": "https://www.youtube.com/watch?v=ue80QwXMRHg",
    "tmdb": {
      "id": 284053,
      "type": "movie"
    }
  },
  "if_s1": {
    "synopsis": "Un milliardaire disparu ressurgit à New York, maître des arts martiaux et du Poing de fer.",
    "director": "Scott Buck (showrunner)",
    "cast": "Finn Jones, Jessica Henwick, Jessica Stroup",
    "budget": "N/A",
    "box": "N/A",
    "rt": "20% critique / 74% public",
    "triv": "La série Netflix Marvel la moins bien notée, critiquée pour ses chorégraphies de combat.",
    "link": "Mène aux Defenders.",
    "yt": "https://www.youtube.com/watch?v=RterhFzsC4A",
    "tmdb": {
      "id": 62127,
      "type": "tv"
    }
  },
  "defenders": {
    "synopsis": "Daredevil, Jessica Jones, Luke Cage et Iron Fist unissent leurs forces contre la Main.",
    "director": "Marco Ramirez, Douglas Petrie (showrunners)",
    "cast": "Charlie Cox, Krysten Ritter, Mike Colter, Finn Jones",
    "budget": "N/A",
    "box": "N/A",
    "rt": "76% critique / 66% public",
    "triv": "Crossover réunissant Daredevil, Jessica Jones, Luke Cage et Iron Fist ; Sigourney Weaver en antagoniste.",
    "link": "Aboutissement du coin street-level Netflix.",
    "yt": "https://www.youtube.com/watch?v=Ptc4BaS3G4w",
    "tmdb": {
      "id": 62285,
      "type": "tv"
    }
  },
  "pun_s1": {
    "synopsis": "Frank Castle mène une guerre solitaire et sanglante contre le crime organisé après le meurtre de sa famille.",
    "director": "Steve Lightfoot (showrunner)",
    "cast": "Jon Bernthal, Ben Barnes, Deborah Ann Woll",
    "budget": "N/A",
    "box": "N/A",
    "rt": "63% critique / 92% public",
    "triv": "Spin-off de Jon Bernthal depuis Daredevil S2.",
    "link": "Frank Castle continue jusqu'à Born Again et le spécial 2026.",
    "yt": "https://www.youtube.com/watch?v=Dp3Y0mQtHUw",
    "tmdb": {
      "id": 67178,
      "type": "tv"
    }
  },
  "avengers3": {
    "synopsis": "Thanos entreprend de réunir les six Pierres d'infinité pour effacer la moitié de l'univers.",
    "director": "Anthony et Joe Russo",
    "cast": "Robert Downey Jr., Chris Hemsworth, Josh Brolin",
    "pc": "Oui — Fury et Hill se désintègrent, le bipeur envoie un signal à Captain Marvel.",
    "budget": "~325M$",
    "box": "~2.048Md$",
    "rt": "85% critique / 91% public",
    "triv": "Crossover massif se terminant sur le «Snap» ; tourné en même temps qu'Endgame.",
    "link": "Thanos réunit les six Pierres d'Infinité, préparant Endgame directement.",
    "yt": "https://www.youtube.com/watch?v=6ZfuNTqbHE8",
    "tmdb": {
      "id": 299536,
      "type": "movie"
    }
  },
  "jj_s2": {
    "synopsis": "Jessica Jones enquête sur les origines de ses pouvoirs et sur l'expérience IGH qui l'a créée.",
    "director": "Melissa Rosenberg (showrunner)",
    "cast": "Krysten Ritter, Rachael Taylor, Janet McTeer",
    "budget": "N/A",
    "box": "N/A",
    "rt": "82% critique / 55% public",
    "triv": "Tous les épisodes réalisés par des femmes.",
    "link": "Continuité des Defenders.",
    "yt": "https://www.youtube.com/watch?v=eb_j5tZ63Fo",
    "tmdb": {
      "id": 38472,
      "type": "tv"
    }
  },
  "lc_s2": {
    "synopsis": "Luke Cage doit protéger Harlem d'un nouveau rival mystique venu de Jamaïque.",
    "director": "Cheo Hodari Coker (showrunner)",
    "cast": "Mike Colter, Mustafa Shakir, Alfre Woodard",
    "budget": "N/A",
    "box": "N/A",
    "rt": "82% critique / 74% public",
    "triv": "Antagoniste Bushmaster aux influences reggae/caribéennes.",
    "link": "Continuité des Defenders.",
    "yt": "https://www.youtube.com/watch?v=ccJUUpXG6a4",
    "tmdb": {
      "id": 62126,
      "type": "tv"
    }
  },
  "if_s2": {
    "synopsis": "Danny Rand tente de reprendre le contrôle de K'un-Lun et de son rôle de Poing de fer.",
    "director": "Raven Metzner (showrunner)",
    "cast": "Finn Jones, Jessica Henwick",
    "budget": "N/A",
    "box": "N/A",
    "rt": "50% critique / 39% public",
    "triv": "Chorégraphies de combat améliorées grâce à un nouveau coordinateur.",
    "link": "Continuité des Defenders.",
    "yt": "https://www.youtube.com/watch?v=iyABEQZDrbE",
    "tmdb": {
      "id": 62127,
      "type": "tv"
    }
  },
  "dd_s3": {
    "synopsis": "Daredevil, laissé pour mort, doit reconstruire son identité tandis que le Caïd prend le contrôle du FBI.",
    "director": "Erik Oleson (showrunner)",
    "cast": "Charlie Cox, Vincent D'Onofrio",
    "budget": "N/A",
    "box": "N/A",
    "rt": "89% critique / 92% public",
    "triv": "Adapte l'arc comics «Born Again» ; introduit Bullseye (Wilson Bethel).",
    "link": "Précède directement la renaissance Disney+ Born Again.",
    "yt": "https://www.youtube.com/watch?v=b--UcqZlG9g",
    "tmdb": {
      "id": 61889,
      "type": "tv"
    }
  },
  "antman2": {
    "synopsis": "Scott Lang s'associe à Hope van Dyne pour secourir sa mère perdue dans le royaume quantique.",
    "director": "Peyton Reed",
    "cast": "Paul Rudd, Evangeline Lilly, Michael Douglas",
    "pc": "Oui — Scott coincé dans le Royaume quantique pendant que le Snap frappe Hank, Hope et Janet.",
    "budget": "~162M$",
    "box": "~623M$",
    "rt": "87% critique / 75% public",
    "triv": "Premier MCU avec une co-héroïne dans le titre ; situé avant le Snap d'Infinity War.",
    "link": "Le Royaume Quantique devient central dans Endgame.",
    "yt": "https://www.youtube.com/watch?v=aE2GCa-_nyU",
    "tmdb": {
      "id": 363088,
      "type": "movie"
    }
  },
  "pun_s2": {
    "synopsis": "Frank Castle est traqué par un ancien soldat pendant qu'il tente de vivre sous une identité normale.",
    "director": "Steve Lightfoot (showrunner)",
    "cast": "Jon Bernthal, Ben Barnes, Amber Rose Revah",
    "budget": "N/A",
    "box": "N/A",
    "rt": "67% critique / 77% public",
    "triv": "Dernière saison Netflix avant les annulations en cascade.",
    "link": "Frank Castle continue vers Born Again / le spécial 2026.",
    "yt": "https://www.youtube.com/watch?v=yBW3S9zKffg",
    "tmdb": {
      "id": 67178,
      "type": "tv"
    }
  },
  "jj_s3": {
    "synopsis": "Jessica Jones affronte un tueur en série obsédé, tout en gérant sa relation avec Trish.",
    "director": "Jenna Reback, Micheal Taylor (showrunners)",
    "cast": "Krysten Ritter, Rachael Taylor, Rebecca De Mornay",
    "budget": "N/A",
    "box": "N/A",
    "rt": "79% critique / 58% public",
    "triv": "Dernière série Netflix Marvel diffusée.",
    "link": "Krysten Ritter revient dans Daredevil: Born Again S2 (2026).",
    "yt": "https://www.youtube.com/watch?v=nButljasrIA",
    "tmdb": {
      "id": 38472,
      "type": "tv"
    }
  },
  "avengers4": {
    "synopsis": "Les survivants tentent de défaire le Snap de Thanos en manipulant le temps lui-même.",
    "director": "Anthony et Joe Russo",
    "cast": "Robert Downey Jr., Chris Evans, Scarlett Johansson",
    "pc": "Non — pas de scène post-crédit (juste le son de l'enclume de Tony en clin d'œil).",
    "budget": "~356-400M$",
    "box": "~2.799Md$",
    "rt": "94% critique / 90% public",
    "triv": "Tony Stark et Black Widow meurent ; tourné avec de faux scripts pour éviter les fuites. A détrôné Avatar au box-office mondial (avant qu'Avatar ne le reprenne en 2021).",
    "link": "Conclut la Saga de l'Infini ; le passage du bouclier à Sam Wilson.",
    "yt": "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    "tmdb": {
      "id": 299534,
      "type": "movie"
    },
    "poster": "/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"
  },
  "wandavision": {
    "synopsis": "Wanda Maximoff et Vision vivent une vie de sitcom idyllique dans une réalité qui cache un lourd secret.",
    "director": "Matt Shakman",
    "cast": "Elizabeth Olsen, Paul Bettany, Kathryn Hahn",
    "budget": "N/A (~25M$/épisode)",
    "box": "N/A",
    "rt": "91% critique / 88% public",
    "triv": "Format hommage aux sitcoms à travers les décennies ; la chanson «Agatha All Along» est devenue virale.",
    "link": "Prépare le tournant de Wanda dans Multiverse of Madness et lance Agatha All Along + VisionQuest.",
    "yt": "https://www.youtube.com/watch?v=sj9J2ecsSpo",
    "tmdb": {
      "id": 85271,
      "type": "tv"
    }
  },
  "falcon": {
    "synopsis": "Sam Wilson et Bucky Barnes s'associent face à un groupe extrémiste et à un nouveau Captain America.",
    "director": "Kari Skogland",
    "cast": "Anthony Mackie, Sebastian Stan, Wyatt Russell",
    "budget": "N/A (~150M$ au total)",
    "box": "N/A",
    "rt": "84% critique / 81% public",
    "triv": "Tournage perturbé par le COVID ; introduit US Agent.",
    "link": "Sam Wilson devient Captain America, menant à Brave New World (2025).",
    "yt": "https://www.youtube.com/watch?v=U9iWWWs2Ajc",
    "tmdb": {
      "id": 88396,
      "type": "tv"
    }
  },
  "loki1": {
    "synopsis": "Arrêté par la TVA pour avoir altéré la ligne temporelle sacrée, Loki doit réparer le multivers.",
    "director": "Kate Herron",
    "cast": "Tom Hiddleston, Owen Wilson, Sophia Di Martino",
    "budget": "N/A",
    "box": "N/A",
    "rt": "92% critique / 89% public",
    "triv": "Introduit la TVA et Mobius (Owen Wilson) ; Sophia Di Martino joue Sylvie.",
    "link": "Introduit Celui qui Demeure/Kang, lançant la Saga du Multivers.",
    "yt": "https://www.youtube.com/watch?v=nW948Va-l10",
    "tmdb": {
      "id": 84958,
      "type": "tv"
    }
  },
  "whatif1": {
    "synopsis": "Le Gardeur explore des réalités alternatives où un seul événement a tout changé.",
    "director": "Bryan Andrews (showrunner)",
    "cast": "Jeffrey Wright (narrateur)",
    "budget": "N/A",
    "box": "N/A",
    "rt": "94% critique / 85% public",
    "triv": "Première série animée MCU ; comprend certaines des dernières performances de Chadwick Boseman.",
    "link": "Introduit le multivers animé ; Captain Carter réapparaît dans Doctor Strange 2.",
    "yt": "https://www.youtube.com/watch?v=ivZv6zw3Th3",
    "tmdb": {
      "id": 91363,
      "type": "tv"
    }
  },
  "farfromhome": {
    "synopsis": "Peter Parker part en voyage scolaire en Europe où Nick Fury l'enrôle contre des Élémentaires.",
    "director": "Jon Watts",
    "cast": "Tom Holland, Samuel L. Jackson, Jake Gyllenhaal",
    "pc": "Deux scènes — J. Jonah Jameson révèle l'identité de Spider-Man ; Fury et Hill sont en fait des Skrulls.",
    "budget": "~160M$",
    "box": "~1.132Md$",
    "rt": "90% critique / 95% public",
    "triv": "Jake Gyllenhaal joue Mysterio ; premier film MCU sorti après Endgame.",
    "link": "Mysterio révèle l'identité de Peter, préparant No Way Home.",
    "yt": "https://www.youtube.com/watch?v=Nt9L1jCKGnE",
    "tmdb": {
      "id": 429617,
      "type": "movie"
    }
  },
  "hawkeye": {
    "synopsis": "Clint Barton forme malgré lui Kate Bishop, une jeune archère déterminée à devenir super-héroïne.",
    "director": "Rhys Thomas, Bert & Bertie",
    "cast": "Jeremy Renner, Hailee Steinfeld, Vera Farmiga",
    "budget": "N/A",
    "box": "N/A",
    "rt": "92% critique / 90% public",
    "triv": "Série de Noël à New York introduisant Kate Bishop (Hailee Steinfeld).",
    "link": "Le Caïd revient ; l'arc Yelena mène à Thunderbolts*.",
    "yt": "https://www.youtube.com/watch?v=NuQY0zJoTgc",
    "tmdb": {
      "id": 88329,
      "type": "tv"
    }
  },
  "moonknight": {
    "synopsis": "Steven Grant découvre qu'il partage son corps avec un mercenaire aux pouvoirs égyptiens, Marc Spector.",
    "director": "Mohamed Diab",
    "cast": "Oscar Isaac, May Calamawy, Ethan Hawke",
    "budget": "N/A",
    "box": "N/A",
    "rt": "86% critique / 88% public",
    "triv": "Oscar Isaac joue plusieurs personnalités (Steven Grant / Marc Spector).",
    "link": "Introduit la mythologie égyptienne, largement autonome pour l'instant.",
    "yt": "https://www.youtube.com/watch?v=x7Krla_UxRg",
    "tmdb": {
      "id": 92749,
      "type": "tv"
    }
  },
  "eternals": {
    "synopsis": "Des êtres immortels sortent de l'ombre pour protéger la Terre d'une menace ancienne, les Déviants.",
    "director": "Chloé Zhao",
    "cast": "Gemma Chan, Richard Madden, Angelina Jolie",
    "pc": "Deux scènes — Eros et Pip le Troll rejoignent le groupe ; Dane Whitman évoque l'Épée d'Ébène.",
    "budget": "~200M$",
    "box": "~402M$",
    "rt": "47% critique / 77% public",
    "triv": "Chloé Zhao (oscarisée) réalise ; premier MCU «Rotten» ; premier héros sourd et premier couple gay du MCU.",
    "link": "Introduit les Célestes ; Eros et Chevalier Noir teasés en crédits.",
    "yt": "https://www.youtube.com/watch?v=x_me3xsvDgk",
    "tmdb": {
      "id": 524434,
      "type": "movie"
    }
  },
  "msmarvel": {
    "synopsis": "Kamala Khan, fan des Avengers, découvre qu'elle possède elle-même des pouvoirs cosmiques.",
    "director": "Adil El Arbi, Bilall Fallah",
    "cast": "Iman Vellani, Matt Lintz, Yasmeen Fletcher",
    "budget": "N/A",
    "box": "N/A",
    "rt": "98% critique / 79% public",
    "triv": "Débuts d'Iman Vellani ; le score critique RT le plus élevé d'une série MCU à l'époque.",
    "link": "Révèle que Kamala est mutante, menant directement à The Marvels.",
    "yt": "https://www.youtube.com/watch?v=91XVZATrhc4",
    "tmdb": {
      "id": 92782,
      "type": "tv"
    }
  },
  "nowayhome": {
    "synopsis": "L'identité de Spider-Man révélée au monde, un sort raté ouvre le multivers à d'anciens ennemis.",
    "director": "Jon Watts",
    "cast": "Tom Holland, Zendaya, Willem Dafoe",
    "pc": "Non — pas de stinger classique, le film se termine sur une scène plus posée avec Peter.",
    "budget": "~200M$",
    "box": "~1.922Md$",
    "rt": "93% critique / 98% public",
    "triv": "Retours de Tobey Maguire et Andrew Garfield gardés secrets jusqu'à la sortie.",
    "link": "Le sort de Strange prépare Brand New Day (2026).",
    "yt": "https://www.youtube.com/watch?v=rt-2cxAiPJk",
    "tmdb": {
      "id": 634649,
      "type": "movie"
    }
  },
  "drstrange2": {
    "synopsis": "Doctor Strange voyage à travers le multivers pour protéger une jeune fille aux pouvoirs uniques.",
    "director": "Sam Raimi",
    "cast": "Benedict Cumberbatch, Elizabeth Olsen, Xochitl Gomez",
    "pc": "Oui — Clea (Charlize Theron) recrute Strange pour une incursion multiversale.",
    "budget": "~200M$",
    "box": "~956M$",
    "rt": "74% critique / 85% public",
    "triv": "Sam Raimi réalise avec des éléments horrifiques ; introduit America Chavez et les Illuminati.",
    "link": "Paye l'arc de Wanda depuis WandaVision.",
    "yt": "https://www.youtube.com/watch?v=aWzlQ2N6qqg",
    "tmdb": {
      "id": 453395,
      "type": "movie"
    }
  },
  "thor4": {
    "synopsis": "Thor s'associe à Jane Foster, devenue Mighty Thor, pour vaincre Gorr le Boucher de dieux.",
    "director": "Taika Waititi",
    "cast": "Chris Hemsworth, Natalie Portman, Christian Bale",
    "pc": "Oui — Heimdall et son fils Axl retrouvent un jeune Thor au Valhalla.",
    "budget": "~250M$",
    "box": "~761M$",
    "rt": "63% critique / 76% public",
    "triv": "Christian Bale joue Gorr ; réception mitigée comparée à Ragnarok.",
    "link": "Introduit Hercule (crédits) ; la fille de Gorr apparaît dans les teasers Doomsday.",
    "yt": "https://www.youtube.com/watch?v=Go8nTmfrQd8",
    "tmdb": {
      "id": 616037,
      "type": "movie"
    }
  },
  "shehulk": {
    "synopsis": "Jennifer Walters jongle entre carrière d'avocate et vie de super-héroïne verte de 2 mètres.",
    "director": "Kat Coiro, Anu Valia",
    "cast": "Tatiana Maslany, Mark Ruffalo, Tim Roth",
    "budget": "N/A",
    "box": "N/A",
    "rt": "79% critique / 32% public",
    "triv": "Comédie «brisant le 4e mur» ; CGI controversé ; introduit le costume jaune-rouge de Daredevil.",
    "link": "Réintroduit Abomination et Wong, prépare le ton plus léger avant Born Again.",
    "yt": "https://www.youtube.com/watch?v=Sdd11mDb3sU",
    "tmdb": {
      "id": 92783,
      "type": "tv"
    }
  },
  "wakandaforever": {
    "synopsis": "Le Wakanda doit faire face au deuil de son roi et à la menace sous-marine de Namor.",
    "director": "Ryan Coogler",
    "cast": "Letitia Wright, Lupita Nyong'o, Tenoch Huerta",
    "pc": "Deux scènes — Shuri brûle la robe cérémonielle en privé ; Nakia révèle son fils, T'Challa Jr., en Haïti.",
    "budget": "~250M$",
    "box": "~859M$",
    "rt": "84% critique / 94% public",
    "triv": "Réalisé après le décès de Chadwick Boseman en son hommage ; introduit Namor et Riri Williams.",
    "link": "Riri Williams se prolonge dans Ironheart (2025).",
    "yt": "https://www.youtube.com/watch?v=_Z3QKkl1WyM",
    "tmdb": {
      "id": 505642,
      "type": "movie"
    }
  },
  "secretinvasion": {
    "synopsis": "Nick Fury découvre qu'une faction de Skrulls infiltre secrètement les gouvernements de la Terre.",
    "director": "Ali Selim",
    "cast": "Samuel L. Jackson, Ben Mendelsohn, Olivia Colman",
    "budget": "N/A (~212M$)",
    "box": "N/A",
    "rt": "53-57% critique / 43% public",
    "triv": "Premier MCU Disney+ «Rotten» ; le générique généré par IA a fait polémique.",
    "link": "Précède The Marvels ; laisse des fils Skrulls en suspens.",
    "yt": "https://www.youtube.com/watch?v=NC9kslQt0z0",
    "tmdb": {
      "id": 114472,
      "type": "tv"
    }
  },
  "loki2": {
    "synopsis": "Loki, brisé par le temps, tente de sauver la TVA de l'effondrement du multivers.",
    "director": "Justin Benson, Aaron Moorhead",
    "cast": "Tom Hiddleston, Owen Wilson, Sophia Di Martino",
    "budget": "N/A",
    "box": "N/A",
    "rt": "~82-83% critique / ~87% public",
    "triv": "A redressé la réputation des séries Phase 5 ; dernière apparition de Jonathan Majors avant son éviction.",
    "link": "Loki devient «Dieu des Histoires», pilier structurel de la Saga du Multivers.",
    "yt": "https://www.youtube.com/watch?v=YrjHcYqe31g",
    "tmdb": {
      "id": 84958,
      "type": "tv"
    }
  },
  "whatif2": {
    "synopsis": "De nouvelles réalités alternatives explorent des choix qui ont bouleversé des héros familiers.",
    "director": "Bryan Andrews (showrunner)",
    "cast": "Jeffrey Wright (narrateur)",
    "budget": "N/A",
    "box": "N/A",
    "rt": "~90% critique / ~70% public",
    "triv": "Sortie quotidienne pendant les fêtes de décembre 2023.",
    "link": "Continue le multivers animé.",
    "yt": "https://www.youtube.com/watch?v=x6-Ds_iH_gg",
    "tmdb": {
      "id": 91363,
      "type": "tv"
    }
  },
  "quantumania": {
    "synopsis": "La famille Lang-van Dyne est aspirée dans le royaume quantique où règne Kang le Conquérant.",
    "director": "Peyton Reed",
    "cast": "Paul Rudd, Evangeline Lilly, Jonathan Majors",
    "pc": "Deux scènes — le Conseil de Kang réagit à sa mort ; Cassie et un jeune Kang jouent avec le temps.",
    "budget": "~200M$+",
    "box": "~476M$",
    "rt": "46% critique / 83% public",
    "triv": "Introduit Kang le Conquérant (Jonathan Majors) comme grand méchant prévu de la Saga (abandonné après ses ennuis judiciaires).",
    "link": "Devait lancer la «Dynastie Kang», retravaillée en Avengers: Doomsday avec Docteur Doom.",
    "yt": "https://www.youtube.com/watch?v=ZlNFpri-Y40",
    "tmdb": {
      "id": 640146,
      "type": "movie"
    }
  },
  "gotg3": {
    "synopsis": "Rocket, blessé mortellement, force les Gardiens à affronter son passé de créature de laboratoire.",
    "director": "James Gunn",
    "cast": "Chris Pratt, Zoe Saldaña, Bradley Cooper (voix)",
    "pc": "Oui — plusieurs vignettes sur le nouveau statut de chaque Gardien après la mission.",
    "budget": "~250M$",
    "box": "~845M$",
    "rt": "82% critique / 94% public",
    "triv": "Dernier MCU de James Gunn avant DC ; centré sur les origines de Rocket.",
    "link": "Clôt le casting des Gardiens ; Rocket mène une nouvelle équipe.",
    "yt": "https://www.youtube.com/watch?v=u3V5KDHRQvk",
    "tmdb": {
      "id": 447365,
      "type": "movie"
    }
  },
  "marvels": {
    "synopsis": "Carol Danvers, Kamala Khan et Monica Rambeau échangent involontairement de place lorsqu'elles utilisent leurs pouvoirs.",
    "director": "Nia DaCosta",
    "cast": "Brie Larson, Teyonah Parris, Iman Vellani",
    "pc": "Oui — Kamala Khan se réveille aux côtés d'autres jeunes héros (tease Young Avengers).",
    "budget": "~220-275M$",
    "box": "~197M$",
    "rt": "62% critique / 85% public",
    "triv": "Le plus gros échec au box-office du MCU (pire ouverture MCU, ~46M$) ; le plus court film MCU (~105min).",
    "link": "La scène post-crédit révèle les mutants via Beast (Kelsey Grammer), ouvrant l'ère mutante.",
    "yt": "https://www.youtube.com/watch?v=wS_qbDztgVY",
    "tmdb": {
      "id": 609681,
      "type": "movie"
    }
  },
  "echo": {
    "synopsis": "Maya Lopez retourne dans sa communauté natale pour affronter son passé lié au Caïd.",
    "director": "Sydney Freeland (showrunner)",
    "cast": "Alaqua Cox, Vincent D'Onofrio, Chaske Spencer",
    "budget": "N/A (record pour une série Disney+ MCU)",
    "box": "N/A",
    "rt": "71% critique / 60% public",
    "triv": "Première série «Spotlight» MCU ; tous les épisodes sortis d'un coup ; classée TV-MA.",
    "link": "Continue l'arc du Caïd depuis Hawkeye, mène à Daredevil: Born Again.",
    "yt": "https://www.youtube.com/watch?v=NcK4gVpg9d0",
    "tmdb": {
      "id": 122226,
      "type": "tv"
    }
  },
  "xmen97-1": {
    "synopsis": "Après la disparition du Professeur X, les X-Men doivent continuer son rêve dans un monde plus hostile que jamais.",
    "director": "Jake Castorena (showrunner)",
    "cast": "Voix de la série animée originale des années 90",
    "budget": "N/A",
    "box": "N/A",
    "rt": "99% critique / 91% public",
    "triv": "Score RT le plus élevé d'un projet Marvel ; suite directe de la série animée de 1992.",
    "link": "Fait avancer les arcs mutants ; renouvelée pour plusieurs saisons.",
    "yt": "https://www.youtube.com/watch?v=rExDb-Al3fk",
    "tmdb": {
      "id": 138502,
      "type": "tv"
    }
  },
  "xmen1": {
    "synopsis": "Le Professeur Xavier et Magneto s'affrontent sur la meilleure façon de protéger les mutants d'un monde hostile.",
    "director": "Bryan Singer",
    "cast": "Hugh Jackman, Patrick Stewart, Ian McKellen",
    "budget": "~75M$",
    "box": "~296M$",
    "rt": "82% critique / 83% public",
    "triv": "A lancé le cinéma super-héroïque moderne ; Hugh Jackman casté après le désistement de Dougray Scott.",
    "link": "Base de la franchise X-Men Fox ; personnages revus dans Days of Future Past.",
    "yt": "https://www.youtube.com/watch?v=nbNcWnII2Fo",
    "tmdb": {
      "id": 36657,
      "type": "movie"
    }
  },
  "x2": {
    "synopsis": "Un colonel fanatique lance une attaque contre tous les mutants, forçant X-Men et Magneto à s'allier.",
    "director": "Bryan Singer",
    "cast": "Hugh Jackman, Patrick Stewart, Ian McKellen",
    "budget": "~110M$",
    "box": "~408M$",
    "rt": "85% critique / 86% public",
    "triv": "L'ouverture de Diablo à la Maison Blanche est saluée comme un sommet du genre.",
    "link": "Prépare l'arc Phoenix Noire pour L'Affrontement final.",
    "yt": "https://www.youtube.com/watch?v=zXpN6Y8qWFo",
    "tmdb": {
      "id": 36658,
      "type": "movie"
    }
  },
  "xlaststand": {
    "synopsis": "Un remède contre la mutation est développé tandis que Jean Grey, ressuscitée, devient Phoenix.",
    "director": "Brett Ratner",
    "cast": "Hugh Jackman, Halle Berry, Famke Janssen",
    "budget": "~210M$",
    "box": "~460M$",
    "rt": "57% critique / 61% public",
    "triv": "Brett Ratner remplace Bryan Singer ; traitement controversé du Phénix (annulé par la suite).",
    "link": "Sa timeline est effacée par Days of Future Past.",
    "yt": "https://www.youtube.com/watch?v=Ct5cLnQU2b4",
    "tmdb": {
      "id": 36668,
      "type": "movie"
    }
  },
  "xorigins": {
    "synopsis": "Les origines de Wolverine, de son passé de soldat à sa transformation en arme vivante.",
    "director": "Gavin Hood",
    "cast": "Hugh Jackman, Liev Schreiber, Ryan Reynolds",
    "budget": "~150M$",
    "box": "~373M$",
    "rt": "37% critique / 58% public",
    "triv": "Deadpool à la bouche cousue, moqué plus tard dans son propre film ; une copie de travail a fuité en ligne avant sortie.",
    "link": "Wolverine revisité dans The Wolverine (2013).",
    "yt": "https://www.youtube.com/watch?v=jsGflNv5_zw",
    "tmdb": {
      "id": 2080,
      "type": "movie"
    }
  },
  "xfirstclass": {
    "synopsis": "Dans les années 1960, un jeune Charles Xavier et Erik Lehnsherr forment ensemble la première classe de mutants.",
    "director": "Matthew Vaughn",
    "cast": "James McAvoy, Michael Fassbender, Jennifer Lawrence",
    "budget": "~160M$",
    "box": "~353M$",
    "rt": "85% critique / 87% public",
    "triv": "Préquelle années 60 avec James McAvoy et Michael Fassbender ; Matthew Vaughn réalise.",
    "link": "Lance la timeline préquelle continuée dans Days of Future Past.",
    "yt": "https://www.youtube.com/watch?v=UrbHykKUfTM",
    "tmdb": {
      "id": 49538,
      "type": "movie"
    }
  },
  "thewolverine": {
    "synopsis": "Wolverine se rend au Japon où on lui propose de perdre sa capacité de guérison.",
    "director": "James Mangold",
    "cast": "Hugh Jackman, Tao Okamoto, Rila Fukushima",
    "budget": "~120M$",
    "box": "~415M$",
    "rt": "71% critique / 68% public",
    "triv": "Situé au Japon ; James Mangold réalise ; scène post-crédit préparant Days of Future Past.",
    "link": "Fait le pont vers Days of Future Past.",
    "yt": "https://www.youtube.com/watch?v=nQFDrpj9zsc",
    "tmdb": {
      "id": 76170,
      "type": "movie"
    }
  },
  "xdofp": {
    "synopsis": "Wolverine voyage dans le passé pour empêcher un événement qui mènera à l'extinction des mutants.",
    "director": "Bryan Singer",
    "cast": "Hugh Jackman, James McAvoy, Michael Fassbender",
    "budget": "~200M$",
    "box": "~746M$",
    "rt": "90% critique / 91% public",
    "triv": "Fusionne les castings original et First Class via le voyage temporel.",
    "link": "Efface L'Affrontement final et redéfinit la continuité.",
    "yt": "https://www.youtube.com/watch?v=pK2zYHWDZKo",
    "tmdb": {
      "id": 127585,
      "type": "movie"
    }
  },
  "dp1": {
    "synopsis": "Un ancien soldat défiguré par une expérience devient un mercenaire masqué au sens de l'humour ravageur.",
    "director": "Tim Miller",
    "cast": "Ryan Reynolds, Morena Baccarin, Ed Skrein",
    "budget": "~58M$",
    "box": "~782M$",
    "rt": "85% critique / 90% public",
    "triv": "Des images test ayant fuité ont forcé le feu vert du studio ; plus gros succès classé R de la franchise à l'époque.",
    "link": "Lance la franchise Deadpool menant à Deadpool & Wolverine (MCU).",
    "yt": "https://www.youtube.com/watch?v=ONHBaC-pfsk",
    "tmdb": {
      "id": 293660,
      "type": "movie"
    }
  },
  "xapocalypse": {
    "synopsis": "Le tout premier mutant, réveillé après des millénaires, veut détruire la civilisation moderne.",
    "director": "Bryan Singer",
    "cast": "James McAvoy, Michael Fassbender, Oscar Isaac",
    "budget": "~178M$",
    "box": "~544M$",
    "rt": "47% critique / 65% public",
    "triv": "Oscar Isaac joue Apocalypse ; situé dans les années 1980.",
    "link": "Continue le casting préquelle vers Dark Phoenix.",
    "yt": "https://www.youtube.com/watch?v=Jer8XjMrUB4",
    "tmdb": {
      "id": 246655,
      "type": "movie"
    }
  },
  "logan": {
    "synopsis": "Un Wolverine vieillissant protège une jeune mutante aux pouvoirs similaires aux siens dans un futur sombre.",
    "director": "James Mangold",
    "cast": "Hugh Jackman, Patrick Stewart, Dafne Keen",
    "budget": "~97M$",
    "box": "~619M$",
    "rt": "94% critique / 90% public",
    "triv": "Adieu de Hugh Jackman (jusqu'à D&W) ; scénario nommé aux Oscars ; introduit X-23.",
    "link": "Référencé avec émotion dans Deadpool & Wolverine.",
    "yt": "https://www.youtube.com/watch?v=Div0iP65aZo",
    "tmdb": {
      "id": 263115,
      "type": "movie"
    }
  },
  "dp2": {
    "synopsis": "Deadpool forme une équipe de mutants pour protéger un jeune garçon menacé par un soldat venu du futur.",
    "director": "David Leitch",
    "cast": "Ryan Reynolds, Josh Brolin, Zazie Beetz",
    "budget": "~110M$",
    "box": "~785M$",
    "rt": "84% critique / 84% public",
    "triv": "Introduit Cable (Josh Brolin) et Domino ; David Leitch réalise.",
    "link": "Prépare Deadpool & Wolverine.",
    "yt": "https://www.youtube.com/watch?v=D86RtevtfrA",
    "tmdb": {
      "id": 383498,
      "type": "movie"
    }
  },
  "darkphoenix": {
    "synopsis": "Jean Grey, touchée par une force cosmique, devient une menace incontrôlable pour ses proches.",
    "director": "Simon Kinberg",
    "cast": "Sophie Turner, James McAvoy, Michael Fassbender",
    "budget": "~200M$",
    "box": "~252M$",
    "rt": "22% critique / 63% public",
    "triv": "Échec au box-office ; dernier film de la franchise X-Men Fox principale ; reshoots massifs.",
    "link": "Termine effectivement la continuité cinéma X-Men Fox.",
    "yt": "https://www.youtube.com/watch?v=k1_Bh2ssQI0",
    "tmdb": {
      "id": 320288,
      "type": "movie"
    }
  },
  "newmutants": {
    "synopsis": "Un groupe de jeunes mutants internés dans un hôpital psychiatrique isolé doit affronter ses propres démons.",
    "director": "Josh Boone",
    "cast": "Maisie Williams, Anya Taylor-Joy, Charlie Heaton",
    "budget": "~67M$",
    "box": "~49M$",
    "rt": "34% critique / 55% public",
    "triv": "Teinté horreur ; retardé ~3 ans par les reshoots et la fusion Disney-Fox.",
    "link": "Dernier film Marvel Fox.",
    "yt": "https://www.youtube.com/watch?v=I8dqjmnKvpU",
    "tmdb": {
      "id": 340102,
      "type": "movie"
    }
  },
  "deadpoolwolverine": {
    "synopsis": "Deadpool recrute une variante de Wolverine pour sauver son univers de l'effacement par la TVA.",
    "director": "Shawn Levy",
    "cast": "Ryan Reynolds, Hugh Jackman, Emma Corrin",
    "pc": "Oui — générique très long avec de nombreux clins d'œil et hommages, sans grande révélation scénaristique.",
    "budget": "~200M$",
    "box": "~1.338Md$",
    "rt": "77-78% critique / 94% public",
    "triv": "Devenu le film classé R le plus rentable de l'histoire (dépassant Joker en 23 jours) ; record d'ouverture R (~211M$).",
    "link": "Intègre officiellement Deadpool et les mutants Fox au MCU via la TVA.",
    "yt": "https://www.youtube.com/watch?v=73_1biulkYk",
    "tmdb": {
      "id": 533535,
      "type": "movie"
    }
  },
  "agatha": {
    "synopsis": "Libérée du sortilège de Wanda, Agatha Harkness forme un covent de sorcières pour reprendre ses pouvoirs.",
    "director": "Jac Schaeffer (showrunner)",
    "cast": "Kathryn Hahn, Joe Locke, Aubrey Plaza",
    "budget": "N/A",
    "box": "N/A",
    "rt": "~83% critique / ~55-60% public",
    "triv": "Tournée sur le décor (depuis démoli) de WandaVision ; introduit Billy Maximoff (Wiccan).",
    "link": "Prépare directement VisionQuest (2026), chapitre central de la trilogie WandaVision.",
    "yt": "https://www.youtube.com/watch?v=Kc2ZO2ZlB9M",
    "tmdb": {
      "id": 138501,
      "type": "tv"
    }
  },
  "whatif3": {
    "synopsis": "Nouvelle saison d'histoires alternatives dans le multivers, entre choix héroïques et destins funestes.",
    "director": "Bryan Andrews (showrunner)",
    "cast": "Jeffrey Wright (narrateur)",
    "budget": "N/A",
    "box": "N/A",
    "rt": "score moyen (peu de critiques)",
    "triv": "Dernière saison de l'anthologie animée, sortie fin décembre 2024.",
    "link": "Clôt le multivers animé What If...?",
    "yt": "https://www.youtube.com/watch?v=Zp21Jc0Kh8g",
    "tmdb": {
      "id": 91363,
      "type": "tv"
    }
  },
  "yfns1": {
    "synopsis": "Peter Parker apprend le métier de super-héros au lycée, entre missions maladroites et vie d'adolescent.",
    "director": "Jeff Trammell (showrunner)",
    "cast": "Hudson Thames (voix), Grace Song (voix)",
    "budget": "N/A",
    "box": "N/A",
    "rt": "~96-100% critique / ~70-78% public",
    "triv": "Hudson Thames double Peter (déjà dans What If...?) ; titre de travail «Freshman Year».",
    "link": "Origine alternative de Spidey introduisant Norman Osborn comme mentor précoce.",
    "yt": "https://www.youtube.com/watch?v=Rn2Fc0uJNfw",
    "tmdb": {
      "id": 138503,
      "type": "tv"
    }
  },
  "bravenewworld": {
    "synopsis": "Sam Wilson, nouveau Captain America, doit déjouer un complot international impliquant le président Ross.",
    "director": "Julius Onah",
    "cast": "Anthony Mackie, Harrison Ford, Danny Ramirez",
    "pc": "Oui — le Président Ross/Red Hulk, en lien avec les tensions à venir.",
    "budget": "~180M$",
    "box": "~415M$",
    "rt": "~48-52% critique / ~80% public",
    "triv": "D'importants reshoots ont été rapportés ; Harrison Ford reprend Thaddeus Ross, devenu Red Hulk.",
    "link": "Paye les fils de L'Incroyable Hulk et Falcon/Winter Soldier.",
    "yt": "https://www.youtube.com/watch?v=EOnGUFO9wo4",
    "tmdb": {
      "id": 822119,
      "type": "movie"
    }
  },
  "daredevil1": {
    "synopsis": "Matt Murdock reprend le costume de Daredevil alors que Wilson Fisk devient maire de New York.",
    "director": "Dario Scardapane (showrunner)",
    "cast": "Charlie Cox, Vincent D'Onofrio, Jon Bernthal",
    "budget": "N/A (plus élevé que l'ère Netflix)",
    "box": "N/A",
    "rt": "~87% critique",
    "triv": "Refonte créative en production, avec Dario Scardapane installé showrunner ; Foggy Nelson tué.",
    "link": "Fisk devient maire de NYC ; prépare le spécial Punisher et la saison 2.",
    "yt": "https://www.youtube.com/watch?v=Y0Chm3d_kkI",
    "tmdb": {
      "id": 202555,
      "type": "tv"
    }
  },
  "thunderbolts": {
    "synopsis": "Une équipe d'anciens agents et vilains est réunie de force pour une mission qui les dépasse.",
    "director": "Jake Schreier",
    "cast": "Florence Pugh, Sebastian Stan, David Harbour",
    "pc": "Oui — l'équipe se présente publiquement sous le nom «New Avengers».",
    "budget": "~180M$",
    "box": "~382M$",
    "rt": "88% critique / 93-94% public",
    "triv": "Selon Forbes, le mieux noté MCU depuis No Way Home (2021) ; l'astérisque du titre révèle l'équipe comme «New Avengers».",
    "link": "Forme les New Avengers, préparant Avengers: Doomsday.",
    "yt": "https://www.youtube.com/watch?v=Oe61Le-kmow",
    "tmdb": {
      "id": 986056,
      "type": "movie"
    }
  },
  "ironheart": {
    "synopsis": "Riri Williams, jeune génie de la technologie, construit sa propre armure et croise la route du Fantôme.",
    "director": "Sam Bailey, Angela Barnes",
    "cast": "Dominique Thorne, Anthony Ramos",
    "budget": "N/A",
    "box": "N/A",
    "rt": "~72-86% critique / ~67-72% public",
    "triv": "Produite avec Proximity Media de Ryan Coogler ; introduit Méphisto (Sacha Baron Cohen).",
    "link": "Mêle technologie et magie, amène Méphisto dans le MCU.",
    "yt": "https://www.youtube.com/watch?v=0RB0Zbt-6ak",
    "tmdb": {
      "id": 114471,
      "type": "tv"
    }
  },
  "fantasticfour": {
    "synopsis": "Sur une Terre rétro-futuriste alternative, la première famille de Marvel affronte Galactus, dévoreur de mondes.",
    "director": "Matt Shakman",
    "cast": "Pedro Pascal, Vanessa Kirby, Joseph Quinn",
    "pc": "Oui — un indice sur la menace à venir, en lien avec Doomsday.",
    "budget": "~200M$+",
    "box": "~521M$",
    "rt": "86% critique / 91-92% public",
    "triv": "Terre alternative rétro-futuriste années 60 ; Matt Shakman (WandaVision) réalise ; plus gros démarrage Marvel de 2025.",
    "link": "La scène post-crédit prépare Avengers: Doomsday.",
    "yt": "https://www.youtube.com/watch?v=pAsmrKyMqaA",
    "tmdb": {
      "id": 617126,
      "type": "movie"
    }
  },
  "eyesofwakanda": {
    "synopsis": "Anthologie animée suivant les Hatut Zeraze, gardiens de l'ombre du Wakanda à travers les âges.",
    "director": "Todd Harris (showrunner)",
    "cast": "Série animée",
    "budget": "N/A",
    "box": "N/A",
    "rt": "92% critique / 51% public",
    "triv": "Anthologie animée produite par Ryan Coogler ; explicitement canon au MCU.",
    "link": "Étend l'histoire wakandaise et le lore du Vibranium.",
    "yt": "https://www.youtube.com/watch?v=Sd6dxRi3JFo",
    "tmdb": {
      "id": 241388,
      "type": "tv"
    }
  },
  "marvelzombies": {
    "synopsis": "Une variante de héros Marvel doit survivre à une invasion zombie qui a ravagé leur monde.",
    "director": "Bryan Andrews (showrunner)",
    "cast": "Série animée, classée TV-MA",
    "budget": "N/A",
    "box": "N/A",
    "rt": "62-67% critique",
    "triv": "Spin-off de l'épisode zombie de What If...? ; classé TV-MA.",
    "link": "Apocalypse zombie alternative, autonome dans le multivers animé.",
    "yt": "https://www.youtube.com/watch?v=cFBpKAqNQm4",
    "tmdb": {
      "id": 138505,
      "type": "tv"
    }
  },
  "wonderman": {
    "synopsis": "Simon Williams, ancien cascadeur devenu super-héros raté, tente de percer à Hollywood.",
    "director": "Destin Daniel Cretton (showrunner)",
    "cast": "Yahya Abdul-Mateen II, Ben Kingsley",
    "budget": "N/A",
    "box": "N/A",
    "rt": "~90-91% critique / ~91% public",
    "triv": "Meilleur score public au lancement d'une série MCU live-action (devant WandaVision) ; renouvelée saison 2.",
    "link": "Réintroduit Simon Williams, continue l'arc de Trevor Slattery.",
    "yt": "https://www.youtube.com/watch?v=lgoxHC7WF9w",
    "tmdb": {
      "id": 198178,
      "type": "tv"
    }
  },
  "daredevil2": {
    "synopsis": "Daredevil et le Caïd s'affrontent alors que ce dernier resserre son emprise sur New York.",
    "director": "Justin Benson, Aaron Moorhead (showrunners)",
    "cast": "Charlie Cox, Vincent D'Onofrio",
    "budget": "N/A",
    "box": "N/A",
    "rt": "~86% critique (débuté à 95%) / ~86% public",
    "triv": "Krysten Ritter (Jessica Jones) revient ; saison 3 déjà commandée.",
    "link": "Continue l'arc de maire de Fisk, mène au spécial Punisher.",
    "yt": "https://www.youtube.com/watch?v=Y0Chm3d_kkI",
    "tmdb": {
      "id": 202555,
      "type": "tv"
    }
  },
  "punisher": {
    "synopsis": "Frank Castle mène une dernière mission sanglante, en lien direct avec les événements de Born Again.",
    "director": "Reinaldo Marcus Green",
    "cast": "Jon Bernthal, Judith Light",
    "budget": "N/A",
    "box": "N/A",
    "rt": "~85% critique / ~94% public",
    "triv": "Jon Bernthal co-écrit avec le réalisateur Reinaldo Marcus Green ; meilleure adaptation Punisher notée.",
    "link": "Situé pendant Born Again S2 ; prépare Frank Castle pour Brand New Day.",
    "yt": "https://www.youtube.com/watch?v=oSeqs_xeqv4"
  },
  "xmen97-2": {
    "synopsis": "Les X-Men affrontent de nouvelles menaces alors que les tensions entre humains et mutants s'intensifient.",
    "director": "Jake Castorena (showrunner)",
    "cast": "Voix de la série animée originale des années 90",
    "budget": "N/A",
    "box": "N/A",
    "rt": "100% critique / ~90% public",
    "triv": "Score critique parfait, dépassant la saison 1 (99%) ; arc Apocalypse sur trois lignes temporelles.",
    "link": "Continue la saga mutante vers l'ère live-action à venir.",
    "yt": "https://www.youtube.com/watch?v=mfUtseK27pc",
    "tmdb": {
      "id": 138502,
      "type": "tv"
    }
  },
  "brandnewday": {
    "synopsis": "Un nouveau chapitre pour Spider-Man, marqué par l'arrivée du Punisher et de Hulk dans son univers.",
    "director": "Destin Daniel Cretton",
    "cast": "Tom Holland, Jon Bernthal, Mark Ruffalo",
    "budget": "N/A",
    "box": "TBD (pas encore sorti)",
    "rt": "TBD (pas encore sorti)",
    "triv": "Sa bande-annonce a cumulé 718,6M de vues en 24h, devenant le lancement de trailer le plus vu de tous les temps.",
    "link": "Suit l'effacement de mémoire de No Way Home ; paye le fil Scorpion depuis Homecoming.",
    "yt": "https://www.youtube.com/watch?v=Ba_M-t_v9mk",
    "tmdb": {
      "id": 969681,
      "type": "movie"
    }
  },
  "yfns2": {
    "synopsis": "Peter Parker doit gérer l'arrivée de nouveaux visages, dont Venom et Gwen Stacy, dans sa vie de héros.",
    "director": "Jeff Trammell (showrunner)",
    "cast": "Hudson Thames (voix)",
    "budget": "N/A",
    "box": "N/A",
    "rt": "TBD (pas encore sorti)",
    "triv": "Annoncée pour l'automne 2026 au NYCC 2025 ; introduira Venom et Gwen Stacy.",
    "link": "Continue la saga animée alternative de Spidey.",
    "yt": "Pas encore publiée",
    "tmdb": {
      "id": 138503,
      "type": "tv"
    }
  },
  "visionquest": {
    "synopsis": "Vision, reconstruit et hanté par ses souvenirs, doit affronter Ultron pour retrouver qui il est vraiment.",
    "director": "Terry Matalas (showrunner)",
    "cast": "Paul Bettany, James Spader",
    "budget": "N/A",
    "box": "N/A",
    "rt": "TBD (pas encore sorti)",
    "triv": "Paul Bettany et James Spader reviennent ; Terry Matalas (Star Trek: Picard) showrunner.",
    "link": "Conclut la trilogie WandaVision/Agatha ; pourrait mener à Secret Wars.",
    "yt": "Pas encore publiée",
    "tmdb": {
      "id": 213375,
      "type": "tv"
    }
  },
  "doomsday": {
    "synopsis": "Les héros de la Terre s'unissent face à la menace ultime d'un multivers en train de s'effondrer sous Doctor Doom.",
    "director": "Anthony et Joe Russo",
    "cast": "Robert Downey Jr., et l'ensemble du casting Avengers",
    "budget": "N/A",
    "box": "TBD (pas encore sorti)",
    "rt": "TBD (pas encore sorti)",
    "triv": "Réputé être parmi les films les plus chers jamais produits (budget non confirmé) ; sa bande-annonce (20 juillet 2026) a cumulé 503M de vues en 24h, 2e plus gros lancement de trailer de tous les temps.",
    "link": "Avant-dernier chapitre de la Saga du Multivers, prépare Avengers: Secret Wars (déc. 2027).",
    "yt": "https://www.youtube.com/watch?v=Ba_M-t_v9mk",
    "tmdb": {
      "id": 1003596,
      "type": "movie"
    }
  }
};

// English overrides: only fields that differ from a generic FR->EN transform of the
// French text (see frMoney/frRT in localize.ts). director/cast/yt/tmdb/poster are
// language-neutral and only ever live in INFO above, never duplicated here.
export const INFO_EN: Record<string, InfoOverride> = {
  "cap1": {
    "synopsis": "A frail young man becomes a super-soldier to fight HYDRA during World War II.",
    "pc": "Yes — Nick Fury recruits Steve for the Avengers.",
    "triv": "Chris Evans initially turned down the role several times; the “scrawny Steve” effect was achieved with a body double plus CGI.",
    "link": "Introduces the Tesseract, Red Skull, and Bucky; Steve's being frozen brings him into the present day."
  },
  "capmarvel": {
    "synopsis": "A U.S. Air Force pilot turned Kree warrior rediscovers her human past and her tie to the Skrulls.",
    "pc": "Two scenes — Carol joins the Avengers after the Snap; Goose coughs up the Tesseract.",
    "triv": "Set in 1995 with a digitally de-aged Samuel L. Jackson; explains how Fury lost his eye.",
    "link": "Fury's pager at the end of Infinity War leads directly to this film and then to Endgame."
  },
  "ironman1": {
    "synopsis": "A weapons manufacturer, held captive, builds a powered suit of armor to escape and becomes a hero.",
    "pc": "Yes — Nick Fury mentions the “Avengers Initiative.”",
    "triv": "Casting Robert Downey Jr. was a studio gamble; Terrence Howard originally played Rhodey (later replaced by Don Cheadle).",
    "link": "Launches the entire MCU; Fury's post-credit scene sets up the Avengers."
  },
  "ironman2": {
    "synopsis": "Tony Stark must deal with the fallout of his public identity and a new enemy armed with electric whips.",
    "pc": "Yes — Thor's hammer discovered in a crater in New Mexico.",
    "triv": "Introduces Black Widow and War Machine (Don Cheadle); Sam Rockwell plays Justin Hammer.",
    "link": "Develops S.H.I.E.L.D. and sets up the Avengers assembling."
  },
  "hulk": {
    "synopsis": "Bruce Banner, on the run, searches for a cure to his condition while evading the U.S. Army.",
    "pc": "Yes — Tony Stark offers his help to General Ross.",
    "triv": "Edward Norton played Banner, replaced by Mark Ruffalo starting with Avengers.",
    "link": "The Samuel Sterns/“Leader” thread wouldn't pay off until 17 years later in Captain America: Brave New World."
  },
  "thor1": {
    "synopsis": "Banished to Earth by his father, the god of thunder must learn humility to regain his powers.",
    "pc": "Yes — Loki manipulates Selvig, the Tesseract is shown.",
    "triv": "Kenneth Branagh directs; Chris Hemsworth got the role after his brother Liam auditioned first.",
    "link": "Introduces Loki and the Tesseract, setting up the Avengers."
  },
  "avengers1": {
    "synopsis": "Nick Fury assembles a team of heroes to counter the threat of Loki and his Chitauri army.",
    "pc": "Two scenes — Thanos smiles; the Avengers eat shawarma in silence.",
    "triv": "Written and directed by Joss Whedon; the shawarma scene was filmed after the premiere.",
    "link": "Caps off Phase 1; Thanos is revealed in the post-credit scene."
  },
  "thor2": {
    "synopsis": "Thor must save the nine realms from an ancient force, the Dark Elves, led by Malekith.",
    "pc": "Two scenes — the Collector receives the Aether; Thor and Jane reunite on Earth.",
    "triv": "A troubled production with heavy reshoots; often cited as one of the MCU's weaker entries.",
    "link": "Introduces the Aether (Reality Stone), handed off to the Collector."
  },
  "ironman3": {
    "synopsis": "After the attack on New York, Tony Stark faces the terrorist Mandarin while struggling with anxiety.",
    "pc": "A light mid-credit scene (Tony/Bruce), no real post-credit scene.",
    "triv": "The Mandarin/Trevor Slattery twist proved controversial (addressed later in Shang-Chi).",
    "link": "Trevor Slattery returns in Shang-Chi and Wonder Man (2026)."
  },
  "cap2": {
    "synopsis": "Captain America discovers HYDRA has infiltrated S.H.I.E.L.D. while a mysterious assassin, the Winter Soldier, hunts him.",
    "pc": "Two scenes — Bucky at the Smithsonian; Strucker's lab with the twins and Loki's scepter.",
    "triv": "The Russo brothers' first MCU film; Robert Redford was cast to evoke 70s political thrillers.",
    "link": "Collapses S.H.I.E.L.D. (HYDRA reveal) and sets up Civil War."
  },
  "gotg1": {
    "synopsis": "A group of space outlaws band together to stop a fanatic from getting hold of an all-powerful orb.",
    "pc": "Yes — Howard the Duck makes a surprise cameo at the Collector's.",
    "triv": "James Gunn directs; the “Awesome Mix” soundtrack became a hit in its own right.",
    "link": "Introduces the Power Stone and Thanos, launching the cosmic side of the MCU."
  },
  "gotg2": {
    "synopsis": "The Guardians face a new threat while Peter Quill learns the identity of his celestial father.",
    "pc": "Five scenes — including Stan Lee, the Ravagers, and Adam Warlock's cocoon.",
    "triv": "Kurt Russell plays Ego; the film features five post-credit scenes.",
    "link": "Reveals Star-Lord's origins and sets up Adam Warlock."
  },
  "avengers2": {
    "synopsis": "Tony Stark creates an artificial intelligence meant to protect the world, but Ultron turns against humanity.",
    "pc": "Yes — Thanos personally dons the Gauntlet.",
    "triv": "James Spader plays Ultron via performance capture; introduces Scarlet Witch and Vision.",
    "link": "Creates Vision and the Mind Stone; Ultron returns in VisionQuest (2026)."
  },
  "dd_s1": {
    "synopsis": "A blind lawyer by day, Matt Murdock becomes a masked vigilante by night to clean up Hell's Kitchen.",
    "triv": "The hallway fight one-take (ep. 2) became an instant classic.",
    "link": "Launches Netflix's “street-level” corner; Cox and D'Onofrio would later be folded into MCU canon."
  },
  "jj_s1": {
    "synopsis": "A private investigator with superpowers hunts a man capable of controlling other people's minds.",
    "triv": "David Tennant plays Kilgrave; praised for its treatment of trauma.",
    "link": "Introduces Luke Cage ahead of his own spin-off."
  },
  "antman1": {
    "synopsis": "A reformed burglar dons a suit that lets him shrink down to pull off a crucial heist.",
    "pc": "Two scenes — the fight with Falcon; Hank reveals the Wasp suit to Hope.",
    "triv": "Edgar Wright left the project; Peyton Reed took over directing.",
    "link": "Introduces the Quantum Realm, crucial for Endgame."
  },
  "cap3": {
    "synopsis": "The Avengers tear each other apart over the question of government oversight of their actions.",
    "pc": "Yes — Bucky in cryosleep in Wakanda, T'Challa builds a new lab.",
    "triv": "Introduces Spider-Man (Tom Holland) and Black Panther (Chadwick Boseman).",
    "link": "Splits the Avengers via the Sokovia Accords, leading into Infinity War."
  },
  "dd_s2": {
    "synopsis": "Daredevil faces off against the Kingpin and crosses paths with the Punisher, while Elektra resurfaces from his past.",
    "triv": "Introduces the Punisher (Jon Bernthal) and Elektra (Élodie Yung).",
    "link": "Bernthal continues on through Born Again and the 2026 special."
  },
  "lc_s1": {
    "synopsis": "Gifted with unbreakable skin, an ex-convict from Harlem becomes his neighborhood's reluctant protector.",
    "triv": "Rooted in Harlem's culture and music; its launch reportedly crashed Netflix.",
    "link": "Part of the Defenders lineup, a direct follow-up to Jessica Jones."
  },
  "blackwidow": {
    "synopsis": "Natasha Romanoff confronts her past in the Red Room program and reunites with her family of spies.",
    "pc": "Yes — Yelena, recruited by Valentina, mourns at Natasha's grave.",
    "triv": "Released simultaneously on Disney+ Premier Access during COVID; set after Civil War.",
    "link": "Introduces Yelena Belova and Red Guardian, both later in Thunderbolts*."
  },
  "blackpanther1": {
    "synopsis": "T'Challa becomes king of Wakanda and must defend his throne against a rival with radical intentions.",
    "pc": "Two scenes — T'Challa addresses the U.N.; Bucky reappears in Wakanda as the White Wolf.",
    "triv": "First MCU film nominated for the Best Picture Oscar (won 3 statuettes); directed by Ryan Coogler.",
    "link": "Establishes Wakanda and Vibranium, central to Infinity War."
  },
  "spiderman1": {
    "synopsis": "Peter Parker tries to juggle high school and super-hero life under Tony Stark's mentorship.",
    "pc": "A comedic fake “mid-credit” (Captain America PSA); a post-credit scene with Vulture in prison hinting at the Sinister Six.",
    "triv": "First Sony/Marvel co-produced film; introduces Mac Gargan (Scorpion).",
    "link": "The Scorpion thread pays off in Spider-Man: Brand New Day (2026)."
  },
  "drstrange1": {
    "synopsis": "A surgeon left disabled discovers magic and parallel universes under the Ancient One's guidance.",
    "pc": "Two scenes — Thor brings Loki to Strange (Ragnarok teaser); Mordo steals Pangborn's powers.",
    "triv": "Casting Tilda Swinton as the Ancient One proved controversial (whitewashing).",
    "link": "Introduces the Time Stone, crucial for Infinity War/Endgame."
  },
  "thor3": {
    "synopsis": "Trapped on Sakaar, Thor must fight his friend Hulk in the arena to save Asgard from his sister Hela.",
    "pc": "Two scenes — the Grandmaster survived the revolt; Thor's ship is intercepted (Infinity War teaser).",
    "triv": "Taika Waititi directs and voices Korg; a very improvised, comedic reinvention.",
    "link": "Destroys Asgard, leading directly into Infinity War's opening."
  },
  "if_s1": {
    "synopsis": "A missing billionaire resurfaces in New York, master of martial arts and the Iron Fist.",
    "triv": "Netflix's lowest-rated Marvel series, criticized for its fight choreography.",
    "link": "Leads into the Defenders."
  },
  "defenders": {
    "synopsis": "Daredevil, Jessica Jones, Luke Cage, and Iron Fist join forces against the Hand.",
    "triv": "Crossover reuniting Daredevil, Jessica Jones, Luke Cage, and Iron Fist; Sigourney Weaver as the antagonist.",
    "link": "The culmination of Netflix's street-level corner."
  },
  "pun_s1": {
    "synopsis": "Frank Castle wages a solitary, bloody war on organized crime after his family's murder.",
    "triv": "Spin-off of Jon Bernthal's character from Daredevil S2.",
    "link": "Frank Castle continues on through Born Again and the 2026 special."
  },
  "avengers3": {
    "synopsis": "Thanos sets out to gather all six Infinity Stones to erase half the universe.",
    "pc": "Yes — Fury and Hill disintegrate, the pager sends a signal to Captain Marvel.",
    "triv": "A massive crossover ending on the “Snap”; filmed simultaneously with Endgame.",
    "link": "Thanos gathers all six Infinity Stones, setting up Endgame directly."
  },
  "jj_s2": {
    "synopsis": "Jessica Jones investigates the origins of her powers and the IGH experiment that created her.",
    "triv": "Every episode directed by women.",
    "link": "Continuity from the Defenders."
  },
  "lc_s2": {
    "synopsis": "Luke Cage must protect Harlem from a new mystical rival arriving from Jamaica.",
    "triv": "Bushmaster antagonist with reggae/Caribbean influences.",
    "link": "Continuity from the Defenders."
  },
  "if_s2": {
    "synopsis": "Danny Rand tries to regain control of K'un-Lun and his role as the Iron Fist.",
    "triv": "Improved fight choreography thanks to a new coordinator.",
    "link": "Continuity from the Defenders."
  },
  "dd_s3": {
    "synopsis": "Left for dead, Daredevil must rebuild his identity as the Kingpin seizes control of the FBI.",
    "triv": "Adapts the “Born Again” comics arc; introduces Bullseye (Wilson Bethel).",
    "link": "Directly precedes the Disney+ revival, Born Again."
  },
  "antman2": {
    "synopsis": "Scott Lang teams up with Hope van Dyne to rescue her mother, lost in the quantum realm.",
    "pc": "Yes — Scott stuck in the Quantum Realm while the Snap hits Hank, Hope, and Janet.",
    "triv": "First MCU film with a co-heroine in the title; set before Infinity War's Snap.",
    "link": "The Quantum Realm becomes central to Endgame."
  },
  "pun_s2": {
    "synopsis": "Frank Castle is hunted by a former soldier while trying to live under a normal identity.",
    "triv": "The last Netflix season before the cancellations began.",
    "link": "Frank Castle continues toward Born Again / the 2026 special."
  },
  "jj_s3": {
    "synopsis": "Jessica Jones faces an obsessive serial killer while managing her relationship with Trish.",
    "triv": "The last Netflix Marvel series to air.",
    "link": "Krysten Ritter returns in Daredevil: Born Again S2 (2026)."
  },
  "avengers4": {
    "synopsis": "The survivors attempt to undo Thanos's Snap by manipulating time itself.",
    "pc": "No — no post-credit scene (just the sound of Tony's anvil as a nod).",
    "triv": "Tony Stark and Black Widow die; filmed with fake scripts to avoid leaks. Dethroned Avatar at the worldwide box office (before Avatar reclaimed the record in 2021).",
    "link": "Concludes the Infinity Saga; the shield passes to Sam Wilson."
  },
  "wandavision": {
    "synopsis": "Wanda Maximoff and Vision live an idyllic sitcom life in a reality hiding a heavy secret.",
    "budget": "N/A (~$25M/episode)",
    "triv": "A format paying homage to sitcoms across the decades; the song “Agatha All Along” went viral.",
    "link": "Sets up Wanda's turn in Multiverse of Madness and launches Agatha All Along + VisionQuest."
  },
  "falcon": {
    "synopsis": "Sam Wilson and Bucky Barnes team up against an extremist group and a new Captain America.",
    "budget": "N/A (~$150M total)",
    "triv": "Production disrupted by COVID; introduces U.S. Agent.",
    "link": "Sam Wilson becomes Captain America, leading into Brave New World (2025)."
  },
  "loki1": {
    "synopsis": "Arrested by the TVA for altering the sacred timeline, Loki must fix the multiverse.",
    "triv": "Introduces the TVA and Mobius (Owen Wilson); Sophia Di Martino plays Sylvie.",
    "link": "Introduces He Who Remains/Kang, launching the Multiverse Saga."
  },
  "whatif1": {
    "synopsis": "The Watcher explores alternate realities where a single event changed everything.",
    "cast": "Jeffrey Wright (narrator)",
    "triv": "The first animated MCU series; features some of Chadwick Boseman's final performances.",
    "link": "Introduces the animated multiverse; Captain Carter reappears in Doctor Strange 2."
  },
  "farfromhome": {
    "synopsis": "Peter Parker goes on a school trip to Europe, where Nick Fury enlists him against the Elementals.",
    "pc": "Two scenes — J. Jonah Jameson reveals Spider-Man's identity; Fury and Hill turn out to be Skrulls.",
    "triv": "Jake Gyllenhaal plays Mysterio; the first MCU film released after Endgame.",
    "link": "Mysterio reveals Peter's identity, setting up No Way Home."
  },
  "hawkeye": {
    "synopsis": "Clint Barton reluctantly trains Kate Bishop, a young archer determined to become a super hero.",
    "triv": "A Christmas series set in New York introducing Kate Bishop (Hailee Steinfeld).",
    "link": "The Kingpin returns; the Yelena arc leads into Thunderbolts*."
  },
  "moonknight": {
    "synopsis": "Steven Grant discovers he shares his body with a mercenary wielding Egyptian powers, Marc Spector.",
    "triv": "Oscar Isaac plays multiple personas (Steven Grant / Marc Spector).",
    "link": "Introduces Egyptian mythology, largely self-contained for now."
  },
  "eternals": {
    "synopsis": "Immortal beings step out of the shadows to protect Earth from an ancient threat, the Deviants.",
    "pc": "Two scenes — Eros and Pip the Troll join the group; Dane Whitman mentions the Ebony Blade.",
    "triv": "Oscar-winner Chloé Zhao directs; the first “Rotten” MCU film; the MCU's first deaf hero and first gay couple.",
    "link": "Introduces the Celestials; Eros and the Black Knight are teased in the credits."
  },
  "msmarvel": {
    "synopsis": "Kamala Khan, an Avengers fan, discovers she has cosmic powers of her own.",
    "triv": "Iman Vellani's debut; the highest RT critic score for an MCU series at the time.",
    "link": "Reveals Kamala is a mutant, leading directly into The Marvels."
  },
  "nowayhome": {
    "synopsis": "With Spider-Man's identity revealed to the world, a botched spell opens the multiverse to old enemies.",
    "pc": "No — no classic stinger, the film ends on a quieter scene with Peter.",
    "triv": "The returns of Tobey Maguire and Andrew Garfield were kept secret until release.",
    "link": "Strange's spell sets up Brand New Day (2026)."
  },
  "drstrange2": {
    "synopsis": "Doctor Strange travels across the multiverse to protect a young girl with unique powers.",
    "pc": "Yes — Clea (Charlize Theron) recruits Strange for a multiversal incursion.",
    "triv": "Sam Raimi directs with horror elements; introduces America Chavez and the Illuminati.",
    "link": "Pays off Wanda's arc from WandaVision."
  },
  "thor4": {
    "synopsis": "Thor teams up with Jane Foster, now Mighty Thor, to defeat Gorr the God Butcher.",
    "pc": "Yes — Heimdall and his son Axl find a young Thor in Valhalla.",
    "triv": "Christian Bale plays Gorr; received a more mixed reception than Ragnarok.",
    "link": "Introduces Hercules (credits); Gorr's daughter appears in the Doomsday teasers."
  },
  "shehulk": {
    "synopsis": "Jennifer Walters juggles a career as a lawyer with life as a 7-foot-tall green super hero.",
    "triv": "A “fourth wall-breaking” comedy; CGI drew controversy; introduces Daredevil's yellow-and-red suit.",
    "link": "Reintroduces Abomination and Wong, sets a lighter tone ahead of Born Again."
  },
  "wakandaforever": {
    "synopsis": "Wakanda must face the grief of losing its king and the undersea threat of Namor.",
    "pc": "Two scenes — Shuri privately burns the ceremonial robe; Nakia reveals her son, T'Challa Jr., in Haiti.",
    "triv": "Made after Chadwick Boseman's death as a tribute to him; introduces Namor and Riri Williams.",
    "link": "Riri Williams continues on in Ironheart (2025)."
  },
  "secretinvasion": {
    "synopsis": "Nick Fury discovers a Skrull faction is secretly infiltrating Earth's governments.",
    "budget": "N/A (~$212M)",
    "triv": "The first “Rotten” MCU Disney+ series; its AI-generated title sequence proved controversial.",
    "link": "Precedes The Marvels; leaves several Skrull threads unresolved."
  },
  "loki2": {
    "synopsis": "Broken by time, Loki tries to save the TVA from the multiverse's collapse.",
    "triv": "Turned around the reputation of Phase 5 series; Jonathan Majors's last appearance before his removal.",
    "link": "Loki becomes the “God of Stories,” a structural pillar of the Multiverse Saga."
  },
  "whatif2": {
    "synopsis": "New alternate realities explore choices that upended familiar heroes.",
    "cast": "Jeffrey Wright (narrator)",
    "triv": "Released daily during the December 2023 holidays.",
    "link": "Continues the animated multiverse."
  },
  "quantumania": {
    "synopsis": "The Lang-van Dyne family is sucked into the quantum realm, ruled by Kang the Conqueror.",
    "pc": "Two scenes — Kang's Council reacts to his death; Cassie and a young Kang play with time.",
    "triv": "Introduces Kang the Conqueror (Jonathan Majors) as the Saga's planned main villain (dropped after his legal troubles).",
    "link": "Was meant to launch the “Kang Dynasty,” reworked into Avengers: Doomsday with Doctor Doom."
  },
  "gotg3": {
    "synopsis": "Mortally wounded, Rocket forces the Guardians to confront his past as a lab creature.",
    "cast": "Chris Pratt, Zoe Saldaña, Bradley Cooper (voice)",
    "pc": "Yes — several vignettes on each Guardian's new status after the mission.",
    "triv": "James Gunn's last MCU film before DC; centered on Rocket's origins.",
    "link": "Closes out this Guardians lineup; Rocket leads a new team."
  },
  "marvels": {
    "synopsis": "Carol Danvers, Kamala Khan, and Monica Rambeau involuntarily swap places whenever they use their powers.",
    "pc": "Yes — Kamala Khan wakes up alongside other young heroes (Young Avengers tease).",
    "triv": "The MCU's biggest box-office underperformer (worst MCU opening, ~$46M); the shortest MCU film (~105 min).",
    "link": "The post-credit scene reveals mutants via Beast (Kelsey Grammer), opening the mutant era."
  },
  "echo": {
    "synopsis": "Maya Lopez returns to her home community to confront her past tied to the Kingpin.",
    "budget": "N/A (record for a Disney+ MCU series)",
    "triv": "The first MCU “Spotlight” series; all episodes dropped at once; rated TV-MA.",
    "link": "Continues the Kingpin arc from Hawkeye, leading into Daredevil: Born Again."
  },
  "xmen97-1": {
    "synopsis": "After Professor X's disappearance, the X-Men must carry on his dream in a world more hostile than ever.",
    "cast": "Voice cast from the original '90s animated series",
    "triv": "The highest RT score of any Marvel project; a direct sequel to the 1992 animated series.",
    "link": "Advances the mutant storylines; renewed for multiple seasons."
  },
  "xmen1": {
    "synopsis": "Professor Xavier and Magneto clash over the best way to protect mutants in a hostile world.",
    "triv": "Launched the modern superhero cinema era; Hugh Jackman was cast after Dougray Scott dropped out.",
    "link": "Foundation of the Fox X-Men franchise; characters revisited in Days of Future Past."
  },
  "x2": {
    "synopsis": "A fanatical colonel launches an attack on all mutants, forcing the X-Men and Magneto to team up.",
    "triv": "The White House opening with Nightcrawler is hailed as a genre high point.",
    "link": "Sets up the Dark Phoenix arc for The Last Stand."
  },
  "xlaststand": {
    "synopsis": "A cure for mutation is developed as Jean Grey, resurrected, becomes Phoenix.",
    "triv": "Brett Ratner replaces Bryan Singer; a controversial treatment of the Phoenix (later retconned).",
    "link": "Its timeline is erased by Days of Future Past."
  },
  "xorigins": {
    "synopsis": "Wolverine's origins, from his past as a soldier to his transformation into a living weapon.",
    "triv": "Deadpool with his mouth sewn shut, later mocked in his own film; a work-print copy leaked online before release.",
    "link": "Wolverine revisited in The Wolverine (2013)."
  },
  "xfirstclass": {
    "synopsis": "In the 1960s, a young Charles Xavier and Erik Lehnsherr together form the first class of mutants.",
    "triv": "A '60s prequel with James McAvoy and Michael Fassbender; Matthew Vaughn directs.",
    "link": "Launches the prequel timeline continued in Days of Future Past."
  },
  "thewolverine": {
    "synopsis": "Wolverine travels to Japan, where he's offered a chance to lose his healing ability.",
    "triv": "Set in Japan; James Mangold directs; post-credit scene sets up Days of Future Past.",
    "link": "Bridges into Days of Future Past."
  },
  "xdofp": {
    "synopsis": "Wolverine travels back in time to prevent an event that will lead to the mutants' extinction.",
    "triv": "Merges the original and First Class casts through time travel.",
    "link": "Erases The Last Stand and redefines the continuity."
  },
  "dp1": {
    "synopsis": "A former soldier disfigured by an experiment becomes a masked mercenary with a savage sense of humor.",
    "triv": "Leaked test footage forced the studio's hand; the highest-grossing R-rated hit of the franchise at the time.",
    "link": "Launches the Deadpool franchise leading into Deadpool & Wolverine (MCU)."
  },
  "xapocalypse": {
    "synopsis": "The very first mutant, awakened after millennia, wants to destroy modern civilization.",
    "triv": "Oscar Isaac plays Apocalypse; set in the 1980s.",
    "link": "Continues the prequel cast toward Dark Phoenix."
  },
  "logan": {
    "synopsis": "An aging Wolverine protects a young mutant with powers similar to his own in a bleak future.",
    "triv": "Hugh Jackman's farewell (until D&W); an Oscar-nominated screenplay; introduces X-23.",
    "link": "Referenced emotionally in Deadpool & Wolverine."
  },
  "dp2": {
    "synopsis": "Deadpool assembles a team of mutants to protect a young boy threatened by a soldier from the future.",
    "triv": "Introduces Cable (Josh Brolin) and Domino; David Leitch directs.",
    "link": "Sets up Deadpool & Wolverine."
  },
  "darkphoenix": {
    "synopsis": "Jean Grey, touched by a cosmic force, becomes an uncontrollable threat to those close to her.",
    "triv": "A box-office bomb; the last film of the main Fox X-Men continuity; massive reshoots.",
    "link": "Effectively ends the Fox X-Men film continuity."
  },
  "newmutants": {
    "synopsis": "A group of young mutants confined in an isolated psychiatric hospital must face their own demons.",
    "triv": "Horror-tinged; delayed ~3 years by reshoots and the Disney-Fox merger.",
    "link": "The last Fox Marvel film."
  },
  "deadpoolwolverine": {
    "synopsis": "Deadpool recruits a variant of Wolverine to save his universe from erasure by the TVA.",
    "pc": "Yes — a very long credits sequence full of cameos and tributes, without a major story revelation.",
    "triv": "Became the highest-grossing R-rated film ever (surpassing Joker in 23 days); set the R-rated opening record (~$211M).",
    "link": "Officially folds Deadpool and the Fox mutants into the MCU via the TVA."
  },
  "agatha": {
    "synopsis": "Freed from Wanda's spell, Agatha Harkness forms a coven of witches to reclaim her powers.",
    "triv": "Filmed on WandaVision's (since demolished) set; introduces Billy Maximoff (Wiccan).",
    "link": "Directly sets up VisionQuest (2026), the central chapter of the WandaVision trilogy."
  },
  "whatif3": {
    "synopsis": "A new season of alternate stories across the multiverse, spanning heroic choices and grim fates.",
    "cast": "Jeffrey Wright (narrator)",
    "rt": "average score (few reviews)",
    "triv": "The animated anthology's final season, released in late December 2024.",
    "link": "Closes out the animated What If...? multiverse."
  },
  "yfns1": {
    "synopsis": "Peter Parker learns the super hero trade in high school, between clumsy missions and teenage life.",
    "cast": "Hudson Thames (voice), Grace Song (voice)",
    "triv": "Hudson Thames voices Peter (already in What If...?); working title “Freshman Year.”",
    "link": "An alternate Spidey origin introducing Norman Osborn as an early mentor."
  },
  "bravenewworld": {
    "synopsis": "Sam Wilson, the new Captain America, must foil an international plot involving President Ross.",
    "pc": "Yes — President Ross/Red Hulk, tied to tensions to come.",
    "triv": "Significant reshoots were reported; Harrison Ford takes over as Thaddeus Ross, now Red Hulk.",
    "link": "Pays off threads from The Incredible Hulk and Falcon/Winter Soldier."
  },
  "daredevil1": {
    "synopsis": "Matt Murdock dons the Daredevil suit again as Wilson Fisk becomes mayor of New York.",
    "budget": "N/A (higher than the Netflix era)",
    "triv": "A creative overhaul during production, with Dario Scardapane installed as showrunner; Foggy Nelson killed off.",
    "link": "Fisk becomes mayor of NYC; sets up the Punisher special and season 2."
  },
  "thunderbolts": {
    "synopsis": "A team of former agents and villains is forced together for a mission beyond them.",
    "pc": "Yes — the team publicly introduces itself as the “New Avengers.”",
    "triv": "Per Forbes, the best-reviewed MCU film since No Way Home (2021); the title's asterisk reveals the team as “New Avengers.”",
    "link": "Forms the New Avengers, setting up Avengers: Doomsday."
  },
  "ironheart": {
    "synopsis": "Riri Williams, a young tech genius, builds her own armor and crosses paths with the Hood.",
    "triv": "Produced with Ryan Coogler's Proximity Media; introduces Mephisto (Sacha Baron Cohen).",
    "link": "Blends technology and magic, brings Mephisto into the MCU."
  },
  "fantasticfour": {
    "synopsis": "On an alternate retro-futuristic Earth, Marvel's first family faces Galactus, devourer of worlds.",
    "pc": "Yes — a hint of the threat to come, tied to Doomsday.",
    "triv": "An alternate '60s retro-futuristic Earth; Matt Shakman (WandaVision) directs; the biggest Marvel opening of 2025.",
    "link": "The post-credit scene sets up Avengers: Doomsday."
  },
  "eyesofwakanda": {
    "synopsis": "An animated anthology following the Hatut Zeraze, Wakanda's shadow guardians across the ages.",
    "cast": "Animated series",
    "triv": "An animated anthology produced by Ryan Coogler; explicitly MCU canon.",
    "link": "Expands Wakandan history and Vibranium lore."
  },
  "marvelzombies": {
    "synopsis": "A variant of Marvel heroes must survive a zombie invasion that has ravaged their world.",
    "cast": "Animated series, rated TV-MA",
    "triv": "Spin-off of What If...?'s zombie episode; rated TV-MA.",
    "link": "An alternate zombie apocalypse, self-contained within the animated multiverse."
  },
  "wonderman": {
    "synopsis": "Simon Williams, a former stuntman turned failed super hero, tries to make it in Hollywood.",
    "triv": "The best audience-score launch of any live-action MCU series (ahead of WandaVision); renewed for season 2.",
    "link": "Reintroduces Simon Williams, continues Trevor Slattery's arc."
  },
  "daredevil2": {
    "synopsis": "Daredevil and the Kingpin clash as Fisk tightens his grip on New York.",
    "triv": "Krysten Ritter (Jessica Jones) returns; season 3 already ordered.",
    "link": "Continues Fisk's mayoral arc, leading into the Punisher special."
  },
  "punisher": {
    "synopsis": "Frank Castle carries out one last bloody mission, directly tied to the events of Born Again.",
    "triv": "Jon Bernthal co-writes with director Reinaldo Marcus Green; the best-reviewed Punisher adaptation.",
    "link": "Set during Born Again S2; sets up Frank Castle for Brand New Day."
  },
  "xmen97-2": {
    "synopsis": "The X-Men face new threats as tensions between humans and mutants intensify.",
    "cast": "Voice cast from the original '90s animated series",
    "triv": "A perfect critic score, surpassing season 1 (99%); an Apocalypse arc spanning three timelines.",
    "link": "Continues the mutant saga toward the live-action era to come."
  },
  "brandnewday": {
    "synopsis": "A new chapter for Spider-Man, marked by the arrival of the Punisher and Hulk in his world.",
    "box": "TBD (not yet released)",
    "rt": "TBD (not yet released)",
    "triv": "Its trailer racked up 718.6M views in 24 hours, becoming the most-watched trailer launch of all time.",
    "link": "Follows the memory-wipe ending of No Way Home; pays off the Scorpion thread from Homecoming."
  },
  "yfns2": {
    "synopsis": "Peter Parker must handle the arrival of new faces, including Venom and Gwen Stacy, in his hero life.",
    "cast": "Hudson Thames (voice)",
    "triv": "Announced for fall 2026 at NYCC 2025; will introduce Venom and Gwen Stacy.",
    "link": "Continues the alternate animated Spidey saga."
  },
  "visionquest": {
    "synopsis": "Vision, rebuilt and haunted by his memories, must face Ultron to find out who he really is.",
    "triv": "Paul Bettany and James Spader return; Terry Matalas (Star Trek: Picard) is showrunner.",
    "link": "Concludes the WandaVision/Agatha trilogy; could lead into Secret Wars."
  },
  "doomsday": {
    "synopsis": "Earth's heroes unite against the ultimate threat of a collapsing multiverse under Doctor Doom.",
    "box": "TBD (not yet released)",
    "rt": "TBD (not yet released)",
    "triv": "Reported to be among the most expensive films ever produced (budget unconfirmed); its trailer (July 20, 2026) racked up 503M views in 24 hours, the 2nd-biggest trailer launch of all time.",
    "link": "The second-to-last chapter of the Multiverse Saga, setting up Avengers: Secret Wars (Dec. 2027)."
  }
};
