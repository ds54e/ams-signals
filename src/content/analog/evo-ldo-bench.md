---
name: "EvoLDO-Bench"
aliases: ["EvoLDO","ldo_benchmark_for_agent"]
roles: ["benchmark"]
summary: "Benchmarks LDO reasoning separately from controlled SKY130/ngspice circuit-repair and tool-agent tasks."
description: "Tests LDO constraint calculations, diagnosis, and workflow planning through structured reasoning answers. Separate circuit and tool-agent tracks let a model edit a SKY130 DUT, run controlled ngspice calls, and receive grades for circuit closure and EDA operations."
keywords: ["LDO", "Reasoning", "ngspice", "SKY130", "Separate tool track"]
workflow:
  reasoning: core
  generate-edit: supporting
  simulate-measure: supporting
  optimize: supporting
targets: "LDO constraint calculations, diagnosis, workflow planning, and SKY130 circuit repair"
access: "Task packages, structured answer contracts, graders, and runners are public. Tool tracks additionally require a fixed SKY130 revision, ngspice, and an evaluator isolated from the model workspace."
notice: "The reasoning track does not run SPICE. This is a public development benchmark; formal rankings still require hidden isomorphic variants and independent expert review."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Public repository"
    url: "https://github.com/jialinlu/ldo_benchmark_for_agent"
    purpose: "code"
  - id: "review"
    title: "v0.7.0 README: reasoning tasks, knowledge treatments, and scope"
    url: "https://github.com/jialinlu/ldo_benchmark_for_agent/blob/fa54a6615dd0dc26ea19fd28d7ae3433f92768ff/README.md"
  - id: "tools"
    title: "Six SKY130/ngspice EDA tool-agent tasks"
    url: "https://github.com/jialinlu/ldo_benchmark_for_agent/blob/fa54a6615dd0dc26ea19fd28d7ae3433f92768ff/docs/EDA_TOOL_AGENT_TRACK_ZH.md"
---
### Reasoning track

Models submit structured calculations, evidence classifications, constraints, and operation sequences. Grading permits local partial credit but caps scores for critical physical errors. Knowledge context is retrieved and frozen by the runner; the answering model receives no web or execution tools. [v0.7 contract](#source-review)

### Tool tracks

Six EDA tool-agent tasks supplement the earlier circuit-design tasks. The model edits the DUT and run configuration, then calls controlled ngspice interfaces. Grading separates circuit closure, EDA operations, evidence integrity, and tool efficiency. Final qualification is hidden from the model. [Tool contract](#source-tools)

### Reported status

Developers report native ngspice 46 replay of reference candidates; this is not an LLM performance result. The public repository contains evaluator-side artifacts that must not be mounted into official model workspaces. Expert review and release qualification remain distinct from implementation and reference replay. [Status and trust boundary](#source-tools)

### Landscape scope

Reasoning is core to the 27-task tool-free track. Supporting generation/editing, simulation, and optimization marks refer only to the separate circuit/tool tracks, where the model can edit the DUT and use controlled ngspice calls. They do not grant tools to reasoning-track models or turn developer reference replay into model results. [Reasoning](#source-review) · [Tool contract](#source-tools)
