// ── STARS ────────────────────────────────────────────────
function starsHTML(id,isSeries){
  const r=ratings[id]||0;
  return`<div class="${isSeries?'sg-stars':'stars'}" data-id="${id}">`+[1,2,3,4,5].map(v=>`<span class="star${v<=r?' lit':''}" data-v="${v}">★</span>`).join('')+`</div>`;
}
function refreshStars(id,isSeries){
  const el=document.querySelector(`.${isSeries?'sg-stars':'stars'}[data-id="${id}"]`);
  if(!el)return;const r=ratings[id]||0;
  el.querySelectorAll('.star').forEach(s=>s.classList.toggle('lit',parseInt(s.dataset.v)<=r));
}
document.addEventListener('click',ev=>{
  if(!ev.target.classList.contains('star'))return;
  const row=ev.target.closest('[data-id]');
  if(!row||(!row.classList.contains('stars')&&!row.classList.contains('sg-stars')))return;
  const id=row.dataset.id;const v=parseInt(ev.target.dataset.v);
  ratings[id]=ratings[id]===v?0:v;
  refreshStars(id,row.classList.contains('sg-stars'));
  save();
});

// ── TOAST ──────────────────────────────────────────────
let toastTimer=null;
function showToast(msg){
  const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),3000);
}

// ── UPDATE STATS ─────────────────────────────────────────
function updateStats(){
  const{t,w,r,ps,remUnits}=totals();const pct=t>0?Math.round(w/t*100):0;
  const f=document.getElementById('fill');
  f.style.width=pct+'%';f.classList.toggle('glow',pct>0&&pct<100);
  const rh=Math.floor(r/60),rm=r%60;
  document.getElementById('sv').textContent=rh;
  document.getElementById('su').textContent=rm>0?`h${String(rm).padStart(2,'0')}`:'h';
  document.getElementById('c1').innerHTML=`<b>${Math.floor(w/60)}h</b> vues`;
  document.getElementById('c2').innerHTML=`<b>${pct}%</b> terminé`;
  document.getElementById('c3').innerHTML=`≈<b>${estimateEvenings(remUnits,150)}</b> soirées`;
  ps.forEach((s,i)=>{const el=document.getElementById(`cb${i}`);if(el)el.textContent=`${s.d}/${s.n} · ${fmt(s.t-s.w)}`;});
  updateCountdown(r);
}

// ── COUNTDOWN ──────────────────────────────────────────
// Nombre de contenus pas encore sortis qu'il reste à voir (jamais cochables tant
// qu'ils ne sont pas sortis, donc toujours "en attente" par définition).
function futurePendingCount(){
  let n=0;
  E.forEach(e=>{
    if(!cnt(e)||!isFuture(e))return;
    if(e.type==='f'){if(!isWatched(e.id))n++;}
    else{if(sDone(e)<e.count)n++;}
  });
  return n;
}

function updateCountdown(rem){
  const days=daysLeft();
  const txt=document.getElementById('cdwn-txt');const dEl=document.getElementById('cdwn-days');
  if(!txt)return;dEl.textContent=`${days}j`;
  if(rem===0){
    const fp=futurePendingCount();
    if(fp>0){
      // Tout ce qui est disponible est vu, mais du contenu pas encore sorti reste à voir
      // plus tard — on évite d'annoncer un "prêt pour Doomsday" techniquement faux.
      txt.innerHTML=`Tout vu de disponible <span class="ok">✓</span> · <b>${fp}</b> titre${fp>1?'s':''} pas encore sorti${fp>1?'s':''} restant${fp>1?'s':''}`;
    }else{
      txt.innerHTML=`Marathon terminé ! Prêt pour Doomsday. <span class="ok">✓</span>`;
    }
    return;
  }
  if(days<=0){txt.innerHTML=`<b>Doomsday est là !</b> 🎬`;return;}
  const h=rem/days,cls=h>120?'warn':'ok';
  txt.innerHTML=`Doomsday — 18 déc 2026 · <b>${fmt(Math.ceil(h))}/jour</b> pour finir <span class="${cls}">${h>120?'⚡':'✓'}</span>`;
}

