// Ported from the .stat-modal shell shared by the stats/info/TMDB-key modals in the
// legacy index.html, plus the Escape-closes-any-open-modal and click-outside-closes
// handlers from js/app.js. There's no open/close CSS transition on the original (just
// display:none/flex via .vis), so unmounting when closed is visually identical to the
// original's class toggle and simpler — it also resets any modal-local state
// (e.g. InfoPoster's fetch) each time it reopens, instead of it going stale.
import { useEffect, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  maxWidthPx?: number;
  children: ReactNode;
}

export function Modal({ open, onClose, maxWidthPx, children }: ModalProps) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="stat-modal vis"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="stat-panel" style={maxWidthPx ? { maxWidth: `${maxWidthPx}px` } : undefined}>
        {children}
      </div>
    </div>
  );
}
