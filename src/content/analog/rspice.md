---
name: RSpice
summary: Rust circuit simulator with schematic editing, SPICE netlist execution and waveform analysis through desktop, browser, CLI and Python interfaces.
description: Rust circuit simulator with schematic editing, SPICE netlist execution and waveform analysis through desktop, browser, CLI and Python interfaces. Its numerical engine implements operating-point, transient, AC and RF analyses; source availability does not make its custom license an unrestricted open-source license.
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
access: Public source under the project-specific RSpice license; Rust builds and device/model support follow the selected interface and platform.
addedAt: '2026-10-18'
reviewedAt: '2026-10-18'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/JaimeHW/RSpice
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/JaimeHW/RSpice/blob/b2a4ae3e3d3631c6a1856108d804131fe49a900d/README.md
- id: activity
  title: 'fix(schematic): a transistor''s value stands on its drain''s side of the bulk'
  url: https://github.com/JaimeHW/RSpice/commit/b2a4ae3e3d3631c6a1856108d804131fe49a900d
- id: implementation-1
  title: 'Released implementation: crates/rspice-core/src/lib.rs'
  url: https://github.com/JaimeHW/RSpice/blob/b2a4ae3e3d3631c6a1856108d804131fe49a900d/crates/rspice-core/src/lib.rs
- id: implementation-2
  title: 'Released implementation: LICENSE'
  url: https://github.com/JaimeHW/RSpice/blob/b2a4ae3e3d3631c6a1856108d804131fe49a900d/LICENSE
- id: development-solver-implementation
  title: Claude-coauthored solver-control implementation
  url: https://github.com/JaimeHW/RSpice/commit/ffc2332b4e6a76e01261a5887e7da62b5d79bcbb
- id: development-solver-retained
  title: Retained solver-option configuration handling
  url: https://github.com/JaimeHW/RSpice/blob/d22a98635a59592cd184bf713f800bc92929c0af/crates/rspice-core/src/engine/config_resolver.rs
---

### Implementation and boundaries

The released core exposes circuit storage, sparse/Newton solvers and analysis engines; the application adds schematic authoring. These are conventional Design and Simulation. GPU, Rust or automation terminology does not establish runtime AI. The reviewed label-placement correction changes schematic readability and has regression coverage. No simulator accuracy, RF performance or signoff result was reproduced. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `b2a4ae3e3d3631c6a1856108d804131fe49a900d` (2026-10-18 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).

### Development provenance

The solver-control implementation explicitly credits Claude Opus 5 as coauthor; its actual parser and engine-configuration changes are integrated in canonical history and retained in the current source. This supports AI-ASSISTED for a code contribution, without attributing most of RSpice to AI. Runtime Design and Simulation remain conventional. [Credited implementation](#source-development-solver-implementation) · [Retained configuration](#source-development-solver-retained).
