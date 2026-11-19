---
name: ICE
description: "Experimental IC design environment with schematic capture, layout, ngspice and Python procedural geometry. Its shared C++ core supports native hierarchical GDSII/OASIS interchange and LVS against drawn schematics or text SPICE; SystemVerilog comparisons are port-level only. Formats and APIs can still change without migration support."
scope:
  design:
    ai: false
  simulation:
    ai: false
  layout:
    ai: false
access: Public source on the default dev branch; source builds and compatible PDK/simulator dependencies are required.
addedAt: '2026-11-16'
reviewedAt: '2026-11-19'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/ldapx/ice
  purpose: code
- id: readme
  title: Reviewed workflow and access boundaries
  url: https://github.com/ldapx/ice/blob/1005261b1436fb74371732225b72144a0677eccb/README.md
- id: activity
  title: "Hierarchical SPICE/HDL composition and netlist LVS regression tests"
  url: https://github.com/ldapx/ice/commit/e222cf370632a85bfdb5b64b4577e48c85a97524
- id: implementation
  title: "Native hierarchical GDSII/OASIS implementation and tests"
  url: https://github.com/ldapx/ice/commit/82110557bf00d5ce170aef26ef936b177727f046
- id: retained
  title: Current implementation at review
  url: https://github.com/ldapx/ice/blob/1005261b1436fb74371732225b72144a0677eccb/src/icelib/operations.cpp
summary: Experimental integrated IC design environment combining schematic capture, layout editing, ngspice simulation and Python procedural geometry.
---

### Implementation and selection

Recent hierarchical port-name netlisting and PDK initialization fixes include core regression tests. The actual default dev branch is the activity source; development capability is not presented as a stable release. [Workflow](#source-readme) · [Implementation change](#source-implementation) · [Retained code](#source-retained).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).

### November 19, 2026 review

The default development branch natively imports and exports hierarchical GDSII and OASIS without KLayout or an intermediate GDS file. GDSII references outside the internal orthogonal/mirror transform model flatten on import with a warning. The LVS comparator accepts recursively flattened SPICE subcircuits and checks HDL module ports, not functional equivalence. Source and regression cases were inspected, not independently executed. [Interchange](#source-implementation) · [Composition and LVS](#source-activity).
