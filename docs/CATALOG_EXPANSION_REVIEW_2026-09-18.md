# Catalog expansion and Golden-event refresh — 2026-09-18

This bounded pass updates only Events, Analog and Digital. Articles are intentionally unchanged. The search started from the current public corpus but also looked outside prior conversation topics for new standards, mixed-signal verification signals, analog-design projects and digital design/verification tools.

## Golden Events added

| Event | Decision | Why it survives bounded-growth review |
| --- | --- | --- |
| SV-MSI at DVCon Japan 2026 | Add | Extends the 2024 working-group-formation record with a concrete public standards direction linking mixed-net interoperability to SystemVerilog-2028, SystemVerilog-AMS and UVM-MS. |
| Marvell TX DAC CAL bit-match flow | Add | A new company-authored mixed-signal verification signal explicitly connecting RTL/design specifications, cycle-true C and TX DAC calibration. The Event preserves the official-program modality and does not invent unpublished results. |

General agentic-EDA announcements remain outside Golden Events unless they materially add to the RNM/AMS or mixed-signal-verification timeline.

## Analog projects added

| Project | Scope | Distinctive role |
| --- | --- | --- |
| AnalogAgent | AI Design + Simulation | Multi-agent design/refinement loop with self-evolving memory and ngspice/PySpice execution. |
| AnalogMaster | AI Design + Layout | Circuit-image-to-design research flow with public dataset, SKY130 collateral, placement and A* routing assets. |
| ViraStack AI Super Agent | AI Design + AI Simulation + AI Layout | Commercial Virtuoso-oriented agent with concrete 2026 ADE-debug, testbench and layout-exploration demonstrations. |

## Digital projects added

| Project | Scope | Distinctive role |
| --- | --- | --- |
| naja-scope | Verification | Token-bounded MCP structural queries over elaborated RTL or gate-level SystemVerilog designs. |
| Kepler-Formal | Verification | Open LEC/SEC across gate, RTL, SystemVerilog and Naja interchange inputs. |
| LACE | AI Design + Verification | Natural-language RISC-V instruction extensions with source-localized RTL edits and formal-tool feedback. |
| Duck RTL | AI Design + Verification | Agent-oriented Verilog construction loop surrounded by deterministic compile, co-simulation and FSM guardrails. |

## Deferred candidates

Predictive/open PDK projects such as GT2N, GT3 and PKP3 are not added in this pass. Adding PDKs as first-class catalog rows would broaden the catalog domain and should be an explicit product decision rather than an incidental expansion.

Analog Process Models is likewise not self-added merely because it is active; self-inclusion should use the same independent curation standard as third-party projects. The newer IHP SG13CMOS5L AMS template is retained as a follow-up to the existing SG13G2 template rather than immediately creating a near-duplicate row.

Paper-only or narrower Digital candidates, including HINT, SynAct and HLSFactory-Agent, remain watch-list material for later bounded review.

## Activity refresh

The initial change supplies schema-valid reviewed activity records for every new project and advances the snapshot boundary to September 18. A temporary branch-only workflow then runs the repository's existing Analog and Digital refresh scripts against canonical public repositories so first-parent monthly activity, default branches and head SHAs are mechanically recaptured. That temporary workflow is removed before the pull request is finalized.

## Validation

The final pull request is expected to pass the normal deterministic checks and Chromium production-preview smoke suite in GitHub Actions before merge. No Pages deployment is performed as part of this update.
