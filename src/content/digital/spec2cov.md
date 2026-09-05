---
name: "Spec2Cov"
aliases: []
roles: ["agent"]
ai: "ai-enabled"
description: "Generates testbenches from specifications and feeds Verilator or Questa coverage back to an LLM to target uncovered RTL behavior."
flow: {"verification":"core"}
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


### Classification

LLMs produce and refine testbenches at runtime, making this AI-enabled. [Reviewed source](#source-readme).

### Release boundary

The README retains an older llm-verif clone example, but the verified canonical repository is advent-lab/Spec2Cov. Coverage closure is not formal proof. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Flow scope

Specification-driven testbench generation, simulator execution and coverage closure are verification tasks. Generated test stimulus is not an RTL design deliverable. [Reviewed source](#source-readme).
