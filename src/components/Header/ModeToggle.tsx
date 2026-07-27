// Ported from the .tog element in the legacy index.html + its click handlers in
// js/app.js. The sliding pill is pure CSS (.tog-pill, positioned via
// .tog[data-m="tout"]), driven entirely by the data-m attribute.
import type { Lang, Mode } from '../../data/types';
import { t } from '../../i18n';

interface ModeToggleProps {
  mode: Mode;
  lang: Lang;
  onChange: (mode: Mode) => void;
}

export function ModeToggle({ mode, lang, onChange }: ModeToggleProps) {
  return (
    <div className="tog" data-m={mode}>
      <div className="tog-pill" />
      <button
        type="button"
        className={mode === 'essentiel' ? 'on' : undefined}
        onClick={() => onChange('essentiel')}
      >
        {t(lang, 'modeEssential')}
      </button>
      <button type="button" className={mode === 'tout' ? 'on' : undefined} onClick={() => onChange('tout')}>
        {t(lang, 'modeAll')}
      </button>
    </div>
  );
}
