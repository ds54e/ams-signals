---
summary: "Programmable C++ SPICE engine with a browser schematic editor."
name: neospice
description: "C++ SPICE engine with C++/Python analysis APIs and a browser Circuit Lab for editing schematics, probes and saved projects. The editor exports runnable netlists, while parallel sweeps and gradient APIs support circuit exploration; published reference comparisons cover only part of the device-by-analysis matrix."
scope:
  design:
    ai: false
  simulation:
    ai: false
access: "Public source; the engine requires a supported C++ toolchain, with optional Python dependencies and a separate browser frontend build."
addedAt: '2026-11-16'
reviewedAt: "2026-11-24"
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
  url: https://github.com/razorback16/neospice/blob/0f1841250088d2de118c15e190aee2d2aa9aea28/README.md
- id: activity
  title: Reviewed first-parent integration of substantive implementation
  url: https://github.com/razorback16/neospice/commit/3783d5bf4b19d9bfc7373b1bc4acb3d8e8aeece7
- id: implementation
  title: Reviewed implementation and validation change
  url: https://github.com/razorback16/neospice/commit/3783d5bf4b19d9bfc7373b1bc4acb3d8e8aeece7
- id: retained
  title: Current implementation at review
  url: https://github.com/razorback16/neospice/blob/2b5e53234796bfabd6e4ac47d52c12732bb47e2c/src/parser/netlist_parser.cpp
- id: review-20261124-editor
  title: "Schematic document editing, persistence and netlist export"
  url: https://github.com/razorback16/neospice/blob/0f1841250088d2de118c15e190aee2d2aa9aea28/web/src/App.tsx
- id: review-20261124-capabilities
  title: "Current analysis and validation coverage"
  url: https://github.com/razorback16/neospice/blob/0f1841250088d2de118c15e190aee2d2aa9aea28/docs/capabilities.md
---

### Implementation and selection

The parser correctness/performance work is substantive maintenance following broader API and solver development. Published device-analysis comparisons are partial coverage, not universal ngspice equivalence. [Workflow](#source-readme) · [Implementation change](#source-implementation) · [Retained code](#source-retained).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).

### Schematic editing and runtime classification

Circuit Lab changes circuit documents, components and wiring, persists projects and compiles the edited document into an exported netlist. This implemented authoring operation adds conventional Design alongside Simulation. Gradient/sensitivity APIs and future learned-solver plans do not establish a released runtime AI operation. [Editor implementation](#source-review-20261124-editor) · [Current coverage](#source-review-20261124-capabilities).
