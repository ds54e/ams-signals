# Agent guidance review — 2026-09-26

This is a migration receipt, not another instruction source or required pre-read. The baseline is the working-tree root `AGENTS.md`, including the owner's uncommitted live-analytics addition, rather than the shorter version in HEAD. Product policy and repository behavior are unchanged.

## Basis and repository findings

Official guidance consulted on 2026-09-26:

- [Rethinking skills and prompts for GPT-6 Astra](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra): short descriptions, conditional document access and fewer procedural recipes.
- [Codex AGENTS.md documentation](https://learn.chatgpt.com/docs/agent-configuration/agents-md): root-to-working-directory instruction discovery and nested scope.
- [Codex Skills documentation](https://learn.chatgpt.com/docs/build-skills): progressive disclosure, narrow implicit triggers and repository discovery under `.agents/skills`.

The read-only inventory covered tracked directories, current guidance and product context, catalog policies/contracts/maintenance notes, content loaders, schemas, validators, fact lint, duplicate checks, package commands, CI/Pages workflows and release documentation. No existing repository Skill or nested AGENTS file was present. No Markdown lint command/configuration is configured.

`src/data/` is the common parent of Events, Companies and People, but also contains catalog snapshots. Its guidance therefore explicitly limits Golden rules to the factual corpus. Catalog code/content/pages/tests/docs are separate sibling trees, with shared presentation components. Each domain's `src/lib/` directory is a safe nested location; root routing covers the other associated paths and shared code.

Putting AGENTS files in `src/content/analog/`, `digital/` or `articles/` would make Astro's Markdown globs treat them as content. Both catalog validators also enumerate Markdown files. Avoiding those directories preserves the loaders and schemas without adding exclusions just for guidance. Root routing also avoids relying on automatic discovery of descendant instructions when Codex starts at the root.

## Classification and ownership

Classes: **1** always-applicable durable invariant; **2** task routing/reference; **3** subtree instruction; **4** reusable workflow suitable for a Skill; **5** mechanically enforced detail; **6** redundant, obsolete or over-prescriptive wording. Mixed rows separate a semantic policy from its mechanical representation. Paths identify the authoritative owner or the route to an existing owner, not new copies of the policy.

| Old root rule/group | Class | Owner after migration / disposition |
| --- | --- | --- |
| Start here: read Product Context before research/design | 2 | Root task router → `PROJECT_CONTEXT.md`, relevant sections only |
| Temporary company briefs cannot override durable guidance | 2 | Root task router; missing historical brief names are no longer prescribed |
| Analog README and every linked document pre-read | 2, 3, 6 | `src/lib/analog/AGENTS.md` → relevant catalog policy/contract/notes |
| Analog bounded catalog independence; no Golden inclusion/taglessness leakage | 1, 3 | Root separation boundary; domain semantics in `docs/analog/README.md` |
| Digital domain, stage presence, runtime AI and absence of strength levels | 3 | `docs/digital/IMPLEMENTATION_SPEC.md`, via Digital nested router |
| Digital date/twelve ticks/Scope rail and name-plus-links title | 3 | `docs/digital/IMPLEMENTATION_SPEC.md`; removed from root |
| No roles/project-wide runtime enum; structured Scope and evidence | 3, 5 | Domain contracts and `src/lib/analog/schema.ts`, `src/lib/digital/schema.ts` |
| Catalogs do not change Golden, viewer state, Articles or export | 1 | Root repository boundary; detailed catalog contracts remain authoritative |
| AI-ASSISTED versus AI-BUILT contribution significance; strong direct evidence, ambiguous evidence unlabeled | 2, 3 | `docs/AI_BUILT_REVIEW.md#shared-policy`, routed from both domains |
| Development provenance independent of runtime AI; no scores/tiers/percentages/human-only labels | 3 | Shared provenance policy; no definitions copied into new guidance |
| Single optional enum, paired evidence, source IDs, review date, rejected legacy field | 5 | Domain schemas and shared provenance policy's data contract |
| Inline provenance explanation and primary sources | 3, 5 | Domain implementation contracts, `src/components/CatalogIndex.astro`, smoke contracts |
| Purpose: factual RNM/AMS timeline; Golden asset, website viewer | 1 | Compressed root repository boundary |
| Not an evidence archive, company-rating database or taxonomy project | 2, 3 | `PROJECT_CONTEXT.md` factual-layer, taxonomy and lightweight-source policies; Golden router |
| Repeated standalone-catalog contract/separation paragraphs | 6 | Removed duplicates from root; catalog routes plus root boundary suffice |
| Core rule: inferential research, only directly supportable Golden facts | 2, 3 | `PROJECT_CONTEXT.md` research/factual-layer policies, routed from Golden guidance |
| Aggressive hypotheses, follow people/organizations, seek gaps and contrary evidence | 2, 6 | Existing Product Context research policy; removed repeated recipe |
| Research loop 1: existing Golden timeline first | 3 | `src/data/AGENTS.md` research entry; rationale remains in Product Context |
| Research loop 2–5: questions, hypotheses, public search, narrowing evidence | 4, 6 | Workflow candidate evaluated; ordinary research reasoning already covered by Product Context, so no redundant research Skill |
| Research loop 6–9: cluster reposts, only new milestones, strengthen existing Event, discard unhelpful material | 3, 6 | Compact milestone/duplicate judgment in `src/data/AGENTS.md`; bounded-growth rationale in Product Context |
| Research loop 10: stop at responsible reassessment, not web exhaustion | 3 | `src/data/AGENTS.md` stopping condition |
| Research loop applies to Golden, not catalogs; seed is historical and cannot justify Golden records | 3 | Golden scope limitation; Analog router → existing `docs/analog/RESEARCH_SEED.md` |
| Event answers when/who/observable occurrence/source | 3 | One sentence in `src/data/AGENTS.md` |
| No technology tags, maturity/confidence/disclosure scores, strategic or organization-wide inferences | 3, 5 | Product Context factual/taxonomy policy via Golden router; strict schema rejects extra fields, but prose meaning still needs review |
| Coarse technical/organizational `kind`; independent optional affiliation metadata | 2, 5 | Product Context's signal-type semantics; enum/shape in `src/content.config.ts` and validator |
| Preserve job/paper/patent modality; posting does not prove practice | 3 | `src/data/AGENTS.md`; kept despite partial fact-lint coverage |
| Lists of preferred/forbidden Apple sentence templates | 6 | Compressed to three modality verbs; lint patterns remain in `tools/fact-lint.mjs` |
| Repeated statement that inference is not Golden content | 6 | Existing factual-layer policy, reached through Golden router |
| One milestone may have representative sources; 1–3 sources | 5 | `src/content.config.ts` and `tools/validate.mjs` enforce cardinality |
| No Event per repost/location/repeated hiring; merge same time-bound fact; each new Event adds information | 3 | `src/data/AGENTS.md` editorial duplicate judgment |
| No persisted scratch collections/pages/exhaustive logs/speculative notes | 3 | `src/data/AGENTS.md` research retention boundary |
| People only for meaningful technical activity/movement; no employee directory | 2, 3 | Product Context People policy, explicitly routed from Golden guidance |
| Sharing a job does not make someone an Event participant | 3 | `src/data/AGENTS.md` |
| Articles may interpret sources beyond Golden; interpretation is not promoted to facts | 2 | Root Article route → Product Context factual/editorial policy |
| Evidence modalities support different claims | 3 | Golden modality rule; Article research uses Product Context interpretation policy |
| No methodology transfer inferred from jobs/acquisitions/standards alone | 3 | `src/data/AGENTS.md` |
| Preserve author prose; no unsolicited rewriting/translation/fact correction | 1, 2 | Short root author-authorization boundary; full transformation policy remains in Product Context |
| Five-command pre-commit list and repeated failure instructions | 5, 6 | Root canonical `npm run check`; `package.json` and CI own the sequence |
| Duplicate warnings require merge/cluster judgment | 3 | `src/data/AGENTS.md`; checker warns but cannot decide milestone identity |
| Browser checks for viewer/navigation/release | 2 | Root conditional verification; CI contract review owns assertion/file mapping |
| Catalog validation may be added; do not weaken Golden checks | 5, 1 | Catalog checks already included in `npm run check`; no-weakening boundary stays in root |
| Astro/JSON/Markdown/CSS/vanilla JS, no unnecessary backend or infrastructure | 1 | Compressed root technology boundary |
| Single generated factual export, no permanent Golden taxonomy | 2 | Product Context export/taxonomy policies, via Golden route |
| No AI/bot/automation commit authors, coauthors or trailers; owner web-merge committer exception | 1 | Root Git section, compressed without losing the exception |
| Exact owner identity, unless directed otherwise; configure before authorized commit | 1 | Root Git section |
| Tags/Releases need explicit request | 1 | Root Git section |
| Temporary work branches, automatic merged-head deletion, no branch archives | 1 | Root Git section |
| Specific owner authorization for force-push/main rewrite | 1 | Root Git section |
| Live traffic/readership/referrals/search/SEO/discoverability/growth | 4 | `.agents/skills/ams-signals-analytics/SKILL.md` |
| Credential source and five environment variable names | 4 | Analytics Skill access/provider sections; values never read during this migration |
| Cloudflare API/GraphQL dataset, current docs, production host filter and development exception | 4 | Analytics Skill Cloudflare section |
| Search Console API, read-only scope, query/page/click/impression/CTR/position metrics | 4 | Analytics Skill Search Console section |
| Fresh data, exact dates, preceding equal-length trend period | 4 | Analytics Skill interpretation section |
| Distinguish traffic/search metrics; no invented referrers | 4 | Analytics Skill interpretation section |
| No credential disclosure/copy/commit; no provider configuration changes | 4 | Analytics Skill access boundary |
| Temporary curl/Python/jq allowed; no permanent analytics scripts | 4 | Instruction-only Analytics Skill |

## Related cleanup and deliberate exceptions

Catalog README pre-reading lists became conditional references. Their delivery paragraphs and the implementation contracts now route verification/Git to root and publication to `RELEASING.md`. The contracts' direct-main-push instruction conflicted with temporary work branches and was removed. Repeated catalog unit commands after `npm run check` were also removed. Maintenance notes now reference canonical verification instead of prescribing another command list. The public README's Golden-guidance link was repaired.

Only three nested files were added. There is no broad `src/AGENTS.md`, Article AGENTS file inside a loaded collection, duplicated shared-catalog rulebook or new schema exception. Catalog nested files are deliberately small routers because their source-of-truth documents already exist. The root keeps the short Article-prose authorization boundary because automation outside the Article directory can transform content. The Golden guide retains modality and duplicate judgment because schemas and pattern lint cannot establish what a source supports.

Existing source-of-truth documents still contain overlapping product explanations (notably catalog READMEs/specifications and Product Context). They were not broadly rewritten to achieve textual uniqueness; the new agent layer references them rather than making more copies. Dated implementation/research receipts are history, not additional task prerequisites. Product Context's historical v1 direction was left intact; it is not a deployment instruction, and publication routes to the current release document. Neither current product semantics nor historical author text was reinterpreted.

Analytics is the only new Skill. Its description is 163 characters and restricts implicit use to site analytics questions, explicitly excluding tracking/SEO implementation. Traffic/referrer/page questions and search/growth questions are positive trigger cases; beacon insertion, metadata editing, catalog AI provenance and this guidance audit are negative cases. Provider details load with the Skill, with official docs consulted only when necessary; no scripts, installation metadata or additional references are needed for this short workflow. These trigger cases were reviewed manually, not measured through a model evaluation.

## Size and validation

Counts include newlines, using Unicode characters rather than UTF-8 bytes:

| Root AGENTS.md | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| Lines | 196 | 30 | 166 (84.7%) |
| Characters | 11,567 | 3,085 | 8,482 (73.3%) |

The detailed migration matrix is outside the default instruction chain. Root no longer contains live analytics operations or catalog field/presentation specifications.

Verification covers whitespace, Markdown parsing, local links/anchors, Skill frontmatter/naming, guidance ownership/consistency, and unchanged application/content/CI inputs. The repository has no dedicated Markdown lint task; its `check:internal-links` reads built HTML in `dist/`, not these guidance files. Full `npm run check`, build and browser smoke are therefore unnecessary for this change. CI configuration and its existing required checks are unchanged.

Results: all 13 changed/new Markdown files parsed using the installed Sätteri parser; all 93 local links/anchors resolved. The skill-creator `quick_validate.py` passed, using PyYAML installed only in a temporary directory because it was absent from the system interpreter. `git diff --check` passed. A SHA-256 comparison with the initial tracked-file inventory confirmed that all application code, authored content, Golden/catalog JSON, configuration, lockfile, tests and workflows remain byte-identical. New guidance files are outside loaded content globs. Manual ownership review found no competing rule definitions in the new agent layer; the pre-existing explanatory overlap and intentional short safety reminders are documented above. No credentials were loaded and no analytics requests were made.
