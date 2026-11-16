---
name: Marlin
description: Rust frontend for Verilog/SystemVerilog testbenches using Verilator-backed DUT bindings and cargo test. It manages compilation, cached shared libraries, waveform output and Rust DPI integration; it depends on Verilator rather than implementing an independent HDL simulator.
scope:
  verification:
    ai: false
access: Public Rust source; supported Verilator, Rust/C++ build tools and macOS or Linux are required.
addedAt: '2026-11-16'
reviewedAt: '2026-11-16'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/ethanuppal/marlin
  purpose: code
- id: readme
  title: Reviewed workflow and access boundaries
  url: https://github.com/ethanuppal/marlin/blob/e656080aeade503786d89dd5526fc5c11e6a63a9/README.md
- id: activity
  title: Reviewed first-parent integration of substantive implementation
  url: https://github.com/ethanuppal/marlin/commit/3ff44aeabfa7d1bfa518925018167b45ec668bba
- id: implementation
  title: Reviewed implementation and validation change
  url: https://github.com/ethanuppal/marlin/commit/3ff44aeabfa7d1bfa518925018167b45ec668bba
- id: retained
  title: Current implementation at review
  url: https://github.com/ethanuppal/marlin/blob/e656080aeade503786d89dd5526fc5c11e6a63a9/verilator-stable/src/core.rs
---

### Implementation and selection

October compatibility fixes track Verilator name mangling and escaped module names following earlier releases. Sustained technical maintenance qualifies without imposing an arbitrary monthly activity cutoff. [Workflow](#source-readme) · [Implementation change](#source-implementation) · [Retained code](#source-retained).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).
