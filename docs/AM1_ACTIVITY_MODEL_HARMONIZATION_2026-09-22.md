# AM1 — Activity Model Harmonization: point-activity kind (2026-09-22)

Status: implemented and locally verified on `work/am1-public-update-harmonization`.
Scope: only the Analog point-activity `kind` rename and its required-field tightening.
`repositoryId`/`lastMeaningfulCommitSha` harmonization, further domain migration, SEO and
deployment are explicitly out of scope and not attempted here.

Starting main SHA: `727dd780fa185d6e01e2261d4246f7a58a0ef296` (`origin/main` matched at fetch
time).

## Goal

Analog's point-activity records used `kind: 'no-public-repo'`, historically named as if it
asserted "no public repository exists." Digital already used `kind: 'public-update'` for the
same rendering path, with `lastPublicUpdateAt`/`lastPublicUpdateSource` required. AM1 moves
Analog onto Digital's naming and required-field contract, without touching any other
Analog/Digital difference (scope stages, source/evidence rules, `repositoryId`/
`lastMeaningfulCommitSha` requirements, refresh network behavior, or the schema files'
broader validation architecture, which remain intentionally distinct).

## Semantic definition

- **Before**: `kind: 'no-public-repo'` — named as though it meant "this project has no
  public repository."
- **After**: `kind: 'public-update'` — means "this activity record uses a reviewed
  point-in-time public signal (a paper, release, or other dated public update) instead of
  reviewed monthly repository history." It never means the project has no public repository
  or code. ngspice is the concrete counterexample baked into both the data and the docs: its
  official source is hosted on SourceForge, but its activity is tracked as `public-update`
  because the reviewed signal is a dated release, not first-parent commit history.

## Actual migrated records

Exactly the three checked-in Analog point-activity records in `src/data/analog-activity.json`
changed `"kind": "no-public-repo"` → `"kind": "public-update"`, with every other field
(dates, source IDs, signal types, `notes`, ordering, key order) byte-for-byte unchanged:

- `atlas` (`lastPublicUpdateType: paper`, `lastPublicUpdateAt: 2026-07-15`)
- `ngspice` (`lastPublicUpdateType: release`, `lastPublicUpdateAt: 2026-08-11`, has `notes`)
- `virastack-ai-super-agent` (`lastPublicUpdateType: public-update`,
  `lastPublicUpdateAt: 2026-09-10`, has `notes`)

`git diff src/data/analog-activity.json` is exactly these 3 one-line value changes.

## Files changed

- `src/lib/analog/activity.ts` — `PublicActivity`'s point-activity arm changes from
  `{ kind: 'no-public-repo'; lastPublicUpdateAt?: string }` to
  `{ kind: 'public-update'; lastPublicUpdateAt: string }` (required, matching Digital
  exactly); `publicActivityDate()` drops its now-unneeded `?? ''` fallback. A comment states
  the corrected semantics inline.
- `src/lib/analog/schema.ts`:
  - `noRepositoryActivity` renamed to `publicUpdate`; `kind` literal becomes `'public-update'`;
    `lastPublicUpdateAt` and `lastPublicUpdateSource` become required (was `.optional()`).
    Analog-only `notes?: string` is preserved unchanged — required because two of the three
    real records (`ngspice`, `virastack-ai-super-agent`) carry it.
  - The discriminated union's third arm updates to `publicUpdate`.
  - Removed one now-dead `superRefine` branch (`Boolean(lastPublicUpdateAt) !==
    Boolean(lastPublicUpdateSource)`): with both fields required at the Zod object level,
    Zod's own base-schema parse already rejects a record missing either field before
    `superRefine` ever runs, so this asymmetric-presence check could never fire again.
    Verified as dead code (no test referenced its message) before removing it.
  - Simplified `if (activity.lastPublicUpdateSource && !data.sources.some(...))` in
    `validateActivity()` to drop the now-always-true `lastPublicUpdateSource &&` guard,
    matching the equivalent (already-unguarded) line in `src/lib/digital/schema.ts`.
- `src/lib/catalog-activity-band.ts` — the shared `ActivityRecord` render-projection type's
  point-activity arm narrows from `kind: 'no-public-repo' | 'public-update'` to
  `kind: 'public-update'`, since no domain can produce the former anymore. Purely a type
  change: `activityBand()`'s logic already branched on `hasRepositoryHistory()`, never on the
  specific non-repository literal, so this has no runtime effect on either domain. The
  optional `lastPublicUpdateAt?`/`lastPublicUpdateSource?` fields on this shared render type
  were deliberately left optional (not tightened to match the now-required domain schemas):
  this file is a rendering-layer contract independent of either domain's validation
  strictness, and its existing defensive runtime guard
  (`if (!record.lastPublicUpdateAt || !source) throw ...`) is unaffected either way.
