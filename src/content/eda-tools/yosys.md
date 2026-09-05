---
name: "Yosys"
aliases: []
primary: "frontend-synthesis"
ai: "traditional"
description: "RTL synthesis framework providing logic optimization, technology mapping and formal primitives for FPGA and ASIC flows."
keywords: ["RTL synthesis", "mapping", "formal", "FPGA/ASIC"]
areas:
  frontend-synthesis: core
  formal-verification: supporting
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical Yosys repository"
    url: "https://github.com/YosysHQ/yosys"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/YosysHQ/yosys/blob/435977e97008578a4532da60e70f75b5e88d076d/README.md"
  - id: "implementation"
    title: "Reviewed implementation: techlibs/common/synth.cc"
    url: "https://github.com/YosysHQ/yosys/blob/435977e97008578a4532da60e70f75b5e88d076d/techlibs/common/synth.cc"
  - id: "activity"
    title: "Merge pull request #6176 from YosysHQ/nella/cell-rank"
    url: "https://github.com/YosysHQ/yosys/commit/435977e97008578a4532da60e70f75b5e88d076d"
  - id: "website"
    title: "Official project documentation"
    url: "https://yosyshq.readthedocs.io/projects/yosys/"
    purpose: "official"
---

### Scope

Technology-independent and target-specific synthesis passes are central; formal transformations and solver-facing primitives support verification flows. [Project documentation](#source-readme).

### Classification

Tracked as the established synthesis framework, not as a distinctively AI-built or AI-operated tool. [Reviewed source](#source-readme).

### Release boundary

Full proof workflows are typically provided by downstream drivers such as SBY and EQY. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
