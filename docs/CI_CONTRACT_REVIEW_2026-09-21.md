# CI contract review — 2026-09-21

Baseline: `main` at `77b3b8135a6d67b92a7add52315b426c4a69d4df`.

## Goal

Make CI strict about product contracts and regressions while allowing normal Golden-content growth without hand-updating unrelated browser expectations.

The September 14 and September 21 Event refreshes exposed the same structural problem: deterministic/content checks passed while Chromium failed on corpus-size, ordering and Matrix-derived values that changed correctly when Golden Events were added.

The target is not a weaker CI. It is a better ownership boundary:

1. content validation rejects malformed or unsupported Golden data;
2. Node contract tests own deterministic data transforms and derived ordering/geometry;
3. build/link checks own static output integrity;
4. Playwright owns behavior that requires a browser: interaction, rendered structure, layout, accessibility and responsive behavior.

## Principles

- A normal Event or Company addition should not require editing test literals merely because totals, active-entity counts, activity ordering, band density or row packing changed.
- Exact corpus snapshots are allowed only when the identity itself is a deliberate fixture/contract, not as a proxy for generic completeness.
- Expected values should be derived independently from source inputs where possible, not copied from rendered DOM.
- Pure functions under `src/lib/` should be tested without launching Chromium.
- Browser tests may compare the rendered result with values derived from the current source corpus or exported payload.
- Keep explicit, named fixtures such as Lunlun exclusion behavior where the identity is itself part of the intended contract.
- Do not hide regressions by converting exact product contracts into vague lower bounds.
- Pages should continue validating/building the exact deployed main SHA.

## Current structural findings

- `tests/smoke/release.spec.mjs` is about 149 KB and contains 35 tests / 745 `expect(` calls.
- The same Playwright suite also contains pure-function tests such as `activity-matrix-geometry.spec.ts` and `articles.spec.ts`; these do not require a browser runner.
- `src/lib/activityMatrix.ts` already exposes pure geometry, ordering, projection and packing functions suitable for Node tests.
- Analog and Digital already use `node:test` for domain contracts, which is the model Golden/Timeline should follow.
- PR CI currently runs `npm run check` and a separate serial Chromium suite. Recent content refreshes repeatedly had deterministic checks pass while Chromium failed on stale corpus literals.

## release.spec.mjs classification

Legend:
- **KEEP** — browser behavior is the primary contract; retain in Playwright after removing mutable corpus literals.
- **MOVE** — primary contract is deterministic data logic; move to Node tests.
- **SPLIT** — move data/ordering/geometry assertions to Node, retain browser-specific interaction/rendering assertions.

