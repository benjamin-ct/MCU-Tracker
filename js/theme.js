// ── THEME (clair/sombre) ───────────────────────────────────
// Au tout premier chargement (rien en localStorage), on part de la préférence
// système ; ensuite, le choix manuel de l'utilisateur (persisté) a toujours
// priorité — comme pour `lang`, il n'y a qu'un seul état, jamais de resynchro
// depuis le système une fois qu'un choix explicite a été fait.
function systemPrefersLight(){
  return!!(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches);
}
function applyTheme(theme){
  document.documentElement.setAttribute('data-theme',theme);
  const meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.content=theme==='light'?'#F3F6F2':'#080C09';
  const btn=document.getElementById('theme-btn');
  if(btn)btn.textContent=theme==='light'?'🌙':'☀️';
  lsSet('mcu-theme',theme);
}
function initTheme(){
  const saved=lsGet('mcu-theme');
  applyTheme(saved==='light'||saved==='dark'?saved:(systemPrefersLight()?'light':'dark'));
}
function toggleTheme(){
  const cur=document.documentElement.getAttribute('data-theme')==='light'?'light':'dark';
  applyTheme(cur==='light'?'dark':'light');
}
