---
name: "Duck RTL"
aliases: ["duck-rtl"]
description: "Agent-oriented Verilog build-and-verify loop with deterministic guardrails: an architecture ledger, Icarus compile gate, cocotb co-simulation against a Python golden model, and AST-derived FSM checks and diagrams. The host coding agent writes design artifacts while Duck RTL enforces interfaces and tool verdicts."
scope:
  design:
    ai: true
  verification:
    ai: false
access: "MIT-licensed public source; can run as a Claude Code plugin or standalone CLI with Python, Icarus Verilog and optional Graphviz."
addedAt: "2026-09-18"
reviewedAt: "2026-09-18"
sources:
  - id: "code"
    title: "Canonical Duck RTL repository"
    url: "https://github.com/oniondas/duck-rtl"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/oniondas/duck-rtl/blob/fe9a66a80cdd7a64206d15929ffc3bd956b88dab/README.md"
  - id: "activity"
    title: "Restore plugin manifest, commands and skill"
    url: "https://github.com/oniondas/duck-rtl/commit/60289f9b7745fa3c8c051f3d51a28a52e0e9336d"
---

### Guarded agent loop

The documented workflow has a host coding agent write the Python reference model and Verilog while deterministic commands validate the architecture ledger, gate compilation, run cocotb co-simulation and inspect FSM structure. It can be used through a Claude Code plugin or as a standalone CLI for other agents. [Reviewed source](#source-readme)

### Verification boundary

Icarus, cocotb and AST-derived FSM checks produce the executable pass/fail or structural evidence. The agent may react to those results, but Duck RTL does not replace tool verdicts with model judgment. The current extractor is intentionally restricted to Verilog-2001 syntax. [Reviewed source](#source-readme)

### Scope classification

The documented plugin workflow delegates RTL creation to the host model, so AI materially participates in Design. Compile, co-simulation and FSM checks are deterministic Verification operations and remain non-AI. [Reviewed source](#source-readme)
