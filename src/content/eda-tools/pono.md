---
name: "Pono"
aliases: []
primary: "formal-verification"
ai: "traditional"
description: "Extensible SMT-based model checker for safety and liveness properties, with bounded, inductive and IC3-style algorithms."
keywords: ["model checking", "SMT", "IC3/PDR", "liveness"]
areas:
  formal-verification: core
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical Pono repository"
    url: "https://github.com/stanford-centaur/pono"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/stanford-centaur/pono/blob/059f9b826847aa42a75b7e90aa0aeec78287645a/README.md"
  - id: "implementation"
    title: "Reviewed implementation: engines/kliveness.cpp"
    url: "https://github.com/stanford-centaur/pono/blob/059f9b826847aa42a75b7e90aa0aeec78287645a/engines/kliveness.cpp"
  - id: "activity"
    title: "build: Pin smt-switch and fmt by commit hash (#614)"
    url: "https://github.com/stanford-centaur/pono/commit/059f9b826847aa42a75b7e90aa0aeec78287645a"
  - id: "paper"
    title: "Author paper"
    url: "https://doi.org/10.1007/978-3-032-26220-2_1"
    purpose: "paper"
  - id: "results"
    title: "Author-reported results"
    url: "https://doi.org/10.5281/zenodo.18680797"
    purpose: "results"
---

### Scope

Transition-system checking, safety engines and liveness reductions are implemented in the public C++ code. [Project documentation](#source-readme).

### Classification

Pono remains Traditional. Recent individual AI co-authored changes do not establish AI as its distinctive build process or runtime. [Reviewed source](#source-readme).

### Release boundary

The reviewed build pinning fixes deterministic dependency resolution; this is manually assessed technical maintenance, not automated version churn. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
