---
name: "Open-PDKs Regression Tests"
aliases: []
summary: "Executable DRC, LVS and parasitic-extraction regression suites for selected open PDKs."
description: "Executable DRC, LVS and parasitic-extraction regression suites for selected open PDKs. Make targets and Python checks compare positive and negative layouts with documented expectations and pinned extraction results; coverage varies by process, and agreement does not establish silicon accuracy."
scope:
  layout:
    ai: false
access: "Public Make/Python implementation; IIC-OSIC-TOOLS, matching PDKs and selected extraction backends are required."
addedAt: "2026-10-22"
reviewedAt: "2026-10-22"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/iic-jku/open-pdks-regression-tests"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/iic-jku/open-pdks-regression-tests/blob/3a97ca55bfbf482400f6b8d35f341b465303fe13/README.md"
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
  - id: "activity"
    title: "Reviewed meaningful change: ihp-sg13g2, ihp-sg13cmos5l: add sg13_cmomf, put the MOM pins on stubs"
    url: "https://github.com/iic-jku/open-pdks-regression-tests/commit/3a97ca55bfbf482400f6b8d35f341b465303fe13"
---

### Implemented operations and boundaries

The regression separates KNOWN_FAILS, EXPECTED_FAILS and KNOWN_FALSE_PASSES, and distinguishes tool findings from execution breakdowns. SKY130 has a self-contained PEX bench but no completed DRC/LVS suite. Pinned extraction results and deck arithmetic are not independent silicon calibration.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3); [Source 4](#source-implementation-4); [Source 5](#source-implementation-5); [Source 6](#source-implementation-6).

### Scope and activity review

The exposed operations support Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-10-20T15:10:39Z (`3a97ca55bfbf482400f6b8d35f341b465303fe13`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
