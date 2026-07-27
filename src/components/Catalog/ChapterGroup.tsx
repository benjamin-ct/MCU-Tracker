// Ported from the .ch element built per-chapter in the legacy js/render.js render().
// The header content differs by grouping mode (roman numeral + narrative chapter name
// for "chrono", just the real release year for "release") — see src/utils/groups.ts,
// which returns plain data instead of a pre-built HTML header string.
import type { ReactNode } from 'react';
import type { CatalogGroup } from '../../utils/groups';
import type { Lang } from '../../data/types';
import { ROMANS } from '../../data/sections';
import { getSectionNames } from '../../data/localize';

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
    <div className={isOpen ? 'ch open' : 'ch'} id={`ch-${group.key}`}>
      <div className="ch-hd" onClick={onToggleOpen}>
        {group.kind === 'chrono' ? (
          <>
            <span className="ch-rom">{ROMANS[group.sectionIndex]}</span>
            <span className="ch-name">{getSectionNames(lang)[group.sectionIndex]}</span>
          </>
        ) : (
          <span className="ch-name">{group.year}</span>
        )}
        <span className="ch-badge">{badgeText}</span>
        <span className="arr" />
      </div>
      <div className="ch-body">{children}</div>
    </div>
  );
}
