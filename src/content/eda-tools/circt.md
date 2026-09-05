---
name: "CIRCT"
aliases: []
roles: ["eda-tool"]
primary: "frontend-synthesis"
ai: "traditional"
description: "MLIR/LLVM hardware compiler infrastructure with reusable hardware IRs, synthesis transformations, simulation-oriented lowering and formal-checking tools."
keywords: ["MLIR", "hardware IR", "compiler infrastructure", "synthesis"]
areas:
  frontend-synthesis: core
  simulation: supporting
  formal-verification: supporting
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

### Scope

Upstream hardware IR and transformations are central. LLHD event semantics and the upstream circt-bmc/LEC tools justify supporting simulation and formal scope. [Project documentation](#source-readme).

### Classification

This entry is upstream LLVM CIRCT. A general AI contribution policy does not make it AI-built, and the unavailable Normal Computing fork is not this project. [Reviewed source](#source-readme).

### Release boundary

Only upstream files and tools were used for classification. No Normal-fork conformance or simulator results are attributed to upstream. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
