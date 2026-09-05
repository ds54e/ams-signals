---
name: "EvoLDO-Bench"
aliases: ["EvoLDO","ldo_benchmark_for_agent"]
roles: ["benchmark"]
summary: "Separately evaluates LDO design reasoning and tool-assisted EDA work. Its v0.7 core contains 27 tool-free tasks, with paired comparisons using the same model with and without frozen knowledge context."
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
