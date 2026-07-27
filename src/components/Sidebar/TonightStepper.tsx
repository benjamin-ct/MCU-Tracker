// Ported from the .tn-wrap element in the legacy index.html + the tn-m/tn-p click
// handlers in js/app.js.
import type { Lang } from '../../data/types';
import { t } from '../../i18n';
import { tnDisp } from '../../utils/format';

interface TonightStepperProps {
  tonightMin: number;
  lang: Lang;
  onStepUp: () => void;
  onStepDown: () => void;
}

export function TonightStepper({ tonightMin, lang, onStepUp, onStepDown }: TonightStepperProps) {
  return (
    <div className="tn-wrap">
      <span className="tn-lbl">{t(lang, 'tonightLbl')}</span>
      <div className="tn-stepper">
        <button type="button" className="tn-btn" onClick={onStepDown}>
          −
        </button>
        <span className="tn-val">{tnDisp(tonightMin)}</span>
        <button type="button" className="tn-btn" onClick={onStepUp}>
          +
        </button>
      </div>
    </div>
  );
}
