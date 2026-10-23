---
name: RNL
summary: Constraint-aware netlist notation and tooling for analog schematics.
description: "Adds comment-based placement, wiring and semantic constraints to SPICE and Spectre netlists. Native Rust tools check, render, solve and write the annotated design; a WASM viewer can inspect and edit it, while the solver runs only in the native toolchain."
scope:
  design:
    ai: true
  aiDevelopment: assisted
developmentEvidence:
  summary: "A Claude-coauthored change to the public EDA symbol and style packages includes executable viewer, WASM and CLI regression tests retained on the default branch. This supports assisted development of that change, not AI authorship of the entire project."
  sources: ["development-implementation", "development-retained"]
  reviewedAt: "2026-10-20"
access: "Public Rust, WASM and web-viewer code. The solver is native-only; the viewer does not provide a graphical drag-placement editor. MIT covers the implementation, while specifications, data and fonts have separate licenses."
addedAt: "2026-10-20"
reviewedAt: '2026-10-23'
sources:
  - id: code
    title: Canonical RNL implementation
    url: https://github.com/rich-netlist/rnl
    purpose: code
  - id: readme
    title: RNL project overview and tools
    url: https://github.com/rich-netlist/rnl/blob/28315964f57b28079c7e411c3adb1775e2f8cc3a/README.md
  - id: agent-skill
    title: Released RNL agent-authoring workflow
    url: https://github.com/rich-netlist/rnl/blob/28315964f57b28079c7e411c3adb1775e2f8cc3a/skills/rnl/SKILL.md
  - id: activity
    title: Reviewed substantive EDA package and regression-test update
    url: https://github.com/rich-netlist/rnl/commit/f18d7409fa32ea80b9a48d62f955bd1f474de52c
  - id: development-implementation
    title: Claude-coauthored executable test changes
    url: https://github.com/rich-netlist/rnl/commit/f18d7409fa32ea80b9a48d62f955bd1f474de52c
  - id: development-retained
    title: Retained executable viewer tests at the reviewed head
    url: https://github.com/rich-netlist/rnl/blob/28315964f57b28079c7e411c3adb1775e2f8cc3a/apps/web/library.test.mjs
  - id: viewer-release
    title: Public viewer v0.1.2 release
    url: https://github.com/rich-netlist/rnl/releases/tag/viewer-v0.1.2
  - id: spec-release
    title: Specification 0.3 revision 2
    url: https://github.com/rich-netlist/rnl/releases/tag/spec-0.3-r2
  - id: website
    title: Official project website and documentation
    url: https://rich-netlist.github.io/rnl/
    purpose: official
---

### Implementation and scope

RNL embeds placement, wiring and semantic constraints in SPICE or Spectre comments so the electrical netlist remains readable by its usual tools. The native Rust CLI checks constraints, renders schematics, solves placement and writes the result. The WASM runtime supports the viewer, but does not contain the solver. The viewer's interaction is not a general drag-placement editor. This is schematic Design, not physical IC Layout or electrical Simulation. [Project and implementation](#source-readme)

The released agent-authoring workflow asks a model to choose and revise circuit-aware constraints using implemented commands, supporting AI Design. Conventional checking and solving alone would not establish AI involvement. [Agent skill](#source-agent-skill) · [Project workflow](#source-readme)

### Release and access boundary

The reviewed public viewer release is v0.1.2 and the specification release is 0.3-r2. A later default-branch 0.1.3 preparation commit does not by itself establish a published release. The implementation uses MIT licensing; specification text, example data and bundled fonts have their own license notices. [Viewer release](#source-viewer-release) · [Specification release](#source-spec-release) · [Repository](#source-code)

### Activity and development provenance

The October 20 first-parent change splits EDA symbols and visual style into separate packages, updates the gallery and adds executable CLI, WASM and viewer tests. Its Claude coauthor credit and retained test code support AI-assisted development of this change only. [Reviewed activity](#source-activity) · [Development implementation](#source-development-implementation) · [Retained tests](#source-development-retained)
