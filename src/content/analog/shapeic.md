---
name: ShapeIC
summary: Rust platform for hierarchical analog circuit exploration using device lookup tables, small-signal models and propagated circuit requirements.
description: Rust platform for hierarchical analog circuit exploration using device lookup tables, small-signal models and propagated circuit requirements. Electrical evaluation and a bounded OTA layout/PEX workflow support comparisons with ngspice; supported PDKs, generated tables and fixed layout policies constrain the demonstrated coverage.
scope:
  design:
    ai: false
  simulation:
    ai: false
  layout:
    ai: false
access: Public Apache-2.0 Rust source with separate cellkit/LUT resources. Examples require compatible PDK tables; the demonstrated physical flow additionally needs Python layout tooling, Magic, ngspice and configured PDK paths.
addedAt: '2026-10-31'
reviewedAt: '2026-10-31'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/ShapeIC/shapeic
  purpose: code
- id: readme
  title: Reviewed project workflow and boundaries
  url: https://github.com/ShapeIC/shapeic/blob/b5e44f327a9dd2cd7c939bc9549fc46f8d7c04b9/README.md
- id: activity
  title: Reviewed substantive first-parent implementation
  url: https://github.com/ShapeIC/shapeic/commit/69243885839bd5d3abc66895dfc946e5d7e172db
- id: hierarchy
  title: Recursive electrical exploration
  url: https://github.com/ShapeIC/shapeic/blob/b5e44f327a9dd2cd7c939bc9549fc46f8d7c04b9/shapeic-core/src/macro_model/hierarchical_explore.rs
- id: example
  title: Hierarchical OTA operating boundaries
  url: https://github.com/ShapeIC/shapeic/blob/b5e44f327a9dd2cd7c939bc9549fc46f8d7c04b9/shapeic-core/examples/ota_4t_hierarchical/README.md
- id: physical
  title: OTA GDS and PEX comparison workflow
  url: https://github.com/ShapeIC/shapeic/blob/b5e44f327a9dd2cd7c939bc9549fc46f8d7c04b9/shapeic-core/examples/ota_4t_physical_verification/README.md
- id: layout
  title: Physical LUT schema limits
  url: https://github.com/ShapeIC/shapeic/blob/b5e44f327a9dd2cd7c939bc9549fc46f8d7c04b9/shapeic-layout/README.md
---

### Hierarchical design and evaluation

The recursive exploration implementation evaluates a parent preview, derives child requirements, explores implementations and projects accepted compact candidates back into the parent. This is conventional Design. Electrical MNA evaluation and ngspice comparison support Simulation; lookup tables and automated search do not themselves establish model-driven AI. The hierarchical OTA example is explicitly electrical-only and does not accept a physical LUT. [Implementation](#source-hierarchy) · [Example contract](#source-example).

### Bounded physical workflow

The separate OTA physical-verification example takes selected dimensions, writes a complete OTA GDS, runs Magic extraction and checks connectivity before ngspice comparison. This concrete example supports Layout coverage, rather than a general placement/routing or signoff claim. Its local primitive parasitics differ from full routed PEX, and the physical LUT schema cannot preserve series resistance along a net with only one exposed port. [Physical example](#source-physical) · [LUT limitations](#source-layout).

### Meaningful activity

The October 8 first-parent change adds geometry restrictions in primitive construction and sizing. The latest cellkit pointer update is captured separately, not used alone to infer sustained development. Dependencies, PDK availability and numerical accuracy were reviewed from source; no LUT generation, layout extraction or external EDA run was reproduced. [Implementation change](#source-activity) · [Source](#source-code).
