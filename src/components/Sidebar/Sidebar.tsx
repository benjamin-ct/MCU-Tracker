import type { CatalogEntry, Lang, SortMode, ViewFilter, ViewLayout } from '../../data';
import { ActionButtons } from './ActionButtons';
import { BulkExpand } from './BulkExpand';
import { FilterMenu } from './FilterMenu';
import { NextUpCard } from './NextUpCard';
import styles from './Sidebar.module.css';

interface SidebarProps {
  lang: Lang;
  next: CatalogEntry | null;
  nextEpisodeIndex: number;
  tonightMin: number;
  futurePendingCount: number;
  sortMode: SortMode;
  viewLayout: ViewLayout;
  viewFilter: ViewFilter;
  onMarkNext: () => void;
  onSurprise: () => void;
  onOpenStats: () => void;
  onSortChange: (sortMode: SortMode) => void;
  onViewLayoutChange: (viewLayout: ViewLayout) => void;
  onViewFilterChange: (viewFilter: ViewFilter) => void;
  onTonightStepUp: () => void;
  onTonightStepDown: () => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

export function Sidebar({
  lang,
  next,
  nextEpisodeIndex,
  tonightMin,
  futurePendingCount,
  sortMode,
  viewLayout,
  viewFilter,
  onMarkNext,
  onSurprise,
  onOpenStats,
  onSortChange,
  onViewLayoutChange,
  onViewFilterChange,
  onTonightStepUp,
  onTonightStepDown,
  onExpandAll,
  onCollapseAll,
}: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <NextUpCard
        next={next}
        nextEpisodeIndex={nextEpisodeIndex}
        tonightMin={tonightMin}
        futurePendingCount={futurePendingCount}
        lang={lang}
        onMarkNext={onMarkNext}
      />
      <ActionButtons lang={lang} onSurprise={onSurprise} onOpenStats={onOpenStats} />
      <FilterMenu
        lang={lang}
        sortMode={sortMode}
        viewLayout={viewLayout}
        viewFilter={viewFilter}
        tonightMin={tonightMin}
        onSortChange={onSortChange}
        onViewLayoutChange={onViewLayoutChange}
        onViewFilterChange={onViewFilterChange}
        onTonightStepUp={onTonightStepUp}
        onTonightStepDown={onTonightStepDown}
      />
      <BulkExpand lang={lang} onExpandAll={onExpandAll} onCollapseAll={onCollapseAll} />
    </aside>
  );
}
