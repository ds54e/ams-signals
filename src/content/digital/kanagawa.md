---
name: "Microsoft Kanagawa"
aliases: ["Kanagawa"]
description: "High-level hardware design language for HLS, using Wavefront Threading to express concurrency, synchronization and scheduling in an imperative program. A statically typed frontend and optimizing scheduler lower designs through CIRCT to SystemVerilog RTL, with libraries of composable hardware abstractions."
scope:
  design:
    ai: false
  synthesis:
    ai: false
access: "Public source language, compiler and libraries with nightly prerelease distributions; compiler builds include CIRCT and documented dependencies."
addedAt: "2026-09-06"
reviewedAt: "2026-09-06"
sources:
  - id: "paper"
    title: "Wavefront Threading Enables Effective High-Level Synthesis, PLDI 2024"
    url: "https://www.microsoft.com/en-us/research/publication/wavefront-threading-enables-effective-high-level-synthesis/"
    purpose: "paper"
  - id: "code"
    title: "Canonical Microsoft Kanagawa repository"
    url: "https://github.com/microsoft/kanagawa"
    purpose: "code"
  - id: "readme"
    title: "Kanagawa language and execution model at the reviewed revision"
    url: "https://github.com/microsoft/kanagawa/blob/98a2d8cbe16b74bf15a46c46a19b319c1a0bf78e/README.md"
  - id: "language"
    title: "Current programming guide: types, state, concurrency and synchronization"
    url: "https://github.com/microsoft/kanagawa/blob/98a2d8cbe16b74bf15a46c46a19b319c1a0bf78e/doc/programming-guide.md"
  - id: "mapping"
    title: "Mapping threads, functions, loops and memory to hardware"
    url: "https://github.com/microsoft/kanagawa/blob/98a2d8cbe16b74bf15a46c46a19b319c1a0bf78e/doc/mapping-to-hardware.md"
  - id: "architecture"
    title: "Compiler frontend, middle end, scheduler and backend architecture"
    url: "https://github.com/microsoft/kanagawa/blob/98a2d8cbe16b74bf15a46c46a19b319c1a0bf78e/doc/compiler-design-reference.md"
  - id: "backend"
    title: "Current CIRCT lowering and SystemVerilog export implementation"
    url: "https://github.com/microsoft/kanagawa/blob/98a2d8cbe16b74bf15a46c46a19b319c1a0bf78e/compiler/cpp/circt_util.cpp"
  - id: "build"
    title: "Build dependencies and compiler/library regression-test boundary"
    url: "https://github.com/microsoft/kanagawa/blob/98a2d8cbe16b74bf15a46c46a19b319c1a0bf78e/BUILDING.md"
  - id: "release"
    title: "Kanagawa nightly-20260905 prerelease"
    url: "https://github.com/microsoft/kanagawa/releases/tag/nightly-20260905"
  - id: "activity"
    title: "Emit named type aliases in CIRCT IR and ESI interfaces"
    url: "https://github.com/microsoft/kanagawa/commit/98a2d8cbe16b74bf15a46c46a19b319c1a0bf78e"
---

### Implementation context

Kanagawa is an imperative hardware language with strong static typing, functions, classes, lambdas and closures. Wavefront Threading and its consistency model expose concurrency and synchronization to the program: threads progress through generated pipelines and FIFOs, carrying their context. The language supports explicit scheduling constructs and composable abstractions rather than requiring the compiler to recover all concurrency from sequential software. [Language goals](#source-readme); [programming guide](#source-language); [hardware mapping](#source-mapping); [project-authored paper](#source-paper).

The Haskell frontend parses, desugars and performs type inference before passing its typed AST through an FFI into the C++ ParseTree and middle end. C++ analysis, optimization, scheduling and pipelining prepare hardware IR. The current backend builds CIRCT/MLIR modules, lowers ESI, combinational, sequential and hardware operations, and exports SystemVerilog with runtime support and interface artifacts. CIRCT integration is implemented, including optional IR output; it is not a future replacement for the shipped compiler. [Architecture](#source-architecture); [lowering implementation](#source-backend).

### Release boundary

Reviewed on September 6, 2026 at `98a2d8cbe16b74bf15a46c46a19b319c1a0bf78e`. The latest and meaningful default-branch commit, September 2 UTC, preserves named structs, unions and enums in CIRCT type aliases and ESI-facing interfaces, with unit and end-to-end tests. Earlier 2026 work added CIRCT-only output and updated CIRCT/ESI integration. The reviewed distribution is **nightly-20260905**, explicitly a prerelease; its September 5 publication does not replace the commit date. [Meaningful activity](#source-activity); [nightly release](#source-release); [build requirements](#source-build).

### Scope classification

Design covers authoring hardware behavior and reusable components. Synthesis covers optimization, hardware scheduling, pipelining and lowering to implementable RTL. The reviewed Verilator/CTest machinery tests the compiler and bundled library; it does not independently establish a general project-facing Verification stage. Generated RTL and downstream tool files do not establish Layout. [Compiler and test boundaries](#source-architecture); [build/test guide](#source-build).

Both runtime stage booleans are false. The September type-alias commit explicitly credits Claude Opus 4.6 assistance, but this is evidence for a bounded compiler contribution, insufficient to characterize the whole project as meaningfully AI-built under the catalog rule. [Development evidence](#source-activity).
