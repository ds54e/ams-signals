# CI Architecture Review — 2026-09-21

Baseline: `main@77b3b8135a6d67b92a7add52315b426c4a69d4df`

## Why this review exists

Recent content-only refreshes repeatedly failed the Chromium job while deterministic validation passed. The failures were caused by expected corpus-derived values changing after legitimate Golden Event additions, for example total Event/Company counts, represented Timeline counts, activity ordering, and Matrix visual-row membership.

The goal is not to weaken CI. It is to separate stable product contracts from mutable corpus snapshots so that:

- normal content additions do not require unrelated smoke-test edits;
- genuine schema, export, ordering, filtering, geometry, accessibility, and interaction regressions still block;
- browser tests cover behavior that needs a browser;
- pure data/geometry contracts run as deterministic Node tests.

## Current structural findings

- `tests/smoke/release.spec.mjs` is approximately 149 KB and contains 35 tests / 745 `expect(` calls.
- It currently mixes Golden data/export contracts, derived corpus calculations, UI interaction, DOM semantics, layout geometry, accessibility, responsive behavior, and copy contracts.
- `src/lib/activityMatrix.ts` and `src/lib/timeline.ts` already expose substantial pure logic suitable for direct unit/contract testing.
- `tests/smoke/activity-matrix-geometry.spec.ts` (6 tests) and `tests/smoke/articles.spec.ts` (2 tests) are already pure tests despite running under Playwright.
- Analog and Digital already use `node:test` for domain contracts; Golden/Timeline should converge on the same separation.

## Classification rule

- **KEEP PLAYWRIGHT** — the contract fundamentally depends on browser navigation, DOM state, interaction, layout, paint/stacking, responsive behavior, accessibility semantics, or URL mutation.
- **MOVE TO NODE** — the contract is pure data transformation, export composition, sorting, filtering, or geometry logic and can be tested directly without rendering.
- **SPLIT** — one test currently combines both. Move the pure/data half to Node and retain a smaller browser assertion for rendered/interactive behavior.

## release.spec.mjs classification

