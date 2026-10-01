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
reviewedAt: "2026-10-01"
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
  - id: "evaluation"
    title: "Fixed compilation, simulation, synthesis and formal grader"
    url: "https://github.com/SupreethRao99/veriRL/blob/8977306667df7fa449b9e84798fcbed8fac02fff/server/evaluator.py"
  - id: "environment"
    title: "Explicit action and episode control implementation"
    url: "https://github.com/SupreethRao99/veriRL/blob/8977306667df7fa449b9e84798fcbed8fac02fff/server/verirl_env_environment.py"
---

### Environment loop

The action space lets an agent write one or more Verilog files and request compilation, simulation, synthesis, formal checks or submission. Each observation returns tool output, test counts, synthesis statistics and proof status for the next agent step. [Reviewed source](#source-readme)

### Ground-truth boundary

Icarus, Yosys and SymbiYosys determine the compile, functional, area/timing and proof evidence. The environment supplies rewards and task scoring from those outputs rather than replacing them with an LLM judge. [Reviewed source](#source-readme)

### Scope classification

The model writes and revises RTL, establishing AI Design. Synthesis and Verification are explicit user-facing operations, but their verdicts come from deterministic EDA tools, so those stages remain non-AI. [Reviewed source](#source-readme)

### Current-source review

Reviewed 2026-10-01. The evaluated model task is synthesizable RTL implementation and revision. Tool selection exposes fixed compilation, simulation, synthesis and optional formal checks, but the reviewed action contract does not let the model author the grader, verification plan or synthesis script. AI Design therefore coexists with ordinary Synthesis and Verification. [Action contract](#source-readme); [Environment](#source-environment); [Grader](#source-evaluation).
