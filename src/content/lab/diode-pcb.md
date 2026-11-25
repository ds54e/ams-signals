---
name: "Diode PCB"
aliases: [pcb, Zener]
description: "Rust CLI for Zener, a Starlark-based PCB language, that builds typed circuit hierarchies and synchronizes them with KiCad layouts while preserving placement and routing. Optional agent skills guide component-package authoring and design repair; layout generation requires KiCad 10.x, and manufacturing checks do not establish a board's electrical performance."
scope:
  design: { ai: true }
  aiDevelopment: assisted
developmentEvidence:
  summary: "An Amp-coauthored change snaps Gerber region contours to a 1 micrometre grid before decomposition and adds regression checks. The integrated implementation and tests remain in the reviewed tree."
  sources: [development-commit, development-code, development-actor]
  reviewedAt: "2026-11-24"
access: "MIT-licensed Diode-authored code and documentation, with separate third-party notices. Layouts use KiCad 10.x and a Python bridge; native Windows support is experimental. Optional skills require an external model-hosted agent; Diode service integrations have separate authentication."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: official
    title: "Diode PCB setup and toolchain documentation"
    url: "https://docs.pcb.new/pages/quickstart"
    purpose: official
  - id: code
    title: "Canonical Diode PCB implementation"
    url: "https://github.com/diodeinc/pcb"
    purpose: code
  - id: readme
    title: "Zener workflow, platform requirements and license boundaries"
    url: "https://github.com/diodeinc/pcb/blob/b42f83af58e8674385fe7da35960e20b8b526b33/README.md"
  - id: synchronization
    title: "Netlist authority, layout preservation and fragment synchronization"
    url: "https://github.com/diodeinc/pcb/blob/b42f83af58e8674385fe7da35960e20b8b526b33/crates/pcb-layout/README.md"
  - id: implementation
    title: "Rust layout processing and KiCad bridge"
    url: "https://github.com/diodeinc/pcb/blob/b42f83af58e8674385fe7da35960e20b8b526b33/crates/pcb-layout/src/lib.rs"
  - id: layout-tests
    title: "Zener-to-KiCad layout and routing-preservation regression fixtures"
    url: "https://github.com/diodeinc/pcb/blob/b42f83af58e8674385fe7da35960e20b8b526b33/crates/pcb-layout/tests/layout_generation.rs"
  - id: authoring-skill
    title: "Agent instructions for typed connections, design calculations and stable topology"
    url: "https://github.com/diodeinc/pcb/blob/b42f83af58e8674385fe7da35960e20b8b526b33/skills/zener-language/SKILL.md"
  - id: librarian-skill
    title: "Agent workflow for component packages, reference circuits and footprint evidence"
    url: "https://github.com/diodeinc/pcb/blob/b42f83af58e8674385fe7da35960e20b8b526b33/skills/librarian/SKILL.md"
  - id: manufacturing-tests
    title: "IPC-2581 board-array and manufacturing-output tests"
    url: "https://github.com/diodeinc/pcb/blob/b42f83af58e8674385fe7da35960e20b8b526b33/crates/pcb-ipc2581-tools/src/commands/board_array/tests.rs"
  - id: activity
    title: "Generate fabrication artwork on automatic board-array rails"
    url: "https://github.com/diodeinc/pcb/commit/b42f83af58e8674385fe7da35960e20b8b526b33"
  - id: development-commit
    title: "Amp-credited Gerber region-grid implementation and regression changes"
    url: "https://github.com/diodeinc/pcb/commit/34d73aebe277e3414f2eddd1ce0c276661d0782a"
  - id: development-code
    title: "Retained region-grid decomposition and executable tests"
    url: "https://github.com/diodeinc/pcb/blob/b42f83af58e8674385fe7da35960e20b8b526b33/crates/gerberx2/src/from_artwork.rs"
  - id: development-actor
    title: "Amp documentation identifying its agent coauthor trailer"
    url: "https://ampcode.com/docs/cli/settings"
---

### Board-generation workflow

`pcb build` evaluates a Zener design and its dependencies; `pcb layout` generates or synchronizes KiCad artifacts. Circuit metadata and hierarchy come from the netlist, while existing placement, routing, zones and graphics are retained where their entities persist. Reusable layout fragments and regression fixtures make this a board-design workflow with a concrete use in repeated evaluation-board revisions. [Project entry points](#source-readme); [Synchronization model](#source-synchronization); [Implementation](#source-implementation); [Layout tests](#source-layout-tests).

The Rust CLI includes a Python KiCad bridge. KiCad is required for the layout workflow, not for Zener build alone. Package/unit tests and manufacturing preflight do not establish a separate Lab Test workflow or measured signal-integrity, jitter or electrical-compliance results. No board was fabricated or measured for this review. [Setup](#source-official); [Manufacturing tests](#source-manufacturing-tests).

### Optional AI authoring

The shipped agent skills specify board-level decisions: typed power and protocol connections, stable population variants, datasheet-based component calculations, reference-circuit boundaries and footprint validation. They connect those decisions to Zener packages and the implemented compiler/layout tools, supporting an optional AI-backed Design path. The CLI and synchronization algorithms also work without a model. These skill instructions establish a runtime authoring path, not AI development provenance for the Rust implementation. [Zener authoring](#source-authoring-skill); [Package authoring](#source-librarian-skill); [Layout implementation](#source-implementation).

### Development provenance

A separate integrated change explicitly credits Amp for executable Gerber-region quantization and regression logic. The reviewed tree retains the 1 micrometre region grid, decomposition path and signed-coordinate tests. Amp's official documentation identifies the matching agent coauthor trailer. This establishes AI-ASSISTED for that retained contribution independently of the optional authoring skills; it does not attribute the whole implementation to AI. [Credited change](#source-development-commit); [Retained code and tests](#source-development-code); [Actor identity](#source-development-actor).

### Activity

The reviewed history contains implementation and regression work on layout synchronization and fabrication outputs beyond release tagging. The selected November checkpoint adds rail artwork to automatic IPC-2581 board arrays, with placement and manufacturing-output tests; its role is fabrication support rather than electrical validation. [Integrated change](#source-activity); [Retained tests](#source-manufacturing-tests).
