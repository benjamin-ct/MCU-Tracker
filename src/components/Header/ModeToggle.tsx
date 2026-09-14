import type { Lang, Mode } from '../../data';
import { t } from '../../i18n';
import styles from './ModeToggle.module.css';

interface ModeToggleProps {
  mode: Mode;
  lang: Lang;
  onChange: (mode: Mode) => void;
}

export function ModeToggle({ mode, lang, onChange }: ModeToggleProps) {
  return (
    <div className={styles.tog} data-m={mode}>
      <div className={styles.pill} />
      <button
        type="button"
        className={mode === 'essentiel' ? styles.on : undefined}
        onClick={() => onChange('essentiel')}
      >
        {t(lang, 'modeEssential')}
      </button>
      <button type="button" className={mode === 'tout' ? styles.on : undefined} onClick={() => onChange('tout')}>
        {t(lang, 'modeAll')}
      </button>
    </div>
  );
}
