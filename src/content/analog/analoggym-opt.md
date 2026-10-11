---
name: "AnalogGym-Opt"
aliases: []
summary: "Optimizes fixed-topology analog circuits with GRPO sizing and ngspice evaluation."
description: "Sizes fixed-topology amplifier and LDO circuits with a relational-GNN GRPO policy, multi-objective rewards and Pareto tracking, using ngspice and SKY130. Optional PVT proxies guide candidate selection before corner checks; released CLI, skills and MCP tools expose evaluation and optimization workflows."
scope:
  design:
    ai: true
  simulation:
    ai: false
access: "MIT. Python 3.10+, PyTorch, torch-geometric and ngspice; bundled SKY130 model resources and the documented environment must be configured. Claude skills and MCP wrappers are optional integration paths, not substitutes for the numerical engine."
addedAt: "2026-10-11"
reviewedAt: "2026-10-11"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/Computing-Intelligent-Decision-Team/AnalogGym-Opt"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed default-branch revision"
    url: "https://github.com/Computing-Intelligent-Decision-Team/AnalogGym-Opt/blob/10093e3496ef2c7d06494d91d131b0cc5de6c25b/README.md"
  - id: "grpo-implementation"
    title: "GRPO implementation"
    url: "https://github.com/Computing-Intelligent-Decision-Team/AnalogGym-Opt/blob/10093e3496ef2c7d06494d91d131b0cc5de6c25b/grpo.py"
  - id: "simulation-environment"
    title: "Simulation environment"
    url: "https://github.com/Computing-Intelligent-Decision-Team/AnalogGym-Opt/blob/10093e3496ef2c7d06494d91d131b0cc5de6c25b/AmpEnv.py"
  - id: "design-evaluator"
    title: "Design evaluator"
    url: "https://github.com/Computing-Intelligent-Decision-Team/AnalogGym-Opt/blob/10093e3496ef2c7d06494d91d131b0cc5de6c25b/tools/evaluate_design.py"
  - id: "integration-checkpoint"
    title: "Integration checkpoint"
    url: "https://github.com/Computing-Intelligent-Decision-Team/AnalogGym-Opt/commit/860c3e4996ff28d30205ecca433846313941341a"
  - id: "license"
    title: "License"
    url: "https://github.com/Computing-Intelligent-Decision-Team/AnalogGym-Opt/blob/10093e3496ef2c7d06494d91d131b0cc5de6c25b/LICENSE"
  - id: "paper"
    title: "AnalogGym-Opt IEEE TCAD paper"
    url: "https://ieeexplore.ieee.org/document/11690621"
    purpose: "paper"
---

## Implementation and Scope

A relational-GNN GRPO policy selects transistor-sizing actions using multi-objective rewards and Pareto tracking. ngspice evaluates SKY130 circuits; optional PVT surrogates guide candidate selection before full corner checks. The learned sizing policy is sufficient runtime AI evidence even without the optional LLM integration. The reviewed implementation is described in the [README](#source-readme) and [GRPO implementation](#source-grpo-implementation), [Simulation environment](#source-simulation-environment), [Design evaluator](#source-design-evaluator).

Adds a public learned optimization implementation with CLI, skills and MCP access. The released GRPO suite integrates 16 amplifier configurations and one LDO; six sensors and two voltage references are simulation-only paths.

## Evidence and operating boundaries

Topologies are fixed. The surrogate assists design selection; the numerical simulator and acceptance checks remain conventional. No Layout or separate AI Simulation tag is justified by the reviewed path. The imported 358,234-record dataset from 18 historical 22/180 nm topologies is not a SKY130 optimization success count. Published paper results were not reproduced.

MIT. Python 3.10+, PyTorch, torch-geometric and ngspice; bundled SKY130 model resources and the documented environment must be configured. Claude skills and MCP wrappers are optional integration paths, not substitutes for the numerical engine. See the [README](#source-readme) for setup and the linked source materials for their own terms.

## Reviewed public activity

The meaningful checkpoint is 860c3e4996ff28d30205ecca433846313941341a (2026-09-16 UTC), verified on the captured default branch's first-parent chain. The [implementation update](#source-integration-checkpoint) supports the meaningful date; the latest head is separately retained for activity ordering.
