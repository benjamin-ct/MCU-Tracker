// ── CONSTANTS ──────────────────────────────────────────────
const ROMANS=['I','II','III','IV'];
const SEC=['Avant les Avengers','Saga de l\'Infini','Saga du Multivers','Phase 6 — vers Doomsday'];
const DOOM=new Date('2026-12-18T20:00:00');
const MONTHS=['jan.','fév.','mars','avr.','mai','juin','juil.','août','sep.','oct.','nov.','déc.'];
// Vérifié le 25/07/2026 : seuls ces 4 titres ne sont pas encore sortis.
// Wonder Man, Daredevil S2, Punisher: One Last Kill et X-Men '97 S2 (dans PLAT
// auparavant) sont en réalité déjà sortis — retirés d'ici après vérification.
const PLAT={
  brandnewday:{l:'Cinéma',c:'cin',date:'31 juil. 2026',l_en:'In Theaters',date_en:'Jul 31, 2026'},
  yfns2:{l:'Bientôt',c:'soon',date:'automne 2026',l_en:'Coming Soon',date_en:'Fall 2026'},
  visionquest:{l:'Bientôt',c:'soon',date:'14 oct. 2026',l_en:'Coming Soon',date_en:'Oct 14, 2026'},
  doomsday:{l:'Cinéma',c:'cin',date:'18 déc. 2026',l_en:'In Theaters',date_en:'Dec 18, 2026'}
};
// Un item présent dans PLAT = pas encore sorti = on ne peut pas le regarder maintenant.
// Cette fonction sert de source unique pour : exclure des totaux/soirées/countdown,
// désactiver sa case à cocher, masquer son lien Disney+, l'ignorer pour "prochain à voir" et "ce soir".
function isFuture(e){return!!PLAT[e.id];}

// ── Dates de sortie réelles (ordre de sortie ≠ ordre chronologique interne) ──
// Sert uniquement à trier/grouper l'onglet "Ordre de sortie" — n'affecte pas le
// marathon en ordre chronologique interne (E[] reste la source de vérité pour ça).
// Dates confirmées pour tout ce qui est déjà sorti ; approximatives (mais dans le
// bon ordre relatif) pour les titres 2025-2026 récents/annoncés sans date figée,
// cohérentes avec les dates déjà connues dans PLAT pour les 4 titres pas encore sortis.
const RELEASE_DATE={
  ironman1:'2008-05-02',hulk:'2008-06-13',ironman2:'2010-05-07',thor1:'2011-05-06',
  cap1:'2011-07-22',avengers1:'2012-05-04',ironman3:'2013-05-03',thor2:'2013-11-08',
  cap2:'2014-04-04',gotg1:'2014-08-01',avengers2:'2015-05-01',dd_s1:'2015-04-10',
  jj_s1:'2015-11-20',antman1:'2015-07-17',cap3:'2016-05-06',dd_s2:'2016-03-18',
  lc_s1:'2016-09-30',spiderman1:'2017-07-07',drstrange1:'2016-11-04',thor3:'2017-11-03',
  if_s1:'2017-03-17',defenders:'2017-08-18',pun_s1:'2017-11-17',avengers3:'2018-04-27',
  jj_s2:'2018-03-08',lc_s2:'2018-06-22',if_s2:'2018-09-07',dd_s3:'2018-10-19',
  antman2:'2018-07-06',pun_s2:'2019-01-18',jj_s3:'2019-06-14',avengers4:'2019-04-26',
  wandavision:'2021-01-15',falcon:'2021-03-19',loki1:'2021-06-09',whatif1:'2021-08-11',
  farfromhome:'2019-07-02',hawkeye:'2021-11-24',moonknight:'2022-03-30',eternals:'2021-11-05',
  msmarvel:'2022-06-08',nowayhome:'2021-12-17',drstrange2:'2022-05-06',thor4:'2022-07-08',
  shehulk:'2022-08-18',wakandaforever:'2022-11-11',secretinvasion:'2023-06-21',loki2:'2023-10-06',
  whatif2:'2023-12-22',quantumania:'2023-02-17',gotg3:'2023-05-05',marvels:'2023-11-10',
  echo:'2024-01-09',"xmen97-1":'2024-03-20',xmen1:'2000-07-14',x2:'2003-05-02',
  xlaststand:'2006-05-26',xorigins:'2009-05-01',xfirstclass:'2011-06-03',thewolverine:'2013-07-26',
  xdofp:'2014-05-23',dp1:'2016-02-12',xapocalypse:'2016-05-27',logan:'2017-03-03',
  dp2:'2018-05-18',darkphoenix:'2019-06-07',newmutants:'2020-08-28',deadpoolwolverine:'2024-07-26',
  blackwidow:'2021-07-09',blackpanther1:'2018-02-16',agatha:'2024-09-18',whatif3:'2024-12-22',
  yfns1:'2025-01-29',bravenewworld:'2025-02-14',daredevil1:'2025-03-04',thunderbolts:'2025-05-02',
  ironheart:'2025-06-24',fantasticfour:'2025-07-25',eyesofwakanda:'2025-08-06',marvelzombies:'2025-10-03',
  wonderman:'2025-09-10',daredevil2:'2026-03-01',punisher:'2026-02-01',"xmen97-2":'2026-04-01',
  brandnewday:'2026-07-31',yfns2:'2026-10-01',visionquest:'2026-10-14',doomsday:'2026-12-18',
  capmarvel:'2019-03-08',gotg2:'2017-05-05',
};
function releaseYear(id){const d=RELEASE_DATE[id];return d?parseInt(d.slice(0,4),10):null;}

// ── IMDb ──────────────────────────────────────────────────────────────────
// tt-id direct par entrée, vérifié individuellement (titre + année + type + casting
// recoupés) — volontairement PAS dérivé de l'API TMDB (voir js/modals.js) : ça
// marcherait pour tout le monde y compris sans clé TMDB configurée, ce qui est le
// but. Les entrées splitées en plusieurs saisons dans E (dd_s1/2/3, jj_s1/2/3,
// lc_s1/2, if_s1/2, pun_s1/2, loki1/2, whatif1/2/3, xmen97-1/2, yfns1/2) partagent
// le même tt-id — IMDb ne donne pas de fiche séparée par saison pour ces séries.
const IMDB_ID={
  cap1:"tt0458339",capmarvel:"tt4154664",ironman1:"tt0371746",ironman2:"tt1228705",
  hulk:"tt0800080",thor1:"tt0800369",avengers1:"tt0848228",thor2:"tt1981115",
  ironman3:"tt1300854",cap2:"tt1843866",gotg1:"tt2015381",gotg2:"tt3896198",
  avengers2:"tt2395427",dd_s1:"tt3322312",jj_s1:"tt2357547",antman1:"tt0478970",
  cap3:"tt3498820",dd_s2:"tt3322312",lc_s1:"tt3322314",blackwidow:"tt3480822",
  blackpanther1:"tt1825683",spiderman1:"tt2250912",drstrange1:"tt1211837",thor3:"tt3501632",
  if_s1:"tt3322310",defenders:"tt4230076",pun_s1:"tt5675620",avengers3:"tt4154756",
  jj_s2:"tt2357547",lc_s2:"tt3322314",if_s2:"tt3322310",dd_s3:"tt3322312",
  antman2:"tt5095030",pun_s2:"tt5675620",jj_s3:"tt2357547",avengers4:"tt4154796",
  wandavision:"tt9140560",falcon:"tt9208876",loki1:"tt9140554",whatif1:"tt10168312",
  farfromhome:"tt6320628",hawkeye:"tt10160804",moonknight:"tt10234724",eternals:"tt9032400",
  msmarvel:"tt10857164",nowayhome:"tt10872600",drstrange2:"tt9419884",thor4:"tt10648342",
  shehulk:"tt10857160",wakandaforever:"tt9114286",secretinvasion:"tt13157618",loki2:"tt9140554",
  whatif2:"tt10168312",quantumania:"tt10954600",gotg3:"tt6791350",marvels:"tt10676048",
  echo:"tt13966962","xmen97-1":"tt16026746",xmen1:"tt0120903",x2:"tt0290334",
  xlaststand:"tt0376994",xorigins:"tt0458525",xfirstclass:"tt1270798",thewolverine:"tt1430132",
  xdofp:"tt1877832",dp1:"tt1431045",xapocalypse:"tt3385516",logan:"tt3315342",
  dp2:"tt5463162",darkphoenix:"tt6565702",newmutants:"tt4682266",deadpoolwolverine:"tt6263850",
  agatha:"tt15571732",whatif3:"tt10168312",yfns1:"tt16027074",bravenewworld:"tt14513804",
  daredevil1:"tt18923754",thunderbolts:"tt20969586",ironheart:"tt13623126",fantasticfour:"tt10676052",
  eyesofwakanda:"tt13968252",marvelzombies:"tt16027014",wonderman:"tt21066182",daredevil2:"tt18923754",
  punisher:"tt36042156","xmen97-2":"tt16026746",brandnewday:"tt22084616",yfns2:"tt16027074",
  visionquest:"tt23112594",doomsday:"tt21357150",
};

