# Digital / RTL implementation contract

## Isolation and files

Use the `edaTools` Astro Markdown collection at `src/content/eda-tools/*.md`, an EDA-specific page, schema/catalog/activity modules and CSS. Do not refactor Analog to share its schema. Static activity lives separately in `src/data/eda-tools-activity.json`. Body prose is internal research and is never rendered by the page.

Use `Digital` after `Analog` in primary navigation, using the deployment base path and route-specific `aria-current="page"`. Use browser title `Digital / RTL · AMS Signals`, hidden H1 `Digital / RTL`, and metadata describing RTL/digital tools and agents. It must not participate in Timeline/Events filter links or storage. Keep `/eda-tools/` and internal collection paths; no redirects.

## Strict content schema

Filenames are unique stable lowercase hyphenated slugs. Each record contains:

| Field | Contract |
| --- | --- |
| `name`, `aliases` | Project identity; aliases default to an empty array. |
| `roles` | One or two distinct values from the shared catalog role enum: `agent`, `benchmark`, `eda-tool`, `dataset-environment`. Public labels are Agent, Benchmark, EDA Tool, Dataset & Environment. |
| `primary` | Exactly one of `simulation`, `frontend-synthesis`, `formal-verification`, `debug-waveform`, `flow-physical`. |
| `ai` | Exactly `ai-built`, `ai-enabled` or `traditional`, retained internally. Only `ai-built` is rendered publicly. |
| `description` | One concise English paragraph, at most 600 characters; shown once below the name. |
| `keywords` | 3–5 English strings, at most 28 characters each; normalized duplicates rejected. |
| `areas` | Only the five primary-category keys, each optional `core` or `supporting`; at least one core and `areas[primary] === "core"`. |
| `access` | Internal implementation/release-access context. |
| `addedAt`, `reviewedAt` | Valid quoted calendar dates; review cannot precede addition. Hidden in the public UI. |
| `sources` | Unique stable source IDs, titles and valid public HTTP(S) URLs; no more than one `official`, `paper`, `code` or `results` purpose. Additional research sources have no purpose. |

The Markdown body holds durable Scope / Classification / Release boundary notes and local `#source-ID` references. Keep URLs in frontmatter; reject raw external URLs, HTML and unknown local source references. Unknown schema fields and placeholder content fail validation.

## Matrix and index

Matrix columns, in order: Simulation; Frontend / Synth; Formal / Verify; Debug / Wave; Flow / Physical. Use an accessible HTML table with row/column headers and a hidden caption. Use equally sized CSS-drawn circles, filled for core and open/bordered for supporting, with legend `● core   ○ supporting`. Missing metadata renders a blank with no circle. Tooltips and accessible labels communicate `Core scope`, `Supporting scope` and `No reviewed scope`. Preserve the distinction in monochrome and forced-color modes; do not depend on Unicode glyph shapes. Marks do not measure quality or maturity.

The matrix is the first visible content. The compact legend immediately follows it. Its first column sticks within a horizontally scrollable, keyboard-focusable region. Narrow screens scroll only this region, not the page.

Both matrix and index sort by `lastCommitAt` for GitHub or `lastPublicUpdateAt` otherwise, descending; then NFKC-normalized lowercase trimmed project name, then slug, ascending. Sorting does not mutate authored inventory and does not use meaningful activity as the ordering date.

The index begins with column labels, not a section heading. Use exactly three columns: Project, Keywords, Activity, with approximate desktop proportions `2.5fr / 1.15fr / 1.2fr` and unchanged page width. Mobile stacks the same three areas. Render individual role tags first in authored order, followed by an `AI-built` tag only for explicitly approved entries, then the existing technical keywords. Use one restrained visual tag group with `data-tag-kind` for role/AI/keyword distinctions; keep the underlying metadata separate. Never display primary category, AI-enabled or Traditional as public type labels. Keep Website / Paper / Code / Results links in that order beside the title, using a wrapping flex row with the name left and links right. Let links wrap directly below on small screens; no truncation, icons or fixed-width link box. Keep the description below this title row and preserve every primary URL. Do not show full research sources, prerequisites or notes. Native hash anchors identify focusable project rows; no client JavaScript is needed for permalinks, reload or history.

