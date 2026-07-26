const tnValEl=document.getElementById('tn-v');
document.getElementById('tn-m').addEventListener('click',()=>{const i=TN.indexOf(tonightMin);tonightMin=TN[Math.max(0,i-1)];tnValEl.textContent=tnDisp(tonightMin);applyTonightHL();updateProchain();});
document.getElementById('tn-p').addEventListener('click',()=>{const i=TN.indexOf(tonightMin);tonightMin=TN[Math.min(TN.length-1,i+1)];tnValEl.textContent=tnDisp(tonightMin);applyTonightHL();updateProchain();});

// ── FILTER ───────────────────────────────────────────────
const fltAllBtn=document.getElementById('flt-all'),fltTodoBtn=document.getElementById('flt-todo');
fltAllBtn.addEventListener('click',()=>{viewFilter='all';fltAllBtn.classList.add('on');fltTodoBtn.classList.remove('on');document.body.classList.remove('view-todo');render();});
fltTodoBtn.addEventListener('click',()=>{viewFilter='todo';fltTodoBtn.classList.add('on');fltAllBtn.classList.remove('on');document.body.classList.add('view-todo');render();});

// ── SEARCH ──────────────────────────────────────────────
const srchEl=document.getElementById('srch');
const srchClrBtn=document.getElementById('srch-clr');
const srchCntEl=document.getElementById('srch-cnt');
let wasSearching=false;
srchEl.addEventListener('input',()=>{
  const q=srchEl.value.trim();
  // N'auto-déplie qu'au tout début d'une recherche, pas à chaque frappe —
  // ainsi l'utilisateur peut replier manuellement une série pendant qu'il cherche.
  if(q&&!wasSearching){cSec.clear();cSer.clear();}
  searchQuery=q;wasSearching=q.length>0;
  srchClrBtn.classList.toggle('vis',q.length>0);
  render();
});
srchClrBtn.addEventListener('click',()=>{
  searchQuery='';srchEl.value='';wasSearching=false;
  srchClrBtn.classList.remove('vis');
  srchCntEl.classList.remove('vis');
  render();
});

// ── SURPRISE ─────────────────────────────────────────────
document.getElementById('surprise-btn').addEventListener('click',()=>{
  const pool=E.filter(e=>{
    if(!cnt(e))return false;
    if(isFuture(e))return false; // jamais proposer un contenu pas encore sorti
    return e.type==='f'?!isWatched(e.id):sDone(e)<e.count;
  });
  if(!pool.length){showToast(t('surpriseNoneLeft'));return;}
  const pick=pool[Math.floor(Math.random()*pool.length)];
  // Open chapter
  const chEl=document.getElementById(`ch${pick.sec}`);
  if(chEl&&!chEl.classList.contains('open')){chEl.classList.add('open');cSec.delete(pick.sec);}
  if(pick.type==='s'){const sg=document.getElementById(`sg-${pick.id}`);if(sg&&!sg.classList.contains('open')){sg.classList.add('open');cSer.delete(pick.id);}}
  // Dismiss search if active
  if(searchQuery){searchQuery='';srchEl.value='';wasSearching=false;srchClrBtn.classList.remove('vis');srchCntEl.classList.remove('vis');render();}
  const elId=pick.type==='f'?`r-${pick.id}`:`sg-${pick.id}`;
  setTimeout(()=>{
    const el=document.getElementById(elId);
    if(el){el.scrollIntoView({behavior:'smooth',block:'center'});el.classList.add('highlight-pulse');setTimeout(()=>el.classList.remove('highlight-pulse'),3600);}
  },120);
  showToast(`🎲 ${pick.title}`);
});

// ── STATS MODAL ──────────────────────────────────────────
// Les 3 modales sont des éléments statiques du squelette HTML (jamais recréés par
// render()) : on les récupère une seule fois plutôt que de refaire un getElementById
// à chaque interaction.
const statModal=document.getElementById('stat-modal');
const infoModal=document.getElementById('info-modal');
const tmdbModal=document.getElementById('tmdb-modal');
document.getElementById('stats-btn').addEventListener('click',openStats);
// Échap ferme la modale ouverte (stats, info, ou clé TMDB)
document.addEventListener('keydown',ev=>{
  if(ev.key!=='Escape')return;
  statModal.classList.remove('vis');
  infoModal.classList.remove('vis');
  tmdbModal.classList.remove('vis');
});
statModal.addEventListener('click',ev=>{if(ev.target===statModal)statModal.classList.remove('vis');});

// ── INFO MODAL ('i') ──────────────────────────────────────
infoModal.addEventListener('click',ev=>{if(ev.target===infoModal)infoModal.classList.remove('vis');});
document.addEventListener('click',ev=>{
  const btn=ev.target.closest('.info-btn');
  if(!btn)return;
  ev.preventDefault();ev.stopPropagation();
  openInfo(btn.dataset.info);
});

// ── CLÉ TMDB ─────────────────────────────────────────────
// Clé v3 gratuite à obtenir sur https://www.themoviedb.org/settings/api
// Utilise une vraie modale plutôt que window.prompt() : certains aperçus/iframes
// sandboxés bloquent silencieusement les boîtes de dialogue natives du navigateur,
// ce qui rendait le bouton inopérant sans aucun message d'erreur.
const tmdbInputEl=document.getElementById('tmdb-input');
document.getElementById('tmdb-btn').addEventListener('click',()=>{
  tmdbInputEl.value=tmdbKey||'';
  tmdbModal.classList.add('vis');
});
document.getElementById('tmdb-close').addEventListener('click',()=>tmdbModal.classList.remove('vis'));
tmdbModal.addEventListener('click',ev=>{if(ev.target===tmdbModal)tmdbModal.classList.remove('vis');});
document.getElementById('tmdb-save').addEventListener('click',()=>{
  const val=tmdbInputEl.value.trim();
  tmdbKey=val||null;
  lsSet('mcu-tmdb-key',tmdbKey||'');
  tmdbModal.classList.remove('vis');
  showToast(tmdbKey?t('tmdbKeySaved'):t('tmdbKeyRemoved'));
});
document.getElementById('tmdb-clear').addEventListener('click',()=>{
  tmdbKey=null;lsSet('mcu-tmdb-key','');
  tmdbInputEl.value='';
  tmdbModal.classList.remove('vis');
  showToast(t('tmdbKeyRemoved'));
});

