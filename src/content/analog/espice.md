---
name: ESPice
summary: Zig circuit simulator using VerA-compiled Verilog-A device kernels for operating-point, transient and frequency-domain analyses.
description: Zig circuit simulator using VerA-compiled Verilog-A device kernels for operating-point, transient and frequency-domain analyses. Runtime HDL loading and adaptive transient handling connect behavioral models to the solver; CPU and optional CUDA/HIP paths have distinct dependencies, and reported benchmark results do not establish universal speed or accuracy.
scope:
  simulation:
    ai: false
access: Public Apache-2.0 source in the ESPice repository. Source builds require pinned Zig/VerA dependencies; GPU execution requires the documented vendor driver/runtime. The reviewed README says no binary release is published yet.
addedAt: '2026-10-31'
reviewedAt: '2026-11-03'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/OpenFAT/ESPice
  purpose: code
- id: readme
  title: Reviewed project workflow and boundaries
  url: https://github.com/OpenFAT/ESPice/blob/34fdb418af589eb51a51d0c1f835f9d42f36f80f/README.md
- id: activity
  title: Reviewed substantive first-parent implementation
  url: https://github.com/OpenFAT/ESPice/commit/bc0018f23026646bf38d8529fc8fce64a35ae05b
- id: loader
  title: Runtime HDL compilation and binding
  url: https://github.com/OpenFAT/ESPice/blob/34fdb418af589eb51a51d0c1f835f9d42f36f80f/src/device/loader.zig
- id: transient
  title: Adaptive transient solver
  url: https://github.com/OpenFAT/ESPice/blob/34fdb418af589eb51a51d0c1f835f9d42f36f80f/src/analysis/tran/tran.zig
- id: review-20261103-migration
  title: Canonical repository and packaging rename to ESPice
  url: https://github.com/OpenFAT/ESPice/commit/ea15065574692c4d7f376bc65d58e8d5ba586729
---

### Simulator and model integration

The canonical repository and program now use ESPice; the earlier EGSpice repository name was migrated without changing the repository identity. Unlike VerA's fixture runner, this project implements circuit analyses and adaptive transient stepping. Runtime .hdl loading compiles Verilog-A or supported IEEE 1364 models into the native device ABI; the project explicitly does not load OSDI libraries. Conventional numerical execution supports Simulation, without a runtime AI prefix. [Workflow](#source-readme) · [HDL loader](#source-loader) · [Transient solver](#source-transient).

### Activity and limitations

The October 25 first-parent integration updates VerA to v0.20.0 and includes performance, host/model lifecycle and conformance-fixture work. The later repository-URL migration is not the freshness evidence. The README's example installer versions and release-oriented instructions are not treated as published releases: it explicitly says none exists yet, so the reviewed usable route is source/Nix. GPU speedups and cross-simulator agreement remain upstream reports; no GPU or circuit corpus was reproduced. [Integrated source](#source-activity) · [Installation and reported results](#source-readme).

### Canonical identity review

The November 2 rename changes the canonical Code location from EGSpice to ESPice while retaining GitHub repository ID 1436380592. Default-branch history and the earlier meaningful implementation checkpoint remain the activity basis; the rename alone does not advance meaningful activity. Public release metadata still contains no published release, so source/Nix and GPU dependency boundaries remain. [Canonical migration](#source-review-20261103-migration) · [Code](#source-code).
