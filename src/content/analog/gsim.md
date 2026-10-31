---
name: "gsim"
aliases: []
summary: "Simulation interface connecting GDSFactory layouts to electromagnetic solvers through geometry, meshing and port setup."
description: "Connects GDSFactory layouts to electromagnetic solvers through PDK-derived geometry, meshing and multimode ports, including terminal S-parameter extraction. Optional FEMwell mode solving and DEVSIM-driven electro-optic workflows extend the analysis interface; local/cloud backends retain separate dependencies, and the package requires GDSFactory 9."
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
reviewedAt: "2026-10-31"
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
  - id: review-20261031-stack
    title: "PDK-authoritative layer-stack resolution for Palace and Meep"
    url: https://github.com/gdsfactory/gsim/commit/b5d858801191920ec502fe7a2bedfb4226abfe15
  - id: review-20261031-ports
    title: "Terminal S-parameters assembled from multimode wave-port runs"
    url: https://github.com/gdsfactory/gsim/blob/9f31460946f5c3f036fb91bc32a2ed1bc38245ce/src/gsim/palace/terminal_ports/assembly.py
  - id: review-20261031-electrooptic
    title: "Optional FEMwell adapter and TCAD-driven traveling-wave modulator workflow"
    url: https://github.com/gdsfactory/gsim/commit/16c7ac6a3d760570944dde79f018a0cc7cef9bc9
  - id: review-20261031-dependencies
    title: "Current dependency and optional-extra constraints"
    url: https://github.com/gdsfactory/gsim/blob/9f31460946f5c3f036fb91bc32a2ed1bc38245ce/pyproject.toml
---

### Implemented operations and boundaries

The reviewed pyproject is version 0.8.0 and requires gdsfactory>=9,<10 and gdsfactoryplus>=1.8.20,<3. These constraints matter because the separately reviewed core main is version 10. Local solver dependencies and authenticated cloud operations are separate paths.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Simulation. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The earlier meaningful checkpoint was 2026-10-22T11:57:19Z (`fe55668055bd3aaea944a4e8fde03a73f728cd1d`). It clips disconnected sidewall solids to the physical domain and rejects mesh nodes outside those bounds; the later 0.8.0 version bump does not independently renew meaningful activity. The current reviewed implementation checkpoint is the October 29 PDK-stack integration described below. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for implementing conversion from SParams to a scikit-rf Network. The canonical result adapter retains frequency-unit conversion and complex multiport matrix construction. This supports AI-ASSISTED; it does not establish that AI built most of the project. [Credited change](#source-development-code-20261022) · [Retained implementation](#source-development-retained-20261022).

The opt-in PDK-authoritative stack preserves layer elevation, thickness, material and mesh order instead of reconstructing them from generic assumptions. The Palace terminal-port pipeline joins driven-run modal S-parameters with aligned two-dimensional voltage/current matrices; its mode ordering and gauge requirements still apply. [Stack integration](#source-review-20261031-stack) · [Terminal assembly](#source-review-20261031-ports).

The optional FEMwell adapter and DEVSIM-based traveling-wave modulator examples add mode solving, carrier-dependent material transfer and electro-optic response calculations. These are implementation and example workflows, not independent validation against silicon. Version 0.8.0 still declares `gdsfactory>=9,<10` and `gdsfactoryplus>=1.8.20,<3`; installing optional extras and external solvers remains separate. [Electro-optic workflow](#source-review-20261031-electrooptic) · [Dependencies](#source-review-20261031-dependencies).
