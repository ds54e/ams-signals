---
name: "GF180 Analog Agent"
aliases: []
summary: "Connects GF180MCU-D design skills to gm/ID data, ngspice evaluation and model-guided diagnosis."
description: "Agent skills for GF180MCU-D amplifier and RF design combine topology-specific gm/ID sizing with a FastAPI/ngspice simulation backend. Models inspect operating points, compare measured and analytical performance, diagnose specification misses and revise parameters; the release remains an early circuit-specific starter kit."
scope:
  design:
    ai: true
  simulation:
    ai: true
access: "MIT project code and MIT notices for imported CircuitCollector code. Requires the GF180MCU environment, ngspice, Python/FastAPI and notebooks; the documented IIC-OSIC-TOOLS setup and model-hosted skills are supplied separately."
addedAt: "2026-10-11"
reviewedAt: "2026-10-11"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/shoebNTU/analog-agent"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed default-branch revision"
    url: "https://github.com/shoebNTU/analog-agent/blob/25206f03046aefa093104e172cf511f5ad2fb8fe/README.md"
  - id: "agent-workflow"
    title: "Agent workflow"
    url: "https://github.com/shoebNTU/analog-agent/blob/25206f03046aefa093104e172cf511f5ad2fb8fe/AnalogAgent/skills/analog-amplifier/SKILL.md"
  - id: "simulation-interpretation"
    title: "Simulation interpretation"
    url: "https://github.com/shoebNTU/analog-agent/blob/25206f03046aefa093104e172cf511f5ad2fb8fe/AnalogAgent/skills/analog-amplifier/general/flow/simulation-verification.md"
  - id: "implemented-backend"
    title: "Implemented backend"
    url: "https://github.com/shoebNTU/analog-agent/blob/25206f03046aefa093104e172cf511f5ad2fb8fe/CircuitCollector/CircuitCollector/runner/simulation_runner.py"
  - id: "implementation-import"
    title: "Implementation import"
    url: "https://github.com/shoebNTU/analog-agent/commit/9de96b0ff403ab8e809ced4aa243a47fa29d369b"
  - id: "license"
    title: "License"
    url: "https://github.com/shoebNTU/analog-agent/blob/25206f03046aefa093104e172cf511f5ad2fb8fe/LICENSE"
---

## Implementation and Scope

GF180MCU-D agent skills couple topology-specific gm/ID sizing to a FastAPI/ngspice backend. The model reviews operating points, specification margins and analytical-versus-SPICE discrepancies. The reviewed implementation is described in the [README](#source-readme) and [Agent workflow](#source-agent-workflow), [Simulation interpretation](#source-simulation-interpretation), [Implemented backend](#source-implemented-backend).

A useful omission repair rather than an October announcement. Its GF180-specific amplifier/RF workflow adds actual backend, bridge, lookup and result-parser code. The June implementation remains inside the meaningful-activity window.

## Evidence and operating boundaries

Early, bounded starter kit; no layout or silicon-signoff claim. Model diagnosis/measurement interpretation supports AI Simulation independently of sizing feedback. The skill can estimate missing metrics from operating-point data, so measured and estimated values must remain distinguishable. No independently reproduced convergence results are claimed.

MIT project code and MIT notices for imported CircuitCollector code. Requires the GF180MCU environment, ngspice, Python/FastAPI and notebooks; the documented IIC-OSIC-TOOLS setup and model-hosted skills are supplied separately. See the [README](#source-readme) for setup and the linked source materials for their own terms.

## Reviewed public activity

The meaningful checkpoint is 9de96b0ff403ab8e809ced4aa243a47fa29d369b (2026-06-07 UTC), verified on the captured default branch's first-parent chain. The [implementation update](#source-implementation-import) supports the meaningful date; the latest head is separately retained for activity ordering.
