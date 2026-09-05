---
name: "Ngspice + OpenVAF Enhancements"
aliases: []
primary: "simulation"
ai: "ai-built"
description: "Joint ngspice and OpenVAF development tree extending SPICE simulation and Verilog-A compilation, including OSDI integration and language-correctness fixes."
keywords: ["SPICE", "Verilog-A", "OpenVAF", "OSDI", "Claude Code"]
areas:
  simulation: core
  frontend-synthesis: core
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical Ngspice + OpenVAF Enhancements repository"
    url: "https://github.com/javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements/blob/05fa8a439e7b84a26f45320dceb8dea2391ae2a1/README.md"
  - id: "implementation"
    title: "Reviewed implementation: docs/handbook/README.md"
    url: "https://github.com/javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements/blob/05fa8a439e7b84a26f45320dceb8dea2391ae2a1/docs/handbook/README.md"
  - id: "activity"
    title: "fix: a system function or random draw in a parameter default or range is refused, not crashed on (compiler hunt F1)"
    url: "https://github.com/javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements/commit/2fbf9870a30a84a524dc55aeadafb3613c11e305"
  - id: "website"
    title: "Official project documentation"
    url: "https://javanoviceprogrammer.github.io/Ngspice_OpenVAF_Enhancements/"
    purpose: "official"
---

### Scope

The repository carries both simulator and Verilog-A compiler source. Each is a central implementation surface, so both Simulation and Frontend/Synth are core. [Project documentation](#source-readme).

### Classification

The author explicitly presents the development effort as Claude-assisted; core compiler fixes also carry Claude co-authorship. [Reviewed source](#source-readme).

### Release boundary

These enhancements belong to this combined development tree and are not automatically upstream ngspice/OpenVAF features. Automated binary publishing is excluded from the meaningful-activity decision. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
