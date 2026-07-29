import type { Lang } from '../../data';
import { t, trResultCount } from '../../i18n';
import styles from './SearchBox.module.css';

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
      <div className={styles.searchWrap}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>⌕</span>
          <input
            type="search"
            className={styles.searchInput}
            placeholder={t(lang, 'searchPlaceholder')}
            autoComplete="off"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
          <button
            type="button"
            className={isSearching ? `${styles.searchClear} ${styles.vis}` : styles.searchClear}
            onClick={() => onSearchChange('')}
          >
            ✕
          </button>
        </div>
      </div>
      <div className={isSearching ? `${styles.searchCount} ${styles.vis}` : styles.searchCount}>
        {isSearching ? trResultCount(lang, resultCount) : ''}
      </div>
    </>
  );
}