- `src/data/analog-activity.json` — see "Actual migrated records" above.
- `tests/analog/catalog.test.ts` — see "Tests" below.
- `tests/smoke/analog.spec.ts` — one assertion (`expect(record.kind).toBe(...)`) updated to
  `'public-update'`; this test reads the real checked-in snapshot through the browser fixture.
- `docs/analog/IMPLEMENTATION_SPEC.md` — the durable Analog contract's activity section
  (§"Reviewed public activity") rewritten to name `kind: public-update`, its required
  fields, and the corrected semantics (does not mean no public repository/code), matching
  the phrasing already used in `docs/digital/IMPLEMENTATION_SPEC.md`'s parallel paragraph.
- `docs/analog/IMPLEMENTATION_NOTES.md` — only the non-dated, still-current "Maintenance and
  manual refresh" procedure section (items 3–4) was updated to say `public-update` instead of
  "no-public-repository entry" and to state the corrected meaning inline.

## References intentionally left historical

Per the audit requirement, every occurrence of `no-public-repo` and `public-update` in the
repository was read and classified before touching anything. Left untouched as genuine
historical receipts (dated narrative describing what was decided/true at a specific past
review, not live instructions):

- `docs/analog/IMPLEMENTATION_NOTES.md` line ~70 ("ATLAS stays under the existing
  no-repository/public-update mechanism") and line ~90 ("The `no-public-repo` record maps
  the sourced August 11 release...") — both sit inside the dated
  "Previous Analog expansion review (2026-09-05)" / "Baseline source and meaningful-activity
  review" narrative describing the 2026-09-05 addition of ngspice and others. These are
  receipts of a past review, not a live contract; rewriting them would blur what was actually
  decided and said at that time.
- `docs/RF2_SHARED_CATALOG_MECHANICS_2026-09-22.md` — RF2's own report explicitly documents
  that it *preserved* the `no-public-repo`/`public-update` distinction and named Activity
  Model Harmonization as the future phase that would revisit it. That is exactly what AM1 is;
  the RF2 document remains an accurate historical record of RF2's own decision and was not
  edited.
- Digital-only references (`docs/CATALOG_EXPANSION_REVIEW_2026-09-07.md`,
  `docs/CATALOG_EXPANSION_REVIEW_2026-09-14.md`, `src/content/digital/uvm-2020-3-2.md`) all
  already use `public-update` correctly (Digital never had the old name) and describe past,
  dated Digital-only reviews; out of AM1's Analog-only scope regardless.
- `docs/analog/README.md` / `docs/digital/README.md` mention "Paper/release/public-update
  records" — this names the unrelated `lastPublicUpdateType` signal-type enum (`paper` /
  `release` / `public-update`), not the activity `kind` discriminant AM1 renames. No change
  needed.

## Tests

`tests/analog/catalog.test.ts` changes (all within the existing file, no test file removed):

- Renamed every literal `kind: 'no-public-repo'` fixture to `'public-update'`
  (sort-ordering fixture, `ngspice.kind` assertion against the real snapshot, the point-record
  provenance test, the freshness-boundary test, and the ATLAS/ngspice rendering test).
- The sort-ordering fixture's `unknown` project previously modeled "no date at all" via the
  old field's optionality (`{ kind: 'no-public-repo' }`, relying on `publicActivityDate()`'s
  `?? ''` fallback). Since the field is now required, this is changed to an explicit very-old
  valid date (`'2000-01-01'`) that preserves the exact same relative sort position (still
  last/oldest) without depending on a now-impossible domain state.
