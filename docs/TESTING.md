# Verification and test ownership

This document owns verification rationale and test placement, not duplicated executable configuration. [package.json](../package.json), [Playwright configuration](../playwright.config.mjs) and [CI](../.github/workflows/ci.yml) own the current executable configuration. [RELEASING.md](../RELEASING.md) owns production approval and deployment gates.

## Choose verification by impact

For code or published-content changes, `npm run check` is the deterministic gate. It includes validation, fact lint, duplicate review signals, contract tests, static build and output audits. Its component commands come from package.json; do not copy an independently maintained command sequence into every guide.

Viewer/navigation/release changes also use `npm run test:smoke`, which builds and tests a local preview by default. Catalog presentation changes use the relevant browser coverage and visual checks. Targeted checks are useful while iterating; do not repeatedly run unrelated suites after every small edit or replace a required final gate with a narrow test.

Documentation/guidance-only changes require whitespace, Markdown parsing, local link/anchor and instruction-consistency checks, plus confirmation that application/content/configuration inputs are unchanged. No full build/browser run is needed for those changes alone. This exception does not bypass CI. Report what ran, what did not and any access limitation separately from a test failure.

## Deterministic versus browser contracts

Golden validation owns record shape, references, dates and source requirements. Fact lint helps protect source modality; the duplicate checker supplies warnings requiring editorial judgment. Neither tool proves a public claim or decides whether two records are one milestone.

Node tests in `tests/golden/` own canonical corpus regressions, ordering, timeline transforms and Matrix geometry. `tests/analog/`, `tests/digital/` and `tests/lab/` own independent catalog contracts. `tests/build/` owns build-audit behavior with disposable static-site fixtures. Build and output audits own generated links, origin/base paths, indexing and analytics markup. `tools/lib/built-site.mjs` shares output/corpus reading; `tools/lib/indexing.mjs` checks every HTML page against both source-derived route order and the built canonical set. Empty Company/Person pages must be crawlable, emit `noindex, follow`, and stay out of the sitemap; all other public HTML pages remain indexable. Indexing smoke tests derive entity eligibility from the source corpus and verify factual Event HTML without JavaScript. Unsupported routes must not build; local smoke checks their 404 responses. Live verification keeps changed/deleted real routes mandatory and reports the synthetic missing-route probe separately as a non-blocking hosting diagnostic. A provider failure is unconfirmed, not a successful 404 check. Browser tests own interaction, DOM wiring, layout, stacking, accessibility and responsive behavior.

For the Activity Matrix, `activity-matrix.test.ts` owns fixed boundary fixtures, including the inclusive 32px proximity window and anchor-based grouping. `activity-matrix-corpus.test.ts` checks source-date projection, complete grouping and packing across the current corpus. The browser suite compares the served geometry metadata with the source model, then checks actual rectangles, filtering and direct Event interaction; it does not reimplement projection or bundle membership in percentage coordinates.

A valid content addition should not require editing unrelated test literals for totals, active entities, activity order, period density or packing. Derive expectations independently from source inputs where possible; comparing rendered output only with itself proves little. Keep explicit identities only when they are intentional fixtures: canonical successors, rejected identities or historical associations. Do not weaken exact semantics into vague lower bounds.

Golden date fixtures cover calendar validity, precision, range order and nested-record rejection. Activity-order fixtures make competing statistical keys disagree. Catalog and Home expectations handle `unfetched` records: they have no activity date/counts, sort after dated entries and never count as reviewed activity.

## Where a new browser assertion belongs

| Concern | Owner under `tests/smoke/` |
| --- | --- |
| Home data wiring/layout, rendered surfaces, terminology, chrome, overlay/stacking and record wiring | `release-surfaces.spec.mjs` |
| Search, Signal-type filtering, Company picker and discoverability | `release-discovery.spec.mjs` |
| Matrix bands, bundles, projection, row order and sticky labels | `release-matrix.spec.mjs` |
| URL/filter transitions, inspector selection and cross-surface navigation | `release-navigation.spec.mjs` |
| Shared visual primitives, semantic palette or Timeline glyphs | `visual-system.spec.ts`, `category-palette.spec.ts`, `timeline-visual.spec.ts` |

Use the domain catalog browser suites for catalog behavior; `catalog-index.ts` owns shared catalog assertions. Pure logic belongs in Node tests even when its output is later rendered.

