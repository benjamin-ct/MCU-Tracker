// Ported from #info-modal (legacy index.html) + openInfo() (legacy js/modals.js).
import type { ReactNode } from 'react';
import type { CatalogEntry, Lang, TmdbRef } from '../../data/types';
import { isFilm } from '../../data/types';
import { getInfo, getPlatformLabel, getSectionNames, getTitle } from '../../data/localize';
import { PLAT } from '../../data/platform';
import { ROMANS } from '../../data/sections';
import { t, trEpisodeCount } from '../../i18n';
import { fmt } from '../../utils/format';
import { imdbUrl } from '../../utils/links';
import type { PosterFetchResult } from '../../hooks/useTmdbPoster';
import { OptionalBadge } from '../Catalog/Badges';
import { Modal } from './Modal';
import { InfoPoster } from './InfoPoster';

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
        <InfoModalBody entry={entry} lang={lang} onClose={onClose} fetchPoster={fetchPoster} onPosterError={onPosterError} />
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
      <div className="num-card" key="budget">
        <div className="num-v">{info.budget}</div>
        <div className="num-l">Budget</div>
      </div>,
    );
  }
  if (info?.box && info.box !== 'N/A') {
    numberCards.push(
      <div className="num-card" key="box">
        <div className="num-v">{info.box}</div>
        <div className="num-l">{info.box.startsWith('TBD') ? t(lang, 'boxOfficeLbl') : t(lang, 'boxOfficeWorldLbl')}</div>
      </div>,
    );
  }
  if (info?.rt) {
    numberCards.push(
      <div className="num-card num-rt" key="rt">
        <div className="num-v">{info.rt}</div>
        <div className="num-l">Rotten Tomatoes</div>
      </div>,
    );
  }

  return (
    <>
      <div className="stat-top">
        <InfoPoster entry={entry} info={info} title={title} lang={lang} fetchPoster={fetchPoster} onError={onPosterError} />
        <div className="info-head-text">
          <div className="info-chapter">
            {ROMANS[entry.sec]} · {getSectionNames(lang)[entry.sec]}
          </div>
          <span className="info-title">{title}</span>
        </div>
        <button type="button" className="stat-close" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="info-meta">
        {yearText ? <span>{yearText}</span> : null}
        <span>{durationText}</span>
        {platform ? (
          <span className={`plat-tag ${platform.c}`}>
            {getPlatformLabel(platform, lang).label} · {getPlatformLabel(platform, lang).date}
          </span>
        ) : null}
        {entry.opt ? <OptionalBadge lang={lang} /> : null}
      </div>
      {info ? (
        <>
          <p className="info-synopsis">{info.synopsis}</p>
          {numberCards.length > 0 ? <div className="num-grid">{numberCards}</div> : null}
          <div className="link-btns">
            {info.yt && info.yt.startsWith('http') ? (
              <a className="trailer-btn" href={info.yt} target="_blank" rel="noreferrer">
                {t(lang, 'trailerBtn')}
              </a>
            ) : null}
            <a className="imdb-btn" href={imdbUrl(entry)} target="_blank" rel="noreferrer">
              {t(lang, 'imdbBtn')}
            </a>
          </div>
          <div className="info-grid">
            <div className="info-row">
              <span className="info-lbl">{t(lang, 'directorLbl')}</span>
              <span>{info.director}</span>
            </div>
            <div className="info-row">
              <span className="info-lbl">{t(lang, 'castLbl')}</span>
              <span>{info.cast}</span>
            </div>
            {info.pc ? (
              <div className="info-row info-pc">
                <span className="info-lbl">{t(lang, 'postCreditLbl')}</span>
                <span>{info.pc}</span>
              </div>
            ) : isFilm(entry) ? (
              <div className="info-row">
                <span className="info-lbl">{t(lang, 'postCreditLbl')}</span>
                <span style={{ color: 'var(--faint)' }}>{t(lang, 'postCreditUnknown')}</span>
              </div>
            ) : null}
            {info.triv ? (
              <div className="info-row">
                <span className="info-lbl">{t(lang, 'triviaLbl')}</span>
                <span>{info.triv}</span>
              </div>
            ) : null}
            {info.link ? (
              <div className="info-row">
                <span className="info-lbl">{t(lang, 'sagaLinkLbl')}</span>
                <span>{info.link}</span>
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <p className="info-synopsis" style={{ color: 'var(--faint)' }}>
          {t(lang, 'noInfoYet')}
        </p>
      )}
    </>
  );
}
