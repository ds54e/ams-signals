---
name: "Spec2Cov"
aliases: []
roles: ["agent"]
primary: "formal-verification"
ai: "ai-enabled"
description: "Specification-driven testbench generation loop feeding Verilator or Questa coverage back to an LLM to target uncovered RTL behavior."
keywords: ["testbench generation", "coverage closure", "Verilator", "Questa"]
areas:
  formal-verification: core
  simulation: supporting
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical Spec2Cov repository"
    url: "https://github.com/advent-lab/Spec2Cov"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/advent-lab/Spec2Cov/blob/98ddc836668c81d116e0bb9a7faf8f56b2c58cdb/README.md"
  - id: "implementation"
    title: "Reviewed implementation: llm_verif/verilator.py"
    url: "https://github.com/advent-lab/Spec2Cov/blob/98ddc836668c81d116e0bb9a7faf8f56b2c58cdb/llm_verif/verilator.py"
  - id: "activity"
    title: "Merge remote-tracking branch 'origin/rag-integration' Merging Rag Branch to Main"
    url: "https://github.com/advent-lab/Spec2Cov/commit/98ddc836668c81d116e0bb9a7faf8f56b2c58cdb"
---

### Scope

Testbench generation, simulation and coverage feedback are implemented in the public workflow; the current main branch also integrates retrieval of design/specification context. [Project documentation](#source-readme).

### Classification

LLMs produce and refine testbenches at runtime, making this AI-enabled. [Reviewed source](#source-readme).

### Release boundary

The README retains an older llm-verif clone example, but the verified canonical repository is advent-lab/Spec2Cov. Coverage closure is not formal proof. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