Each release spec registers `installBrowserErrorGuards(test)` at module scope. `release-helpers.mjs` owns shared readiness/corpus/label helpers; a hook declared only inside an imported helper can attach to the first loaded suite. Preserve test-name and URL/surface diagnostics, plus the configured failure traces and screenshots. Local smoke and live verification also retain video on failure; CI does not record successful browser sessions just to discard their videos. Do not suppress unrelated console errors to make a test pass.

Use Playwright's request fixture for HTTP-only checks so they do not start Chromium. Browser DOM, layout, keyboard and no-JavaScript checks stay in Chromium. When validating every catalog row, capture one browser snapshot for that assertion and compare it against the source in Node. Use retryable Playwright assertions for interactions and synchronous Node assertions for scalar checks on an already captured snapshot. Keep the row ID in snapshot diagnostics; do not replace full-catalog checks with a sample.

Browser visual assertions run in the full regression. For manual visual review, set `SMOKE_VISUAL_EVIDENCE=1` when running smoke tests to capture reference PNGs at selected intermediate states. These PNGs are not compared against baselines, so regular CI does not generate them. Failure traces and screenshots remain automatic.

Timeline visual coverage runs every global width in light and dark. Entity lanes run at desktop and narrow widths in both themes. The global filter/clear/restore journey runs at desktop and mobile widths; the other widths still check sticky paint and stripes. Keyboard, click/hover, forced colors and native scrolling remain blocking. Run SMOKE_FULL_TIMELINE_MATRIX=1 npm run test:smoke when investigating interactions at additional combinations; this restores the full desktop/mobile, surface and theme matrix. CI traces keep DOM and network context without the screenshot filmstrip; the standalone failure image is retained.

## Continuous integration and release regression

Every CI run validates the separate root-domain shape and runs the complete deterministic gate against the fallback build. In parallel, Chromium tests use a fresh fallback build at the same revision. The `Validate and test` job requires all upstream jobs to succeed.

For changes exclusively to known Golden JSON records, catalog Markdown records or activity snapshots, [the change classifier](../tools/ci-impact.mjs) selects the core browser tests (explicit `@core` tags). Keep full-corpus rendering, representative search/filter behavior, Home, Timeline/Events/Inspector navigation, responsive catalog access and basic served-route checks in this subset. Other changes, missing history, empty diffs, scheduled runs and manual runs use the entire suite. Renames check both paths; do not infer content-only status from a missing or truncated diff. The classifier has Node contract tests.

The [shared Chromium workflow](../.github/workflows/browser.yml) runs the full suite in four parallel shards with independent previews and unique failure artifacts; the core subset uses one shard. All existing browser assertions remain in the full suite. Both are blocking in their selected CI scope. Every manual Pages deployment also requires all full-regression shards on its exact revision before publication. A successful core run is not a successful full regression.

Browser failure traces and screenshots remain short-lived artifacts. These tests visit public/local pages without authenticated browser state; keep credentials and private fixtures out of recorded requests and attachments. Normal CI does not deploy. The `ci/**` branch pattern allows CI experiments without publishing or changing main.

## Local, production-shaped and live checks

Default local preview uses the configured origin/base shape without contacting production. Playwright does not reuse an arbitrary server on its port. Setting `PLAYWRIGHT_BASE_URL` targets an external deployed site and must not be mistaken for a disposable local test.

Keep the same `SITE` / `BASE_URL` across build and output audits. The fallback and CI root-shape builds are uninstrumented; a production-shaped build includes the Cloudflare beacon. Production browser tests intercept only the exact analytics origins, preserving other external-request/error guards. They verify the deployed application and served markup, not live collector ingestion. A normal real-browser visit plus provider-side data is the separate ingestion check.

For test/CI refactors, use temporary representative faults to show the intended layer still catches failures: invalid references or lost source modality; order/geometry changes; broken filtering/inspector/stacking; broken generated links; domain-schema violations. Select faults for the affected boundary, never commit them, and report which gate detected each. Preserve named product fixtures and blocking browser checks.

## Delivery-only verification

`npm run test:live` uses `playwright.live.config.mjs` and `tests/live/`, outside the full CI smoke test directory. It requires explicit production URL/settings, expected and previous production SHAs, and a successful exact-SHA manual deploy run. It does not rebuild, publish, launch a preview server, or retry failed tests. The previous production SHA drives changed/deleted Golden route checks; the complete deterministic and browser contracts remain mandatory release gates. Use this smaller suite only after publication, not as a substitute for local or CI regression coverage. See RELEASING.md for the invocation and evidence requirements.
