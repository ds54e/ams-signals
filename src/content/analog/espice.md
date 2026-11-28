---
name: ESPice
summary: Zig circuit simulator using VerA-compiled Verilog-A device kernels for operating-point, transient and frequency-domain analyses.
description: "Zig circuit simulator using VerA-compiled Verilog-A kernels for operating-point, transient and frequency-domain analyses, with runtime HDL loading and CPU or optional GPU execution. Simulator code is Apache-2.0, but the bundled BSIM4 model retains CC BY-NC 4.0 terms; backend dependencies and numerical coverage vary."
scope:
  simulation:
    ai: false
access: "Public Apache-2.0 simulator code; bundled models have their own terms, including CC BY-NC 4.0 for models/bsim4va.va. Source builds require pinned Zig/VerA dependencies, and GPU execution requires the documented driver/runtime; no binary release is published in the reviewed README."
addedAt: '2026-10-31'
reviewedAt: "2026-11-28"
sources:
- id: "official"
  title: "Official project website"
  url: "https://openfat.github.io/ESpice/"
  purpose: "official"
- id: code
  title: Canonical public implementation
  url: https://github.com/Scouren/ESpice
  purpose: code
- id: readme
  title: Reviewed project workflow and boundaries
  url: https://github.com/Scouren/ESpice/blob/34fdb418af589eb51a51d0c1f835f9d42f36f80f/README.md
- id: activity
  title: Reviewed substantive first-parent implementation
  url: https://github.com/Scouren/ESpice/commit/bc0018f23026646bf38d8529fc8fce64a35ae05b
- id: loader
  title: Runtime HDL compilation and binding
  url: https://github.com/Scouren/ESpice/blob/34fdb418af589eb51a51d0c1f835f9d42f36f80f/src/device/loader.zig
- id: transient
  title: Adaptive transient solver
  url: https://github.com/Scouren/ESpice/blob/34fdb418af589eb51a51d0c1f835f9d42f36f80f/src/analysis/tran/tran.zig
- id: review-20261103-migration
  title: Canonical repository and packaging rename to ESPice
  url: https://github.com/Scouren/ESpice/commit/ea15065574692c4d7f376bc65d58e8d5ba586729
- id: review-20261124-model-license
  title: "Bundled BSIM4 Verilog-A model retains noncommercial license terms"
  url: https://github.com/Scouren/ESpice/blob/9578555f68b1af9cdc252113beffdc5f3ae55d4e/models/bsim4va.va
- id: review-20261128-activity
  title: "November 5 HSPICE line continuation and sweep diagnostics"
  url: "https://github.com/Scouren/ESpice/commit/9578555f68b1af9cdc252113beffdc5f3ae55d4e"
- id: review-20261128-determinism
  title: "November 3 deterministic stamping and worker progress integration"
  url: "https://github.com/Scouren/ESpice/commit/39aa1823c6421cf2cdc5689d24c8ecd0e468f1dc"
- id: review-20261128-parallel
  title: "Retained parallel device stamping"
  url: "https://github.com/Scouren/ESpice/blob/9578555f68b1af9cdc252113beffdc5f3ae55d4e/src/analysis/par_eval.zig"
- id: review-20261128-parallel-tests
  title: "Retained tied-terminal and worker progress regressions"
  url: "https://github.com/Scouren/ESpice/blob/9578555f68b1af9cdc252113beffdc5f3ae55d4e/src/analysis/tests/circuit.zig"
- id: review-20261128-parser-tests
  title: "Retained supported and refused HSPICE DC sweep forms"
  url: "https://github.com/Scouren/ESpice/blob/9578555f68b1af9cdc252113beffdc5f3ae55d4e/src/frontend/tests/cards.zig"
- id: review-20261128-readme
  title: "Current workflow and absence of a published binary release"
  url: "https://github.com/Scouren/ESpice/blob/9578555f68b1af9cdc252113beffdc5f3ae55d4e/README.md"
- id: related-conformance
  title: "Related suite and imported fixture lineage"
  url: "https://github.com/Scouren/Conformance-Suite/blob/06226fa7632f12d05c0d055ac4fcf0179b3e9381/README.md"
---

### Simulator and model integration

The canonical repository and program now use ESPice; the earlier EGSpice repository name was migrated without changing the repository identity. Unlike VerA's fixture runner, this project implements circuit analyses and adaptive transient stepping. Runtime .hdl loading compiles Verilog-A or supported IEEE 1364 models into the native device ABI; the project explicitly does not load OSDI libraries. Conventional numerical execution supports Simulation, without a runtime AI prefix. [Workflow](#source-readme) · [HDL loader](#source-loader) · [Transient solver](#source-transient).

### Activity and limitations

The October 25 first-parent integration updates VerA to v0.20.0 and includes performance, host/model lifecycle and conformance-fixture work. The later repository-URL migration is not the freshness evidence. The README's example installer versions and release-oriented instructions are not treated as published releases: it explicitly says none exists yet, so the reviewed usable route is source/Nix. GPU speedups and cross-simulator agreement remain upstream reports; no GPU or circuit corpus was reproduced. [Integrated source](#source-activity) · [Installation and reported results](#source-readme).

### Canonical identity review

The November 2 rename changes the canonical Code location from EGSpice to ESPice while retaining GitHub repository ID 1436380592. Default-branch history and the earlier meaningful implementation checkpoint remain the activity basis; the rename alone does not advance meaningful activity. Public release metadata still contains no published release, so source/Nix and GPU dependency boundaries remain. [Canonical migration](#source-review-20261103-migration) · [Code](#source-code).

### Current canonical owner and model terms

The current canonical repository is Scouren/ESpice and retains repository ID 1436380592 and the prior implementation history. The simulator license does not override bundled model licenses: the BSIM4 Verilog-A header explicitly retains CC BY-NC 4.0 terms. Source availability alone does not establish unrestricted commercial use of that model. [Canonical repository](#source-code) · [Model license](#source-review-20261124-model-license).

### November 28 source review

November 3 integrates work-item-based barriers for parallel device stamps and a serial-bypass correction for tied device terminals. Staging contributions and reducing in tape order aim to preserve serial summation order; regressions compare selected serial/parallel results and exercise a pass without scheduled workers. This is a correctness and progress improvement, not an independently measured speedup or proof of determinism for every backend. November 5 corrects continuation of quoted HSPICE expressions and rejects ambiguous bare MONTE=/DATA= following a swept DC source rather than attempting to resolve them as source names. The already captured head contains both integrations, so the meaningful checkpoint advances without changing the capture or its counts. [Parallel integration](#source-review-20261128-determinism) · [Implementation](#source-review-20261128-parallel) · [Regressions](#source-review-20261128-parallel-tests) · [HSPICE correction](#source-review-20261128-activity) · [Parser regressions](#source-review-20261128-parser-tests).

Retain the simulator separately from its model compiler and the standalone conformance harness. The netlist corpus is shared through the conformance submodule; the suite documents importing ESPice fixtures. Agreement against shared fixtures is not independent coverage of all device models or proof of numerical signoff. No upstream build, tests or GPU runs were performed. The current source still documents no published binary release. [Current workflow](#source-review-20261128-readme) · [Suite lineage](#source-related-conformance).
