// Small inline badges reused across MovieRow/SeriesRow: the "optional" tag (Fox
// X-Men, Netflix Defenders-verse), the platform tag (in theaters/coming soon), and the
// "fits tonight" tag. Ported from the opt-badge/plat-tag/tn-tag markup in the legacy
// js/render.js. tn-tag/sg-tn-tag are always rendered — visibility is CSS-driven by
// the ancestor .row.tn-fit/.sg.tn-fit class, same as the original.
import type {Lang, PlatformEntry} from '../../data/types';
import {getPlatformLabel} from '../../data/localize';
import {t} from '../../i18n';
import styles from './Badges.module.css';

export function OptionalBadge({ lang }: { lang: Lang }) {
  return <span className={styles.optBadge}>{t(lang, 'optionalBadge')}</span>;
}

export function PlatformBadge({ platform, lang }: { platform: PlatformEntry; lang: Lang }) {
  const { label, date } = getPlatformLabel(platform, lang);
  const cls = platform.c === 'cin'
    ? `${styles.platTag} ${styles.cin}`
    : platform.c === 'soon'
      ? `${styles.platTag} ${styles.soon}`
      : styles.platTag;
  return <span className={cls}>{label} · {date}</span>;
}

export function TonightBadge({lang, visible}: { lang: Lang; visible?: boolean }) {
  if (!visible) return null;
  return <span className={styles.tonightTag}>{t(lang, 'tonightTag')}</span>;
}

export function SeriesTonightBadge({lang, visible}: { lang: Lang; visible?: boolean }) {
  if (!visible) return null;
  return <span className={styles.tonightTag}>{t(lang, 'tonightTag')}</span>;
}
