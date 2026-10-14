// New in the "grid of posters" redesign — lets the catalog switch between the classic
// row list (full inline controls: episode-by-episode toggling, rating, bulk-select…)
// and a poster-forward grid for browsing. Same button-group look as SortToggle/
// ViewFilterToggle (shared FilterGroup.module.css).
import type { Lang, ViewLayout } from '../../data';
import { t } from '../../i18n';
import styles from './FilterGroup.module.css';

interface LayoutToggleProps {
  viewLayout: ViewLayout;
  lang: Lang;
  onChange: (viewLayout: ViewLayout) => void;
}

export function LayoutToggle({ viewLayout, lang, onChange }: LayoutToggleProps) {
  return (
    <div className={styles.fltGrp}>
      <button
        type="button"
        className={viewLayout === 'list' ? `${styles.fltBtn} ${styles.on}` : styles.fltBtn}
        onClick={() => onChange('list')}
      >
        {t(lang, 'layoutList')}
      </button>
      <button
        type="button"
        className={viewLayout === 'grid' ? `${styles.fltBtn} ${styles.on}` : styles.fltBtn}
        onClick={() => onChange('grid')}
      >
        {t(lang, 'layoutGrid')}
      </button>
    </div>
  );
}
