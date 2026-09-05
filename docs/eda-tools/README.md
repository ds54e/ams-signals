# Digital / RTL

The independent `/eda-tools/` catalog helps readers quickly identify RTL/digital tools and agents, their scope and recent public activity. It covers compilers, simulators, verification, formal, debug and implementation flows. Internal `eda-tools` paths remain, while domain chooses the public page; `/analog-ai/` is the Analog / AMS companion.

Read [IMPLEMENTATION_SPEC.md](IMPLEMENTATION_SPEC.md) for the data/UI contract and [IMPLEMENTATION_NOTES.md](IMPLEMENTATION_NOTES.md) for source review, classification decisions, exclusions and validation.

## Page direction

English only. Start with a compact five-axis matrix, followed by dense project rows: identity and one description, keywords, public activity, and type/primary links. Use navigation label `Digital`, browser title `Digital / RTL · AMS Signals`, and visually hidden H1 `Digital / RTL`. Primary navigation is `Timeline | Events | Articles | Analog | Digital`. The only legend is `● core · ◐ supporting`.

No visible page/section headings, introduction, counts, review dates, methodology, search, filtering, tabs, disclosures, bibliography or scores. Research notes stay in authored Markdown and these internal documents. Scope marks describe reviewed scope, not quality, completeness, production readiness, performance or a progression ladder. A blank does not establish inability.

## Product boundary

This is a separately authored Digital project collection, independent of the Analog collection and of Golden Timeline / Events / Companies / People / Articles. It does not feed `/export.json`, factual records, viewer state or Article bodies. Keep the existing static Astro, plain CSS and native-link architecture. No runtime APIs, database, framework or shared technology taxonomy.

## Active-project curation

The catalog represents currently active projects. Remove projects with no verifiable meaningful public activity for more than twelve months; do not retain entries to preserve a count. This rolling rule does not diminish historical technical value.

The first review is **2026-09-05**, with an inclusive **2025-09-05** cutoff. For GitHub repositories, review substantive implementation, correctness, verification infrastructure, technical maintenance or result maintenance on the canonical default branch. Bot dependency churn, cosmetic documentation and formatting alone do not renew eligibility. The mechanical latest commit date is distinct from the manually reviewed meaningful date. Non-GitHub projects require a source-backed public update.

## Roles and AI relation

Public types use one or two authored roles: Agent, Benchmark, EDA Tool, Dataset & Environment, joined with ` + `. Primary category remains internal and must be core in the matrix. The six reviewed agents are Dr. RTL, VerifyRTL, HAVEN, UCAgent, Spec2Cov and CoreSmith; other current Digital entries are EDA Tool. Do not infer extra roles.

Retain exactly one of three **internal** AI relations:

- **AI-built**: coding agents are a material and distinctive part of building the EDA tool. Explicit author descriptions or sustained co-authorship of core implementation support this; an isolated documentation/dependency contribution does not.
- **AI-enabled**: AI, LLMs or agents participate in runtime functionality or the intended EDA workflow, including implemented MCP interfaces, verification agents, optimization and debug.
- **Traditional**: tracked primarily as an ordinary EDA implementation. Incidental coding assistance does not change this classification.

Only AI-built is rendered publicly, appended to the role text as ` · AI-built`. AI-enabled and Traditional remain internal; neither is a visible label or badge. These are curated relations, not a ranking. When a project satisfies both built and enabled, use the directly supported distinctive build relation once and document the runtime relationship internally. Do not add extra public categories. The initial source review considered 35 candidates. The domain pass moves Ngspice + OpenVAF Enhancements to Analog, leaving 33 Digital projects; no other membership changes. The watch list is not an automatic expansion queue.
