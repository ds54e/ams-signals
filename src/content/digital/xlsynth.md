---
name: XLSynth Rust tools
description: Rust tools around XLS with independent SystemVerilog code generation, experimental gate mapping and netlist-analysis utilities. Lean export supports restricted models and user-supplied proofs; evaluation is not itself proof, and XLS two-state semantics do not guarantee general SystemVerilog X/Z behavior.
scope:
  design:
    ai: false
  synthesis:
    ai: false
  verification:
    ai: false
access: Public Rust workspace; build dependencies and optional solver/proof tooling depend on the selected component.
addedAt: '2026-11-16'
reviewedAt: '2026-11-16'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/xlsynth/xlsynth-crate
  purpose: code
- id: readme
  title: Reviewed workflow and access boundaries
  url: https://github.com/xlsynth/xlsynth-crate/blob/b0193894a5e09629b65d67cea2e2b210e74d91c6/README.md
- id: activity
  title: Reviewed first-parent integration of substantive implementation
  url: https://github.com/xlsynth/xlsynth-crate/commit/b0193894a5e09629b65d67cea2e2b210e74d91c6
- id: implementation
  title: Reviewed implementation and validation change
  url: https://github.com/xlsynth/xlsynth-crate/commit/b0193894a5e09629b65d67cea2e2b210e74d91c6
- id: retained
  title: Current implementation at review
  url: https://github.com/xlsynth/xlsynth-crate/blob/b0193894a5e09629b65d67cea2e2b210e74d91c6/xlsynth-driver/src/gv_dump_cone.rs
- id: proof-boundary
  title: Exact proof and supported-model boundary
  url: https://github.com/xlsynth/xlsynth-crate/blob/b0193894a5e09629b65d67cea2e2b210e74d91c6/xlsynth-lean/README.md
---

### Implementation and selection

Distinct from the cataloged Google XLS project: this entry concerns the Rust-native codegen, g8r and netlist/Lean tooling, not an alias of upstream XLS. Liberty-derived flip-flop boundaries and regression tests support active implementation. [Workflow](#source-readme) · [Implementation change](#source-implementation) · [Retained code](#source-retained).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).

The proof scope is defined separately from execution or code generation. [Exact proof boundary](#source-proof-boundary).
