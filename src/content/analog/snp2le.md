---
name: "snp2le"
aliases: []
summary: "GUI and batch converter from Touchstone S-parameters to SPICE or VACASK circuit macromodels."
description: "GUI and batch converter from Touchstone S-parameters to SPICE or VACASK circuit macromodels. Vector fitting, optional passivity enforcement and structure-specific fitting support RF modeling, while fit bandwidth, model identifiability and optional thermal-noise conditions bound the exported approximation."
scope:
  simulation:
    ai: false
access: "Public Python implementation; scikit-rf and numerical packages are required, with PySide6 for the GUI and Xschem/simulators for optional testbench runs."
addedAt: "2026-10-22"
reviewedAt: "2026-10-22"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/iic-jku/snp2le"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/iic-jku/snp2le/blob/07a8222d52f25080274168eeed2fe27d064a268c/README.md"
  - id: "implementation-1"
    title: "Reviewed source: snp2le/cli.py"
    url: "https://github.com/iic-jku/snp2le/blob/07a8222d52f25080274168eeed2fe27d064a268c/snp2le/cli.py"
  - id: "implementation-2"
    title: "Reviewed source: snp2le/core/universal.py"
    url: "https://github.com/iic-jku/snp2le/blob/07a8222d52f25080274168eeed2fe27d064a268c/snp2le/core/universal.py"
  - id: "implementation-3"
    title: "Reviewed source: snp2le/core/noise.py"
    url: "https://github.com/iic-jku/snp2le/blob/07a8222d52f25080274168eeed2fe27d064a268c/snp2le/core/noise.py"
  - id: "activity"
    title: "Reviewed meaningful change: Merge pull request #30 from iic-jku/fix/cli-batch-and-fit-spread"
    url: "https://github.com/iic-jku/snp2le/commit/446e2b3b5c2cdfea4b508455a4470b77557f543c"
---

### Implemented operations and boundaries

The batch CLI and GUI share fitting and netlist-generation logic. Fitting is approximate and bandwidth/order-dependent. Optional thermal noise requires strict passivity; passive enforcement settings, extrapolation and poorly identified physical elements need review. Optional testbench execution requires Xschem and a simulator.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3).

### Scope and activity review

The exposed operations support Simulation. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-10-18T17:35:20Z (`446e2b3b5c2cdfea4b508455a4470b77557f543c`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
