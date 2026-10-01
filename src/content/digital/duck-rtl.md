---
name: "Duck RTL"
aliases: ["duck-rtl"]
description: "Claude Code plugin and CLI for agent-authored Verilog, Python golden models and cocotb tests. Its packaged workflow gates each module with interface checks, Icarus compilation, co-simulation and AST-derived FSM analysis, while model-written tests and reference models remain reviewable inputs to those deterministic checks."
scope:
  design:
    ai: true
  verification:
    ai: true
access: "MIT-licensed public source; can run as a Claude Code plugin or standalone CLI with Python, Icarus Verilog and optional Graphviz."
addedAt: "2026-09-18"
reviewedAt: "2026-10-01"
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
  - id: "agent-workflow"
    title: "Packaged module-build and test-authoring workflow"
    url: "https://github.com/oniondas/duck-rtl/blob/fe9a66a80cdd7a64206d15929ffc3bd956b88dab/commands/duck-cosim.md"
  - id: "implementation"
    title: "Icarus/cocotb compilation and simulation gates"
    url: "https://github.com/oniondas/duck-rtl/blob/fe9a66a80cdd7a64206d15929ffc3bd956b88dab/src/cosim.py"
---

### Guarded agent loop

The documented workflow has a host coding agent write the Python reference model and Verilog while deterministic commands validate the architecture ledger, gate compilation, run cocotb co-simulation and inspect FSM structure. It can be used through a Claude Code plugin or as a standalone CLI for other agents. [Reviewed source](#source-readme)

### Verification boundary

Icarus, cocotb and AST-derived FSM checks produce the executable pass/fail or structural evidence. The agent authors the golden model and test stimulus and reacts to results; it does not replace tool verdicts with model judgment. The current extractor is intentionally restricted to Verilog-2001 syntax. [Reviewed source](#source-readme)

### Scope classification

The packaged command explicitly has the host model write RTL, a Python reference model and randomized cocotb assertions, then repair artifacts using tool feedback. This establishes AI Design and AI Verification. Icarus/cocotb verdicts and AST-derived FSM structure remain deterministic; the CLI can also be used without a model. [Agent workflow](#source-agent-workflow); [Execution gates](#source-implementation).

### Current-source review

Reviewed 2026-10-01. The optional FSM extractor accepts Verilog-2001, and its graph checks do not establish full functional correctness. A co-simulation pass establishes agreement with the supplied model and stimulus, whose adequacy still requires review. [Packaged workflow](#source-agent-workflow).
