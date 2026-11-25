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
  sources: [activity-october, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public Python/scripts; the pinned Ubuntu toolchain, ASAP7 data and simulator/field-solver dependencies are required."
addedAt: "2026-10-22"
reviewedAt: '2026-11-25'
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
    title: "November 4 OLSim wrapped-netlist parsing correction"
    url: "https://github.com/vhdani04/OpenLayout/commit/7b25375228a288b3d4e2cb0a7e4d19f82504c85e"
  - id: activity-october
    title: "October ASAP7 trench-contact connectivity correction"
    url: "https://github.com/vhdani04/OpenLayout/commit/e27246513b606f67f59576d1963e3d4bbea4f9a8"
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/vhdani04/OpenLayout/blob/e27246513b606f67f59576d1963e3d4bbea4f9a8/klayout/python/openlayout_kl/asap7.py
  - id: olsim-parser
    title: "Retained continuation-line parsing implementation"
    url: "https://github.com/vhdani04/OpenLayout/blob/7b25375228a288b3d4e2cb0a7e4d19f82504c85e/python/openlayout/olsim/config.py"
  - id: olsim-regression
    title: "Retained wrapped-netlist regression test"
    url: "https://github.com/vhdani04/OpenLayout/blob/7b25375228a288b3d4e2cb0a7e4d19f82504c85e/tests/python/test_olsim.py"
  - id: lvs-variants
    title: "November 2 layout-variant LVS comparison"
    url: "https://github.com/vhdani04/OpenLayout/commit/7e4ccaf6b760b705b51b4b10f08b2e2c1a1b8d62"
  - id: pex-workers
    title: "November 2 bounded parallel PEX window workers"
    url: "https://github.com/vhdani04/OpenLayout/commit/cfea92a38b734d98fde3f4e6c0deb65f116ceecd"
---

### Implemented operations and boundaries

The documented hub, CLI and KLayout menu expose LVS and PEX operations. Extraction includes signal-wire/via resistance and FasterCap capacitances, while supply nets remain ideal and geometry contains calibration choices. ASAP7 support does not imply portable support for arbitrary PDKs.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3).

### Scope and activity review

The exposed operations support Design, Simulation, Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

October 13 corrects ASAP7 diffusion connectivity. November 2 adds layout-variant LVS handling and bounds parallel PEX workers by the number of pending extraction windows. November 4 corrects OLSim parsing of SPICE statements continued on a plus-prefixed line and adds a regression checking the parsed instance and cell name. These are substantive maintenance changes after the initial public release. The meaningful checkpoint is the November 4 commit, already included at the head of the existing activity capture. The changes are not claimed to be part of the earlier v0.4.0-alpha.2 release. [Earlier change](#source-activity-october) · [LVS](#source-lvs-variants) · [PEX](#source-pex-workers) · [Parser change](#source-activity) · [Retained parser](#source-olsim-parser) · [Regression](#source-olsim-regression).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for correcting ASAP7 diffusion connectivity through trench contacts. The canonical extractor retains the SDT layer and the corresponding source/drain-to-LISD connectivity rules. This supports AI-ASSISTED. [Credited change](#source-activity-october) · [Retained implementation](#source-development-retained-20261022).
