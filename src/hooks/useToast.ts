// Replaces the toastTimer global + showToast() from the legacy js/state.js. A single
// toast slot: calling showToast() again before the 3s auto-dismiss replaces the
// message and restarts the timer, same as the original's clearTimeout+reset.
import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseToastResult {
  message: string;
  visible: boolean;
  showToast: (message: string) => void;
}

const DISMISS_DELAY_MS = 3000;

export function useToast(): UseToastResult {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  const showToast = useCallback((next: string) => {
    setMessage(next);
    setVisible(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setVisible(false), DISMISS_DELAY_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return { message, visible, showToast };
}
