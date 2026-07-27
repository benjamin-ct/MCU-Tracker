import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cloudflare Worker (worker/index.js) serves everything from `dist/` via its
// ASSETS binding and only intercepts /api/tmdb/* itself — see wrangler.jsonc.
// During `vite dev`, that Worker isn't running, so proxy /api/tmdb to nothing
// useful locally; the app already degrades gracefully (falls back to a
// personal TMDB key or the generated gradient poster) when the proxy 404s.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
