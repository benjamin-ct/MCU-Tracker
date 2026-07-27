// Ported from the .brand element in the legacy index.html. The sort-order label
// (brand-r) used to be resynced imperatively by syncBrandLabel() on every sort-tab or
// language change (js/i18n.js); here it's just derived from props on every render.
import type { Lang, SortMode } from '../../data/types';
import type { Theme } from '../../hooks/useTheme';
import { t } from '../../i18n';

interface BrandBarProps {
  lang: Lang;
  sortMode: SortMode;
  theme: Theme;
  onToggleLang: () => void;
  onToggleTheme: () => void;
}

export function BrandBar({ lang, sortMode, theme, onToggleLang, onToggleTheme }: BrandBarProps) {
  const sortLabel = sortMode === 'release' ? t(lang, 'releaseOrderLbl') : t(lang, 'chronoOrder');
  // Each button shows the language/theme you'd SWITCH TO, not the current one.
  const langBtnLabel = lang === 'en' ? 'FR' : 'EN';
  const themeBtnIcon = theme === 'light' ? '🌙' : '☀️';

  return (
    <div className="brand">
      <span className="brand-l">Marathon MCU</span>
      <div className="brand-r-group">
        <span className="brand-r">{sortLabel}</span>
        <button
          type="button"
          className="icon-btn"
          aria-label="Changer de langue / Switch language"
          onClick={onToggleLang}
        >
          {langBtnLabel}
        </button>
        <button type="button" className="icon-btn" aria-label="Changer de thème / Switch theme" onClick={onToggleTheme}>
          {themeBtnIcon}
        </button>
      </div>
    </div>
  );
}
