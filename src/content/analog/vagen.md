---
name: vagen
summary: Python library for generating Verilog-A testbench stimulus and behavioral models, including voltage/current sources, clocks, digital buses and timed sequences.
description: Python library for generating Verilog-A testbench stimulus and behavioral models, including voltage/current sources, clocks, digital buses and timed sequences. It emits Verilog-A source for an external simulator; typed validation and sequence construction help author repeatable analog-IP verification setups without providing a numerical solver.
scope:
  simulation:
    ai: false
  aiDevelopment: assisted
access: Public Python generator; executing its Verilog-A output requires a compatible analog simulator.
addedAt: '2026-10-18'
reviewedAt: '2026-10-18'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/rpm2003rpm/vagen
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/rpm2003rpm/vagen/blob/c632252a46965309c31e0d3c1364e79fcaf4f8b5/README.md
- id: activity
  title: improvements in code structure using AI
  url: https://github.com/rpm2003rpm/vagen/commit/d580b43f9e4baece3d7b013de0f9efe30c094597
- id: implementation-1
  title: 'Released implementation: vagen/hilevelmod.py'
  url: https://github.com/rpm2003rpm/vagen/blob/c632252a46965309c31e0d3c1364e79fcaf4f8b5/vagen/hilevelmod.py
- id: implementation-2
  title: 'Released implementation: vagen/module.py'
  url: https://github.com/rpm2003rpm/vagen/blob/c632252a46965309c31e0d3c1364e79fcaf4f8b5/vagen/module.py
- id: implementation-3
  title: 'Released implementation: vagen/validation.py'
  url: https://github.com/rpm2003rpm/vagen/blob/c632252a46965309c31e0d3c1364e79fcaf4f8b5/vagen/validation.py
developmentEvidence:
  summary: The maintainer attributes the September refactor to AI. The retained implementation replaces assertion-based validation with typed exceptions across the generator and adds error/sequence regression coverage, beyond reorganizing files.
  sources:
  - activity
  - implementation-3
  reviewedAt: '2026-10-18'
---

### Implementation and boundaries

High-level sequence compilation and behavioral source generation materially serve simulation setup. The library does not itself solve circuit equations. The September refactor replaces assertion-based validation with explicit typed exceptions and tests across the generator, beyond moving files. The maintainer directly attributes that implementation campaign to AI. This supports AI-ASSISTED development, with conventional runtime Simulation. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `d580b43f9e4baece3d7b013de0f9efe30c094597` (2026-09-23 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).
