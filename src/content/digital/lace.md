---
name: "LACE"
aliases: ["LLM-driven Augmentation of CPU Extensions"]
description: "LangGraph workflow that turns natural-language RISC-V instruction-extension requirements into source-localized RTL edits. Agents decompose the instruction, analyze CPU structure and write interface/datapath changes; Verilator checks and riscv-formal/SymbiYosys return deterministic evidence for bounded repair and formal-verification loops."
scope:
  design:
    ai: true
  verification:
    ai: false
access: "Public source implementation; requires Python, target-core submodules, Verilator, an OSS CAD Suite formal toolchain and a configured LLM provider or local Codex CLI."
addedAt: "2026-09-18"
reviewedAt: "2026-09-18"
sources:
  - id: "code"
    title: "Canonical LACE repository"
    url: "https://github.com/UMN-ZhaoLab/LACE"
    purpose: "code"
  - id: "paper"
    title: "LACE paper"
    url: "https://arxiv.org/abs/2608.02915"
    purpose: "paper"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/UMN-ZhaoLab/LACE/blob/29ea8ed56eb5fce838815a0892c05b8162ece500/README.md"
  - id: "activity"
    title: "Stabilize instruction integration workflow"
    url: "https://github.com/UMN-ZhaoLab/LACE/commit/29ea8ed56eb5fce838815a0892c05b8162ece500"
---

### Design workflow

LACE decomposes an instruction contract, identifies source-level owners from CPU structure, plans localized changes and applies interface and arithmetic edits in run-local RTL workspaces. The released targets include several open RISC-V cores rather than one hard-coded example. [Reviewed source](#source-readme)

### Tool-grounded repair

Verilator and integration checks return diagnostics to the responsible writer, while the formal stage generates an instruction/effect model and runs the selected riscv-formal strategy through SymbiYosys. Checkpoints and bounded retry budgets preserve partial evidence instead of silently treating a failed attempt as success. [Reviewed source](#source-readme)

### Scope classification

LLM agents make the RTL design changes, giving AI Design. Lint, simulation and formal tools determine verification verdicts and feed repair of the design; this deterministic evidence path is recorded as conventional Verification rather than AI Verification. [Reviewed source](#source-readme)
