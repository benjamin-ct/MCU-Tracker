import type { ReactNode } from 'react';

import type { Lang, ViewLayout } from '../../data';
import { getSectionNames, ROMANS } from '../../data';
import type { CatalogGroup } from '../../utils/groups';
import styles from './ChapterGroup.module.css';

interface ChapterGroupProps {
  group: CatalogGroup;
  isOpen: boolean;
  badgeText: string;
  lang: Lang;
  layout: ViewLayout;
  onToggleOpen: () => void;
  children: ReactNode;
}

export function ChapterGroup({ group, isOpen, badgeText, lang, layout, onToggleOpen, children }: ChapterGroupProps) {
  const bodyClassName = layout === 'grid' ? `${styles.chBody} ${styles.chBodyGrid}` : styles.chBody;
  return (
    <div className={isOpen ? `${styles.ch} ${styles.open}` : styles.ch} id={`ch-${group.key}`}>
      <div className={styles.chHd} onClick={onToggleOpen}>
        {group.kind === 'chrono' ? (
          <>
            <span className={styles.chRom}>{ROMANS[group.sectionIndex]}</span>
            <span className={styles.chName}>{getSectionNames(lang)[group.sectionIndex]}</span>
          </>
        ) : (
          <span className={styles.chName}>{group.year}</span>
        )}
        <span className={styles.chBadge}>{badgeText}</span>
        <span className={styles.arr} />
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
