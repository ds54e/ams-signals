---
name: ORDeC
description: Experimental custom-IC design platform using the ORD language with schematic, ngspice and layout workflows. A web interface and programmable design representation connect these operations; the project describes itself as a working demonstration of basic functions rather than a finished commercial-EDA replacement.
scope:
  design:
    ai: false
  simulation:
    ai: false
  layout:
    ai: false
access: Public Python source and development environment; PDK and simulator/layout dependencies are required.
addedAt: '2026-11-16'
reviewedAt: '2026-11-16'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/tub-msc/ordec
  purpose: code
- id: readme
  title: Reviewed workflow and access boundaries
  url: https://github.com/tub-msc/ordec/blob/897a2635ea661c2c35bf2c4de8d4d5b481a08dd8/README.md
- id: activity
  title: Reviewed first-parent integration of substantive implementation
  url: https://github.com/tub-msc/ordec/commit/1ce99ab763455eac674f8cc4e55ff1e6ca9fd31b
- id: implementation
  title: Reviewed implementation and validation change
  url: https://github.com/tub-msc/ordec/commit/d713f4e1b82bd69421ecfbb89ccc240f30d5b6e2
- id: retained
  title: Current implementation at review
  url: https://github.com/tub-msc/ordec/blob/897a2635ea661c2c35bf2c4de8d4d5b481a08dd8/src/ordec/lsp/analysis/parser_pass.py
summary: Experimental custom-IC design platform using the ORD language with schematic, ngspice and layout workflows.
---

### Implementation and selection

Compiler diagnostics and LSP regression improvements continue substantive development. Layout flow code and documented oscillator/resistor examples justify Layout independently of schematic drawing. [Workflow](#source-readme) · [Implementation change](#source-implementation) · [Retained code](#source-retained).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).
