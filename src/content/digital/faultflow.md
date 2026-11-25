---
name: "FaultFlow"
aliases: []
description: "Digital-test flow for Yosys netlists with SAT-based ATPG, fault simulation, scan preparation and structural DFT checks. CLI and Tcl-shell operations generate patterns and transformed design artifacts, with supported cell libraries, clock protocols and masked cross-domain paths defining the current verification boundary."
scope:
  design:
    ai: false
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for repairing stalled SAT ATPG and multi-bit primary-input handling. The canonical ATPG implementation retains the real-input enumeration and launch/capture constraints."
  sources: [development-code-20261022, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public Python/native flow; Yosys, supported cell libraries and selected SAT/simulation dependencies are required."
addedAt: "2026-10-22"
reviewedAt: "2026-11-25"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/ranaumarnadeem/faultflow"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/ranaumarnadeem/faultflow/blob/45725dff360ce8a5242a6579d98bed8faeac8df3/README.md"
  - id: "implementation-1"
    title: "Reviewed source: faultflow/cli.py"
    url: "https://github.com/ranaumarnadeem/faultflow/blob/45725dff360ce8a5242a6579d98bed8faeac8df3/faultflow/cli.py"
  - id: "implementation-2"
    title: "Reviewed source: faultflow/shell/session.py"
    url: "https://github.com/ranaumarnadeem/faultflow/blob/45725dff360ce8a5242a6579d98bed8faeac8df3/faultflow/shell/session.py"
  - id: "activity"
    title: "Reviewed meaningful change: Merge pull request #2 from ranaumarnadeem/dev"
    url: "https://github.com/ranaumarnadeem/faultflow/commit/45725dff360ce8a5242a6579d98bed8faeac8df3"
  - id: development-code-20261022
    title: Credited executable development contribution
    url: https://github.com/ranaumarnadeem/faultflow/commit/bc8824f7ff2a26e2963c2deb42622482af7c73bc
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/ranaumarnadeem/faultflow/blob/45725dff360ce8a5242a6579d98bed8faeac8df3/src/core/atpg/progressive_atpg.cpp
  - id: website
    title: Official project website and documentation
    url: https://ranaumarnadeem.github.io/faultflow/
    purpose: official
  - id: slow-unload-fix
    title: "October 24 transition-fault scan unload correction"
    url: "https://github.com/ranaumarnadeem/faultflow/commit/182193ff5da329424ec5bfe65ed691362ab61276"
  - id: slow-unload-test
    title: "Retained scan protocol fault regression"
    url: "https://github.com/ranaumarnadeem/faultflow/blob/c734ee464d69a4b97c1278d4c1f5d81ecef6d813/tests/cpp/scan/test_scan_sequence.cpp"
  - id: constant-d-scan
    title: "October 29 constant-D flip-flop scan insertion"
    url: "https://github.com/ranaumarnadeem/faultflow/commit/aa34c10d164ae9c077ed9636b3cb6dcb404e41fa"
  - id: constant-d-tests
    title: "Retained constant-D scan insertion regressions"
    url: "https://github.com/ranaumarnadeem/faultflow/blob/c734ee464d69a4b97c1278d4c1f5d81ecef6d813/tests/python/scan/test_constant_d_flops.py"
---

### Implemented operations and boundaries

Scan preparation modifies design artifacts and supports Design; ATPG, fault simulation and structural DFT rules support Verification. Supported cell maps and clock protocols bound the flow, and masked cross-domain paths are outside the analyzed fault/test coverage. This project is unrelated to AUCOHL/Fault.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Design, Verification. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The earlier meaningful checkpoint was 2026-08-19T14:47:08Z (`45725dff360ce8a5242a6579d98bed8faeac8df3`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for repairing stalled SAT ATPG and multi-bit primary-input handling. The canonical ATPG implementation retains the real-input enumeration and launch/capture constraints. This supports AI-ASSISTED. [Credited change](#source-development-code-20261022) · [Retained implementation](#source-development-retained-20261022).

### Reviewed implementation update, November 25, 2026

October 24 corrects transition-fault grading so that a delay fault is inactive during slow scan unload, unlike a stuck-at fault. The retained regression distinguishes detection during the at-speed capture from a corruption visible only during unload. October 29 adds scan insertion for flip-flops whose D input is tied to a literal by synthesis, preserves the D-branch fault observation boundary, and aligns full-scan eligibility checks with the scan simulation path. These are concrete fault-model and insertion corrections; later benchmark documentation does not establish independently reproduced fault coverage. OpenTestability, autoMBIST and warptap remain separate implementations for testability/point insertion, memory self-test and test-access networks respectively. [Transition correction](#source-slow-unload-fix) · [Regression](#source-slow-unload-test) · [Scan insertion](#source-constant-d-scan) · [Tests](#source-constant-d-tests).

The selected meaningful checkpoint in the existing capture is 2026-10-29 UTC. Source and retained test code were inspected; no EDA, solver or regression run was independently performed.
