# Analog catalog

The catalog at `/analog/` covers analog, RF and AMS projects. Its hidden H1 is `Analog` and browser title `Analog · AMS Signals`. [Shared catalog rules](../catalog/CONTRACT.md) own curation, evidence, activity, search and index behavior; [the agent guide](../../src/lib/analog/AGENTS.md) is the task entry point. This document owns only Analog-specific scope and schema distinctions.

## Scope

Stages appear in this order:

| Field | Label | Meaningful user-facing coverage |
| --- | --- | --- |
| `design` | Design | Circuit understanding, topology selection/generation, schematic/netlist editing, sizing, tuning, optimization and design-space exploration |
| `simulation` | Simulation | SPICE/Verilog-A/behavioral execution, electrical evaluation/measurement, simulator feedback and relevant learned performance estimation |
| `layout` | Layout | Layout generation/editing, placement/routing, physical implementation and associated DRC/LVS/PEX or orchestration |

Optimization is Design. Classify tool integration by its exposed operations, not a separate stage. Schematic drawing is Design rather than IC layout. A simulator, or a compiler delivering executable device models, materially serves Simulation. Hierarchy annotation used only to produce layout belongs to that Layout process, not an independent Design capability.

A stage's AI boolean identifies material model-driven generation, decisions/search, prediction, interpretation, diagnosis or control in that stage. A released model-hosted agent skill qualifies when it specifies substantive stage decisions and connects them to implemented operations; a generic MCP/CLI/API, agent-readable instructions or a model client alone does not. Optional implemented paths count, with their setup and limits stated in the description and notes.

For a released benchmark explicitly evaluating AI methods, the AI prefix also identifies the stage performed by the evaluated model. The public description must identify the benchmark role; the tag does not claim that its grader contains AI. Require a concrete stage-specific task contract or evaluation method, not merely a dataset usable by AI, generated corpus, planned model integration or incidental use in another project's benchmark.

Conventional simulation after AI-generated circuit inputs alone is not AI Simulation. Sizing feedback and surrogate reward/candidate ranking are AI Design unless a distinct model-driven electrical-performance estimation, analysis/testbench planning, measurement interpretation or simulator diagnosis operation is provided. For example, a circuit-editing benchmark with fixed ngspice graders has AI Design and ordinary Simulation; separately evaluated AI-authored stimulus and analysis setup can support AI Simulation. Physical placement/routing constraints and corrections selected by a model are AI Layout even when conventional kernels emit geometry; schematic symbol placement remains Design. Software-development provenance follows the separate [shared policy](../AI_DEVELOPMENT.md) and cannot supply a stage prefix.

## Active-list eligibility

In addition to the shared meaningful-activity freshness requirement, an Analog entry needs at least one reviewed public activity signal in the twelve displayed calendar months. A confirmed all-zero band is removed through explicit curation, including its matching snapshot record; zero in only the current month is not a removal criterion. Missing records, failed captures and unknown activity are errors to investigate, never zero signals. The validator rejects an all-zero active entry instead of silently filtering it or inventing activity. The generic band renderer still represents out-of-window point evidence accurately without clamping it into the window.

## Data and implementation map

`src/content/analog/` is the Analog collection; `src/lib/analog/` owns its schema, catalog and activity logic; `src/pages/analog/` prepares the page; `src/data/analog-activity.json` owns volatile captures. Presentation remains shared with Digital.

The strict Analog schema includes `name`, optional `aliases`, internal `summary` (240 characters), public `description` (600 characters), required `scope`, optional `developmentEvidence`, optional `targets`/`notice`, `access`, valid `addedAt`/`reviewedAt` and `sources`. Existing bounded catalog-update records stay internal. Project Markdown notes retain implementation, classification, source and limitation reasoning; frontmatter alone is not the whole decision record.

Analog GitHub activity permits existing records without `repositoryId` or `lastMeaningfulCommitSha`; all new reviewed GitHub baselines include both. When supplied, identity, SHA, source and UTC-date agreement are enforced. `lastMeaningfulCommitAt` remains required. Do not silently impose Digital's required-field shape on older Analog data or remove stronger evidence from new records. Non-GitHub `repository` records retain the shared mandatory canonical identity, capture and meaningful-source fields.

The [schema](../../src/lib/analog/schema.ts) and validator own exact acceptance rules. A documentation cleanup must not alter them. `npm run validate:analog` and `npm run test:analog` participate in the root deterministic gate; `npm run refresh:analog-activity` is manual and networked, never part of a build. Use [Testing](../TESTING.md) and the [refresh skill](../../.agents/skills/ams-signals-catalog-refresh/SKILL.md) only for the relevant work.
