// Replaces the sortMode/mode/viewFilter/searchQuery/tonightMin globals from the
// legacy js/state.js + the tonight-stepper click handlers from js/app.js. `mode`
// (Essentiel/Tout) and `sortMode` (chrono/release) are persisted, same as before;
// viewFilter/searchQuery/tonightMin are session-only — a fresh load always starts on
// "All", no search, tonight's budget "off", matching the original behavior exactly.
import { useCallback, useState, type Dispatch, type SetStateAction } from 'react';
import type { Mode, SortMode, ViewFilter } from '../data/types';
import { useLocalStorageState } from './useLocalStorageState';

const TONIGHT_STEPS_MIN = [0, 30, 60, 90, 120, 150, 180, 240];

function asMode(raw: string): Mode {
  return raw === 'essentiel' ? 'essentiel' : 'tout';
}

function asSortMode(raw: string): SortMode {
  return raw === 'release' ? 'release' : 'chrono';
}

export interface UseCatalogFiltersResult {
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
  sortMode: SortMode;
  setSortMode: Dispatch<SetStateAction<SortMode>>;
  viewFilter: ViewFilter;
  setViewFilter: Dispatch<SetStateAction<ViewFilter>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  tonightMin: number;
  stepTonightUp: () => void;
  stepTonightDown: () => void;
}

export function useCatalogFilters(): UseCatalogFiltersResult {
  const [mode, setMode] = useLocalStorageState<Mode>('mcu6-m', 'tout', {
    serialize: (value) => value,
    deserialize: asMode,
  });
  const [sortMode, setSortMode] = useLocalStorageState<SortMode>('mcu6-sort', 'chrono', {
    serialize: (value) => value,
    deserialize: asSortMode,
  });
  const [viewFilter, setViewFilter] = useState<ViewFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tonightMin, setTonightMin] = useState(0);

  const stepTonightUp = useCallback(() => {
    setTonightMin((prev) => {
      const i = TONIGHT_STEPS_MIN.indexOf(prev);
      return TONIGHT_STEPS_MIN[Math.min(TONIGHT_STEPS_MIN.length - 1, i + 1)];
    });
  }, []);

  const stepTonightDown = useCallback(() => {
    setTonightMin((prev) => {
      const i = TONIGHT_STEPS_MIN.indexOf(prev);
      return TONIGHT_STEPS_MIN[Math.max(0, i - 1)];
    });
  }, []);

  return {
    mode,
    setMode,
    sortMode,
    setSortMode,
    viewFilter,
    setViewFilter,
    searchQuery,
    setSearchQuery,
    tonightMin,
    stepTonightUp,
    stepTonightDown,
  };
}
