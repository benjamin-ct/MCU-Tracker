// ── Proxy TMDB (Cloudflare Pages Function) ─────────────────────────────────
// But : les visiteurs de mcuwatchtimeline.com n'ont plus besoin de générer leur propre
// clé TMDB pour voir les vraies affiches. La clé vit UNIQUEMENT ici, côté serveur, dans
// la variable d'environnement Cloudflare "TMDB_KEY" (Pages → Settings → Environment
// variables) — jamais envoyée au navigateur, contrairement à une clé mise en dur dans le
// JS client qui serait visible par n'importe qui (onglet réseau / voir le code source).
// Le client (js/modals.js, fetchRealPoster) appelle /api/tmdb/<movie|tv>/<id> sans clé ;
// cette fonction ne renvoie jamais que { poster: "/xxx.jpg" | null }, jamais la clé ni la
// réponse TMDB complète.
//
// Si TMDB_KEY n'est pas configurée (site pas encore réglé, ou hébergement autre que
// Cloudflare Pages qui n'exécute pas ce dossier functions/) : on répond 501, et le client
// retombe alors sur une clé TMDB personnelle collée localement si l'utilisateur en a une,
// sinon sur l'affiche générée — jamais de crash, voir js/modals.js.
export async function onRequestGet({params,env}){
  const json=(body,status=200)=>new Response(JSON.stringify(body),{
    status,
    headers:{'content-type':'application/json','cache-control':'public, max-age=86400'},
  });

  const key=env.TMDB_KEY;
  if(!key)return json({error:'not_configured'},501);

  const[type,id]=params.path||[];
  if((type!=='movie'&&type!=='tv')||!/^\d+$/.test(id||''))return json({error:'invalid_request'},400);

  // TMDB propose deux formats de clé sur leur page réglages (voir js/modals.js pour le
  // même détecteur côté client) : clé v3 (32 caractères hex, en query string) ou jeton
  // v4 (long, avec des points, en en-tête Authorization).
  const isV4=key.length>60||key.includes('.');
  const url=isV4
    ?`https://api.themoviedb.org/3/${type}/${id}?language=fr-FR`
    :`https://api.themoviedb.org/3/${type}/${id}?api_key=${key}&language=fr-FR`;
  const opts=isV4?{headers:{Authorization:`Bearer ${key}`}}:{};

  let res;
  try{
    res=await fetch(url,opts);
  }catch(_){
    return json({error:'network'},502);
  }
  // Un 404 TMDB veut dire "pas d'affiche pour ce titre", pas une panne du proxy — on le
  // traite comme une réponse normale (poster:null) plutôt que de déclencher le repli.
  if(res.status===404)return json({poster:null});
  if(!res.ok)return json({error:`tmdb_${res.status}`},502);

  const data=await res.json();
  return json({poster:data.poster_path||null});
}
