---
name: "xezim"
aliases: ["sisSIM"]
description: "Rust SystemVerilog simulator combining four-state event-driven execution, native compilation, UVM features and DPI/VPI interfaces. It translates HDL into an executable simulation representation and waveform traces, with public conformance tests tracking the behavior of implemented language features."
scope:
  verification:
    ai: false
  aiDevelopment: built
developmentEvidence:
  summary: "The maintainer describes AI agents implementing the parser, elaboration and event-driven simulation core through iterative coding and testing. The repository presents AI-assisted construction of core EDA software as its development premise."
  sources: ["development-1", "development-2"]
  reviewedAt: "2026-09-07"
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
  - id: "development-1"
    title: "Project premise"
    url: "https://github.com/aionhw/xezim/blob/409bc7724a130a6fa6052d663dfc97db113cae3e/README.md"
  - id: "development-2"
    title: "Maintainer account"
    url: "https://www.linkedin.com/posts/bondan-rufen_from-skeptic-to-believer-building-xezim-activity-7475570954924978176-DaAy"
---


### Implementation context

The authors explicitly describe AI agents as first-class contributors to the simulator implementation. This describes the development process, independently of whether a user runs an AI agent. [Reviewed source](#source-readme).

### Release boundary

UVM and language conformance reports describe tested cases, not complete IEEE compliance. The xezim-core dependency is not a second activity repository. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

SystemVerilog execution, UVM and conformance checks define the public purpose. Internal bytecode/native compilation and elaboration serve verification, not a separate Design or Synthesis stage. [Reviewed source](#source-readme).

SystemVerilog execution is conventional Verification. The authors identify AI agents as first-class core implementation contributors, giving AI-built provenance rather than AI Verification. [AI/stage evidence](#source-readme).

### Development provenance review

Reviewed 2026-09-07: **AI-BUILT**. The repository frames AI-assisted core-EDA construction as its premise, and the maintainer’s construction account describes agent-written parser, elaboration and event-driven/four-state simulator work. Together these establish a major implementation role in the defining core. [Project premise](#source-development-1); [Maintainer account](#source-development-2).
