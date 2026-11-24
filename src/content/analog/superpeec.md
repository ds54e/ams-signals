---
name: "SuperPEEC"
aliases: []
summary: "PEEC extractor for frequency-dependent parasitic impedance of voxelized interconnects and passive structures."
description: "Extracts frequency-dependent parasitic impedance from TOML-defined conductor and dielectric geometry using a PEEC formulation. Port definitions, voxel discretization and solver settings control its R/L/Z results, with CPU and GPU backends available for interconnect and passive-structure analysis."
scope:
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for implementing guarded variational impedance readout. The canonical solver retains the residual-based correction and its signal-to-noise guard."
  sources: [activity, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public Python/native implementation; numerical packages and the selected CPU/GPU backend are required."
addedAt: "2026-10-22"
reviewedAt: "2026-11-24"
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

The CLI reads declarative geometry and frequency/solver controls. Its dedicated geometry-to-port-impedance workflow supports parasitic extraction; it does not require a direct GDS importer. Reported example performance and accuracy remain author results, and were not independently reproduced.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The primary operation is dedicated parasitic extraction, supporting Layout under the same boundary as FasterCap and fasterhenry. Exported currents and frequency-dependent port quantities are outputs of that extraction workflow; no independently exposed general scattering/field-analysis workflow was established. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-10-11T01:32:58Z (`2c7b6bea053d5c8451f1469614e484c4d4d63b31`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for implementing guarded variational impedance readout. The canonical solver retains the residual-based correction and its signal-to-noise guard. This supports AI-ASSISTED. [Credited change](#source-activity) · [Retained implementation](#source-development-retained-20261022).
