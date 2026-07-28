// Ported from the .tn-wrap element in the legacy index.html + the tn-m/tn-p click
// handlers in js/app.js.
import type {Lang} from '../../data';
import {t} from '../../i18n';
import {tnDisp} from '../../utils/format';
import styles from './TonightStepper.module.css';

interface TonightStepperProps {
  tonightMin: number;
  lang: Lang;
  onStepUp: () => void;
  onStepDown: () => void;
}

export function TonightStepper({ tonightMin, lang, onStepUp, onStepDown }: TonightStepperProps) {
  return (
    <div className={styles.tnWrap}>
      <span className={styles.tnLbl}>{t(lang, 'tonightLbl')}</span>
      <div className={styles.tnStepper}>
        <button type="button" className={styles.tnBtn} onClick={onStepDown}>
          −
        </button>
        <span className={styles.tnVal}>{tnDisp(tonightMin)}</span>
        <button type="button" className={styles.tnBtn} onClick={onStepUp}>
          +
        </button>
      </div>
    </div>
  );
}
