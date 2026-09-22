# RF2 — Shared catalog mechanics refactor (2026-09-22)

Status: implemented and locally verified on `work/rf2-shared-catalog-mechanics`.
Behavior-preserving only. No data, content, SEO, or domain-migration changes.
Activity Model Harmonization (unifying `no-public-repo`/`public-update` semantics) is a
separate, later phase and is explicitly out of scope here.

Base `main`: `b9160b77e24ac9deb20777c96b4ffaf7788db9aa` (`origin/main` matched at fetch time).

## Goal

Analog (`src/lib/analog/**`) and Digital (`src/lib/digital/**`) each implement their own
activity-window and sort mechanics. Three functions were byte-for-byte identical between
the two domains; this refactor extracts only what is semantically identical, keeps every
domain-specific type and rule local to its domain, and changes no generated output.

## Extracted shared mechanics

### `src/lib/catalog-activity-window.ts` (new)

`freshnessCutoff()`, `activityMonths()`, and `countActivity()` were byte-identical in
`src/lib/analog/activity.ts` and `src/lib/digital/activity.ts`. Moved verbatim (no logic
changes) into this new pure module. Both domain files now do:

```ts
export { freshnessCutoff, activityMonths, countActivity } from '../catalog-activity-window.ts';
```

Existing import paths are unchanged — every consumer (`src/lib/analog/schema.ts`,
`src/lib/digital/schema.ts`, `tools/refresh-analog-activity.mjs`,
`tools/refresh-digital-activity.mjs`, `tests/analog/catalog.test.ts`,
`tests/digital/catalog.test.ts`) continues to import from its own domain's `activity.ts`
façade, unmodified.

### `src/lib/catalog-sort.ts` (new)

`sortProjects()` in `src/lib/analog/catalog.ts` and `src/lib/digital/catalog.ts` had an
identical comparator chain (activity date descending, then normalized display name, then
id) but closed over each domain's own `PublicActivity`/`publicActivityDate()`. Rather than
push a domain-specific activity type into a shared union, the shared primitive takes a
caller-supplied `activityDateOf(item)` callback:

```ts
export function sortByActivityThenName<T extends { id: string; data: { name: string } }>(
  items: readonly T[],
  activityDateOf: (item: T) => string,
): T[] { /* … */ }
```

Each domain's `sortProjects()` is now a one-line call:

```ts
export function sortProjects<T extends { id: string; data: { name: string } }>(
  projects: readonly T[], activity: Readonly<Record<string, PublicActivity>>,
): T[] {
  return sortByActivityThenName(projects, (project) => publicActivityDate(activity[project.id]));
}
```

`PublicActivity`, `publicActivityDate()`, and the public `sortProjects(projects, activity)`
signature are unchanged in both domains.

## Intentionally not shared

Per the explicit RF2 boundary, the following remain separate and were not touched:

- **`no-public-repo` (Analog, `lastPublicUpdateAt?: string`) vs `public-update` (Digital,
  `lastPublicUpdateAt: string`)** — different `kind` discriminant and different
  optional/required-ness of the same field. This is the specific case Activity Model
  Harmonization (a later, separate phase) will consider. RF2 does not rename, union, or
  otherwise touch this distinction.
- `scopeStageIds` / `scopeStageLabels` (Analog: design/simulation/layout; Digital:
  design/synthesis/verification/layout).
- `src/lib/analog/schema.ts` vs `src/lib/digital/schema.ts` — Zod validation rules differ
  materially (e.g. Digital's `publicText` rejects non-English scripts and newlines, its
  `githubActivity`/`repositoryActivity` requires `repositoryId`/`lastMeaningfulCommitSha`
  unconditionally where Analog's does not, its freshness/consistency `superRefine` checks
  differ). Both files still import `freshnessCutoff`/`activityMonths` from their own
  domain's `activity.ts` façade, unchanged.
- Source/evidence requirements, catalog content/updates model, and refresh manual-review
  policy in `tools/refresh-analog-activity.mjs` / `tools/refresh-digital-activity.mjs`
  (see "Refresh scripts" below).

## `sortProjects` sharing decision

