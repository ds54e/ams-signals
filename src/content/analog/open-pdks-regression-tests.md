---
name: "Open-PDKs Regression Tests"
aliases: []
summary: "Executable DRC, LVS and parasitic-extraction regression suites for selected open PDKs."
description: "Executable DRC, LVS and parasitic-extraction regression suites for selected open PDKs. Make targets and Python checks compare positive and negative layouts with documented expectations and pinned extraction results; SKY130 includes runnable KLayout LVS, but coverage varies by process and agreement does not establish silicon accuracy."
scope:
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for correcting substrate-net handling in the parasitic-extraction comparison tools. The canonical scripts retain the PDK-specific substrate names and use them when comparing capacitance results."
  sources: [development-code-20261022, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public Make/Python implementation; IIC-OSIC-TOOLS, matching PDKs and selected extraction backends are required."
addedAt: "2026-10-22"
reviewedAt: '2026-11-24'
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/iic-jku/open-pdks-regression-tests"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/iic-jku/open-pdks-regression-tests/blob/3e2f87f46bb9d8be6f5e3763fc5ec574ff312c71/README.md"
  - id: "implementation-1"
    title: "Reviewed source: common.mk"
    url: "https://github.com/iic-jku/open-pdks-regression-tests/blob/3a97ca55bfbf482400f6b8d35f341b465303fe13/common.mk"
  - id: "implementation-2"
    title: "Reviewed source: ihp-sg13g2/pex_bench/README.md"
    url: "https://github.com/iic-jku/open-pdks-regression-tests/blob/3a97ca55bfbf482400f6b8d35f341b465303fe13/ihp-sg13g2/pex_bench/README.md"
  - id: "implementation-3"
    title: "Reviewed source: ihp-sg13cmos5l/pex_bench/README.md"
    url: "https://github.com/iic-jku/open-pdks-regression-tests/blob/3a97ca55bfbf482400f6b8d35f341b465303fe13/ihp-sg13cmos5l/pex_bench/README.md"
  - id: "implementation-4"
    title: "Reviewed source: gf180mcuD/pex_bench/README.md"
    url: "https://github.com/iic-jku/open-pdks-regression-tests/blob/3a97ca55bfbf482400f6b8d35f341b465303fe13/gf180mcuD/pex_bench/README.md"
  - id: "implementation-5"
    title: "Reviewed source: sky130A/pex_bench/README.md"
    url: "https://github.com/iic-jku/open-pdks-regression-tests/blob/3a97ca55bfbf482400f6b8d35f341b465303fe13/sky130A/pex_bench/README.md"
  - id: "implementation-6"
    title: "Reviewed source: ihp-sg13cmos5l/pex_bench/scripts/check_results.py"
    url: "https://github.com/iic-jku/open-pdks-regression-tests/blob/3a97ca55bfbf482400f6b8d35f341b465303fe13/ihp-sg13cmos5l/pex_bench/scripts/check_results.py"
  - id: sky130-lvs-run
    title: Upstream LVS run counts and environment
    url: https://github.com/iic-jku/open-pdks-regression-tests/commit/31e4bbb299c9d982e4b09d0997e1482982748589
  - id: sky130-lvs
    title: SKY130 KLayout LVS invocation and known failures
    url: https://github.com/iic-jku/open-pdks-regression-tests/blob/3e2f87f46bb9d8be6f5e3763fc5ec574ff312c71/sky130A/README.md
  - id: "activity"
    title: "Reviewed IHP PEX expected-data update for revised process coefficients"
    url: "https://github.com/iic-jku/open-pdks-regression-tests/commit/3e2f87f46bb9d8be6f5e3763fc5ec574ff312c71"
  - id: development-code-20261022
    title: Credited executable development contribution
    url: https://github.com/iic-jku/open-pdks-regression-tests/commit/52a58e1db8ec562b66a3d89a0470ef6fd9ec2381
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/iic-jku/open-pdks-regression-tests/blob/3a97ca55bfbf482400f6b8d35f341b465303fe13/ihp-sg13g2/pex_bench/scripts/compare_engines.py
  - id: pdkmaster
    title: "Related process-rule description and layout construction"
    url: "https://gitlab.com/Chips4Makers/PDKMaster"
---

### Implemented operations and boundaries

The regression separates KNOWN_FAILS, EXPECTED_FAILS and KNOWN_FALSE_PASSES, and distinguishes tool findings from execution breakdowns. SKY130 has a self-contained PEX bench and runnable KLayout LVS. Upstream reports 56 passes and 23 known failures across 79 cases on the 2026-10-22 IIC-OSIC-TOOLS nightly image with the revised wrapper; this is not full SKY130 DRC/LVS coverage or foundry signoff. [SKY130 regression settings](#source-sky130-lvs) · [Upstream run](#source-sky130-lvs-run). Pinned extraction results and deck arithmetic are not independent silicon calibration.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3); [Source 4](#source-implementation-4); [Source 5](#source-implementation-5); [Source 6](#source-implementation-6).

### Scope and activity review

The exposed operations support Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not set the internal runtime AI flag.

The November 23 implementation checkpoint updates expected IHP extraction results for PDK development revisions. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for correcting substrate-net handling in the parasitic-extraction comparison tools. The canonical scripts retain the PDK-specific substrate names and use them when comparing capacitance results. This supports AI-ASSISTED. [Credited change](#source-development-code-20261022) · [Retained implementation](#source-development-retained-20261022).

PDKMaster describes technology objects and generates circuits or geometry; this project executes regressions against selected PDK/tool combinations. Neither substitutes for the other. [Technology and layout construction](#source-pdkmaster).
