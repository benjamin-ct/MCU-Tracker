import type {ReactNode} from 'react';
import type {CatalogGroup} from '../../utils/groups';
import type {Lang} from '../../data/types';
import {ROMANS} from '../../data/sections';
import {getSectionNames} from '../../data/localize';
import styles from './ChapterGroup.module.css';

interface ChapterGroupProps {
  group: CatalogGroup;
  isOpen: boolean;
  badgeText: string;
  lang: Lang;
  onToggleOpen: () => void;
  children: ReactNode;
}

export function ChapterGroup({ group, isOpen, badgeText, lang, onToggleOpen, children }: ChapterGroupProps) {
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
        <span className={styles.arr}/>
      </div>
      <div className={styles.chBody}>{children}</div>
    </div>
  );
}
