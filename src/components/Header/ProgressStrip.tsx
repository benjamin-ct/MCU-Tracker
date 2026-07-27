// Ported from the .strip element in the legacy index.html + the .fill width/glow
// logic in updateStats() (js/render.js). The film-reel "holes" decoration either side
// is pure CSS background, no markup needed beyond the empty divs.
interface ProgressStripProps {
  percentComplete: number;
}

export function ProgressStrip({ percentComplete }: ProgressStripProps) {
  const glow = percentComplete > 0 && percentComplete < 100;

  return (
    <div className="strip">
      <div className="holes" />
      <div className="bar">
        <div className={glow ? 'fill glow' : 'fill'} style={{ width: `${percentComplete}%` }} />
      </div>
      <div className="holes" />
    </div>
  );
}