| # | Current test | Decision | Target contract |
|---|---|---|---|
| 1 | Timeline is the temporal view with filters and one Evidence Inspector | KEEP PLAYWRIGHT | Page/surface structure, metadata, controls, inspector presence. |
| 2 | Articles publishes every authored document and keeps editorial links separate | SPLIT | Node/build: authored inventory and related-Event relationships. Browser: routes, 404 compatibility boundary, rendered navigation/content. |
| 3 | canonical JSON export contains the complete factual corpus | MOVE TO NODE | Export payload composition, exclusions, ordering, schema-level invariants, record URLs, source normalization. Remove mutable absolute corpus counts. |
| 4 | historical predecessor searches resolve through canonical Company groups | KEEP PLAYWRIGHT | Search interaction and canonical-group presentation. Data canonicalization may get separate Node coverage later. |
| 5 | selecting a Timeline mark updates the Evidence Inspector | KEEP PLAYWRIGHT | Direct interaction contract. |
| 6 | Event bundles retain direct Event interaction and reduce cleanly under filtering | SPLIT | Node: bundling membership/geometry algorithm. Browser: bundled marks remain individually interactive and filters reduce visibility correctly. |
| 7 | Events is the chronological textual view without a Timeline or inspector | KEEP PLAYWRIGHT | Surface composition and chronological rendered view. Replace hard-coded total with derived current corpus count. |
| 8 | Event detail is a centered factual document with Evidence and no editorial reverse links | KEEP PLAYWRIGHT | Layout and rendered evidence separation. |
| 9 | People-only Events remain in the unfiltered corpus and obey narrowed Company filters | SPLIT | Node: people-only Event inclusion/export relationship. Browser: Company filtering behavior. |
| 10 | Lunlun is a normal two-Event viewer trajectory that remains outside the factual export | SPLIT | Node: explicit export exclusion contract. Browser: special viewer trajectory remains accessible/interactable. Lunlun-specific fixed fixture values are intentional. |
| 11 | global Timeline Event sets remain subsets of the complete Events record | KEEP PLAYWRIGHT | Rendered Timeline vs Events-set consistency under lenses. |
| 12 | explicit Search and Company Focus discovery preserve complete matching Event access | KEEP PLAYWRIGHT | Discoverability interaction. |
| 13 | singleton Companies and People are browse-suppressed but deliberately discoverable | SPLIT | Node: singleton classification from corpus. Browser: browse suppression and explicit discovery. No fixed singleton totals. |
| 14 | Timeline and Events navigation preserves shared state without carrying hidden filters | KEEP PLAYWRIGHT | URL/navigation state contract. |
| 15 | Company picker is readable, searchable, and independently clearable | KEEP PLAYWRIGHT | Picker interaction/layout. Derive active-company count instead of fixing 65. |
| 16 | recent-activity row ordering and alphabetical Company picker stay filter-stable | SPLIT | Node: activity stats/order comparator and picker ordering inputs. Browser: rendered order matches computed contract and filters do not reorder. |
| 17 | zero-Event researched Company pages still build without primary Timeline links | KEEP PLAYWRIGHT | Route/render/empty-state behavior. |
| 18 | global Activity Matrix uses progressive time bands and deterministic bundle modes | SPLIT | Node: domain, band widths, placement, bundles, rows, density and deterministic ordering from corpus. Browser: serialized metadata agrees with computed geometry and basic render contract. Do not snapshot current multi-row Company list. |
| 19 | global Matrix uses the corpus domain while context Timelines retain derived historical ranges | SPLIT | Node: domain/range derivation. Browser: global Matrix vs context Timeline surface distinction. |
| 20 | Timeline utility bar places count and legend beside the compact controls | KEEP PLAYWRIGHT | Toolbar layout/legend. Derive visible/total counts. |
| 21 | Search and Company filter never change Matrix geometry or row order | KEEP PLAYWRIGHT | Critical browser-level immutability under interaction. |
| 22 | Activity Matrix axis and rows share temporal-track geometry at every responsive width | KEEP PLAYWRIGHT | Browser geometry. |
| 23 | Matrix fills available width, scrolls only its derived excess locally, and preserves initial-lens reveal behavior | KEEP PLAYWRIGHT | Browser scroll/layout behavior. |
| 24 | global Matrix sticky labels occlude active marks without clearing selection | KEEP PLAYWRIGHT | Paint/stacking/selection. |
| 25 | global Matrix is one accessible interleaved view with restrained entity colors | KEEP PLAYWRIGHT | Accessibility/render/color grammar. |
| 26 | legacy Entity-view URLs canonicalize to the combined global surfaces | KEEP PLAYWRIGHT | URL canonicalization/navigation. Replace corpus total literal with derived total. |
| 27 | Company Focus panel owns overlapping pixels above every Timeline stacking context | KEEP PLAYWRIGHT | Stacking/paint behavior. |
| 28 | Timeline always shows both Signal types while Events retains kind filtering | SPLIT | Node: kind inventory/count relationships. Browser: Timeline has no kind filter and Events kind interaction works. No fixed 149/68/217 literals. |
| 29 | shared Events remain one list record and one inspector record | KEEP PLAYWRIGHT | Render deduplication across shared entities. |
| 30 | unavailable originals remain labels and Event permalinks remain live | KEEP PLAYWRIGHT | Rendered source-availability and route behavior. |
| 31 | Company and Person Timeline labels occlude active Event marks | KEEP PLAYWRIGHT | Paint/stacking. |
| 32 | Company-first and People-first behavior remains intact | KEEP PLAYWRIGHT | Context-surface behavior and geometry stability. Pure timeline geometry remains separately unit-tested. |
| 33 | Timeline and Events expose their final surface-specific controls and terminology | KEEP PLAYWRIGHT | UI controls, labels, responsive sizing, URL behavior. Derive Company total. |
| 34 | Inspector and context pages use Event, Evidence, and Entity terminology | KEEP PLAYWRIGHT | Rendered terminology contract. |
| 35 | narrow viewports retain basic access without a mobile chronology fallback | KEEP PLAYWRIGHT | Responsive browser contract. |

Summary for the 35 tests:

- KEEP PLAYWRIGHT: 25
- MOVE TO NODE: 1
- SPLIT: 9

The exact final test count may change because split tests should become smaller focused tests rather than preserving a one-to-one count.

## Additional tests currently in Playwright that should move to Node

These do not require a browser today:

### `tests/smoke/activity-matrix-geometry.spec.ts`

Move all 6 tests to a Node unit suite for `src/lib/activityMatrix.ts`:

1. content-aware time-band widths
2. band sizing clamps
3. chronological projection
4. recent/period bundle boundaries
5. bundle column/row sizing
6. row-aware packing

### `tests/smoke/articles.spec.ts`

Move both tests to Node:

1. newest-first Article sort
2. related Event resolution and validation

This removes 8 tests from the Playwright runner without reducing coverage.

## Mutable literals to eliminate from browser tests

Browser tests should not require edits when ordinary Golden content is added.

Remove or derive expectations such as:

- total Companies = 66
- active Companies = 65
- total viewer Events = 217
- exported Events = 215
- Technical Events = 149 / exported Technical = 147
- Timeline represented Events = 189
- singleton Company count = 35
- current top-10 Company ordering as a hard-coded list
- NXP/Broadcom current Event totals when used only to reconstruct general ordering
- current `visualRowCount` for named Companies
- complete list of Companies whose Matrix lane currently spans more than one row

Instead:

