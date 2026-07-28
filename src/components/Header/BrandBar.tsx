import type {Lang, SortMode} from '../../data';
import type {Theme} from '../../hooks/useTheme';
import {t} from '../../i18n';
import styles from './BrandBar.module.css';

interface BrandBarProps {
  lang: Lang;
  sortMode: SortMode;
  theme: Theme;
  onToggleLang: () => void;
  onToggleTheme: () => void;
}

export function BrandBar({ lang, sortMode, theme, onToggleLang, onToggleTheme }: BrandBarProps) {
  const sortLabel = sortMode === 'release' ? t(lang, 'releaseOrderLbl') : t(lang, 'chronoOrder');
  const langBtnLabel = lang === 'en' ? 'FR' : 'EN';
  const themeBtnIcon = theme === 'light' ? '🌙' : '☀️';

  return (
    <div className={styles.brand}>
      <span className={styles.brandL}>Marathon MCU</span>
      <div className={styles.brandRGroup}>
        <span className={styles.brandR}>{sortLabel}</span>
        <button
          type="button"
          className={styles.iconBtn}
          aria-label="Changer de langue / Switch language"
          onClick={onToggleLang}
        >
          {langBtnLabel}
        </button>
        <button
          type="button"
          className={styles.iconBtn}
          aria-label="Changer de thème / Switch theme"
          onClick={onToggleTheme}
        >
          {themeBtnIcon}
        </button>
      </div>
    </div>
  );
}