// ── Casting étendu (recherche uniquement) ─────────────────────────────────
// INFO[id].cast n'affiche que 2-3 noms principaux dans la fiche (place limitée) — mais
// la recherche par acteur doit pouvoir trouver un rôle même secondaire ou une simple
// apparition. CAST_EXTRA contient donc un casting bien plus complet (souvent 10-30 noms
// selon l'ampleur du film/série, casting principal + secondaire), jamais rendu à
// l'écran, seulement consulté par matchSearch() (js/compute.js). Recherché/vérifié
// séparément par titre (IMDb/Wikipedia/TMDB), élargi le 27/07/2026.
const CAST_EXTRA={
  cap1:"Chris Evans, Hayley Atwell, Sebastian Stan, Tommy Lee Jones, Hugo Weaving, Dominic Cooper, Stanley Tucci, Toby Jones, Neal McDonough, Derek Luke, Kenneth Choi, JJ Feild, Bruno Ricci, Natalie Dormer, Samuel L. Jackson",
  capmarvel:"Brie Larson, Samuel L. Jackson, Ben Mendelsohn, Jude Law, Annette Bening, Djimon Hounsou, Lee Pace, Lashana Lynch, Gemma Chan, Clark Gregg, Rune Temte, Algenis Perez Soto, McKenna Grace",
  ironman1:"Robert Downey Jr., Gwyneth Paltrow, Terrence Howard, Jeff Bridges, Shaun Toub, Faran Tahir, Clark Gregg, Leslie Bibb, Bill Smitrovich, Sayed Badreya",
  ironman2:"Robert Downey Jr., Gwyneth Paltrow, Don Cheadle, Scarlett Johansson, Sam Rockwell, Mickey Rourke, Samuel L. Jackson, Clark Gregg, Garry Shandling, John Slattery, Jon Favreau, Paul Bettany, Leslie Bibb",
  hulk:"Edward Norton, Liv Tyler, Tim Roth, Tim Blake Nelson, William Hurt, Ty Burrell, Christina Cabot, Peter Mensah",
  thor1:"Chris Hemsworth, Natalie Portman, Tom Hiddleston, Anthony Hopkins, Stellan Skarsgård, Kat Dennings, Idris Elba, Ray Stevenson, Josh Dallas, Jaimie Alexander, Colm Feore, Rene Russo, Clark Gregg, Samuel L. Jackson, Tadanobu Asano",
  avengers1:"Robert Downey Jr., Chris Evans, Scarlett Johansson, Chris Hemsworth, Mark Ruffalo, Jeremy Renner, Tom Hiddleston, Samuel L. Jackson, Cobie Smulders, Clark Gregg, Stellan Skarsgård, Gwyneth Paltrow, Paul Bettany",
  thor2:"Chris Hemsworth, Natalie Portman, Tom Hiddleston, Anthony Hopkins, Stellan Skarsgård, Kat Dennings, Idris Elba, Christopher Eccleston, Adewale Akinnuoye-Agbaje, Zachary Levi, Jaimie Alexander, Rene Russo, Ray Stevenson",
  ironman3:"Robert Downey Jr., Gwyneth Paltrow, Don Cheadle, Guy Pearce, Rebecca Hall, Ben Kingsley, James Badge Dale, Stephanie Szostak, Jon Favreau, Ty Simpkins",
  cap2:"Chris Evans, Scarlett Johansson, Sebastian Stan, Anthony Mackie, Cobie Smulders, Frank Grillo, Emily VanCamp, Hayley Atwell, Robert Redford, Samuel L. Jackson, Toby Jones, Georges St-Pierre, Maximiliano Hernández",
  gotg1:"Chris Pratt, Zoe Saldaña, Dave Bautista, Vin Diesel, Bradley Cooper, Lee Pace, Michael Rooker, Karen Gillan, Djimon Hounsou, John C. Reilly, Glenn Close, Benicio del Toro",
  gotg2:"Chris Pratt, Zoe Saldaña, Dave Bautista, Vin Diesel, Bradley Cooper, Michael Rooker, Karen Gillan, Pom Klementieff, Elizabeth Debicki, Chris Sullivan, Sean Gunn, Kurt Russell, Sylvester Stallone, Sean Gunn",
  avengers2:"Robert Downey Jr., Chris Evans, Chris Hemsworth, Mark Ruffalo, Scarlett Johansson, Jeremy Renner, James Spader, Samuel L. Jackson, Cobie Smulders, Don Cheadle, Aaron Taylor-Johnson, Elizabeth Olsen, Paul Bettany, Anthony Mackie, Hayley Atwell, Idris Elba, Stellan Skarsgård, Thomas Kretschmann, Linda Cardellini, Andy Serkis",
  dd_s1:"Charlie Cox, Vincent D'Onofrio, Deborah Ann Woll, Elden Henson, Toby Leonard Moore, Vondie Curtis-Hall, Bob Gunton, Ayelet Zurer, Rosario Dawson, Scott Glenn",
  jj_s1:"Krysten Ritter, David Tennant, Rachael Taylor, Mike Colter, Wil Traval, Erin Moriarty, Eka Darville, Carrie-Anne Moss",
  antman1:"Paul Rudd, Michael Douglas, Evangeline Lilly, Corey Stoll, Bobby Cannavale, Michael Peña, Tip \"T.I.\" Harris, Wood Harris, Judy Greer, David Dastmalchian, Abby Ryder Fortson, Anthony Mackie",
  cap3:"Chris Evans, Robert Downey Jr., Scarlett Johansson, Sebastian Stan, Anthony Mackie, Don Cheadle, Jeremy Renner, Chadwick Boseman, Paul Bettany, Elizabeth Olsen, Paul Rudd, Emily VanCamp, Tom Holland, Daniel Brühl, Frank Grillo, William Hurt, Martin Freeman",
  dd_s2:"Charlie Cox, Jon Bernthal, Élodie Yung, Deborah Ann Woll, Elden Henson, Rosario Dawson, Vincent D'Onofrio, Stephen Rider, Scott Glenn",
  lc_s1:"Mike Colter, Mahershala Ali, Simone Missick, Theo Rossi, Erik LaRay Harvey, Alfre Woodard, Rosario Dawson, Frank Whaley, Frankie Faison",
  blackwidow:"Scarlett Johansson, Florence Pugh, David Harbour, O-T Fagbenle, Olga Kurylenko, William Hurt, Ray Winstone, Rachel Weisz, Ever Anderson, Violet McGraw",
  blackpanther1:"Chadwick Boseman, Michael B. Jordan, Lupita Nyong'o, Danai Gurira, Martin Freeman, Daniel Kaluuya, Letitia Wright, Winston Duke, Angela Bassett, Forest Whitaker, Andy Serkis, Sterling K. Brown, John Kani, Florence Kasumba",
  spiderman1:"Tom Holland, Michael Keaton, Robert Downey Jr., Marisa Tomei, Jon Favreau, Zendaya, Jacob Batalon, Laura Harrier, Tony Revolori, Donald Glover, Bokeem Woodbine, Martin Starr, Hannibal Buress, Gwyneth Paltrow, Kenneth Choi",
  drstrange1:"Benedict Cumberbatch, Tilda Swinton, Chiwetel Ejiofor, Rachel McAdams, Benedict Wong, Michael Stuhlbarg, Benjamin Bratt, Scott Adkins, Mads Mikkelsen",
  thor3:"Chris Hemsworth, Tom Hiddleston, Cate Blanchett, Idris Elba, Jeff Goldblum, Tessa Thompson, Karl Urban, Mark Ruffalo, Anthony Hopkins, Rachel House, Taika Waititi, Benedict Cumberbatch",
  if_s1:"Finn Jones, Jessica Henwick, Tom Pelphrey, Jessica Stroup, Ramón Rodríguez, Sacha Dhawan, Rosario Dawson, David Wenham",
  defenders:"Charlie Cox, Krysten Ritter, Mike Colter, Finn Jones, Eka Darville, Elden Henson, Jessica Henwick, Simone Missick, Ramón Rodríguez, Rachael Taylor, Deborah Ann Woll, Élodie Yung, Rosario Dawson, Scott Glenn, Sigourney Weaver",
  pun_s1:"Jon Bernthal, Ebon Moss-Bachrach, Amber Rose Revah, Deborah Ann Woll, Daniel Webber, Jason R. Moore, Michael Nathanson, Ben Barnes, Paul Schulze, Jaime Ray Newman",
  avengers3:"Robert Downey Jr., Chris Hemsworth, Josh Brolin, Chris Evans, Scarlett Johansson, Mark Ruffalo, Chadwick Boseman, Benedict Cumberbatch, Tom Holland, Zoe Saldaña, Chris Pratt, Paul Bettany, Elizabeth Olsen, Dave Bautista, Anthony Mackie, Sebastian Stan, Danai Gurira, Letitia Wright, Don Cheadle, Peter Dinklage, Karen Gillan, Pom Klementieff, Vin Diesel, Bradley Cooper, Gwyneth Paltrow, Benedict Wong, Tom Vaughan-Lawlor, William Hurt",
  jj_s2:"Krysten Ritter, Rachael Taylor, Eka Darville, J.R. Ramirez, Terry Chen, Leah Gibson, Carrie-Anne Moss, Janet McTeer",
  lc_s2:"Mike Colter, Simone Missick, Theo Rossi, Alfre Woodard, Mustafa Shakir, Gabrielle Dennis, Rosario Dawson",
  if_s2:"Finn Jones, Jessica Henwick, Tom Pelphrey, Jessica Stroup, Sacha Dhawan, Simone Missick, Alice Eve",
  dd_s3:"Charlie Cox, Vincent D'Onofrio, Deborah Ann Woll, Elden Henson, Joanne Whalley, Jay Ali, Wilson Bethel, Rosario Dawson",
  antman2:"Paul Rudd, Evangeline Lilly, Michael Douglas, Michelle Pfeiffer, Walton Goggins, Hannah John-Kamen, Laurence Fishburne, Michael Peña, Judy Greer, Bobby Cannavale, Abby Ryder Fortson, Randall Park",
  pun_s2:"Jon Bernthal, Ben Barnes, Amber Rose Revah, Jason R. Moore, Josh Stewart, Floriana Lima, Giorgia Whigham, Deborah Ann Woll",
  jj_s3:"Krysten Ritter, Rachael Taylor, Eka Darville, Benjamin Walker, Sarita Choudhury, Jeremy Bobb, Tiffany Mack, Carrie-Anne Moss",
  avengers4:"Robert Downey Jr., Chris Evans, Scarlett Johansson, Chris Hemsworth, Mark Ruffalo, Jeremy Renner, Don Cheadle, Paul Rudd, Brie Larson, Karen Gillan, Danai Gurira, Bradley Cooper, Gwyneth Paltrow, Josh Brolin, Chadwick Boseman, Tom Holland, Zoe Saldaña, Benedict Cumberbatch, Elizabeth Olsen, Anthony Mackie, Sebastian Stan, Benedict Wong, Letitia Wright, Tessa Thompson, Evangeline Lilly, Michael Douglas, Michelle Pfeiffer, Tilda Swinton, Frank Grillo, Natalie Portman",
  wandavision:"Elizabeth Olsen, Paul Bettany, Debra Jo Rupp, Fred Melamed, Kathryn Hahn, Teyonah Parris, Randall Park, Kat Dennings, Evan Peters, Josh Stamberg, David Payton, David Lengel",
  falcon:"Anthony Mackie, Sebastian Stan, Wyatt Russell, Erin Kellyman, Danny Ramirez, Georges St-Pierre, Adepero Oduye, Don Cheadle, Daniel Brühl, Emily VanCamp, Florence Kasumba, Julia Louis-Dreyfus, Carl Lumbly",
  loki1:"Tom Hiddleston, Owen Wilson, Sophia Di Martino, Gugu Mbatha-Raw, Wunmi Mosaku, Eugene Cordero, Tara Strong, Sasha Lane, Jack Veal, DeObia Oparei, Richard E. Grant, Jonathan Majors",
  whatif1:"Jeffrey Wright, Hayley Atwell, Josh Brolin, Dominic Cooper, David Dastmalchian, Michael Douglas, Karen Gillan, Jeff Goldblum, Frank Grillo, Sean Gunn, Chris Hemsworth, Tom Hiddleston, Djimon Hounsou, Samuel L. Jackson, Toby Jones, Michael B. Jordan, Neal McDonough, Natalie Portman, Jeremy Renner, Michael Rooker, Paul Rudd, Mark Ruffalo, Sebastian Stan, Chadwick Boseman, Benedict Cumberbatch",
  farfromhome:"Tom Holland, Samuel L. Jackson, Jake Gyllenhaal, Zendaya, Marisa Tomei, Jon Favreau, Jacob Batalon, Cobie Smulders, Martin Starr, Tony Revolori, J.B. Smoove, Numan Acar, Remy Hii, Angourie Rice",
  hawkeye:"Jeremy Renner, Hailee Steinfeld, Vera Farmiga, Tony Dalton, Fra Fee, Brian d'Arcy James, Aleks Paunovic, Piotr Adamczyk, Linda Cardellini, Alaqua Cox, Zahn McClarnon, Florence Pugh, Vincent D'Onofrio",
  moonknight:"Oscar Isaac, May Calamawy, Ethan Hawke, F. Murray Abraham, Karim El Hakim, Antonia Salib, Gaspard Ulliel, Khalid Abdalla, David Ganly",
  eternals:"Gemma Chan, Richard Madden, Angelina Jolie, Kumail Nanjiani, Lia McHugh, Brian Tyree Henry, Lauren Ridloff, Barry Keoghan, Don Lee, Kit Harington, Salma Hayek, Bill Skarsgård, Harish Patel, Haaz Sleiman, Harry Styles",
  msmarvel:"Iman Vellani, Matt Lintz, Yasmeen Fletcher, Zenobia Shroff, Mohan Kapur, Saagar Shaikh, Rish Shah, Arian Moayed, Nimra Bucha, Farhan Akhtar, Aramis Knight, Laurel Marsden, Travina Springer",
  nowayhome:"Tom Holland, Zendaya, Benedict Cumberbatch, Jacob Batalon, Jon Favreau, Jamie Foxx, Willem Dafoe, Alfred Molina, Benedict Wong, Tony Revolori, Marisa Tomei, Andrew Garfield, Tobey Maguire, Rhys Ifans, J.K. Simmons",
  drstrange2:"Benedict Cumberbatch, Elizabeth Olsen, Xochitl Gomez, Chiwetel Ejiofor, Benedict Wong, Michael Stuhlbarg, Rachel McAdams, Hayley Atwell, Anson Mount, Lashana Lynch, John Krasinski, Patrick Stewart",
  thor4:"Chris Hemsworth, Natalie Portman, Christian Bale, Tessa Thompson, Taika Waititi, Russell Crowe, Jaimie Alexander, Idris Elba, Chris Pratt, Dave Bautista, Karen Gillan, Pom Klementieff, Sean Gunn, Vin Diesel, Bradley Cooper, Kat Dennings",
  shehulk:"Tatiana Maslany, Mark Ruffalo, Tim Roth, Jameela Jamil, Ginger Gonzaga, Josh Segarra, Renée Elise Goldsberry, Jon Bass, Benedict Wong, Charlie Cox, Griffin Matthews",
  wakandaforever:"Letitia Wright, Lupita Nyong'o, Danai Gurira, Winston Duke, Florence Kasumba, Dominique Thorne, Michaela Coel, Mabel Cadena, Tenoch Huerta, Martin Freeman, Julia Louis-Dreyfus, Angela Bassett",
  secretinvasion:"Samuel L. Jackson, Ben Mendelsohn, Kingsley Ben-Adir, Olivia Colman, Emilia Clarke, Don Cheadle, Cobie Smulders, Martin Freeman, Killian Scott, Samuel Adewunmi, Dermot Mulroney, Richard Dormer, Charlayne Woodard, Christopher McDonald",
  loki2:"Tom Hiddleston, Sophia Di Martino, Owen Wilson, Wunmi Mosaku, Eugene Cordero, Rafael Casal, Kate Dickie, Liz Carr, Ke Huy Quan, Gugu Mbatha-Raw, Jonathan Majors",
  whatif2:"Jeffrey Wright, Hayley Atwell, Chadwick Boseman, Samuel L. Jackson, Jeff Goldblum, Karen Gillan, Michael Rooker, Sean Gunn, Djimon Hounsou, Natalie Portman, Chris Hemsworth, Tom Hiddleston, Toby Jones, Paul Rudd, Sebastian Stan, Neal McDonough, Michael B. Jordan, Dominique Thorne",
  quantumania:"Paul Rudd, Evangeline Lilly, Jonathan Majors, Michael Douglas, Michelle Pfeiffer, Kathryn Newton, Corey Stoll, David Dastmalchian, Katy O'Brian, William Jackson Harper, Bill Murray",
  gotg3:"Chris Pratt, Zoe Saldaña, Dave Bautista, Karen Gillan, Pom Klementieff, Vin Diesel, Bradley Cooper, Will Poulter, Sean Gunn, Chukwudi Iwuji, Linda Cardellini, Nathan Fillion, Sylvester Stallone, Maria Bakalova",
  marvels:"Brie Larson, Teyonah Parris, Iman Vellani, Zawe Ashton, Park Seo-joon, Samuel L. Jackson, Zenobia Shroff, Mohan Kapur, Saagar Shaikh",
  echo:"Alaqua Cox, Vincent D'Onofrio, Chaske Spencer, Zahn McClarnon, Tantoo Cardinal, Graham Greene, Devery Jacobs, Cody Lightning, Charlie Cox",
  "xmen97-1":"Ray Chase, Jennifer Hale, Alison Sealy-Smith, Cal Dodd, Lenore Zann, George Buza, J.P. Karliak, Holly Chou, A.J. LoCascio, Isaac Robinson-Smith, Matthew Waterson, Ross Marquand",
  xmen1:"Hugh Jackman, Patrick Stewart, Ian McKellen, Halle Berry, Famke Janssen, James Marsden, Anna Paquin, Rebecca Romijn, Tyler Mane, Ray Park, Bruce Davison",
  x2:"Hugh Jackman, Patrick Stewart, Ian McKellen, Halle Berry, Famke Janssen, James Marsden, Anna Paquin, Rebecca Romijn, Brian Cox, Alan Cumming, Shawn Ashmore, Aaron Stanford, Kelly Hu",
  xlaststand:"Hugh Jackman, Halle Berry, Famke Janssen, Ian McKellen, Patrick Stewart, Anna Paquin, Kelsey Grammer, James Marsden, Rebecca Romijn, Shawn Ashmore, Aaron Stanford, Vinnie Jones, Ben Foster, Ellen Page, Dania Ramirez",
  xorigins:"Hugh Jackman, Liev Schreiber, Ryan Reynolds, Danny Huston, Will.i.am, Lynn Collins, Kevin Durand, Taylor Kitsch, Daniel Henney, Dominic Monaghan",
  xfirstclass:"James McAvoy, Michael Fassbender, Jennifer Lawrence, Kevin Bacon, Rose Byrne, January Jones, Oliver Platt, Nicholas Hoult, Lucas Till, Zoë Kravitz, Caleb Landry Jones, Edi Gathegi",
  thewolverine:"Hugh Jackman, Tao Okamoto, Rila Fukushima, Famke Janssen, Svetlana Khodchenkova, Hiroyuki Sanada, Will Yun Lee, Brian Tee, Hal Yamanouchi",
  xdofp:"Hugh Jackman, James McAvoy, Michael Fassbender, Jennifer Lawrence, Halle Berry, Anna Paquin, Ellen Page, Peter Dinklage, Ian McKellen, Patrick Stewart, Shawn Ashmore, Omar Sy, Evan Peters, Josh Helman, Daniel Cudmore, Fan Bingbing",
  dp1:"Ryan Reynolds, Morena Baccarin, Ed Skrein, T.J. Miller, Gina Carano, Brianna Hildebrand, Leslie Uggams, Stefan Kapičić, Karan Soni",
  xapocalypse:"James McAvoy, Michael Fassbender, Jennifer Lawrence, Oscar Isaac, Nicholas Hoult, Rose Byrne, Tye Sheridan, Sophie Turner, Olivia Munn, Lucas Till, Evan Peters, Josh Helman, Kodi Smit-McPhee, Ben Hardy, Alexandra Shipp",
  logan:"Hugh Jackman, Patrick Stewart, Dafne Keen, Richard E. Grant, Boyd Holbrook, Stephen Merchant, Elizabeth Rodriguez, Eriq La Salle, Elise Neal",
  dp2:"Ryan Reynolds, Josh Brolin, Morena Baccarin, Julian Dennison, Zazie Beetz, T.J. Miller, Brianna Hildebrand, Jack Kesy, Terry Crews, Bill Skarsgård, Rob Delaney, Shiori Kutsuna, Leslie Uggams, Karan Soni, Eddie Marsan, Lewis Tan, Stefan Kapičić",
  darkphoenix:"Sophie Turner, James McAvoy, Michael Fassbender, Jessica Chastain, Nicholas Hoult, Tye Sheridan, Alexandra Shipp, Evan Peters, Kodi Smit-McPhee, Jennifer Lawrence",
  newmutants:"Maisie Williams, Anya Taylor-Joy, Charlie Heaton, Henry Zaga, Blu Hunt, Alice Braga",
  deadpoolwolverine:"Ryan Reynolds, Hugh Jackman, Emma Corrin, Morena Baccarin, Rob Delaney, Leslie Uggams, Aaron Stanford, Matthew Macfadyen, Karan Soni, Brianna Hildebrand, Stefan Kapičić, Shiori Kutsuna, Lewis Tan",
  agatha:"Kathryn Hahn, Joe Locke, Aubrey Plaza, Sasheer Zamata, Ali Ahn, Debra Jo Rupp, Patti LuPone, Maria Dizzia, Okwui Okpokwasili, Evan Peters",
  whatif3:"Jeffrey Wright, Hayley Atwell, Chadwick Boseman, Samuel L. Jackson, Jeff Goldblum, Karen Gillan, Michael Rooker, Sean Gunn, Djimon Hounsou, Natalie Portman, Chris Hemsworth, Tom Hiddleston, Toby Jones, Paul Rudd, Sebastian Stan, Neal McDonough, Michael B. Jordan, Dominique Thorne",
  yfns1:"Hudson Thames, Grace Song, Kari Wahlgren, Eugene Byrd, Zeno Robinson, Colman Domingo, Hugh Dancy, Charlie Cox",
  bravenewworld:"Anthony Mackie, Harrison Ford, Danny Ramirez, Shira Haas, Carl Lumbly, Xosha Roquemore, Giancarlo Esposito, Liv Tyler, Tim Blake Nelson",
  daredevil1:"Charlie Cox, Vincent D'Onofrio, Margarita Levieva, Deborah Ann Woll, Elden Henson, Wilson Bethel, Zabryna Guevara, Nikki M. James, Genneya Walton, Arty Froushan, Clark Johnson, Michael Gandolfini, Ayelet Zurer, Kamar de los Reyes, Jon Bernthal, Tony Dalton",
  thunderbolts:"Florence Pugh, Sebastian Stan, Wyatt Russell, David Harbour, Hannah John-Kamen, Olga Kurylenko, Lewis Pullman, Julia Louis-Dreyfus, Geraldine Viswanathan, Chris Bauer, Wendell Pierce",
  ironheart:"Dominique Thorne, Anthony Ramos, Alden Ehrenreich, Lyric Ross, Manny Montana, Regan Aliyah, Zoe Terakes, Shakira Barrera, Anji White, Eric André, Jim Rash",
  fantasticfour:"Pedro Pascal, Vanessa Kirby, Joseph Quinn, Ebon Moss-Bachrach, Julia Garner, Paul Walter Hauser, John Malkovich, Natasha Lyonne, Sarah Niles, Ralph Ineson",
  eyesofwakanda:"Winnie Harlow, Cress Williams, Patricia Belcher, Steve Toussaint, Larry Herron, Adam Gold, Lynn Whitfield, Jacques Colimon, Jona Xiao, Isaac Robinson-Smith, Gary Anthony Williams, Zeke Alton, Anika Noni Rose",
  marvelzombies:"Iman Vellani, Hailee Steinfeld, Dominique Thorne, Florence Pugh, David Harbour, Simu Liu, Randall Park, Awkwafina, Kerry Condon, F. Murray Abraham, Hudson Thames",
  wonderman:"Yahya Abdul-Mateen II, Ben Kingsley, Demetrius Grosse, Lauren Glazier, Byron Bowers, Arian Moayed, X Mayo, Zlatko Burić, Olivia Thirlby",
  daredevil2:"Charlie Cox, Vincent D'Onofrio, Deborah Ann Woll, Margarita Levieva, Matthew Lillard, Tony Dalton, Michael Gandolfini, Nikki M. James, Arty Froushan, Zabryna Guevara, Clark Johnson, Ayelet Zurer, Wilson Bethel, Lili Taylor, Elden Henson, Toby Leonard Moore, Krysten Ritter",
  punisher:"Jon Bernthal, Deborah Ann Woll, Jason R. Moore, Judith Light",
  "xmen97-2":"Ross Marquand, Matthew Waterson, Ray Chase, Jennifer Hale, Alison Sealy-Smith, Cal Dodd, Lenore Zann, George Buza, Zehra Fazal, Gates McFadden",
  brandnewday:"Tom Holland, Zendaya, Sadie Sink, Jacob Batalon, Jon Bernthal, Tramell Tillman, Michael Mando, Mark Ruffalo",
  yfns2:"Hudson Thames, Grace Song, Kari Wahlgren, Eugene Byrd, Zeno Robinson, Colman Domingo, Hugh Dancy",
  visionquest:"Paul Bettany, James Spader, Emily Hampshire, Diane Morgan, Todd Stashwick, Ruaridh Mollica, T'Nia Miller, Orla Brady, James D'Arcy, Faran Tahir, Mary McDonnell",
  doomsday:"Robert Downey Jr., Chris Hemsworth, Pedro Pascal, Paul Rudd, Anthony Mackie, Florence Pugh, Vanessa Kirby, Ebon Moss-Bachrach, Wyatt Russell, Channing Tatum, Simu Liu, Ian McKellen, Tom Hiddleston, James Marsden, Patrick Stewart, Joseph Quinn, Sebastian Stan, David Harbour, Letitia Wright, Lewis Pullman, Kelsey Grammer, Kathryn Newton, Danny Ramirez, Winston Duke, Alan Cumming, Hannah John-Kamen, Rebecca Romijn, Mabel Cadena, Tenoch Huerta",
};

