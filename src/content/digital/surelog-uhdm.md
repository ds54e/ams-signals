---
name: "Surelog + UHDM"
aliases: []
description: "SystemVerilog preprocessing, parsing and elaboration stack that exports UHDM design models and VPI access for downstream EDA tools."
scope:
  design:
    level: core
    ai: false
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical Surelog + UHDM repository"
    url: "https://github.com/chipsalliance/Surelog"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/chipsalliance/Surelog/blob/e063fac2eac571f79f643503a256278bd19ae788/README.md"
  - id: "implementation"
    title: "Reviewed implementation: src/DesignCompile/CompileModule.cpp"
    url: "https://github.com/chipsalliance/Surelog/blob/e063fac2eac571f79f643503a256278bd19ae788/src/DesignCompile/CompileModule.cpp"
  - id: "activity"
    title: "Merge pull request #4165 from alaindargelas/uhdm_enum_const_fold"
    url: "https://github.com/chipsalliance/Surelog/commit/e063fac2eac571f79f643503a256278bd19ae788"
  - id: "uhdm"
    title: "UHDM model and APIs"
    url: "https://github.com/chipsalliance/UHDM"
---


### Implementation context

Tracked as conventional frontend infrastructure. Isolated AI co-authorship is insufficient to establish defining development provenance. [Reviewed source](#source-readme).

### Release boundary

Activity uses Surelog only, including its integration of a substantive UHDM enum-folding fix; UHDM commit counts are not added. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

[Related UHDM source](#source-uhdm).

### Scope classification

The combined entry produces a reusable elaborated design representation and exposes design-model APIs. Downstream synthesis, simulation and formal consumers do not make those independent core operations of Surelog/UHDM. [Reviewed source](#source-readme).

Elaboration and reusable UHDM design models are conventional Design infrastructure. Downstream consumers and incidental AI assistance do not create additional AI stages or defining AI-built provenance. [AI/stage evidence](#source-readme).
