---
name: "analog-agents"
summary: "Role-separated skill framework for analog architecture, design, verification, and sign-off."
description: "Coordinates architect, designer and verifier agents across architecture decomposition, behavioral modeling, transistor-level design, pre-simulation review, Spectre verification, integration and PVT sign-off. Virtuoso bridge operations, iteration logs, cross-model review and a reusable design-knowledge wiki support the agent workflow."
scope:
  design:
    ai: true
  simulation:
    ai: true
access: "Public skill framework. Review mode can run without EDA; the full path requires configured servers plus the user's Virtuoso/Spectre environment, and optional external model endpoints for cross-model review."
addedAt: "2026-09-26"
reviewedAt: "2026-09-26"
sources:
  - id: "official"
    title: "analog-agents project site"
    url: "https://arcadia-1.github.io/analog-agents/"
    purpose: "official"
  - id: "code"
    title: "Canonical analog-agents repository"
    url: "https://github.com/Arcadia-1/analog-agents"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/Arcadia-1/analog-agents/blob/4d6bd218ceff60624d7ee62887787aa83daecdb4/README.md"
  - id: "pipeline"
    title: "Analog pipeline skill"
    url: "https://github.com/Arcadia-1/analog-agents/blob/4d6bd218ceff60624d7ee62887787aa83daecdb4/skills/analog-pipeline/SKILL.md"
  - id: "activity"
    title: "Analog netlist-crawl implementation update"
    url: "https://github.com/Arcadia-1/analog-agents/commit/771d27d3b0b939b916f819ae375469cda892eb24"
---

### Agent roles

The pipeline assigns architecture and testbench ownership to an architect, transistor-level circuit work to a designer and pre-simulation review plus electrical verification to a verifier. Behavioral validation and integration precede an L3 PVT sign-off gate in full EDA mode. [Pipeline](#source-pipeline)

### EDA boundary

The orchestrator itself sequences skills; the verifier owns simulation, measurement review and quantified margin reporting. Without configured EDA servers the workflow switches to review-only mode and does not claim simulation-verified delivery. [Reviewed source](#source-pipeline)

### Scope classification

Models make architecture, sizing and circuit-revision decisions, giving AI Design. The verifier agent also interprets simulation outcomes, diagnoses failures and routes quantified fixes around Spectre execution, which makes the Simulation stage AI-participating even though the solver remains conventional. [Reviewed source](#source-readme)
