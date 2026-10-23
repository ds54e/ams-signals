---
name: "gsim"
aliases: []
summary: "Simulation interface connecting GDSFactory layouts to electromagnetic solvers through geometry, meshing and port setup."
description: "Simulation interface connecting GDSFactory layouts to electromagnetic solvers through geometry, meshing and port setup. Local and cloud workflows have backend-specific requirements, including GDSFactory+ dependencies; the reviewed package constrains GDSFactory to version 9 rather than supporting arbitrary current core releases."
scope:
  simulation:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for implementing conversion from SParams to a scikit-rf Network. The canonical result adapter retains frequency-unit conversion and complex multiport matrix construction."
  sources: [development-code-20261022, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public Python implementation; the declared GDSFactory/GDSFactory+ versions and selected local solver or cloud access are required."
addedAt: "2026-10-22"
reviewedAt: '2026-10-23'
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/gdsfactory/gsim"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/gdsfactory/gsim/blob/0b3a3a1c9d8e9e2fe54ff0e766a9b11064dfc97a/README.md"
  - id: "implementation-1"
    title: "Reviewed source: pyproject.toml"
    url: "https://github.com/gdsfactory/gsim/blob/30b1659f49e4e2ec3eac259aa9fc94abcb4c99be/pyproject.toml"
  - id: "implementation-2"
    title: "Reviewed source: src/gsim/palace/__init__.py"
    url: "https://github.com/gdsfactory/gsim/blob/0b3a3a1c9d8e9e2fe54ff0e766a9b11064dfc97a/src/gsim/palace/__init__.py"
  - id: "activity"
    title: "Reviewed meaningful change: contain disconnected sidewalls in the FDTD physical domain (#418)"
    url: "https://github.com/gdsfactory/gsim/commit/fe55668055bd3aaea944a4e8fde03a73f728cd1d"
  - id: development-code-20261022
    title: Credited executable development contribution
    url: https://github.com/gdsfactory/gsim/commit/d7a33127dcd4b1d18db2a0a05e2199ab457f86cf
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/gdsfactory/gsim/blob/0b3a3a1c9d8e9e2fe54ff0e766a9b11064dfc97a/src/gsim/palace/results.py
  - id: website
    title: Official project website and documentation
    url: https://gdsfactory.github.io/gsim/
    purpose: official
---

### Implemented operations and boundaries

The reviewed pyproject is version 0.8.0 and requires gdsfactory>=9,<10 and gdsfactoryplus>=1.8.20,<3. These constraints matter because the separately reviewed core main is version 10. Local solver dependencies and authenticated cloud operations are separate paths.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Simulation. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-10-22T11:57:19Z (`fe55668055bd3aaea944a4e8fde03a73f728cd1d`). It clips disconnected sidewall solids to the physical domain and rejects mesh nodes outside those bounds; the later 0.8.0 version bump does not independently renew meaningful activity. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for implementing conversion from SParams to a scikit-rf Network. The canonical result adapter retains frequency-unit conversion and complex multiport matrix construction. This supports AI-ASSISTED; it does not establish that AI built most of the project. [Credited change](#source-development-code-20261022) · [Retained implementation](#source-development-retained-20261022).
