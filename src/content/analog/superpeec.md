---
name: "SuperPEEC"
aliases: []
summary: "PEEC electromagnetic solver for voxelized conductors, dielectrics, traces and bond-wire assemblies described in TOML."
description: "PEEC electromagnetic solver for voxelized conductors, dielectrics, traces and bond-wire assemblies described in TOML. It computes frequency-dependent network and port quantities for interconnect and passive structures, with discretization, solver tolerances and backend selection governing numerical cost and accuracy."
scope:
  simulation:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for implementing guarded variational impedance readout. The canonical solver retains the residual-based correction and its signal-to-noise guard."
  sources: [activity, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public Python/native implementation; numerical packages and the selected CPU/GPU backend are required."
addedAt: "2026-10-22"
reviewedAt: '2026-10-22'
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/trschell/SuperPEEC"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/trschell/SuperPEEC/blob/c61c703f862fdbf4ff589836762fa6a07bab340a/README.md"
  - id: "implementation-1"
    title: "Reviewed source: src/sppeec_cli.py"
    url: "https://github.com/trschell/SuperPEEC/blob/c61c703f862fdbf4ff589836762fa6a07bab340a/src/sppeec_cli.py"
  - id: "implementation-2"
    title: "Reviewed source: docs/input_doctrine.md"
    url: "https://github.com/trschell/SuperPEEC/blob/c61c703f862fdbf4ff589836762fa6a07bab340a/docs/input_doctrine.md"
  - id: "activity"
    title: "Reviewed meaningful change: LpPR: guarded variational port readout; input default rtol 1e-4"
    url: "https://github.com/trschell/SuperPEEC/commit/2c7b6bea053d5c8451f1469614e484c4d4d63b31"
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/trschell/SuperPEEC/blob/c61c703f862fdbf4ff589836762fa6a07bab340a/src/port_impedance.py
---

### Implemented operations and boundaries

The CLI reads declarative geometry and frequency/solver controls. It is a PEEC numerical engine rather than a general direct-GDS extractor. Reported example performance and accuracy remain author results, and were not independently reproduced.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Simulation. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-10-11T01:32:58Z (`2c7b6bea053d5c8451f1469614e484c4d4d63b31`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for implementing guarded variational impedance readout. The canonical solver retains the residual-based correction and its signal-to-noise guard. This supports AI-ASSISTED; it does not establish that AI built most of the project. [Credited change](#source-activity) · [Retained implementation](#source-development-retained-20261022).
