---
name: RSpice
summary: Rust circuit simulator with schematic editing, SPICE netlist execution and waveform analysis through desktop, browser, CLI and Python interfaces.
description: Rust circuit simulator with schematic editing, SPICE netlist execution and waveform analysis through desktop, browser, CLI and Python interfaces. Its numerical engine implements operating-point, transient, AC and RF analyses; source availability does not make its custom license an unrestricted open-source license.
scope:
  design:
    ai: false
  simulation:
    ai: false
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
---

### Implementation and boundaries

The released core exposes circuit storage, sparse/Newton solvers and analysis engines; the application adds schematic authoring. These are conventional Design and Simulation. GPU, Rust or automation terminology does not establish runtime AI. The reviewed label-placement correction changes schematic readability and has regression coverage. No simulator accuracy, RF performance or signoff result was reproduced. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `b2a4ae3e3d3631c6a1856108d804131fe49a900d` (2026-10-18 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).
