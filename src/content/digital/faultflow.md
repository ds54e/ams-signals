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
reviewedAt: '2026-10-23'
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
---

### Implemented operations and boundaries

Scan preparation modifies design artifacts and supports Design; ATPG, fault simulation and structural DFT rules support Verification. Supported cell maps and clock protocols bound the flow, and masked cross-domain paths are outside the analyzed fault/test coverage. This project is unrelated to AUCOHL/Fault.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Design, Verification. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-08-19T14:47:08Z (`45725dff360ce8a5242a6579d98bed8faeac8df3`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for repairing stalled SAT ATPG and multi-bit primary-input handling. The canonical ATPG implementation retains the real-input enumeration and launch/capture constraints. This supports AI-ASSISTED; it does not establish that AI built most of the project. [Credited change](#source-development-code-20261022) · [Retained implementation](#source-development-retained-20261022).
