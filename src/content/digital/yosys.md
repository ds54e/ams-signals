---
name: "Yosys"
aliases: []
description: "RTL synthesis framework providing logic optimization, technology mapping and formal primitives for FPGA and ASIC flows."
flow: {"synthesis":"core","verification":"supporting"}
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


### Implementation context

The reusable synthesis framework supplies passes and formal primitives consumed by downstream flows. [Reviewed source](#source-readme).

### Release boundary

Full proof workflows are typically provided by downstream drivers such as SBY and EQY. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Flow scope

RTL optimization and technology mapping are synthesis operations. Formal transformations and solver-facing primitives support verification; full proof flows are usually orchestrated by separate drivers. [Reviewed source](#source-readme).
