---
name: "VeriRL"
aliases: ["veriRL"]
description: "OpenEnv environment for training and evaluating agents on synthesizable Verilog tasks. Agents write RTL and explicitly invoke Icarus compile/simulation, Yosys synthesis and optional SymbiYosys formal checks; deterministic EDA outputs and weighted scoring provide the environment's ground truth."
scope:
  design:
    ai: true
  synthesis:
    ai: false
  verification:
    ai: false
access: "Public source environment and training stack. Local grading needs Python, Icarus Verilog and Yosys, with SymbiYosys optional; model inference or RL training additionally needs the selected provider or training infrastructure."
addedAt: "2026-09-26"
reviewedAt: "2026-09-26"
sources:
  - id: "code"
    title: "Canonical VeriRL repository"
    url: "https://github.com/SupreethRao99/veriRL"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/SupreethRao99/veriRL/blob/8977306667df7fa449b9e84798fcbed8fac02fff/README.md"
  - id: "activity"
    title: "Tool-use SFT integration"
    url: "https://github.com/SupreethRao99/veriRL/commit/1fd9b16ba44ddf27b52a8f9156975cbae6387610"
---

### Environment loop

The action space lets an agent write one or more Verilog files and request compilation, simulation, synthesis, formal checks or submission. Each observation returns tool output, test counts, synthesis statistics and proof status for the next agent step. [Reviewed source](#source-readme)

### Ground-truth boundary

Icarus, Yosys and SymbiYosys determine the compile, functional, area/timing and proof evidence. The environment supplies rewards and task scoring from those outputs rather than replacing them with an LLM judge. [Reviewed source](#source-readme)

### Scope classification

The model writes and revises RTL, establishing AI Design. Synthesis and Verification are explicit user-facing operations, but their verdicts come from deterministic EDA tools, so those stages remain non-AI. [Reviewed source](#source-readme)
