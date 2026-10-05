---
name: "CIRCT"
aliases: []
description: "MLIR/LLVM hardware compiler infrastructure with reusable hardware IRs and synthesis transformations. Compiler pipelines lower design representations for downstream tools, while LLHD models event-based execution and upstream formal-checking tools support verification of hardware behavior."
scope:
  design:
    ai: false
  synthesis:
    ai: false
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "An explicitly AI-assisted change implemented the ESI ChannelArbiter’s pipelined grant scheduler, including its grant queue and datapath integration. The scheduler remains a selectable ESI component."
  sources: ["development-1", "development-2"]
  reviewedAt: "2026-10-01"
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-05"
sources:
  - id: "code"
    title: "Canonical CIRCT repository"
    url: "https://github.com/llvm/circt"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/llvm/circt/blob/3abd111be1ea9677bbeeb0717592e04940608da9/README.md"
  - id: "implementation"
    title: "Reviewed implementation: docs/Dialects/LLHD.md"
    url: "https://github.com/llvm/circt/blob/3abd111be1ea9677bbeeb0717592e04940608da9/docs/Dialects/LLHD.md"
  - id: "activity"
    title: "[circt-bmc] Print only first counterexample by default (#11074)"
    url: "https://github.com/llvm/circt/commit/f1a41b921d8d367d1b5990c9fa4410157ab3aada"
  - id: "website"
    title: "Official project documentation"
    url: "https://circt.llvm.org/"
    purpose: "official"
  - id: "development-1"
    title: "Attributed scheduler implementation"
    url: "https://github.com/llvm/circt/commit/66aad44d6347775c6342636cd4ade2663f16f2da"
  - id: "development-2"
    title: "Current scheduler integration"
    url: "https://github.com/llvm/circt/blob/3abd111be1ea9677bbeeb0717592e04940608da9/lib/Dialect/ESI/runtime/python/esiaccel/components/channel_arbiter.py"
  - id: "activity-refresh"
    title: "Add the PyCDE If construct with callable elaboration branches"
    url: "https://github.com/llvm/circt/commit/3abd111be1ea9677bbeeb0717592e04940608da9"
  - id: "activity-current"
    title: "Correct Verilog declaration prefixes for aliases and composite types"
    url: "https://github.com/llvm/circt/commit/e368ee4dc1c9d7131c5513ed11f77baefd0c568b"
  - id: "activity-tip"
    title: "Simulation-dialect tagged variant type"
    url: "https://github.com/llvm/circt/commit/6af3f452dc1c1c573f5f67e4c63055b37eda11c0"
---

### Implementation context

Upstream CIRCT applies LLVM/MLIR infrastructure to hardware representations, reusable compiler passes and language frontends. Its tools lower and optimize hardware IRs, while LLHD models event-driven hardware behavior. The catalog describes upstream implementation rather than borrowing capabilities from separate forks. [Project overview](#source-readme); [LLHD semantics](#source-implementation).

### Release boundary

Reviewed October 1, 2026 at `3abd111be1ea9677bbeeb0717592e04940608da9`. The October 1 PyCDE change implements a two-way If construct whose branches can be elaboration-time callables, with type/width checks and IR regression tests. Selection remains ordinary hardware mux logic. [Current project source](#source-readme); [meaningful activity](#source-activity-refresh).

### Scope classification

Hardware IR construction/lowering and synthesis-oriented transformations establish Design and Synthesis. LLHD and upstream BMC/LEC tooling establish Verification; capabilities of separate forks are not attributed upstream. [Reviewed source](#source-readme); [LLHD model](#source-implementation).

The reviewed IR transformations, synthesis lowering and verification operations execute conventionally, so stage AI flags remain false. The separately attributed ESI scheduler supports the bounded AI-ASSISTED development label below, without characterizing construction of the compiler infrastructure as a whole. [Runtime boundary](#source-readme); [scheduler implementation](#source-development-1).

### Development provenance review

Reviewed 2026-10-01: **AI-ASSISTED**. Explicit Assisted-by attribution accompanies a new scheduler implementation, FIFO/arbiter integration and tests. It adds a meaningful optional arbitration architecture for high fan-in, within the much larger compiler infrastructure. [Attributed scheduler implementation](#source-development-1); [Current scheduler integration](#source-development-2).

### Current activity review

Reviewed 2026-10-05. ExportVerilog no longer prefixes aliased, enum or union types with an invalid logic keyword, with emitted-Verilog regressions. This is compiler-output correctness, independent of the retained historical development badge. [Reviewed change](#source-activity-current).

The later Sim dialect change implements a tagged variant type, including parsing, printing, alternative-name validation and type-walker regressions. This is reusable simulation IR infrastructure; it does not establish runtime AI. [Current implementation checkpoint](#source-activity-tip).
