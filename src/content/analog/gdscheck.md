---
name: "gdscheck"
aliases: []
summary: "Experimental Rust design-rule checker for GDSII layouts with declarative YAML rule decks."
description: "Experimental Rust design-rule checker for GDSII layouts with declarative YAML rule decks. Its CLI runs selected checks and bundled process decks, while incomplete rule coverage and unqualified results limit its use to reviewed development and regression workflows."
scope:
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for correcting edge-piece classification at polygon walls. The canonical Rust implementation retains separate tolerances for labels and edge midpoints, with an executable regression."
  sources: [development-code-20261022, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public Rust implementation; a recent Rust toolchain and a matching rule deck are required."
addedAt: "2026-10-22"
reviewedAt: '2026-10-22'
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/aesc-silicon/gdscheck"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/aesc-silicon/gdscheck/blob/2100e66b5bad4bc6cb8ef0dc66db788022d19fb8/README.md"
  - id: "implementation-1"
    title: "Reviewed source: src/main.rs"
    url: "https://github.com/aesc-silicon/gdscheck/blob/2100e66b5bad4bc6cb8ef0dc66db788022d19fb8/src/main.rs"
  - id: "implementation-2"
    title: "Reviewed source: src/lib.rs"
    url: "https://github.com/aesc-silicon/gdscheck/blob/2100e66b5bad4bc6cb8ef0dc66db788022d19fb8/src/lib.rs"
  - id: "activity"
    title: "Reviewed meaningful change: pdks: ihp-sg13cmos5l reads no generated nBuLay"
    url: "https://github.com/aesc-silicon/gdscheck/commit/2100e66b5bad4bc6cb8ef0dc66db788022d19fb8"
  - id: development-code-20261022
    title: Credited executable development contribution
    url: https://github.com/aesc-silicon/gdscheck/commit/dee4df85c048ec054fa12d500ecb9525026d384b
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/aesc-silicon/gdscheck/blob/2100e66b5bad4bc6cb8ef0dc66db788022d19fb8/src/merge.rs
---

### Implemented operations and boundaries

The reviewed version identifies itself as experimental and explicitly disclaims tape-out qualification. Bundled decks for different processes have separate coverage and regression evidence.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-10-16T12:54:24Z (`2100e66b5bad4bc6cb8ef0dc66db788022d19fb8`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for correcting edge-piece classification at polygon walls. The canonical Rust implementation retains separate tolerances for labels and edge midpoints, with an executable regression. This supports AI-ASSISTED; it does not establish that AI built most of the project. [Credited change](#source-development-code-20261022) · [Retained implementation](#source-development-retained-20261022).
