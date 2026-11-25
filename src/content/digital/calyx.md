---
name: "Calyx"
aliases: []
description: "Intermediate language and compiler infrastructure for accelerator generators, combining structural hardware with explicit control. Reusable optimization passes emit Verilog or CIRCT-compatible output, while the included Cider interpreter and interactive debugger let users execute programs, step through control and inspect hardware state."
scope:
  design:
    ai: false
  synthesis:
    ai: false
  verification:
    ai: false
access: "Public Rust compiler, interpreter and debugger; external RTL simulation and implementation tools are configured separately."
addedAt: "2026-09-22"
reviewedAt: "2026-11-25"
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
  - id: "activity-refresh"
    title: "Correct input reuse and final output paths in the flow planner"
    url: "https://github.com/calyxir/calyx/commit/a7c9f131abda9edb5d22934b159e9f0f543ab793"
  - id: "interpreter"
    title: "Cider interpreter usage and memory-state results"
    url: "https://github.com/calyxir/calyx/blob/d6bcdc8707fe2f024a7b18a86523bda6f770186a/docs/running-calyx/interpreter.md"
  - id: "debugger"
    title: "Cider user-facing stepping, breakpoints and state inspection"
    url: "https://github.com/calyxir/calyx/blob/d6bcdc8707fe2f024a7b18a86523bda6f770186a/docs/debug/cider.md"
  - id: auxin-update
    title: "November 17 auxin data conversion and serialization changes"
    url: "https://github.com/calyxir/calyx/commit/e1bca4bf6779ccc98b5099f9a2284ca3b0bef637"
  - id: auxin-format
    title: "Retained plain-text data-directory header and tests"
    url: "https://github.com/calyxir/calyx/blob/e1bca4bf6779ccc98b5099f9a2284ca3b0bef637/tools/auxin/formats/src/dat_dir.rs"
  - id: auxin-repl
    title: "Retained fixed-point number CLI"
    url: "https://github.com/calyxir/calyx/blob/e1bca4bf6779ccc98b5099f9a2284ca3b0bef637/tools/fixed_cli/src/main.rs"
---

### Implementation context

Calyx is an intermediate language for accelerator-generating compilers. Its frontend, IR and optimization crates make structural components and control schedules explicit, while the compiler driver lowers programs to Verilog or CIRCT. Users can also embed custom optimization passes through the public Rust libraries. [Repository overview](#source-readme) · [Language documentation](#source-docs)

### Release boundary

Reviewed October 1, 2026 at `d6bcdc8707fe2f024a7b18a86523bda6f770186a`. The August 18 head updates a workspace dependency. The reviewed July 30 flow-planner change tracks already consumed inputs and assigns an explicit output path only to the final operation producing that state, fixing executable plan behavior. [Current project source](#source-readme); [meaningful activity](#source-activity-refresh).

### Scope classification

Design covers the explicit hardware IR and compiler construction surface. Synthesis covers optimization and lowering from accelerator descriptions to RTL, without gate-level technology mapping or Layout. Verification covers Cider execution and its interactive debugger: users can step clock ticks, break on control groups and inspect ports, registers and memories. This is a documented design-debugging surface, not merely internal regression machinery. [Interpreter](#source-interpreter); [debugger](#source-debugger).

The reviewed compiler and interpreter are conventional; all runtime AI flags remain false. The reviewed primary sources do not establish qualifying AI implementation provenance.

### Reviewed implementation update, November 25, 2026

November 17 reworks auxin's memory-data and numeric conversion APIs, separates Cider serialization into its own crate, changes the data-directory header format, and adds a fixed-point/type parsing REPL. JSON output expectations are flattened to one-dimensional arrays, so consumers of older shaped output need to check the new format. The retained header parser has tests including property-based cases. These are user-facing data interchange and verification-tool maintenance, not a new synthesis optimization or independently measured speedup. [Integrated change](#source-auxin-update) · [Format implementation](#source-auxin-format) · [Number CLI](#source-auxin-repl).

The selected meaningful checkpoint in the existing capture is 2026-11-17 UTC. Source and retained test code were inspected; no EDA, solver or regression run was independently performed.
