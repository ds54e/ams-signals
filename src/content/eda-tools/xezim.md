---
name: "xezim"
aliases: ["sisSIM"]
primary: "simulation"
ai: "ai-built"
description: "Rust SystemVerilog simulator combining four-state event-driven execution, native compilation, UVM features and DPI/VPI interfaces with public conformance tests."
keywords: ["SystemVerilog", "UVM", "4-state", "Rust", "DPI/VPI"]
areas:
  simulation: core
  frontend-synthesis: supporting
  formal-verification: supporting
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical xezim repository"
    url: "https://github.com/aionhw/xezim"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/aionhw/xezim/blob/137d57f65c65e9577f4cf936f7dc38c3587fc15f/README.md"
  - id: "implementation"
    title: "Reviewed implementation: src/compiler/simulator.rs"
    url: "https://github.com/aionhw/xezim/blob/137d57f65c65e9577f4cf936f7dc38c3587fc15f/src/compiler/simulator.rs"
  - id: "activity"
    title: "Class randomize over multi-dim properties"
    url: "https://github.com/aionhw/xezim/commit/137d57f65c65e9577f4cf936f7dc38c3587fc15f"
---

### Scope

Runtime execution is central; parsing/elaboration and verification-language facilities support simulation. The current implementation includes bytecode and native compilation paths. [Project documentation](#source-readme).

### Classification

The authors explicitly describe AI agents as first-class contributors to the simulator implementation. This supports AI-built, independently of whether a user runs an AI agent. [Reviewed source](#source-readme).

### Release boundary

UVM and language conformance reports describe tested cases, not complete IEEE compliance. The xezim-core dependency is not a second activity repository. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