| # | Current test | Decision | Replacement boundary |
|---|---|---|---|
| 1 | Timeline is the temporal view with filters and one Evidence Inspector | KEEP | Browser structure, controls and inspector presence. |
| 2 | Articles publishes every authored document and keeps editorial links separate | SPLIT | Node owns article inventory/order/relationships; browser owns rendered article navigation/content/link separation. |
| 3 | canonical JSON export contains the complete factual corpus | MOVE | Node/static contract owns export projection, exclusions, sorting, source normalization and record URLs. No fixed total counts. |
| 4 | historical predecessor searches resolve through canonical Company groups | KEEP | Search/URL/UI behavior. Canonical alias mapping may receive a small Node contract if logic is separately exposed. |
| 5 | selecting a Timeline mark updates the Evidence Inspector | KEEP | Direct browser interaction. |
| 6 | Event bundles retain direct Event interaction and reduce cleanly under filtering | SPLIT | Node owns bundle construction/packing; browser owns direct member selection and filtered reduction behavior. |
| 7 | Events is the chronological textual view without a Timeline or inspector | KEEP | Browser surface contract. Derive total text from current serialized/listed corpus instead of fixed `217`. |
| 8 | Event detail is a centered factual document with Evidence and no editorial reverse links | KEEP | Rendered page contract. |
| 9 | People-only Events remain in the unfiltered corpus and obey narrowed Company filters | KEEP | Cross-surface filtering behavior. |
| 10 | Lunlun is a normal two-Event viewer trajectory that remains outside the factual export | SPLIT | Node owns explicit export exclusions; browser keeps the deliberate Lunlun UI fixture and interaction. |
| 11 | global Timeline Event sets remain subsets of the complete Events record | KEEP | Browser-integrated surface consistency; expected sets should be derived dynamically. |
| 12 | explicit Search and Company Focus discovery preserve complete matching Event access | KEEP | Browser discovery behavior. |
| 13 | singleton Companies and People are browse-suppressed but deliberately discoverable | SPLIT | Node owns active/singleton derivation; browser owns suppression/discovery behavior using derived fixture IDs. |
| 14 | Timeline and Events navigation preserves shared state without carrying hidden filters | KEEP | Browser URL/state behavior. |
| 15 | Company picker is readable, searchable, and independently clearable | KEEP | Browser interaction/layout. Replace fixed company/event totals with counts derived from current options/serialized corpus. |
| 16 | recent-activity row ordering and alphabetical Company picker stay filter-stable | SPLIT | Node owns activity comparator/order and alphabetical picker derivation; browser only verifies rendered order equals current derived order and remains filter-stable. |
| 17 | zero-Event researched Company pages still build without primary Timeline links | KEEP | Rendered empty-state/navigation behavior. |
| 18 | global Activity Matrix uses progressive time bands and deterministic bundle modes | SPLIT | Move actual-corpus geometry/order/packing invariants to Node using `buildActivityMatrixGeometry`; browser retains DOM serialization wiring and a small number of rendering attributes. Remove exact mutable lane list snapshots. |
| 19 | global Matrix uses the corpus domain while context Timelines retain derived historical ranges | SPLIT | Node owns domain/range derivation; browser verifies the two surfaces expose/use the derived result. |
| 20 | Timeline utility bar places count and legend beside the compact controls | KEEP | Browser layout/legend. Count must be derived from currently rendered/serialized data, not fixed literals. |
| 21 | Search and Company filter never change Matrix geometry or row order | KEEP | High-value browser invariant. |
| 22 | Activity Matrix axis and rows share temporal-track geometry at every responsive width | KEEP | Browser layout. |
| 23 | Matrix fills available width, scrolls only its derived excess locally, and preserves initial-lens reveal behavior | KEEP | Browser responsive/scroll behavior. |
| 24 | global Matrix sticky labels occlude active marks without clearing selection | KEEP | Browser stacking/selection behavior. |
| 25 | global Matrix is one accessible interleaved view with restrained entity colors | KEEP | Accessibility/rendered color semantics. |
| 26 | legacy Entity-view URLs canonicalize to the combined global surfaces | KEEP | Browser URL canonicalization. Remove fixed total-event regex denominator. |
| 27 | Company Focus panel owns overlapping pixels above every Timeline stacking context | KEEP | Browser stacking-context behavior. |
| 28 | Timeline always shows both Signal types while Events retains kind filtering | SPLIT | Node owns kind counts/partition identity; browser owns absence/presence of filters and filtering behavior. No fixed 149/68/217 literals. |
| 29 | shared Events remain one list record and one inspector record | KEEP | Browser deduplication/integration behavior. |
| 30 | unavailable originals remain labels and Event permalinks remain live | KEEP | Rendered source-status/permalink behavior. |
| 31 | Company and Person Timeline labels occlude active Event marks | KEEP | Browser stacking/layout behavior. |
| 32 | Company-first and People-first behavior remains intact | KEEP | Browser entity-view behavior. |
| 33 | Timeline and Events expose their final surface-specific controls and terminology | KEEP | Browser UI contract. Replace `All N` with dynamically derived option count. |
| 34 | Inspector and context pages use Event, Evidence, and Entity terminology | KEEP | Rendered terminology contract. |
| 35 | narrow viewports retain basic access without a mobile chronology fallback | KEEP | Browser responsive contract. |

### Classification summary

- KEEP: 24
- MOVE: 1
- SPLIT: 10

After splitting, several existing Playwright tests should become much smaller. The goal is not necessarily fewer named browser tests; it is fewer browser assertions about mutable corpus snapshots.

## New Node contract layer

Add a dedicated Golden test directory, for example:

```
tests/golden/
  content-contract.test.ts
  export-contract.test.ts
  activity-order.test.ts
  activity-matrix-corpus.test.ts
  timeline-contract.test.ts
```

Use `node:test` + `node:assert/strict`, matching Analog/Digital.

### content-contract.test.ts

Own:
- filenames match IDs;
- all company/person references resolve;
- date precision and source cardinality;
- source URL/check-date validation;
- explicit export-exclusion fixture IDs remain intentional and present;
- kind partition is exhaustive (`technical | organizational`);
- no duplicate IDs.

