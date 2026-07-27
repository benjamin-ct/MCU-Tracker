// Ported from the .search-wrap/.search-count elements in the legacy index.html + the
// srch input handler in js/app.js. searchQuery is kept untrimmed in state (so typing
// "iron man" word-by-word isn't disrupted by trimming mid-keystroke) — matchSearch()
// and the "is a search active" checks below all trim at the point of use instead,
// matching the original's `const q=srchEl.value.trim()` without needing separate
// raw/trimmed state.
import type { Lang } from '../../data/types';
import { t, trResultCount } from '../../i18n';

interface SearchBoxProps {
  searchQuery: string;
  resultCount: number;
  lang: Lang;
  onSearchChange: (query: string) => void;
}

export function SearchBox({ searchQuery, resultCount, lang, onSearchChange }: SearchBoxProps) {
  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      <div className="search-wrap">
        <div className="search-box">
          <span className="search-icon">⌕</span>
          <input
            type="search"
            className="search-input"
            placeholder={t(lang, 'searchPlaceholder')}
            autoComplete="off"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
          <button
            type="button"
            className={isSearching ? 'search-clear vis' : 'search-clear'}
            onClick={() => onSearchChange('')}
          >
            ✕
          </button>
        </div>
      </div>
      <div className={isSearching ? 'search-count vis' : 'search-count'}>
        {isSearching ? trResultCount(lang, resultCount) : ''}
      </div>
    </>
  );
}