// ── Bandes-annonces en français ───────────────────────────────────────────
// INFO[id].yt (ci-dessus) contient la bande-annonce anglaise, fixe quelle que soit
// la langue. TRAILER_FR fournit l'équivalent VF quand il existe (chaîne officielle
// Marvel/Netflix/Disney+ France identifiée dans le titre de la vidéo) ; appliqué à
// INFO[id].yt par applyLangToContent() (js/i18n.js) quand lang==='fr'. Repli
// silencieux sur la bande-annonce anglaise pour les 4 titres sans VF trouvée
// (punisher, brandnewday, yfns2, visionquest — inédits/pas encore promus en France).
const TRAILER_FR={
  cap1:"https://www.youtube.com/watch?v=hgS9vkXtas0",capmarvel:"https://www.youtube.com/watch?v=rndLWLmwgeA",
  ironman1:"https://www.youtube.com/watch?v=rDCTb9Gp2qk",ironman2:"https://www.youtube.com/watch?v=SQnuLDnhB7g",
  hulk:"https://www.youtube.com/watch?v=6z8Nmm5LX4c",thor1:"https://www.youtube.com/watch?v=pzT3yeV9lT4",
  avengers1:"https://www.youtube.com/watch?v=b-kTeJhHOhc",thor2:"https://www.youtube.com/watch?v=JXmOod9zBME",
  ironman3:"https://www.youtube.com/watch?v=wnEr73Rq3Ac",cap2:"https://www.youtube.com/watch?v=6mQWmUwxZjI",
  gotg1:"https://www.youtube.com/watch?v=HbB1LC_QyK0",gotg2:"https://www.youtube.com/watch?v=qe6EjVKba9Q",
  avengers2:"https://www.youtube.com/watch?v=CjPh8dyUdC8",dd_s1:"https://www.youtube.com/watch?v=-g8fSUNeYIE",
  jj_s1:"https://www.youtube.com/watch?v=gO2QqWyBTas",antman1:"https://www.youtube.com/watch?v=_mWjqYXA59E",
  cap3:"https://www.youtube.com/watch?v=fuIIGDjEj8Q",dd_s2:"https://www.youtube.com/watch?v=RB1C1DW8k0I",
  lc_s1:"https://www.youtube.com/watch?v=Yq5vJYBEw54",blackwidow:"https://www.youtube.com/watch?v=5XXPCHLzbTU",
  blackpanther1:"https://www.youtube.com/watch?v=lyKngqfmqW4",spiderman1:"https://www.youtube.com/watch?v=Y8ErdqD5YPc",
  drstrange1:"https://www.youtube.com/watch?v=JaRIhAyNkrY",thor3:"https://www.youtube.com/watch?v=sd_67Nql34k",
  if_s1:"https://www.youtube.com/watch?v=tNkoUqhCpt8",defenders:"https://www.youtube.com/watch?v=jNjxGT7NkYE",
  pun_s1:"https://www.youtube.com/watch?v=bwRv7RnmRHM",avengers3:"https://www.youtube.com/watch?v=eIWs2IUr3Vs",
  jj_s2:"https://www.youtube.com/watch?v=lJeEd-l9w1w",lc_s2:"https://www.youtube.com/watch?v=ToJ_9WCrOAg",
  if_s2:"https://www.youtube.com/watch?v=6Hg52Pa-JkA",dd_s3:"https://www.youtube.com/watch?v=25XXlWbN9A4",
  antman2:"https://www.youtube.com/watch?v=5IJxUX75p_w",pun_s2:"https://www.youtube.com/watch?v=XRLmxwpSN9s",
  jj_s3:"https://www.youtube.com/watch?v=r_6hTOMBXQo",avengers4:"https://www.youtube.com/watch?v=wV-Q0o2OQjQ",
  wandavision:"https://www.youtube.com/watch?v=bQCvUqWqivY",falcon:"https://www.youtube.com/watch?v=l3VMNZH61UU",
  loki1:"https://www.youtube.com/watch?v=iYpS70gCsvw",whatif1:"https://www.youtube.com/watch?v=NDfaxdYx34Y",
  farfromhome:"https://www.youtube.com/watch?v=SFoCPkEfHEM",hawkeye:"https://www.youtube.com/watch?v=P-6jVdKj_dk",
  moonknight:"https://www.youtube.com/watch?v=BxcyFgJSpjQ",eternals:"https://www.youtube.com/watch?v=nHcubNwuKFA",
  msmarvel:"https://www.youtube.com/watch?v=JTb4NIzxtYE",nowayhome:"https://www.youtube.com/watch?v=KR-eyxSuOgk",
  drstrange2:"https://www.youtube.com/watch?v=J7u1bDo_4sk",thor4:"https://www.youtube.com/watch?v=wyxbc_wQjaI",
  shehulk:"https://www.youtube.com/watch?v=YSbqVNImGS0",wakandaforever:"https://www.youtube.com/watch?v=DlGIWM_e9vg",
  secretinvasion:"https://www.youtube.com/watch?v=F8nKPJ-JPac",loki2:"https://www.youtube.com/watch?v=3zXE2MtUSUc",
  whatif2:"https://www.youtube.com/watch?v=5Xy95FAyMVM",quantumania:"https://www.youtube.com/watch?v=Q0uaHT1wsTQ",
  gotg3:"https://www.youtube.com/watch?v=WxA-eZ72FsQ",marvels:"https://www.youtube.com/watch?v=9z9_bfhpLzU",
  echo:"https://www.youtube.com/watch?v=aZtwmbk1HkA","xmen97-1":"https://www.youtube.com/watch?v=EBdJ06mVPmM",
  xmen1:"https://www.youtube.com/watch?v=QLtF7ZmXfjw",x2:"https://www.youtube.com/watch?v=UfbTJ1Mgxdg",
  xlaststand:"https://www.youtube.com/watch?v=KMZ1FWENm3w",xorigins:"https://www.youtube.com/watch?v=ZmPlmK7vaEY",
  xfirstclass:"https://www.youtube.com/watch?v=XzO78txLmBc",thewolverine:"https://www.youtube.com/watch?v=WKrknCZIj2Q",
  xdofp:"https://www.youtube.com/watch?v=oozLmcK-Vis",dp1:"https://www.youtube.com/watch?v=tgzKrpDE4qM",
  xapocalypse:"https://www.youtube.com/watch?v=YYpr8RubbyE",logan:"https://www.youtube.com/watch?v=maJ6yBe0Lkc",
  dp2:"https://www.youtube.com/watch?v=mkomQpUgMLU",darkphoenix:"https://www.youtube.com/watch?v=jyTgXu5bZf4",
  newmutants:"https://www.youtube.com/watch?v=6ZdL4M7JRCY",deadpoolwolverine:"https://www.youtube.com/watch?v=2t9-VpzzNmY",
  agatha:"https://www.youtube.com/watch?v=cDdg3njmV3E",whatif3:"https://www.youtube.com/watch?v=_oRJFwPC_gE",
  yfns1:"https://www.youtube.com/watch?v=llWZG7GwzZw",bravenewworld:"https://www.youtube.com/watch?v=Hh9fV_5iP2Q",
  daredevil1:"https://www.youtube.com/watch?v=DF4h9waAccc",thunderbolts:"https://www.youtube.com/watch?v=cYHyGlHIOOY",
  ironheart:"https://www.youtube.com/watch?v=wJqMZEIcvx4",fantasticfour:"https://www.youtube.com/watch?v=sdPlkUZE98I",
  eyesofwakanda:"https://www.youtube.com/watch?v=3ch9VVrLqG0",marvelzombies:"https://www.youtube.com/watch?v=Txa-LEY8i3E",
  wonderman:"https://www.youtube.com/watch?v=amvG2BUfEGU",daredevil2:"https://www.youtube.com/watch?v=TzKZsEHiCHU",
  "xmen97-2":"https://www.youtube.com/watch?v=Iq301MdVaYg",doomsday:"https://www.youtube.com/watch?v=g9NAGSPpfjs",
};

