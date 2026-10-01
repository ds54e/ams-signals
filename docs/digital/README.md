# Digital catalog

The catalog at `/digital/` covers RTL and digital-design projects. Its hidden H1 is `Digital` and browser title `Digital · AMS Signals`. [Shared catalog rules](../catalog/CONTRACT.md) own curation, evidence, activity, search and index behavior; [the agent guide](../../src/lib/digital/AGENTS.md) is the task entry point. This document owns only Digital-specific scope and schema distinctions.

## Scope

Stages appear in this order:

| Field | Label | Meaningful user-facing coverage |
| --- | --- | --- |
| `design` | Design | RTL generation/editing/repair and user-facing design representation or IR transformations |
| `synthesis` | Synthesis | Logic synthesis, technology mapping, synthesis-driven optimization and actual synthesis/PPA loops |
| `verification` | Verification | RTL/gate simulation, testbenches, formal/model/equivalence checking, coverage, debug and waveform inspection |
| `layout` | Layout | Floorplanning, placement, CTS, routing, backend timing/closure and implementation flows |

A simulator's internal parser or read-only debug database does not establish Design. Assess reusable frontend/design APIs separately from synthesis-oriented lowering. Testbench/assertion generation is Verification, not DUT Design. Synthesis timing alone is not Layout; clock-tree synthesis is Layout rather than logic Synthesis.

A stage's AI boolean identifies material model-driven generation, decisions/search, prediction, interpretation, diagnosis or control in that stage. A released model-hosted agent skill qualifies when it specifies substantive stage decisions and connects them to implemented operations; a generic MCP/CLI/API, agent-readable instructions or a model client alone does not. Optional implemented paths count, with their setup and limits stated in the description and notes.

For a released benchmark explicitly evaluating AI methods, the AI prefix also identifies the stage performed by the evaluated model. The public description must identify the benchmark role; the tag does not claim that its grader contains AI. Require a concrete stage-specific task contract or evaluation method, not merely a dataset usable by AI, generated corpus, planned model integration or incidental use in another project's benchmark.

RTL repair using timing feedback can be AI Design while fixed synthesis and equivalence checking stay conventional. Model-generated testbenches/assertions, coverage decisions and failure diagnosis can be AI Verification. Backend agents adapting synthesis/layout scripts can justify AI in those stages; conventional synthesis, simulation or layout after model-generated RTL alone does not. Software-development provenance follows the separate [shared policy](../AI_DEVELOPMENT.md) and cannot supply a stage prefix.

## Active-list eligibility

In addition to the shared meaningful-activity freshness requirement, a Digital entry needs at least one reviewed public activity signal in the twelve displayed calendar months. A confirmed all-zero band is removed through explicit curation, including its matching snapshot record; zero in only the current month is not a removal criterion. Missing records, failed captures and unknown activity are errors to investigate, never zero signals. The validator rejects an all-zero active entry instead of silently filtering it or inventing activity. The generic band renderer still represents out-of-window point evidence accurately without clamping it into the window.

## Data and implementation map

`src/content/digital/` is the Digital collection; `src/lib/digital/` owns its schema, catalog and activity logic; `src/pages/digital/` prepares the page; `src/data/digital-activity.json` owns volatile captures. Presentation remains shared with Analog.

The strict Digital schema includes `name`, optional `aliases`, one English single-paragraph `description` (600 characters), required `scope`, optional `developmentEvidence`, `access`, valid `addedAt`/`reviewedAt` and `sources`. Review cannot precede addition. Do not import Analog's internal `summary`, `targets` or `notice` fields. Project Markdown notes retain implementation, classification, source and limitation reasoning; frontmatter alone is not the whole decision record.

Digital GitHub records require numeric `repositoryId` and `lastMeaningfulCommitSha`, as well as canonical repository, actual branch, pinned head, twelve counts, latest and meaningful UTC dates and a matching primary commit source. Do not relax them to Analog's optional existing-record fields. Non-GitHub `repository` records retain the shared mandatory host-scoped identity, capture and meaningful-source fields. Point records carry reviewed dated evidence without fabricated history.

The [schema](../../src/lib/digital/schema.ts) and validator own exact acceptance rules. A documentation cleanup must not alter them. `npm run validate:digital` and `npm run test:digital` participate in the root deterministic gate; `npm run refresh:digital-activity` is manual and networked, never part of a build. Use [Testing](../TESTING.md) and the [refresh skill](../../.agents/skills/ams-signals-catalog-refresh/SKILL.md) only for the relevant work.
