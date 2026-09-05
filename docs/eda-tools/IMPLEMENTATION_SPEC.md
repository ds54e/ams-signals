# EDA Tools implementation contract

## Isolation and files

Use the `edaTools` Astro Markdown collection at `src/content/eda-tools/*.md`, an EDA-specific page, schema/catalog/activity modules and CSS. Do not refactor Analog AI to share its schema. Static activity lives separately in `src/data/eda-tools-activity.json`. Body prose is internal research and is never rendered by the page.

Add `EDA Tools` after `Analog AI` in primary navigation, using the deployment base path and route-specific `aria-current="page"`. It must not participate in Timeline/Events filter links or storage.

## Strict content schema

Filenames are unique stable lowercase hyphenated slugs. Each record contains:

| Field | Contract |
| --- | --- |
| `name`, `aliases` | Project identity; aliases default to an empty array. |
| `primary` | Exactly one of `simulation`, `frontend-synthesis`, `formal-verification`, `debug-waveform`, `flow-physical`. |
| `ai` | Exactly `ai-built`, `ai-enabled` or `traditional`. |
| `description` | One concise English paragraph, at most 600 characters; shown once below the name. |
| `keywords` | 3–5 English strings, at most 28 characters each; normalized duplicates rejected. |
| `areas` | Only the five primary-category keys, each optional `core` or `supporting`; at least one core and `areas[primary] === "core"`. |
| `access` | Internal implementation/release-access context. |
| `addedAt`, `reviewedAt` | Valid quoted calendar dates; review cannot precede addition. Hidden in the public UI. |
| `sources` | Unique stable source IDs, titles and valid public HTTP(S) URLs; no more than one `official`, `paper`, `code` or `results` purpose. Additional research sources have no purpose. |

The Markdown body holds durable Scope / Classification / Release boundary notes and local `#source-ID` references. Keep URLs in frontmatter; reject raw external URLs, HTML and unknown local source references. Unknown schema fields and placeholder content fail validation.

## Matrix and index

Matrix columns, in order: Simulation; Frontend / Synth; Formal / Verify; Debug / Wave; Flow / Physical. Use an accessible HTML table with row/column headers and a hidden caption. `●` means core, `◐` supporting; missing metadata renders a blank with accessible wording that no primary reviewed scope was identified. Marks do not measure quality or maturity.

The matrix is the first visible content. The compact legend immediately follows it. Its first column sticks within a horizontally scrollable, keyboard-focusable region. Narrow screens scroll only this region, not the page.

Both matrix and index sort by `lastCommitAt` for GitHub or `lastPublicUpdateAt` otherwise, descending; then NFKC-normalized lowercase trimmed project name, then slug, ascending. Sorting does not mutate authored inventory and does not use meaningful activity as the ordering date.

The index begins with column labels, not a section heading. Desktop proportions are approximately `2.2fr / 1.05fr / 1.2fr / 0.55fr`. Mobile stacks description, keywords, activity, type/links. Keep one compact primary-category + AI label, and Website / Paper / Code / Results links when sourced. Do not show full research sources, prerequisites or notes. Native hash anchors identify focusable project rows; no client JavaScript is needed for permalinks, reload or history.

## Activity snapshot

Top-level fields: `reviewedAt`, UTC `capturedAt` on that date, `method: first-parent-committer-utc`, exactly twelve consecutive calendar `months` ending in the snapshot month, and one `projects` record per catalog slug. The current month is partial. Unknown or missing project IDs fail validation.

GitHub records contain:

- `kind: github`, verified canonical `repository`, numeric GitHub `repositoryId`, actual `defaultBranch` and captured `headSha`;
- twelve nonnegative safe-integer `commits` buckets;
- latest UTC `lastCommitAt` across the captured tip's full first-parent history;
- manually reviewed `lastMeaningfulCommitAt` and `lastMeaningfulCommitSha`, with a matching primary commit URL in the content sources.

Dates cannot exceed the snapshot. Meaningful activity cannot follow the latest commit or precede the rolling cutoff. Latest and meaningful commit months must agree with nonempty buckets where inside the window; no later month may have commits. Raw buckets include maintenance/bot traffic, while eligibility is assessed separately.

Public activity displays the latest date prominently, one canonical repository, twelve binary marks, and `N/12 active months`. Per-month accessible labels/titles expose actual counts. Never show stars, forks, rankings or scores.

Non-GitHub records use `kind: public-update`, a required `lastPublicUpdateAt` and a valid `lastPublicUpdateSource`. They show an update date and the project's primary links, with no repository strip or fabricated GitHub history. Surfer uses its official GitLab repository and update source. Manual records also obey the rolling cutoff.

## Refresh and validation

`npm run refresh:eda-tools-activity` is manual only. It verifies public/nonfork/nonarchived repository identity, including numeric repository ID to reject replacements, resolves the default branch, makes a bare blob-filtered single-branch clone and counts first-parent committer dates in UTC. It verifies that the manually recorded meaningful commit remains in that first-parent history with the same date. It never advances that date/SHA or changes a public-update record automatically.

Refresh builds and validates the entire candidate snapshot before atomic replacement. A network, identity, history or freshness failure leaves the checked-in snapshot intact. It is not imported by build/browser code and is not part of `npm run check`.

`validate:eda-tools` and `test:eda-tools` are deterministic parts of `npm run check`. Test strict schema, source identity, curation, dates, buckets, sorting, real first-parent merge semantics and refresh safeguards. Keep all existing Golden/Analog validation intact.

Chromium production-preview tests cover inventory, exact authored matrix/activity states, ordering, navigation, sparse English UI, quick links, native hash/history behavior, keyboard and no-JS access, 1440/390/320px geometry and state isolation. Run the entire smoke suite, inspect both catalogs visually, and compare the factual export with the pre-change build. A new navigation link must not change existing page bodies, content data or viewer semantics.
