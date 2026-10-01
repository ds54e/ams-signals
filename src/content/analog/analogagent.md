---
name: "AnalogAgent"
summary: "Training-free multi-agent analog-circuit design loop with self-evolving memory and simulator feedback."
description: "Runs LLM agents that generate and revise analog circuits, diagnose simulation failures and interpret waveform images when available. The public MVP executes Python/PySpice with ngspice and retains reusable lessons from attempts to guide later design and repair."
scope:
  design:
    ai: true
  simulation:
    ai: true
targets: "Released analog-circuit problem set including amplifiers, op-amps, oscillators, PLLs, VCOs, mirrors, integrators and related blocks."
access: "MIT-licensed public MVP; requires Python, ngspice/PySpice, and configured model-provider access for real agent runs."
addedAt: "2026-09-18"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Canonical AnalogAgent repository"
    url: "https://github.com/TheWind-upBird/Analogagent"
    purpose: "code"
  - id: "paper"
    title: "AnalogAgent: Self-Improving Analog Circuit Design Automation with LLM Agents"
    url: "https://arxiv.org/abs/2603.23910"
    purpose: "paper"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/TheWind-upBird/Analogagent/blob/b27ee9c0d11e0e74322e44e1ea45a7abbb1ff11a/README.md"
  - id: "agents"
    title: "Model-driven simulation and waveform reflection"
    url: "https://github.com/TheWind-upBird/Analogagent/blob/b27ee9c0d11e0e74322e44e1ea45a7abbb1ff11a/agents.py"
  - id: "workflow"
    title: "Execution loop wiring for diagnosis and repair"
    url: "https://github.com/TheWind-upBird/Analogagent/blob/b27ee9c0d11e0e74322e44e1ea45a7abbb1ff11a/main_run.py"
  - id: "curator"
    title: "Failure diagnosis from logs and optional waveform images"
    url: "https://github.com/TheWind-upBird/Analogagent/blob/b27ee9c0d11e0e74322e44e1ea45a7abbb1ff11a/curator.py"
  - id: "activity"
    title: "Initial public MVP implementation"
    url: "https://github.com/TheWind-upBird/Analogagent/commit/cce309bb38eabe829860f85844c66a92907759dd"
---

### Execution loop

The released MVP separates generation, execution/checking, optimization, and memory curation. Generated circuit code is run through PySpice/ngspice. The execution loop passes failure logs and available waveform images to the curator for root-cause analysis, and its retry path invokes the optimizer's multimodal reflection before requesting repaired code. These model calls interpret simulator evidence rather than replacing numerical execution or deterministic checks. [Execution loop](#source-workflow) · [Optimizer](#source-agents) · [Curator](#source-curator)

### Release boundary

The repository is a compact MVP rather than a turnkey commercial analog flow. Its public problem set and simulator-backed loop establish the implemented research path; paper-reported benchmark results are not independently reproduced by the catalog. [Paper](#source-paper)

### Scope classification

LLM agents choose and revise circuit-design content, giving AI Design. The implemented model-driven diagnosis of simulation logs and waveform images also establishes AI Simulation; this is a separate interpretation layer around the conventional PySpice/ngspice solver. Image-based reflection is conditional on an available waveform, and the catalog has not reproduced the MVP's execution. [Diagnosis implementation](#source-agents) · [Failure-analysis prompt](#source-curator) · [Workflow wiring](#source-workflow)
