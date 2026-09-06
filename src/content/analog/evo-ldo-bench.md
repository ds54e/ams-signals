---
name: "EvoLDO-Bench"
aliases: ["EvoLDO","ldo_benchmark_for_agent"]
summary: "Benchmarks LDO reasoning separately from controlled SKY130/ngspice circuit-repair and tool-agent tasks."
description: "Benchmarks LLM reasoning about low-dropout regulators (LDOs), with separate SKY130/ngspice tasks for circuit edits, simulation setup and failure diagnosis. The reasoning track grades structured answers without tools; controlled tool tracks also evaluate execution and evidence handling."
scope:
  design:
    ai: true
  simulation:
    ai: true
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

### Scope classification

LDO reasoning, diagnosis and sizing/planning are the main tasks. Simulation covers the separate SKY130/ngspice tool track, which explicitly tests circuit closure and simulator operation; the reasoning track remains tool-free. [Reviewed source](#source-review).

Model inference answers the central circuit-reasoning tasks, giving AI Design. In the separate tool-agent track, the model repairs simulation configuration, diagnoses evidence-bound failures and selects controlled runs; that limited track justifies AI Simulation without changing the reasoning-only contract. [Reasoning runner](#source-review) · [Tool-agent diagnosis contract](#source-tools).