Do not duplicate every check already in `tools/validate.mjs`; either call/refactor shared validation helpers or keep the test focused on transformation contracts.

### export-contract.test.ts

Refactor the export payload construction from `src/pages/export.json.ts` into a pure helper, e.g. `src/lib/export.ts`.

Test:
- exported companies = all canonical companies sorted by name/id;
- exported people = source people minus explicit excluded IDs;
- exported events = Golden events minus explicit excluded IDs, newest-first;
- every exported source gets explicit `status` and nullable `archiveUrl`;
- every Event gets deterministic `recordUrl`;
- no editorial fields appear;
- exclusions are exact named fixtures.

No hard-coded total count is required.

### activity-order.test.ts

Use `orderEntitiesByRecentActivity` / `compareActivityEntities` directly.

Test:
- recent3, recent5, latest date, total count tie-breaking;
- stable company/person ordering;
- reversing input does not alter output;
- adding an unrelated singleton does not reorder entities whose comparison keys are unchanged;
- alphabetical picker order is independent of activity order.

For current-corpus integration, derive expected activity rows from source events and ensure `buildActivityMatrixGeometry` uses that same order. Do not hard-code “NXP is third.”

### activity-matrix-corpus.test.ts

Use the real current Golden corpus plus the pure `buildActivityMatrixGeometry` function.

Test invariants rather than mutable snapshots:
- all representable Event IDs occur in geometry;
- ecosystem/no-entity Events do not create Matrix marks;
- each Event has one precise projected X across every lane where it appears;
- each row has at least one visual row;
- bundle rectangles do not overlap after packing;
- every bundle member belongs to its entity lane;
- recent bands use proximity mode and earlier bands use period mode;
- geometry is deterministic under reversed/shuffled input;
- filtered UI data is not an input to geometry generation.

Synthetic unit tests in the existing `activity-matrix-geometry.spec.ts` should move to Node unchanged in spirit.

Do **not** assert the current complete list of companies with `visualRowCount > 1`.

### timeline-contract.test.ts

Test `buildTimelineGeometry` directly:
- deterministic ordering;
- no same-lane collisions inside a packed band;
- historical aggregation boundary;
- derived historical range labels;
- geometry stable under input reordering.

## Browser expectations after refactor

Browser tests should ask questions such as:

- Does the Events summary denominator equal the number of serialized Events on this build?
- After selecting Technical, does every visible result have Technical and does the count equal the current serialized Technical population?
- Does “All N” equal the number of company checkboxes?
- Does the Matrix DOM contain the same row order and per-row statistics as the pure geometry helper/current serialized corpus?
- Does filtering preserve every pre-filter row's geometry/order?
- Can a bundle member still be individually selected?
- Are layout/stacking/responsive contracts intact?

They should not ask:

- Are there exactly 217 viewer Events?
- Are there exactly 149 Technical Events?
- Are there exactly 65 active Companies?
- Is NXP currently before Infineon?
- Is the exact set of multi-row lanes [A, B, C, ...]?

unless that exact identity is a deliberate product fixture.

## Runner cleanup

The existing files:

- `tests/smoke/activity-matrix-geometry.spec.ts`
- `tests/smoke/articles.spec.ts`

are pure tests and should leave Playwright.

Move them under Node test ownership, e.g.:

- `tests/golden/activity-matrix.test.ts`
- `tests/articles/articles.test.ts`

The imported production code can remain unchanged.

Do not parallelize browser tests during the first migration. Preserve `workers: 1` until the new suite is stable.

## Package scripts target

A likely end state:

```json
{
  "test:golden": "node --test tests/golden/*.test.ts",
  "test:articles": "node --test tests/articles/*.test.ts",
  "test:contracts": "npm run test:golden && npm run test:articles && npm run test:analog && npm run test:digital",
  "check": "npm run validate && npm run lint:facts && npm run check:duplicates && npm run validate:analog && npm run validate:digital && npm run test:contracts && npm run build && npm run check:internal-links",
  "test:smoke": "npm run build && playwright test"
}
```

Exact naming may change during implementation, but the ownership boundary should not.

## CI workflow target

Keep two blocking PR jobs initially:

### Deterministic checks

- npm ci
- Golden validation/fact lint/duplicate review gate
- Analog/Digital validation
- Node contract tests
- Astro build
- internal-link audit

