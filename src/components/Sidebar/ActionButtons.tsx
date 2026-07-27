// Ported from the .act-row element in the legacy index.html. The surprise-pick
// logic (random unwatched entry + scroll/highlight/toast) and the stats-modal open
// state live at the App level (they need the full catalog and modal visibility
// state) — this component only reports the two button clicks.
import type { Lang } from '../../data/types';
import { t } from '../../i18n';

interface ActionButtonsProps {
  lang: Lang;
  onSurprise: () => void;
  onOpenStats: () => void;
}

export function ActionButtons({ lang, onSurprise, onOpenStats }: ActionButtonsProps) {
  return (
    <div className="act-row">
      <button type="button" className="act-btn" onClick={onSurprise}>
        {t(lang, 'surpriseBtn')}
      </button>
      <button type="button" className="act-btn" onClick={onOpenStats}>
        {t(lang, 'statsBtn')}
      </button>
    </div>
  );
}