## Domain membership

Keep the 33 existing Digital entries after moving Ngspice + OpenVAF Enhancements and its complete activity record to Analog. Dr. RTL, VerifyRTL, HAVEN, UCAgent, Spec2Cov and CoreSmith have the authored Agent role; all other current Digital entries use EDA Tool. Preserve their areas, primary category, internal AI relations, activity and source notes. The AI-built set is unchanged except for the moved entry: xezim, vitamin, iverilog-uvm, uhdm2rtlil, WHAT and vivado_mcp. The moved entry keeps its slug on Analog; no duplicated record or redirect remains here.

## Activity snapshot

Top-level fields: `reviewedAt`, UTC `capturedAt` on that date, `method: first-parent-committer-utc`, exactly twelve consecutive calendar `months` ending in the snapshot month, and one `projects` record per catalog slug. The current month is partial. Unknown or missing project IDs fail validation.

GitHub records contain:

- `kind: github`, verified canonical `repository`, numeric GitHub `repositoryId`, actual `defaultBranch` and captured `headSha`;
- twelve nonnegative safe-integer `commits` buckets;
- latest UTC `lastCommitAt` across the captured tip's full first-parent history;
- manually reviewed `lastMeaningfulCommitAt` and `lastMeaningfulCommitSha`, with a matching primary commit URL in the content sources.

Dates cannot exceed the snapshot. Meaningful activity cannot follow the latest commit or precede the rolling cutoff. Latest and meaningful commit months must agree with nonempty buckets where inside the window; no later month may have commits. Raw buckets include maintenance/bot traffic, while eligibility is assessed separately.

Public GitHub activity has a top line with the prominent date (`Sep 5`, including a different year when needed) left and `N/12 mo` right. Below are twelve equal CSS cells, oldest to newest: filled when count > 0, quietly outlined when zero. Counts never change height, width, opacity or color intensity. Each cell retains full month/year and raw commit counts in title/accessible text and data attributes. Repository/default-branch identity stays in the band's accessible label, not visible text or a duplicate link. Do not show Latest. Derive a subtle first/last month cue in the Activity header from the snapshot; mobile may hide it with the headers. Never show stars, forks, rankings or scores.

Non-GitHub records use `kind: public-update`, a required `lastPublicUpdateAt` and a valid `lastPublicUpdateSource`. They show only the source-backed date in Activity, without a repository band, `0/12 mo`, or fabricated GitHub history. Primary links remain beside the project title. Surfer uses its official GitLab repository and update source. Manual records also obey the rolling cutoff.

## Refresh and validation

`npm run refresh:eda-tools-activity` is manual only. It verifies public/nonfork/nonarchived repository identity, including numeric repository ID to reject replacements, resolves the default branch, makes a bare blob-filtered single-branch clone and counts first-parent committer dates in UTC. It verifies that the manually recorded meaningful commit remains in that first-parent history with the same date. It never advances that date/SHA or changes a public-update record automatically.

Refresh builds and validates the entire candidate snapshot before atomic replacement. A network, identity, history or freshness failure leaves the checked-in snapshot intact. It is not imported by build/browser code and is not part of `npm run check`.

`validate:eda-tools` and `test:eda-tools` are deterministic parts of `npm run check`. Test strict schema, source identity, curation, dates, buckets, sorting, real first-parent merge semantics and refresh safeguards. Keep all existing Golden/Analog validation intact.

Chromium production-preview tests cover inventory, exact authored matrix/activity states, CSS filled/open scope circles, twelve equal binary cells independent of commit volume, three columns, role/AI tags before technical keywords, title-row links and wrap geometry, ordering, navigation, sparse English UI, quick links, native hash/history behavior, keyboard and no-JS access, 1440/390/320px geometry and state isolation. Run the entire smoke suite, inspect both catalogs visually, and compare the factual export with the pre-change build. Navigation wording changes must not change factual/Article page bodies, content data or viewer semantics. Verify cross-catalog membership, approved AI-built display, shared roles, preserved retained hashes and a fake-strip-free ngspice record on Analog.
