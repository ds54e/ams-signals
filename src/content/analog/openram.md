---
name: "OpenRAM"
aliases: []
summary: "Transistor-level SRAM compiler generating circuit netlists, physical layouts and integration views for ASIC memory macros."
description: "Transistor-level SRAM compiler generating circuit netlists, physical layouts and integration views for ASIC memory macros. Its Python flow connects process-specific cell construction, DRC/LVS and SPICE timing/power characterization; supported technologies and external verification tools bound the generated macros."
scope:
  design:
    ai: false
  simulation:
    ai: false
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for implementing optional width-dependent transistor model lookup retained in the canonical generator. Current SKY130 profiles no longer declare the special narrow-NFET model after an upstream compatibility correction."
  sources: [development-code-20261022, development-retained-20261022]
  reviewedAt: '2026-10-31'
access: "Public Python implementation; supported technology ports, SPICE models and configured DRC/LVS/simulation tools are required."
addedAt: "2026-10-22"
reviewedAt: '2026-10-31'
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/VLSIDA/OpenRAM"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/VLSIDA/OpenRAM/blob/b2b069ce119d1488cbe6883b2240bceb5c7ce29a/README.md"
  - id: "implementation-1"
    title: "Reviewed source: compiler/sram.py"
    url: "https://github.com/VLSIDA/OpenRAM/blob/b2b069ce119d1488cbe6883b2240bceb5c7ce29a/compiler/sram.py"
  - id: "implementation-2"
    title: "Reviewed source: compiler/characterizer/charutils.py"
    url: "https://github.com/VLSIDA/OpenRAM/blob/b2b069ce119d1488cbe6883b2240bceb5c7ce29a/compiler/characterizer/charutils.py"
  - id: "implementation-3"
    title: "Reviewed source: compiler/verify/__init__.py"
    url: "https://github.com/VLSIDA/OpenRAM/blob/b2b069ce119d1488cbe6883b2240bceb5c7ce29a/compiler/verify/__init__.py"
  - id: "activity"
    title: "Reviewed meaningful change: Merge pull request #304 from ThVerg/fix-sky130-narrow-nfet-model"
    url: "https://github.com/VLSIDA/OpenRAM/commit/b2b069ce119d1488cbe6883b2240bceb5c7ce29a"
  - id: development-code-20261022
    title: Credited executable development contribution
    url: https://github.com/VLSIDA/OpenRAM/commit/1123f733bd7b3c399a92a715bdf7d59aed23cc90
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/VLSIDA/OpenRAM/blob/2f7b3866418ac1ce17ad959207a1489033d8c577/compiler/modules/ptx.py
  - id: website
    title: Official project website and documentation
    url: https://openram.org/
    purpose: official
  - id: review-20261031-models
    title: SKY130 profile correction after narrow-model LVS regressions
    url: https://github.com/VLSIDA/OpenRAM/commit/5e1a45d52bf1c5bbb808b188c4423c49dc67eec4
---

### Implemented operations and boundaries

The canonical default branch is stable. The curated domain is Analog because the reviewed contribution is transistor-level memory-macro construction, SPICE characterization and custom physical generation; no second Digital entry is added. This is not a general RTL synthesis or verification engine.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3).

### Scope and activity review

The exposed operations support Design, Simulation, Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The earlier checkpoint was 2026-08-16T17:01:32Z (`b2b069ce119d1488cbe6883b2240bceb5c7ce29a`). The current first-parent implementation checkpoint is the October 21 profile correction described below. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for implementing optional width-dependent transistor model lookup retained in the canonical generator. Current SKY130 profiles no longer declare the special narrow-NFET model after an upstream compatibility correction. This supports AI-ASSISTED; it does not establish that AI built most of the project. [Credited change](#source-development-code-20261022) · [Retained implementation](#source-development-retained-20261022).

The current stable first-parent history incorporates development history, so the former merge checkpoint is no longer on that lineage. The October 21 correction removes special narrow-NFET declarations from SKY130 profiles after the maintainer found incompatibility with the installed PDK. The credited generic `get_model_name()` implementation remains, falling back to the ordinary device model when profile keys are absent. This supports the existing AI-ASSISTED label without claiming the old SKY130 selection remains enabled. Upstream regression results were not independently reproduced. [Profile correction and retained lookup](#source-review-20261031-models).
