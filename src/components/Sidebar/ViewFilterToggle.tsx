// Ported from the second .flt-grp in the legacy index.html (flt-all/flt-todo).
// Named ViewFilterToggle rather than ViewFilter to avoid clashing with the
// ViewFilter type in data/types.
import type { Lang, ViewFilter } from '../../data/types';
import { t } from '../../i18n';

interface ViewFilterToggleProps {
  viewFilter: ViewFilter;
  lang: Lang;
  onChange: (viewFilter: ViewFilter) => void;
}

export function ViewFilterToggle({ viewFilter, lang, onChange }: ViewFilterToggleProps) {
  return (
    <div className="flt-grp">
      <button type="button" className={viewFilter === 'all' ? 'flt-btn on' : 'flt-btn'} onClick={() => onChange('all')}>
        {t(lang, 'filterAll')}
      </button>
      <button
        type="button"
        className={viewFilter === 'todo' ? 'flt-btn on' : 'flt-btn'}
        onClick={() => onChange('todo')}
      >
        {t(lang, 'filterTodo')}
      </button>
    </div>
  );
}
