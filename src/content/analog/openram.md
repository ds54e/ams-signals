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
  summary: "Claude is co-credited for correcting narrow SKY130 NFET model selection. The canonical transistor generator retains width-dependent model selection for emitted simulation and LVS netlists."
  sources: [development-code-20261022, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public Python implementation; supported technology ports, SPICE models and configured DRC/LVS/simulation tools are required."
addedAt: "2026-10-22"
reviewedAt: '2026-10-22'
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
    url: https://github.com/VLSIDA/OpenRAM/blob/b2b069ce119d1488cbe6883b2240bceb5c7ce29a/compiler/modules/ptx.py
---

### Implemented operations and boundaries

The canonical default branch is stable. The curated domain is Analog because the reviewed contribution is transistor-level memory-macro construction, SPICE characterization and custom physical generation; no second Digital entry is added. This is not a general RTL synthesis or verification engine.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3).

### Scope and activity review

The exposed operations support Design, Simulation, Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-08-16T17:01:32Z (`b2b069ce119d1488cbe6883b2240bceb5c7ce29a`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for correcting narrow SKY130 NFET model selection. The canonical transistor generator retains width-dependent model selection for emitted simulation and LVS netlists. This supports AI-ASSISTED; it does not establish that AI built most of the project. [Credited change](#source-development-code-20261022) · [Retained implementation](#source-development-retained-20261022).