Extracted (see above). Reasoning: the callback-based `sortByActivityThenName` keeps the
domain-specific `PublicActivity` type and `publicActivityDate()` entirely local to each
domain — the shared primitive only knows "how to get a date string for an item," never what
that date means. The resulting domain `sortProjects()` is *shorter* and more readable than
before (one line delegating to a named, independently tested primitive) rather than more
abstracted-over-obscured, so this did not hit the "abstraction layer outweighs the six lines
saved" condition that would have argued for leaving the duplication in place.

## Refresh scripts

`tools/refresh-analog-activity.mjs` and `tools/refresh-digital-activity.mjs` were not
touched. Digital already extracts `assertRepositoryIdentity()` and
`verifyMeaningfulCommit()` into `tools/digital-activity-support.mjs`; Analog inlines the
equivalent checks. Comparing them found **real semantic differences**, confirming the task
brief's own warning, so no extraction was made:

- **Repository identity**: Digital's `assertRepositoryIdentity` requires `meta.id` to
  strictly equal `record.repositoryId` unconditionally, and requires `meta.default_branch`
  to be a non-empty string. Analog's inline check only compares `repositoryId` `if
  (record.repositoryId !== undefined)` (i.e. it is optional in Analog) and does not check
  `default_branch` at that point (Analog validates the branch name separately via `git
  check-ref-format`).
- **Meaningful-commit verification**: Digital's `verifyMeaningfulCommit` runs
  unconditionally. Analog's equivalent inline block is guarded by `if
  (record.lastMeaningfulCommitSha)` — i.e. Analog tolerates a `github`-kind record with no
  meaningful-commit SHA yet; Digital's schema always requires one.

Both differences trace back to `repositoryId` and `lastMeaningfulCommitSha` being optional
in Analog's schema and required in Digital's — the same category of domain divergence as
the `no-public-repo`/`public-update` boundary. Per the brief, this stays out of scope for
RF2; see "Follow-up candidates" below.

## Audit for additional exact duplicates

A short independent read-only audit covered `src/lib/analog/{schema,catalog,activity}.ts`,
`src/lib/digital/{schema,catalog,activity}.ts`, both refresh scripts plus
`tools/digital-activity-support.mjs`, `tests/{analog,digital}/catalog.test.ts`,
`src/pages/{analog,digital}/index.astro`, and the shared `CatalogIndex.astro`. Classified:

- **A (safe to extract now):** none found beyond `freshnessCutoff`/`activityMonths`/
  `countActivity` and `sortByActivityThenName`, both already extracted above.
- **B (follow-up candidate):** none found. (The refresh-script identity/meaningful-commit
  logic in "Refresh scripts" above is not classified B — it has confirmed real semantic
  differences, not just untaken effort — see that section.)
- **C (must not be shared — confirmed domain differences):**
  - `no-public-repo` (Analog) vs `public-update` (Digital) and `lastPublicUpdateAt`'s
    optional/required-ness — the explicit boundary this task must not cross.
  - `scopeStageIds`/`scopeStageLabels` — different stage membership per domain.
  - `src/lib/analog/schema.ts` vs `src/lib/digital/schema.ts` — several regex/text
    fragments look textually close (e.g. the `date` schema is byte-identical, `sourceUrl`
    and branch-name regexes are near-identical) but the surrounding rules diverge
    materially: Digital's `publicText` rejects non-Latin scripts and newlines where Analog
    does not; Analog has a `catalogUpdatesSchema` with no Digital equivalent; Digital's
    `validateCatalog` rejects an empty catalog where Analog's does not; Digital's
    `validateActivity` checks `reviewedAt` ordering and query/hash-free GitHub source URLs
    that Analog does not; the activity discriminated-union arm and its field
    optionality differ and cascade into different `superRefine` branches. None of this was
    touched.
  - `tools/refresh-analog-activity.mjs` / `tools/refresh-digital-activity.mjs` — confirmed
    identical only in import paths, filenames, and log strings around the
    already-identified `assertRepositoryIdentity`/`verifyMeaningfulCommit` divergence (see
    "Refresh scripts"); the shared-looking `run`/`exec` subprocess wrapper is not pure and
    was excluded on that basis as well.
  - `src/pages/analog/index.astro` / `src/pages/digital/index.astro` — structurally similar
    frontmatter, but each is glue code bound to its own schema/catalog imports and title;
    not a pure function and not worth extracting.
  - `tests/analog/catalog.test.ts` / `tests/digital/catalog.test.ts` — diverge enough
    (Digital's reads real content/activity files and adds point-update/rollover fixtures
    Analog's fixture-based file does not have) that no shared test helper was justified.

## Before/after tests

Node test counts across `tests/analog/*.test.ts`, `tests/digital/*.test.ts`,
`tests/golden/*.test.ts`:

- Before (stashed RF2 changes, same branch point): **113 passed**, 0 failed.
- After (RF2 applied, including two new contract-test files): **132 passed**, 0 failed
  (113 pre-existing + 19 new: 15 in `catalog-activity-window.test.ts`, 4 in
  `catalog-sort.test.ts`).
- No pre-existing `tests/analog/**` or `tests/digital/**` assertion was removed, weakened,
  or replaced; the new files only add domain-independent primitive coverage alongside the
  existing domain-integration coverage.

`npm run check` (validate, lint:facts, check:duplicates, validate:analog, validate:digital,
test:contracts, build, check:internal-links): **PASS**, before and after.

`npm run test:smoke` (Chromium): **97 passed**, before and after.

## dist comparison

- `find dist -type f | sort`: identical file set (330 files) before and after.
- `find dist -type f -exec sha256sum {} \;`: **byte-identical** before and after, including
  `dist/export.json` (`sha256 0010ae862ed182536bad8b8d775f9f50504af7080088a7a964fdcfc80be68ce9`,
  unchanged).
- Analog `sortProjects()` output order: identical (44 projects, same order) before and
  after, computed directly against the checked-in `src/content/analog/*.md` and
  `src/data/analog-activity.json`.
- Digital `sortProjects()` output order: identical (51 projects, same order) before and
  after, computed against `src/content/digital/*.md` and `src/data/digital-activity.json`.
- `src/data/analog-activity.json` / `src/data/digital-activity.json`: untouched
  (`git status` shows no changes under `src/data/**` or `src/content/**`); their
  `validateActivity()` results are unaffected because the validation logic itself
  (`src/lib/analog/schema.ts`, `src/lib/digital/schema.ts`) was not modified — only the two
  functions it imports moved to a shared module with identical bodies.

No dist difference required investigation; the refactor produced no output difference at
all, not merely a visually-similar one.

## Fault-detection (mutation) checks

Each mutation was applied to `src/lib/catalog-activity-window.ts`, confirmed to fail the
new contract tests in `tests/golden/catalog-activity-window.test.ts`, then reverted exactly
(confirmed via `git diff --check` and a full re-read of the restored file) before
committing anything:

1. **Shifted `activityMonths` start month by one** (`- 11 + index` → `- 10 + index`):
   failed `activityMonths includes the reviewed month last` and the UTC-boundary test with
   a clear off-by-one diff.
2. **Broke the `freshnessCutoff` month-end clamp** (dropped `Math.min(day, lastDay)`):
   failed `freshnessCutoff clamps a leap-day reviewedAt to the prior non-leap February`
   (`2023-02-29` instead of the correct `2023-02-28`).
3. **Disabled the `countActivity` future-timestamp reject** (dropped the
   `parsed.valueOf() > new Date(capturedAt).valueOf()` clause): failed `countActivity
   rejects a timestamp after capturedAt` (`Missing expected exception`).

All three mutations were reverted before running the final verification pass; none were
committed.

## Follow-up candidates

None identified as genuinely safe-but-deferred (category B) by this refactor or its
audit pass. The one item worth naming explicitly:

- Repository-identity and meaningful-commit-verification logic in the two refresh scripts
  (see "Refresh scripts" above) is a plausible future cleanup **only if** a deliberate
  decision is made to make `repositoryId`/`lastMeaningfulCommitSha` required in Analog too
  — which is itself an Activity Model Harmonization–adjacent schema change, not a
  behavior-preserving refactor, and is out of scope here.

## Activity Model Harmonization

Explicitly a separate, later phase. RF2 does not rename, union, or otherwise touch the
`no-public-repo`/`public-update` distinction, `lastPublicUpdateAt`'s optional/required-ness,
or any other Analog/Digital schema semantics. This document records only the
behavior-preserving mechanics extraction described above.
