---
name: "AgenticSizing"
summary: "Multi-agent LLM sizing framework with topology decomposition and Cadence-backed simulation."
description: "Uses a planner and role-specialized LLM agents to propose device-parameter updates and predict electrical metrics for an existing analog netlist. Provisional predictions guide the inner loop; a Cadence backend evaluates committed candidates against typed specifications, with deterministic mock simulation available for workflow tests."
scope:
  design:
    ai: true
  simulation:
    ai: true
targets: "Analog circuit sizing benchmarks, including larger designs reported with up to 55 transistors and 60 sizing variables."
access: "Apache-2.0 public research package. Python runs support a deterministic mock backend; real evaluation requires a configured model endpoint plus the user's licensed Cadence Virtuoso/Maestro environment and project assets."
addedAt: "2026-09-26"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Canonical AgenticSizing repository"
    url: "https://github.com/aprilaihub/agentic-analog-sizing"
    purpose: "code"
  - id: "paper"
    title: "AgenticSizing paper"
    url: "https://arxiv.org/abs/2609.25873"
    purpose: "paper"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/aprilaihub/agentic-analog-sizing/blob/d4b59e00bb54029e952b5a38d519ab34665dcc02/README.md"
  - id: "workflow"
    title: "LangGraph sizing workflow"
    url: "https://github.com/aprilaihub/agentic-analog-sizing/blob/d4b59e00bb54029e952b5a38d519ab34665dcc02/src/agentic_sizing/workflow/graph.py"
  - id: "activity"
    title: "Public research artifacts update"
    url: "https://github.com/aprilaihub/agentic-analog-sizing/commit/83e0621ad58da5195634a2cbc0e3764de0c5150c"
  - id: "performance-prediction"
    title: "Required absolute electrical-performance predictions"
    url: "https://github.com/aprilaihub/agentic-analog-sizing/blob/d4b59e00bb54029e952b5a38d519ab34665dcc02/src/agentic_sizing/iteration/iterative_worker.py"
  - id: "prediction-state"
    title: "Predicted performance participates in specification and stagnation checks"
    url: "https://github.com/aprilaihub/agentic-analog-sizing/blob/d4b59e00bb54029e952b5a38d519ab34665dcc02/src/agentic_sizing/workflow/nodes/apply_update.py"
  - id: "prediction-completion"
    title: "Predicted specification status controls simulator commits"
    url: "https://github.com/aprilaihub/agentic-analog-sizing/blob/d4b59e00bb54029e952b5a38d519ab34665dcc02/src/agentic_sizing/workflow/nodes/check_completion.py"
---

### Sizing workflow

The released package analyzes an input netlist, builds functional-role context and coordinates planner and worker agents that propose bounded design-variable changes. The loop tracks predicted state separately from committed simulator evidence and can restore the best-known anchor. [Workflow](#source-readme) · [Implementation](#source-workflow)

### Simulation boundary

Real mode materializes a Cadence workspace and evaluates complete candidates through the configured backend; mock mode exists for deterministic smoke testing. Numerical execution and specification comparisons remain tool-produced evidence rather than LLM verdicts. [Reviewed source](#source-readme)

### Scope classification

LLM agents select sizing priorities and parameter updates, giving AI Design. Workers also predict the complete electrical-performance vector; those predictions update the working state, determine unmet specifications and control simulator commits. That implemented performance-estimation operation gives AI Simulation. [Worker predictions](#source-performance-prediction) · [State update](#source-prediction-state) · [Commit control](#source-prediction-completion)

Predictions are provisional, not independently validated electrical results. Only the configured backend supplies authoritative committed simulation evidence; the numerical Cadence solver remains conventional. [Workflow boundary](#source-readme)
