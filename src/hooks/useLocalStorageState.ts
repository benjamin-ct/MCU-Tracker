// Generic localStorage-backed state — the shared primitive behind every simple
// persisted preference (mode, sortMode, TMDB key, poster cache). Replaces the
// repeated lsGet/lsSet-with-try/catch pairs scattered through the legacy js/state.js.
// Not used for watchDates/ratings: those need one-time cross-key migration logic
// (see useWatchProgress) that doesn't fit this single-key read/write shape.
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

interface Options<T> {
  serialize?: (value: T) => string;
  deserialize?: (raw: string) => T;
}

function resolveInitial<T>(initialValue: T | (() => T)): T {
  return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
}

function readInitial<T>(key: string, initialValue: T | (() => T), deserialize: (raw: string) => T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) return deserialize(raw);
  } catch {
    // localStorage unavailable (private browsing / quota) — fall through to initialValue
  }
  return resolveInitial(initialValue);
}

export function useLocalStorageState<T>(
  key: string,
  initialValue: T | (() => T),
  options: Options<T> = {},
): [T, Dispatch<SetStateAction<T>>] {
  const serialize = options.serialize ?? ((value: T) => JSON.stringify(value));
  const deserialize = options.deserialize ?? ((raw: string) => JSON.parse(raw) as T);

  const [value, setValue] = useState<T>(() => readInitial(key, initialValue, deserialize));

  useEffect(() => {
    try {
      localStorage.setItem(key, serialize(value));
    } catch {
      // quota exceeded / private browsing — value still works for this session, it
      // just won't persist across reloads
    }
    // serialize/deserialize are pure formatters tied to `key` for the lifetime of this
    // hook instance; including them in the deps array would force every call site to
    // memoize an inline arrow function for no behavioral gain.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, value]);

  return [value, setValue];
}