document.getElementById('exp-btn').addEventListener('click',()=>{
  const data={version:7,exportDate:new Date().toISOString(),watchDates,ratings,mode};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download=`mcu-marathon-${new Date().toISOString().slice(0,10)}.json`;a.click();
  URL.revokeObjectURL(url);showToast(t('exportedMsg'));
});
document.getElementById('imp-inp').addEventListener('change',ev=>{
  const file=ev.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{
    try{
      const data=JSON.parse(e.target.result);
      if(Array.isArray(data.checked)){
        // Ancien format (v6 ou antérieur) : on utilise le tableau "checked" comme
        // référence pour nettoyer d'éventuelles dates orphelines dans watchDates.
        watchDates=reconcileLegacyChecked(data.checked,data.watchDates);
      }else if(data.watchDates){
        watchDates=data.watchDates;
      }
      if(data.ratings)ratings=data.ratings;
      if(data.mode){mode=data.mode;syncModeToggle();}
      render();save();showToast(t('importedMsg'));
    }catch(_){showToast(t('invalidFileMsg'));}
  };
  reader.readAsText(file);
  ev.target.value='';
});

// ── GLOBAL EVENTS ────────────────────────────────────────
const togEl=document.getElementById('tog');
togEl.querySelectorAll('button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    mode=btn.getAttribute('data-m');
    syncModeToggle();
    render();save();
  });
});
document.getElementById('expAll').addEventListener('click',()=>{cSec.clear();cSer.clear();render();});
document.getElementById('colAll').addEventListener('click',()=>{[0,1,2,3].forEach(si=>cSec.add(si));E.filter(e=>e.type==='s').forEach(e=>cSer.add(e.id));render();});

let armed=false;
const rst=document.getElementById('rst');
rst.addEventListener('click',()=>{
  if(!armed){armed=true;rst.classList.add('armed');rst.textContent=t('resetConfirm');setTimeout(()=>{armed=false;rst.classList.remove('armed');rst.textContent=t('resetBtn');},3000);return;}
  ratings={};watchDates={};armed=false;
  rst.classList.remove('armed');rst.textContent=t('resetBtn');
  render();save();
});

// ── PWA ICON ─────────────────────────────────────────────
function setupPWAIcon(){
  try{
    const c=document.createElement('canvas');c.width=180;c.height=180;
    const ctx=c.getContext('2d');

    // Fond : dégradé diagonal sombre (cohérent avec le thème de l'app)
    const bg=ctx.createLinearGradient(0,0,180,180);
    bg.addColorStop(0,'#132018');bg.addColorStop(1,'#050705');
    ctx.fillStyle=bg;ctx.fillRect(0,0,180,180);

    // Halo doux derrière le badge
    const glow=ctx.createRadialGradient(90,86,8,90,86,100);
    glow.addColorStop(0,'rgba(56,191,80,.28)');glow.addColorStop(1,'rgba(56,191,80,0)');
    ctx.fillStyle=glow;ctx.fillRect(0,0,180,180);

    function hexPath(cx,cy,r){
      ctx.beginPath();
      for(let i=0;i<6;i++){
        const a=Math.PI/180*(60*i-90);
        const x=cx+r*Math.cos(a),y=cy+r*Math.sin(a);
        i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.closePath();
    }
    // Bordure or du badge hexagonal
    hexPath(90,88,59);
    ctx.strokeStyle='#C8941A';ctx.lineWidth=5;ctx.stroke();
    // Remplissage vert dégradé
    const hexGrad=ctx.createLinearGradient(32,30,148,146);
    hexGrad.addColorStop(0,'#2A9640');hexGrad.addColorStop(1,'#0B1F10');
    hexPath(90,88,54);
    ctx.fillStyle=hexGrad;ctx.fill();
    // Léger reflet supérieur pour la profondeur
    const sheen=ctx.createLinearGradient(90,34,90,88);
    sheen.addColorStop(0,'rgba(255,255,255,.14)');sheen.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=sheen;hexPath(90,88,54);ctx.fill();

    // Monogramme
    ctx.fillStyle='#F3F1EA';
    ctx.font='800 64px -apple-system,Helvetica,Arial,sans-serif';
    ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.shadowColor='rgba(0,0,0,.35)';ctx.shadowBlur=4;ctx.shadowOffsetY=2;
    ctx.fillText('M',90,93);

    const lk=document.createElement('link');lk.rel='apple-touch-icon';lk.href=c.toDataURL('image/png');
    document.head.appendChild(lk);
  }catch(_){}
}

// ── HEADER HEIGHT → CSS var pour sticky sidebar ──────────
function updateHH(){
  const h=document.querySelector('.top')?.offsetHeight||0;
  document.documentElement.style.setProperty('--hh',h+'px');
}
window.addEventListener('resize',updateHH);

// ── THÈME & LANGUE ────────────────────────────────────────
document.getElementById('theme-btn').addEventListener('click',toggleTheme);
document.getElementById('lang-btn').addEventListener('click',toggleLang);
initTheme();
initLang();

boot().then(()=>{updateHH();});
setupPWAIcon();
