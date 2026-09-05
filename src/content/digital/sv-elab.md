---
name: "sv-elab"
aliases: ["yosys-slang"]
roles: ["eda-tool"]
primary: "frontend-synthesis"
ai: "traditional"
description: "Slang-based SystemVerilog elaborator that lowers synthesizable designs into a word-level netlist for Yosys and other downstream flows."
keywords: ["SystemVerilog", "slang", "Yosys", "synthesis"]
areas:
  frontend-synthesis: core
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
---

### Scope

The current project lowers elaborated SystemVerilog into synthesis-oriented word-level IR and integrates with Yosys. [Project documentation](#source-readme).

### Classification

Tracked as a conventional compiler frontend. The current name is sv-elab; yosys-slang is a historical alias. [Reviewed source](#source-readme).

### Release boundary

Current Yosys integration and the separately buildable frontend should not be reduced to an obsolete plugin-only description. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
