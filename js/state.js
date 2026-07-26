// ── STATE ─────────────────────────────────────────────────
const ST=typeof window.storage!=='undefined'&&window.storage!==null;
// watchDates est l'UNIQUE source de vérité : id présent = vu, avec sa date de
// visionnage. Il n'y a plus de Set "checked" séparé — avant, les deux pouvaient
// diverger (ex : une date qui reste pour un truc décoché), ce qui faussait des
// stats comme "vu cette semaine". Un seul objet, pas de risque d'incohérence.
let watchDates={},mode='tout',ratings={};
// sortMode : 'chrono' (ordre chronologique interne, par défaut) ou 'release' (ordre de
// sortie réelle) — détermine comment render() regroupe le catalogue, voir groupsFor()
// dans js/render.js. Le choix Essentiel/Tout (`mode`) s'applique dans les deux cas.
let sortMode='chrono';
// ── TMDB (affiches réelles) ──────────────────────────────
// Clé API fournie par l'utilisateur (gratuite sur themoviedb.org) — jamais embarquée
// en dur dans le fichier. Sans clé, ou hors ligne, ou en cas d'échec réseau : on
// retombe simplement sur l'affiche générée (dégradé + initiales), sans bloquer.
let tmdbKey=null;
let posterCache={}; // "movie:1726" -> URL de l'image, ou null si vérifié absent
let viewFilter='all',tonightMin=0,searchQuery='';
let cGroup=new Set(),cSer=new Set(E.filter(x=>x.type==='s').map(x=>x.id));

function isWatched(id){return Object.prototype.hasOwnProperty.call(watchDates,id);}
function markWatched(id){watchDates[id]=new Date().toISOString();}
function markUnwatched(id){delete watchDates[id];}

// ── EXPORT / IMPORT ──────────────────────────────────────
// Nettoie d'éventuelles dates de visionnage orphelines (un id présent dans
// watchDates mais absent d'un ancien tableau "checked" faisant foi) — c'est
// justement le genre d'incohérence qu'on évite maintenant en n'ayant plus
// qu'une seule source de vérité, mais on protège les anciens exports/sauvegardes.
function reconcileLegacyChecked(checkedArr,wd){
  const valid=new Set(checkedArr);
  const cleaned=wd?{...wd}:{};
  Object.keys(cleaned).forEach(id=>{if(!valid.has(id))delete cleaned[id];});
  valid.forEach(id=>{if(!(id in cleaned))cleaned[id]=new Date().toISOString();});
  return cleaned;
}

// ── STORAGE ──────────────────────────────────────────────
function lsSet(k,v){try{localStorage.setItem(k,v);}catch(_){}}
function lsGet(k){try{return localStorage.getItem(k);}catch(_){return null;}}
// Resynchronise le toggle Essentiel/Tout regarder sur la valeur courante de `mode` —
// nécessaire après le chargement initial ET après un import JSON, sinon le pastille
// reste sur l'ancien mode alors que le contenu affiché a bien changé.
function syncModeToggle(){
  togEl.setAttribute('data-m',mode);
  togEl.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.getAttribute('data-m')===mode));
}
// Resynchronise l'onglet Chronologique/Ordre de sortie — même besoin que
// syncModeToggle() ci-dessus (chargement initial + import éventuel futur).
function syncSortToggle(){
  sortChronoBtn.classList.toggle('on',sortMode==='chrono');
  sortReleaseBtn.classList.toggle('on',sortMode==='release');
}
async function save(){
  // mcu6-c n'est plus écrit : watchDates (mcu6-wd) est l'unique source de vérité.
  lsSet('mcu6-m',mode);lsSet('mcu6-sort',sortMode);
  lsSet('mcu6-r',JSON.stringify(ratings));lsSet('mcu6-wd',JSON.stringify(watchDates));
  if(ST){
    try{await window.storage.set('mcu6-m',mode);}catch(_){}
    try{await window.storage.set('mcu6-sort',sortMode);}catch(_){}
    try{await window.storage.set('mcu6-r',JSON.stringify(ratings));}catch(_){}
    try{await window.storage.set('mcu6-wd',JSON.stringify(watchDates));}catch(_){}
  }
}
async function boot(){
  // Clé TMDB et cache d'affiches : simples, toujours en localStorage (pas besoin
  // de les synchroniser via window.storage, ce sont des données très locales).
  const savedKey=lsGet('mcu-tmdb-key');if(savedKey)tmdbKey=savedKey;
  const savedCache=lsGet('mcu-poster-cache');if(savedCache)try{posterCache=JSON.parse(savedCache);}catch(_){}

  let fromST=false,legacyChecked=null,loadedWD=null;
  if(ST){
    try{const r=await window.storage.get('mcu6-wd');if(r?.value){loadedWD=JSON.parse(r.value);fromST=true;}}catch(_){}
    if(fromST){
      try{const r=await window.storage.get('mcu6-m');if(r?.value)mode=r.value;}catch(_){}
      try{const r=await window.storage.get('mcu6-sort');if(r?.value)sortMode=r.value;}catch(_){}
      try{const r=await window.storage.get('mcu6-r');if(r?.value)ratings=JSON.parse(r.value);}catch(_){}
      try{const r=await window.storage.get('mcu6-c');if(r?.value)legacyChecked=JSON.parse(r.value);}catch(_){}
    }
  }
  if(!fromST){
    const wd=lsGet('mcu6-wd');if(wd)try{loadedWD=JSON.parse(wd);}catch(_){}
    const c=lsGet('mcu6-c');if(c)try{legacyChecked=JSON.parse(c);}catch(_){}
    // Migration depuis mcu5 (aucune date dispo à l'époque, donc pas de reconciliation possible)
    if(!loadedWD&&!legacyChecked){
      const c5=lsGet('mcu5-c');
      if(c5)try{legacyChecked=JSON.parse(c5);}catch(_){}
    }
    const m=lsGet('mcu6-m')||lsGet('mcu5-m');if(m)mode=m;
    const sm=lsGet('mcu6-sort');if(sm)sortMode=sm;
    const r=lsGet('mcu6-r')||lsGet('mcu5-r');if(r)try{ratings=JSON.parse(r);}catch(_){}
  }
  // Migration/nettoyage : si un ancien tableau "checked" existe (d'avant l'unification
  // des deux états), on l'utilise pour retirer de watchDates toute date orpheline —
  // un reliquat possible d'une ancienne version qui gardait la date même après avoir
  // décoché un contenu, ce qui aurait faussé les stats ("vu cette semaine", graphique).
  if(legacyChecked){
    watchDates=reconcileLegacyChecked(legacyChecked,loadedWD);
  }else{
    watchDates=loadedWD||{};
  }
  syncModeToggle();
  syncSortToggle();
  if(viewFilter==='todo')document.body.classList.add('view-todo');
  render();
  E.filter(e=>e.type==='s').forEach(e=>{
    const sg=document.getElementById(`sg-${e.id}`);if(!sg)return;
    const d=sDone(e),all=d===e.count;
    sg.classList.toggle('sg-done',all);
    const sgChk=sg.querySelector('.sg-chk');
    if(sgChk){sgChk.checked=all;sgChk.indeterminate=d>0&&!all;}
  });
  save(); // persiste immédiatement le nettoyage éventuel (et abandonne mcu6-c pour de bon)
}
