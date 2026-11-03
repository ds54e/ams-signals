# Shared catalog contract

Applies only to the independent Analog and Digital catalogs. [Analog](../analog/README.md) and [Digital](../digital/README.md) own domain scope and schema differences; [AI-development policy](../AI_DEVELOPMENT.md) owns development provenance; [the visual system](../VISUAL_SYSTEM.md) owns visual tokens and dimensions. Read the sections relevant to the task.

## Curation and boundaries

The catalogs describe evolving public implementations, their user-facing design-flow coverage, primary evidence and reviewed activity. They are a current landscape, not an exhaustive archive or ranking. Keep them independent of Golden Timeline/Events, Company/Person records, viewer state and `/export.json`; do not force catalog projects into Golden Events.

Domain selects the catalog. Cross-catalog membership is separately curated. Vibe-IC remains the explicit exception: independently reviewed domain workflows share one canonical repository identity, not independent activity evidence. This does not authorize other duplicate entries.

## Project selection and retention

### Selection

Require reviewed public implementation supporting the claimed contribution and a canonical repository or source distribution linked as `code`. Papers, READMEs, datasets, demonstrations and recorded outputs cannot replace code. Licensed EDA, PDKs, hardware or model access may be needed; neither an open-source license nor a fully open reproducible toolchain is required.

