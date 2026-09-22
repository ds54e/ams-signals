# RF1 — Refactor deployment URLs (2026-09-22)

Status: implemented and locally verified on `work/refactor-deployment-urls`.
Review, merge, actual domain migration and deployment settings are out of scope.

## Baseline and environment

- Baseline `main`: `a829d7764c86243f68a39fb8a6b3a82583939324` (`origin/main` matched at fetch time).
- Node `v24.20.0`, npm `11.19.0`, Playwright `1.62.1` (Chromium present locally). CI uses Node 24.
- Baseline artifacts saved outside the repo (`/tmp/rf1-baseline/`): `dist/export.json`
  (sha256 `0010ae86…`), generated file list (330 files / 327 HTML pages), per-file
  sha256 manifest, and robots-meta extracts of the main routes.

## How the deployment settings work

One small plain-JS module — `src/lib/site-deployment.mjs` — resolves the public
deployment target from two environment variables and is shared by the Astro
config, the Node-side audits and the Playwright local setup:

| Variable  | Default                       | Example override                 |
|-----------|-------------------------------|----------------------------------|
| `SITE`    | `https://ds54e.github.io`     | `https://migration-test.invalid` |
| `BASE_URL`| `/ams-signals`                | `/`                              |

- Unset variables resolve to the current production target, so normal runs are
  unchanged.
- Explicitly set but invalid values throw with an explanation
  (`Invalid SITE …: <reason>. Unset SITE to use the default…`); they are never
  silently replaced by the defaults.
- Normalization rules are deliberately small: the origin must be an `http(s)`
  URL without path/query/hash/credentials; the base must start with `/`, contain
  no query/hash/whitespace/empty segments, and trailing slashes are stripped.
  `resolveSiteDeployment()` returns `{ origin, basePath, baseUrl }` where `baseUrl`
  carries exactly one trailing slash (`/` or `/ams-signals/`).

Usage:

```bash
# current deployment (defaults)
npm run check && npm run test:smoke

# root-based migration simulation (no network contact with the fake host;
# the browser only talks to the local preview)
SITE=https://migration-test.invalid BASE_URL=/ npm run check
SITE=https://migration-test.invalid BASE_URL=/ npm run test:smoke
```

The internal-link audit audits whichever target the current `dist/` was built
for; pass the same `SITE` / `BASE_URL` when auditing a non-default build.

## Main changes

- `src/lib/site-deployment.mjs` (new): deployment resolution, validation and
  slash normalization, shared by config, tools and tests. Plain JavaScript so
  `astro.config.mjs` and `tools/*.mjs` can import it without a build step.
- `astro.config.mjs`: `site` / `base` now come from `resolveSiteDeployment(process.env)`
  with the same defaults as before. `import.meta.env.SITE` / `BASE_URL` stay the
  Astro-standard runtime accessors; `src/lib/paths.ts` (`sitePath()`) is unchanged.
- `src/lib/export.ts`: `buildExportPayload()` and `exportEventRecordUrl()` now take
  the public origin explicitly (`publicOrigin` input field). The function stays
  pure and deterministic — no `process.env` reads; the origin is validated and
  normalized from its inputs only. The hard-coded `EXPORT_PUBLIC_ORIGIN` constant
  is gone; the default lives solely in `site-deployment.mjs`.
- `src/pages/export.json.ts`: passes `normalizePublicOrigin(import.meta.env.SITE)`
  and `sitePath('/')` into the payload builder — public origin comes from the
  Astro build config, never from the preview host.
- `tools/internal-link-check.mjs`: the fixed `/ams-signals/` base and the fixed
  `https://internal.invalid` resolution origin are replaced by the resolved
  deployment target. Root-relative links, base-prefixed links and absolute
  same-site links on the configured public origin are all audited; real external
  source URLs stay out of scope (no external availability checks added).
  Same-site asset references (`<link href>`, `<script src>`, `<img src>`) are now
  also checked for base compliance and existence (425 references on the current
  build). Query/hash are ignored for target lookup, so decorated links are not
  broken by the audit.
- `playwright.config.mjs`: the local `baseURL` derives from the same resolver
  (`http://127.0.0.1:4321` + resolved base). `reuseExistingServer` is now `false`
  so a stale preview server occupying the port can no longer silently serve an
  older build. `PLAYWRIGHT_BASE_URL` external targeting is unchanged.
- `tests/smoke/release-helpers.mjs`: exports `basePath` and `publicOrigin`
  resolved from the same environment; specs assert against them, so the suite
  runs against either deployment layout.
- `tests/smoke/release-surfaces.spec.mjs`: the `/export.json` recordUrl assertions
  use the resolved origin/base plus an independent shape regex instead of a fixed
  `ds54e.github.io/ams-signals` literal.
- `tests/smoke/catalog-index.ts`: the nav-href literal `/ams-signals/${route}/`
  uses the shared `basePath`.
- `tests/golden/export-contract.test.ts`: explicit literal expectations for both
  the current target (`https://ds54e.github.io/ams-signals/events/<id>/`) and a
  migration target (`https://migration-test.invalid/events/<id>/`), a
  cross-deployment equality proof (only `recordUrl` changes), and rejection of
  non-public origins. `corpus-regressions.test.ts` passes the origin explicitly.