- Rewrote `point records require reviewed provenance and never store fabricated repository
  counts` to add: all three `publicSignalTypes` (`paper`, `release`, `public-update`) remain
  accepted as `lastPublicUpdateType`; missing `lastPublicUpdateAt` fails; missing
  `lastPublicUpdateSource` fails; an invalid source-ID slug (`'Not_A_Valid_Slug'`, violating
  `catalogSlug`'s regex) fails; `kind: 'no-public-repo'` itself fails. The one previously
  broken assertion (which expected a schema-incomplete record to reach the custom
  "requires verified meaningful activity" check — now impossible, since Zod rejects a missing
  date before that check ever runs) was replaced by these explicit, individually-isolated
  schema-level checks instead of silently left in place.
- Added a new dedicated test, `no-public-repo is no longer a valid activity kind in the
  schema or the checked-in Analog snapshot`, asserting both that `activitySchema` rejects
  `kind: 'no-public-repo'` and that the real `src/data/analog-activity.json` contains zero
  `'no-public-repo'` records and at least one `'public-update'` record.
- The already-present "reviewed monthly repository records..." and "each activity record
  belongs to..." tests (GitHub-Code-with-point-record rejection, i.e. "a public-update with a
  GitHub Code source is still rejected when it should have a repository activity record") and
  the "rolling freshness..." test (freshness boundary) were already correct in intent and
  needed only the literal rename, not new logic — confirming freshness-boundary behavior is
  unchanged.
- No existing assertion was weakened, removed, or had its coverage reduced; the file grew
  from 27 to 28 tests (all analog-suite tests, not counting smoke).

`tests/smoke/analog.spec.ts`: one literal updated to match the real migrated snapshot;
confirms in a real browser render that ngspice still shows a `release` signal and ATLAS still
shows a `paper` signal (existing assertions in that same test, unchanged, already covered
this and continue to pass).

## Before/after tests

- Before: `npm ci --no-audit --no-fund`, `npm run check` — PASS. `npm run test:smoke` —
  **97 passed**.
- After: `npm run check` — PASS (including `test:analog`, `test:digital`, fact lint,
  duplicate check, both catalog validators, build, and the internal-link audit).
  `npm run test:smoke` — **97 passed**. `git diff --check` — clean.
- `tests/analog/catalog.test.ts` alone: 27 → 28 passing tests (one new test added; no test
  removed).

## dist comparison

- File set: identical, 330 files before and after.
- Byte-for-byte: **329 of 330 files are byte-identical**, including `dist/export.json`
  (sha256 `0010ae862ed182536bad8b8d775f9f50504af7080088a7a964fdcfc80be68ce9`, unchanged — Analog
  never feeds `/export.json`, so this was expected to be untouched and was verified so).
- The one file that differs is `dist/analog/index.html`. Isolated and fully explained: the
  only difference anywhere in that file is the `data-activity-kind="..."` attribute value on
  exactly the three migrated rows (`atlas`, `ngspice`, `virastack-ai-super-agent`), changing
  from `no-public-repo` to `public-update`. Verified by diffing both files with that one
  attribute's value normalized out — the result is byte-identical apart from that attribute.
  `data-activity-kind` is set directly from `project.activity.kind`
  (`src/components/CatalogIndex.astro`) and is not referenced by any selector in
  `src/scripts/**` or `src/styles/**` (grepped and confirmed) — it drives no visible styling,
  filtering, or behavior. All visible text, hover/accessibility titles, `data-signal` values
  (driven by `lastPublicUpdateType`, untouched), Scope labels, and project order are
  unchanged. This is an intended, minimal, and harmless consequence of the rename, not an
  unexplained regression.
- Analog `sortProjects()` output order: identical (44 projects, same order) before and after,
  computed directly against the checked-in content and the migrated activity JSON.

## Mutation / fault-detection checks

Two temporary mutations to `src/lib/analog/schema.ts`, each confirmed to fail
`tests/analog/catalog.test.ts`, then reverted exactly (confirmed via `git diff` matching the
intended diff and a full re-run of `npm run check` + `npm run test:smoke` afterward) before
finalizing:

1. **Re-loosened `lastPublicUpdateAt`/`lastPublicUpdateSource` back to `.optional()`**: failed
   `point records require reviewed provenance and never store fabricated repository counts`
   (a record missing the date unexpectedly validated as `true` instead of the expected
   `false`).
2. **Reverted the `kind` literal to `'no-public-repo'`**: failed multiple tests immediately,
   including domain-membership validation against the real (now-migrated) checked-in
   snapshot, with Zod reporting "Invalid discriminator value" for all three affected
   projects — proving both the new dedicated rejection test and the real data/schema
   agreement are load-bearing.

Neither mutation was committed.

## Refresh behavior

`tools/refresh-analog-activity.mjs` was not modified (confirmed: it contains no reference to
either `no-public-repo` or `public-update`). It branches only on `record.kind !== 'github'`
to decide whether to fetch history over the network, treating every non-`github` kind
identically and mechanically preserving it as-is. This means:

- Non-GitHub records (`repository` and `public-update`) continue to be preserved mechanically
  without any network access, unchanged by this rename.
- No refactor of the refresh script was made or was necessary.

## Deferred (explicitly out of scope for AM1)

- **`repositoryId` / `lastMeaningfulCommitSha` harmonization.** Reviewer audit found 26/42
  Analog GitHub records lack `repositoryId` and 23/42 lack `lastMeaningfulCommitSha` (both
  optional in Analog's `githubActivity`, required in Digital's). This is a separate
  curation/schema project: making them required in Analog would need per-project manual
  evidence review (an explicit commit SHA/date verification for each of the ~23-26 records),
  not a mechanical rename. Not attempted here, per explicit instruction.
- Any further consolidation of the now textually-identical `PublicActivity`/
  `publicActivityDate()` between `src/lib/analog/activity.ts` and
  `src/lib/digital/activity.ts` into one shared module (RF2-style extraction). AM1 only
  changed Analog's definition to match Digital's; whether to then share the now-identical
  code is a distinct, later decision explicitly outside "only the point-activity
  harmonization."
- Broader schema-architecture alignment between `src/lib/analog/schema.ts` and
  `src/lib/digital/schema.ts` (e.g. Digital checks freshness inside its `superRefine`, Analog
  checks it in `validateActivity()`; Digital's `text`/`sourceUrl` rules differ from Analog's).
  Confirmed real and left untouched; unrelated to the point-activity kind.
