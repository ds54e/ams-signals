---
name: "openEMS"
aliases: []
summary: "Electromagnetic field solver using the EC-FDTD method, with Python and Octave/Matlab interfaces."
description: "Electromagnetic field solver using the EC-FDTD method, with Python and Octave/Matlab interfaces. Geometry, materials, excitations and ports define RF analyses and network responses; device or interconnect studies require explicit meshing and boundary setup rather than automatic foundry-qualified GDS extraction."
scope:
  simulation:
    ai: false
access: "Public C++/Python/Matlab implementation; CSXCAD and solver build/runtime dependencies are required."
addedAt: "2026-10-22"
reviewedAt: "2026-10-22"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/thliebig/openEMS"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/thliebig/openEMS/blob/11aa0638ec2c554d84fd77f71ba778d7fb2d6de9/README.md"
  - id: "implementation-1"
    title: "Reviewed source: python/openEMS/ports.py"
    url: "https://github.com/thliebig/openEMS/blob/11aa0638ec2c554d84fd77f71ba778d7fb2d6de9/python/openEMS/ports.py"
  - id: "implementation-2"
    title: "Reviewed source: main.cpp"
    url: "https://github.com/thliebig/openEMS/blob/11aa0638ec2c554d84fd77f71ba778d7fb2d6de9/main.cpp"
  - id: "activity"
    title: "Reviewed meaningful change: Write the VTK files without VTK"
    url: "https://github.com/thliebig/openEMS/commit/d9ca3b6a6359c7b04bf862adc59ed54fbd275bd4"
---

### Implemented operations and boundaries

Track the solver repository rather than summing openEMS-Project meta-repository activity. Geometry/materials come through CSXCAD and explicit ports/boundaries; IC passives and interconnects need modeling and mesh preparation. FDTD analysis does not establish physical-rule verification.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Simulation. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-10-20T23:46:26Z (`d9ca3b6a6359c7b04bf862adc59ed54fbd275bd4`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
