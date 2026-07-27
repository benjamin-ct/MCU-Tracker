// Ported from the legacy js/render.js grouping logic (groupsFor/groupKeyFor/groupBadge).
// The original built an HTML string (headHTML) for each chapter header; here we return
// plain data instead — a future <ChapterGroup> component renders the header as JSX,
// picking the localized section/year label itself via getSectionNames()/the year number.
import type { CatalogEntry, SectionIndex, SortMode, ViewFilter } from '../data/types';
import { RELEASE_DATE, releaseYear } from '../data/releaseDates';
import { isFuture } from '../data/platform';
import type { Mode } from '../data/types';
import { cnt, isWatched, matchSearch, sDone, sRem, type WatchDates } from './compute';
import { fmt } from './format';

export interface ChronoGroup {
  key: string;
  kind: 'chrono';
  sectionIndex: SectionIndex;
  entries: CatalogEntry[];
}

export interface ReleaseGroup {
  key: string;
  kind: 'release';
  year: number;
  entries: CatalogEntry[];
}

export type CatalogGroup = ChronoGroup | ReleaseGroup;

const SECTION_INDICES: SectionIndex[] = [0, 1, 2, 3];

export function groupsFor(catalog: CatalogEntry[], sortMode: SortMode): CatalogGroup[] {
  if (sortMode === 'release') {
    const years = [
      ...new Set(catalog.map((e) => releaseYear(e.id)).filter((y): y is number => y !== null)),
    ].sort((a, b) => a - b);
    return years.map((year) => ({
      key: `release-${year}`,
      kind: 'release',
      year,
      entries: catalog
        .filter((e) => releaseYear(e.id) === year)
        .sort((a, b) => RELEASE_DATE[a.id].localeCompare(RELEASE_DATE[b.id])),
    }));
  }
  return SECTION_INDICES.map((si) => ({
    key: `chrono-${si}`,
    kind: 'chrono',
    sectionIndex: si,
    entries: catalog.filter((e) => e.sec === si),
  }));
}

// Group key for a given entry, in the CURRENT mode — used to reopen the right chapter
// automatically (e.g. from "up next") regardless of the active tab.
export function groupKeyFor(entry: CatalogEntry, sortMode: SortMode): string {
  return sortMode === 'release' ? `release-${releaseYear(entry.id)}` : `chrono-${entry.sec}`;
}

// "done/total · remaining" for a group: same calculation as totals() (Essential mode
// and not-yet-released excluded, series counted by episode) but per group rather than
// per fixed narrative chapter.
export function groupBadge(entries: CatalogEntry[], watchDates: WatchDates, mode: Mode): string {
  let n = 0;
  let d = 0;
  let rem = 0;
  entries.forEach((entry) => {
    if (!cnt(entry, mode) || isFuture(entry.id)) return;
    if (entry.type === 'f') {
      n++;
      if (isWatched(watchDates, entry.id)) d++;
      else rem += entry.m;
    } else {
      n += entry.count;
      d += sDone(entry, watchDates);
      rem += sRem(entry, watchDates);
    }
  });
  return `${d}/${n} · ${fmt(rem)}`;
}

export interface VisibleGroup {
  group: CatalogGroup;
  // Entries actually rendered for this group: mode + search + (in "todo" view) not-
  // yet-watched. groupBadge() is computed from group.entries (unfiltered) instead, so
  // the chapter's progress badge stays stable while searching/filtering.
  visibleEntries: CatalogEntry[];
}

export interface VisibleGroupsResult {
  groups: VisibleGroup[];
  totalVisibleCount: number;
}

// Ported from the entries-filtering half of render() (legacy js/render.js): a group
// disappears entirely once it has no matching entries (e.g. an Essential-mode chapter
// made up entirely of optional content), and in "todo" view a group with nothing left
// to watch disappears too, rather than leaving an empty header floating with nothing
// under it.
export function visibleGroups(
  catalog: CatalogEntry[],
  sortMode: SortMode,
  mode: Mode,
  searchQuery: string,
  viewFilter: ViewFilter,
  watchDates: WatchDates,
): VisibleGroupsResult {
  let totalVisibleCount = 0;
  const groups: VisibleGroup[] = [];

  groupsFor(catalog, sortMode).forEach((group) => {
    const matched = group.entries.filter((entry) => cnt(entry, mode) && matchSearch(entry, searchQuery));
    if (matched.length === 0) return;

    let visibleEntries = matched;
    if (viewFilter === 'todo') {
      visibleEntries = matched.filter((entry) =>
        entry.type === 'f' ? !isWatched(watchDates, entry.id) : sDone(entry, watchDates) < entry.count,
      );
      if (visibleEntries.length === 0) return;
    }

    totalVisibleCount += visibleEntries.length;
    groups.push({ group, visibleEntries });
  });

  return { groups, totalVisibleCount };
}
