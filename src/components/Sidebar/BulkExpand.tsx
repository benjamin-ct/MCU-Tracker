import type {Lang} from '../../data';
import {t} from '../../i18n';
import styles from './BulkExpand.module.css';

interface BulkExpandProps {
  lang: Lang;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

export function BulkExpand({ lang, onExpandAll, onCollapseAll }: BulkExpandProps) {
  return (
    <div className={styles.bulk}>
      <button type="button" className={styles.bk} onClick={onExpandAll}>
        {t(lang, 'expandAll')}
      </button>
      <button type="button" className={styles.bk} onClick={onCollapseAll}>
        {t(lang, 'collapseAll')}
      </button>
    </div>
  );
}
