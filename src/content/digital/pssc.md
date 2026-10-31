---
name: pssc
description: Portable Stimulus compiler translating PSS models through Zuspec IR into SystemVerilog verification classes and selected C/Python execution targets. Implemented backends cover action/control lowering and operation-model APIs, with target-specific refusals and dependencies; generated stimulus infrastructure does not synthesize DUT RTL or prove design correctness.
scope:
  verification:
    ai: false
  aiDevelopment: assisted
access: Public Apache-2.0 Python implementation; requires compatible pssparser, Zuspec IR and selected backend/solver packages. SystemVerilog/DPI execution requires a suitable simulator and runtime integration.
addedAt: '2026-10-31'
reviewedAt: '2026-10-31'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/PSSTools/pssc
  purpose: code
- id: readme
  title: Reviewed project workflow and boundaries
  url: https://github.com/PSSTools/pssc/blob/ef909bbdde946278984886d1909a6b3d491ddebf/README.md
- id: activity
  title: Reviewed substantive first-parent implementation
  url: https://github.com/PSSTools/pssc/commit/ef909bbdde946278984886d1909a6b3d491ddebf
- id: sv
  title: SystemVerilog package/class backend
  url: https://github.com/PSSTools/pssc/blob/ef909bbdde946278984886d1909a6b3d491ddebf/src/pssc/targets/sv/backend.py
- id: limits
  title: Known dependency and test failures
  url: https://github.com/PSSTools/pssc/blob/ef909bbdde946278984886d1909a6b3d491ddebf/KNOWN_TEST_FAILURES.md
- id: development-implementation
  title: Credited executable implementation
  url: https://github.com/PSSTools/pssc/commit/81b222fb186f4adb8b3038e6bfc57968315e5929
- id: development-retained
  title: Retained implementation at reviewed head
  url: https://github.com/PSSTools/pssc/blob/ef909bbdde946278984886d1909a6b3d491ddebf/tests/plugins/pssc_hal_fixture/pssc_hal_fixture/backend.py
developmentEvidence:
  summary: Claude is credited for implementing a HAL fixture plugin that generates a stateless C API through backend hooks. The executable plugin and differential tests remain in the current canonical tree; this supports assisted development of that contribution.
  sources:
  - development-implementation
  - development-retained
  reviewedAt: '2026-10-31'
---

### Verification compiler

The driver parses PSS using pssparser, maps it into Zuspec IR and invokes a selected target. The retained SystemVerilog backend emits packages/classes; C and Python paths provide other execution and operation-model interfaces. These serve Verification, not DUT Design or logic Synthesis. The October 30 first-parent integration adds effect sequencing, target legality checks, register-access lowering and executable regression tests. [Project](#source-readme) · [SV backend](#source-sv) · [Integrated changes](#source-activity).

### Limits and development provenance

Target availability is not equivalent to complete PSS implementation or qualified simulator support. Backend and solver versions matter, and known dependency/test failures remain documented upstream. This review inspected implementation and tests without executing the generated multi-tool flows. [Known limitations](#source-limits).

The October 21 HAL fixture implementation explicitly credits Claude and implements a stateless C API through generator hooks. The current canonical branch retains that executable plugin and differential-test path. This supports AI-assisted software development; it does not make generated verification stimulus a runtime AI workflow. [Credited change](#source-development-implementation) · [Retained plugin](#source-development-retained).
