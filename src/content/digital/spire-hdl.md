---
name: Spire HDL
description: Python-embedded RTL language with an explicit circuit IR, arithmetic construction and optimization, plus Verilog generation and Yosys-backed processing. Registered pipeline primitives and simulation/testbench utilities support hardware exploration; synthesis outcomes depend on the selected backend, constraints and target library.
scope:
  design:
    ai: false
  synthesis:
    ai: false
  verification:
    ai: false
access: Public Python implementation; synthesis/simulation paths require their configured external tools.
addedAt: '2026-10-18'
reviewedAt: '2026-10-18'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/huawei-csl/spire-hdl
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/huawei-csl/spire-hdl/blob/9e0cd85a24632edf588805410ef8d272d419d5a1/README.md
- id: activity
  title: 'Merge pull request #10 from huawei-csl/feat/pipeline'
  url: https://github.com/huawei-csl/spire-hdl/commit/514b289d9648c3185bb544b9e73ffb3fd8e2bf8d
- id: implementation-1
  title: 'Released implementation: src/spire/ir.py'
  url: https://github.com/huawei-csl/spire-hdl/blob/9e0cd85a24632edf588805410ef8d272d419d5a1/src/spire/ir.py
- id: implementation-2
  title: 'Released implementation: src/spire/aig/aig_yosys.py'
  url: https://github.com/huawei-csl/spire-hdl/blob/9e0cd85a24632edf588805410ef8d272d419d5a1/src/spire/aig/aig_yosys.py
---

### Implementation and boundaries

The IR and authoring APIs implement Design; actual Yosys processing and optimization support Synthesis, while the released testbench/simulator utilities support Verification. The selected pipeline integration adds registered delay operations and tests. No model inference is required by these operations, and upstream performance comparisons are not catalog-reproduced results. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `514b289d9648c3185bb544b9e73ffb3fd8e2bf8d` (2026-09-09 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).