// ── PROCHAIN ─────────────────────────────────────────────
function updateProchain(){
  const el=document.getElementById('prochain');if(!el)return;
  const next=nextItem();
  if(!next){
    const fp=futurePendingCount();
    const msg=fp>0?`🎬 Tout est vu de disponible — ${fp} titre${fp>1?'s':''} pas encore sorti${fp>1?'s':''}`:'🎬 Marathon terminé — bravo !';
    el.innerHTML=`<div style="padding:12px 0"><div class="prox done">${msg}</div></div>`;return;
  }
  let title,sub,dur,btn,nm=0;
  if(next.type==='f'){title=next.title;sub=next.y?`(${next.y})`:'';dur=fmt(next.m);btn='Marquer vu';nm=next.m;}
  else{const idx=next.epMins.findIndex((_,i)=>!isWatched(`${next.id}-e${i+1}`));title=next.title;sub=`S${next.season}·E${idx+1}`;dur=fmtE(next.epMins[idx]);btn='Épisode vu';nm=next.epMins[idx];}
  const fits=tonightMin>0&&nm<=tonightMin;
  el.innerHTML=`<div style="padding:12px 0 0"><div class="prox">
    <div class="prox-l">
      <div class="prox-eye">Prochain à voir</div>
      <div class="prox-title">${title}</div>
      <div class="prox-sub">${sub?sub+' · ':''}${dur}${fits?` · <span style="color:var(--green);font-size:10px">ce soir ✓</span>`:''}</div>
    </div>
    <button class="prox-btn" id="prox-go">${btn}</button>
  </div></div>`;
  document.getElementById('prox-go')?.addEventListener('click',advanceNext);
}

// Marque l'item "prochain" comme vu, puis relance un render() complet.
// Un render() complet (plutôt que patcher chaque élément à la main) garantit que
// TOUT reste synchronisé d'un coup : lien Disney+ qui disparaît, étoiles, badge
// restant, date de visionnage, flèche — une seule source de vérité, plus de bug d'oubli.
function advanceNext(){
  const next=nextItem();if(!next)return;
  if(next.type==='f'){
    markWatched(next.id);
  }else{
    const idx=next.epMins.findIndex((_,i)=>!isWatched(`${next.id}-e${i+1}`));if(idx<0)return;
    markWatched(`${next.id}-e${idx+1}`);
    // Auto-replie la série une fois son dernier épisode coché
    if(sDone(next)===next.count)cSer.add(next.id);
  }
  render();save();
}

// ── TONIGHT ──────────────────────────────────────────────
function applyTonightHL(){
  E.forEach(e=>{
    if(e.type==='f'){const r=document.getElementById(`r-${e.id}`);if(r)r.classList.toggle('tn-fit',fitsTonight(e));}
    else{const sg=document.getElementById(`sg-${e.id}`);if(sg)sg.classList.toggle('tn-fit',fitsTonight(e));}
  });
}
const TN=[0,30,60,90,120,150,180,240];
function tnDisp(m){return m===0?'off':m<60?m+'m':fmt(m);}

