---
name: ROHD
description: Dart framework for constructing hardware modules, simulating signal behavior and emitting synthesizable SystemVerilog. Its module graph, event-driven simulator and debug facilities connect design authoring with verification; generated RTL still needs a separate implementation toolchain for logic synthesis and physical design.
scope:
  design:
    ai: false
  verification:
    ai: false
access: Public Dart implementation; external simulators and synthesis tools are separate integrations.
addedAt: '2026-10-18'
reviewedAt: '2026-10-18'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/intel/rohd
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/intel/rohd/blob/a2b439e8dccfa2e260862184c99f2a2484c26e20/README.md
- id: activity
  title: No logic array/07 devtools debugger (#736)
  url: https://github.com/intel/rohd/commit/a2b439e8dccfa2e260862184c99f2a2484c26e20
- id: implementation-1
  title: 'Released implementation: lib/src/module.dart'
  url: https://github.com/intel/rohd/blob/a2b439e8dccfa2e260862184c99f2a2484c26e20/lib/src/module.dart
- id: implementation-2
  title: 'Released implementation: lib/src/simulator.dart'
  url: https://github.com/intel/rohd/blob/a2b439e8dccfa2e260862184c99f2a2484c26e20/lib/src/simulator.dart
---

### Implementation and boundaries

The module and simulator classes implement Design and Verification. SystemVerilog generation is not logic Synthesis. The selected debugger/logic-array change contains implementation and regression work, not just a version bump. Runtime simulation and code generation are conventional; no project-wide AI development claim is inferred from individual assistant-associated changes. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `a2b439e8dccfa2e260862184c99f2a2484c26e20` (2026-10-17 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).
