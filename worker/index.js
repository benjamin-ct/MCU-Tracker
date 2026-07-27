// ── Worker principal (Cloudflare Workers + Static Assets) ──────────────────
// Sert le site statique (index.html/css/js, binding ASSETS ci-dessous, voir
// wrangler.jsonc) et n'intercepte que /api/tmdb/* pour le proxy TMDB — voir
// PROJET-MCU-TRACKER.md, section "Proxy TMDB", pour le contexte complet.
//
// La clé TMDB vit dans la variable d'environnement Cloudflare "TMDB_KEY" (Settings →
// Variables et secrets, type **Secret**, jamais "Variable" en clair) : elle n'est lue
// que côté serveur, ici, et n'est JAMAIS renvoyée au client — seule l'URL d'affiche
// l'est. C'est ce qui permet aux visiteurs de voir les vraies affiches sans avoir à
// générer leur propre clé TMDB.
export default {
  async fetch(request,env){
    const url=new URL(request.url);
    if(url.pathname.startsWith('/api/tmdb/'))return handleTmdbProxy(url,env);
    return env.ASSETS.fetch(request);
  },
};

async function handleTmdbProxy(url,env){
  const json=(body,status=200)=>new Response(JSON.stringify(body),{
    status,
    headers:{'content-type':'application/json','cache-control':'public, max-age=86400'},
  });

  const key=env.TMDB_KEY;
  if(!key)return json({error:'not_configured'},501);

  const parts=url.pathname.split('/').filter(Boolean); // ['api','tmdb','movie','1726']
  const type=parts[2],id=parts[3];
  if((type!=='movie'&&type!=='tv')||!/^\d+$/.test(id||''))return json({error:'invalid_request'},400);

  // TMDB propose deux formats de clé sur leur page réglages (même détecteur côté
  // client, voir js/modals.js) : clé v3 (32 caractères hex, en query string) ou jeton
  // v4 (long, avec des points, en en-tête Authorization).
  const isV4=key.length>60||key.includes('.');
  const tmdbUrl=isV4
    ?`https://api.themoviedb.org/3/${type}/${id}?language=fr-FR`
    :`https://api.themoviedb.org/3/${type}/${id}?api_key=${key}&language=fr-FR`;
  const opts=isV4?{headers:{Authorization:`Bearer ${key}`}}:{};

  let res;
  try{
    res=await fetch(tmdbUrl,opts);
  }catch{
    return json({error:'network'},502);
  }
  // Un 404 TMDB veut dire "pas d'affiche pour ce titre", pas une panne du proxy — on le
  // traite comme une réponse normale (poster:null) plutôt que de déclencher le repli.
  if(res.status===404)return json({poster:null});
  if(!res.ok)return json({error:`tmdb_${res.status}`},502);

  const data=await res.json();
  return json({poster:data.poster_path||null});
}
