---
name: "Surelog + UHDM"
aliases: []
primary: "frontend-synthesis"
ai: "traditional"
description: "SystemVerilog preprocessing, parsing and elaboration stack that exports UHDM design models and VPI access for downstream EDA tools."
keywords: ["SystemVerilog", "UHDM", "elaboration", "VPI"]
areas:
  frontend-synthesis: core
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

### Scope

Surelog constructs the elaborated representation; UHDM supplies the shared design model and APIs. This is one frontend stack with two related source repositories. [Project documentation](#source-readme).

### Classification

Tracked as conventional frontend infrastructure. Isolated AI co-authorship is insufficient to change the public relation label. [Reviewed source](#source-readme).

### Release boundary

Activity uses Surelog only, including its integration of a substantive UHDM enum-folding fix; UHDM commit counts are not added. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

[Related UHDM source](#source-uhdm).
