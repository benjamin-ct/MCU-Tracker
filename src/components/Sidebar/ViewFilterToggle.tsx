// Ported from the second .flt-grp in the legacy index.html (flt-all/flt-todo).
// Named ViewFilterToggle rather than ViewFilter to avoid clashing with the
// ViewFilter type in data/types.
import type { Lang, ViewFilter } from '../../data';
import { t } from '../../i18n';
import styles from './FilterGroup.module.css';

interface ViewFilterToggleProps {
  viewFilter: ViewFilter;
  lang: Lang;
  onChange: (viewFilter: ViewFilter) => void;
}

export function ViewFilterToggle({ viewFilter, lang, onChange }: ViewFilterToggleProps) {
  return (
    <div className={styles.fltGrp}>
      <button
        type="button"
        className={viewFilter === 'all' ? `${styles.fltBtn} ${styles.on}` : styles.fltBtn}
        onClick={() => onChange('all')}
      >
        {t(lang, 'filterAll')}
      </button>
      <button
        type="button"
        className={viewFilter === 'todo' ? `${styles.fltBtn} ${styles.on}` : styles.fltBtn}
        onClick={() => onChange('todo')}
      >
        {t(lang, 'filterTodo')}
      </button>
    </div>
  );
}
