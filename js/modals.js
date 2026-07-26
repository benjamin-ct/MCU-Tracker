// Génère une "affiche" stylisée (dégradé + initiales) — on ne peut pas intégrer les
// vraies affiches officielles (droits d'auteur), et un hotlink vers une base externe
// rendrait le tracker fragile/dépendant du réseau pour un simple fichier local.
const CHAPTER_GRAD=[['#1E7A2C','#0B120C'],['#38BF50','#0F1E13'],['#5B7FD1','#12162A'],['#C8941A','#241C08']];
const STOP_WORDS=new Set(['le','la','les','de','du','des','et','à','a','the','of','and','an','un','une']);
function posterInitials(title){
  const words=title.replace(/[:().!'’]/g,' ').split(/\s+/).filter(Boolean);
  const sig=words.filter(w=>!STOP_WORDS.has(w.toLowerCase()));
  const use=sig.length?sig:words;
  if(use.length===1)return use[0].slice(0,2).toUpperCase();
  return (use[0][0]+use[1][0]).toUpperCase();
}
function renderPoster(e){
  const[c1,c2]=CHAPTER_GRAD[e.sec];
  const icon=e.type==='f'?'🎬':'📺';
  return`<div class="info-poster" id="info-poster-el" style="background:linear-gradient(150deg,${c1},${c2})">
    <span class="info-poster-icon">${icon}</span>
    <span class="info-poster-init">${posterInitials(e.title)}</span>
  </div>`;
}

// Va chercher l'affiche réelle sur TMDB (si une clé est configurée) et remplace
// l'affiche générée en place, sans reconstruire toute la modale. Échec/hors-ligne/
// pas de clé → ne fait simplement rien, l'affiche générée reste affichée.
async function fetchRealPoster(id,tmdbInfo){
  if(!tmdbKey||!tmdbInfo)return;
  const cacheKey=`${tmdbInfo.type}:${tmdbInfo.id}`;
  if(cacheKey in posterCache){
    applyPosterUrl(id,posterCache[cacheKey]);
    return;
  }
  // TMDB propose DEUX types de clés différentes sur leur page réglages, et c'est
  // une confusion très fréquente :
  //  - "Clé API (v3 auth)" : 32 caractères hexadécimaux → passée en ?api_key=...
  //  - "Jeton de lecture API (v4 auth)" : long jeton (souvent 150+ caractères,
  //    contient des points) → doit être envoyé en en-tête Authorization: Bearer ...
  // On détecte automatiquement laquelle a été collée pour que ça marche dans les
  // deux cas, sans que la personne ait besoin de savoir laquelle prendre.
  const isV4=tmdbKey.length>60||tmdbKey.includes('.');
  const url=isV4
    ?`https://api.themoviedb.org/3/${tmdbInfo.type}/${tmdbInfo.id}?language=fr-FR`
    :`https://api.themoviedb.org/3/${tmdbInfo.type}/${tmdbInfo.id}?api_key=${tmdbKey}&language=fr-FR`;
  const opts=isV4?{headers:{Authorization:`Bearer ${tmdbKey}`}}:{};
  try{
    const res=await fetch(url,opts);
    if(!res.ok){
      if(res.status===401)showToast('⚠ Clé TMDB invalide ou expirée');
      else if(res.status===404)showToast('⚠ Titre introuvable sur TMDB');
      else showToast(`⚠ Erreur TMDB (${res.status})`);
      return;
    }
    const data=await res.json();
    const posterUrl=data.poster_path?`https://image.tmdb.org/t/p/w342${data.poster_path}`:null;
    posterCache[cacheKey]=posterUrl;
    lsSet('mcu-poster-cache',JSON.stringify(posterCache));
    if(posterUrl)applyPosterUrl(id,posterUrl);
    else showToast('Pas d\'affiche disponible sur TMDB pour ce titre');
  }catch(err){
    // Erreur réseau : hors-ligne, ou requête bloquée par l'environnement (CSP d'un
    // aperçu embarqué, par exemple). On informe plutôt que d'échouer en silence.
    showToast('⚠ Impossible de contacter TMDB (réseau bloqué ou hors-ligne)');
  }
}
function applyPosterUrl(id,url){
  if(!url)return;
  const el=document.getElementById('info-poster-el');
  if(!el||el.dataset.forId!==id)return;
  // Précharge via un vrai <img> pour détecter un échec de chargement (image
  // bloquée par l'environnement, URL invalide, hors-ligne...) et ne JAMAIS
  // remplacer l'affiche générée si ça échoue — pas de carré noir/cassé, le joli
  // dégradé + initiales reste affiché dans ce cas.
  const probe=new Image();
  probe.onload=()=>{
    if(el.dataset.forId!==id)return; // l'utilisateur a pu ouvrir une autre fiche entre-temps
    el.style.backgroundImage=`url('${url}')`;
    el.style.backgroundSize='cover';
    el.style.backgroundPosition='center';
    const init=el.querySelector('.info-poster-init');if(init)init.style.display='none';
  };
  probe.onerror=()=>{
    // Échec silencieux : l'affiche générée reste en place, rien à casser.
  };
  probe.src=url;
}

function openInfo(id){
  const e=E.find(x=>x.id===id);if(!e)return;
  const info=INFO[id];const platInfo=PLAT[id];
  const durTxt=e.type==='f'?fmt(e.m):`${e.count} épisode${e.count>1?'s':''} · ${fmt(e.epMins.reduce((a,b)=>a+b,0))}`;
  const yearTxt=e.type==='f'&&e.y?e.y:'';
  const panel=document.getElementById('info-panel');
  // Chiffres : budget/box-office/notes — n'affiche que ce qui est réellement disponible
  const nums=[];
  if(info?.budget&&info.budget!=='N/A')nums.push(`<div class="num-card"><div class="num-v">${info.budget}</div><div class="num-l">Budget</div></div>`);
  if(info?.box&&info.box!=='N/A')nums.push(`<div class="num-card"><div class="num-v">${info.box}</div><div class="num-l">${info.box.startsWith('TBD')?'Box-office':'Box-office mondial'}</div></div>`);
  if(info?.rt)nums.push(`<div class="num-card num-rt"><div class="num-v">${info.rt}</div><div class="num-l">Rotten Tomatoes</div></div>`);
  const trailerBtn=info?.yt&&info.yt.startsWith('http')?`<a class="trailer-btn" href="${info.yt}" target="_blank">▶ Bande-annonce</a>`:'';
  panel.innerHTML=`
    <div class="stat-top">
      ${renderPoster(e)}
      <div class="info-head-text">
        <div class="info-chapter">${ROMANS[e.sec]} · ${SEC[e.sec]}</div>
        <span class="info-title">${e.title}</span>
      </div>
      <button class="stat-close" id="info-close">✕</button>
    </div>
    <div class="info-meta">${yearTxt?`<span>${yearTxt}</span>`:''}<span>${durTxt}</span>${platInfo?`<span class="plat-tag ${platInfo.c}">${platInfo.l} · ${platInfo.date}</span>`:''}${e.opt?`<span class="opt-badge">optionnel</span>`:''}</div>
    ${info?`
      <p class="info-synopsis">${info.synopsis}</p>
      ${nums.length?`<div class="num-grid">${nums.join('')}</div>`:''}
      ${trailerBtn}
      <div class="info-grid">
        <div class="info-row"><span class="info-lbl">Réalisation</span><span>${info.director}</span></div>
        <div class="info-row"><span class="info-lbl">Avec</span><span>${info.cast}</span></div>
        ${info.pc?`<div class="info-row info-pc"><span class="info-lbl">🎬 Post-crédit</span><span>${info.pc}</span></div>`:e.type==='f'?`<div class="info-row"><span class="info-lbl">🎬 Post-crédit</span><span style="color:var(--faint)">Non confirmé pour ce titre</span></div>`:''}
        ${info.triv?`<div class="info-row"><span class="info-lbl">📌 Anecdote</span><span>${info.triv}</span></div>`:''}
        ${info.link?`<div class="info-row"><span class="info-lbl">🔗 Dans la saga</span><span>${info.link}</span></div>`:''}
      </div>
    `:`<p class="info-synopsis" style="color:var(--faint)">Pas encore d'informations détaillées pour ce contenu.</p>`}
  `;
  infoModal.classList.add('vis');
  document.getElementById('info-close').addEventListener('click',()=>infoModal.classList.remove('vis'));
  const posterEl=document.getElementById('info-poster-el');
  if(posterEl)posterEl.dataset.forId=id;
  // Priorité à l'affiche statique vérifiée (pas besoin de clé API, marche pour tout
  // le monde) ; sinon, si une clé TMDB est configurée, tentative de récupération live.
  if(info?.poster){
    applyPosterUrl(id,`https://image.tmdb.org/t/p/w342${info.poster}`);
  }else if(info?.tmdb){
    fetchRealPoster(id,info.tmdb);
  }
}

// Construit la série cumulée (minutes vues au fil des jours) à partir de watchDates
function buildCumulativeSeries(){
  const byDate={};
  E.forEach(e=>{
    if(e.type==='f'){
      if(isWatched(e.id)&&watchDates[e.id]){const d=watchDates[e.id].slice(0,10);byDate[d]=(byDate[d]||0)+e.m;}
    }else{
      e.epMins.forEach((m,i)=>{
        const eid=`${e.id}-e${i+1}`;
        if(isWatched(eid)&&watchDates[eid]){const d=watchDates[eid].slice(0,10);byDate[d]=(byDate[d]||0)+m;}
      });
    }
  });
  const dates=Object.keys(byDate).sort();
  let cum=0;
  return dates.map(d=>{cum+=byDate[d];return{date:d,cum};});
}
function fmtShortDate(iso){const d=new Date(iso+'T00:00:00');return`${d.getDate()} ${MONTHS[d.getMonth()]}`;}

// Calcule les coordonnées SVG des points de la courbe (séparé du HTML pour pouvoir
// réutiliser les mêmes points lors du survol/tap, sans les recalculer autrement).
function computeChartGeom(series){
  const w=600,h=132,pad=6,padB=22,padT=8;
  const maxY=series[series.length-1].cum||1;
  const n=series.length;
  const pts=series.map((s,i)=>{
    const x=pad+(n>1?(i/(n-1))*(w-pad*2):0);
    const y=(h-padB)-(s.cum/maxY)*(h-padB-padT);
    return{x,y,date:s.date,cum:s.cum};
  });
  return{w,h,pad,padB,pts};
}

function renderChartSVG(geom){
  if(!geom)return`<div class="chart-empty">Regarde et coche des contenus sur plusieurs jours différents pour voir ta courbe de progression ici.</div>`;
  const{w,h,pad,padB,pts}=geom;
  const lineStr=pts.map(p=>`${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const areaPts=`${pad},${h-padB} ${lineStr} ${w-pad},${h-padB}`;
  const lbl1=fmtShortDate(pts[0].date),lbl2=fmtShortDate(pts[pts.length-1].date);
  return`<div class="chart-inner">
    <div class="chart-tip" id="chart-tip"></div>
    <svg viewBox="0 0 ${w} ${h}" id="cum-chart-svg" style="width:100%;height:112px;display:block;touch-action:none;">
      <polygon points="${areaPts}" fill="rgba(56,191,80,.14)"/>
      <line class="chart-vline" x1="0" y1="6" x2="0" y2="${h-padB}" stroke="rgba(255,255,255,.18)" stroke-width="1" opacity="0"></line>
      <polyline points="${lineStr}" fill="none" stroke="#38BF50" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
      <circle class="chart-marker" r="4" fill="#38BF50" stroke="#0D1210" stroke-width="1.5" opacity="0"></circle>
      <text x="${pad}" y="${h-6}" font-family="DM Mono, monospace" font-size="9" fill="#3E5240">${lbl1}</text>
      <text x="${w-pad}" y="${h-6}" font-family="DM Mono, monospace" font-size="9" fill="#3E5240" text-anchor="end">${lbl2}</text>
    </svg>
  </div>`;
}

// Survol/tap sur la courbe : trouve le point le plus proche du curseur et affiche
// une bulle avec le temps cumulé + le pourcentage à cette date précise.
function wireChartInteraction(svgEl,tipEl,geom,totalMin){
  if(!svgEl||!tipEl||!geom||!geom.pts.length)return;
  const{w,pts}=geom;
  const marker=svgEl.querySelector('.chart-marker');
  const vline=svgEl.querySelector('.chart-vline');
  function handle(clientX){
    const rect=svgEl.getBoundingClientRect();
    if(rect.width===0)return;
    const relX=Math.max(0,Math.min(w,(clientX-rect.left)/rect.width*w));
    let nearest=pts[0],best=Infinity;
    pts.forEach(p=>{const d=Math.abs(p.x-relX);if(d<best){best=d;nearest=p;}});
    const pct=totalMin>0?Math.round(nearest.cum/totalMin*100):0;
    tipEl.innerHTML=`<b>${fmt(nearest.cum)}</b> · ${pct}% — ${fmtShortDate(nearest.date)}`;
    tipEl.style.opacity='1';
    const leftPct=Math.max(6,Math.min(94,(nearest.x/w*100)));
    tipEl.style.left=leftPct+'%';
    if(marker){marker.setAttribute('cx',nearest.x);marker.setAttribute('cy',nearest.y);marker.setAttribute('opacity','1');}
    if(vline){vline.setAttribute('x1',nearest.x);vline.setAttribute('x2',nearest.x);vline.setAttribute('opacity','1');}
  }
  function hide(){
    tipEl.style.opacity='0';
    if(marker)marker.setAttribute('opacity','0');
    if(vline)vline.setAttribute('opacity','0');
  }
  // Pointer Events (souris + la plupart des navigateurs tactiles modernes)
  svgEl.addEventListener('pointermove',ev=>handle(ev.clientX));
  svgEl.addEventListener('pointerdown',ev=>handle(ev.clientX));
  svgEl.addEventListener('pointerleave',hide);
  // Filet de sécurité : certains webviews/aperçus embarqués gèrent mal les Pointer
  // Events. On rejoue la même logique via les événements souris et tactiles bruts,
  // qui sont universellement supportés depuis toujours.
  svgEl.addEventListener('mousemove',ev=>handle(ev.clientX));
  svgEl.addEventListener('mouseleave',hide);
  svgEl.addEventListener('touchstart',ev=>{if(ev.touches[0])handle(ev.touches[0].clientX);},{passive:true});
  svgEl.addEventListener('touchmove',ev=>{if(ev.touches[0]){handle(ev.touches[0].clientX);ev.preventDefault();}},{passive:false});
  svgEl.addEventListener('touchend',hide);
}

function openStats(){
  const{t,w,r,ps}=totals();const pct=t>0?Math.round(w/t*100):0;
  const allR=E.filter(e=>ratings[e.id]).map(e=>({title:e.title,r:ratings[e.id]}));
  const avg=allR.length?(allR.reduce((s,x)=>s+x.r,0)/allR.length).toFixed(1):null;
  const top=[...allR].sort((a,b)=>b.r-a.r).slice(0,5);
  const weekAgo=new Date(Date.now()-7*86400000).toISOString();
  const thisWeek=Object.values(watchDates).filter(d=>d>=weekAgo).length;
  function starsStr(n){return'★'.repeat(n)+'☆'.repeat(5-n);}
  const series=buildCumulativeSeries();
  const geom=series.length>=2?computeChartGeom(series):null;
  const panel=document.getElementById('stat-panel');
  panel.innerHTML=`
    <div class="stat-top"><span class="stat-h2">📊 Statistiques</span><button class="stat-close" id="stat-close">✕</button></div>
    <div class="sgrid">
      <div class="scard"><div class="scard-v">${Math.floor(w/60)}h</div><div class="scard-l">Temps visionné</div></div>
      <div class="scard"><div class="scard-v">${pct}%</div><div class="scard-l">Complété</div></div>
      <div class="scard"><div class="scard-v">${Math.floor(r/60)}h</div><div class="scard-l">Restant</div></div>
      <div class="scard"><div class="scard-v">${thisWeek}</div><div class="scard-l">Cette semaine</div></div>
    </div>
    <div class="ssec-title">Progression cumulée ${geom?'<span style="font-weight:400;text-transform:none;color:var(--faint)">— survole ou touche la courbe</span>':''}</div>
    <div class="chart-wrap">${renderChartSVG(geom)}</div>
    <div class="ssec-title">Progression par chapitre</div>
    ${ps.map((s,i)=>{const p=s.t>0?Math.round(s.w/s.t*100):0;return`<div class="srow"><div class="srow-hd"><span class="srow-n">${SEC[i]}</span><span class="srow-p">${p}% · ${fmt(s.w)}</span></div><div class="sbar"><div class="sbar-f" style="width:${p}%"></div></div></div>`;}).join('')}
    ${allR.length>0?`
      <div class="sttitle">⭐ Meilleures notes · Moyenne ${avg}/5 (${allR.length} noté${allR.length>1?'s':''})</div>
      ${top.map((x,i)=>`<div class="stop-row"><span class="stop-rank">${i+1}</span><span class="stop-title">${x.title}</span><span class="stop-stars">${starsStr(x.r)}</span></div>`).join('')}
    `:`<div class="s-empty">Note les contenus après les avoir cochés pour voir tes stats ici.</div>`}
  `;
  statModal.classList.add('vis');
  document.getElementById('stat-close').addEventListener('click',()=>statModal.classList.remove('vis'));
  if(geom)wireChartInteraction(document.getElementById('cum-chart-svg'),document.getElementById('chart-tip'),geom,t);
}
