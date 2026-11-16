---
name: vyges-char
description: Standard-cell timing characterization from SPICE netlists to Liberty NLDM models using ngspice sweeps. Separate macro support serializes supplied timing tables into Liberty; it does not automatically measure a complete SRAM, and generated libraries still require flow-specific validation.
scope:
  simulation:
    ai: false
access: Public Rust source; cell characterization needs ngspice, models and netlists. Macro export requires externally measured timing data.
addedAt: '2026-11-16'
reviewedAt: '2026-11-16'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/vyges-tools/char
  purpose: code
- id: readme
  title: Reviewed workflow and access boundaries
  url: https://github.com/vyges-tools/char/blob/f37564573069561614fd440bc0f527c9ae452ad0/README.md
- id: activity
  title: Reviewed first-parent integration of substantive implementation
  url: https://github.com/vyges-tools/char/commit/8437189cfef1d52070712dc66804a85e65aca18b
- id: implementation
  title: Reviewed implementation and validation change
  url: https://github.com/vyges-tools/char/commit/8437189cfef1d52070712dc66804a85e65aca18b
- id: retained
  title: Current implementation at review
  url: https://github.com/vyges-tools/char/blob/f37564573069561614fd440bc0f527c9ae452ad0/src/macro_cell.rs
summary: SPICE-based standard-cell timing characterization producing Liberty models.
---

### Implementation and selection

Simulator-pool work and macro Liberty implementation with golden readback tests show active development. Simulation records cell electrical characterization, not synthesis or a universal silicon-signoff claim. [Workflow](#source-readme) · [Implementation change](#source-implementation) · [Retained code](#source-retained).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).
