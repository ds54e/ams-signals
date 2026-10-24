---
name: RSpice
summary: Rust circuit simulator with schematic editing, SPICE netlist execution and waveform analysis through desktop, browser, CLI and Python interfaces.
description: "Rust SPICE and mixed-signal simulator with schematic editing, Verilog-AMS/wreal, cross-domain measurements and HDL tracing. It adds OP/DC/transient circuit assertions alongside AC/RF analyses; the source-available personal-use license restricts commercial evaluation, prototyping and redistribution without separate permission."
scope:
  design:
    ai: false
  simulation:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: A commit coauthored with Claude Opus 5 connected solver controls to netlist parsing and executable engine configuration. The current source retains the continuation, damping, solver-backend and timestep handling.
  sources:
  - development-solver-implementation
  - development-solver-retained
  reviewedAt: '2026-10-18'
access: "Public source under RSpice Personal Use License v1.1. Commercial evaluation, prototyping and redistribution are prohibited without express written permission; Rust builds and device/model support remain interface- and platform-specific."
addedAt: '2026-10-18'
reviewedAt: "2026-10-24"
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/JaimeHW/RSpice
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/JaimeHW/RSpice/blob/b2a4ae3e3d3631c6a1856108d804131fe49a900d/README.md
- id: activity
  title: 'Internal HDL variable tracing through .ESAVE'
  url: https://github.com/JaimeHW/RSpice/commit/b7a089985ebd82199950ff35ee1b4086fabfdc9a
- id: implementation-1
  title: 'Reviewed implementation: crates/rspice-core/src/lib.rs'
  url: https://github.com/JaimeHW/RSpice/blob/b2a4ae3e3d3631c6a1856108d804131fe49a900d/crates/rspice-core/src/lib.rs
- id: implementation-2
  title: 'Reviewed implementation: LICENSE'
  url: https://github.com/JaimeHW/RSpice/blob/b2a4ae3e3d3631c6a1856108d804131fe49a900d/LICENSE
- id: development-solver-implementation
  title: Claude-coauthored solver-control implementation
  url: https://github.com/JaimeHW/RSpice/commit/ffc2332b4e6a76e01261a5887e7da62b5d79bcbb
- id: development-solver-retained
  title: Retained solver-option configuration handling
  url: https://github.com/JaimeHW/RSpice/blob/d22a98635a59592cd184bf713f800bc92929c0af/crates/rspice-core/src/engine/config_resolver.rs
- id: review-20261024-assertions
  title: CLI assertion reports and failing ERROR exit status
  url: https://github.com/JaimeHW/RSpice/commit/52134f205f07a32d31779ca43641b9e567433c14
- id: review-20261024-hdl-traces
  title: Internal HDL variable traces and transient checkpoint handling
  url: https://github.com/JaimeHW/RSpice/commit/b7a089985ebd82199950ff35ee1b4086fabfdc9a
- id: review-20261024-cli
  title: Assertion and HDL diagnostic CLI contract at the reviewed revision
  url: https://github.com/JaimeHW/RSpice/blob/b7a089985ebd82199950ff35ee1b4086fabfdc9a/crates/rspice-cli/README.md
- id: review-20261024-license
  title: RSpice Personal Use License v1.1
  url: https://github.com/JaimeHW/RSpice/blob/b7a089985ebd82199950ff35ee1b4086fabfdc9a/LICENSE
---

### Implementation and boundaries

The public core exposes circuit storage, sparse/Newton solvers and analysis engines; the application adds schematic authoring. These are conventional Design and Simulation. GPU, Rust or automation terminology does not establish runtime AI. No simulator accuracy, RF performance or signoff result was reproduced. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `b7a089985ebd82199950ff35ee1b4086fabfdc9a` (October 24, 2026 UTC), verified on the captured canonical default branch's first-parent history. It implements internal HDL signal tracing; the preceding October 22 assertion-reporting change is also retained on that history. Latest raw activity and twelve UTC monthly buckets remain separate from the manually reviewed implementation checkpoint. [Meaningful tracing change](#source-activity) · [Assertion implementation](#source-review-20261024-assertions).

### Development provenance

The solver-control implementation explicitly credits Claude Opus 5 as coauthor; its actual parser and engine-configuration changes are integrated in canonical history and retained in the current source. This supports AI-ASSISTED for a code contribution, without attributing most of RSpice to AI. Runtime Design and Simulation remain conventional. [Credited implementation](#source-development-solver-implementation) · [Retained configuration](#source-development-solver-retained).

### Assertions and internal HDL traces

The CLI reports `.ASSERT` checks for operating-point, DC and transient runs. An ERROR-level violation, or an assertion that cannot be evaluated, fails the run with exit code 3 while retaining simulation results; NOTICE/WARNING violations are reported without that failure policy. JSON summary schema 2 includes assertions and HDL diagnostics. These circuit assertions do not establish general SystemVerilog Assertion support. [CLI implementation](#source-review-20261024-assertions) · [Documented report/exit contract](#source-review-20261024-cli).

`.ESAVE` can select internal HDL registers, real variables and vectors by instance path, rejects unknown names, and integrates trace state with transient rollback/checkpoint handling. This extends observable mixed-signal waveforms rather than adding an AI runtime. [Tracing implementation and regression cases](#source-review-20261024-hdl-traces).

These are reviewed default-branch development commits, not independently reproduced simulator results or verified tagged-release coverage. The Personal Use License v1.1 prohibits commercial evaluation/prototyping and redistribution without express written permission; source availability is not an unrestricted open-source grant. Design, Simulation and the existing AI-assisted development classification remain unchanged. [License terms](#source-review-20261024-license).
