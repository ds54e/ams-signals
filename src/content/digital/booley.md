---
name: Booley
description: RTL workspace combining sandboxed coding agents, waveform queries and independent reviews with simulation, lint, synthesis and Vivado FPGA implementation. Its metric-driven workflow measures commits against configured area, timing, coverage and mutation bounds, while deterministic tool recipes preserve results for engineers and agents to inspect.
scope:
  design:
    ai: true
  synthesis:
    ai: false
  verification:
    ai: true
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited for updating executable Simulation Record validators and adding an SDC-handoff regression. These changes remain in the canonical project after the older Goal Mode and its previously cited mutation-scope test were removed."
  sources: ["activity-review-20261124", "development-retained-20261124", "development-validator-20261124"]
  reviewedAt: '2026-11-24'
access: Public Python/Rust tooling; Docker, editor, EDA stack and agent CLI are needed for the integrated workflow, with licensed Vivado for FPGA implementation.
addedAt: '2026-10-18'
reviewedAt: "2026-11-25"
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/boldaxolotl/booley
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/boldaxolotl/booley/blob/a8886529f23488fef98fc92524b67aa7d983c4c7/README.md
- id: activity
  title: 'Merge pull request #1651 from boldaxolotl/codex/issue-1561-finish'
  url: https://github.com/boldaxolotl/booley/commit/c28daf4fc6f74fdee44592284aa2b410ff6752b8
- id: implementation-1
  title: 'Released implementation: crates/bwave/src/lib.rs'
  url: https://github.com/boldaxolotl/booley/blob/9f5bc119d195d46845fe6671734f1f371c60c6ed/crates/bwave/src/lib.rs
- id: implementation-2
  title: Current Target and Flow metric-bound configuration
  url: https://github.com/boldaxolotl/booley/blob/a8886529f23488fef98fc92524b67aa7d983c4c7/src/booley/measurement/metrics_file.py
- id: fpga-implementation
  title: Vivado FPGA implementation flow and report handling
  url: https://github.com/boldaxolotl/booley/blob/a8886529f23488fef98fc92524b67aa7d983c4c7/src/booley/flows/fpga/flow.py
- id: activity-review-20261124
  title: Claude-credited Simulation Record validator and SDC-handoff corrections
  url: https://github.com/boldaxolotl/booley/commit/419b490cc57eb875ac7490730cbda925c4998b41
- id: development-retained-20261124
  title: Retained executable SDC-handoff regression
  url: https://github.com/boldaxolotl/booley/blob/a8886529f23488fef98fc92524b67aa7d983c4c7/tests/qa/test_missions.py
- id: development-validator-20261124
  title: Retained Simulation Record schema and artifact validation
  url: https://github.com/boldaxolotl/booley/blob/a8886529f23488fef98fc92524b67aa7d983c4c7/qa/missions/taxi/fixtures/simulation-record/validate_parallel.py
- id: website
  title: Official project website and documentation
  url: https://booley.dev/
  purpose: official
- id: refused-admission
  title: "November 19 refused-flow outcome and admission diagnostic correction"
  url: "https://github.com/boldaxolotl/booley/commit/dd7167c56dba6af6c41653d0169dc98053c88321"
- id: refused-admission-retained
  title: "Retained endpoint memory-warning handling"
  url: "https://github.com/boldaxolotl/booley/blob/dd7167c56dba6af6c41653d0169dc98053c88321/src/booley/flows/endpoint_session.py"
---

### Implementation and boundaries

The sandboxed developer agent authors RTL and investigates test/waveform evidence, supporting AI Design and AI Verification. Fixed synthesis measurements are ordinary Synthesis; changing RTL to meet an area bound does not itself establish AI synthesis-script optimization. The Edalize/Vivado flow provides conventional Layout through actual implementation runs and report/bitstream handling. [Physical flow](#source-fpga-implementation) · [Project workflow](#source-readme) · [Waveform implementation](#source-implementation-1).

Current configuration uses `metrics.toml` tables keyed by Target and Flow, with explicit bounds and tracked metrics. This replaces the retired Goal Mode in the older article. Input specifications, supported tools and metric selection remain project requirements; a measured result is not tapeout qualification. [Current metric contract](#source-implementation-2).

### Reviewed activity

Earlier Goal Mode maintenance is historical. The November 18 integration corrects executable validators for current Simulation Record schemas, identifiers and artifacts and tests that the setup prompt supplies the exact SDC fixture. The change is integrated in both the stored activity-capture head and the current reviewed head; monthly counts remain a separately captured signal. [Earlier checkpoint](#source-activity) · [Current implementation change](#source-activity-review-20261124).

### Development provenance

The previously cited mutation-scope test was removed with Goal Mode, so it no longer supports a retained-code claim. The November 18 validator and SDC regression changes explicitly credit Claude Opus 5.5 and remain in the current code, supporting AI-ASSISTED for that bounded contribution. [Attributed change](#source-activity-review-20261124) · [Retained regression](#source-development-retained-20261124) · [Retained validators](#source-development-validator-20261124).

### Reviewed implementation and retention, November 25, 2026

November 19 follows the November 18 Simulation Record validator update with a correction to Flow Job refusal handling. Refused outcomes are explicitly marked across flow endpoints and no longer receive misleading memory-admission warnings; the integration includes regression changes for simulation, elaboration, target omission and endpoint admission. This is execution-status and evidence maintenance, not a new verification engine or a measured memory reduction. [Integration](#source-refused-admission) · [Retained endpoint logic](#source-refused-admission-retained).

The selected meaningful checkpoint within the saved capture is 2026-11-19 UTC. Source inspection only; no EDA or model experiment was independently reproduced.
