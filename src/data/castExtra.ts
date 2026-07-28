// Comprehensive cast list (main + supporting, often 10-30+ names) for SEARCH ONLY —
// never rendered on screen. INFO.cast (info.ts) only shows 2-3 headline names in the
// "i" modal; this lets searching by any actor, even a minor role, still find the title.
// Researched/verified per title (IMDb/Wikipedia/TMDB), merged from two passes on 27/07/2026.
export const CAST_EXTRA: Record<string, string> = {
  cap1: "Chris Evans, Hayley Atwell, Sebastian Stan, Tommy Lee Jones, Hugo Weaving, Dominic Cooper, Stanley Tucci, Toby Jones, Neal McDonough, Derek Luke, Kenneth Choi, JJ Feild, Bruno Ricci, Natalie Dormer, Samuel L. Jackson, Richard Armitage, Lex Shrapnel, Michael Brandon, Oscar Pearce, William Hope, Nicholas Pinnock, Marek Oravec, David Bradley, Leander Deeny, Sam Hoare, Simon Kunz, Kieran O'Connor, Stan Lee",
  capmarvel:
    'Brie Larson, Samuel L. Jackson, Ben Mendelsohn, Jude Law, Annette Bening, Djimon Hounsou, Lee Pace, Lashana Lynch, Gemma Chan, Clark Gregg, Rune Temte, Algenis Perez Soto, McKenna Grace, Akira Akbar, Colin Ford, Kenneth Mitchell, Stephen A. Chang, Pete Ploszek, Robert Kazinsky, Nelson Franklin, Patrick Gallagher, Stan Lee',
  ironman1:
    'Robert Downey Jr., Gwyneth Paltrow, Terrence Howard, Jeff Bridges, Shaun Toub, Faran Tahir, Clark Gregg, Leslie Bibb, Bill Smitrovich, Sayed Badreya, Paul Bettany, Jon Favreau, Peter Billingsley, Tim Guinee, Will Lyman, Tom Morello, Nazanin Boniadi, Samuel L. Jackson, Stan Lee',
  ironman2:
    'Robert Downey Jr., Gwyneth Paltrow, Don Cheadle, Scarlett Johansson, Sam Rockwell, Mickey Rourke, Samuel L. Jackson, Clark Gregg, Garry Shandling, John Slattery, Jon Favreau, Paul Bettany, Leslie Bibb, Kate Mara, Tim Guinee, Olivia Munn, Christiane Amanpour, Stan Lee',
  hulk: 'Edward Norton, Liv Tyler, Tim Roth, Tim Blake Nelson, William Hurt, Ty Burrell, Christina Cabot, Peter Mensah, Lou Ferrigno, Paul Soles, Débora Nascimento, Greg Bryk, Robert Downey Jr., Stan Lee',
  thor1:
    'Chris Hemsworth, Natalie Portman, Tom Hiddleston, Anthony Hopkins, Stellan Skarsgård, Kat Dennings, Idris Elba, Ray Stevenson, Josh Dallas, Jaimie Alexander, Colm Feore, Rene Russo, Clark Gregg, Samuel L. Jackson, Tadanobu Asano, Adriana Barraza, Maximiliano Hernández, Joseph Gatt, Stan Lee',
  avengers1:
    'Robert Downey Jr., Chris Evans, Scarlett Johansson, Chris Hemsworth, Mark Ruffalo, Jeremy Renner, Tom Hiddleston, Samuel L. Jackson, Cobie Smulders, Clark Gregg, Stellan Skarsgård, Gwyneth Paltrow, Paul Bettany, Alexis Denisof, Powers Boothe, Jerzy Skolimowski, Stan Lee',
  thor2:
    "Chris Hemsworth, Natalie Portman, Tom Hiddleston, Anthony Hopkins, Stellan Skarsgård, Kat Dennings, Idris Elba, Christopher Eccleston, Adewale Akinnuoye-Agbaje, Zachary Levi, Jaimie Alexander, Rene Russo, Ray Stevenson, Tadanobu Asano, Alice Krige, Clive Russell, Chris O'Dowd, Stan Lee",
  ironman3:
    'Robert Downey Jr., Gwyneth Paltrow, Don Cheadle, Guy Pearce, Rebecca Hall, Ben Kingsley, James Badge Dale, Stephanie Szostak, Jon Favreau, Ty Simpkins, Paul Bettany, William Sadler, Dale Dickey, Miguel Ferrer, Wang Xue-Qi, Shaun Toub, Stan Lee',
  cap2: 'Chris Evans, Scarlett Johansson, Sebastian Stan, Anthony Mackie, Cobie Smulders, Frank Grillo, Emily VanCamp, Hayley Atwell, Robert Redford, Samuel L. Jackson, Toby Jones, Georges St-Pierre, Maximiliano Hernández, Callan Mulvey, Jenny Agutter, Bernard White, Alan Dale, Stan Lee',
  gotg1:
    'Chris Pratt, Zoe Saldaña, Dave Bautista, Vin Diesel, Bradley Cooper, Lee Pace, Michael Rooker, Karen Gillan, Djimon Hounsou, John C. Reilly, Glenn Close, Benicio del Toro, Josh Brolin, Peter Serafinowicz, Ophelia Lovibond, Gregg Henry, Stan Lee',
  gotg2:
    'Chris Pratt, Zoe Saldaña, Dave Bautista, Vin Diesel, Bradley Cooper, Michael Rooker, Karen Gillan, Pom Klementieff, Elizabeth Debicki, Chris Sullivan, Sean Gunn, Kurt Russell, Sylvester Stallone, Steve Agee, Tommy Flanagan, Michael Rosenbaum, Ving Rhames, Stan Lee',
  avengers2:
    'Robert Downey Jr., Chris Evans, Chris Hemsworth, Mark Ruffalo, Scarlett Johansson, Jeremy Renner, James Spader, Samuel L. Jackson, Cobie Smulders, Don Cheadle, Aaron Taylor-Johnson, Elizabeth Olsen, Paul Bettany, Anthony Mackie, Hayley Atwell, Idris Elba, Stellan Skarsgård, Thomas Kretschmann, Linda Cardellini, Andy Serkis, Stan Lee',
  dd_s1:
    "Charlie Cox, Vincent D'Onofrio, Deborah Ann Woll, Elden Henson, Toby Leonard Moore, Vondie Curtis-Hall, Bob Gunton, Ayelet Zurer, Rosario Dawson, Scott Glenn, Royce Johnson, Geoffrey Cantor",
  jj_s1:
    'Krysten Ritter, David Tennant, Rachael Taylor, Mike Colter, Wil Traval, Erin Moriarty, Eka Darville, Carrie-Anne Moss',
  antman1:
    'Paul Rudd, Michael Douglas, Evangeline Lilly, Corey Stoll, Bobby Cannavale, Michael Peña, Tip "T.I." Harris, Wood Harris, Judy Greer, David Dastmalchian, Abby Ryder Fortson, Anthony Mackie, Joe Chrest, Johnny Pemberton, Garrett Morris, Stan Lee',
  cap3: 'Chris Evans, Robert Downey Jr., Scarlett Johansson, Sebastian Stan, Anthony Mackie, Don Cheadle, Jeremy Renner, Chadwick Boseman, Paul Bettany, Elizabeth Olsen, Paul Rudd, Emily VanCamp, Tom Holland, Daniel Brühl, Frank Grillo, William Hurt, Martin Freeman, Marisa Tomei, Jim Rash, Alfre Woodard, Stan Lee',
  dd_s2:
    "Charlie Cox, Jon Bernthal, Élodie Yung, Deborah Ann Woll, Elden Henson, Rosario Dawson, Vincent D'Onofrio, Stephen Rider, Scott Glenn, Royce Johnson, Geoffrey Cantor, Ayelet Zurer",
  lc_s1:
    'Mike Colter, Mahershala Ali, Simone Missick, Theo Rossi, Erik LaRay Harvey, Alfre Woodard, Rosario Dawson, Frank Whaley, Frankie Faison',
  blackwidow:
    'Scarlett Johansson, Florence Pugh, David Harbour, O-T Fagbenle, Olga Kurylenko, William Hurt, Ray Winstone, Rachel Weisz, Ever Anderson, Violet McGraw, Ryan Kiera Armstrong',
  blackpanther1:
    "Chadwick Boseman, Michael B. Jordan, Lupita Nyong'o, Danai Gurira, Martin Freeman, Daniel Kaluuya, Letitia Wright, Winston Duke, Angela Bassett, Forest Whitaker, Andy Serkis, Sterling K. Brown, John Kani, Florence Kasumba, Connie Chiume, Isaach De Bankolé, Danny Sapani, Sydelle Noel, Stan Lee",
  spiderman1:
    'Tom Holland, Michael Keaton, Robert Downey Jr., Marisa Tomei, Jon Favreau, Zendaya, Jacob Batalon, Laura Harrier, Tony Revolori, Donald Glover, Bokeem Woodbine, Martin Starr, Hannibal Buress, Gwyneth Paltrow, Kenneth Choi, Tyne Daly, Abraham Attah, Selenis Leyva, Angourie Rice, Garcelle Beauvais, Michael Chernus, Michael Mando, Logan Marshall-Green, Jennifer Connelly, Chris Evans, Stan Lee',
  drstrange1:
    'Benedict Cumberbatch, Tilda Swinton, Chiwetel Ejiofor, Rachel McAdams, Benedict Wong, Michael Stuhlbarg, Benjamin Bratt, Scott Adkins, Mads Mikkelsen, Amy Landecker, Stan Lee',
  thor3:
    'Chris Hemsworth, Tom Hiddleston, Cate Blanchett, Idris Elba, Jeff Goldblum, Tessa Thompson, Karl Urban, Mark Ruffalo, Anthony Hopkins, Rachel House, Taika Waititi, Benedict Cumberbatch, Clancy Brown, Tadanobu Asano, Ray Stevenson, Zachary Levi, Luke Hemsworth, Sam Neill, Matt Damon, Stan Lee',
  if_s1:
    'Finn Jones, Jessica Henwick, Tom Pelphrey, Jessica Stroup, Ramón Rodríguez, Sacha Dhawan, Rosario Dawson, David Wenham',
  defenders:
    'Charlie Cox, Krysten Ritter, Mike Colter, Finn Jones, Eka Darville, Elden Henson, Jessica Henwick, Simone Missick, Ramón Rodríguez, Rachael Taylor, Deborah Ann Woll, Élodie Yung, Rosario Dawson, Scott Glenn, Sigourney Weaver',
  pun_s1:
    'Jon Bernthal, Ebon Moss-Bachrach, Amber Rose Revah, Deborah Ann Woll, Daniel Webber, Jason R. Moore, Michael Nathanson, Ben Barnes, Paul Schulze, Jaime Ray Newman',
  avengers3:
    'Robert Downey Jr., Chris Hemsworth, Josh Brolin, Chris Evans, Scarlett Johansson, Mark Ruffalo, Chadwick Boseman, Benedict Cumberbatch, Tom Holland, Zoe Saldaña, Chris Pratt, Paul Bettany, Elizabeth Olsen, Dave Bautista, Anthony Mackie, Sebastian Stan, Danai Gurira, Letitia Wright, Don Cheadle, Peter Dinklage, Karen Gillan, Pom Klementieff, Vin Diesel, Bradley Cooper, Gwyneth Paltrow, Benedict Wong, Tom Vaughan-Lawlor, William Hurt, Samuel L. Jackson, Cobie Smulders, Winston Duke, Idris Elba, Terry Notary, Stan Lee',
  jj_s2:
    'Krysten Ritter, Rachael Taylor, Eka Darville, J.R. Ramirez, Terry Chen, Leah Gibson, Carrie-Anne Moss, Janet McTeer',
  lc_s2:
    'Mike Colter, Simone Missick, Theo Rossi, Alfre Woodard, Mustafa Shakir, Gabrielle Dennis, Rosario Dawson, Jessica Henwick, Finn Jones, Stephen Rider',
  if_s2: 'Finn Jones, Jessica Henwick, Tom Pelphrey, Jessica Stroup, Sacha Dhawan, Simone Missick, Alice Eve',
  dd_s3:
    "Charlie Cox, Vincent D'Onofrio, Deborah Ann Woll, Elden Henson, Joanne Whalley, Jay Ali, Wilson Bethel, Rosario Dawson, Stephen Rider, Ayelet Zurer, Royce Johnson, Geoffrey Cantor",
  antman2:
    'Paul Rudd, Evangeline Lilly, Michael Douglas, Michelle Pfeiffer, Walton Goggins, Hannah John-Kamen, Laurence Fishburne, Michael Peña, Judy Greer, Bobby Cannavale, Abby Ryder Fortson, Randall Park, David Dastmalchian, Tip "T.I." Harris, Divian Ladwa, Goran Kostić, Stan Lee',
  pun_s2:
    'Jon Bernthal, Ben Barnes, Amber Rose Revah, Jason R. Moore, Josh Stewart, Floriana Lima, Giorgia Whigham, Deborah Ann Woll',
  jj_s3:
    'Krysten Ritter, Rachael Taylor, Eka Darville, Benjamin Walker, Sarita Choudhury, Jeremy Bobb, Tiffany Mack, Carrie-Anne Moss, J.R. Ramirez, Mike Colter, David Tennant',
  avengers4:
    "Robert Downey Jr., Chris Evans, Scarlett Johansson, Chris Hemsworth, Mark Ruffalo, Jeremy Renner, Don Cheadle, Paul Rudd, Brie Larson, Karen Gillan, Danai Gurira, Bradley Cooper, Gwyneth Paltrow, Josh Brolin, Chadwick Boseman, Tom Holland, Zoe Saldaña, Benedict Cumberbatch, Elizabeth Olsen, Anthony Mackie, Sebastian Stan, Benedict Wong, Letitia Wright, Tessa Thompson, Evangeline Lilly, Michael Douglas, Michelle Pfeiffer, Tilda Swinton, Frank Grillo, Natalie Portman, Samuel L. Jackson, Vin Diesel, Paul Bettany, Chris Pratt, Tom Hiddleston, Dave Bautista, Pom Klementieff, Rene Russo, James D'Arcy, Kerry Condon, Angela Bassett, William Hurt, Winston Duke, Stan Lee",
  wandavision:
    'Elizabeth Olsen, Paul Bettany, Debra Jo Rupp, Fred Melamed, Kathryn Hahn, Teyonah Parris, Randall Park, Kat Dennings, Evan Peters, Josh Stamberg, David Payton, David Lengel, David A Payton, Selena Anduze, Asif Ali, Emma Caulfield Ford, Jolene Purdy',
  falcon:
    'Anthony Mackie, Sebastian Stan, Wyatt Russell, Erin Kellyman, Danny Ramirez, Georges St-Pierre, Adepero Oduye, Don Cheadle, Daniel Brühl, Emily VanCamp, Florence Kasumba, Julia Louis-Dreyfus, Carl Lumbly',
  loki1:
    'Tom Hiddleston, Owen Wilson, Sophia Di Martino, Gugu Mbatha-Raw, Wunmi Mosaku, Eugene Cordero, Tara Strong, Sasha Lane, Jack Veal, DeObia Oparei, Richard E. Grant, Jonathan Majors',
  whatif1:
    'Jeffrey Wright, Hayley Atwell, Josh Brolin, Dominic Cooper, David Dastmalchian, Michael Douglas, Karen Gillan, Jeff Goldblum, Frank Grillo, Sean Gunn, Chris Hemsworth, Tom Hiddleston, Djimon Hounsou, Samuel L. Jackson, Toby Jones, Michael B. Jordan, Neal McDonough, Natalie Portman, Jeremy Renner, Michael Rooker, Paul Rudd, Mark Ruffalo, Sebastian Stan, Chadwick Boseman, Benedict Cumberbatch, Anthony Mackie',
  farfromhome:
    'Tom Holland, Samuel L. Jackson, Jake Gyllenhaal, Zendaya, Marisa Tomei, Jon Favreau, Jacob Batalon, Cobie Smulders, Martin Starr, Tony Revolori, J.B. Smoove, Numan Acar, Remy Hii, Angourie Rice, Jorge Lendeborg Jr., J.K. Simmons',
  hawkeye:
    "Jeremy Renner, Hailee Steinfeld, Vera Farmiga, Tony Dalton, Fra Fee, Brian d'Arcy James, Aleks Paunovic, Piotr Adamczyk, Linda Cardellini, Alaqua Cox, Zahn McClarnon, Florence Pugh, Vincent D'Onofrio",
  moonknight:
    'Oscar Isaac, May Calamawy, Ethan Hawke, F. Murray Abraham, Karim El Hakim, Antonia Salib, Gaspard Ulliel, Khalid Abdalla, David Ganly, Ann Akinjirin',
  eternals:
    'Gemma Chan, Richard Madden, Angelina Jolie, Kumail Nanjiani, Lia McHugh, Brian Tyree Henry, Lauren Ridloff, Barry Keoghan, Don Lee, Kit Harington, Salma Hayek, Bill Skarsgård, Harish Patel, Haaz Sleiman, Harry Styles',
  msmarvel:
    'Iman Vellani, Matt Lintz, Yasmeen Fletcher, Zenobia Shroff, Mohan Kapur, Saagar Shaikh, Rish Shah, Arian Moayed, Nimra Bucha, Farhan Akhtar, Aramis Knight, Laurel Marsden, Travina Springer, Laith Nakli, Azhar Usman, Alysia Reiner, Jordan Firstman, Anjali Bhimani, Sophia Mahmud',
  nowayhome:
    'Tom Holland, Zendaya, Benedict Cumberbatch, Jacob Batalon, Jon Favreau, Jamie Foxx, Willem Dafoe, Alfred Molina, Benedict Wong, Tony Revolori, Marisa Tomei, Andrew Garfield, Tobey Maguire, Rhys Ifans, J.K. Simmons, Thomas Haden Church, Charlie Cox, Angourie Rice',
  drstrange2:
    'Benedict Cumberbatch, Elizabeth Olsen, Xochitl Gomez, Chiwetel Ejiofor, Benedict Wong, Michael Stuhlbarg, Rachel McAdams, Hayley Atwell, Anson Mount, Lashana Lynch, John Krasinski, Patrick Stewart, Jett Klyne, Julian Hilliard, Charlize Theron, Sheila Atim, Bruce Campbell',
  thor4:
    'Chris Hemsworth, Natalie Portman, Christian Bale, Tessa Thompson, Taika Waititi, Russell Crowe, Jaimie Alexander, Idris Elba, Chris Pratt, Dave Bautista, Karen Gillan, Pom Klementieff, Sean Gunn, Vin Diesel, Bradley Cooper, Kat Dennings, Brett Goldstein, Stellan Skarsgård, Luke Hemsworth, Matt Damon',
  shehulk:
    'Tatiana Maslany, Mark Ruffalo, Tim Roth, Jameela Jamil, Ginger Gonzaga, Josh Segarra, Renée Elise Goldsberry, Jon Bass, Benedict Wong, Charlie Cox, Griffin Matthews, Steve Coulter',
  wakandaforever:
    "Letitia Wright, Lupita Nyong'o, Danai Gurira, Winston Duke, Florence Kasumba, Dominique Thorne, Michaela Coel, Mabel Cadena, Tenoch Huerta, Martin Freeman, Julia Louis-Dreyfus, Angela Bassett, Alex Livinalli",
  secretinvasion:
    'Samuel L. Jackson, Ben Mendelsohn, Kingsley Ben-Adir, Olivia Colman, Emilia Clarke, Don Cheadle, Cobie Smulders, Martin Freeman, Killian Scott, Samuel Adewunmi, Dermot Mulroney, Richard Dormer, Charlayne Woodard, Christopher McDonald',
  loki2:
    'Tom Hiddleston, Sophia Di Martino, Owen Wilson, Wunmi Mosaku, Eugene Cordero, Rafael Casal, Kate Dickie, Liz Carr, Ke Huy Quan, Gugu Mbatha-Raw, Jonathan Majors, Tara Strong, Neil Ellice',
  whatif2:
    'Jeffrey Wright, Hayley Atwell, Chadwick Boseman, Samuel L. Jackson, Jeff Goldblum, Karen Gillan, Michael Rooker, Sean Gunn, Djimon Hounsou, Natalie Portman, Chris Hemsworth, Tom Hiddleston, Toby Jones, Paul Rudd, Sebastian Stan, Neal McDonough, Michael B. Jordan, Dominique Thorne, Natasha Lyonne, Jason Isaacs, Anthony Mackie',
  quantumania:
    "Paul Rudd, Evangeline Lilly, Jonathan Majors, Michael Douglas, Michelle Pfeiffer, Kathryn Newton, Corey Stoll, David Dastmalchian, Katy O'Brian, William Jackson Harper, Bill Murray, Randall Park",
  gotg3:
    'Chris Pratt, Zoe Saldaña, Dave Bautista, Karen Gillan, Pom Klementieff, Vin Diesel, Bradley Cooper, Will Poulter, Sean Gunn, Chukwudi Iwuji, Linda Cardellini, Nathan Fillion, Sylvester Stallone, Maria Bakalova, Elizabeth Debicki',
  marvels:
    'Brie Larson, Teyonah Parris, Iman Vellani, Zawe Ashton, Park Seo-joon, Samuel L. Jackson, Zenobia Shroff, Mohan Kapur, Saagar Shaikh, Leila Farzad, Lashana Lynch, Tessa Thompson, Daniel Ings, Kelsey Grammer, Rachel John, Hailee Steinfeld',
  echo: "Alaqua Cox, Vincent D'Onofrio, Chaske Spencer, Zahn McClarnon, Tantoo Cardinal, Graham Greene, Devery Jacobs, Cody Lightning, Charlie Cox, Dallas Goldtooth",
  'xmen97-1':
    'Ray Chase, Jennifer Hale, Alison Sealy-Smith, Cal Dodd, Lenore Zann, George Buza, J.P. Karliak, Holly Chou, A.J. LoCascio, Isaac Robinson-Smith, Matthew Waterson, Ross Marquand',
  xmen1:
    'Hugh Jackman, Patrick Stewart, Ian McKellen, Halle Berry, Famke Janssen, James Marsden, Anna Paquin, Rebecca Romijn, Tyler Mane, Ray Park, Bruce Davison, Shawn Ashmore, Stan Lee',
  x2: 'Hugh Jackman, Patrick Stewart, Ian McKellen, Halle Berry, Famke Janssen, James Marsden, Anna Paquin, Rebecca Romijn, Brian Cox, Alan Cumming, Shawn Ashmore, Aaron Stanford, Kelly Hu, Bruce Davison, Katie Stuart, Kea Wong',
  xlaststand:
    'Hugh Jackman, Halle Berry, Famke Janssen, Ian McKellen, Patrick Stewart, Anna Paquin, Kelsey Grammer, James Marsden, Rebecca Romijn, Shawn Ashmore, Aaron Stanford, Vinnie Jones, Ben Foster, Ellen Page, Dania Ramirez, Elliot Page, Daniel Cudmore, Shohreh Aghdashloo, Bill Duke, Eric Dane',
  xorigins:
    'Hugh Jackman, Liev Schreiber, Ryan Reynolds, Danny Huston, Will.i.am, Lynn Collins, Kevin Durand, Taylor Kitsch, Daniel Henney, Dominic Monaghan, Julia Blake, Troye Sivan',
  xfirstclass:
    'James McAvoy, Michael Fassbender, Jennifer Lawrence, Kevin Bacon, Rose Byrne, January Jones, Oliver Platt, Nicholas Hoult, Lucas Till, Zoë Kravitz, Caleb Landry Jones, Edi Gathegi, Jason Flemyng, Álex González, Rade Šerbedžija',
  thewolverine:
    'Hugh Jackman, Tao Okamoto, Rila Fukushima, Famke Janssen, Svetlana Khodchenkova, Hiroyuki Sanada, Will Yun Lee, Brian Tee, Hal Yamanouchi',
  xdofp:
    'Hugh Jackman, James McAvoy, Michael Fassbender, Jennifer Lawrence, Halle Berry, Anna Paquin, Ellen Page, Peter Dinklage, Ian McKellen, Patrick Stewart, Shawn Ashmore, Omar Sy, Evan Peters, Josh Helman, Daniel Cudmore, Fan Bingbing, Nicholas Hoult, Adan Canto, Booboo Stewart, Evan Jonigkeit, Famke Janssen, James Marsden, Lucas Till',
  dp1: 'Ryan Reynolds, Morena Baccarin, Ed Skrein, T.J. Miller, Gina Carano, Brianna Hildebrand, Leslie Uggams, Stefan Kapičić, Karan Soni, Jed Rees',
  xapocalypse:
    'James McAvoy, Michael Fassbender, Jennifer Lawrence, Oscar Isaac, Nicholas Hoult, Rose Byrne, Tye Sheridan, Sophie Turner, Olivia Munn, Lucas Till, Evan Peters, Josh Helman, Kodi Smit-McPhee, Ben Hardy, Alexandra Shipp, Lana Condor, Ally Sheedy',
  logan:
    'Hugh Jackman, Patrick Stewart, Dafne Keen, Richard E. Grant, Boyd Holbrook, Stephen Merchant, Elizabeth Rodriguez, Eriq La Salle, Elise Neal',
  dp2: 'Ryan Reynolds, Josh Brolin, Morena Baccarin, Julian Dennison, Zazie Beetz, T.J. Miller, Brianna Hildebrand, Jack Kesy, Terry Crews, Bill Skarsgård, Rob Delaney, Shiori Kutsuna, Leslie Uggams, Karan Soni, Eddie Marsan, Lewis Tan, Stefan Kapičić, Shioli Kutsuna',
  darkphoenix:
    "Sophie Turner, James McAvoy, Michael Fassbender, Jessica Chastain, Nicholas Hoult, Tye Sheridan, Alexandra Shipp, Evan Peters, Kodi Smit-McPhee, Jennifer Lawrence, Scott Shepherd, Ato Essandoh, Brian d'Arcy James, Halston Sage, Lamar Johnson",
  newmutants:
    'Maisie Williams, Anya Taylor-Joy, Charlie Heaton, Henry Zaga, Blu Hunt, Alice Braga, Henrique Zaga, Adam Beach',
  deadpoolwolverine:
    'Ryan Reynolds, Hugh Jackman, Emma Corrin, Morena Baccarin, Rob Delaney, Leslie Uggams, Aaron Stanford, Matthew Macfadyen, Karan Soni, Brianna Hildebrand, Stefan Kapičić, Shiori Kutsuna, Lewis Tan, Dafne Keen, Jon Favreau, Jennifer Garner, Wesley Snipes, Channing Tatum, Chris Evans, Henry Cavill, Wunmi Mosaku, Tyler Mane, Shioli Kutsuna, Blake Lively, Matthew McConaughey',
  agatha:
    'Kathryn Hahn, Joe Locke, Aubrey Plaza, Sasheer Zamata, Ali Ahn, Debra Jo Rupp, Patti LuPone, Maria Dizzia, Okwui Okpokwasili, Evan Peters, Amos Glick, Kate Forbes, Asif Ali, David Lengel, David A Payton',
  whatif3:
    'Jeffrey Wright, Hayley Atwell, Chadwick Boseman, Samuel L. Jackson, Jeff Goldblum, Karen Gillan, Michael Rooker, Sean Gunn, Djimon Hounsou, Natalie Portman, Chris Hemsworth, Tom Hiddleston, Toby Jones, Paul Rudd, Sebastian Stan, Neal McDonough, Michael B. Jordan, Dominique Thorne, Kathryn Hahn, Anthony Mackie',
  yfns1:
    'Hudson Thames, Grace Song, Kari Wahlgren, Eugene Byrd, Zeno Robinson, Colman Domingo, Hugh Dancy, Charlie Cox, Cathy Ang, Zehra Fazal, Zach Cherry, Jonathan Medina, Roger Craig Smith, Anjali Kunapaneni',
  bravenewworld:
    'Anthony Mackie, Harrison Ford, Danny Ramirez, Shira Haas, Carl Lumbly, Xosha Roquemore, Giancarlo Esposito, Liv Tyler, Tim Blake Nelson',
  daredevil1:
    "Charlie Cox, Vincent D'Onofrio, Margarita Levieva, Deborah Ann Woll, Elden Henson, Wilson Bethel, Zabryna Guevara, Nikki M. James, Genneya Walton, Arty Froushan, Clark Johnson, Michael Gandolfini, Ayelet Zurer, Kamar de los Reyes, Jon Bernthal, Tony Dalton, Mohan Kapur, Hamish Allan-Headley",
  thunderbolts:
    'Florence Pugh, Sebastian Stan, Wyatt Russell, David Harbour, Hannah John-Kamen, Olga Kurylenko, Lewis Pullman, Julia Louis-Dreyfus, Geraldine Viswanathan, Chris Bauer, Wendell Pierce',
  ironheart:
    'Dominique Thorne, Anthony Ramos, Alden Ehrenreich, Lyric Ross, Manny Montana, Regan Aliyah, Zoe Terakes, Shakira Barrera, Anji White, Eric André, Jim Rash, Eric Andre, Shea Couleé',
  fantasticfour:
    'Pedro Pascal, Vanessa Kirby, Joseph Quinn, Ebon Moss-Bachrach, Julia Garner, Paul Walter Hauser, John Malkovich, Natasha Lyonne, Sarah Niles, Ralph Ineson',
  eyesofwakanda:
    'Winnie Harlow, Cress Williams, Patricia Belcher, Steve Toussaint, Larry Herron, Adam Gold, Lynn Whitfield, Jacques Colimon, Jona Xiao, Isaac Robinson-Smith, Gary Anthony Williams, Zeke Alton, Anika Noni Rose',
  marvelzombies:
    'Iman Vellani, Hailee Steinfeld, Dominique Thorne, Florence Pugh, David Harbour, Simu Liu, Randall Park, Awkwafina, Kerry Condon, F. Murray Abraham, Hudson Thames, Elizabeth Olsen, Kari Wahlgren',
  wonderman:
    'Yahya Abdul-Mateen II, Ben Kingsley, Demetrius Grosse, Lauren Glazier, Byron Bowers, Arian Moayed, X Mayo, Zlatko Burić, Olivia Thirlby',
  daredevil2:
    "Charlie Cox, Vincent D'Onofrio, Deborah Ann Woll, Margarita Levieva, Matthew Lillard, Tony Dalton, Michael Gandolfini, Nikki M. James, Arty Froushan, Zabryna Guevara, Clark Johnson, Ayelet Zurer, Wilson Bethel, Lili Taylor, Elden Henson, Toby Leonard Moore, Krysten Ritter, Jon Bernthal",
  punisher: 'Jon Bernthal, Deborah Ann Woll, Jason R. Moore, Judith Light, Chelsea Brea, Kelli Barrett',
  'xmen97-2':
    'Ross Marquand, Matthew Waterson, Ray Chase, Jennifer Hale, Alison Sealy-Smith, Cal Dodd, Lenore Zann, George Buza, Zehra Fazal, Gates McFadden, JP Karliak, A.J. LoCascio',
  brandnewday:
    'Tom Holland, Zendaya, Sadie Sink, Jacob Batalon, Jon Bernthal, Tramell Tillman, Michael Mando, Mark Ruffalo',
  yfns2:
    'Hudson Thames, Grace Song, Kari Wahlgren, Eugene Byrd, Zeno Robinson, Colman Domingo, Hugh Dancy, Cathy Ang, Charlie Cox',
  visionquest:
    "Paul Bettany, James Spader, Emily Hampshire, Diane Morgan, Todd Stashwick, Ruaridh Mollica, T'Nia Miller, Orla Brady, James D'Arcy, Faran Tahir, Mary McDonnell, Henry Lewis, Jonathan Sayer",
  doomsday:
    'Robert Downey Jr., Chris Hemsworth, Pedro Pascal, Paul Rudd, Anthony Mackie, Florence Pugh, Vanessa Kirby, Ebon Moss-Bachrach, Wyatt Russell, Channing Tatum, Simu Liu, Ian McKellen, Tom Hiddleston, James Marsden, Patrick Stewart, Joseph Quinn, Sebastian Stan, David Harbour, Letitia Wright, Lewis Pullman, Kelsey Grammer, Kathryn Newton, Danny Ramirez, Winston Duke, Alan Cumming, Hannah John-Kamen, Rebecca Romijn, Mabel Cadena, Tenoch Huerta',
};
