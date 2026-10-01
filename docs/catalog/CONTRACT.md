# Shared catalog contract

Applies only to the independent Analog and Digital catalogs. Read the relevant section for the task. [Analog](../analog/README.md) and [Digital](../digital/README.md) own domain scope and schema differences; [AI-development policy](../AI_DEVELOPMENT.md) owns provenance classification; [the visual system](../VISUAL_SYSTEM.md) owns visual tokens and dimensions.

## Curation and boundaries

The catalogs help readers identify what a project does, its meaningful user-facing design-flow coverage, available primary materials and reviewed public activity. They are a current landscape, not an exhaustive archive or ranking. Keep them separate from Golden Timeline/Events, Company/Person records, Article prose, viewer state and `/export.json`.

Public inspectability is an inclusion requirement. Each project needs at least one substantive public inspection surface: source implementation; a released reference implementation, benchmark, dataset or test/evaluation artifact; or a research publication that exposes concrete methods and results for technical review. Public inspectability does not require an open-source license or a fully reproducible open toolchain: a project may depend on licensed EDA, PDKs, hardware or model access when its own claimed contribution remains inspectable. A closed commercial product supported only by product pages, announcements or demonstration media is not eligible. Promotional material may supplement, but never replace, the substantive inspection surface.

Cross-catalog membership remains separately curated. Vibe-IC is the explicit exception: its Analog and Digital entries describe independently reviewed domain-specific workflows while retaining one canonical repository identity. This does not authorize other duplicate entries or treat the shared activity history as independent evidence.

A present stage means material user-facing coverage, not completeness or strength. Internal dependencies, incidental adapters and planned features do not create extra Scope stages. A missing stage is not a claim of inability. Domain chooses the catalog; do not force catalog projects or their sources into Golden Events.

Reopen primary project/author sources before changing technical claims or classification. Distinguish implemented operations from experiments/plans, electrical evaluation from structural grading, evaluator operations from model tools, and reported results from reproduced results. Do not run expensive external EDA/model experiments merely to classify coverage. Keep durable implementation, classification, limitation and release reasoning in the project's Markdown body with its source IDs; expose only the concise public description and requested provenance explanation.

