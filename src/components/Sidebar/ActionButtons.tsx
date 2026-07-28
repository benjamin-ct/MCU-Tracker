import type {Lang} from '../../data';
import {t} from '../../i18n';
import styles from './ActionButtons.module.css';

interface ActionButtonsProps {
  lang: Lang;
  onSurprise: () => void;
  onOpenStats: () => void;
}

export function ActionButtons({ lang, onSurprise, onOpenStats }: ActionButtonsProps) {
  return (
    <div className={styles.actRow}>
      <button type="button" className={styles.actBtn} onClick={onSurprise}>
        {t(lang, 'surpriseBtn')}
      </button>
      <button type="button" className={styles.actBtn} onClick={onOpenStats}>
        {t(lang, 'statsBtn')}
      </button>
    </div>
  );
}
