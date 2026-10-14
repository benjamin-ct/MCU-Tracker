// Replaces the sortMode/mode/viewFilter/searchQuery/tonightMin globals from the
// legacy js/state.js + the tonight-stepper click handlers from js/app.js. `mode`
// (Essentiel/Tout) and `sortMode` (chrono/release) are persisted, same as before;
// viewFilter/searchQuery/tonightMin are session-only — a fresh load always starts on
// "All", no search, tonight's budget "off", matching the original behavior exactly.
import { type Dispatch, type SetStateAction, useCallback, useState } from 'react';

import type { Mode, SortMode, ViewFilter, ViewLayout } from '../data';
import { useLocalStorageState } from './useLocalStorageState';

const TONIGHT_STEPS_MIN = [0, 30, 60, 90, 120, 150, 180, 240];

function asMode(raw: string): Mode {
  return raw === 'essentiel' ? 'essentiel' : 'tout';
}

function asSortMode(raw: string): SortMode {
  return raw === 'release' ? 'release' : 'chrono';
}

function asViewLayout(raw: string): ViewLayout {
  return raw === 'grid' ? 'grid' : 'list';
}

export interface UseCatalogFiltersResult {
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
  sortMode: SortMode;
  setSortMode: Dispatch<SetStateAction<SortMode>>;
  viewLayout: ViewLayout;
  setViewLayout: Dispatch<SetStateAction<ViewLayout>>;
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
  const [viewLayout, setViewLayout] = useLocalStorageState<ViewLayout>('mcu6-layout', 'list', {
    serialize: (value) => value,
    deserialize: asViewLayout,
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
    viewLayout,
    setViewLayout,
    viewFilter,
    setViewFilter,
    searchQuery,
    setSearchQuery,
    tonightMin,
    stepTonightUp,
    stepTonightDown,
  };
}