Eligibility requires verified meaningful public activity within the preceding calendar year, inclusively; February 29 clamps to February 28. This cutoff is separate from the twelve displayed calendar months; [Analog](../analog/README.md#active-list-eligibility) and [Digital](../digital/README.md#active-list-eligibility) additionally require a signal inside their displayed window. Manually review substantive implementation, correctness, tests, technical maintenance or results. Cosmetic/bot traffic alone does not renew eligibility. Remove stale entries through an explicit curation change, never by weakening the cutoff or silently dropping them during a mechanical refresh. Historical technical value is not disputed by removal.

## Data and ownership

Each domain retains its own collection, schema, activity JSON, loader and page. Shared presentation uses `src/components/CatalogIndex.astro`, `src/styles/catalog.css` and `src/scripts/catalog-filter.ts`; shared activity-window/sort helpers do not erase domain-specific validation.

Use stable project filenames/IDs. Frontmatter owns public metadata, current Scope, primary sources and review dates. Markdown notes own source-grounded reasoning and boundaries. Source IDs are unique stable slugs, with public HTTP(S), non-placeholder, credential-free URLs and at most one quick-link purpose each (`official`, `paper`, `code`, `results`). Use validated local `#source-ID` references in body prose; keep external source URLs in frontmatter. The body is not rendered on the index. Unknown fields fail validation; exact domain field sets and limits remain in the schemas and domain guide.

`scope` requires at least one domain stage. Each present stage is a strict `{ ai: boolean }`: presence records coverage, the boolean follows the domain's stage-specific AI criteria. Runtime AI participation is the baseline; the [Analog](../analog/README.md#scope) and [Digital](../digital/README.md#scope) scope policies also cover explicit AI benchmark tasks while distinguishing the evaluated model from its grader. Emit either the ordinary label or its `AI ` prefix, not both. Optional `scope.aiDevelopment` is `assisted` or `built` with paired evidence under the shared policy. Provenance is independent of stage AI and cannot count as a functional stage. No legacy `aiBuilt`, parallel provenance booleans, roles, strength levels or project-wide runtime-AI enum is accepted.

## Presentation and disclosure

Only `/analog/` and `/digital/` are supported catalog routes; no compatibility pages, redirects, project detail pages or self-permalink aliases. Use the domain's hidden H1 and browser title, correct base-path links, indexable self-canonical metadata and Timeline | Events | Analog | Digital navigation. No visible title/introduction/review-date/methodology block, overview cards, legend, tabs or rankings.

The English index pairs a metadata rail with a project body, without visible column headings. The rail order is latest public date, twelve binary activity cells, then vertically stacked Scope labels. No visible month total or repeated Scope/Activity labels. The body starts with a plain-text H2 name and authored Website / Paper / Code / Results links in that order, wrapping on one left-aligned title line. No title classification badge or replacement icon.

Descriptions normally use two useful sentences, roughly 30–55 words: function first, then mechanism, output or a necessary boundary. Retain identifying technical terms naturally and keep an already adequate shorter description rather than padding it. Do not invent hidden search metadata.

Sort by latest public activity descending (`lastCommitAt` for repository records, otherwise `lastPublicUpdateAt`), then NFKC-normalized lowercase trimmed name and slug ascending. Do not mutate authored input. Meaningful dates govern eligibility, not order; counts never rank projects.

Render one final provenance badge after functional stages. AI-ASSISTED and AI-BUILT share outlined muted-red styling and geometry; visible text distinguishes them. Without JavaScript, all rows, metadata, links and provenance explanations remain readable and the filter toolbar stays hidden. Enhancement uses native disclosure buttons with project-specific accessible names, `aria-controls`, `aria-expanded`, keyboard focus and expanded touch targets. Enter/Space/touch opens or closes an inline row-spanning “Development provenance” panel with factual explanation and primary links. No modal, storage or navigation side effect.

## Search and Scope filtering

Search uses only public name, description and rendered stage/provenance labels. Do not index aliases, private research notes, source URLs or accessible evidence explanations. Disclosure state must not affect matching. Normalize Unicode NFKC, English case, punctuation/symbol separators and whitespace; all query terms must match. One/two-character terms match whole words; longer terms match substrings.

The native stage selector contains All scopes plus the domain's ordered stage labels. It matches underlying stage presence independently of AI prefixes. Search and stage selection combine with AND and only hide rows; their activity order is preserved. Apply on input after IME composition and on selection changes. Enter does not navigate or submit a query string. Reconcile browser-restored controls on `pageshow`; no URL/history manager, storage or runtime data fetching.

Show `N projects` when unfiltered, or `N of TOTAL projects` for any nonempty search/narrowed stage, even when every project matches. Announce the count politely. Zero results shows only `No projects match.` below the controls. Clearing native controls restores the full list. Catalog filters remain independent from Timeline/Events.

## Reviewed public activity

The snapshot uses `reviewedAt`, UTC `capturedAt`, `method: first-parent-committer-utc`, exactly twelve consecutive `months` ending in its snapshot month, and one record for each catalog project. The current month is partial. Validate complete coverage, date/window consistency and nonnegative safe-integer repository buckets. Domain-specific required/optional fields remain distinct.

**Repository history:** use exactly one verified canonical public repository and its actual default branch per project. Pin identity, branch, head and capture time. Count the captured head's full first-parent committer history in UTC: a merge counts once at integration, without separate side-branch counts. Never sum component repositories or non-landed PR refs. Commit dates are not verified push/landing times; imports, rewrites, fast-forwards, bots and bulk commits can distort observed visibility. Keep material limitations with the record, not public dashboard prose.

The latest commit date drives order. `lastMeaningfulCommitAt` is manually reviewed freshness evidence and cannot follow the latest commit or precede the rolling cutoff. A supplied meaningful SHA must occur in first-parent history, have the stated UTC date and a matching canonical commit source. Latest/meaningful months agree with nonempty buckets when inside the window, with no counts later than the latest commit month. Preserve meaningful dates/SHAs unless new source review justifies a change; never automatically promote the newest cosmetic commit.

**Non-GitHub monthly history:** `kind: repository` requires the canonical HTTPS URL matching the Code source, host-scoped repository ID, actual branch, pinned head, twelve counts, latest and meaningful date/SHA, `lastMeaningfulCommitSource` and its own `capturedAt`. The source ID resolves to the reviewed canonical commit. Its capture lies within the snapshot month, no later than the review date and no earlier than the latest commit. A new month window requires recapture; do not relabel old buckets or borrow a mirror's activity. One record's later capture must not imply all records were refreshed.

**Point evidence:** `kind: public-update` requires `lastPublicUpdateAt`, `lastPublicUpdateSource` and `lastPublicUpdateType` (`paper`, `release`, `public-update`). It means this activity view lacks reviewed monthly repository history, not that no public repository or code exists. Activate only the source-backed event's calendar month inside the window, without synthetic commits, repository or SHA. An out-of-window event produces twelve inactive cells without changing its date or freshness rule.

The same twelve-cell presentation does not flatten provenance. Repository cells retain real counts; point cells describe paper publication/release/public update and inactive cells say no reviewed public activity signal, never zero commits. Exact month/year and provenance remain in hover/accessibility metadata. Inactive months do not prove development stopped. Counts never change visible strength; cells have one binary appearance and always run oldest-left to newest-right. [The visual system](../VISUAL_SYSTEM.md) owns their dimensions.

## Maintenance and verification

Manual `npm run refresh:analog-activity` / `npm run refresh:digital-activity` commands refresh GitHub history, preserve reviewed meaningful activity and manual non-GitHub records, validate the full candidate snapshot, then replace the destination atomically. A network, identity, history or validation failure leaves checked-in data intact. They are not build/check/browser dependencies; normal builds need no repository-host access.

Use the [catalog-refresh skill](../../.agents/skills/ams-signals-catalog-refresh/SKILL.md) for an actual refresh, including month rollover and canonical-host recapture. Current records, source notes and the domain validator are the starting point, not old expansion inventories or watch lists.

[Testing](../TESTING.md) owns check selection. Preserve source URLs except explicitly reviewed updates, functional metadata, unaffected activity, Golden data, Article bodies and export semantics. For presentation changes inspect representative first/middle/last, multi-stage and multi-link rows at the visual-system viewports, including dark mode, keyboard, no-JavaScript and forced colors. No hardcoded mutable project counts or weakened domain/factual guards.
