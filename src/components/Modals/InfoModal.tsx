// Ported from #info-modal (legacy index.html) + openInfo() (legacy js/modals.js).
import type { ReactNode } from 'react';

import type { CatalogEntry, Lang, TmdbRef } from '../../data';
import { getInfo, getSectionNames, getTitle, isFilm, PLAT, ROMANS } from '../../data';
import type { PosterFetchResult } from '../../hooks';
import { t, trEpisodeCount } from '../../i18n';
import { fmt } from '../../utils/format';
import { imdbUrl } from '../../utils/links';
import { OptionalBadge, PlatformBadge } from '../Catalog';
import styles from './InfoModal.module.css';
import { InfoPoster } from './InfoPoster';
import { Modal } from './Modal';
import modalStyles from './Modal.module.css';

interface InfoModalProps {
  entry: CatalogEntry | null;
  lang: Lang;
  onClose: () => void;
  fetchPoster: (tmdbInfo: TmdbRef) => Promise<PosterFetchResult>;
  onPosterError: (message: string) => void;
}

export function InfoModal({ entry, lang, onClose, fetchPoster, onPosterError }: InfoModalProps) {
  return (
    <Modal open={entry !== null} onClose={onClose} maxWidthPx={480}>
      {entry ? (
        <InfoModalBody
          entry={entry}
          lang={lang}
          onClose={onClose}
          fetchPoster={fetchPoster}
          onPosterError={onPosterError}
        />
      ) : null}
    </Modal>
  );
}

interface InfoModalBodyProps {
  entry: CatalogEntry;
  lang: Lang;
  onClose: () => void;
  fetchPoster: InfoModalProps['fetchPoster'];
  onPosterError: (message: string) => void;
}

function InfoModalBody({ entry, lang, onClose, fetchPoster, onPosterError }: InfoModalBodyProps) {
  const info = getInfo(entry.id, lang);
  const title = getTitle(entry, lang);
  const platform = PLAT[entry.id];
  const durationText = isFilm(entry)
    ? fmt(entry.m)
    : `${trEpisodeCount(lang, entry.count)} · ${fmt(entry.epMins.reduce((a, b) => a + b, 0))}`;
  const yearText = isFilm(entry) && entry.y ? entry.y : '';

  const numberCards: ReactNode[] = [];
  if (info?.budget && info.budget !== 'N/A') {
    numberCards.push(
      <div className={styles.numCard} key="budget">
        <div className={styles.numV}>{info.budget}</div>
        <div className={styles.numL}>Budget</div>
      </div>,
    );
  }
  if (info?.box && info.box !== 'N/A') {
    numberCards.push(
      <div className={styles.numCard} key="box">
        <div className={styles.numV}>{info.box}</div>
        <div className={styles.numL}>
          {info.box.startsWith('TBD') ? t(lang, 'boxOfficeLbl') : t(lang, 'boxOfficeWorldLbl')}
        </div>
      </div>,
    );
  }
  if (info?.rt) {
    numberCards.push(
      <div className={`${styles.numCard} ${styles.numRt}`} key="rt">
        <div className={styles.numV}>{info.rt}</div>
        <div className={styles.numL}>Rotten Tomatoes</div>
      </div>,
    );
  }

  return (
    <>
      <div className={modalStyles.modalTop}>
        <InfoPoster
          key={entry.id}
          entry={entry}
          info={info}
          title={title}
          lang={lang}
          fetchPoster={fetchPoster}
          onError={onPosterError}
        />
        <div className={styles.infoHeadText}>
          <div className={styles.infoChapter}>
            {ROMANS[entry.sec]} · {getSectionNames(lang)[entry.sec]}
          </div>
          <span className={styles.infoTitle}>{title}</span>
        </div>
        <button type="button" className={modalStyles.modalClose} onClick={onClose}>
          ✕
        </button>
      </div>
      <div className={styles.infoMeta}>
        {yearText ? <span>{yearText}</span> : null}
        <span>{durationText}</span>
        {platform ? <PlatformBadge platform={platform} lang={lang} /> : null}
        {entry.opt ? <OptionalBadge lang={lang} /> : null}
      </div>
      {info ? (
        <>
          <p className={styles.synopsis}>{info.synopsis}</p>
          {numberCards.length > 0 ? <div className={styles.numGrid}>{numberCards}</div> : null}
          <div className={styles.linkBtns}>
            {info.yt && info.yt.startsWith('http') ? (
              <a className={styles.trailerBtn} href={info.yt} target="_blank" rel="noreferrer">
                {t(lang, 'trailerBtn')}
              </a>
            ) : null}
            <a className={styles.imdbBtn} href={imdbUrl(entry)} target="_blank" rel="noreferrer">
              {t(lang, 'imdbBtn')}
            </a>
          </div>
          <div className={styles.infoGrid}>
            <div className={styles.infoRow}>
              <span className={styles.infoLbl}>{t(lang, 'directorLbl')}</span>
              <span>{info.director}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLbl}>{t(lang, 'castLbl')}</span>
              <span>{info.cast}</span>
            </div>
            {info.pc ? (
              <div className={`${styles.infoRow} ${styles.infoPC}`}>
                <span className={styles.infoLbl}>{t(lang, 'postCreditLbl')}</span>
                <span>{info.pc}</span>
              </div>
            ) : isFilm(entry) ? (
              <div className={styles.infoRow}>
                <span className={styles.infoLbl}>{t(lang, 'postCreditLbl')}</span>
                <span className={styles.unknownFaint}>{t(lang, 'postCreditUnknown')}</span>
              </div>
            ) : null}
            {info.triv ? (
              <div className={styles.infoRow}>
                <span className={styles.infoLbl}>{t(lang, 'triviaLbl')}</span>
                <span>{info.triv}</span>
              </div>
            ) : null}
            {info.link ? (
              <div className={styles.infoRow}>
                <span className={styles.infoLbl}>{t(lang, 'sagaLinkLbl')}</span>
                <span>{info.link}</span>
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <p className={`${styles.synopsis} ${styles.synopsisMuted}`}>{t(lang, 'noInfoYet')}</p>
      )}
    </>
  );
}
