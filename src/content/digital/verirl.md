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
  aiDevelopment: built
developmentEvidence:
  summary: "Claude-credited initial implementation introduced VeriRL's environment, evaluator, client/server and agent loop; a further credited implementation added its RLVR training stack. These contributions establish a major role in the project's defining software."
  sources: ["development-audit-implementation", "development-audit-extension", "development-audit-retained"]
  reviewedAt: "2026-10-12"
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
  - id: "development-audit-implementation"
    title: "Reviewed AI-attributed implementation"
    url: "https://github.com/SupreethRao99/veriRL/commit/32dd37a8cd8a99f6c7f46ccff15044b7e90b0f78"
  - id: "development-audit-extension"
    title: "Reviewed coordinated implementation extension"
    url: "https://github.com/SupreethRao99/veriRL/commit/ac26982e7e1a791266496c3c00452be516a38a9c"
  - id: "development-audit-retained"
    title: "Retained implementation at the reviewed repository head"
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

### Development provenance

The initial attributed diff implements the step/reset/state environment and EDA feedback/reward paths, while the later campaign implements training configuration, curriculum, datasets, environment and trainer integration. Their scope spans the project's defining environment and training software. The label does not transfer to OpenEnv, TRL or the external EDA engines. [Implementation](#source-development-audit-implementation) · [Implementation](#source-development-audit-extension) · [Retained code](#source-development-audit-retained)
