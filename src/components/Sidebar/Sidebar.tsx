// Composes the 6 sidebar pieces into the <aside class="sidebar"> from the legacy
// index.html — a straight structural port. Two separate .flt wrappers, matching the
// original: the first holds just the sort toggle, the second holds the view filter
// alongside the tonight stepper (pushed right via .tn-wrap's margin-left:auto).
import type { CatalogEntry, Lang, SortMode, ViewFilter } from '../../data/types';
import { NextUpCard } from './NextUpCard';
import { ActionButtons } from './ActionButtons';
import { SortToggle } from './SortToggle';
import { ViewFilterToggle } from './ViewFilterToggle';
import { TonightStepper } from './TonightStepper';
import { BulkExpand } from './BulkExpand';

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
    <aside className="sidebar">
      <NextUpCard
        next={next}
        nextEpisodeIndex={nextEpisodeIndex}
        tonightMin={tonightMin}
        futurePendingCount={futurePendingCount}
        lang={lang}
        onMarkNext={onMarkNext}
      />
      <ActionButtons lang={lang} onSurprise={onSurprise} onOpenStats={onOpenStats} />
      <div className="flt">
        <SortToggle sortMode={sortMode} lang={lang} onChange={onSortChange} />
      </div>
      <div className="flt">
        <ViewFilterToggle viewFilter={viewFilter} lang={lang} onChange={onViewFilterChange} />
        <TonightStepper tonightMin={tonightMin} lang={lang} onStepUp={onTonightStepUp} onStepDown={onTonightStepDown} />
      </div>
      <BulkExpand lang={lang} onExpandAll={onExpandAll} onCollapseAll={onCollapseAll} />
    </aside>
  );
}
