---
name: neospice
description: C++ SPICE engine with C++/Python APIs for circuit analyses, parallel sweeps and gradient-based exploration. Published reference comparisons cover only part of its device-by-analysis matrix, so compatibility, numerical accuracy and reported speedups should be assessed for the intended circuit and analysis.
scope:
  simulation:
    ai: false
access: Public source; a supported C++ toolchain and optional Python dependencies are required.
addedAt: '2026-11-16'
reviewedAt: '2026-11-16'
sources:
- id: "official"
  title: "Official project website"
  url: "https://razorback16.github.io/neospice/"
  purpose: "official"
- id: code
  title: Canonical public implementation
  url: https://github.com/razorback16/neospice
  purpose: code
- id: readme
  title: Reviewed workflow and access boundaries
  url: https://github.com/razorback16/neospice/blob/2b5e53234796bfabd6e4ac47d52c12732bb47e2c/README.md
- id: activity
  title: Reviewed first-parent integration of substantive implementation
  url: https://github.com/razorback16/neospice/commit/3783d5bf4b19d9bfc7373b1bc4acb3d8e8aeece7
- id: implementation
  title: Reviewed implementation and validation change
  url: https://github.com/razorback16/neospice/commit/3783d5bf4b19d9bfc7373b1bc4acb3d8e8aeece7
- id: retained
  title: Current implementation at review
  url: https://github.com/razorback16/neospice/blob/2b5e53234796bfabd6e4ac47d52c12732bb47e2c/src/parser/netlist_parser.cpp
summary: C++ SPICE engine with C++/Python APIs for circuit analyses, parallel sweeps and gradient-based exploration.
---

### Implementation and selection

The parser correctness/performance work is substantive maintenance following broader API and solver development. Reference validation covers 89 of 198 device-analysis cells in the reviewed README, not universal ngspice equivalence. [Workflow](#source-readme) · [Implementation change](#source-implementation) · [Retained code](#source-retained).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).
