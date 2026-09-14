// Ported from _getPlatform()/DP_HREF (legacy js/platform.js). On iOS, a real <a href>
// tapped by the user lets the OS intercept the navigation as a Universal Link and
// open the Disney+ app directly — no window.open()/preventDefault(), both of which
// break Universal Links. Android has no such interception for a plain https:// link,
// so it needs an explicit intent:// URI instead, with a Play Store fallback baked in
// for devices without the app installed.
//
// The href never changes during a session (it's a pure function of the user agent),
// so this just computes it once via useState's lazy initializer rather than
// recomputing on every render.
import { useState } from 'react';

type Platform = 'android' | 'ios' | 'desktop';

function detectPlatform(): Platform {
  // window.opera (old Presto-engine Opera/Opera Mini) is dropped from the original's
  // detection chain: that engine has been extinct for a decade-plus, and keeping it
  // would mean reading a non-standard `window.opera` property that doesn't exist in
  // any current browser's types.
  const userAgent = navigator.userAgent || navigator.vendor || '';
  if (/android/i.test(userAgent)) return 'android';
  if (/iPad|iPhone|iPod/.test(userAgent) && !('MSStream' in window)) return 'ios';
  // iPadOS reports as "Macintosh" with touch support — distinguishes it from a real Mac.
  if (/Macintosh/.test(userAgent) && navigator.maxTouchPoints > 1) return 'ios';
  return 'desktop';
}

const ANDROID_PLAY_STORE_FALLBACK = encodeURIComponent(
  'https://play.google.com/store/apps/details?id=com.disney.disneyplus',
);

function computeDisneyPlusHref(platform: Platform): string {
  if (platform === 'android') {
    return `intent://www.disneyplus.com/fr-fr/#Intent;scheme=https;package=com.disney.disneyplus;S.browser_fallback_url=${ANDROID_PLAY_STORE_FALLBACK};end`;
  }
  return 'https://www.disneyplus.com/fr-fr/';
}

export function usePlatformDeepLink(): string {
  const [href] = useState(() => computeDisneyPlusHref(detectPlatform()));
  return href;
}
