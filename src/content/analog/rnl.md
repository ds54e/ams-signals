---
name: RNL
summary: Constraint-aware netlist notation and tooling for analog schematics.
description: "Constraint-aware schematic notation embedded in SPICE/Spectre netlists, with Rust check, solve and render tools and a WebAssembly viewer. Hierarchical browsing exposes subcircuit parameters and alternative library definitions; viewer parameter bindings rebuild the displayed document rather than rewriting electrical values, and the native solver remains a preview."
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
reviewedAt: "2026-10-31"
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
  - id: review-20261024-formats
    title: Merged per-file format interfaces and cross-file name resolution
    url: https://github.com/rich-netlist/rnl/pull/199
  - id: review-20261024-viewer
    title: Merged viewer format selection and persistence rules
    url: https://github.com/rich-netlist/rnl/pull/203
  - id: review-20261024-defaults
    title: Merged per-include format detection and conservative conflict handling
    url: https://github.com/rich-netlist/rnl/pull/204
  - id: review-20261024-integration
    title: First-parent integration of per-include format defaults
    url: https://github.com/rich-netlist/rnl/commit/810a83d02a24a081bca9f9e588ef4b61ee2217a0
  - id: review-20261024-readme
    title: Reviewed source and separate code, specification, data and font licenses
    url: https://github.com/rich-netlist/rnl/blob/810a83d02a24a081bca9f9e588ef4b61ee2217a0/README.md
  - id: review-20261031-params
    title: Viewer subcircuit parameter bar, binding dialog and tests
    url: https://github.com/rich-netlist/rnl/commit/dc19b37f5891f1ba2b3c6d67b5b4be658b1566f5
  - id: review-20261031-choices
    title: Choose among library definitions when entering an instance
    url: https://github.com/rich-netlist/rnl/commit/1ad7c060af4f10e99aea395a5b143602364d2efa
  - id: review-20261031-param-code
    title: Retained parameter-view implementation
    url: https://github.com/rich-netlist/rnl/blob/b494cbaf454d3c8614efb321c299314b4d238b42/apps/viewer-ui/params.js
  - id: review-20261031-preview
    title: CLI explicitly identifies the solver as a preview
    url: https://github.com/rich-netlist/rnl/commit/67929f84743bfb525bef9ee1b04f5fd4d26ee498
---

### Implementation and scope

RNL embeds placement, wiring and semantic constraints in SPICE or Spectre comments so the electrical netlist remains readable by its usual tools. The native Rust CLI checks constraints, renders schematics, solves placement and writes the result. The WASM runtime supports the viewer, but does not contain the solver. The viewer's interaction is not a general drag-placement editor. This is schematic Design, not physical IC Layout or electrical Simulation. [Project and implementation](#source-readme)

The released agent-authoring workflow asks a model to choose and revise circuit-aware constraints using implemented commands, supporting AI Design. Conventional checking and solving alone would not establish AI involvement. [Agent skill](#source-agent-skill) · [Project workflow](#source-readme)

### Release and access boundary

The earlier release review records viewer v0.1.2 and specification 0.3-r2. This development review does not establish which tagged release contains the new format changes. The implementation uses MIT licensing; specification text, example data and bundled fonts have their own license notices. [Viewer release](#source-viewer-release) · [Specification release](#source-spec-release) · [Repository](#source-code)

### Activity and development provenance

The October 20 first-parent change splits EDA symbols and visual style into separate packages, updates the gallery and adds executable CLI, WASM and viewer tests. Its Claude coauthor credit and retained test code support AI-assisted development of this change only. [Reviewed activity](#source-activity) · [Development implementation](#source-development-implementation) · [Retained tests](#source-development-retained)

### Per-file parsing and viewer overrides

The October 24 integrations add per-file parse-format interfaces and make each included file default to its own detected format. A `.scs` file, or a file declaring `simulator lang=spectre` within its first 50 lines, defaults to Spectre; other files default to SPICE. `--dialect` selects the main file only, while an explicit per-file format can override include detection. Mixed-file name resolution follows each format's rules, and automatic inclusion conservatively rejects a library that would change an existing binding. This is parse/display behavior, not a guarantee that an electrical simulator accepts a mixed-dialect deck. [Format interface](#source-review-20261024-formats) · [Integrated defaults and conflict checks](#source-review-20261024-defaults).

The viewer adds a format menu for each file and include, preserving edits while rebuilding. Desktop overrides persist in settings; the web viewer persists choices for server-served files by address, while local-file choices last only for the open page. These controls do not add a browser-side solver or a general graphical placement editor. [Viewer implementation](#source-review-20261024-viewer).

Meaningful activity advances to first-parent integration `810a83d02a24a081bca9f9e588ef4b61ee2217a0` on October 24 UTC, following the format-interface and viewer merges. This source review did not independently execute Rust/WASM/viewer tests or verify tagged-release inclusion. Existing AI Design and AI-assisted development labels are preserved; the new parsing controls do not themselves establish new AI participation. Code remains MIT; specification/documentation is CC-BY-4.0, libraries/tests/examples are CC0-1.0, and bundled font metrics use OFL-1.1. [Integration](#source-review-20261024-integration) · [License mapping](#source-review-20261024-readme).

### Hierarchical browsing and parameter context

The October 30/31 integrations let the viewer choose among multiple library definitions for an instance and display a subcircuit's parameters with their default, instance or changed origin. A parameter dialog rebuilds the Document with bound values and can carry them when entering a separately stored definition. These are schematic-inspection and display bindings: the drawing retains its written expressions and the operation does not rewrite the netlist's electrical parameters. Source and browser-test changes were reviewed, without reproducing the upstream Rust/WASM suite. [Definition choice](#source-review-20261031-choices) · [Parameters and regression tests](#source-review-20261031-params) · [Retained code](#source-review-20261031-param-code).

The native solver is explicitly labeled a preview; this update does not promote it to a mature placement editor or add Simulation. Existing AI Design and software-development provenance are retained on their earlier evidence. Meaningful activity follows the first-parent parameter integration, not the subsequent version bump. [Solver boundary](#source-review-20261031-preview).
