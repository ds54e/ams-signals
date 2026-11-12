---
name: Revolution EDA
summary: Custom-IC workspace with hierarchical symbol, schematic and layout editors, parameterized cells and SPICE netlist import/export.
description: "Custom-IC workspace with hierarchical symbol, schematic and layout editors, parameterized cells and SPICE netlist import/export. The public core adds correspondence-based cross-probing between layout and LVS-extracted schematics; commercial AI and integration plugins retain separate availability and licensing boundaries."
scope:
  design:
    ai: false
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "A Devin-generated implementation introduced the shared connectivity engine, typed parameter model and inherited net expressions, integrating them with editor scenes and netlisters. The current source retains the connectivity resolver."
  sources: ["development-connectivity-implementation", "development-connectivity-retained"]
  reviewedAt: "2026-10-18"
access: Public Python/Qt core; process libraries and optional commercial plugins are separate dependencies.
addedAt: '2026-10-18'
reviewedAt: "2026-11-12"
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
- id: "development-connectivity-implementation"
  title: "Devin-attributed shared connectivity and parameter implementation"
  url: https://github.com/eskiyerli/revolution-eda/commit/8a76b22bd9cd869fdcbc013a0f63606b83a1e381
- id: "development-connectivity-retained"
  title: "Retained semantic connectivity resolver"
  url: https://github.com/eskiyerli/revolution-eda/blob/107cdd8734e6ed115b55dea89211efa60408bd5b/revedaEditor/connectivity/resolve.py
- id: website
  title: Official project website and documentation
  url: https://reveda.eu
  purpose: official
- id: review-20261103-probe
  title: "Core bidirectional LVS-schematic/layout cross-probing"
  url: https://github.com/eskiyerli/revolution-eda/commit/aeae184c11f4c6a0e0bfca6bae2d98113fdec93d
- id: review-20261103-tests
  title: "Extracted correspondence and cross-probing tests"
  url: https://github.com/eskiyerli/revolution-eda/commit/1a5fd9fe87fed3de5d5e8529947b036a7082fbd3
- id: review-20261112-activity
  title: "VACASK model-library and hierarchical current-save correctness"
  url: https://github.com/eskiyerli/revolution-eda/commit/33f5b0329b3ad842f59e82bc75e124e1933fa698
- id: review-20261112-implementation
  title: "VACASK include and current-target formatting"
  url: https://github.com/eskiyerli/revolution-eda/blob/33f5b0329b3ad842f59e82bc75e124e1933fa698/revedaEditor/netlisting/vacaskFormat.py
- id: review-20261112-tests
  title: "Executable VACASK formatter regressions"
  url: https://github.com/eskiyerli/revolution-eda/blob/33f5b0329b3ad842f59e82bc75e124e1933fa698/revedaEditor/tests/test_vacaskFormat.py
---

### Implementation and boundaries

The netlist parser and layout scene establish public Design and Layout operations. Editing/netlisting does not establish an implemented core electrical simulator. Premium AI Terminal and integration claims are not transferred to the public core. The selected technical-maintenance commit changes plugin isolation and startup behavior; the later redundant release merge does not renew meaningful activity. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The earlier reviewed checkpoint was `fd2e962fb40045a9c7c8d8bdb088ecab0a879e2d` (2026-10-09 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).

### Development provenance

The explicitly Devin-generated implementation adds shared semantic connectivity, typed parameters and inherited net expressions across editor scenes, checks and netlisters. The retained resolver evaluates inherited bindings, resolves group names and diagnoses conflicts; attribution is limited to this substantial subsystem within the existing editor. [Attributed implementation](#source-development-connectivity-implementation) · [Retained resolver](#source-development-connectivity-retained).

### Selection and current source review

The maintained core stamps/persists layout-instance correspondence in LVS-extracted schematics and implements bidirectional cross-probing using that identity, with executable Qt regression coverage. The inspected core methods require the counterpart view to be open; optional plugin/menu wiring is not assumed. This material navigation/inspection capability supports the revised description and existing Design/Layout, not an integrated electrical solver or public-core AI inference. Later SPDX/documentation work is separate from the reviewed test checkpoint. Release v1.0.0 predates this development work. [Core implementation](#source-review-20261103-probe) · [Regression tests](#source-review-20261103-tests).


### November 12, 2026 implementation review

The November 9 implementation tracks section-specific and unsectioned library includes separately and resolves quoted, vector and hierarchical current targets when generating VACASK input. Formatter regressions accompany the changes, alongside canceled-wire undo/redo and edit-in-place ghost-net fixes. Saveable currents remain constrained by the variables exposed by each VACASK device or subcircuit. Netlist formatting does not add Simulation; existing Design, Layout and provenance boundaries remain unchanged. [Integrated activity](#source-review-20261112-activity). [VACASK include and current-target formatting](#source-review-20261112-implementation) · [Executable VACASK formatter regressions](#source-review-20261112-tests).
