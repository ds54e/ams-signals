---
name: "sv-elab"
aliases: ["yosys-slang"]
description: "Slang-based SystemVerilog elaborator that lowers synthesizable designs into a word-level netlist. It is integrated into current Yosys and OpenROAD synthesis tooling and can also be built as a frontend component, carrying design semantics into downstream synthesis flows."
scope:
  synthesis:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Explicitly AI-assisted changes introduced an intermediate-representation layer and refactored frontend emission around it. The current Yosys backend retains the IR and builder separation."
  sources: ["development-1", "development-2", "development-3"]
  reviewedAt: "2026-09-07"
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical sv-elab repository"
    url: "https://github.com/povik/sv-elab"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/povik/sv-elab/blob/b6e440d6a2586b93c2a43da676c207c8c2a15778/README.md"
  - id: "implementation"
    title: "Reviewed implementation: src/slang_frontend.cc"
    url: "https://github.com/povik/sv-elab/blob/b6e440d6a2586b93c2a43da676c207c8c2a15778/src/slang_frontend.cc"
  - id: "activity"
    title: "Fix signedness comparison (#379)"
    url: "https://github.com/povik/sv-elab/commit/b6e440d6a2586b93c2a43da676c207c8c2a15778"
  - id: "development-1"
    title: "Portable IR layer"
    url: "https://github.com/povik/sv-elab/commit/d8c9d578fee4e96a3586b5041dcc16bd6a1c94d8"
  - id: "development-2"
    title: "Emission refactor"
    url: "https://github.com/povik/sv-elab/commit/554e6186d0cad2a68b37bfdb0a962b61952ca05f"
  - id: "development-3"
    title: "Current backend IR"
    url: "https://github.com/povik/sv-elab/blob/b6e440d6a2586b93c2a43da676c207c8c2a15778/src/yosys_plugin/ir.h"
---


### Implementation context

Tracked as a conventional compiler frontend. The current name is sv-elab; yosys-slang is a historical alias. [Reviewed source](#source-readme).

### Release boundary

Current Yosys integration and the separately buildable frontend should not be reduced to an obsolete plugin-only description. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

Synthesizable SystemVerilog lowering into a word-level netlist is explicitly oriented toward synthesis consumers. The word-level transformation serves synthesis; no independent Design stage is assigned for that internal representation. [Reviewed source](#source-readme).

The user-facing purpose is Synthesis-oriented lowering. The reviewed implementation does not establish runtime AI; a policy allowing some AI assistance is insufficient development-provenance evidence. [AI/stage evidence](#source-readme).

### Development provenance review

Reviewed 2026-09-07: **AI-ASSISTED**. Explicit assistance accompanies a substantive IR abstraction and coordinated frontend/emission refactor. Current Yosys backend IR/builders retain the separation; this is architectural subsystem work, without evidence for AI creation of the complete elaborator. [Portable IR layer](#source-development-1); [Emission refactor](#source-development-2); [Current backend IR](#source-development-3).
