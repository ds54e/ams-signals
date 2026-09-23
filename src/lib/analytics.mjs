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

/**
 * Whether a deployment configured for `site` should emit the analytics beacon.
 * `site` is the configured Astro `site` URL holding the public origin, so only
 * the production host is instrumented and every other target stays clean.
 */
export function analyticsEnabledFor(site) {
  return site?.hostname === ANALYTICS_HOST;
}
