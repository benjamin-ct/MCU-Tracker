import type {CatalogEntry, Lang, SortMode, ViewFilter} from '../../data';
import {ActionButtons} from './ActionButtons';
import {BulkExpand} from './BulkExpand';
import {NextUpCard} from './NextUpCard';
import styles from './Sidebar.module.css';
import {SortToggle} from './SortToggle';
import {TonightStepper} from './TonightStepper';
import {ViewFilterToggle} from './ViewFilterToggle';

interface SidebarProps {
  lang: Lang;
  next: CatalogEntry | null;
  nextEpisodeIndex: number;
  tonightMin: number;
  futurePendingCount: number;
  sortMode: SortMode;
  viewFilter: ViewFilter;
  onMarkNext: () => void;
  onSurprise: () => void;
  onOpenStats: () => void;
  onSortChange: (sortMode: SortMode) => void;
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
  viewFilter,
  onMarkNext,
  onSurprise,
  onOpenStats,
  onSortChange,
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
      <div className={styles.filterRow}>
        <SortToggle sortMode={sortMode} lang={lang} onChange={onSortChange} />
      </div>
      <div className={styles.filterRow}>
        <ViewFilterToggle viewFilter={viewFilter} lang={lang} onChange={onViewFilterChange} />
        <TonightStepper tonightMin={tonightMin} lang={lang} onStepUp={onTonightStepUp} onStepDown={onTonightStepDown} />
      </div>
      <BulkExpand lang={lang} onExpandAll={onExpandAll} onCollapseAll={onCollapseAll} />
    </aside>
  );
}
