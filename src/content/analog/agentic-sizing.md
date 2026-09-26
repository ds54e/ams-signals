---
name: "AgenticSizing"
summary: "Multi-agent LLM sizing framework with topology decomposition and Cadence-backed simulation."
description: "Decomposes an existing analog netlist into functional roles, then uses a planner and role-specialized LLM agents to propose device-parameter updates. A real Cadence backend evaluates committed candidates against typed specifications; deterministic mock simulation is also available for credential-free workflow tests."
scope:
  design:
    ai: true
  simulation:
    ai: false
targets: "Analog circuit sizing benchmarks, including larger designs reported with up to 55 transistors and 60 sizing variables."
access: "Apache-2.0 public research package. Python runs support a deterministic mock backend; real evaluation requires a configured model endpoint plus the user's licensed Cadence Virtuoso/Maestro environment and project assets."
addedAt: "2026-09-26"
reviewedAt: "2026-09-26"
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
---

### Sizing workflow

The released package analyzes an input netlist, builds functional-role context and coordinates planner and worker agents that propose bounded design-variable changes. The loop tracks predicted state separately from committed simulator evidence and can restore the best-known anchor. [Workflow](#source-readme) · [Implementation](#source-workflow)

### Simulation boundary

Real mode materializes a Cadence workspace and evaluates complete candidates through the configured backend; mock mode exists for deterministic smoke testing. Numerical execution and specification comparisons remain tool-produced evidence rather than LLM verdicts. [Reviewed source](#source-readme)

### Scope classification

LLM agents select sizing priorities and propose device-parameter changes, giving AI Design. Cadence or the injected simulation adapter supplies electrical results and pass/fail evidence conventionally, so Simulation remains non-AI. [Reviewed source](#source-readme)
