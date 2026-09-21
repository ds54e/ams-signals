---
name: "Calyx"
aliases: []
description: "Intermediate language and compiler infrastructure for accelerator generators. Calyx represents structural hardware and explicit control, applies reusable compiler passes, and emits Verilog or CIRCT-compatible output for downstream implementation."
scope:
  design:
    ai: false
  synthesis:
    ai: false
access: "Public Rust implementation, crates and documentation; downstream simulation and implementation tools are configured separately."
addedAt: "2026-09-22"
reviewedAt: "2026-09-22"
sources:
  - id: "official"
    title: "Official Calyx website"
    url: "https://calyxir.org/"
    purpose: "official"
  - id: "code"
    title: "Canonical Calyx repository"
    url: "https://github.com/calyxir/calyx"
    purpose: "code"
  - id: "readme"
    title: "Compiler organization and output boundary at the reviewed revision"
    url: "https://github.com/calyxir/calyx/blob/d6bcdc8707fe2f024a7b18a86523bda6f770186a/README.md"
  - id: "docs"
    title: "Calyx language and compiler documentation"
    url: "https://docs.calyxir.org/"
  - id: "activity"
    title: "Add the Auxin data converter"
    url: "https://github.com/calyxir/calyx/commit/569a03e23f31b02adfe9dcdc918be93d7b2fbdc2"
---

### Implementation context

Calyx is an intermediate language for accelerator-generating compilers. Its frontend, IR and optimization crates make structural components and control schedules explicit, while the compiler driver lowers programs to Verilog or CIRCT. Users can also embed custom optimization passes through the public Rust libraries. [Repository overview](#source-readme) · [Language documentation](#source-docs)

### Release boundary

The August 18 tip is a workspace dependency update. The latest reviewed substantive first-parent change is the July 24 Auxin data converter, alongside active July profiler and reference-lowering repairs. Downstream technology synthesis, placement and routing remain outside this entry. [Meaningful activity](#source-activity)

### Scope classification

Design covers the explicit hardware IR and compiler construction surface. Synthesis covers optimization and lowering from accelerator descriptions to RTL, not gate-level technology mapping or Layout. The reviewed compiler is conventional, so both stage AI flags are false.