// ── Transformation générique FR→EN pour budget/box/rt ─────────────────────
// La plupart des valeurs budget/box/rt ne contiennent que des chiffres et deux
// tournures françaises reconnaissables ("Md$"/"M$" et "critique"/"public"/"pas
// encore sorti") : on les transforme automatiquement plutôt que de retaper les 90
// entrées à la main. Les quelques cas avec du texte français additionnel (ex.
// "au total", "épisode") ont un override explicite dans INFO_EN (data-en.js).
function frMoney(s){
  if(!s)return s;
  if(/pas encore sorti/.test(s))return s.replace('pas encore sorti','not yet released');
  return s.replace(/(~?)(\d[\d.,]*(?:-\d[\d.,]*)?)\s?Md\$/g,(_,tilde,num)=>`${tilde}$${num}B`)
          .replace(/(~?)(\d[\d.,]*(?:-\d[\d.,]*)?)\s?M\$/g,(_,tilde,num)=>`${tilde}$${num}M`);
}
function frRT(s){
  if(!s)return s;
  if(/pas encore sorti/.test(s))return s.replace('pas encore sorti','not yet released');
  return s.replace(/\bcritique\b/g,'critics').replace(/\bpublic\b/g,'audience');
}

// Infos complémentaires (synopsis, réalisation, casting) pour la modale "i"
const INFO={
  cap1:{synopsis:"Un jeune homme chétif devient un supersoldat pour combattre HYDRA pendant la Seconde Guerre mondiale.",director:"Joe Johnston",cast:"Chris Evans, Hayley Atwell, Sebastian Stan",pc:"Oui — Nick Fury recrute Steve pour les Avengers.",budget:"~140M$",box:"~370M$",rt:"80% critique / 74% public",triv:"Chris Evans a d'abord refusé le rôle plusieurs fois ; le «Steve chétif» a été fait via doublure + CGI.",link:"Introduit le Tesseract, Crâne Rouge et Bucky ; Steve gelé le fait resurgir dans le présent.",yt:"https://www.youtube.com/watch?v=JerVrbLldXw",tmdb:{id:1771,type:"movie"},poster:"/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg"},
  capmarvel:{synopsis:"Une pilote de l'US Air Force devenue Kree redécouvre son passé humain et son lien avec les Skrulls.",director:"Anna Boden, Ryan Fleck",cast:"Brie Larson, Samuel L. Jackson, Jude Law",pc:"Deux scènes — Carol rejoint les Avengers après le Snap ; Goose recrache le Tesseract.",budget:"~150-175M$",box:"~1.128Md$",rt:"79% critique / 45% public",triv:"Situé en 1995 avec un Samuel L. Jackson rajeuni numériquement ; explique la perte de son œil.",link:"Le bipeur de Fury à la fin d'Infinity War mène directement à ce film puis à Endgame.",yt:"https://www.youtube.com/watch?v=Z1BCujX3pw8",tmdb:{id:299537,type:"movie"},poster:"/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg"},
  ironman1:{synopsis:"Un industriel de l'armement, retenu captif, construit une armure motorisée pour s'échapper et devenir un héros.",director:"Jon Favreau",cast:"Robert Downey Jr., Gwyneth Paltrow, Jeff Bridges",pc:"Oui — Nick Fury évoque l'«Initiative Avengers».",budget:"~140M$",box:"~585M$",rt:"94% critique / 91% public",triv:"Le casting de Robert Downey Jr. était un pari du studio ; Terrence Howard jouait Rhodey (remplacé par Don Cheadle ensuite).",link:"Lance tout le MCU ; la scène post-crédit de Fury prépare Avengers.",yt:"https://www.youtube.com/watch?v=8ugaeA-nMTc",tmdb:{id:1726,type:"movie"},poster:"/78lPtwv72eTNqFW9COBYI0dWDJa.jpg"},
  ironman2:{synopsis:"Tony Stark doit affronter les conséquences de son identité publique et un nouvel ennemi armé de fouets électriques.",director:"Jon Favreau",cast:"Robert Downey Jr., Gwyneth Paltrow, Mickey Rourke",pc:"Oui — le marteau de Thor découvert dans un cratère au Nouveau-Mexique.",budget:"~200M$",box:"~623M$",rt:"71% critique / 71% public",triv:"Introduit Black Widow et War Machine (Don Cheadle) ; Sam Rockwell joue Justin Hammer.",link:"Développe le SHIELD et prépare l'assemblage des Avengers.",yt:"https://www.youtube.com/watch?v=Cp2b1Cm3uw0",tmdb:{id:10138,type:"movie"}},
  hulk:{synopsis:"Bruce Banner, en fuite, cherche un remède à sa condition tout en évitant l'armée américaine.",director:"Louis Leterrier",cast:"Edward Norton, Liv Tyler, Tim Roth",pc:"Oui — Tony Stark propose son aide au Général Ross.",budget:"~150M$",box:"~265M$",rt:"67% critique / 70% public",triv:"Edward Norton jouait Banner, remplacé par Mark Ruffalo dès Avengers.",link:"Le fil Samuel Sterns/«Leader» ne sera payé que 17 ans plus tard dans Captain America: Brave New World.",yt:"https://www.youtube.com/watch?v=XLprSwvVBBc",tmdb:{id:1724,type:"movie"},poster:"/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg"},
  thor1:{synopsis:"Banni sur Terre par son père, le dieu du tonnerre doit apprendre l'humilité pour retrouver ses pouvoirs.",director:"Kenneth Branagh",cast:"Chris Hemsworth, Natalie Portman, Tom Hiddleston",pc:"Oui — Loki manipule Selvig, le Tesseract est montré.",budget:"~150M$",box:"~449M$",rt:"77% critique / 76% public",triv:"Kenneth Branagh réalise ; Chris Hemsworth a obtenu le rôle après que son frère Liam ait auditionné en premier.",link:"Introduit Loki et le Tesseract, préparant Avengers.",yt:"https://www.youtube.com/watch?v=JOddp-nlNvQ",tmdb:{id:10195,type:"movie"},poster:"/prSfAi1xGrhLQNxVSUFh61xQ4Qy.jpg"},
  avengers1:{synopsis:"Nick Fury réunit une équipe de héros pour contrer la menace de Loki et de son armée Chitauri.",director:"Joss Whedon",cast:"Robert Downey Jr., Chris Evans, Scarlett Johansson",pc:"Deux scènes — Thanos sourit ; les Avengers mangent des shawarmas en silence.",budget:"~220M$",box:"~1.519Md$",rt:"91% critique / 91% public",triv:"Écrit et réalisé par Joss Whedon ; la scène des shawarmas a été tournée après la première.",link:"Aboutissement de la Phase 1 ; Thanos révélé en scène post-crédit.",yt:"https://www.youtube.com/watch?v=hA6hldpSTF8",tmdb:{id:24428,type:"movie"}},
  thor2:{synopsis:"Thor doit sauver les neuf royaumes d'une force ancienne, les Ténébreux, menés par Malekith.",director:"Alan Taylor",cast:"Chris Hemsworth, Natalie Portman, Tom Hiddleston",pc:"Deux scènes — le Collectionneur reçoit l'Éther ; Thor et Jane se retrouvent sur Terre.",budget:"~170M$",box:"~644M$",rt:"66% critique / 76% public",triv:"Tournage compliqué avec reshoots ; souvent cité comme l'un des maillons faibles du MCU.",link:"Introduit l'Éther (Pierre de Réalité), remis au Collectionneur.",yt:"https://www.youtube.com/watch?v=npvJ9FTgZbM",tmdb:{id:76338,type:"movie"}},
  ironman3:{synopsis:"Après l'attaque de New York, Tony Stark affronte le terroriste Mandarin tout en luttant contre l'anxiété.",director:"Shane Black",cast:"Robert Downey Jr., Gwyneth Paltrow, Ben Kingsley",pc:"Scène milieu de générique légère (Tony/Bruce), pas de vraie scène post-crédit.",budget:"~200M$",box:"~1.215Md$",rt:"79% critique / 78% public",triv:"Le twist du Mandarin/Trevor Slattery a fait polémique (adressé plus tard dans Shang-Chi).",link:"Trevor Slattery revient dans Shang-Chi et Wonder Man (2026).",yt:"https://www.youtube.com/watch?v=Ke1Y3P9D0Bc",tmdb:{id:68721,type:"movie"}},
  cap2:{synopsis:"Captain America découvre qu'HYDRA a infiltré le SHIELD alors qu'un mystérieux assassin, le Soldat de l'hiver, le traque.",director:"Anthony et Joe Russo",cast:"Chris Evans, Scarlett Johansson, Sebastian Stan",pc:"Deux scènes — Bucky au Smithsonian ; le laboratoire de Strucker avec les jumeaux et le sceptre de Loki.",budget:"~170M$",box:"~714M$",rt:"90% critique / 92% public",triv:"Premier film MCU des frères Russo ; Robert Redford casté pour évoquer les thrillers politiques 70s.",link:"Effondre le SHIELD (révélation HYDRA) et prépare Civil War.",yt:"https://www.youtube.com/watch?v=7SlILk2WMTI",tmdb:{id:100402,type:"movie"}},
  gotg1:{synopsis:"Un groupe de renégats de l'espace s'allie pour empêcher un fanatique de mettre la main sur un orbe surpuissant.",director:"James Gunn",cast:"Chris Pratt, Zoe Saldaña, Dave Bautista",pc:"Oui — Howard the Duck fait une apparition surprise chez le Collectionneur.",budget:"~195M$",box:"~773M$",rt:"92% critique / 92% public",triv:"James Gunn réalise ; la bande-son «Awesome Mix» devient un succès à part entière.",link:"Introduit la Pierre de Pouvoir et Thanos, lançant le MCU cosmique.",yt:"https://www.youtube.com/watch?v=d96cjJhvlMA",tmdb:{id:118340,type:"movie"}},
  gotg2:{synopsis:"Les Gardiens affrontent une nouvelle menace tandis que Peter Quill découvre l'identité de son père céleste.",director:"James Gunn",cast:"Chris Pratt, Zoe Saldaña, Kurt Russell",pc:"Cinq scènes — dont Stan Lee, les Ravagers, et le cocon d'Adam Warlock.",budget:"~200M$",box:"~864M$",rt:"85% critique / 87% public",triv:"Kurt Russell joue Ego ; le film comporte cinq scènes post-génériques.",link:"Révèle les origines de Star-Lord et prépare Adam Warlock.",yt:"https://www.youtube.com/watch?v=dW1BIid8Osg",tmdb:{id:283995,type:"movie"}},
  avengers2:{synopsis:"Tony Stark crée une intelligence artificielle censée protéger le monde, mais Ultron se retourne contre l'humanité.",director:"Joss Whedon",cast:"Robert Downey Jr., Chris Evans, Elizabeth Olsen",pc:"Oui — Thanos enfile le Gantelet en personne.",budget:"~365M$",box:"~1.403Md$",rt:"76% critique / 82% public",triv:"James Spader incarne Ultron en performance capture ; introduit Scarlet Witch et Vision.",link:"Crée Vision et la Pierre de l'Esprit ; Ultron revient dans VisionQuest (2026).",yt:"https://www.youtube.com/watch?v=tmeOjFno6Do",tmdb:{id:99861,type:"movie"}},
  dd_s1:{synopsis:"Avocat aveugle le jour, Matt Murdock devient justicier masqué la nuit pour nettoyer Hell's Kitchen.",director:"Drew Goddard (showrunner)",cast:"Charlie Cox, Vincent D'Onofrio, Deborah Ann Woll",budget:"N/A",box:"N/A",rt:"99% critique / 97% public",triv:"Le combat du couloir en plan-séquence (ép. 2) est devenu culte.",link:"Lance le coin «street-level» Netflix ; Cox et D'Onofrio seront canonisés MCU plus tard.",yt:"https://www.youtube.com/watch?v=nphSbTNMFTo",tmdb:{id:61889,type:"tv"}},
  jj_s1:{synopsis:"Une détective privée dotée de superpouvoirs traque un homme capable de contrôler l'esprit des autres.",director:"Melissa Rosenberg (showrunner)",cast:"Krysten Ritter, David Tennant, Rachael Taylor",budget:"N/A",box:"N/A",rt:"93% critique / 89% public",triv:"David Tennant incarne Kilgrave ; saluée pour son traitement du traumatisme.",link:"Introduit Luke Cage avant son propre spin-off.",yt:"https://www.youtube.com/watch?v=1ulpsMH_bBU",tmdb:{id:38472,type:"tv"}},
  antman1:{synopsis:"Un cambrioleur repenti enfile une combinaison lui permettant de rétrécir pour réaliser un casse crucial.",director:"Peyton Reed",cast:"Paul Rudd, Michael Douglas, Evangeline Lilly",pc:"Deux scènes — le combat avec Falcon ; Hank révèle la combinaison de la Guêpe à Hope.",budget:"~130M$",box:"~519M$",rt:"83% critique / 86% public",triv:"Edgar Wright a quitté le projet ; Peyton Reed a repris la réalisation.",link:"Introduit le Royaume Quantique, crucial pour Endgame.",yt:"https://www.youtube.com/watch?v=pWdKf3MneyI",tmdb:{id:102899,type:"movie"}},
  cap3:{synopsis:"Les Avengers se déchirent sur la question d'un contrôle gouvernemental de leurs actions.",director:"Anthony et Joe Russo",cast:"Chris Evans, Robert Downey Jr., Scarlett Johansson",pc:"Oui — Bucky en cryosommeil au Wakanda, T'Challa construit un nouveau laboratoire.",budget:"~250M$",box:"~1.155Md$",rt:"90% critique / 89% public",triv:"Introduit Spider-Man (Tom Holland) et Black Panther (Chadwick Boseman).",link:"Scinde les Avengers via les Accords de Sokovie, menant à Infinity War.",yt:"https://www.youtube.com/watch?v=dKrVegVI0Us",tmdb:{id:271110,type:"movie"}},
  dd_s2:{synopsis:"Daredevil affronte le Caïd et croise la route du Punisher, tandis qu'Elektra ressurgit de son passé.",director:"Doug Petrie, Marco Ramirez (showrunners)",cast:"Charlie Cox, Jon Bernthal, Élodie Yung",budget:"N/A",box:"N/A",rt:"82% critique / 94% public",triv:"Introduit le Punisher (Jon Bernthal) et Elektra (Élodie Yung).",link:"Bernthal continue jusqu'à Born Again et le spécial 2026.",yt:"https://www.youtube.com/watch?v=eOEnVUf7wZI",tmdb:{id:61889,type:"tv"}},
  lc_s1:{synopsis:"Doté d'une peau incassable, un ex-détenu de Harlem devient malgré lui le protecteur de son quartier.",director:"Cheo Hodari Coker (showrunner)",cast:"Mike Colter, Mahershala Ali, Simone Missick",budget:"N/A",box:"N/A",rt:"96% critique / 76% public",triv:"Ancré dans la culture et la musique de Harlem ; son lancement aurait fait planter Netflix.",link:"Fait partie des Defenders, suite directe de Jessica Jones.",yt:"https://www.youtube.com/watch?v=Gs27S5cLLKc",tmdb:{id:62126,type:"tv"}},
  blackwidow:{synopsis:"Natasha Romanoff affronte son passé dans le programme Red Room et retrouve sa famille d'espionnes.",director:"Cate Shortland",cast:"Scarlett Johansson, Florence Pugh, David Harbour",pc:"Oui — Yelena, recrutée par Valentina, se recueille sur la tombe de Natasha.",budget:"~200M$",box:"~379M$",rt:"79% critique / 88% public",triv:"Sorti en simultané sur Disney+ Premier Access pendant le COVID ; situé après Civil War.",link:"Introduit Yelena Belova et Red Guardian, tous deux dans Thunderbolts*.",yt:"https://www.youtube.com/watch?v=Fp9pNPdNwjI",tmdb:{id:497698,type:"movie"}},
  blackpanther1:{synopsis:"T'Challa devient roi du Wakanda et doit défendre son trône face à un rival aux intentions radicales.",director:"Ryan Coogler",cast:"Chadwick Boseman, Michael B. Jordan, Lupita Nyong'o",pc:"Deux scènes — T'Challa s'adresse à l'ONU ; Bucky réapparaît au Wakanda sous le nom de White Wolf.",budget:"~200M$",box:"~1.349Md$",rt:"96% critique / 79% public",triv:"Premier MCU nommé aux Oscars «meilleur film» (3 statuettes gagnées) ; Ryan Coogler réalise.",link:"Établit le Wakanda et le Vibranium, centraux dans Infinity War.",yt:"https://www.youtube.com/watch?v=xjDjIWPwcPU",tmdb:{id:284054,type:"movie"}},
  spiderman1:{synopsis:"Peter Parker tente de concilier lycée et vie de super-héros sous le mentorat de Tony Stark.",director:"Jon Watts",cast:"Tom Holland, Michael Keaton, Robert Downey Jr.",pc:"Un faux «mid-credit» comique (PSA de Captain America) ; scène post avec Vulture en prison évoquant le Sinistre Six.",budget:"~175M$",box:"~880M$",rt:"92% critique / 87% public",triv:"Premier film co-produit Sony/Marvel ; introduit Mac Gargan (Scorpion).",link:"Le fil Scorpion aboutit dans Spider-Man: Brand New Day (2026).",yt:"https://www.youtube.com/watch?v=rk-dF1lIbIg",tmdb:{id:315635,type:"movie"}},
  drstrange1:{synopsis:"Un chirurgien devenu infirme découvre la magie et les univers parallèles auprès de l'Ancien.",director:"Scott Derrickson",cast:"Benedict Cumberbatch, Tilda Swinton, Chiwetel Ejiofor",pc:"Deux scènes — Thor amène Loki à Strange (teaser Ragnarok) ; Mordo vole les pouvoirs de Pangborn.",budget:"~165M$",box:"~677M$",rt:"89% critique / 86% public",triv:"Le casting de Tilda Swinton en Ancien a fait polémique (whitewashing).",link:"Introduit la Pierre du Temps, cruciale pour Infinity War/Endgame.",yt:"https://www.youtube.com/watch?v=HSzx-zryEgM",tmdb:{id:284052,type:"movie"}},
  thor3:{synopsis:"Thor, prisonnier sur Sakaar, doit combattre son ami Hulk dans l'arène pour sauver Asgard de sa sœur Hela.",director:"Taika Waititi",cast:"Chris Hemsworth, Tom Hiddleston, Cate Blanchett",pc:"Deux scènes — le Grandmaster a survécu à la révolte ; le vaisseau de Thor est intercepté (teaser Infinity War).",budget:"~180M$",box:"~854M$",rt:"93% critique / 87% public",triv:"Taika Waititi réalise et double Korg ; réinvention comique très improvisée.",link:"Détruit Asgard, menant directement à l'ouverture d'Infinity War.",yt:"https://www.youtube.com/watch?v=ue80QwXMRHg",tmdb:{id:284053,type:"movie"}},
  if_s1:{synopsis:"Un milliardaire disparu ressurgit à New York, maître des arts martiaux et du Poing de fer.",director:"Scott Buck (showrunner)",cast:"Finn Jones, Jessica Henwick, Jessica Stroup",budget:"N/A",box:"N/A",rt:"20% critique / 74% public",triv:"La série Netflix Marvel la moins bien notée, critiquée pour ses chorégraphies de combat.",link:"Mène aux Defenders.",yt:"https://www.youtube.com/watch?v=RterhFzsC4A",tmdb:{id:62127,type:"tv"}},
  defenders:{synopsis:"Daredevil, Jessica Jones, Luke Cage et Iron Fist unissent leurs forces contre la Main.",director:"Marco Ramirez, Douglas Petrie (showrunners)",cast:"Charlie Cox, Krysten Ritter, Mike Colter, Finn Jones",budget:"N/A",box:"N/A",rt:"76% critique / 66% public",triv:"Crossover réunissant Daredevil, Jessica Jones, Luke Cage et Iron Fist ; Sigourney Weaver en antagoniste.",link:"Aboutissement du coin street-level Netflix.",yt:"https://www.youtube.com/watch?v=Ptc4BaS3G4w",tmdb:{id:62285,type:"tv"}},
  pun_s1:{synopsis:"Frank Castle mène une guerre solitaire et sanglante contre le crime organisé après le meurtre de sa famille.",director:"Steve Lightfoot (showrunner)",cast:"Jon Bernthal, Ben Barnes, Deborah Ann Woll",budget:"N/A",box:"N/A",rt:"63% critique / 92% public",triv:"Spin-off de Jon Bernthal depuis Daredevil S2.",link:"Frank Castle continue jusqu'à Born Again et le spécial 2026.",yt:"https://www.youtube.com/watch?v=Dp3Y0mQtHUw",tmdb:{id:67178,type:"tv"}},
  avengers3:{synopsis:"Thanos entreprend de réunir les six Pierres d'infinité pour effacer la moitié de l'univers.",director:"Anthony et Joe Russo",cast:"Robert Downey Jr., Chris Hemsworth, Josh Brolin",pc:"Oui — Fury et Hill se désintègrent, le bipeur envoie un signal à Captain Marvel.",budget:"~325M$",box:"~2.048Md$",rt:"85% critique / 91% public",triv:"Crossover massif se terminant sur le «Snap» ; tourné en même temps qu'Endgame.",link:"Thanos réunit les six Pierres d'Infinité, préparant Endgame directement.",yt:"https://www.youtube.com/watch?v=6ZfuNTqbHE8",tmdb:{id:299536,type:"movie"}},
  jj_s2:{synopsis:"Jessica Jones enquête sur les origines de ses pouvoirs et sur l'expérience IGH qui l'a créée.",director:"Melissa Rosenberg (showrunner)",cast:"Krysten Ritter, Rachael Taylor, Janet McTeer",budget:"N/A",box:"N/A",rt:"82% critique / 55% public",triv:"Tous les épisodes réalisés par des femmes.",link:"Continuité des Defenders.",yt:"https://www.youtube.com/watch?v=eb_j5tZ63Fo",tmdb:{id:38472,type:"tv"}},
  lc_s2:{synopsis:"Luke Cage doit protéger Harlem d'un nouveau rival mystique venu de Jamaïque.",director:"Cheo Hodari Coker (showrunner)",cast:"Mike Colter, Mustafa Shakir, Alfre Woodard",budget:"N/A",box:"N/A",rt:"82% critique / 74% public",triv:"Antagoniste Bushmaster aux influences reggae/caribéennes.",link:"Continuité des Defenders.",yt:"https://www.youtube.com/watch?v=ccJUUpXG6a4",tmdb:{id:62126,type:"tv"}},
  if_s2:{synopsis:"Danny Rand tente de reprendre le contrôle de K'un-Lun et de son rôle de Poing de fer.",director:"Raven Metzner (showrunner)",cast:"Finn Jones, Jessica Henwick",budget:"N/A",box:"N/A",rt:"50% critique / 39% public",triv:"Chorégraphies de combat améliorées grâce à un nouveau coordinateur.",link:"Continuité des Defenders.",yt:"https://www.youtube.com/watch?v=iyABEQZDrbE",tmdb:{id:62127,type:"tv"}},
  dd_s3:{synopsis:"Daredevil, laissé pour mort, doit reconstruire son identité tandis que le Caïd prend le contrôle du FBI.",director:"Erik Oleson (showrunner)",cast:"Charlie Cox, Vincent D'Onofrio",budget:"N/A",box:"N/A",rt:"89% critique / 92% public",triv:"Adapte l'arc comics «Born Again» ; introduit Bullseye (Wilson Bethel).",link:"Précède directement la renaissance Disney+ Born Again.",yt:"https://www.youtube.com/watch?v=b--UcqZlG9g",tmdb:{id:61889,type:"tv"}},
  antman2:{synopsis:"Scott Lang s'associe à Hope van Dyne pour secourir sa mère perdue dans le royaume quantique.",director:"Peyton Reed",cast:"Paul Rudd, Evangeline Lilly, Michael Douglas",pc:"Oui — Scott coincé dans le Royaume quantique pendant que le Snap frappe Hank, Hope et Janet.",budget:"~162M$",box:"~623M$",rt:"87% critique / 75% public",triv:"Premier MCU avec une co-héroïne dans le titre ; situé avant le Snap d'Infinity War.",link:"Le Royaume Quantique devient central dans Endgame.",yt:"https://www.youtube.com/watch?v=aE2GCa-_nyU",tmdb:{id:363088,type:"movie"}},
  pun_s2:{synopsis:"Frank Castle est traqué par un ancien soldat pendant qu'il tente de vivre sous une identité normale.",director:"Steve Lightfoot (showrunner)",cast:"Jon Bernthal, Ben Barnes, Amber Rose Revah",budget:"N/A",box:"N/A",rt:"67% critique / 77% public",triv:"Dernière saison Netflix avant les annulations en cascade.",link:"Frank Castle continue vers Born Again / le spécial 2026.",yt:"https://www.youtube.com/watch?v=yBW3S9zKffg",tmdb:{id:67178,type:"tv"}},
  jj_s3:{synopsis:"Jessica Jones affronte un tueur en série obsédé, tout en gérant sa relation avec Trish.",director:"Jenna Reback, Micheal Taylor (showrunners)",cast:"Krysten Ritter, Rachael Taylor, Rebecca De Mornay",budget:"N/A",box:"N/A",rt:"79% critique / 58% public",triv:"Dernière série Netflix Marvel diffusée.",link:"Krysten Ritter revient dans Daredevil: Born Again S2 (2026).",yt:"https://www.youtube.com/watch?v=nButljasrIA",tmdb:{id:38472,type:"tv"}},
  avengers4:{synopsis:"Les survivants tentent de défaire le Snap de Thanos en manipulant le temps lui-même.",director:"Anthony et Joe Russo",cast:"Robert Downey Jr., Chris Evans, Scarlett Johansson",pc:"Non — pas de scène post-crédit (juste le son de l'enclume de Tony en clin d'œil).",budget:"~356-400M$",box:"~2.799Md$",rt:"94% critique / 90% public",triv:"Tony Stark et Black Widow meurent ; tourné avec de faux scripts pour éviter les fuites. A détrôné Avatar au box-office mondial (avant qu'Avatar ne le reprenne en 2021).",link:"Conclut la Saga de l'Infini ; le passage du bouclier à Sam Wilson.",yt:"https://www.youtube.com/watch?v=TcMBFSGVi1c",tmdb:{id:299534,type:"movie"},poster:"/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"},
  wandavision:{synopsis:"Wanda Maximoff et Vision vivent une vie de sitcom idyllique dans une réalité qui cache un lourd secret.",director:"Matt Shakman",cast:"Elizabeth Olsen, Paul Bettany, Kathryn Hahn",budget:"N/A (~25M$/épisode)",box:"N/A",rt:"91% critique / 88% public",triv:"Format hommage aux sitcoms à travers les décennies ; la chanson «Agatha All Along» est devenue virale.",link:"Prépare le tournant de Wanda dans Multiverse of Madness et lance Agatha All Along + VisionQuest.",yt:"https://www.youtube.com/watch?v=sj9J2ecsSpo",tmdb:{id:85271,type:"tv"}},
  falcon:{synopsis:"Sam Wilson et Bucky Barnes s'associent face à un groupe extrémiste et à un nouveau Captain America.",director:"Kari Skogland",cast:"Anthony Mackie, Sebastian Stan, Wyatt Russell",budget:"N/A (~150M$ au total)",box:"N/A",rt:"84% critique / 81% public",triv:"Tournage perturbé par le COVID ; introduit US Agent.",link:"Sam Wilson devient Captain America, menant à Brave New World (2025).",yt:"https://www.youtube.com/watch?v=U9iWWWs2Ajc",tmdb:{id:88396,type:"tv"}},
  loki1:{synopsis:"Arrêté par la TVA pour avoir altéré la ligne temporelle sacrée, Loki doit réparer le multivers.",director:"Kate Herron",cast:"Tom Hiddleston, Owen Wilson, Sophia Di Martino",budget:"N/A",box:"N/A",rt:"92% critique / 89% public",triv:"Introduit la TVA et Mobius (Owen Wilson) ; Sophia Di Martino joue Sylvie.",link:"Introduit Celui qui Demeure/Kang, lançant la Saga du Multivers.",yt:"https://www.youtube.com/watch?v=nW948Va-l10",tmdb:{id:84958,type:"tv"}},
  whatif1:{synopsis:"Le Gardeur explore des réalités alternatives où un seul événement a tout changé.",director:"Bryan Andrews (showrunner)",cast:"Jeffrey Wright (narrateur)",budget:"N/A",box:"N/A",rt:"94% critique / 85% public",triv:"Première série animée MCU ; comprend certaines des dernières performances de Chadwick Boseman.",link:"Introduit le multivers animé ; Captain Carter réapparaît dans Doctor Strange 2.",yt:"https://www.youtube.com/watch?v=ivZv6zw3Th3",tmdb:{id:91363,type:"tv"}},
  farfromhome:{synopsis:"Peter Parker part en voyage scolaire en Europe où Nick Fury l'enrôle contre des Élémentaires.",director:"Jon Watts",cast:"Tom Holland, Samuel L. Jackson, Jake Gyllenhaal",pc:"Deux scènes — J. Jonah Jameson révèle l'identité de Spider-Man ; Fury et Hill sont en fait des Skrulls.",budget:"~160M$",box:"~1.132Md$",rt:"90% critique / 95% public",triv:"Jake Gyllenhaal joue Mysterio ; premier film MCU sorti après Endgame.",link:"Mysterio révèle l'identité de Peter, préparant No Way Home.",yt:"https://www.youtube.com/watch?v=Nt9L1jCKGnE",tmdb:{id:429617,type:"movie"}},
  hawkeye:{synopsis:"Clint Barton forme malgré lui Kate Bishop, une jeune archère déterminée à devenir super-héroïne.",director:"Rhys Thomas, Bert & Bertie",cast:"Jeremy Renner, Hailee Steinfeld, Vera Farmiga",budget:"N/A",box:"N/A",rt:"92% critique / 90% public",triv:"Série de Noël à New York introduisant Kate Bishop (Hailee Steinfeld).",link:"Le Caïd revient ; l'arc Yelena mène à Thunderbolts*.",yt:"https://www.youtube.com/watch?v=NuQY0zJoTgc",tmdb:{id:88329,type:"tv"}},
  moonknight:{synopsis:"Steven Grant découvre qu'il partage son corps avec un mercenaire aux pouvoirs égyptiens, Marc Spector.",director:"Mohamed Diab",cast:"Oscar Isaac, May Calamawy, Ethan Hawke",budget:"N/A",box:"N/A",rt:"86% critique / 88% public",triv:"Oscar Isaac joue plusieurs personnalités (Steven Grant / Marc Spector).",link:"Introduit la mythologie égyptienne, largement autonome pour l'instant.",yt:"https://www.youtube.com/watch?v=x7Krla_UxRg",tmdb:{id:92749,type:"tv"}},
  eternals:{synopsis:"Des êtres immortels sortent de l'ombre pour protéger la Terre d'une menace ancienne, les Déviants.",director:"Chloé Zhao",cast:"Gemma Chan, Richard Madden, Angelina Jolie",pc:"Deux scènes — Eros et Pip le Troll rejoignent le groupe ; Dane Whitman évoque l'Épée d'Ébène.",budget:"~200M$",box:"~402M$",rt:"47% critique / 77% public",triv:"Chloé Zhao (oscarisée) réalise ; premier MCU «Rotten» ; premier héros sourd et premier couple gay du MCU.",link:"Introduit les Célestes ; Eros et Chevalier Noir teasés en crédits.",yt:"https://www.youtube.com/watch?v=x_me3xsvDgk",tmdb:{id:524434,type:"movie"}},
  msmarvel:{synopsis:"Kamala Khan, fan des Avengers, découvre qu'elle possède elle-même des pouvoirs cosmiques.",director:"Adil El Arbi, Bilall Fallah",cast:"Iman Vellani, Matt Lintz, Yasmeen Fletcher",budget:"N/A",box:"N/A",rt:"98% critique / 79% public",triv:"Débuts d'Iman Vellani ; le score critique RT le plus élevé d'une série MCU à l'époque.",link:"Révèle que Kamala est mutante, menant directement à The Marvels.",yt:"https://www.youtube.com/watch?v=91XVZATrhc4",tmdb:{id:92782,type:"tv"}},
  nowayhome:{synopsis:"L'identité de Spider-Man révélée au monde, un sort raté ouvre le multivers à d'anciens ennemis.",director:"Jon Watts",cast:"Tom Holland, Zendaya, Willem Dafoe",pc:"Non — pas de stinger classique, le film se termine sur une scène plus posée avec Peter.",budget:"~200M$",box:"~1.922Md$",rt:"93% critique / 98% public",triv:"Retours de Tobey Maguire et Andrew Garfield gardés secrets jusqu'à la sortie.",link:"Le sort de Strange prépare Brand New Day (2026).",yt:"https://www.youtube.com/watch?v=rt-2cxAiPJk",tmdb:{id:634649,type:"movie"}},
  drstrange2:{synopsis:"Doctor Strange voyage à travers le multivers pour protéger une jeune fille aux pouvoirs uniques.",director:"Sam Raimi",cast:"Benedict Cumberbatch, Elizabeth Olsen, Xochitl Gomez",pc:"Oui — Clea (Charlize Theron) recrute Strange pour une incursion multiversale.",budget:"~200M$",box:"~956M$",rt:"74% critique / 85% public",triv:"Sam Raimi réalise avec des éléments horrifiques ; introduit America Chavez et les Illuminati.",link:"Paye l'arc de Wanda depuis WandaVision.",yt:"https://www.youtube.com/watch?v=aWzlQ2N6qqg",tmdb:{id:453395,type:"movie"}},
  thor4:{synopsis:"Thor s'associe à Jane Foster, devenue Mighty Thor, pour vaincre Gorr le Boucher de dieux.",director:"Taika Waititi",cast:"Chris Hemsworth, Natalie Portman, Christian Bale",pc:"Oui — Heimdall et son fils Axl retrouvent un jeune Thor au Valhalla.",budget:"~250M$",box:"~761M$",rt:"63% critique / 76% public",triv:"Christian Bale joue Gorr ; réception mitigée comparée à Ragnarok.",link:"Introduit Hercule (crédits) ; la fille de Gorr apparaît dans les teasers Doomsday.",yt:"https://www.youtube.com/watch?v=Go8nTmfrQd8",tmdb:{id:616037,type:"movie"}},
  shehulk:{synopsis:"Jennifer Walters jongle entre carrière d'avocate et vie de super-héroïne verte de 2 mètres.",director:"Kat Coiro, Anu Valia",cast:"Tatiana Maslany, Mark Ruffalo, Tim Roth",budget:"N/A",box:"N/A",rt:"79% critique / 32% public",triv:"Comédie «brisant le 4e mur» ; CGI controversé ; introduit le costume jaune-rouge de Daredevil.",link:"Réintroduit Abomination et Wong, prépare le ton plus léger avant Born Again.",yt:"https://www.youtube.com/watch?v=Sdd11mDb3sU",tmdb:{id:92783,type:"tv"}},
  wakandaforever:{synopsis:"Le Wakanda doit faire face au deuil de son roi et à la menace sous-marine de Namor.",director:"Ryan Coogler",cast:"Letitia Wright, Lupita Nyong'o, Tenoch Huerta",pc:"Deux scènes — Shuri brûle la robe cérémonielle en privé ; Nakia révèle son fils, T'Challa Jr., en Haïti.",budget:"~250M$",box:"~859M$",rt:"84% critique / 94% public",triv:"Réalisé après le décès de Chadwick Boseman en son hommage ; introduit Namor et Riri Williams.",link:"Riri Williams se prolonge dans Ironheart (2025).",yt:"https://www.youtube.com/watch?v=_Z3QKkl1WyM",tmdb:{id:505642,type:"movie"}},
  secretinvasion:{synopsis:"Nick Fury découvre qu'une faction de Skrulls infiltre secrètement les gouvernements de la Terre.",director:"Ali Selim",cast:"Samuel L. Jackson, Ben Mendelsohn, Olivia Colman",budget:"N/A (~212M$)",box:"N/A",rt:"53-57% critique / 43% public",triv:"Premier MCU Disney+ «Rotten» ; le générique généré par IA a fait polémique.",link:"Précède The Marvels ; laisse des fils Skrulls en suspens.",yt:"https://www.youtube.com/watch?v=NC9kslQt0z0",tmdb:{id:114472,type:"tv"}},
  loki2:{synopsis:"Loki, brisé par le temps, tente de sauver la TVA de l'effondrement du multivers.",director:"Justin Benson, Aaron Moorhead",cast:"Tom Hiddleston, Owen Wilson, Sophia Di Martino",budget:"N/A",box:"N/A",rt:"~82-83% critique / ~87% public",triv:"A redressé la réputation des séries Phase 5 ; dernière apparition de Jonathan Majors avant son éviction.",link:"Loki devient «Dieu des Histoires», pilier structurel de la Saga du Multivers.",yt:"https://www.youtube.com/watch?v=YrjHcYqe31g",tmdb:{id:84958,type:"tv"}},
  whatif2:{synopsis:"De nouvelles réalités alternatives explorent des choix qui ont bouleversé des héros familiers.",director:"Bryan Andrews (showrunner)",cast:"Jeffrey Wright (narrateur)",budget:"N/A",box:"N/A",rt:"~90% critique / ~70% public",triv:"Sortie quotidienne pendant les fêtes de décembre 2023.",link:"Continue le multivers animé.",yt:"https://www.youtube.com/watch?v=x6-Ds_iH_gg",tmdb:{id:91363,type:"tv"}},
  quantumania:{synopsis:"La famille Lang-van Dyne est aspirée dans le royaume quantique où règne Kang le Conquérant.",director:"Peyton Reed",cast:"Paul Rudd, Evangeline Lilly, Jonathan Majors",pc:"Deux scènes — le Conseil de Kang réagit à sa mort ; Cassie et un jeune Kang jouent avec le temps.",budget:"~200M$+",box:"~476M$",rt:"46% critique / 83% public",triv:"Introduit Kang le Conquérant (Jonathan Majors) comme grand méchant prévu de la Saga (abandonné après ses ennuis judiciaires).",link:"Devait lancer la «Dynastie Kang», retravaillée en Avengers: Doomsday avec Docteur Doom.",yt:"https://www.youtube.com/watch?v=ZlNFpri-Y40",tmdb:{id:640146,type:"movie"}},
  gotg3:{synopsis:"Rocket, blessé mortellement, force les Gardiens à affronter son passé de créature de laboratoire.",director:"James Gunn",cast:"Chris Pratt, Zoe Saldaña, Bradley Cooper (voix)",pc:"Oui — plusieurs vignettes sur le nouveau statut de chaque Gardien après la mission.",budget:"~250M$",box:"~845M$",rt:"82% critique / 94% public",triv:"Dernier MCU de James Gunn avant DC ; centré sur les origines de Rocket.",link:"Clôt le casting des Gardiens ; Rocket mène une nouvelle équipe.",yt:"https://www.youtube.com/watch?v=u3V5KDHRQvk",tmdb:{id:447365,type:"movie"}},
  marvels:{synopsis:"Carol Danvers, Kamala Khan et Monica Rambeau échangent involontairement de place lorsqu'elles utilisent leurs pouvoirs.",director:"Nia DaCosta",cast:"Brie Larson, Teyonah Parris, Iman Vellani",pc:"Oui — Kamala Khan se réveille aux côtés d'autres jeunes héros (tease Young Avengers).",budget:"~220-275M$",box:"~197M$",rt:"62% critique / 85% public",triv:"Le plus gros échec au box-office du MCU (pire ouverture MCU, ~46M$) ; le plus court film MCU (~105min).",link:"La scène post-crédit révèle les mutants via Beast (Kelsey Grammer), ouvrant l'ère mutante.",yt:"https://www.youtube.com/watch?v=wS_qbDztgVY",tmdb:{id:609681,type:"movie"}},
  echo:{synopsis:"Maya Lopez retourne dans sa communauté natale pour affronter son passé lié au Caïd.",director:"Sydney Freeland (showrunner)",cast:"Alaqua Cox, Vincent D'Onofrio, Chaske Spencer",budget:"N/A (record pour une série Disney+ MCU)",box:"N/A",rt:"71% critique / 60% public",triv:"Première série «Spotlight» MCU ; tous les épisodes sortis d'un coup ; classée TV-MA.",link:"Continue l'arc du Caïd depuis Hawkeye, mène à Daredevil: Born Again.",yt:"https://www.youtube.com/watch?v=NcK4gVpg9d0",tmdb:{id:122226,type:"tv"}},
  "xmen97-1":{synopsis:"Après la disparition du Professeur X, les X-Men doivent continuer son rêve dans un monde plus hostile que jamais.",director:"Jake Castorena (showrunner)",cast:"Voix de la série animée originale des années 90",budget:"N/A",box:"N/A",rt:"99% critique / 91% public",triv:"Score RT le plus élevé d'un projet Marvel ; suite directe de la série animée de 1992.",link:"Fait avancer les arcs mutants ; renouvelée pour plusieurs saisons.",yt:"https://www.youtube.com/watch?v=rExDb-Al3fk",tmdb:{id:138502,type:"tv"}},
  xmen1:{synopsis:"Le Professeur Xavier et Magneto s'affrontent sur la meilleure façon de protéger les mutants d'un monde hostile.",director:"Bryan Singer",cast:"Hugh Jackman, Patrick Stewart, Ian McKellen",budget:"~75M$",box:"~296M$",rt:"82% critique / 83% public",triv:"A lancé le cinéma super-héroïque moderne ; Hugh Jackman casté après le désistement de Dougray Scott.",link:"Base de la franchise X-Men Fox ; personnages revus dans Days of Future Past.",yt:"https://www.youtube.com/watch?v=nbNcWnII2Fo",tmdb:{id:36657,type:"movie"}},
  x2:{synopsis:"Un colonel fanatique lance une attaque contre tous les mutants, forçant X-Men et Magneto à s'allier.",director:"Bryan Singer",cast:"Hugh Jackman, Patrick Stewart, Ian McKellen",budget:"~110M$",box:"~408M$",rt:"85% critique / 86% public",triv:"L'ouverture de Diablo à la Maison Blanche est saluée comme un sommet du genre.",link:"Prépare l'arc Phoenix Noire pour L'Affrontement final.",yt:"https://www.youtube.com/watch?v=zXpN6Y8qWFo",tmdb:{id:36658,type:"movie"}},
  xlaststand:{synopsis:"Un remède contre la mutation est développé tandis que Jean Grey, ressuscitée, devient Phoenix.",director:"Brett Ratner",cast:"Hugh Jackman, Halle Berry, Famke Janssen",budget:"~210M$",box:"~460M$",rt:"57% critique / 61% public",triv:"Brett Ratner remplace Bryan Singer ; traitement controversé du Phénix (annulé par la suite).",link:"Sa timeline est effacée par Days of Future Past.",yt:"https://www.youtube.com/watch?v=Ct5cLnQU2b4",tmdb:{id:36668,type:"movie"}},
  xorigins:{synopsis:"Les origines de Wolverine, de son passé de soldat à sa transformation en arme vivante.",director:"Gavin Hood",cast:"Hugh Jackman, Liev Schreiber, Ryan Reynolds",budget:"~150M$",box:"~373M$",rt:"37% critique / 58% public",triv:"Deadpool à la bouche cousue, moqué plus tard dans son propre film ; une copie de travail a fuité en ligne avant sortie.",link:"Wolverine revisité dans The Wolverine (2013).",yt:"https://www.youtube.com/watch?v=jsGflNv5_zw",tmdb:{id:2080,type:"movie"}},
  xfirstclass:{synopsis:"Dans les années 1960, un jeune Charles Xavier et Erik Lehnsherr forment ensemble la première classe de mutants.",director:"Matthew Vaughn",cast:"James McAvoy, Michael Fassbender, Jennifer Lawrence",budget:"~160M$",box:"~353M$",rt:"85% critique / 87% public",triv:"Préquelle années 60 avec James McAvoy et Michael Fassbender ; Matthew Vaughn réalise.",link:"Lance la timeline préquelle continuée dans Days of Future Past.",yt:"https://www.youtube.com/watch?v=UrbHykKUfTM",tmdb:{id:49538,type:"movie"}},
  thewolverine:{synopsis:"Wolverine se rend au Japon où on lui propose de perdre sa capacité de guérison.",director:"James Mangold",cast:"Hugh Jackman, Tao Okamoto, Rila Fukushima",budget:"~120M$",box:"~415M$",rt:"71% critique / 68% public",triv:"Situé au Japon ; James Mangold réalise ; scène post-crédit préparant Days of Future Past.",link:"Fait le pont vers Days of Future Past.",yt:"https://www.youtube.com/watch?v=nQFDrpj9zsc",tmdb:{id:76170,type:"movie"}},
  xdofp:{synopsis:"Wolverine voyage dans le passé pour empêcher un événement qui mènera à l'extinction des mutants.",director:"Bryan Singer",cast:"Hugh Jackman, James McAvoy, Michael Fassbender",budget:"~200M$",box:"~746M$",rt:"90% critique / 91% public",triv:"Fusionne les castings original et First Class via le voyage temporel.",link:"Efface L'Affrontement final et redéfinit la continuité.",yt:"https://www.youtube.com/watch?v=pK2zYHWDZKo",tmdb:{id:127585,type:"movie"}},
  dp1:{synopsis:"Un ancien soldat défiguré par une expérience devient un mercenaire masqué au sens de l'humour ravageur.",director:"Tim Miller",cast:"Ryan Reynolds, Morena Baccarin, Ed Skrein",budget:"~58M$",box:"~782M$",rt:"85% critique / 90% public",triv:"Des images test ayant fuité ont forcé le feu vert du studio ; plus gros succès classé R de la franchise à l'époque.",link:"Lance la franchise Deadpool menant à Deadpool & Wolverine (MCU).",yt:"https://www.youtube.com/watch?v=ONHBaC-pfsk",tmdb:{id:293660,type:"movie"}},
  xapocalypse:{synopsis:"Le tout premier mutant, réveillé après des millénaires, veut détruire la civilisation moderne.",director:"Bryan Singer",cast:"James McAvoy, Michael Fassbender, Oscar Isaac",budget:"~178M$",box:"~544M$",rt:"47% critique / 65% public",triv:"Oscar Isaac joue Apocalypse ; situé dans les années 1980.",link:"Continue le casting préquelle vers Dark Phoenix.",yt:"https://www.youtube.com/watch?v=Jer8XjMrUB4",tmdb:{id:246655,type:"movie"}},
  logan:{synopsis:"Un Wolverine vieillissant protège une jeune mutante aux pouvoirs similaires aux siens dans un futur sombre.",director:"James Mangold",cast:"Hugh Jackman, Patrick Stewart, Dafne Keen",budget:"~97M$",box:"~619M$",rt:"94% critique / 90% public",triv:"Adieu de Hugh Jackman (jusqu'à D&W) ; scénario nommé aux Oscars ; introduit X-23.",link:"Référencé avec émotion dans Deadpool & Wolverine.",yt:"https://www.youtube.com/watch?v=Div0iP65aZo",tmdb:{id:263115,type:"movie"}},
  dp2:{synopsis:"Deadpool forme une équipe de mutants pour protéger un jeune garçon menacé par un soldat venu du futur.",director:"David Leitch",cast:"Ryan Reynolds, Josh Brolin, Zazie Beetz",budget:"~110M$",box:"~785M$",rt:"84% critique / 84% public",triv:"Introduit Cable (Josh Brolin) et Domino ; David Leitch réalise.",link:"Prépare Deadpool & Wolverine.",yt:"https://www.youtube.com/watch?v=D86RtevtfrA",tmdb:{id:383498,type:"movie"}},
  darkphoenix:{synopsis:"Jean Grey, touchée par une force cosmique, devient une menace incontrôlable pour ses proches.",director:"Simon Kinberg",cast:"Sophie Turner, James McAvoy, Michael Fassbender",budget:"~200M$",box:"~252M$",rt:"22% critique / 63% public",triv:"Échec au box-office ; dernier film de la franchise X-Men Fox principale ; reshoots massifs.",link:"Termine effectivement la continuité cinéma X-Men Fox.",yt:"https://www.youtube.com/watch?v=k1_Bh2ssQI0",tmdb:{id:320288,type:"movie"}},
  newmutants:{synopsis:"Un groupe de jeunes mutants internés dans un hôpital psychiatrique isolé doit affronter ses propres démons.",director:"Josh Boone",cast:"Maisie Williams, Anya Taylor-Joy, Charlie Heaton",budget:"~67M$",box:"~49M$",rt:"34% critique / 55% public",triv:"Teinté horreur ; retardé ~3 ans par les reshoots et la fusion Disney-Fox.",link:"Dernier film Marvel Fox.",yt:"https://www.youtube.com/watch?v=I8dqjmnKvpU",tmdb:{id:340102,type:"movie"}},
  deadpoolwolverine:{synopsis:"Deadpool recrute une variante de Wolverine pour sauver son univers de l'effacement par la TVA.",director:"Shawn Levy",cast:"Ryan Reynolds, Hugh Jackman, Emma Corrin",pc:"Oui — générique très long avec de nombreux clins d'œil et hommages, sans grande révélation scénaristique.",budget:"~200M$",box:"~1.338Md$",rt:"77-78% critique / 94% public",triv:"Devenu le film classé R le plus rentable de l'histoire (dépassant Joker en 23 jours) ; record d'ouverture R (~211M$).",link:"Intègre officiellement Deadpool et les mutants Fox au MCU via la TVA.",yt:"https://www.youtube.com/watch?v=73_1biulkYk",tmdb:{id:533535,type:"movie"}},
  agatha:{synopsis:"Libérée du sortilège de Wanda, Agatha Harkness forme un covent de sorcières pour reprendre ses pouvoirs.",director:"Jac Schaeffer (showrunner)",cast:"Kathryn Hahn, Joe Locke, Aubrey Plaza",budget:"N/A",box:"N/A",rt:"~83% critique / ~55-60% public",triv:"Tournée sur le décor (depuis démoli) de WandaVision ; introduit Billy Maximoff (Wiccan).",link:"Prépare directement VisionQuest (2026), chapitre central de la trilogie WandaVision.",yt:"https://www.youtube.com/watch?v=Kc2ZO2ZlB9M",tmdb:{id:138501,type:"tv"}},
  whatif3:{synopsis:"Nouvelle saison d'histoires alternatives dans le multivers, entre choix héroïques et destins funestes.",director:"Bryan Andrews (showrunner)",cast:"Jeffrey Wright (narrateur)",budget:"N/A",box:"N/A",rt:"score moyen (peu de critiques)",triv:"Dernière saison de l'anthologie animée, sortie fin décembre 2024.",link:"Clôt le multivers animé What If...?",yt:"https://www.youtube.com/watch?v=Zp21Jc0Kh8g",tmdb:{id:91363,type:"tv"}},
  yfns1:{synopsis:"Peter Parker apprend le métier de super-héros au lycée, entre missions maladroites et vie d'adolescent.",director:"Jeff Trammell (showrunner)",cast:"Hudson Thames (voix), Grace Song (voix)",budget:"N/A",box:"N/A",rt:"~96-100% critique / ~70-78% public",triv:"Hudson Thames double Peter (déjà dans What If...?) ; titre de travail «Freshman Year».",link:"Origine alternative de Spidey introduisant Norman Osborn comme mentor précoce.",yt:"https://www.youtube.com/watch?v=Rn2Fc0uJNfw",tmdb:{id:138503,type:"tv"}},
  bravenewworld:{synopsis:"Sam Wilson, nouveau Captain America, doit déjouer un complot international impliquant le président Ross.",director:"Julius Onah",cast:"Anthony Mackie, Harrison Ford, Danny Ramirez",pc:"Oui — le Président Ross/Red Hulk, en lien avec les tensions à venir.",budget:"~180M$",box:"~415M$",rt:"~48-52% critique / ~80% public",triv:"D'importants reshoots ont été rapportés ; Harrison Ford reprend Thaddeus Ross, devenu Red Hulk.",link:"Paye les fils de L'Incroyable Hulk et Falcon/Winter Soldier.",yt:"https://www.youtube.com/watch?v=EOnGUFO9wo4",tmdb:{id:822119,type:"movie"}},
  daredevil1:{synopsis:"Matt Murdock reprend le costume de Daredevil alors que Wilson Fisk devient maire de New York.",director:"Dario Scardapane (showrunner)",cast:"Charlie Cox, Vincent D'Onofrio, Jon Bernthal",budget:"N/A (plus élevé que l'ère Netflix)",box:"N/A",rt:"~87% critique",triv:"Refonte créative en production, avec Dario Scardapane installé showrunner ; Foggy Nelson tué.",link:"Fisk devient maire de NYC ; prépare le spécial Punisher et la saison 2.",yt:"https://www.youtube.com/watch?v=Y0Chm3d_kkI",tmdb:{id:202555,type:"tv"}},
  thunderbolts:{synopsis:"Une équipe d'anciens agents et vilains est réunie de force pour une mission qui les dépasse.",director:"Jake Schreier",cast:"Florence Pugh, Sebastian Stan, David Harbour",pc:"Oui — l'équipe se présente publiquement sous le nom «New Avengers».",budget:"~180M$",box:"~382M$",rt:"88% critique / 93-94% public",triv:"Selon Forbes, le mieux noté MCU depuis No Way Home (2021) ; l'astérisque du titre révèle l'équipe comme «New Avengers».",link:"Forme les New Avengers, préparant Avengers: Doomsday.",yt:"https://www.youtube.com/watch?v=Oe61Le-kmow",tmdb:{id:986056,type:"movie"}},
  ironheart:{synopsis:"Riri Williams, jeune génie de la technologie, construit sa propre armure et croise la route du Fantôme.",director:"Sam Bailey, Angela Barnes",cast:"Dominique Thorne, Anthony Ramos",budget:"N/A",box:"N/A",rt:"~72-86% critique / ~67-72% public",triv:"Produite avec Proximity Media de Ryan Coogler ; introduit Méphisto (Sacha Baron Cohen).",link:"Mêle technologie et magie, amène Méphisto dans le MCU.",yt:"https://www.youtube.com/watch?v=0RB0Zbt-6ak",tmdb:{id:114471,type:"tv"}},
  fantasticfour:{synopsis:"Sur une Terre rétro-futuriste alternative, la première famille de Marvel affronte Galactus, dévoreur de mondes.",director:"Matt Shakman",cast:"Pedro Pascal, Vanessa Kirby, Joseph Quinn",pc:"Oui — un indice sur la menace à venir, en lien avec Doomsday.",budget:"~200M$+",box:"~521M$",rt:"86% critique / 91-92% public",triv:"Terre alternative rétro-futuriste années 60 ; Matt Shakman (WandaVision) réalise ; plus gros démarrage Marvel de 2025.",link:"La scène post-crédit prépare Avengers: Doomsday.",yt:"https://www.youtube.com/watch?v=pAsmrKyMqaA",tmdb:{id:617126,type:"movie"}},
  eyesofwakanda:{synopsis:"Anthologie animée suivant les Hatut Zeraze, gardiens de l'ombre du Wakanda à travers les âges.",director:"Todd Harris (showrunner)",cast:"Série animée",budget:"N/A",box:"N/A",rt:"92% critique / 51% public",triv:"Anthologie animée produite par Ryan Coogler ; explicitement canon au MCU.",link:"Étend l'histoire wakandaise et le lore du Vibranium.",yt:"https://www.youtube.com/watch?v=Sd6dxRi3JFo",tmdb:{id:241388,type:"tv"}},
  marvelzombies:{synopsis:"Une variante de héros Marvel doit survivre à une invasion zombie qui a ravagé leur monde.",director:"Bryan Andrews (showrunner)",cast:"Série animée, classée TV-MA",budget:"N/A",box:"N/A",rt:"62-67% critique",triv:"Spin-off de l'épisode zombie de What If...? ; classé TV-MA.",link:"Apocalypse zombie alternative, autonome dans le multivers animé.",yt:"https://www.youtube.com/watch?v=cFBpKAqNQm4",tmdb:{id:138505,type:"tv"}},
  wonderman:{synopsis:"Simon Williams, ancien cascadeur devenu super-héros raté, tente de percer à Hollywood.",director:"Destin Daniel Cretton (showrunner)",cast:"Yahya Abdul-Mateen II, Ben Kingsley",budget:"N/A",box:"N/A",rt:"~90-91% critique / ~91% public",triv:"Meilleur score public au lancement d'une série MCU live-action (devant WandaVision) ; renouvelée saison 2.",link:"Réintroduit Simon Williams, continue l'arc de Trevor Slattery.",yt:"https://www.youtube.com/watch?v=lgoxHC7WF9w",tmdb:{id:198178,type:"tv"}},
  daredevil2:{synopsis:"Daredevil et le Caïd s'affrontent alors que ce dernier resserre son emprise sur New York.",director:"Justin Benson, Aaron Moorhead (showrunners)",cast:"Charlie Cox, Vincent D'Onofrio",budget:"N/A",box:"N/A",rt:"~86% critique (débuté à 95%) / ~86% public",triv:"Krysten Ritter (Jessica Jones) revient ; saison 3 déjà commandée.",link:"Continue l'arc de maire de Fisk, mène au spécial Punisher.",yt:"https://www.youtube.com/watch?v=Y0Chm3d_kkI",tmdb:{id:202555,type:"tv"}},
  punisher:{synopsis:"Frank Castle mène une dernière mission sanglante, en lien direct avec les événements de Born Again.",director:"Reinaldo Marcus Green",cast:"Jon Bernthal, Judith Light",budget:"N/A",box:"N/A",rt:"~85% critique / ~94% public",triv:"Jon Bernthal co-écrit avec le réalisateur Reinaldo Marcus Green ; meilleure adaptation Punisher notée.",link:"Situé pendant Born Again S2 ; prépare Frank Castle pour Brand New Day.",yt:"https://www.youtube.com/watch?v=oSeqs_xeqv4"},
  "xmen97-2":{synopsis:"Les X-Men affrontent de nouvelles menaces alors que les tensions entre humains et mutants s'intensifient.",director:"Jake Castorena (showrunner)",cast:"Voix de la série animée originale des années 90",budget:"N/A",box:"N/A",rt:"100% critique / ~90% public",triv:"Score critique parfait, dépassant la saison 1 (99%) ; arc Apocalypse sur trois lignes temporelles.",link:"Continue la saga mutante vers l'ère live-action à venir.",yt:"https://www.youtube.com/watch?v=mfUtseK27pc",tmdb:{id:138502,type:"tv"}},
  brandnewday:{synopsis:"Un nouveau chapitre pour Spider-Man, marqué par l'arrivée du Punisher et de Hulk dans son univers.",director:"Destin Daniel Cretton",cast:"Tom Holland, Jon Bernthal, Mark Ruffalo",budget:"N/A",box:"TBD (pas encore sorti)",rt:"TBD (pas encore sorti)",triv:"Sa bande-annonce a cumulé 718,6M de vues en 24h, devenant le lancement de trailer le plus vu de tous les temps.",link:"Suit l'effacement de mémoire de No Way Home ; paye le fil Scorpion depuis Homecoming.",yt:"https://www.youtube.com/watch?v=Ba_M-t_v9mk",tmdb:{id:969681,type:"movie"}},
  yfns2:{synopsis:"Peter Parker doit gérer l'arrivée de nouveaux visages, dont Venom et Gwen Stacy, dans sa vie de héros.",director:"Jeff Trammell (showrunner)",cast:"Hudson Thames (voix)",budget:"N/A",box:"N/A",rt:"TBD (pas encore sorti)",triv:"Annoncée pour l'automne 2026 au NYCC 2025 ; introduira Venom et Gwen Stacy.",link:"Continue la saga animée alternative de Spidey.",yt:"Pas encore publiée",tmdb:{id:138503,type:"tv"}},
  visionquest:{synopsis:"Vision, reconstruit et hanté par ses souvenirs, doit affronter Ultron pour retrouver qui il est vraiment.",director:"Terry Matalas (showrunner)",cast:"Paul Bettany, James Spader",budget:"N/A",box:"N/A",rt:"TBD (pas encore sorti)",triv:"Paul Bettany et James Spader reviennent ; Terry Matalas (Star Trek: Picard) showrunner.",link:"Conclut la trilogie WandaVision/Agatha ; pourrait mener à Secret Wars.",yt:"Pas encore publiée",tmdb:{id:213375,type:"tv"}},
  doomsday:{synopsis:"Les héros de la Terre s'unissent face à la menace ultime d'un multivers en train de s'effondrer sous Doctor Doom.",director:"Anthony et Joe Russo",cast:"Robert Downey Jr., et l'ensemble du casting Avengers",budget:"N/A",box:"TBD (pas encore sorti)",rt:"TBD (pas encore sorti)",triv:"Réputé être parmi les films les plus chers jamais produits (budget non confirmé) ; sa bande-annonce (20 juillet 2026) a cumulé 503M de vues en 24h, 2e plus gros lancement de trailer de tous les temps.",link:"Avant-dernier chapitre de la Saga du Multivers, prépare Avengers: Secret Wars (déc. 2027).",yt:"https://www.youtube.com/watch?v=Ba_M-t_v9mk",tmdb:{id:1003596,type:"movie"}},
};

