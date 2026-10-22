---
name: "rIC3"
aliases: []
description: "Hardware model checker with IC3/PDR, bounded and inductive engines over compiled transition systems. An optional experimental CIll workflow guides a language-model agent in proposing helper invariants and inspecting CTI traces; RTL preparation, reset assumptions and solver outcomes constrain that path."
scope:
  verification:
    ai: true
  aiDevelopment: assisted
developmentEvidence:
  summary: "Copilot is co-credited on the integrated sequential-correlation repair. The canonical transition-system implementation retains polarity-aware initialization handling when replacing latch variables."
  sources: [development-code-20261022, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public Rust implementation; model-format frontend and selected solver dependencies are required."
addedAt: "2026-10-22"
reviewedAt: '2026-10-22'
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/gipsyh/rIC3"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/gipsyh/rIC3/blob/8c6df1b7a8c217e157215e05348a7a04b5d2fbb2/README.md"
  - id: "implementation-1"
    title: "Reviewed source: src/cli/check.rs"
    url: "https://github.com/gipsyh/rIC3/blob/8c6df1b7a8c217e157215e05348a7a04b5d2fbb2/src/cli/check.rs"
  - id: "implementation-2"
    title: "Reviewed source: src/cli/build.rs"
    url: "https://github.com/gipsyh/rIC3/blob/8c6df1b7a8c217e157215e05348a7a04b5d2fbb2/src/cli/build.rs"
  - id: "implementation-3"
    title: "Reviewed source: src/cli/cill/mod.rs"
    url: "https://github.com/gipsyh/rIC3/blob/8c6df1b7a8c217e157215e05348a7a04b5d2fbb2/src/cli/cill/mod.rs"
  - id: "implementation-4"
    title: "Reviewed source: src/cli/cill/inductive.rs"
    url: "https://github.com/gipsyh/rIC3/blob/8c6df1b7a8c217e157215e05348a7a04b5d2fbb2/src/cli/cill/inductive.rs"
  - id: "implementation-5"
    title: "Reviewed source: CIll_SKILL.md"
    url: "https://github.com/gipsyh/rIC3/blob/8c6df1b7a8c217e157215e05348a7a04b5d2fbb2/CIll_SKILL.md"
  - id: "activity"
    title: "Reviewed meaningful change: wl-kind / wl-bmc: implement get_ctrl so the check CLI can run the word-level engines (#190)"
    url: "https://github.com/gipsyh/rIC3/commit/8c6df1b7a8c217e157215e05348a7a04b5d2fbb2"
  - id: development-code-20261022
    title: Credited executable development contribution
    url: https://github.com/gipsyh/rIC3/commit/423fe977fed7e4da565ae44f67614d86d6e56f6d
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/gipsyh/rIC3/blob/8c6df1b7a8c217e157215e05348a7a04b5d2fbb2/src/transys/others.rs
---

### Implemented operations and boundaries

Ordinary engines consume transition-system models. The optional experimental CIll skill directs a model-hosted agent to inspect CTI/CEX traces and propose helper invariants through implemented cill operations. Its Yosys-Slang frontend, cycle-zero reset assumption, restricted assertion syntax and local-inductiveness workflow are distinct from the conventional solver path; AI Verification identifies this optional workflow.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3); [Source 4](#source-implementation-4); [Source 5](#source-implementation-5).

### Scope and activity review

The exposed operations support Verification. The AI prefix describes the optional implemented model-hosted workflow or the explicitly evaluated AI task. It does not classify the conventional checker or numerical engine as AI.

The meaningful checkpoint is 2026-10-15T22:58:16Z (`8c6df1b7a8c217e157215e05348a7a04b5d2fbb2`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Copilot is co-credited on the integrated sequential-correlation repair. The canonical transition-system implementation retains polarity-aware initialization handling when replacing latch variables. This supports AI-ASSISTED; it does not establish that AI built most of the project. [Credited change](#source-development-code-20261022) · [Retained implementation](#source-development-retained-20261022).