// ── RENDER ───────────────────────────────────────────────
function render(){
  const main=document.getElementById('main');main.innerHTML='';
  const isSearching=searchQuery.length>0;
  let searchTotal=0;
  [0,1,2,3].forEach(si=>{
    const entries=E.filter(e=>e.sec===si&&cnt(e)&&matchSearch(e));
    if(isSearching&&entries.length===0)return;
    // En mode "À voir" : si plus rien ne reste à voir dans ce chapitre (les items pas
    // encore sortis comptent toujours comme "restants"), on masque le chapitre en
    // entier plutôt que de laisser un en-tête vide flotter sans aucun contenu dessous.
    // En mode "À voir", seules les entrées non terminées restent visibles (le reste est
    // masqué en CSS via body.view-todo) — le compteur de résultats doit refléter ça, pas
    // le nombre total d'entrées correspondantes.
    let visible=entries;
    if(viewFilter==='todo'){
      visible=entries.filter(e=>e.type==='f'?!isWatched(e.id):sDone(e)<e.count);
      if(visible.length===0)return;
    }
    searchTotal+=visible.length;
    const ch=document.createElement('div');
    ch.className='ch'+(cSec.has(si)?'':' open');ch.id=`ch${si}`;
    const hd=document.createElement('div');hd.className='ch-hd';
    hd.innerHTML=`<span class="ch-rom">${ROMANS[si]}</span><span class="ch-name">${SEC[si]}</span><span class="ch-badge" id="cb${si}"></span><span class="arr"></span>`;
    hd.addEventListener('click',()=>{ch.classList.toggle('open');if(ch.classList.contains('open'))cSec.delete(si);else cSec.add(si);});
    const body=document.createElement('div');body.className='ch-body';
    entries.forEach(e=>{
      const tnFit=fitsTonight(e);const platInfo=PLAT[e.id];const future=isFuture(e);
      const opt=e.opt?`<span class="opt-badge">optionnel</span>`:'';
      const plat=platInfo?`<span class="plat-tag ${platInfo.c}">${platInfo.l} · ${platInfo.date}</span>`:'';
      if(e.type==='f'){
        const isDone=isWatched(e.id);
        // Le lien D+ disparaît une fois le contenu vu, et n'apparaît jamais pour du contenu pas encore sorti
        const showDp=!future&&!isDone;
        const dpLink=showDp?`<a class="dp-link" href="${DP_HREF}" data-dp="${e.title.replace(/"/g,'&quot;')}">▶ Disney+</a>`:'';
        const div=document.createElement('div');
        div.className=`row${isDone?' done':''}${tnFit?' tn-fit':''}${future?' future':''}`;div.id=`r-${e.id}`;
        const yr=e.y?`<span class="rt-yr">(${e.y})</span>`:'';
        // Le bouton 'i' est un vrai FRÈRE du <label> (pas un enfant dedans) : sur mobile,
        // un tap imprécis dans un <label> déclenche quand même la checkbox associée même
        // avec stopPropagation. En le sortant complètement du <label>, il n'y a plus
        // aucune ambiguïté possible — impossible de cocher le film par erreur.
        // Placé juste après le titre (pas après la durée), comme demandé.
        div.innerHTML=`<div class="row-top">
          <label><input type="checkbox" data-id="${e.id}"${isDone?' checked':''}${future?' disabled':''}><span class="sq"></span>
            <span class="rt"><span class="rt-t">${e.title}${yr}${opt}${plat}</span><span class="watch-date">${isDone?fmtDate(watchDates[e.id]):''}</span></span>
          </label>
          <button type="button" class="info-btn" data-info="${e.id}"><span>i</span></button>
          <span class="rt-d">${fmt(e.m)}</span>
          <span class="tn-tag">ce soir</span>
        </div>${dpLink?`<div class="dp-row">${dpLink}</div>`:''}${starsHTML(e.id,false)}`;
        body.appendChild(div);
      }else{
        const done=sDone(e),all=done===e.count;
        const showDp=!future&&!all;
        const dpLink=showDp?`<a class="dp-link" href="${DP_HREF}" data-dp="${e.title.replace(/"/g,'&quot;')}">▶ Disney+</a>`:'';
        const sg=document.createElement('div');
        sg.className=`sg${cSer.has(e.id)?'':' open'}${all?' sg-done':''}${tnFit?' tn-fit':''}${future?' future':''}`;sg.id=`sg-${e.id}`;
        // Titre a toute la ligne pour lui ; le compteur restant est replié dans sg-sub
        // (2e ligne) pour ne plus se chevaucher avec le titre sur les écrans étroits.
        sg.innerHTML=`<div class="sg-hd">
          <div class="sg-bulk"><label onclick="event.stopPropagation()"><input type="checkbox" class="sg-chk" data-sid="${e.id}"${all?' checked':''}${future?' disabled':''}><span class="sq"></span></label></div>
          <div class="sg-info">
            <div class="sg-name">${e.title}${opt}${plat}</div>
            <div class="sg-sub">S${e.season} · ${e.count} éps · <span class="sg-remtxt" id="sr-${e.id}">${done}/${e.count} · ${fmt(sRem(e))}</span><span class="sg-tn-tag">ce soir</span></div>
          </div>
          <button type="button" class="info-btn" data-info="${e.id}"><span>i</span></button>
          <span class="sg-arr"></span>
        </div>${dpLink?`<div class="dp-row dp-row-sg">${dpLink}</div>`:''}${starsHTML(e.id,true)}<ul class="ep-list"></ul>`;
        const sgChk=sg.querySelector('.sg-chk');if(sgChk&&done>0&&!all)sgChk.indeterminate=true;
        sg.querySelector('.sg-hd').addEventListener('click',ev=>{
          if(ev.target.closest('.sg-bulk')||ev.target.closest('.info-btn')||ev.target.classList.contains('dp-link')||ev.target.tagName==='A')return;
          sg.classList.toggle('open');if(sg.classList.contains('open'))cSer.delete(e.id);else cSer.add(e.id);
        });
        sgChk?.addEventListener('change',ev=>{
          ev.stopPropagation();const should=ev.target.checked;
          e.epMins.forEach((_,i)=>{
            const eid=`${e.id}-e${i+1}`;
            if(should)markWatched(eid);else markUnwatched(eid);
          });
          if(should)cSer.add(e.id); // auto-replie une fois tout coché
          render();save();
        });
        const ul=sg.querySelector('.ep-list');
        e.epMins.forEach((m,i)=>{
          const eid=`${e.id}-e${i+1}`;const li=document.createElement('li');
          li.className=`ep-li${isWatched(eid)?' done':''}`;li.id=`ep-${eid}`;
          li.innerHTML=`<label><input type="checkbox" data-id="${eid}"${isWatched(eid)?' checked':''}${future?' disabled':''}><span class="sq s"></span><span class="ep-n">E${String(i+1).padStart(2,'0')}</span><span class="ep-t">Épisode ${i+1}</span><span class="ep-d">${fmtE(m)}</span></label>`;
          ul.appendChild(li);
        });
        body.appendChild(sg);
      }
    });
    ch.appendChild(hd);ch.appendChild(body);main.appendChild(ch);
  });
  main.querySelectorAll('input[type=checkbox]:not(.sg-chk)').forEach(cb=>cb.addEventListener('change',onCheck));
  if(isSearching){srchCntEl.textContent=`${searchTotal} résultat${searchTotal!==1?'s':''}`;srchCntEl.classList.add('vis');}
  updateStats();updateProchain();
}

// ── ON CHECK ─────────────────────────────────────────────
// Simple : on met à jour l'état, puis on relance un render() complet.
// C'est ce qui garantit que le lien Disney+ disparaît bien une fois le film/la
// série coché (avant, on ne patchait que certains éléments à la main et on oubliait
// le lien D+, d'où le bug qu'il ne disparaissait jamais).
function onCheck(ev){
  const id=ev.target.getAttribute('data-id');
  if(ev.target.checked)markWatched(id);else markUnwatched(id);
  // Si cet id est un épisode et que la série vient d'être entièrement terminée,
  // on la replie automatiquement — plus besoin de la garder ouverte une fois finie.
  const m=id.match(/^(.+)-e\d+$/);
  if(m){
    const ent=E.find(x=>x.id===m[1]&&x.type==='s');
    if(ent&&sDone(ent)===ent.count)cSer.add(ent.id);
  }
  render();save();
}