Require verified meaningful public activity within the preceding calendar year, inclusively; February 29 clamps to February 28. [Analog](../analog/README.md#active-list-eligibility) and [Digital](../digital/README.md#active-list-eligibility) also require a reviewed signal in the twelve displayed calendar months. These necessary freshness conditions neither establish selection nor guarantee a year of retention.

Select projects showing either sustained substantive development/maintenance across their history or active recent implementation and validation. Inspect distinct feature additions, correctness fixes, verification improvements, compatibility work and technical results. New projects can qualify through substantive iteration; low-frequency technical maintenance can qualify without a minimum project age, fixed cadence or additional day-count threshold.

An initial burst, commit counts, stars, repository age and latest push dates alone are insufficient. Assess the substance of changes, including merges and bot-authored work. Cosmetic edits, traffic statistics and automatic version bumps alone do not renew eligibility.

### Retention and removal

Apply the same criteria to new and existing entries; historical interest alone does not retain a one-off release. An old review checkpoint is a reason to recheck, not proof of subsequent inactivity.

Before exclusion, check the canonical development location, active branches, substantive releases and migrations. Resolve inaccessible or withdrawn code before retaining it; failed access is not inactivity. A quiet stable branch or recent repository creation is not the project's full history. Development-branch work may support selection, but is not integrated/released capability or default-branch activity.

Keep concise selection/retention reasoning with existing project sources and notes; explain removals in the curation change. Remove entries and matching activity records explicitly, not through automatic filtering or weakened freshness gates. Add no status taxonomy, score or separate research inventory.

## Evidence and editorial standards

Reopen primary project/author sources and inspect relevant implementation/tests before changing claims or classification. Distinguish implementation from plans/experiments, electrical evaluation from structural grading, evaluator operations from model tools, and reported from independently reproduced results. Do not run expensive EDA/model experiments merely to classify coverage.

Keep implementation, classification, selection, limitations and release reasoning in project Markdown notes with source IDs. Publish the concise description and requested provenance explanation. Revise descriptions/Scope for material capability, limitation or access changes; routine fixes may support retention without rewriting descriptions.

## Scope and AI classification

Stages record material user-facing coverage, not completeness or strength. Dependencies, incidental adapters and plans add no stages; absence is not a claim of inability.

`scope` requires at least one domain stage, each a strict `{ ai: boolean }`. Presence records coverage; the boolean follows [Analog](../analog/README.md#scope) or [Digital](../digital/README.md#scope) rules for runtime AI and explicit AI benchmark tasks, separating the evaluated model from its grader. Render the ordinary label or its `AI ` prefix, never both.

Optional `scope.aiDevelopment` is `assisted` or `built` with paired evidence under the shared policy. Verified credited executable code, including isolated fixes and test/build/tool/example logic, supports `assisted`; `built` needs primary evidence that AI built most of the project. Verify actor identity, actual code, canonical integration and current retention. Provenance is independent of runtime AI and is not a functional stage. Reject parallel provenance booleans, roles, strength levels and project-wide runtime-AI enums.

## Data and ownership

Each domain owns its collection, schema, activity JSON, loader and page. Shared presentation uses `src/components/CatalogIndex.astro`, `src/styles/catalog.css` and `src/scripts/catalog-filter.ts`; shared activity-window/sort helpers preserve domain validation differences.

Keep stable project filenames/IDs. Frontmatter owns metadata, Scope, sources and review dates; Markdown notes own reasoning and are not rendered on the index. Source IDs are unique stable slugs with public, non-placeholder, credential-free HTTP(S) URLs and at most one quick-link purpose each (`official`, `paper`, `code`, `results`). External URLs belong in frontmatter; body prose uses validated `#source-ID` links. Domain schemas/guides own exact fields and limits; unknown fields fail validation.

## Reviewed public activity

### Snapshot and repository history

Activity records observations, not selection or quality. Snapshots use `reviewedAt`, UTC `capturedAt`, `method: first-parent-committer-utc`, twelve consecutive `months` ending in the snapshot month and one record per project. The current month is partial. Validate complete coverage, date/window consistency and nonnegative safe-integer repository buckets. Preserve domain-specific field requirements and individual GitHub `capturedAt` values after targeted refreshes; the snapshot timestamp does not claim every record was recaptured.

Use one verified canonical public repository and its actual default branch. Pin identity, branch, head and capture time; count the head's full first-parent committer history in UTC. A merge counts once at integration, not again through side branches. Do not sum component repositories or non-landed PR refs. Commit dates are not verified push/landing times; imports, rewrites, fast-forwards, bots and bulk commits can distort visibility. Keep limitations with the record, not dashboard prose.

`lastMeaningfulCommitAt` is manually reviewed freshness evidence, bounded by the rolling cutoff and latest commit. A supplied meaningful SHA must occur in captured first-parent history and match its UTC date and canonical commit source. In-window latest/meaningful months need nonempty buckets; counts cannot follow the latest commit month. Preserve meaningful dates/SHAs until new source review justifies a change, never automatically promoting cosmetic commits. Latest commit dates, not meaningful checkpoints, govern order.

### Capture types and failures

| Record | Required evidence and behavior |
| --- | --- |
| Non-GitHub `kind: repository` | Canonical HTTPS URL matching Code, host-scoped repository ID, actual branch, pinned head, twelve counts, latest and meaningful date/SHA, `lastMeaningfulCommitSource` resolving to the canonical commit, and individual `capturedAt`. Capture falls within the snapshot month, no later than review and no earlier than the latest commit. Recapture on month rollover; do not relabel buckets, borrow mirror history or imply other records were refreshed. |
| `kind: public-update` | `lastPublicUpdateAt`, `lastPublicUpdateSource`, `lastPublicUpdateType` (`paper`, `release`, `public-update`). Monthly history is unavailable in this view; public code need not be absent. Activate only the source-backed event's month, without synthetic commits, repository or SHA. Out-of-window evidence yields twelve inactive cells without changing its date or freshness rule. |
| New `kind: unfetched` | Canonical GitHub repository and actual `attemptedAt`, with no counts/activity date. Sort after dated entries and display "Activity not fetched." Retry before treating it as reviewed activity. |

Failed refreshes of existing good records leave the destination unchanged; missing records or access failures are not zero activity.

Repository cells retain counts; point cells identify paper/release/public-update evidence, with inactive point cells meaning no reviewed signal rather than zero commits. Preserve month/year and provenance in hover/accessibility metadata. Inactive months do not prove development stopped. All twelve cells have one binary appearance, oldest-left to newest-right; counts never change visible strength. The visual system owns dimensions.

## Presentation and disclosure

### Index and provenance

Support only `/analog/` and `/digital/`, without compatibility routes, redirects, detail pages or self-permalink aliases. Use domain-defined hidden H1/browser titles, correct base-path links, indexable self-canonical metadata and Home | Timeline | Events | Analog | Digital | GitHub navigation. No visible section title, introduction, review-date/methodology block, overview cards, legend, tabs or rankings.

The English index has a metadata rail and project body, without column headings. The rail order is latest public date, twelve binary activity cells, then vertically stacked Scope labels; no month totals or repeated Scope/Activity labels. The body starts with a plain-text H2 name and authored Website / Paper / Code / Results links, in that order on one left-aligned wrapping title line. No title classification badge or replacement icon.

Descriptions normally use two useful sentences, roughly 30–55 words: function, then mechanism/output/necessary boundary. Retain technical terms and adequate shorter descriptions; do not pad or invent hidden search metadata. Display full descriptions at every viewport with natural wrapping and content-sized rows, without truncation or disclosure requirements.

Sort descending by `lastCommitAt` for repository records or `lastPublicUpdateAt` otherwise, then ascending by NFKC-normalized lowercase trimmed name and slug. Do not mutate authored input. Meaningful dates govern eligibility, not order; counts never rank projects.

One final provenance badge follows functional stages. AI-ASSISTED and AI-BUILT share transparent fill, muted-purple text, a thin light-purple border and geometry; text distinguishes them. Without JavaScript, all rows, metadata, links and provenance explanations remain readable and the filter toolbar stays hidden. Native disclosure buttons require project-specific accessible names, `aria-controls`, `aria-expanded`, keyboard focus and expanded touch targets. Enter/Space/touch toggles an inline row-spanning "Development provenance" panel with explanation and primary links, without modal, storage or navigation side effects.

### Search and Scope filtering

Search only public name, description and rendered stage/provenance labels, excluding aliases, private notes, source URLs and accessible evidence explanations. Disclosure state must not affect matches. Normalize NFKC, English case, punctuation/symbol separators and whitespace; require all terms. One/two-character terms match whole words, longer terms match substrings.

The native selector offers All scopes and ordered domain stages, matching stage presence independently of AI prefixes. Search AND stage selection only hide rows, preserving activity order. Apply on input after IME composition and on selection changes. Enter does not navigate or submit a query string. Reconcile restored controls on `pageshow`; no URL/history manager, storage or runtime fetching.

Show `N projects` unfiltered or `N of TOTAL projects` for any nonempty search/narrowed stage, even if all match. Announce counts politely. Zero results shows only `No projects match.` below controls; clearing controls restores all rows. Catalog filters remain independent from Timeline/Events.

## Maintenance and verification

Separate editorial curation from mechanical capture. Preserve unrelated metadata, source URLs, activity, Golden records and export semantics; source URL changes require review. Explicitly curate removals/renames and keep matching activity records aligned.

Manual `npm run refresh:analog-activity` / `npm run refresh:digital-activity` derive registrations from Code links and explicit `activity` commit sources, refresh GitHub history, preserve reviewed meaningful activity and manual non-GitHub records, validate the whole candidate snapshot and replace it atomically. `-- --project=<slug>` selects same-month captures, preserving untouched GitHub timestamps. Month rollover requires complete recapture, including canonical non-GitHub history. New failures produce `unfetched`; existing good-record failures preserve the checked-in snapshot. Refresh is not a build/check/browser dependency; normal builds need no repository-host access.

Use the [catalog-refresh skill](../../.agents/skills/ams-signals-catalog-refresh/SKILL.md) for recapture, starting from current records, source notes and domain validation. [Testing](../TESTING.md) owns check selection. Presentation checks cover first/middle/last, multi-stage and multi-link rows at visual-system viewports, system color schemes, keyboard, no-JavaScript and forced colors. Never hardcode mutable project counts or weaken domain/factual guards.
