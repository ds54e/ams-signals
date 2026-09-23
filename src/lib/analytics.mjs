// Cloudflare Web Analytics configuration shared by the layout and the
// deterministic analytics audit, so the production-only emission rule and the
// public site token have a single source of truth.
//
// The site token is intentionally public: it is served inside page HTML and is
// not a Cloudflare API credential. Emission is derived from the configured
// deployment origin — never from the browser's runtime hostname — and needs no
// environment variable, Actions Variable or secret.

/** Hostname that identifies the public production deployment. */
export const ANALYTICS_HOST = 'ams-signals.com';

/** Public Cloudflare Web Analytics site token, also present in served HTML. */
export const ANALYTICS_SITE_TOKEN = '897881606f41408d8198fac48687f5b2';

/** Beacon script served from Cloudflare's static host. */
export const ANALYTICS_BEACON_SRC = 'https://static.cloudflareinsights.com/beacon.min.js';

/** Collector that the beacon reports page views to. */
export const ANALYTICS_COLLECTOR_ORIGIN = 'https://cloudflareinsights.com';

/**
 * The only origins Cloudflare Web Analytics traffic can come from. Kept narrow
 * and exact: consumers use it to recognise this deliberate integration, never to
 * ignore third-party traffic in general.
 */
export const ANALYTICS_REQUEST_ORIGINS = Object.freeze([
  new URL(ANALYTICS_BEACON_SRC).origin,
  ANALYTICS_COLLECTOR_ORIGIN,
]);

/**
 * Whether `url` belongs to Cloudflare Web Analytics. Accepts a URL or a string;
 * anything unparseable is not analytics traffic.
 */
export function isAnalyticsRequest(url) {
  let origin;
  try {
    origin = new URL(url).origin;
  } catch {
    return false;
  }
  return ANALYTICS_REQUEST_ORIGINS.includes(origin);
}

/**
 * Whether a deployment configured for `site` should emit the analytics beacon.
 * `site` is the configured Astro `site` URL holding the public origin, so only
 * the production host is instrumented and every other target stays clean.
 */
export function analyticsEnabledFor(site) {
  return site?.hostname === ANALYTICS_HOST;
}
