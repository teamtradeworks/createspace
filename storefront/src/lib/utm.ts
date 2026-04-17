const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const STORAGE_KEY = "cs_first_touch_utm";

export type UtmParams = Partial<Record<(typeof UTM_PARAMS)[number], string>>;

/** Extract UTM parameters from the current URL. Returns null if none present. */
export function extractUtmFromUrl(): UtmParams | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const utm: UtmParams = {};
  let found = false;

  for (const key of UTM_PARAMS) {
    const value = params.get(key);
    if (value) {
      utm[key] = value;
      found = true;
    }
  }

  return found ? utm : null;
}

/**
 * Get first-touch UTM parameters. On the very first visit with UTMs,
 * stores them in sessionStorage so they persist across page navigations.
 * Returns the stored UTMs (or null if the user arrived without any).
 */
export function getFirstTouchUtm(): UtmParams | null {
  if (typeof window === "undefined") return null;

  // If we already captured UTMs this session, return them
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as UtmParams;
    } catch {
      // Corrupted — fall through and try to re-capture
    }
  }

  // First pageview: capture UTMs from URL if present
  const utm = extractUtmFromUrl();
  if (utm) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
  }

  return utm;
}
