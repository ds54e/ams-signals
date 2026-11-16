---
name: PREP-IC
description: Pad-ring and early floorplan planning for analog, mixed-signal and RF ICs. Python, CLI and GUI workflows import macros and export LibreLane inputs and bond plans; connectivity and placement checks assist planning but do not replace physical-design signoff.
scope:
  layout:
    ai: false
access: Public Python source with CLI and optional PySide6 GUI; supported PDK data is required.
addedAt: '2026-11-16'
reviewedAt: '2026-11-16'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/iic-jku/prep-ic
  purpose: code
- id: readme
  title: Reviewed workflow and access boundaries
  url: https://github.com/iic-jku/prep-ic/blob/cbf049eca0ea204a4e75b7b5b0385171a8224f97/README.md
- id: activity
  title: Reviewed first-parent integration of substantive implementation
  url: https://github.com/iic-jku/prep-ic/commit/7d1f4c6feb4d406f90230d1f38e397f192bf1fc3
- id: implementation
  title: Reviewed implementation and validation change
  url: https://github.com/iic-jku/prep-ic/commit/7cec2909598d3261a954d6b081fb4a60310bb45a
- id: retained
  title: Current implementation at review
  url: https://github.com/iic-jku/prep-ic/blob/cbf049eca0ea204a4e75b7b5b0385171a8224f97/src/prep_ic/model/layout.py
summary: Pad-ring and early floorplan planning for analog, mixed-signal and RF ICs.
---

### Implementation and selection

Bond routing and power-pad fixes with regression tests establish active iteration. Supported PDK integrations are not equivalent to complete signoff qualification; power-domain split support varies. [Workflow](#source-readme) · [Implementation change](#source-implementation) · [Retained code](#source-retained).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).
