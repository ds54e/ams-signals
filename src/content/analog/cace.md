---
name: "CACE"
aliases: []
summary: "Characterization framework for analog and mixed-signal circuits, including condition sweeps, Monte Carlo analysis and datasheet generation."
description: "Characterization framework for analog and mixed-signal circuits, including condition sweeps, Monte Carlo analysis and datasheet generation. The maintained FOSSi implementation also orchestrates process-dependent DRC, LVS, antenna checks and extracted-netlist preparation through external simulation and layout tools."
scope:
  simulation:
    ai: false
  layout:
    ai: false
access: "Public Python implementation; ngspice, layout/checking tools and matching PDK data are required by the selected parameters."
addedAt: "2026-10-22"
reviewedAt: '2026-10-23'
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/fossi-foundation/cace"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/fossi-foundation/cace/blob/dedb5e0d30f5c286d36a1511b61fc81795bd24cf/README.md"
  - id: "implementation-1"
    title: "Reviewed source: cace/cace_cli.py"
    url: "https://github.com/fossi-foundation/cace/blob/dedb5e0d30f5c286d36a1511b61fc81795bd24cf/cace/cace_cli.py"
  - id: "implementation-2"
    title: "Reviewed source: cace/common/cace_regenerate.py"
    url: "https://github.com/fossi-foundation/cace/blob/dedb5e0d30f5c286d36a1511b61fc81795bd24cf/cace/common/cace_regenerate.py"
  - id: "implementation-3"
    title: "Reviewed source: cace/parameter/parameter_manager.py"
    url: "https://github.com/fossi-foundation/cace/blob/dedb5e0d30f5c286d36a1511b61fc81795bd24cf/cace/parameter/parameter_manager.py"
  - id: "implementation-4"
    title: "Reviewed source: cace/parameter/parameter_klayout_antenna.py"
    url: "https://github.com/fossi-foundation/cace/blob/dedb5e0d30f5c286d36a1511b61fc81795bd24cf/cace/parameter/parameter_klayout_antenna.py"
  - id: "implementation-5"
    title: "Reviewed source: cace/parameter/parameter_netgen_lvs.py"
    url: "https://github.com/fossi-foundation/cace/blob/dedb5e0d30f5c286d36a1511b61fc81795bd24cf/cace/parameter/parameter_netgen_lvs.py"
  - id: "activity"
    title: "Reviewed meaningful change: Updated the extraction script for magic when doing full R-C"
    url: "https://github.com/fossi-foundation/cace/commit/54928b7be865baa37cc5c03f1f3e8d2892750850"
  - id: website
    title: Official project website and documentation
    url: https://cace.readthedocs.io/en/latest/
    purpose: official
---

### Implemented operations and boundaries

The FOSSi repository is the maintained source. Registered parameters dispatch KLayout/Magic antenna and DRC checks, KLayout/Netgen LVS and ngspice characterization. Full-RC regeneration now uses extract do resistance and extract do unique instead of the older ext2sim path.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3); [Source 4](#source-implementation-4); [Source 5](#source-implementation-5).

### Scope and activity review

The exposed operations support Simulation, Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-09-23T16:34:55Z (`54928b7be865baa37cc5c03f1f3e8d2892750850`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
