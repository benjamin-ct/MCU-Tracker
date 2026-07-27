// Ported from the #tmdb-modal markup in the legacy index.html + its handlers in
// js/app.js. Persisting the key and showing the saved/removed toast is delegated to
// the caller (onSave/onClear) — this component only owns the text field's local
// editing state, reset to the current stored key each time the modal opens.
import { useEffect, useState } from 'react';
import type { Lang } from '../../data/types';
import { t } from '../../i18n';
import { Modal } from './Modal';

interface TmdbKeyModalProps {
  open: boolean;
  tmdbKey: string | null;
  lang: Lang;
  onClose: () => void;
  onSave: (key: string | null) => void;
  onClear: () => void;
}

export function TmdbKeyModal({ open, tmdbKey, lang, onClose, onSave, onClear }: TmdbKeyModalProps) {
  const [value, setValue] = useState(tmdbKey ?? '');

  useEffect(() => {
    if (open) setValue(tmdbKey ?? '');
  }, [open, tmdbKey]);

  const handleSave = () => {
    const trimmed = value.trim();
    onSave(trimmed || null);
    onClose();
  };

  const handleClear = () => {
    setValue('');
    onClear();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} maxWidthPx={420}>
      <div className="stat-top">
        <span className="stat-h2">{t(lang, 'tmdbBtn')}</span>
        <button type="button" className="stat-close" onClick={onClose}>
          ✕
        </button>
      </div>
      <p className="info-synopsis" style={{ fontSize: '12.5px' }} dangerouslySetInnerHTML={{ __html: t(lang, 'tmdbHelp1') }} />
      <p className="info-synopsis" style={{ fontSize: '11px', color: 'var(--faint)' }}>
        {t(lang, 'tmdbHelp2')}
      </p>
      <input
        type="text"
        className="search-input"
        style={{
          width: '100%',
          boxSizing: 'border-box',
          background: 'var(--raised)',
          border: '1px solid var(--ln2)',
          borderRadius: '8px',
          padding: '10px 12px',
          marginBottom: '12px',
        }}
        placeholder={t(lang, 'tmdbInputPlaceholder')}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <div className="io-row" style={{ justifyContent: 'flex-start', marginTop: 0 }}>
        <button type="button" className="io-btn" onClick={handleSave}>
          {t(lang, 'tmdbSave')}
        </button>
        <button type="button" className="io-btn" onClick={handleClear}>
          {t(lang, 'tmdbClear')}
        </button>
      </div>
    </Modal>
  );
}
