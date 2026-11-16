---
name: ICE
description: Experimental integrated IC design environment combining schematic capture, layout editing, ngspice simulation and Python procedural geometry. GUI, CLI and MCP interfaces share a C++ core; the project is in early development and its file formats and APIs may change without migration support.
scope:
  design:
    ai: false
  simulation:
    ai: false
  layout:
    ai: false
access: Public source on the default dev branch; source builds and compatible PDK/simulator dependencies are required.
addedAt: '2026-11-16'
reviewedAt: '2026-11-16'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/ldapx/ice
  purpose: code
- id: readme
  title: Reviewed workflow and access boundaries
  url: https://github.com/ldapx/ice/blob/1005261b1436fb74371732225b72144a0677eccb/README.md
- id: activity
  title: Reviewed first-parent integration of substantive implementation
  url: https://github.com/ldapx/ice/commit/1005261b1436fb74371732225b72144a0677eccb
- id: implementation
  title: Reviewed implementation and validation change
  url: https://github.com/ldapx/ice/commit/1005261b1436fb74371732225b72144a0677eccb
- id: retained
  title: Current implementation at review
  url: https://github.com/ldapx/ice/blob/1005261b1436fb74371732225b72144a0677eccb/src/icelib/operations.cpp
summary: Experimental integrated IC design environment combining schematic capture, layout editing, ngspice simulation and Python procedural geometry.
---

### Implementation and selection

Recent hierarchical port-name netlisting and PDK initialization fixes include core regression tests. The actual default dev branch is the activity source; development capability is not presented as a stable release. [Workflow](#source-readme) · [Implementation change](#source-implementation) · [Retained code](#source-retained).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).