- `tests/golden/site-deployment.test.ts` (new): pure Node contract tests for the
  resolver (defaults, overrides, slash rules, loud failures), wired into the
  existing `test:golden` → `test:contracts` → `check` path. No browser needed.
- `README.md`: short "Deployment target overrides" section documenting the two
  variables and the audit caveat.

## Verification

### Baseline (pre-change, at the base SHA)

- `npm ci --no-audit --no-fund` — OK.
- `npm run check` — PASS (327 pages, 3388 internal anchors).
- `npm run test:smoke` — **97 passed**.

### Config A — current deployment (default settings)

- `npm run check` — PASS. Internal-link audit: 3388 anchors + 425 same-site asset
  references across 327 pages at `https://ds54e.github.io/ams-signals/`.
- `dist/export.json` — **byte-identical** to the saved baseline
  (sha256 `0010ae862ed182536bad8b8d775f9f50504af7080088a7a964fdcfc80be68ce9`).
- Whole `dist/` tree — byte-identical to the baseline (per-file sha256 manifest
  and file list both match; 330 files).
- `npm run test:smoke` — **97 passed**.

### Config B — migration simulation (`SITE=https://migration-test.invalid BASE_URL=/`)

- `npm run check` (same command, env-overridden) — PASS. Internal-link audit:
  3388 anchors + 425 asset references at `https://migration-test.invalid/`.
- `dist/export.json` — deep-equal to the baseline except `events[].recordUrl`;
  all 215 recordUrls are `https://migration-test.invalid/events/<id>/` with the
  trailing slash kept. Source URLs, archive URLs, fact text, array order, project
  notes, exclusions and `schemaVersion` are unchanged. No localhost or timestamps
  appear in the export.
- Whole `dist/` tree — identical file set (330 files); 327 HTML/asset files differ
  only by the removed `/ams-signals/` base segment (verified by quote-anchored
  un-basing); `export.json` compared separately as above.
- robots meta — all 327 pages keep `<meta name="robots" content="noindex, nofollow">`.
- `npm run test:smoke` — **97 passed** against the root-based local preview
  (Timeline, Events, Event permalink, Company/Person, Articles, Analog, Digital,
  navigation/filter state and `/export.json` wiring all exercised by the suite).

### Content and presentation preservation

- `src/data/**`, `src/content/**`, `.github/workflows/**`, `package.json`
  dependencies and `package-lock.json` — untouched (`git status` clean apart from
  the intended files).
- Config A output is byte-identical to the pre-change baseline, which covers
  layout, CSS, wording, ordering and every rendered link.
- Config B output differs from config A only in the base-path segment of
  generated URLs; the corpus, routes and page count are identical, and the full
  Chromium suite passes on both layouts.

## Fault-detection checks (temporary mutations, all restored, none committed)

1. **Alternate origin ignored (export still emits the old host).** Temporarily
   hard-coded the old origin in `src/pages/export.json.ts`, rebuilt with
   `SITE=https://migration-test.invalid BASE_URL=/`, ran the export comparison:
   `AssertionError: recordUrl does not use the migration origin/base: https://ds54e.github.io/events/…`
   — caught by the comparison and, deterministically, by the new
   `tests/golden/export-contract.test.ts` alternate-origin contract. File restored
   (`git diff --check` clean afterwards).
2. **Old base segment left in a root-deployment page.** Injected
   `<a href="/ams-signals/events/">` into the built root `dist/index.html` and
   audited with `SITE=https://migration-test.invalid BASE_URL=/`:
   `Internal-link audit failed … / points to a missing built target: /ams-signals/events/`.
   The reverse mismatch (root `dist/` audited against the stale default base) is
   also caught: 4997 `escapes the configured base` issues. Restored and re-audited
   clean.
3. **Missing generated page or local asset.** `rm dist/_astro/BaseLayout.*.css` →
   `Internal-link audit failed with 327 issue(s): … references a missing built asset: /_astro/BaseLayout.Dai2pStP.css`.
   Deleting a generated data page (`dist/articles/index.html`) also aborts the
   audit non-zero with a clear `ENOENT` on the missing page (pre-existing direct
   read behavior for data-derived pages, unchanged by this refactor). Rebuilt and
   re-audited clean.

## Limitations and follow-up candidates

- `PLAYWRIGHT_BASE_URL` external targets are assumed to be deployed under the
  same base as the locally configured one (same coupling as before the refactor,
  where the base was hard-coded). Deriving the assertion base from the target URL
  could be a follow-up if external targets with a different base become routine.
- Deleting a data-derived generated page makes the link audit abort with `ENOENT`
  instead of a formatted "missing built target" report. Detection works, but a
  formatted error would read better.
- CI workflow changes (a permanent two-layout matrix) were intentionally left out;
  both layouts were verified locally as described above. Decide separately
  whether to make the root layout a blocking CI job.
- Historical documents, authored content and repository URLs that mention the old
  public URL were intentionally not rewritten.
- RF2, the actual domain migration, GitHub Pages/CNAME/DNS changes and any
  SEO-related work are out of scope for this refactor.
