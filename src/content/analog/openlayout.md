---
name: "OpenLayout"
aliases: []
summary: "Custom-IC environment connecting xschem, ngspice, KLayout and FasterCap through a shared workspace and command interface."
description: "Custom-IC environment connecting xschem, ngspice, KLayout and FasterCap through a shared workspace and command interface. It exposes schematic editing, simulation, DRC, LVS and post-layout netlisting for ASAP7, with calibrated extraction geometry and idealized supply nets limiting the current flow."
scope:
  design:
    ai: false
  simulation:
    ai: false
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for correcting ASAP7 diffusion connectivity through trench contacts. The canonical extractor retains the SDT layer and the corresponding source/drain-to-LISD connectivity rules."
  sources: [activity, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public Python/scripts; the pinned Ubuntu toolchain, ASAP7 data and simulator/field-solver dependencies are required."
addedAt: "2026-10-22"
reviewedAt: '2026-10-22'
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/vhdani04/OpenLayout"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/vhdani04/OpenLayout/blob/e27246513b606f67f59576d1963e3d4bbea4f9a8/README.md"
  - id: "implementation-1"
    title: "Reviewed source: klayout/python/openlayout_kl/pex.py"
    url: "https://github.com/vhdani04/OpenLayout/blob/e27246513b606f67f59576d1963e3d4bbea4f9a8/klayout/python/openlayout_kl/pex.py"
  - id: "implementation-2"
    title: "Reviewed source: docs/LVS.md"
    url: "https://github.com/vhdani04/OpenLayout/blob/e27246513b606f67f59576d1963e3d4bbea4f9a8/docs/LVS.md"
  - id: "implementation-3"
    title: "Reviewed source: docs/PEX.md"
    url: "https://github.com/vhdani04/OpenLayout/blob/e27246513b606f67f59576d1963e3d4bbea4f9a8/docs/PEX.md"
  - id: "activity"
    title: "Reviewed meaningful change: Connectivity: LISD reaches diffusion only through SDT, as in LVS"
    url: "https://github.com/vhdani04/OpenLayout/commit/e27246513b606f67f59576d1963e3d4bbea4f9a8"
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/vhdani04/OpenLayout/blob/e27246513b606f67f59576d1963e3d4bbea4f9a8/klayout/python/openlayout_kl/asap7.py
---

### Implemented operations and boundaries

The documented hub, CLI and KLayout menu expose LVS and PEX operations. Extraction includes signal-wire/via resistance and FasterCap capacitances, while supply nets remain ideal and geometry contains calibration choices. ASAP7 support does not imply portable support for arbitrary PDKs.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3).

### Scope and activity review

The exposed operations support Design, Simulation, Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-10-13T03:22:11Z (`e27246513b606f67f59576d1963e3d4bbea4f9a8`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for correcting ASAP7 diffusion connectivity through trench contacts. The canonical extractor retains the SDT layer and the corresponding source/drain-to-LISD connectivity rules. This supports AI-ASSISTED; it does not establish that AI built most of the project. [Credited change](#source-activity) · [Retained implementation](#source-development-retained-20261022).
