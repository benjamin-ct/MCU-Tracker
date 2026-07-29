// Generic collapsed-keys Set, backing both cGroup (collapsed chapters) and cSer
// (collapsed series) from the legacy js/state.js. A key's presence means "collapsed",
// same inverse-membership convention as the original (a chapter/series is OPEN when
// its key is NOT in the set) — kept because it makes "expand all" a plain clear()
// and "collapse all" a plain replace-with-every-key, matching js/app.js's expAll/colAll.
import { useCallback, useState } from 'react';

export interface UseCollapseStateResult {
  isCollapsed: (key: string) => boolean;
  toggle: (key: string) => void;
  setKeyCollapsed: (key: string, collapsed: boolean) => void;
  expandAll: () => void;
  collapseKeys: (keys: string[]) => void;
}

export function useCollapseState(initialCollapsedKeys: string[] | (() => string[]) = []): UseCollapseStateResult {
  const [collapsed, setCollapsed] = useState<Set<string>>(
    () => new Set(typeof initialCollapsedKeys === 'function' ? initialCollapsedKeys() : initialCollapsedKeys),
  );

  const isCollapsed = useCallback((key: string) => collapsed.has(key), [collapsed]);

  const toggle = useCallback((key: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const setKeyCollapsed = useCallback((key: string, collapse: boolean) => {
    setCollapsed((prev) => {
      const alreadySet = prev.has(key) === collapse;
      if (alreadySet) return prev;
      const next = new Set(prev);
      if (collapse) next.add(key);
      else next.delete(key);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => setCollapsed(new Set()), []);

  const collapseKeys = useCallback((keys: string[]) => setCollapsed(new Set(keys)), []);

  return { isCollapsed, toggle, setKeyCollapsed, expandAll, collapseKeys };
}
