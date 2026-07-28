// Ported from the .sb-ftr element in the legacy index.html + the rst/exp-btn/imp-inp
// handlers in js/app.js. Persistence itself (localStorage writes) happens inside
// useWatchProgress; this component only builds the export payload / parses the
// imported file and reports the result up.
import {type ChangeEvent, useEffect, useRef, useState} from 'react';

import type {Lang, Mode} from '../../data';
import type {ImportedProgressData} from '../../hooks';
import {t} from '../../i18n';
import type {WatchDates} from '../../utils/compute';
import {OptionalBadge} from '../Catalog';
import styles from './Footer.module.css';

const ARM_TIMEOUT_MS = 3000;

interface ImportedFileData extends ImportedProgressData {
  mode?: Mode;
}

interface FooterProps {
  lang: Lang;
  watchDates: WatchDates;
  ratings: Record<string, number>;
  mode: Mode;
  onResetProgress: () => void;
  onImportData: (data: ImportedFileData) => void;
  onOpenTmdbModal: () => void;
  onToast: (message: string) => void;
}

export function Footer({
                         lang,
                         watchDates,
                         ratings,
                         mode,
                         onResetProgress,
                         onImportData,
                         onOpenTmdbModal,
                         onToast,
                       }: FooterProps) {
  const [armed, setArmed] = useState(false);
  const armTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (armTimerRef.current) window.clearTimeout(armTimerRef.current);
    };
  }, []);

  const handleResetClick = () => {
    if (!armed) {
      setArmed(true);
      if (armTimerRef.current) window.clearTimeout(armTimerRef.current);
      armTimerRef.current = window.setTimeout(() => setArmed(false), ARM_TIMEOUT_MS);
      return;
    }
    setArmed(false);
    if (armTimerRef.current) window.clearTimeout(armTimerRef.current);
    onResetProgress();
  };

  const handleExport = () => {
    const data = { version: 7, exportDate: new Date().toISOString(), watchDates, ratings, mode };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mcu-marathon-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    onToast(t(lang, 'exportedMsg'));
  };

  const handleImportFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      try {
        const data = JSON.parse(loadEvent.target?.result as string) as ImportedFileData;
        onImportData(data);
        onToast(t(lang, 'importedMsg'));
      } catch {
        onToast(t(lang, 'invalidFileMsg'));
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={styles.footer}>
      <button type="button" className={armed ? `${styles.rst} ${styles.armed}` : styles.rst} onClick={handleResetClick}>
        {armed ? t(lang, 'resetConfirm') : t(lang, 'resetBtn')}
      </button>
      <div className={styles.ioRow}>
        <button type="button" className={styles.ioBtn} onClick={handleExport}>
          {t(lang, 'exportBtn')}
        </button>
        <label className={styles.ioBtn}>
          <span>{t(lang, 'importBtn')}</span>
          <input type="file" accept=".json" style={{ display: 'none' }} onChange={handleImportFile} />
        </label>
        <button type="button" className={styles.ioBtn} onClick={onOpenTmdbModal}>
          {t(lang, 'tmdbBtn')}
        </button>
      </div>
      <div className={styles.lgd}>
        <OptionalBadge lang={lang}/>
        <span>{t(lang, 'optionalNote')}</span>
      </div>
      <p className={styles.note}>
        <span>{t(lang, 'footerNote1')}</span>
        <br />
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </div>
  );
}
