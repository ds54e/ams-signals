# Digital catalog

The catalog at `/digital/` covers RTL and digital-design projects. Its hidden H1 is `Digital` and browser title `Digital · AMS Signals`. [Shared catalog rules](../catalog/CONTRACT.md) own curation, evidence, activity, search and index behavior; [the agent guide](../../src/lib/digital/AGENTS.md) is the task entry point. This document owns only Digital-specific scope and schema distinctions.

## Scope

VHDL-only projects are outside this catalog. VHDL-first tools whose Verilog support remains experimental are also excluded. Mixed-language frameworks remain eligible when they provide an implemented, supported Verilog/SystemVerilog workflow; a VHDL frontend's downstream netlist export or foreign interface alone does not establish that workflow.

Stages appear in this order:

| Field | Label | Meaningful user-facing coverage |
| --- | --- | --- |
| `design` | Design | RTL generation/editing/repair and user-facing design representation or IR transformations |
| `synthesis` | Synthesis | Logic synthesis, technology mapping, synthesis-driven optimization and actual synthesis/PPA loops |
| `verification` | Verification | RTL/gate simulation, testbenches, formal/model/equivalence checking, coverage, debug and waveform inspection |
| `layout` | Layout | Floorplanning, placement, CTS, routing, physical geometry/connectivity inspection, backend timing/closure and implementation flows |

A simulator's internal parser or read-only debug database does not establish Design. Assess reusable frontend/design APIs separately from synthesis-oriented lowering. Testbench/assertion generation and software register test layers are Verification, not DUT Design. An implemented virtual-target or HDL co-simulation workflow is Verification; physical DUT access and bench acquisition are not. Synthesis timing alone is not Layout; clock-tree synthesis and backend static-timing analysis are Layout rather than logic Synthesis.

Read-only SDC lint, constraint reference resolution and consistency diagnostics are Verification when they do not compute timing or analyze a physical design. A tool does not gain Layout solely because its output is consumed before STA. Inspection of implemented geometry, hierarchy, routed shapes and physical connectivity in GDS or DEF is Layout even when it does not place cells or calculate timing; distinguish that operation from constraint-only diagnostics.

Use the [shared stage and AI classification rules](../catalog/CONTRACT.md#scope-and-ai-classification) with these domain-specific distinctions:

RTL repair using timing feedback can make Design AI-backed while fixed synthesis and equivalence checking stay conventional. Model-generated testbenches/assertions, coverage decisions and failure diagnosis can make Verification AI-backed. Backend agents adapting synthesis/layout scripts can justify AI in those stages; conventional synthesis, simulation or layout after model-generated RTL alone does not. Software-development provenance follows the separate [shared policy](../AI_DEVELOPMENT.md) and cannot set a stage's AI boolean.

## Active-list eligibility

Apply the shared [selection and retention criteria](../catalog/CONTRACT.md#project-selection-and-retention), including [freshness and active-list eligibility](../catalog/CONTRACT.md#freshness-and-active-list-eligibility), to new and existing entries.

## Data and implementation map

`src/content/digital/` is the Digital collection; `src/lib/digital/` owns its schema, catalog and activity logic; `src/pages/digital/` prepares the page; `src/data/digital-activity.json` owns volatile captures. Presentation is shared with Analog and Lab.

Digital uses one English single-paragraph public `description`; review cannot precede addition. Do not import Analog's internal `summary`, `targets` or `notice` fields. Project Markdown notes retain implementation, classification, source and limitation reasoning; frontmatter alone is not the whole decision record.

Digital GitHub records require numeric `repositoryId` and `lastMeaningfulCommitSha`, as well as canonical repository, actual branch, pinned head, twelve counts, latest and meaningful UTC dates and a matching primary commit source. Keep these required fields distinct from Analog's optional-field schema. Non-GitHub `repository` records retain the shared mandatory host-scoped identity, capture and meaningful-source fields. Point records carry reviewed dated evidence without fabricated history.

The [schema](../../src/lib/digital/schema.ts) and validator own the complete field set, limits and exact acceptance rules. `npm run validate:digital` and `npm run test:digital` participate in the root deterministic gate; `npm run refresh:digital-activity` is manual and networked, never part of a build. Use [Testing](../TESTING.md) and the [refresh skill](../../.agents/skills/ams-signals-catalog-refresh/SKILL.md) only for the relevant work.
