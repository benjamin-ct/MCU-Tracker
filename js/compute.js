// ── COMPUTE ──────────────────────────────────────────────
function cnt(e){return mode==='tout'||!e.opt;}
function sDone(e){return e.epMins.filter((_,i)=>isWatched(`${e.id}-e${i+1}`)).length;}
function sRem(e){return e.epMins.reduce((s,m,i)=>s+(isWatched(`${e.id}-e${i+1}`)?0:m),0);}
function fitsTonight(e){if(tonightMin<=0||isFuture(e))return false;if(e.type==='f')return!isWatched(e.id)&&e.m<=tonightMin;return sRem(e)>0&&sRem(e)<=tonightMin;}
// La recherche matche aussi le titre anglais (TITLE_EN, data-en.js) même en affichage
// français (pour que taper "iron man" marche quelle que soit la langue active), ainsi
// que le casting et la réalisation (INFO[id].cast/.director) pour chercher par acteur
// ou réalisateur.
function matchSearch(e){
  if(!searchQuery)return true;
  const q=searchQuery.toLowerCase();
  if(e.title.toLowerCase().includes(q))return true;
  const orig=TITLE_EN[e.id];
  if(orig&&orig.toLowerCase().includes(q))return true;
  const info=INFO[e.id];
  if(info?.cast&&info.cast.toLowerCase().includes(q))return true;
  if(info?.director&&info.director.toLowerCase().includes(q))return true;
  return false;
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
