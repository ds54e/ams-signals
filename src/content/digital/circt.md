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
  reviewedAt: "2026-09-07"
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical CIRCT repository"
    url: "https://github.com/llvm/circt"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/llvm/circt/blob/e7f97d48cfd1e85f3c6fa7aa1a603b4a4cdee908/README.md"
  - id: "implementation"
    title: "Reviewed implementation: docs/Dialects/LLHD.md"
    url: "https://github.com/llvm/circt/blob/e7f97d48cfd1e85f3c6fa7aa1a603b4a4cdee908/docs/Dialects/LLHD.md"
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
    url: "https://github.com/llvm/circt/blob/e7f97d48cfd1e85f3c6fa7aa1a603b4a4cdee908/lib/Dialect/ESI/runtime/python/esiaccel/components/channel_arbiter.py"
---


### Implementation context

This entry is upstream LLVM CIRCT. The unavailable Normal Computing fork is a separate project; its implementation claims are not attributed to upstream. [Reviewed source](#source-readme).

### Release boundary

Only upstream files and tools were used for classification. No Normal-fork conformance or simulator results are attributed to upstream. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

Hardware IR construction/lowering and synthesis-oriented transformations are central upstream capabilities. LLHD and upstream BMC/LEC tooling support verification; no unavailable Normal Computing fork functionality is attributed upstream. [Reviewed source](#source-readme).

Upstream IR transformations and synthesis lowering are conventional compiler operations, with upstream verification tools. Neither isolated coding-agent contributions nor the unavailable Normal Computing fork justify an AI prefix or defining AI-built mark. [AI/stage evidence](#source-readme).

### Development provenance review

Reviewed 2026-09-07: **AI-ASSISTED**. Explicit Assisted-by attribution accompanies a new scheduler implementation, FIFO/arbiter integration and tests. It adds a meaningful optional arbitration architecture for high fan-in, within the much larger compiler infrastructure. [Attributed scheduler implementation](#source-development-1); [Current scheduler integration](#source-development-2).
