---
name: "AnalogAgent"
summary: "Training-free multi-agent analog-circuit design loop with self-evolving memory and simulator feedback."
description: "Runs LLM agents that generate and revise analog-circuit solutions while a curator retains reusable lessons from executed attempts. The public MVP executes generated Python/PySpice against ngspice, checks task results, and feeds failures or measured outcomes back into the design loop."
scope:
  design:
    ai: true
  simulation:
    ai: false
targets: "Released analog-circuit problem set including amplifiers, op-amps, oscillators, PLLs, VCOs, mirrors, integrators and related blocks."
access: "MIT-licensed public MVP; requires Python, ngspice/PySpice, and configured model-provider access for real agent runs."
addedAt: "2026-09-18"
reviewedAt: "2026-09-18"
sources:
  - id: "code"
    title: "Canonical AnalogAgent repository"
    url: "https://github.com/TheWind-upBird/Analogagent"
    purpose: "code"
  - id: "paper"
    title: "AnalogAgent: Self-Evolving Agents for Analog Circuit Design"
    url: "https://arxiv.org/abs/2603.23910"
    purpose: "paper"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/TheWind-upBird/Analogagent/blob/b27ee9c0d11e0e74322e44e1ea45a7abbb1ff11a/README.md"
  - id: "activity"
    title: "Initial public MVP implementation"
    url: "https://github.com/TheWind-upBird/Analogagent/commit/cce309bb38eabe829860f85844c66a92907759dd"
---

### Execution loop

The released MVP separates generation, execution/checking, optimization, and memory curation. Generated circuit code is run through PySpice/ngspice, and the resulting task evidence is returned to the agents rather than treated as an LLM-only score. [Reviewed implementation](#source-readme)

### Release boundary

The repository is a compact MVP rather than a turnkey commercial analog flow. Its public problem set and simulator-backed loop establish the implemented research path; paper-reported benchmark results are not independently reproduced by the catalog. [Paper](#source-paper)

### Scope classification

LLM agents choose and revise circuit-design content, giving AI Design. PySpice/ngspice performs conventional numerical execution and task checks, so simulator feedback is recorded as Simulation without relabeling the solver itself as AI. [Reviewed source](#source-readme)
