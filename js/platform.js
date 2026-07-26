// ── DISNEY+ DEEP LINK ────────────────────────────────────
function _getPlatform(){
  const ua=navigator.userAgent||navigator.vendor||window.opera||'';
  if(/android/i.test(ua))return'android';
  if(/iPad|iPhone|iPod/.test(ua)&&!window.MSStream)return'ios';
  if(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1)return'ios';
  return'desktop';
}
const PLATFORM=_getPlatform();

// L'href est calculé une fois : intent:// pour Android, URL HTTPS pour iOS/desktop.
// Sur iOS : un vrai <a href> tapé par l'utilisateur → iOS intercepte la navigation
// → Universal Link → Disney+ s'ouvre directement. PAS de window.open(), PAS de
// preventDefault() : ces deux méthodes empêchent les Universal Links de fonctionner.
// L'utilisateur revient au tracker avec le geste retour iOS.
const _fb=encodeURIComponent('https://play.google.com/store/apps/details?id=com.disney.disneyplus');
const DP_HREF=PLATFORM==='android'
  ?`intent://www.disneyplus.com/fr-fr/#Intent;scheme=https;package=com.disney.disneyplus;S.browser_fallback_url=${_fb};end`
  :'https://www.disneyplus.com/fr-fr/';

// Copie le titre au clic SANS bloquer la navigation (clipboard async, ok de partir avant)
document.addEventListener('click',ev=>{
  const link=ev.target.closest('[data-dp]');
  if(!link)return;
  // PAS de preventDefault() — le <a href> doit naviguer normalement pour que
  // l'Universal Link iOS se déclenche
  const t=link.dataset.dp;
  navigator.clipboard?.writeText(t).catch(()=>{});
  const short=t.length>26?t.slice(0,25)+'…':t;
  showToast(`📋 "${short}" copié — cherche dans Disney+`);
});
