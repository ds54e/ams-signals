---
name: wirewright
summary: Converts SPICE netlists into editable LTspice schematic files, with topology-aware placement, wire routing and configurable supply rails.
description: Converts SPICE netlists into editable LTspice schematic files, with topology-aware placement, wire routing and configurable supply rails. Its CLI parses connectivity and emits native drawing artifacts; it helps recover readable schematics without performing circuit simulation or producing IC layout geometry.
scope:
  design:
    ai: false
access: Public Python implementation; optional placement/rendering backends and LTspice viewing have their own dependencies.
addedAt: '2026-10-18'
reviewedAt: '2026-10-18'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/house-of-houses/wirewright
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/house-of-houses/wirewright/blob/40b90b07a9b6ec55bd5d6942b67c2c2badfe7d86/README.md
- id: activity
  title: 'feat(rails): clustered power/ground rails as default; add --rails knob'
  url: https://github.com/house-of-houses/wirewright/commit/8b523f2a94103f8eb9e796554ae986d51f7a39ad
- id: implementation-1
  title: 'Released implementation: src/wirewright/cli.py'
  url: https://github.com/house-of-houses/wirewright/blob/40b90b07a9b6ec55bd5d6942b67c2c2badfe7d86/src/wirewright/cli.py
- id: implementation-2
  title: 'Released implementation: src/wirewright/emit/asc.py'
  url: https://github.com/house-of-houses/wirewright/blob/40b90b07a9b6ec55bd5d6942b67c2c2badfe7d86/src/wirewright/emit/asc.py
---

### Implementation and boundaries

Netlist parsing, placement and ASC emission form a distinct schematic-reconstruction tool. These conventional drawing operations are Design, not mask Layout. The selected commit implements clustered power/ground rails and a user-facing control. Assistant instruction files and custom agents alone do not establish qualifying AI implementation provenance. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `8b523f2a94103f8eb9e796554ae986d51f7a39ad` (2026-05-03 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).
