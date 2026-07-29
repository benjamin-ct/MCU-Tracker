// Ported from setupPWAIcon() (legacy js/app.js): draws the "Add to Home Screen" icon
// on a canvas and appends it as an apple-touch-icon <link> — no static PNG asset to
// keep in sync, and it renders identically regardless of image-loading/CDN issues.
// Runs once on mount; silently no-ops if canvas is unavailable (the static SVG
// favicon in index.html still works either way).
import { useEffect } from 'react';

function drawHexagonPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 90);
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function drawPwaIcon(ctx: CanvasRenderingContext2D): void {
  // Diagonal dark background, consistent with the app's theme.
  const background = ctx.createLinearGradient(0, 0, 180, 180);
  background.addColorStop(0, '#132018');
  background.addColorStop(1, '#050705');
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, 180, 180);

  // Soft glow behind the badge.
  const glow = ctx.createRadialGradient(90, 86, 8, 90, 86, 100);
  glow.addColorStop(0, 'rgba(56,191,80,.28)');
  glow.addColorStop(1, 'rgba(56,191,80,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 180, 180);

  // Gold border of the hexagonal badge.
  drawHexagonPath(ctx, 90, 88, 59);
  ctx.strokeStyle = '#C8941A';
  ctx.lineWidth = 5;
  ctx.stroke();

  // Green gradient fill.
  const hexagonFill = ctx.createLinearGradient(32, 30, 148, 146);
  hexagonFill.addColorStop(0, '#2A9640');
  hexagonFill.addColorStop(1, '#0B1F10');
  drawHexagonPath(ctx, 90, 88, 54);
  ctx.fillStyle = hexagonFill;
  ctx.fill();

  // Subtle top sheen for depth.
  const sheen = ctx.createLinearGradient(90, 34, 90, 88);
  sheen.addColorStop(0, 'rgba(255,255,255,.14)');
  sheen.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = sheen;
  drawHexagonPath(ctx, 90, 88, 54);
  ctx.fill();

  // Monogram.
  ctx.fillStyle = '#F3F1EA';
  ctx.font = '800 64px -apple-system,Helvetica,Arial,sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,.35)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetY = 2;
  ctx.fillText('M', 90, 93);
}

export function usePwaIcon(): void {
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 180;
      canvas.height = 180;
      const ctx = canvas.getContext('2d');
      if (!ctx) return undefined;

      drawPwaIcon(ctx);

      const link = document.createElement('link');
      link.rel = 'apple-touch-icon';
      link.href = canvas.toDataURL('image/png');
      document.head.appendChild(link);
      // Removes the link on cleanup so React StrictMode's dev-mode double-invoke
      // (mount -> cleanup -> mount) doesn't leave a duplicate in <head>.
      return () => {
        document.head.removeChild(link);
      };
    } catch {
      // Canvas unavailable or blocked — the static SVG favicon still works.
      return undefined;
    }
  }, []);
}
