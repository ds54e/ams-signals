# Verification and test ownership

This document owns verification rationale and test placement, not duplicated executable configuration. [package.json](../package.json), [Playwright configuration](../playwright.config.mjs) and [CI](../.github/workflows/ci.yml) own the current executable configuration. [RELEASING.md](../RELEASING.md) owns production approval and deployment gates.

## Choose verification by impact

For code or published-content changes, `npm run check` is the deterministic gate. It includes validation, fact lint, duplicate review signals, contract tests, static build and output audits. Its component commands come from package.json; do not copy an independently maintained command sequence into every guide.

Viewer/navigation/release changes also use `npm run test:smoke`, which builds and tests a local preview by default. Catalog presentation changes use the relevant browser coverage and visual checks. Targeted checks are useful while iterating; do not repeatedly run unrelated suites after every small edit or replace a required final gate with a narrow test.

Documentation/guidance-only changes require whitespace, Markdown parsing, local link/anchor and instruction-consistency checks, plus confirmation that application/content/configuration inputs are unchanged. No full build/browser run is needed for those changes alone. This exception does not bypass CI. Report what ran, what did not and any access limitation separately from a test failure.

## Deterministic versus browser contracts

Golden validation owns record shape, references, dates and source requirements. Fact lint helps protect source modality; the duplicate checker supplies warnings requiring editorial judgment. Neither tool proves a public claim or decides whether two records are one milestone.

Node tests in `tests/golden/` own canonical corpus regressions, ordering, timeline transforms and Matrix geometry. `tests/analog/`, `tests/digital/` and `tests/lab/` own independent catalog contracts. `tests/build/` owns build-audit behavior with disposable static-site fixtures. Build and output audits own generated links, origin/base paths, indexing and analytics markup. The indexing audit checks every expected empty entity file and its empty-state message; a small disposable fixture proves detection of an indexable page missing from the sitemap without cloning the real build. `tools/lib/built-site.mjs` shares output/corpus reading; `tools/lib/indexing.mjs` checks every HTML page against both source-derived route order and the built canonical set. Empty Company/Person pages must be crawlable, emit `noindex, follow`, and stay out of the sitemap; all other public HTML pages remain indexable. Indexing smoke tests derive entity eligibility from the source corpus and verify factual Event HTML without JavaScript. Local smoke checks served indexing endpoints, representative active/empty entity HTTP responses and every named unsupported route's 404. It does not repeat the complete static metadata audit in Chromium. Live verification keeps changed/deleted real routes mandatory and reports the synthetic missing-route probe separately as a non-blocking hosting diagnostic. A provider failure is unconfirmed, not a successful 404 check. Browser tests own interaction, DOM wiring, layout, stacking, accessibility and responsive behavior.

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

Use Playwright's request fixture for HTTP-only checks so they do not start Chromium. Browser DOM, layout, keyboard and no-JavaScript checks stay in Chromium. When validating every catalog row, capture one browser snapshot for that assertion and compare it against the source in Node. Use retryable Playwright assertions for interactions and synchronous Node assertions for scalar checks on an already captured snapshot. Keep the row ID in snapshot diagnostics; do not replace full-catalog checks with a sample. For CSS-only responsive assertions, reuse a loaded surface across viewport changes; retain separate navigation and interaction coverage.

Browser visual assertions run in the full regression. For manual visual review, set `SMOKE_VISUAL_EVIDENCE=1` when running smoke tests to capture reference PNGs at selected intermediate states. These PNGs are not compared against baselines, so regular CI does not generate them. Failure traces and screenshots remain automatic.

Timeline visual coverage runs every global width in light and dark. Entity lanes run at desktop and narrow widths in both themes. The global filter/clear/restore journey runs at desktop and mobile widths; the other widths still check sticky paint and stripes. Computed geometry and paint stay covered across the viewport matrix. Keyboard and pointer interaction run on representative desktop/mobile cases per surface and palette; forced colors and native scrolling remain blocking. Home data, order and SVG metadata are asserted once; layout and narrow keyboard scrolling retain their viewport checks. Run SMOKE_FULL_TIMELINE_MATRIX=1 npm run test:smoke when investigating interactions at additional combinations; this restores the full desktop/mobile, surface and theme matrix. CI traces keep DOM and network context without the screenshot filmstrip; the standalone failure image is retained.

## Continuous integration and release regression

The preparation job classifies impact, validates the separate root-domain shape and runs the complete deterministic gate against the fallback build. The core run tests that build on the same runner. Full regression shares one fallback artifact between three Playwright lanes grouped by measured work. The integration lane automatically includes new specs not assigned elsewhere; none of the lanes rebuild the site. The `Validate and test` gate requires preparation and exactly the expected Chromium outcome.

For changes exclusively to known Golden JSON records, catalog Markdown records or activity snapshots, [the change classifier](../tools/ci-impact.mjs) selects shared Home and HTTP smoke tests (`@core-common`) plus the affected areas (`@core-golden`, `@core-analog`, `@core-digital`, `@core-lab`). Keep full-corpus rendering, representative search/filter behavior, Timeline/Events/Inspector navigation and responsive catalog access in their owning area. The deterministic gate checks every area even on a content-only push. For all core tests locally use `npm run test:smoke -- --grep @core`. The classifier compares the immutable push-before or PR base SHA to the checkout. It can fetch that exact commit when it is outside the shallow checkout. Other changes, unresolved history, empty diffs, scheduled runs and manual runs use the entire suite. Renames check both paths; do not infer content-only status from a missing or truncated diff. The classifier has Node contract tests.

Hosted runners install the locked Chromium headless shell and probe its launch. Install OS dependencies if the probe fails, then require a successful launch. [Pages](../.github/workflows/pages.yml) calls the same [CI workflow](../.github/workflows/ci.yml) for a full fallback browser run at the exact deployment revision. Its separate artifact job runs the complete deterministic gate against the publish target. A successful core run is not a successful full regression.

Browser failure traces and screenshots remain short-lived artifacts. These tests visit public/local pages without authenticated browser state; keep credentials and private fixtures out of recorded requests and attachments. Normal CI does not deploy. The `ci/**` branch pattern allows CI experiments without publishing or changing main.

## Local, production-shaped and live checks

Default local preview uses the configured origin/base shape without contacting production. Playwright does not reuse an arbitrary server on its port. Setting `PLAYWRIGHT_BASE_URL` targets an external deployed site and must not be mistaken for a disposable local test.

Keep the same `SITE` / `BASE_URL` across build and output audits. The fallback and CI root-shape builds are uninstrumented; a production-shaped build includes the Cloudflare beacon. Production browser tests intercept only the exact analytics origins, preserving other external-request/error guards. They verify the deployed application and served markup, not live collector ingestion. A normal real-browser visit plus provider-side data is the separate ingestion check.

For test/CI refactors, use temporary representative faults to show the intended layer still catches failures: invalid references or lost source modality; order/geometry changes; broken filtering/inspector/stacking; broken generated links; domain-schema violations. Select faults for the affected boundary, never commit them, and report which gate detected each. Preserve named product fixtures and blocking browser checks.

## Delivery-only verification

`npm run test:live` uses `playwright.live.config.mjs` and `tests/live/`, outside the full CI smoke test directory. It requires explicit production URL/settings, expected and previous production SHAs, and a successful exact-SHA manual deploy run. It does not rebuild, publish, launch a preview server, or retry failed tests. The previous production SHA drives changed/deleted Golden route checks; the complete deterministic and browser contracts remain mandatory release gates. Use this smaller suite only after publication, not as a substitute for local or CI regression coverage. See RELEASING.md for the invocation and evidence requirements.
