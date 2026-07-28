import {type ReactNode, useEffect} from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  maxWidthPx?: number;
  children: ReactNode;
}

export function Modal({ open, onClose, maxWidthPx, children }: ModalProps) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.panel} style={maxWidthPx ? {maxWidth: `${maxWidthPx}px`} : undefined}>
        {children}
      </div>
    </div>
  );
}
