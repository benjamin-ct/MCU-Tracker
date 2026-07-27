// Ported from computeChartGeom()/renderChartSVG()/wireChartInteraction()/
// fmtShortDate() (legacy js/modals.js). touchmove needs a manually-attached
// { passive: false } listener rather than React's onTouchMove prop: React attaches
// touch handlers as passive by default, which silently breaks preventDefault() and
// lets the page scroll instead of dragging the chart's tooltip on mobile — the exact
// interaction the legacy app's own comment called out needing this for.
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Lang } from '../../data/types';
import { getMonthNames } from '../../data/localize';
import { t } from '../../i18n';
import { fmt } from '../../utils/format';
import type { CumulativePoint } from '../../utils/stats';

const CHART_WIDTH = 600;
const CHART_HEIGHT = 132;
const PAD_X = 6;
const PAD_BOTTOM = 22;
const PAD_TOP = 8;

interface ChartPoint {
  x: number;
  y: number;
  date: string;
  cum: number;
}

function computeGeom(series: CumulativePoint[]): ChartPoint[] {
  const maxY = series[series.length - 1]?.cum || 1;
  const n = series.length;
  return series.map((point, i) => ({
    x: PAD_X + (n > 1 ? (i / (n - 1)) * (CHART_WIDTH - PAD_X * 2) : 0),
    y: CHART_HEIGHT - PAD_BOTTOM - (point.cum / maxY) * (CHART_HEIGHT - PAD_BOTTOM - PAD_TOP),
    date: point.date,
    cum: point.cum,
  }));
}

function fmtShortDate(iso: string, monthNames: string[]): string {
  const date = new Date(`${iso}T00:00:00`);
  return `${date.getDate()} ${monthNames[date.getMonth()]}`;
}

interface CumulativeChartProps {
  series: CumulativePoint[];
  totalMinutes: number;
  lang: Lang;
}

export function CumulativeChart({ series, totalMinutes, lang }: CumulativeChartProps) {
  const monthNames = getMonthNames(lang);
  const points = useMemo(() => computeGeom(series), [series]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handlePointer = (clientX: number) => {
    const svg = svgRef.current;
    if (!svg || points.length === 0) return;
    const rect = svg.getBoundingClientRect();
    if (rect.width === 0) return;
    const relativeX = Math.max(0, Math.min(CHART_WIDTH, ((clientX - rect.left) / rect.width) * CHART_WIDTH));
    let nearestIndex = 0;
    let best = Infinity;
    points.forEach((point, i) => {
      const distance = Math.abs(point.x - relativeX);
      if (distance < best) {
        best = distance;
        nearestIndex = i;
      }
    });
    setHoverIndex(nearestIndex);
  };

  const handlePointerRef = useRef(handlePointer);
  handlePointerRef.current = handlePointer;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches[0]) {
        handlePointerRef.current(event.touches[0].clientX);
        event.preventDefault();
      }
    };
    svg.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => svg.removeEventListener('touchmove', handleTouchMove);
  }, []);

  if (series.length < 2) {
    return <div className="chart-empty">{t(lang, 'chartEmptyMsg')}</div>;
  }

  const hide = () => setHoverIndex(null);
  const lineStr = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const areaPts = `${PAD_X},${CHART_HEIGHT - PAD_BOTTOM} ${lineStr} ${CHART_WIDTH - PAD_X},${CHART_HEIGHT - PAD_BOTTOM}`;
  const firstLabel = fmtShortDate(points[0].date, monthNames);
  const lastLabel = fmtShortDate(points[points.length - 1].date, monthNames);
  const hovered = hoverIndex !== null ? points[hoverIndex] : null;
  const hoveredPercent = hovered && totalMinutes > 0 ? Math.round((hovered.cum / totalMinutes) * 100) : 0;
  const tooltipLeftPercent = hovered ? Math.max(6, Math.min(94, (hovered.x / CHART_WIDTH) * 100)) : 0;

  return (
    <div className="chart-inner">
      <div className="chart-tip" style={{ opacity: hovered ? 1 : 0, left: `${tooltipLeftPercent}%` }}>
        {hovered ? (
          <>
            <b>{fmt(hovered.cum)}</b> · {hoveredPercent}% — {fmtShortDate(hovered.date, monthNames)}
          </>
        ) : null}
      </div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        style={{ width: '100%', height: '112px', display: 'block', touchAction: 'none' }}
        onPointerMove={(event) => handlePointer(event.clientX)}
        onPointerDown={(event) => handlePointer(event.clientX)}
        onPointerLeave={hide}
        onMouseMove={(event) => handlePointer(event.clientX)}
        onMouseLeave={hide}
        onTouchStart={(event) => {
          if (event.touches[0]) handlePointer(event.touches[0].clientX);
        }}
        onTouchEnd={hide}
      >
        <polygon points={areaPts} fill="rgba(56,191,80,.14)" />
        <line
          className="chart-vline"
          x1={hovered ? hovered.x : 0}
          y1={6}
          x2={hovered ? hovered.x : 0}
          y2={CHART_HEIGHT - PAD_BOTTOM}
          stroke="var(--dim)"
          strokeOpacity={0.5}
          strokeWidth={1}
          opacity={hovered ? 1 : 0}
        />
        <polyline points={lineStr} fill="none" stroke="#38BF50" strokeWidth={2.2} strokeLinejoin="round" strokeLinecap="round" />
        <circle
          className="chart-marker"
          r={4}
          fill="#38BF50"
          stroke="var(--card)"
          strokeWidth={1.5}
          cx={hovered ? hovered.x : 0}
          cy={hovered ? hovered.y : 0}
          opacity={hovered ? 1 : 0}
        />
        <text x={PAD_X} y={CHART_HEIGHT - 6} fontFamily="DM Mono, monospace" fontSize={9} fill="var(--faint)">
          {firstLabel}
        </text>
        <text
          x={CHART_WIDTH - PAD_X}
          y={CHART_HEIGHT - 6}
          fontFamily="DM Mono, monospace"
          fontSize={9}
          fill="var(--faint)"
          textAnchor="end"
        >
          {lastLabel}
        </text>
      </svg>
    </div>
  );
}
