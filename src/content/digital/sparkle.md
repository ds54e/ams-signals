---
name: Sparkle HDL
description: Lean 4 hardware DSL for circuit construction, simulation, SystemVerilog generation and theorem-based verification. Its strict proof-carrying path currently covers a restricted returned IR subset, not a general proof of the emitted SystemVerilog or unrestricted hardware designs.
scope:
  design:
    ai: false
  verification:
    ai: false
access: Public Lean source; the Lean toolchain and optional simulator dependencies are required.
addedAt: '2026-11-16'
reviewedAt: '2026-11-16'
sources:
- id: "official"
  title: "Official project website"
  url: "https://verilean.github.io/sparkle/"
  purpose: "official"
- id: code
  title: Canonical public implementation
  url: https://github.com/Verilean/sparkle
  purpose: code
- id: readme
  title: Reviewed workflow and access boundaries
  url: https://github.com/Verilean/sparkle/blob/6c29b9b8b4bed436afcc0a3f23a6335bfbc751a1/README.md
- id: activity
  title: Reviewed first-parent integration of substantive implementation
  url: https://github.com/Verilean/sparkle/commit/3134cdd1b94b905509aebbaf7cff594400d8c44b
- id: implementation
  title: Reviewed implementation and validation change
  url: https://github.com/Verilean/sparkle/commit/1ccbc62aeb67dcb39761a373d1c64f6884d73321
- id: retained
  title: Current implementation at review
  url: https://github.com/Verilean/sparkle/blob/6c29b9b8b4bed436afcc0a3f23a6335bfbc751a1/Tools/VedU1Contract.lean
- id: proof-boundary
  title: Exact proof and supported-model boundary
  url: https://github.com/Verilean/sparkle/blob/6c29b9b8b4bed436afcc0a3f23a6335bfbc751a1/docs/VED-U1-MAIN.md
---

### Implementation and selection

Recent proof-contract validation rejects undriven outputs, input writes and duplicate drivers with regression tests. The reviewed U1 path has one output, no memories or instances and reset-zero restrictions; SV generation alone is not classified as logic synthesis. [Workflow](#source-readme) · [Implementation change](#source-implementation) · [Retained code](#source-retained).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).

The proof scope is defined separately from execution or code generation. [Exact proof boundary](#source-proof-boundary).
