// Composes the catalog list (<main id="main"> in the legacy index.html) from
// ChapterGroup/MovieRow/SeriesRow, mirroring the filtering + grouping done by
// render() in js/render.js. Collapse state (which chapters/series are open) is owned
// by the caller (App.tsx) via useCollapseState, since the sidebar's expand/collapse-
// all buttons and the "up next"/surprise-pick auto-expand need to reach the same
// state — this component just reads it and reports toggles.
import type { CatalogEntry, Lang, Mode, SeriesEntry, SortMode, ViewFilter } from '../../data/types';
import { isFilm } from '../../data/types';
import { PLAT, isFuture } from '../../data/platform';
import { fitsTonight, isWatched, sDone, sRem, type WatchDates } from '../../utils/compute';
import { groupBadge, visibleGroups } from '../../utils/groups';
import { ChapterGroup } from './ChapterGroup';
import { MovieRow } from './MovieRow';
import { SeriesRow } from './SeriesRow';

interface CatalogProps {
  catalog: CatalogEntry[];
  lang: Lang;
  sortMode: SortMode;
  mode: Mode;
  searchQuery: string;
  viewFilter: ViewFilter;
  tonightMin: number;
  watchDates: WatchDates;
  ratings: Record<string, number>;
  isChapterCollapsed: (key: string) => boolean;
  onToggleChapter: (key: string) => void;
  isSeriesCollapsed: (id: string) => boolean;
  onToggleSeries: (id: string) => void;
  disneyPlusHrefFor: (entry: CatalogEntry) => string;
  onSetWatched: (id: string, watched: boolean) => void;
  onRate: (id: string, value: number) => void;
  onOpenInfo: (id: string) => void;
  onCopiedForDisney: (title: string) => void;
  onBulkToggleSeries: (entry: SeriesEntry, watched: boolean) => void;
}

export function Catalog({
  catalog,
  lang,
  sortMode,
  mode,
  searchQuery,
  viewFilter,
  tonightMin,
  watchDates,
  ratings,
  isChapterCollapsed,
  onToggleChapter,
  isSeriesCollapsed,
  onToggleSeries,
  disneyPlusHrefFor,
  onSetWatched,
  onRate,
  onOpenInfo,
  onCopiedForDisney,
  onBulkToggleSeries,
}: CatalogProps) {
  const { groups } = visibleGroups(catalog, sortMode, mode, searchQuery, viewFilter, watchDates);

  return (
    <main>
      {groups.map(({ group, visibleEntries }) => (
        <ChapterGroup
          key={group.key}
          group={group}
          isOpen={!isChapterCollapsed(group.key)}
          badgeText={groupBadge(group.entries, watchDates, mode)}
          lang={lang}
          onToggleOpen={() => onToggleChapter(group.key)}
        >
          {visibleEntries.map((entry) =>
            isFilm(entry) ? (
              <MovieRow
                key={entry.id}
                entry={entry}
                lang={lang}
                isWatched={isWatched(watchDates, entry.id)}
                watchDateIso={watchDates[entry.id]}
                rating={ratings[entry.id] ?? 0}
                tonightFit={fitsTonight(entry, watchDates, tonightMin)}
                isFuture={isFuture(entry.id)}
                platform={PLAT[entry.id]}
                disneyPlusHref={disneyPlusHrefFor(entry)}
                onToggleWatched={(watched) => onSetWatched(entry.id, watched)}
                onRate={(value) => onRate(entry.id, value)}
                onOpenInfo={() => onOpenInfo(entry.id)}
                onCopiedForDisney={onCopiedForDisney}
              />
            ) : (
              <SeriesRow
                key={entry.id}
                entry={entry}
                lang={lang}
                isEpisodeWatched={(index) => isWatched(watchDates, `${entry.id}-e${index + 1}`)}
                doneCount={sDone(entry, watchDates)}
                remainingMinutes={sRem(entry, watchDates)}
                isOpen={!isSeriesCollapsed(entry.id)}
                tonightFit={fitsTonight(entry, watchDates, tonightMin)}
                isFuture={isFuture(entry.id)}
                platform={PLAT[entry.id]}
                rating={ratings[entry.id] ?? 0}
                disneyPlusHref={disneyPlusHrefFor(entry)}
                onToggleOpen={() => onToggleSeries(entry.id)}
                onToggleEpisode={(index, watched) => onSetWatched(`${entry.id}-e${index + 1}`, watched)}
                onBulkToggle={(watched) => onBulkToggleSeries(entry, watched)}
                onRate={(value) => onRate(entry.id, value)}
                onOpenInfo={() => onOpenInfo(entry.id)}
                onCopiedForDisney={onCopiedForDisney}
              />
            ),
          )}
        </ChapterGroup>
      ))}
    </main>
  );
}
