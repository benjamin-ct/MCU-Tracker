// ── COMPUTE ──────────────────────────────────────────────
function cnt(e){return mode==='tout'||!e.opt;}
function sDone(e){return e.epMins.filter((_,i)=>isWatched(`${e.id}-e${i+1}`)).length;}
function sRem(e){return e.epMins.reduce((s,m,i)=>s+(isWatched(`${e.id}-e${i+1}`)?0:m),0);}
function fitsTonight(e){if(tonightMin<=0||isFuture(e))return false;if(e.type==='f')return!isWatched(e.id)&&e.m<=tonightMin;return sRem(e)>0&&sRem(e)<=tonightMin;}
// Titres originaux (VO) pour que la recherche fonctionne aussi si tu tapes le titre anglais
const ORIG_TITLE={
  cap1:"Captain America: The First Avenger", hulk:"The Incredible Hulk",
  thor2:"Thor: The Dark World", cap2:"Captain America: The Winter Soldier",
  gotg1:"Guardians of the Galaxy", gotg2:"Guardians of the Galaxy Vol. 2",
  avengers2:"Avengers: Age of Ultron", cap3:"Captain America: Civil War",
  antman2:"Ant-Man and the Wasp", falcon:"The Falcon and the Winter Soldier",
  shehulk:"She-Hulk: Attorney at Law", quantumania:"Ant-Man and the Wasp: Quantumania",
  gotg3:"Guardians of the Galaxy Vol. 3", eternals:"Eternals",
  xlaststand:"X-Men: The Last Stand", thewolverine:"The Wolverine",
  newmutants:"The New Mutants", fantasticfour:"The Fantastic Four: First Steps",
  marvels:"The Marvels", drstrange2:"Doctor Strange in the Multiverse of Madness"
};
function matchSearch(e){
  if(!searchQuery)return true;
  const q=searchQuery.toLowerCase();
  if(e.title.toLowerCase().includes(q))return true;
  const orig=ORIG_TITLE[e.id];
  return orig?orig.toLowerCase().includes(q):false;
}
function nextItem(){for(const e of E){if(!cnt(e))continue;if(isFuture(e))continue;if(e.type==='f'&&!isWatched(e.id))return e;if(e.type==='s'&&sDone(e)<e.count)return e;}return null;}
function daysLeft(){return Math.max(0,Math.ceil((DOOM-new Date())/86400000));}

// Bin-packing (first-fit decreasing) : place chaque contenu restant dans une "soirée" de
// capacité ~150min. Un film seul plus long que 150min prend quand même 1 seule soirée
// (il ne se découpe pas), au lieu du calcul naïf total/150 qui gonflait le nombre de soirées.
function estimateEvenings(units,cap){
  if(!units.length)return 0;
  const arr=units.slice().sort((a,b)=>b-a);
  const bins=[];
  arr.forEach(u=>{
    let placed=false;
    for(let i=0;i<bins.length;i++){if(bins[i]+u<=cap){bins[i]+=u;placed=true;break;}}
    if(!placed)bins.push(u);
  });
  return bins.length;
}

function totals(){
  let t=0,w=0;const ps=SEC.map(()=>({t:0,w:0,n:0,d:0}));
  const remUnits=[];
  E.forEach(e=>{
    if(!cnt(e))return;
    if(isFuture(e))return; // pas encore sorti → exclu des totaux/soirées/countdown
    if(e.type==='f'){
      t+=e.m;ps[e.sec].t+=e.m;ps[e.sec].n++;
      if(isWatched(e.id)){w+=e.m;ps[e.sec].w+=e.m;ps[e.sec].d++;}
      else remUnits.push(e.m);
    }else{
      e.epMins.forEach((m,i)=>{
        const eid=`${e.id}-e${i+1}`;
        t+=m;ps[e.sec].t+=m;ps[e.sec].n++;
        if(isWatched(eid)){w+=m;ps[e.sec].w+=m;ps[e.sec].d++;}
        else remUnits.push(m);
      });
    }
  });
  return{t,w,r:t-w,ps,remUnits};
}
