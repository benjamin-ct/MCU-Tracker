// Shared TMDB request-building logic, extracted from useTmdbPoster (and mirrored
// server-side in worker/index.js, which runs in a separate Cloudflare runtime and so
// keeps its own copy). TMDB offers two key formats on its settings page, a frequent
// source of confusion: a 32-char hex "API Key (v3 auth)" passed as ?api_key=, or a
// long "Read Access Token (v4 auth)" (150+ chars, contains dots) sent as an
// Authorization: Bearer header. isV4Token detects which one the user pasted so either
// works with no manual selection.
import type {TmdbRef} from '../data';

export function isV4Token(key: string): boolean {
  return key.length > 60 || key.includes('.');
}

export interface TmdbRequest {
  url: string;
  init: RequestInit;
}

// Builds the details endpoint request for a movie/tv id, picking query-string vs
// bearer-header auth from the key format.
export function buildTmdbDetailsRequest(ref: TmdbRef, key: string): TmdbRequest {
  const base = `https://api.themoviedb.org/3/${ref.type}/${ref.id}`;
  if (isV4Token(key)) {
    return {url: `${base}?language=fr-FR`, init: {headers: {Authorization: `Bearer ${key}`}}};
  }
  return {url: `${base}?api_key=${key}&language=fr-FR`, init: {}};
}
