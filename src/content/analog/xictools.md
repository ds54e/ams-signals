---
name: "XicTools"
aliases: []
summary: "Integrated electronic-design tools combining Xic schematic and layout editing with WRspice circuit simulation."
description: "Integrated electronic-design tools combining Xic schematic and layout editing with WRspice circuit simulation. Xic supplies process-dependent design-rule checking and extraction, while the shared repository also maintains simulator and support components with platform-specific build and device-model requirements."
scope:
  design:
    ai: false
  simulation:
    ai: false
  layout:
    ai: false
access: "Public C/C++ implementation; supported GUI/build dependencies, technology files and device models are required."
addedAt: "2026-10-22"
reviewedAt: '2026-10-23'
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/wrcad/xictools"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/wrcad/xictools/blob/c1244c23a99118843db48cee9860218befe98753/README"
  - id: "implementation-1"
    title: "Reviewed source: xic/src/main/main.cc"
    url: "https://github.com/wrcad/xictools/blob/c1244c23a99118843db48cee9860218befe98753/xic/src/main/main.cc"
  - id: "activity"
    title: "Reviewed meaningful change: WRspice: exit mmjco REPL gracefully at end of file - PR 46"
    url: "https://github.com/wrcad/xictools/commit/54d16b5f20a470fdde1e3e7606292c31a8fccf8c"
  - id: website
    title: Official project website and documentation
    url: https://wrcad.com
    purpose: official
---

### Implemented operations and boundaries

Xic and WRspice are assessed as one canonical repository. Platform/build maintenance is meaningful activity but does not establish a new electrical-analysis capability in every component.

[Project overview](#source-readme); [Source 1](#source-implementation-1).

### Scope and activity review

The exposed operations support Design, Simulation, Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-10-07T13:06:56Z (`54d16b5f20a470fdde1e3e7606292c31a8fccf8c`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
