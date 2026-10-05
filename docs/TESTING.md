# Verification and test ownership

This document owns verification rationale and test placement, not frozen test counts, timings, worker values or a CI migration plan. [package.json](../package.json), [Playwright configuration](../playwright.config.mjs) and [CI](../.github/workflows/ci.yml) own the current executable configuration. [RELEASING.md](../RELEASING.md) owns production approval and deployment gates.

## Choose verification by impact

For code or published-content changes, `npm run check` is the deterministic gate. It includes validation, fact lint, duplicate review signals, contract tests, static build and output audits. Its component commands come from package.json; do not copy an independently maintained command sequence into every guide.

Viewer/navigation/release changes also use `npm run test:smoke`, which builds and tests a local preview by default. Catalog presentation changes use the relevant browser coverage and visual checks. Targeted checks are useful while iterating; do not repeatedly run unrelated suites after every small edit or replace a required final gate with a narrow test.

Documentation/guidance-only changes require whitespace, Markdown parsing, local link/anchor and instruction-consistency checks, plus confirmation that application/content/configuration inputs are unchanged. No full build/browser run is needed for those changes alone. This exception does not alter the existing PR CI jobs. Report what ran, what did not and any access limitation separately from a test failure.

## Deterministic versus browser contracts

Golden validation owns record shape, references, dates and source requirements. Fact lint helps protect source modality; the duplicate checker supplies warnings requiring editorial judgment. Neither tool proves a public claim or decides whether two records are one milestone.

Node tests in `tests/golden/` own pure export projection, exclusions, ordering, timeline transforms and Matrix geometry. `tests/articles/`, `tests/analog/` and `tests/digital/` own their independent data contracts. Build and output audits own generated links, origin/base paths, indexing and analytics markup. Browser tests own interaction, DOM wiring, layout, stacking, accessibility and responsive behavior.

For the Activity Matrix, `activity-matrix.test.ts` owns fixed boundary fixtures, including the inclusive 32px proximity window and anchor-based grouping. `activity-matrix-corpus.test.ts` checks source-date projection, complete grouping and packing across the current corpus. The browser suite compares the served geometry metadata with the source model, then checks actual rectangles, filtering and direct Event interaction; it does not reimplement projection or bundle membership in percentage coordinates.

A valid content addition should not require editing unrelated test literals for totals, active entities, activity order, period density or packing. Derive expectations independently from source inputs where possible; comparing rendered output only with itself proves little. Keep explicit identities only when they are intentional fixtures: export exclusions, canonical successors, rejected identities or historical associations. Retire old import-wave totals/check dates rather than converting them into permanent product requirements. Do not weaken exact semantics into vague lower bounds.

## Where a new browser assertion belongs

| Concern | Owner under `tests/smoke/` |
| --- | --- |
| Rendered surfaces, terminology, chrome, overlay/stacking and export wiring | `release-surfaces.spec.mjs` |
| Search, Signal-type filtering, Company picker and discoverability | `release-discovery.spec.mjs` |
| Matrix bands, bundles, projection, row order and sticky labels | `release-matrix.spec.mjs` |
| URL/filter transitions, inspector selection and cross-surface navigation | `release-navigation.spec.mjs` |
| Shared visual primitives, semantic palette or Timeline glyphs | `visual-system.spec.ts`, `category-palette.spec.ts`, `timeline-visual.spec.ts` |

Use the domain catalog browser suites for catalog behavior; `catalog-index.ts` owns shared catalog assertions. Pure logic belongs in Node tests even when its output is later rendered.

Each release spec registers `installBrowserErrorGuards(test)` at module scope. `release-helpers.mjs` owns shared readiness/corpus/label helpers; a hook declared only inside an imported helper can attach to the first loaded suite. Preserve test-name and URL/surface diagnostics, plus the configured failure traces/screenshots/video. Do not suppress unrelated console errors to make a test pass.

## Local, production-shaped and live checks

Default local preview uses the configured origin/base shape without contacting production. Playwright does not reuse an arbitrary server on its port. Setting `PLAYWRIGHT_BASE_URL` targets an external deployed site and must not be mistaken for a disposable local test.

Keep the same `SITE` / `BASE_URL` across build and output audits. The fallback and CI root-shape builds are uninstrumented; a production-shaped build includes the Cloudflare beacon. Production browser tests intercept only the exact analytics origins, preserving other external-request/error guards. They verify the deployed application and served markup, not live collector ingestion. A normal real-browser visit plus provider-side data is the separate ingestion check.

For test/CI refactors, use temporary representative faults to show the intended layer still catches failures: invalid references or lost source modality; export/order/geometry changes; broken filtering/inspector/stacking; broken generated links; domain-schema violations. Select faults for the affected boundary, never commit them, and report which gate detected each. Preserve named product fixtures and blocking browser checks.
