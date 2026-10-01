// Public deployment target resolution shared by the Astro config, Node-side audits
// and the Playwright local setup. Plain JavaScript so every consumer (including
// astro.config.mjs and tools/*.mjs) can import it without a build step.
//
// Two environment variables override the deployment target:
//
//   SITE      public origin, e.g. https://ds54e.github.io
//   BASE_URL  public base path, e.g. /ams-signals or /
//
// When unset, the current production target (https://ds54e.github.io + /ams-signals)
// is used. Explicitly set but invalid values fail loudly with an explanation;
// they are never silently replaced by the defaults.
//
// Normalization rules (kept deliberately small):
//   origin  — must parse as an http(s) URL with no path, query, hash, or credentials.
//   base    — must start with '/', must not contain '?', '#', whitespace or empty
//             segments; trailing slashes are stripped; the empty remainder means '/'.

export const DEFAULT_PUBLIC_ORIGIN = 'https://ds54e.github.io';
export const DEFAULT_BASE_PATH = '/ams-signals';

const fail = (name, value, reason) => {
  throw new Error(
    `Invalid ${name} deployment setting ${JSON.stringify(value)}: ${reason}. `
    + `Unset ${name} to use the default, or pass a value like `
    + (name === 'SITE' ? '"https://example.com".' : '"/" or "/ams-signals".'),
  );
};

export function normalizePublicOrigin(value, name = 'SITE') {
  if (typeof value !== 'string' || value.length === 0) {
    fail(name, value, 'expected a non-empty http(s) origin');
  }
  let url;
  try {
    url = new URL(value);
  } catch {
    fail(name, value, 'not a valid URL');
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    fail(name, value, 'only http and https origins are supported');
  }
  if (url.username !== '' || url.password !== '') {
    fail(name, value, 'credentials are not allowed in a public origin');
  }
  if (url.pathname !== '/' || url.search !== '' || url.hash !== '') {
    fail(name, value, 'the origin must not carry a path, query or hash');
  }
  return url.origin;
}

export function normalizeBasePath(value, name = 'BASE_URL') {
  if (typeof value !== 'string' || value.length === 0) {
    fail(name, value, 'expected "/" or a path starting with "/"');
  }
  if (!value.startsWith('/')) {
    fail(name, value, 'the base path must start with "/"');
  }
  if (/[?#\s]/.test(value)) {
    fail(name, value, 'the base path must not contain query, hash or whitespace');
  }
  const stripped = value.replace(/\/+$/, '');
  if (stripped === '') return '/';
  if (stripped.slice(1).split('/').some((segment) => segment === '')) {
    fail(name, value, 'the base path must not contain empty segments');
  }
  return stripped;
}

/**
 * Resolve the public deployment target from an environment-like object.
 * Absent variables fall back to the production defaults; present but invalid
 * variables throw with an explanation.
 */
export function resolveSiteDeployment(env = process.env) {
  const origin = env.SITE === undefined
    ? DEFAULT_PUBLIC_ORIGIN
    : normalizePublicOrigin(env.SITE, 'SITE');
  const basePath = env.BASE_URL === undefined
    ? DEFAULT_BASE_PATH
    : normalizeBasePath(env.BASE_URL, 'BASE_URL');
  return {
    origin,
    basePath,
    /** Base path with exactly one trailing slash, e.g. '/ams-signals/' or '/'. */
    baseUrl: basePath === '/' ? '/' : `${basePath}/`,
  };
}
