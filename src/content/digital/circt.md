---
name: "CIRCT"
aliases: []
description: "MLIR/LLVM hardware compiler infrastructure with reusable hardware IRs, synthesis transformations, simulation-oriented lowering and formal-checking tools."
scope:
  design:
    level: core
    ai: false
  synthesis:
    level: core
    ai: false
  verification:
    level: supporting
    ai: false
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
---


### Implementation context

This entry is upstream LLVM CIRCT. The unavailable Normal Computing fork is a separate project; its implementation claims are not attributed to upstream. [Reviewed source](#source-readme).

### Release boundary

Only upstream files and tools were used for classification. No Normal-fork conformance or simulator results are attributed to upstream. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

Hardware IR construction/lowering and synthesis-oriented transformations are central upstream capabilities. LLHD and upstream BMC/LEC tooling support verification; no unavailable Normal Computing fork functionality is attributed upstream. [Reviewed source](#source-readme).

Upstream IR transformations and synthesis lowering are conventional compiler operations, with supporting upstream verification tools. Neither isolated coding-agent contributions nor the unavailable Normal Computing fork justify an AI prefix or defining AI-built mark. [AI/stage evidence](#source-readme).
