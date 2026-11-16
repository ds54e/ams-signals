---
name: GmIdW
description: MOSFET characterization and lookup-table sizing using gm/Id or Id/W, with ngspice and ESPice integration. A Schemify plugin, Rust/WASM core and C++ interface expose sizing queries; operating-point definitions and derived capacitance or fT values differ between simulator backends.
scope:
  design:
    ai: false
  simulation:
    ai: false
access: Public source; the plugin requires Schemify, while characterization requires supported device models and a simulator.
addedAt: '2026-11-16'
reviewedAt: '2026-11-16'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/Scouren/GmIdW
  purpose: code
- id: readme
  title: Reviewed workflow and access boundaries
  url: https://github.com/Scouren/GmIdW/blob/69ee7a9cec2e24dacd72603403f975ff563afe75/README.md
- id: activity
  title: Reviewed first-parent integration of substantive implementation
  url: https://github.com/Scouren/GmIdW/commit/1545468f8eba34003acb32301ffd7a73acc04495
- id: implementation
  title: Reviewed implementation and validation change
  url: https://github.com/Scouren/GmIdW/commit/12ce8c8efe20c85d79a7c274e0f43d8aed5d302f
- id: retained
  title: Current implementation at review
  url: https://github.com/Scouren/GmIdW/blob/69ee7a9cec2e24dacd72603403f975ff563afe75/src/lut.rs
summary: MOSFET characterization and lookup-table sizing using gm/Id or Id/W, with ngspice and ESPice integration.
---

### Implementation and selection

Id/W inversion and sizing implementation extends earlier corner/voltage and PMOS fixes. The reviewed code and executable tests support active development, without treating documentation updates as meaningful activity. [Workflow](#source-readme) · [Implementation change](#source-implementation) · [Retained code](#source-retained).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).
