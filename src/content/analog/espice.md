---
name: ESPice
summary: Zig circuit simulator using VerA-compiled Verilog-A device kernels for operating-point, transient and frequency-domain analyses.
description: Zig circuit simulator using VerA-compiled Verilog-A device kernels for operating-point, transient and frequency-domain analyses. Runtime HDL loading and adaptive transient handling connect behavioral models to the solver; CPU and optional CUDA/HIP paths have distinct dependencies, and reported benchmark results do not establish universal speed or accuracy.
scope:
  simulation:
    ai: false
access: Public Apache-2.0 source in the EGSpice repository. Source builds require pinned Zig/VerA dependencies; GPU execution requires the documented vendor driver/runtime. The reviewed README says no binary release is published yet.
addedAt: '2026-10-31'
reviewedAt: '2026-10-31'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/OpenFAT/EGSpice
  purpose: code
- id: readme
  title: Reviewed project workflow and boundaries
  url: https://github.com/OpenFAT/EGSpice/blob/34fdb418af589eb51a51d0c1f835f9d42f36f80f/README.md
- id: activity
  title: Reviewed substantive first-parent implementation
  url: https://github.com/OpenFAT/EGSpice/commit/bc0018f23026646bf38d8529fc8fce64a35ae05b
- id: loader
  title: Runtime HDL compilation and binding
  url: https://github.com/OpenFAT/EGSpice/blob/34fdb418af589eb51a51d0c1f835f9d42f36f80f/src/device/loader.zig
- id: transient
  title: Adaptive transient solver
  url: https://github.com/OpenFAT/EGSpice/blob/34fdb418af589eb51a51d0c1f835f9d42f36f80f/src/analysis/tran/tran.zig
---

### Simulator and model integration

The canonical repository is named EGSpice while the program and README use ESPice. Unlike VerA's fixture runner, this project implements circuit analyses and adaptive transient stepping. Runtime .hdl loading compiles Verilog-A or supported IEEE 1364 models into the native device ABI; the project explicitly does not load OSDI libraries. Conventional numerical execution supports Simulation, without a runtime AI prefix. [Workflow](#source-readme) · [HDL loader](#source-loader) · [Transient solver](#source-transient).

### Activity and limitations

The October 25 first-parent integration updates VerA to v0.20.0 and includes performance, host/model lifecycle and conformance-fixture work. The later repository-URL migration is not the freshness evidence. The README's example installer versions and release-oriented instructions are not treated as published releases: it explicitly says none exists yet, so the reviewed usable route is source/Nix. GPU speedups and cross-simulator agreement remain upstream reports; no GPU or circuit corpus was reproduced. [Integrated source](#source-activity) · [Installation and reported results](#source-readme).
