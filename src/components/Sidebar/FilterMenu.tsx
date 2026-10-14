// The sort/layout/view/tonight-budget controls used to sit permanently visible in
// the sidebar (one card, always expanded) — moved here behind a single trigger button
// that reveals them as a dropdown, closed by default. Same escape-key convention as
// Modal.tsx; closing on an outside click is this component's own addition (a dropdown,
// unlike a modal, has no backdrop to click).
import { useEffect, useRef, useState } from 'react';

import type { Lang, SortMode, ViewFilter, ViewLayout } from '../../data';
import { t } from '../../i18n';
import styles from './FilterMenu.module.css';
import { LayoutToggle } from './LayoutToggle';
import { SortToggle } from './SortToggle';
import { TonightStepper } from './TonightStepper';
import { ViewFilterToggle } from './ViewFilterToggle';

interface FilterMenuProps {
  lang: Lang;
  sortMode: SortMode;
  viewLayout: ViewLayout;
  viewFilter: ViewFilter;
  tonightMin: number;
  onSortChange: (sortMode: SortMode) => void;
  onViewLayoutChange: (viewLayout: ViewLayout) => void;
  onViewFilterChange: (viewFilter: ViewFilter) => void;
  onTonightStepUp: () => void;
  onTonightStepDown: () => void;
}

export function FilterMenu({
  lang,
  sortMode,
  viewLayout,
  viewFilter,
  tonightMin,
  onSortChange,
  onViewLayoutChange,
  onViewFilterChange,
  onTonightStepUp,
  onTonightStepDown,
}: FilterMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Any setting away from its out-of-the-box default — shown as a dot on the closed
  // trigger so a filter left active isn't silently forgotten once the menu is hidden.
  const hasActiveFilters = viewFilter === 'todo' || tonightMin > 0 || sortMode === 'release' || viewLayout === 'grid';

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        className={open ? `${styles.trigger} ${styles.open}` : styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span className={styles.triggerIcon}>☰</span>
        {t(lang, 'filtersMenuBtn')}
        {hasActiveFilters ? <span className={styles.dot} /> : null}
        <span className={styles.chevron} />
      </button>
      {open ? (
        <div className={styles.panel}>
          <div className={styles.row}>
            <SortToggle sortMode={sortMode} lang={lang} onChange={onSortChange} />
          </div>
          <div className={styles.row}>
            <LayoutToggle viewLayout={viewLayout} lang={lang} onChange={onViewLayoutChange} />
          </div>
          <div className={styles.row}>
            <ViewFilterToggle viewFilter={viewFilter} lang={lang} onChange={onViewFilterChange} />
          </div>
          <div className={styles.row}>
            <TonightStepper
              tonightMin={tonightMin}
              lang={lang}
              onStepUp={onTonightStepUp}
              onStepDown={onTonightStepDown}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
