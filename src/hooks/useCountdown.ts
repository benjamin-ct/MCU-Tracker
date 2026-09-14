// Powers the header's live Doomsday countdown. Previously the header just computed
// "days left" once on mount (useMemo with an empty dep array) and never touched it
// again, so the number sat frozen for the whole session. This ticks every second
// instead, so the countdown is actually visible counting down in real time.
import { useEffect, useState } from 'react';

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number; // time remaining, clamped to 0 once target has passed
}

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;

function partsFor(target: Date): CountdownParts {
  const totalMs = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(totalMs / MS_PER_DAY),
    hours: Math.floor((totalMs % MS_PER_DAY) / MS_PER_HOUR),
    minutes: Math.floor((totalMs % MS_PER_HOUR) / MS_PER_MINUTE),
    seconds: Math.floor((totalMs % MS_PER_MINUTE) / MS_PER_SECOND),
    totalMs,
  };
}

// `target` is expected to be a stable reference (a module-level constant, as
// DOOMSDAY_DATE is) — the initial value below is only recomputed on mount, so a
// `target` that changes identity across renders wouldn't retrigger it.
export function useCountdown(target: Date): CountdownParts {
  const [parts, setParts] = useState(() => partsFor(target));

  useEffect(() => {
    if (target.getTime() <= Date.now()) return;
    const id = window.setInterval(() => setParts(partsFor(target)), MS_PER_SECOND);
    return () => window.clearInterval(id);
  }, [target]);

  return parts;
}
