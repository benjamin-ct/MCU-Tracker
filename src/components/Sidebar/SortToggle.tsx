// Ported from the first .flt-grp in the legacy index.html (sort-chrono/sort-release).
// Renders just the button group; the surrounding .flt wrapper is Sidebar.tsx's job
// since a second .flt wrapper also hosts ViewFilterToggle + TonightStepper together.
// Resetting the chapter-collapse state on sort change (cGroup.clear() in the legacy
// app, since group keys differ between chrono/release) is the caller's responsibility.
import type {Lang, SortMode} from '../../data';
import {t} from '../../i18n';
import styles from './FilterGroup.module.css';

interface SortToggleProps {
  sortMode: SortMode;
  lang: Lang;
  onChange: (sortMode: SortMode) => void;
}

export function SortToggle({ sortMode, lang, onChange }: SortToggleProps) {
  return (
    <div className={styles.fltGrp}>
      <button
        type="button"
        className={sortMode === 'chrono' ? `${styles.fltBtn} ${styles.on}` : styles.fltBtn}
        onClick={() => onChange('chrono')}
      >
        {t(lang, 'sortChrono')}
      </button>
      <button
        type="button"
        className={sortMode === 'release' ? `${styles.fltBtn} ${styles.on}` : styles.fltBtn}
        onClick={() => onChange('release')}
      >
        {t(lang, 'sortRelease')}
      </button>
    </div>
  );
}
