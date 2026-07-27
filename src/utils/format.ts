export function fmt(minutes: number): string {
  if (minutes <= 0) return '0m';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, '0')}`;
}

export function fmtE(minutes: number): string {
  return minutes < 60 ? `${minutes}m` : fmt(minutes);
}

// Day + localized month abbreviation only — no "watched on"/"vu le" prefix here (the
// old vanilla app hardcoded "vu le " directly inside this function, which meant a
// watched-date pill kept reading "vu le 27 juil." even in English mode; the month
// name switched language but the prefix never did). Fixed in the port: the prefix
// is a proper i18n string (see i18n/strings.ts, trWatchedOn) applied by the caller.
export function fmtDayMonth(iso: string, monthNames: string[]): string {
  const d = new Date(iso);
  return `${d.getDate()} ${monthNames[d.getMonth()]}`;
}
