---
name: "xezim"
aliases: ["sisSIM"]
description: "Rust SystemVerilog simulator combining four-state event-driven execution, native compilation, UVM features and DPI/VPI interfaces with public conformance tests."
scope:
  verification:
    level: core
    ai: false
  aiBuilt: core
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


### Implementation context

The authors explicitly describe AI agents as first-class contributors to the simulator implementation. This describes the development process, independently of whether a user runs an AI agent. [Reviewed source](#source-readme).

### Release boundary

UVM and language conformance reports describe tested cases, not complete IEEE compliance. The xezim-core dependency is not a second activity repository. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

SystemVerilog execution, UVM and conformance checks define the public purpose. Internal bytecode/native compilation and elaboration serve verification, not a separate Design or Synthesis stage. [Reviewed source](#source-readme).

SystemVerilog execution is conventional Verification. The authors identify AI agents as first-class core implementation contributors, giving defining AI-built provenance rather than AI Verification. [AI/stage evidence](#source-readme).
