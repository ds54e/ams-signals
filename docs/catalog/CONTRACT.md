# Shared catalog contract

Applies only to the independent Analog, Digital and Lab catalogs. [Analog](../analog/README.md), [Digital](../digital/README.md) and [Lab](../lab/README.md) own domain scope and schema differences; [AI-development policy](../AI_DEVELOPMENT.md) owns development provenance; [the visual system](../VISUAL_SYSTEM.md) owns visual tokens and dimensions. Read the sections relevant to the task.

## Curation and boundaries

The catalogs describe evolving public implementations, their user-facing functional coverage, primary evidence and reviewed activity. They are a current landscape, not an exhaustive archive or ranking. Keep them independent of Golden Timeline/Events, Company/Person records and viewer state; do not force catalog projects into Golden Events.

Choose the catalog from the primary implemented workflow and its inputs and outputs, not the project name, application example, programming language or presence of an adapter.

| Catalog | Primary outcome |
| --- | --- |
| Analog | An analog/RF circuit or model, electrical simulation or characterization, or physical custom-IC implementation and extraction |
| Digital | An RTL or digital design representation, logic synthesis or physical implementation, or a functional result from exercising models, testbenches or digital constraints |
| Lab | A board or fixture artifact, physical instrument or DUT operation, acquired measurement, analysis of recorded bench data, or a repeatable test procedure or verdict |

A calibrated VNA is Lab; RF network fitting and equivalent model export remain Analog even when the input is measured data. An RTL waveform viewer is Digital; a reader for saved oscilloscope or tester records is Lab. Register test layers and virtual-target co-simulation can stay Digital while companion transports and physical fixture control are Lab. Cross-reference related implementations in project sources rather than adding a copy. A device-specific capture stack can remain separate from a general instrument frontend when it implements hardware streaming or triggering itself. Electrical estimation within a modeled serial link belongs to Analog Simulation; comparing RTL simulator traces belongs to Digital Verification; estimating spectra from saved bench records belongs to Lab Analysis. Keep register-map elaboration, RTL generation and software access layers distinct. For hardware-timed experiments, a compiler, shot coordinator and device driver are related, but a coordinator does not inherit the driver’s acquisition scope. A vendor instrument wrapper belongs to Control and/or Acquisition according to the implemented settings and live capture paths. Treat bundled predecessor wrappers and new high-level SDKs as one listing when their operational scopes overlap.

Cross-catalog membership is separately curated for substantial, independently usable domain workflows. Vibe-IC and OpenADA are the explicit reviewed exceptions: each entry describes its own domain operations, while both share one canonical repository identity and repository history rather than independent activity evidence. An adapter, dependency or application example alone does not establish another domain listing. Other duplicates still require explicit review.

## Project selection and retention

### Selection

Require reviewed public implementation supporting the claimed contribution and a canonical repository or source distribution linked as `code`. Papers, READMEs, datasets, demonstrations and recorded outputs cannot replace code. Licensed EDA, PDKs, hardware or model access may be needed; neither an open-source license nor a fully open reproducible toolchain is required.

Public code and recent activity establish eligibility, not an automatic reason for a separate listing. Identify the reusable engineering operation, its usable entry point and the material choice it adds alongside retained projects. A narrow specialist can justify a listing; a generic transport, packaging layer, incidental example or unfinished scaffold needs more than proximity to an EDA or measurement tool. Distinct research tasks, evaluation methods and reusable verification assets can provide that value when their execution and limits are inspectable.

Treat continued development or technical maintenance as a selection criterion separate from usefulness and recent activity. Identify what changed after the first usable implementation: follow-up feature work, correctness fixes, verification improvements, compatibility repairs or responses to observed engineering problems. New projects can qualify through demonstrated follow-through; low-frequency technical maintenance can qualify without a minimum project age, fixed cadence or additional day-count threshold.

