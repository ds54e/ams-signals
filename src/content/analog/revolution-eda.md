---
name: Revolution EDA
summary: Custom-IC workspace with hierarchical symbol, schematic and layout editors, parameterized cells and SPICE netlist import/export.
description: Custom-IC workspace with hierarchical symbol, schematic and layout editors, parameterized cells and SPICE netlist import/export. The public core handles design data and geometry; commercial plugins, including AI and additional integration features, have separate availability and licensing boundaries.
scope:
  design:
    ai: false
  layout:
    ai: false
access: Public Python/Qt core; process libraries and optional commercial plugins are separate dependencies.
addedAt: '2026-10-18'
reviewedAt: '2026-10-18'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/eskiyerli/revolution-eda
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/eskiyerli/revolution-eda/blob/107cdd8734e6ed115b55dea89211efa60408bd5b/README.md
- id: activity
  title: 'feat(plugins,build): Harden plugin/licensing boundaries and startup lifecycle'
  url: https://github.com/eskiyerli/revolution-eda/commit/fd2e962fb40045a9c7c8d8bdb088ecab0a879e2d
- id: implementation-1
  title: 'Released implementation: revedaEditor/fileio/spiceNetlist.py'
  url: https://github.com/eskiyerli/revolution-eda/blob/107cdd8734e6ed115b55dea89211efa60408bd5b/revedaEditor/fileio/spiceNetlist.py
- id: implementation-2
  title: 'Released implementation: revedaEditor/scenes/layoutScene.py'
  url: https://github.com/eskiyerli/revolution-eda/blob/107cdd8734e6ed115b55dea89211efa60408bd5b/revedaEditor/scenes/layoutScene.py
---

### Implementation and boundaries

The netlist parser and layout scene establish public Design and Layout operations. Editing/netlisting does not establish an implemented core electrical simulator. Premium AI Terminal and integration claims are not transferred to the public core. The selected technical-maintenance commit changes plugin isolation and startup behavior; the later redundant release merge does not renew meaningful activity. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `fd2e962fb40045a9c7c8d8bdb088ecab0a879e2d` (2026-10-09 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).
