---
name: "Vyges EM-IR"
aliases: []
summary: "Physical power-grid IR-drop, bounded transient-droop and segment-current analysis."
description: "Analyzes physical power grids for static IR drop, bounded transient droop and segment-current limits. It accepts resistor networks or supported DEF/LEF extraction with external loads; dynamic estimates use prescribed triangular switching pulses and a fixed-step RC solve, so they do not establish general supply-noise or foundry-signoff accuracy."
scope:
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for implementing the release workflow guard that checks a tag against the crate version. The canonical workflow retains this executable build check."
  sources: [development-code-20261022, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public Rust implementation; network or supported DEF/LEF inputs, load currents and reviewed current-limit data are required."
addedAt: "2026-10-22"
reviewedAt: '2026-11-24'
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/vyges-tools/em-ir"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/vyges-tools/em-ir/blob/0baf10bf23a969b7ff1a0185a3acd03ca5de4ce8/README.md"
  - id: "implementation-1"
    title: "Reviewed source: src/emsignoff.rs"
    url: "https://github.com/vyges-tools/em-ir/blob/0baf10bf23a969b7ff1a0185a3acd03ca5de4ce8/src/emsignoff.rs"
  - id: "implementation-2"
    title: "Reviewed source: src/main.rs"
    url: "https://github.com/vyges-tools/em-ir/blob/0baf10bf23a969b7ff1a0185a3acd03ca5de4ce8/src/main.rs"
  - id: "activity"
    title: "Reviewed meaningful change: def: read the DEF with the tech LEF, so a strap continues on the via's other layer"
    url: "https://github.com/vyges-tools/em-ir/commit/938a8742bb3ab830f9443719ffe5794b9eccc7db"
  - id: development-code-20261022
    title: Credited executable development contribution
    url: https://github.com/vyges-tools/em-ir/commit/5051486d5705883f193c8e83bfd59f46d71ac504
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/vyges-tools/em-ir/blob/1115601efd636b9baf4dd0aa1228767a461f6b2a/.github/workflows/release.yml
  - id: website
    title: Official project website and documentation
    url: https://vyges.com/products/loom/em-ir/
    purpose: official
  - id: transient-solver
    title: "Static and transient power-grid solves and bounded result report"
    url: https://github.com/vyges-tools/em-ir/blob/9ad03f02054ab3c3ec87bc69a684dff2aaf7a8a9/src/emir.rs
  - id: explicit-switches
    title: "Explicit PDN capacitances and per-event switching times"
    url: https://github.com/vyges-tools/em-ir/blob/9ad03f02054ab3c3ec87bc69a684dff2aaf7a8a9/src/pdn.rs
  - id: extracted-switches
    title: "Common switching schedule in the DEF and power-map path"
    url: https://github.com/vyges-tools/em-ir/blob/9ad03f02054ab3c3ec87bc69a684dff2aaf7a8a9/src/extract.rs
  - id: transient-tests
    title: "Analytic pulse, energy-scaling and decoupling-capacitance tests"
    url: https://github.com/vyges-tools/em-ir/blob/9ad03f02054ab3c3ec87bc69a684dff2aaf7a8a9/tests/transient.rs
---

### Implemented operations and boundaries

The exposed result is physical power-grid IR drop and segment-current checking, classified as Layout. Load currents are externally supplied; the tool does not solve analog operating points. Public generic limits and private foundry plugins are different inputs, and no independent PDNSim or silicon correlation was performed.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

The dynamic path forms triangular current pulses from externally supplied switching energy and node capacitances, solves the RC network with backward Euler, and reports worst droop plus segment RMS/peak currents. It chooses a fixed timestep equal to one tenth of the shortest pulse duration, bounded below by 1 ps, and keeps no public time-series waveform in its result object. The fixed step and pulse assumptions matter for short events and supply-noise interpretation. [Transient implementation](#source-transient-solver) · [Analytic and invariant tests](#source-transient-tests).

The DEF/power-map extraction path assigns a common switching time and duration to its generated events. Hand-authored `.pdn` input separately supports per-event times and durations; the common-time limitation must not be generalized to that interface. Neither path infers actual clock-phase relationships or jitter from a functional circuit simulation. [Extracted events](#source-extracted-switches) · [Explicit event input](#source-explicit-switches).

### Scope and activity review

The exposed operations support Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-10-17T05:53:57Z (`938a8742bb3ab830f9443719ffe5794b9eccc7db`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for implementing the release workflow guard that checks a tag against the crate version. The canonical workflow retains this executable build check. This supports AI-ASSISTED. [Credited change](#source-development-code-20261022) · [Retained implementation](#source-development-retained-20261022).
