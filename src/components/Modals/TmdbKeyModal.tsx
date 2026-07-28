// Ported from the #tmdb-modal markup in the legacy index.html + its handlers in
// js/app.js. Persisting the key and showing the saved/removed toast is delegated to
// the caller (onSave/onClear) — this component only owns the text field's local
// editing state, reset to the current stored key each time the modal opens.
import {useState} from 'react';

import type {Lang} from '../../data';
import {t, TmdbHelpText} from '../../i18n';
import {Modal} from './Modal';
import modalStyles from './Modal.module.css';
import styles from './TmdbKeyModal.module.css';

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
  const [prevOpen, setPrevOpen] = useState(open);
  const [prevTmdbKey, setPrevTmdbKey] = useState(tmdbKey);

  if (open !== prevOpen || tmdbKey !== prevTmdbKey) {
    setPrevOpen(open);
    setPrevTmdbKey(tmdbKey);
    if (open) setValue(tmdbKey ?? '');
  }

  const handleSave = () => {
    onSave(value.trim() || null);
    onClose();
  };

  const handleClear = () => {
    setValue('');
    onClear();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} maxWidthPx={420}>
      <div className={modalStyles.modalTop}>
        <span className={modalStyles.modalH2}>{t(lang, 'tmdbBtn')}</span>
        <button type="button" className={modalStyles.modalClose} onClick={onClose}>
          ✕
        </button>
      </div>
      <p className={styles.helperText}>
        <TmdbHelpText lang={lang}/>
      </p>
      <p className={styles.helperNote}>{t(lang, 'tmdbHelp2')}</p>
      <input
        type="text"
        className={styles.keyInput}
        placeholder={t(lang, 'tmdbInputPlaceholder')}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <div className={styles.ioRow}>
        <button type="button" className={styles.ioBtn} onClick={handleSave}>
          {t(lang, 'tmdbSave')}
        </button>
        <button type="button" className={styles.ioBtn} onClick={handleClear}>
          {t(lang, 'tmdbClear')}
        </button>
      </div>
    </Modal>
  );
}