function fmt(m){if(m<=0)return'0m';const h=Math.floor(m/60),mn=m%60;return mn===0?`${h}h`:`${h}h${String(mn).padStart(2,'0')}`;}
function fmtE(m){return m<60?`${m}m`:fmt(m);}
function fmtDate(iso){if(!iso)return'';const d=new Date(iso);return`vu le ${d.getDate()} ${MONTHS[d.getMonth()]}`;}
function split(tot,n){const b=Math.floor(tot/n);let r=tot-b*n;return Array.from({length:n},()=>b+(r-->0?1:0));}
function fil(id,t,sec,m,opt,y){return{type:'f',id,title:t,sec,m,opt:!!opt,y:y||null};}
function ser(id,t,sec,sn,cnt,tot,opt){return{type:'s',id,title:t,sec,season:sn,count:cnt,epMins:split(tot,cnt),opt:!!opt};}
function serE(id,t,sec,sn,arr,opt){return{type:'s',id,title:t,sec,season:sn,count:arr.length,epMins:arr,opt:!!opt};}

// ── DATA ──────────────────────────────────────────────────
const E=[
  fil('cap1','Captain America : First Avenger',0,124,0,'1942'),
  fil('capmarvel','Captain Marvel',0,124,0,'1995'),
  fil('ironman1','Iron Man',0,126,0,'2010'),
  fil('ironman2','Iron Man 2',0,124,0,'2011'),
  fil('hulk','L\'Incroyable Hulk',0,112,0,'2011'),
  fil('thor1','Thor',0,115,0,'2011'),
  fil('avengers1','Avengers',1,143,0,'2012'),
  fil('thor2','Thor : Le Monde des ténèbres',1,112,0,'2013'),
  fil('ironman3','Iron Man 3',1,130,0,'2013'),
  fil('cap2','Captain America : Le Soldat de l\'hiver',1,136,0,'2014'),
  fil('gotg1','Les Gardiens de la Galaxie',1,121,0,'2014'),
  fil('gotg2','Les Gardiens de la Galaxie Vol. 2',1,137,0,'2014'),
  fil('avengers2','Avengers : L\'Ère d\'Ultron',1,141,0,'2015'),
  ser('dd_s1','Daredevil',1,1,13,676,1),
  ser('jj_s1','Jessica Jones',1,1,13,676,1),
  fil('antman1','Ant-Man',1,117,0,'2015'),
  fil('cap3','Captain America : Civil War',1,147,0,'2016'),
  ser('dd_s2','Daredevil',1,2,13,676,1),
  ser('lc_s1','Luke Cage',1,1,13,676,1),
  fil('blackwidow','Black Widow',1,134,0,'2016'),
  fil('blackpanther1','Black Panther',1,134,0,'2016-17'),
  fil('spiderman1','Spider-Man : Homecoming',1,133,0,'2016'),
  fil('drstrange1','Doctor Strange',1,115,0,'2016-17'),
  fil('thor3','Thor : Ragnarok',1,130,0,'2017'),
  ser('if_s1','Iron Fist',1,1,13,741,1),
  ser('defenders','The Defenders',1,1,8,416,1),
  ser('pun_s1','The Punisher (Netflix)',1,1,13,728,1),
  fil('avengers3','Avengers : Infinity War',1,149,0,'2018'),
  ser('jj_s2','Jessica Jones',1,2,13,702,1),
  ser('lc_s2','Luke Cage',1,2,13,702,1),
  ser('if_s2','Iron Fist',1,2,10,470,1),
  ser('dd_s3','Daredevil',1,3,13,676,1),
  fil('antman2','Ant-Man et la Guêpe',1,118,0,'2018'),
  ser('pun_s2','The Punisher (Netflix)',1,2,13,728,1),
  ser('jj_s3','Jessica Jones',1,3,13,598,1),
  fil('avengers4','Avengers : Endgame',1,181,0,'2018→2023'),
  ser('wandavision','WandaVision',2,1,9,320),
  ser('falcon','Falcon et le Soldat de l\'hiver',2,1,6,300),
  ser('loki1','Loki',2,1,6,300),
  ser('whatif1','What If…?',2,1,9,315,1),
  fil('farfromhome','Spider-Man : Far From Home',2,129),
  ser('hawkeye','Hawkeye',2,1,6,270,1),
  ser('moonknight','Moon Knight',2,1,6,300,1),
  fil('eternals','Les Éternels',2,156),
  ser('msmarvel','Ms. Marvel',2,1,6,210,1),
  fil('nowayhome','Spider-Man : No Way Home',2,148),
  fil('drstrange2','Doctor Strange in the Multiverse of Madness',2,126),
  fil('thor4','Thor : Love and Thunder',2,119),
  ser('shehulk','She-Hulk : Avocate',2,1,9,315,1),
  fil('wakandaforever','Black Panther : Wakanda Forever',2,161),
  ser('secretinvasion','Secret Invasion',2,1,6,270,1),
  ser('loki2','Loki',2,2,6,300),
  ser('whatif2','What If…?',2,2,9,315,1),
  fil('quantumania','Ant-Man et la Guêpe : Quantumania',2,125),
  fil('gotg3','Les Gardiens de la Galaxie Vol. 3',2,150),
  fil('marvels','The Marvels',2,105),
  ser('echo','Echo',2,1,5,215,1),
  ser('xmen97-1','X-Men \'97',2,1,10,280,1),
  fil('xmen1','X-Men',2,104,1,'2000'),
  fil('x2','X2 : X-Men United',2,134,1,'2003'),
  fil('xlaststand','X-Men : L\'Affrontement final',2,104,1,'2006'),
  fil('xorigins','X-Men Origins : Wolverine',2,107,1,'2009'),
  fil('xfirstclass','X-Men : Le Commencement',2,132,1,'2011'),
  fil('thewolverine','Wolverine : Le Combat de l\'immortel',2,126,1,'2013'),
  fil('xdofp','X-Men : Days of Future Past',2,131,1,'2014'),
  fil('dp1','Deadpool',2,108,1,'2016'),
  fil('xapocalypse','X-Men : Apocalypse',2,144,1,'2016'),
  fil('logan','Logan',2,137,1,'2017'),
  fil('dp2','Deadpool 2',2,119,1,'2018'),
  fil('darkphoenix','Dark Phoenix',2,113,1,'2019'),
  fil('newmutants','Les Nouveaux Mutants',2,94,1,'2020'),
  fil('deadpoolwolverine','Deadpool & Wolverine',2,128),
  ser('agatha','Agatha All Along',2,1,9,405,1),
  ser('whatif3','What If…?',2,3,8,280,1),
  ser('yfns1','Votre Fidèle Serviteur Spider-Man',2,1,10,280,1),
  fil('bravenewworld','Captain America : Brave New World',3,119),
  serE('daredevil1','Daredevil : Born Again',3,1,[58,47,40,40,40,40,40,40,57]),
  fil('thunderbolts','Thunderbolts*',3,127),
  ser('ironheart','Ironheart',3,1,6,270,1),
  fil('fantasticfour','Les Quatre Fantastiques : Premiers pas',3,120),
  ser('eyesofwakanda','Eyes of Wakanda',3,1,4,120,1),
  serE('marvelzombies','Marvel Zombies',3,1,[35,31,30,29],1),
  ser('wonderman','Wonder Man',3,1,8,225,1),
  serE('daredevil2','Daredevil : Born Again',3,2,[45,45,45,45,45,45,45,45]),
  fil('punisher','The Punisher : One Last Kill',3,48,1),
  ser('xmen97-2','X-Men \'97',3,2,9,252,1),
  fil('brandnewday','Spider-Man : Brand New Day',3,130),
  ser('yfns2','Votre Fidèle Serviteur Spider-Man',3,2,10,280,1),
  ser('visionquest','VisionQuest',3,1,8,320,1),
  fil('doomsday','Avengers : Doomsday',3,150),
];

// ── Instantanés FR (pour i18n.js) ─────────────────────────────────────────
// Capturés une seule fois ici, juste après la définition de E/INFO/PLAT/SEC/MONTHS
// (donc avant toute mutation par applyLangToContent()) — évite de retaper le
// contenu français une deuxième fois quelque part pour pouvoir y revenir depuis
// l'anglais.
const TITLE_FR={};
E.forEach(e=>{TITLE_FR[e.id]=e.title;});
const INFO_FR_SNAPSHOT={};
Object.keys(INFO).forEach(id=>{INFO_FR_SNAPSHOT[id]={...INFO[id]};});
const PLAT_FR_SNAPSHOT={};
Object.keys(PLAT).forEach(id=>{PLAT_FR_SNAPSHOT[id]={...PLAT[id]};});
const SEC_FR=SEC.slice();
const MONTHS_FR=MONTHS.slice();
