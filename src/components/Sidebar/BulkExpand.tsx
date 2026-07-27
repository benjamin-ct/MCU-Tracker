// Ported from the .bulk element in the legacy index.html. Expanding/collapsing every
// chapter and series (cGroup/cSer in the legacy js/state.js) is catalog-collapse
// state owned by whatever renders the catalog (task #23/#25) — this component only
// reports the two clicks.
import type { Lang } from '../../data/types';
import { t } from '../../i18n';

interface BulkExpandProps {
  lang: Lang;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

export function BulkExpand({ lang, onExpandAll, onCollapseAll }: BulkExpandProps) {
  return (
    <div className="bulk">
      <button type="button" className="bk" onClick={onExpandAll}>
        {t(lang, 'expandAll')}
      </button>
      <button type="button" className="bk" onClick={onCollapseAll}>
        {t(lang, 'collapseAll')}
      </button>
    </div>
  );
}