An initial burst, commit counts, stars, repository age and latest push dates alone are insufficient. Tests delivered with an initial implementation do not by themselves demonstrate later maintenance, and a long past history does not establish continuing work today. Assess the substance and chronology of changes, including merges and bot-authored work. Cosmetic edits, traffic statistics and automatic version bumps alone do not renew eligibility.

Record concrete technical changes from separate periods when using them as evidence of sustained development. For low-cadence tools, distinguish a stable, still useful implementation with real maintenance from a prototype whose public follow-through cannot be established. Review maintainer responses, branches, releases and declared migrations where the history is ambiguous; open issues or proposed work alone do not establish implementation. If the evidence is too short or equivocal, keep the candidate out until the next review instead of inferring abandonment or inventing a minimum age.

### Freshness and active-list eligibility

Entries with reviewed activity require verified meaningful public activity within the preceding calendar year, inclusively; February 29 clamps to February 28. They also need at least one reviewed public activity signal in the twelve displayed calendar months. These necessary freshness conditions neither establish selection nor guarantee a year of retention.

New [unfetched registrations](#capture-types-and-failures) may be displayed without an activity date or counts while capture is unresolved; they do not establish reviewed freshness.

A confirmed all-zero band is removed through explicit curation, including its matching snapshot record; zero in only the current month is not a removal criterion. Missing records, failed captures and unknown activity are errors to investigate, never zero signals. Validators reject an all-zero active entry instead of silently filtering it or inventing activity. The generic band renderer still represents out-of-window point evidence accurately without clamping it into the window.

### Retention and removal

Apply the same criteria to new and existing entries; historical interest alone does not retain a one-off release. An old review checkpoint is a reason to recheck, not proof of subsequent inactivity.

Before exclusion, check the canonical development location, active branches, substantive releases and migrations. Resolve inaccessible or withdrawn code before retaining it; failed access is not inactivity. A quiet stable branch or recent repository creation is not the project's full history. Development-branch work may support selection, but is not integrated/released capability or default-branch activity.

Give every listing a distinct job in the workflow. Separate a wrapper, companion, or dependency only when its independently usable operation fills a different need; otherwise reference it from the existing listing. When a maintainer migrates a project, prefer one canonical listing and do not count the predecessor’s history twice.

Review overlapping alternatives together and consolidate entries whose additional discovery value is limited to a small adapter or companion operation. Keep useful related-source references and explain the relationship, without attributing the removed project's functions, provenance or activity to the retained project. Multiple implementations of the same broad task may remain when they offer a meaningful difference in inputs, supported environments, methods or engineering outputs. Do not use project size, popularity, AI attribution or a deletion quota as a substitute for that assessment.

Keep concise selection/retention reasoning with existing project sources and notes; explain removals in the curation change. Remove entries and matching activity records explicitly, not through automatic filtering or weakened freshness gates. Add no status taxonomy, score or separate research inventory.

## Evidence and editorial standards

Reopen primary project/author sources and inspect relevant implementation/tests before changing claims or classification. Distinguish implementation from plans/experiments, electrical evaluation from structural grading, evaluator operations from model tools, and reported from independently reproduced results. Do not run expensive EDA/model experiments merely to classify coverage.

Keep implementation, classification, selection, limitations and release reasoning in project Markdown notes with source IDs. Publish the concise description and requested provenance explanation. Revise descriptions/Scope for material capability, limitation or access changes; routine fixes may support retention without rewriting descriptions.

## Scope and AI classification

Stages record distinct, implemented user-facing operations, not completeness or strength. Record more than one when the project itself exposes those operations, directly or through a supported execution workflow. Dependencies, data formats, externally consumed output files, incidental adapters and plans do not add stages by themselves; absence is not a claim of inability.

`scope` requires at least one domain stage, each a strict `{ ai: boolean }`. Presence records coverage under the domain-specific [Analog](../analog/README.md#scope), [Digital](../digital/README.md#scope) or [Lab](../lab/README.md#scope) rules. Render the same plain functional stage label regardless of the boolean. Describe material model-driven operations in the project description and notes rather than a label prefix.

Optional `scope.aiDevelopment` is `assisted` with paired evidence under the shared policy. Verified credited executable code, including isolated fixes and test/build/tool/example logic, supports the single AI-ASSISTED label; contribution size is not classified. Verify actor identity, actual code, canonical integration and current retention. Provenance is independent of runtime AI and is not a functional stage. Reject parallel provenance booleans, roles, strength levels and project-wide runtime-AI enums.

A stage's AI boolean identifies material model-driven generation, decisions/search, prediction, interpretation, diagnosis or control in that stage. A released model-hosted agent skill qualifies when it specifies substantive stage decisions and connects them to implemented operations; a generic MCP/CLI/API, agent-readable instructions or a model client alone does not. Optional implemented paths count, with their setup and limits stated in the description and notes.

For a released benchmark explicitly evaluating AI methods, the stage's internal AI boolean also identifies the stage performed by the evaluated model. The public description must identify the benchmark role; this classification does not claim that its grader contains AI. Require a concrete stage-specific task contract or evaluation method, not merely a dataset usable by AI, generated corpus, planned model integration or incidental use in another project's benchmark.

## Data and ownership

Each domain owns its collection, schema, activity JSON, loader and page. Shared presentation uses `src/components/CatalogIndex.astro`, `src/styles/catalog.css` and `src/scripts/catalog-filter.ts`; shared activity-window/sort helpers preserve domain validation differences.

Keep stable project filenames/IDs. Frontmatter owns metadata, Scope, sources and review dates; Markdown notes own reasoning and are not rendered on the index. Source IDs are unique stable slugs with public, non-placeholder, credential-free HTTP(S) URLs and at most one quick-link purpose each (`official`, `paper`, `code`, `results`). Use Website for a verified project or maintainer site or official documentation, when it helps readers get started; keep Code on the canonical implementation. Do not duplicate the Code link under Website. External URLs belong in frontmatter; body prose uses validated `#source-ID` links. Domain schemas/guides own exact fields and limits; unknown fields fail validation.

## Reviewed public activity

### Snapshot and repository history

Activity records observations, not selection or quality. Snapshots use `reviewedAt`, UTC `capturedAt`, `method: first-parent-committer-utc`, twelve consecutive `months` ending in the snapshot month and one record per project. The current month is partial. Validate complete coverage, date/window consistency and nonnegative safe-integer repository buckets. Preserve domain-specific field requirements and individual GitHub `capturedAt` values after targeted refreshes; the snapshot timestamp does not claim every record was recaptured. Analog alone accepts optional activity-record `notes`; Digital and Lab reject that field. Keep editorial reasoning and implementation limits in the article body, not additional capture fields.

Use one verified canonical public repository and its actual default branch. Pin identity, branch, head and capture time; count the head's full first-parent committer history in UTC. A merge counts once at integration, not again through side branches. Do not sum component repositories or non-landed PR refs. Commit dates are not verified push/landing times; imports, rewrites, fast-forwards, bots and bulk commits can distort visibility. Keep limitations with the record, not dashboard prose.

`lastMeaningfulCommitAt` is manually reviewed freshness evidence, bounded by the rolling cutoff and latest commit. A supplied meaningful SHA must occur in captured first-parent history and match its UTC date and canonical commit source. In-window latest/meaningful months need nonempty buckets; counts cannot follow the latest commit month. Preserve meaningful dates/SHAs until new source review justifies a change, never automatically promoting cosmetic commits. For a newly reviewed meaningful commit already in the saved first-parent capture, edit only the meaningful date/SHA and its matching article sources; leave raw counts, head, latest date and capture timestamps unchanged. A later source revision can support article claims or retention, but do not advance the saved activity checkpoint past the captured head: recapture the canonical history before adopting it. Keep historical source IDs stable, including any used by development evidence. The `activity` source ID seeds new GitHub registrations; an existing record may refer to a later canonical commit through a different source ID. Latest commit dates, not meaningful checkpoints, govern order.

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

Support only `/analog/`, `/digital/` and `/lab/`, without compatibility routes, redirects, detail pages or self-permalink aliases. Use domain-defined hidden H1/browser titles, correct base-path links, indexable self-canonical metadata and Home | Timeline | Events | Analog | Digital | Lab | GitHub navigation. No visible section title, introduction, review-date/methodology block, overview cards, legend, tabs or rankings.

The English index has a metadata rail and project body, without column headings. The rail order is latest public date, twelve binary activity cells, then vertically stacked Scope labels; no month totals or repeated Scope/Activity labels. The body starts with a plain-text H2 name and authored Website / Paper / Code / Results links, in that order on one left-aligned wrapping title line. No title classification badge or replacement icon.

Descriptions normally use two useful sentences, roughly 30–55 words: function, then mechanism/output/necessary boundary. Retain technical terms and adequate shorter descriptions; do not pad or invent hidden search metadata. Display full descriptions at every viewport with natural wrapping and content-sized rows, without truncation or disclosure requirements.

Sort descending by `lastCommitAt` for repository records or `lastPublicUpdateAt` otherwise, then ascending by NFKC-normalized lowercase trimmed name and slug. Do not mutate authored input. Meaningful dates govern eligibility, not order; counts never rank projects.

One final AI-ASSISTED provenance badge follows functional stages, with transparent fill, muted-purple text and a thin light-purple border. Without JavaScript, all rows, metadata, links and provenance explanations remain readable and the filter toolbar stays hidden. Native disclosure buttons require project-specific accessible names, `aria-controls`, `aria-expanded`, keyboard focus and expanded touch targets. Enter/Space/touch toggles an inline row-spanning "Development provenance" panel with explanation and primary links, without modal, storage or navigation side effects.

### Search and Scope filtering

Search the public name, authored aliases, description and rendered stage/provenance labels. Match aliases without displaying duplicate entries or replacing the canonical name. Exclude private notes, source URLs and accessible evidence explanations. Disclosure state must not affect matches. Normalize NFKC, English case, punctuation/symbol separators and whitespace; require all terms. One/two-character terms match whole words, longer terms match substrings.

The native selector offers All scopes and ordered domain stages, matching stage presence independently of internal AI classification. Search AND stage selection only hide rows, preserving activity order. Apply on input after IME composition and on selection changes. Enter does not navigate or submit a query string. Reconcile restored controls on `pageshow`; no URL/history manager, storage or runtime fetching.

Show `N projects` unfiltered or `N of TOTAL projects` for any nonempty search/narrowed stage, even if all match. Announce counts politely. Zero results shows only `No projects match.` below controls; clearing controls restores all rows. Catalog filters remain independent from Timeline/Events.

## Maintenance and verification

Separate editorial curation from mechanical capture. Preserve unrelated metadata, source URLs, activity, Golden records and export semantics; source URL changes require review. Explicitly curate removals/renames and keep matching activity records aligned.

Manual `npm run refresh:analog-activity` / `npm run refresh:digital-activity` / `npm run refresh:lab-activity` derive new registrations from Code links and explicit `activity` commit sources, refresh GitHub history, preserve reviewed meaningful activity and manual non-GitHub records, validate the whole candidate snapshot and replace it atomically. `-- --project=<slug>` selects same-month captures, preserving untouched GitHub timestamps. Month rollover requires complete recapture, including canonical non-GitHub history. New failures produce `unfetched`; existing good-record failures preserve the checked-in snapshot. Refresh is not a build/check/browser dependency; normal builds need no repository-host access.

Use the [catalog-refresh skill](../../.agents/skills/ams-signals-catalog-refresh/SKILL.md) for activity registration, recapture and month rollover, starting from current records, source notes and domain validation. [Testing](../TESTING.md) owns check selection. Presentation checks cover first/middle/last, multi-stage and multi-link rows at visual-system viewports, system color schemes, keyboard, no-JavaScript and forced colors. Never hardcode mutable project counts or weaken domain/factual guards.