- derive totals from the source collection/export under test;
- compare UI state with an independently computed expected result;
- test ordering algorithms with synthetic fixtures in Node;
- retain named real-corpus fixtures only when the identity itself is an intentional durable product contract.

## Intentional fixed fixtures that may remain

Fixed named fixtures are acceptable where they represent explicit product behavior rather than incidental corpus density, for example:

- Lunlun remains visible to the viewer but excluded from factual export;
- a known unavailable original remains visibly labeled unavailable;
- known predecessor names resolve into canonical Company groups;
- a shared Event appears only once even when multiple selected Companies participate;
- representative Company and Person context pages exercise distinct surfaces.

These should be few, documented, and chosen for semantic behavior rather than current ranking/density.

## Proposed target test layers

### 1. Content validation — blocking, Node

Keep and strengthen:

- `tools/validate.mjs`
- `tools/fact-lint.mjs`
- duplicate review check
- Analog/Digital schema/activity validation

Add a Golden content-contract suite rather than putting these assertions in Chromium.

### 2. Golden/unit contracts — blocking, Node

Create focused Node suites for:

- export composition and exclusions
- Event sorting/date semantics
- Company/People activity stats and ordering
- singleton/browse eligibility
- Activity Matrix pure geometry against synthetic fixtures and selected corpus-derived invariants
- Timeline pure geometry
- Article ordering/relationships

A useful implementation improvement is to extract shared pure functions used by `EventExplorer.astro` instead of duplicating ordering/filter calculations in tests.

### 3. Build integrity — blocking

Keep:

- Astro build
- internal-link audit
- static relationship checks

Prefer built-output checks here when a browser adds no value.

### 4. Browser smoke — blocking, Playwright

Retain only contracts that need a browser:

- navigation/query-state
- search/filter/picker interaction
- inspector interaction
- rendered route/surface distinctions
- accessibility-facing DOM semantics
- responsive layout
- scroll behavior
- paint/stacking
- browser geometry
- source-link rendering

Browser expected counts should be computed from current rendered/source data, not copied literals.

## CI workflow direction

Do not introduce path-based skipping yet. Content changes can legitimately alter Timeline rendering.

Recommended initial workflow:

1. **Deterministic contracts**
   - `npm ci`
   - Node content/unit/contract suites
   - build
   - internal-link audit

2. **Chromium UI**
   - `npm ci`
   - install Chromium
   - build/preview
   - reduced browser-only Playwright suite

Keep both blocking.

Do not parallelize browser tests until state independence is demonstrated after the suite reduction.

Keep the manual Pages workflow's own deterministic validation/build for now; its cost is small and it validates the exact deployed main SHA.

## Refactoring sequence

### Phase 1 — low risk

- Move the 6 pure Activity Matrix tests from Playwright to Node.
- Move the 2 pure Article tests from Playwright to Node.
- Add Golden Node contract-test infrastructure.
- Move export composition out of `release.spec.mjs`.
- Replace obvious browser corpus-size literals with derived expectations.
- Preserve behavior and UI exactly.

### Phase 2 — eliminate content-refresh brittleness

- Extract pure Activity Matrix entity ordering/stat calculation from `EventExplorer.astro`.
- Test it with synthetic fixtures and current-corpus invariants in Node.
- Split tests 13, 16, 18, 19, and 28.
- Remove real-corpus density snapshots such as named multi-row lane lists.
- Verify that adding a synthetic/new Golden Event does not require changing smoke source code.

### Phase 3 — release.spec decomposition

After responsibility has moved, split the remaining browser tests into focused files such as:

- `timeline-ui.spec.ts`
- `events-ui.spec.ts`
- `navigation.spec.ts`
- `context-pages.spec.ts`
- `responsive.spec.ts`

The split is organizational only; do not duplicate assertions.

### Phase 4 — prove protection was not weakened

Use controlled fault injections and confirm the new CI rejects at least:

- unknown Company ID
- invalid/no source
- inference-like Golden fact
- duplicate relationship
- broken export exclusion
- reversed Event ordering
- broken active/singleton calculation
- broken Matrix bundle/row packing
- filter-induced Matrix reordering
- duplicate shared Event rendering
- broken unavailable-source labeling
- broken internal Event/Company/Person link
- broken Timeline/Events navigation state
- obvious narrow-layout regression

Only after this should runtime optimization or multiple Playwright workers be considered.

## Success criteria

A routine content-only Golden refresh that adds valid Events/Companies must:

- require no smoke-test source edits solely because corpus counts or density changed;
- pass Node contracts automatically when all derived relationships are correct;
- still run browser smoke against the resulting real corpus;
- fail only for genuine data-contract, build, interaction, rendering, accessibility, or geometry regressions.

The CI review is successful when "new valid content changed the count" is no longer a release blocker, while deliberate fault injections continue to be rejected.