### Chromium smoke

- npm ci
- Chromium install
- production-preview browser tests

Do not add path-based skipping in the first pass. First make the browser suite semantically stable. Path filtering can be reconsidered later with evidence.

Keep manual Pages deployment and its `npm run check` gate.

## Mutation / fault-injection acceptance

Before merge, deliberately demonstrate that the refactor still rejects representative real failures. Temporary mutations must never be committed.

Minimum matrix:

1. Event references unknown Company -> deterministic gate FAIL.
2. Hiring Event fact loses hiring-source modality -> fact lint FAIL.
3. Duplicate-like same-company Event -> duplicate checker warns/review gate behavior preserved.
4. Export sort is deliberately reversed -> Node export contract FAIL.
5. Export exclusion removed -> Node export contract FAIL.
6. Activity comparator tie-break altered -> Node ordering contract FAIL.
7. Matrix packing/projection constant altered -> Node geometry contract FAIL.
8. Timeline filter JS broken -> browser smoke FAIL.
9. Event mark click no longer updates inspector -> browser smoke FAIL.
10. Company popover stacking broken -> browser smoke FAIL.
11. Internal Event link broken -> internal-link audit FAIL.
12. Analog or Digital domain schema violation -> corresponding Node/domain gate FAIL.

The acceptance report should state which command caught each mutation.

## Migration phases

### Phase 1 — contract extraction without reducing browser coverage

- Add pure export helper.
- Add Golden Node tests.
- Move existing pure Playwright-run tests to Node.
- Keep existing `release.spec.mjs` assertions temporarily.
- Require old and new suites to pass simultaneously.

This creates an overlap period and proves the new contracts before deleting browser assertions.

### Phase 2 — remove mutable snapshot assertions from Playwright

- Replace corpus literals with derived expectations.
- Remove assertions that duplicate the now-proven Node contracts.
- Split oversized browser tests where useful.
- Preserve interaction/layout assertions.

Run mutation acceptance before proceeding.

#### Durable regressions versus historical import receipts

Phase 2 moves only *durable* regressions from the browser export test into `tests/golden/corpus-regressions.test.ts`. The distinction matters because Git history already stores every import receipt, and CI should protect current product semantics rather than replay each research batch forever.

**Durable — keep as named fixtures, in Node:**

- canonical successor behavior for acquired or predecessor organizations (for example Dialog → Renesas, Freescale → NXP, Maxim → Analog Devices, Xilinx → AMD, LSI → Broadcom);
- retired legacy Company IDs staying absent from canonical records and Event references (`mentor-graphics`, `freescale-semiconductor`, `dialog-semiconductor`, `maxim-integrated`, `xilinx`, `lsi`);
- canonical public Company display names that are deliberate naming rather than raw source titles;
- selected historical Event → canonical Company/Person associations whose identity is intentional;
- deliberate absence of a known rejected identity such as `sitime-2026-07-renesas-timing-acquisition`.

**Import receipts — retire rather than migrate:**

- the total number of records in a historical research "wave";
- aggregate Technical/Organizational counts for a wave;
- fixed `checkedAt` dates for an old research pass;
- current per-Company Event totals such as the NXP or Broadcom counts;
- large "these exact N entries existed after this import" inventories, unless one individual identity is itself a durable canonicalization regression.

Those receipts live in the review commits that introduced them. If a receipt ever becomes product semantics, it should be re-added as a named fixture with a stated reason.

### Phase 3 — browser-suite cleanup

- Split `release.spec.mjs` by responsibility.
- Measure Chromium runtime and failure diagnostics.
- Only then consider 2 workers or other runtime optimization.

### Phase 4 — optional CI routing

After several content refreshes prove the suite stable, consider path-aware execution. Do not make this part of the initial refactor.

## Success criteria

A successful refactor must satisfy all of these:

1. Baseline `77b3b813...` passes old and new protections during overlap.
2. Adding a valid Golden Event and Company does not require changing test code solely for counts/order/geometry density.
3. Product-semantics changes still require intentional test updates.
4. All mutation cases above are caught by the intended layer.
5. Browser smoke remains blocking.
6. Pages still validates the exact deployed SHA.
7. No Article, Analog or Digital behavior is weakened by the migration.
8. The final test ownership is documented sufficiently that future agents know where a new assertion belongs.
