---
name: "LACE"
aliases: ["LLM-driven Augmentation of CPU Extensions"]
description: "LangGraph workflow that turns natural-language RISC-V instruction requirements into source-localized CPU RTL edits. Language-model agents also generate and repair instruction models and formal properties, while Verilator and riscv-formal/SymbiYosys supply tool-grounded checks for bounded design and verification loops."
scope:
  design:
    ai: true
  verification:
    ai: true
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited for adding a Verilator lint gate after arithmetic integration so invalid integrated CPUs halt before formal checks. The canonical project retains the gate and regression code."
  sources: ["development-implementation-20261018", "development-retained-20261018"]
  reviewedAt: '2026-10-18'
access: "Public source implementation; requires Python, target-core submodules, Verilator, an OSS CAD Suite formal toolchain and a configured LLM provider or local Codex CLI."
addedAt: "2026-09-18"
reviewedAt: "2026-10-18"
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
  - id: "model-writer"
    title: "LLM instruction-model generation, semantic review and repair"
    url: "https://github.com/UMN-ZhaoLab/LACE/blob/29ea8ed56eb5fce838815a0892c05b8162ece500/src/writers.py"
  - id: "formal-plan"
    title: "Agent-authored formal plans and verification-only property instrumentation"
    url: "https://github.com/UMN-ZhaoLab/LACE/blob/29ea8ed56eb5fce838815a0892c05b8162ece500/src/formal/effect_model.py"
  - id: "development-implementation-20261018"
    title: "AI-credited executable implementation"
    url: "https://github.com/UMN-ZhaoLab/LACE/commit/d2ceb8e6f4be39ec90b5d8bf83dd27f07f7eb929"
  - id: "development-retained-20261018"
    title: "Retained executable code at the reviewed canonical head"
    url: "https://github.com/UMN-ZhaoLab/LACE/blob/29ea8ed56eb5fce838815a0892c05b8162ece500/src/arithmetic_integrator.py"
---

### Design workflow

LACE decomposes an instruction contract, identifies source-level owners from CPU structure, plans localized changes and applies interface and arithmetic edits in run-local RTL workspaces. The released targets include several open RISC-V cores rather than one hard-coded example. [Reviewed source](#source-readme)

### Tool-grounded repair

Verilator and integration checks return diagnostics to the responsible RTL writer. Separately, `insn_model_writer` calls a language model to generate RVFI instruction models and formal-property bundles, validates their structure, requests semantic review and repairs them using formal counterexamples. Checkpoints and bounded retries preserve rejected candidates and failures. The effect-model implementation parses agent-selected proof plans and inserts agent-authored properties into private verification copies. [Model writer](#source-model-writer); [formal-plan implementation](#source-formal-plan).

### Scope classification

AI Design covers source-grounded CPU RTL planning, generation and repair. AI Verification covers generation, semantic review and repair of instruction reference models and formal properties. Verilator, riscv-formal and SymbiYosys still determine their own conventional tool results; the prefix records the implemented model role in verification artifacts, not an AI solver. Synthesis and Layout are not established. Runtime LLM use alone does not establish software-development provenance; the credited code contribution is assessed separately. [Model writer](#source-model-writer); [formal properties](#source-formal-plan).

### Current source review

Reviewed October 1, 2026 at `29ea8ed56eb5fce838815a0892c05b8162ece500`. The August 27 head remains current. Its workflow and formal-model repair changes are substantive; the model generates verification artifacts as well as editing the CPU RTL. [Current project source](#source-readme); [meaningful activity](#source-activity).

### Development provenance

Claude is credited for adding a Verilator lint gate after arithmetic integration so invalid integrated CPUs halt before formal checks. The canonical project retains the gate and regression code. This supports AI-assisted development without establishing that AI built most of the project. [AI-credited executable implementation](#source-development-implementation-20261018) · [Retained executable code at the reviewed canonical head](#source-development-retained-20261018).
