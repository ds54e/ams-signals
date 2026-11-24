---
name: RNL
summary: Constraint-aware netlist notation and tooling for analog schematics.
description: "Constraint-aware schematic notation embedded in SPICE/Spectre netlists. Rust tools and the browser viewer solve placement and routing constraints; browser solves use WebAssembly, not an electrical simulator. The 0.6 series reads RNL 0.4; older 0.2/0.3 files need the legacy viewer or conversion with core 0.5.7."
scope:
  design:
    ai: true
  aiDevelopment: assisted
developmentEvidence:
  summary: "A Claude-coauthored package split added executable viewer, WASM and CLI tests. The current library-publication test retains its package-path assertion; older assertions for the optional EDA packages were superseded by the language 0.4 transition."
  sources: ["development-implementation", "development-retained"]
  reviewedAt: '2026-11-24'
access: "Public Rust, WASM and web-viewer code. The browser viewer loads a separate solver for schematic solving. MIT covers the implementation; specifications, data and fonts have separate licenses."
addedAt: "2026-10-20"
reviewedAt: "2026-11-24"
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
    url: https://github.com/rich-netlist/rnl/blob/2c724ae021ee16e18360ace5751c59e6ce2e654e/apps/web/library.test.mjs
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
  - id: review-20261103-solve
    title: "Viewer solve constraints and local native development service"
    url: https://github.com/rich-netlist/rnl/commit/5e0133e1b75f084ceb1530bf6791fa038272dab0
  - id: review-20261103-report
    title: "Solver reports actual constraint satisfaction"
    url: https://github.com/rich-netlist/rnl/commit/2578f057b5b476d68b15e0d999c1a16ebb6b2289
  - id: review-20261103-origins
    title: "Registration-point overlay and browser regressions"
    url: https://github.com/rich-netlist/rnl/commit/83cbd74dc7b3f33cdc357234746226cc5d926a27
  - id: review-20261107-local
    title: "Loopback viewer with native solving and bounded file operations"
    url: https://github.com/rich-netlist/rnl/commit/48686fb22920a14acec60e4ca78d46c4afb7feef
  - id: review-20261107-guide
    title: "Local viewer packaging and system requirements"
    url: https://github.com/rich-netlist/rnl/blob/81d166817d900a72bfbaf4e4f28322df2022c7e3/apps/local/README.md
  - id: review-20261107-implementation
    title: "Named-point text attachment implementation and snapshot regressions"
    url: https://github.com/rich-netlist/rnl/commit/81d166817d900a72bfbaf4e4f28322df2022c7e3
  - id: review-20261112-activity
    title: "Versioned independent solver protocol and checked external writeback"
    url: https://github.com/rich-netlist/rnl/commit/865b829559119c1138e488e4bd1abf6bea680a48
  - id: review-20261112-implementation
    title: "External solver execution and checked writeback"
    url: https://github.com/rich-netlist/rnl/blob/865b829559119c1138e488e4bd1abf6bea680a48/crates/rnl-cli/src/external_solver.rs
  - id: review-20261112-tests
    title: "Solver protocol failure and writeback regressions"
    url: https://github.com/rich-netlist/rnl/blob/865b829559119c1138e488e4bd1abf6bea680a48/crates/rnl-cli/tests/solver_protocol.rs
  - id: review-20261119-core
    title: "RNL Core 0.6.0 release and migration limits"
    url: https://github.com/rich-netlist/rnl/releases/tag/core-v0.6.0
  - id: review-20261119-viewer
    title: "RNL Viewer 0.6.0 browser solver and release boundaries"
    url: https://github.com/rich-netlist/rnl/releases/tag/viewer-v0.6.0
  - id: review-20261119-activity
    title: "Core 0.6.0 restricts parsing and writing to RNL 0.4"
    url: https://github.com/rich-netlist/rnl/commit/67d68f18e0bfc0496f43aaef213b3d7afc9ef7d8
---

### Implementation and scope

RNL embeds placement, wiring and semantic constraints in SPICE or Spectre comments so the electrical netlist remains readable by its usual tools. The native Rust CLI checks constraints, renders schematics, solves placement and writes the result. From Viewer 0.6.0 the browser can solve via a separate WASM Worker. The viewer's interaction is not a general drag-placement editor. This is schematic Design, not physical IC Layout or electrical Simulation. [Project and implementation](#source-readme)

The released agent-authoring workflow asks a model to choose and revise circuit-aware constraints using implemented commands, supporting AI Design. Conventional checking and solving alone would not establish AI involvement. [Agent skill](#source-agent-skill) · [Project workflow](#source-readme)

### Release and access boundary

The earlier release review records viewer v0.1.2 and specification 0.3-r2. This development review does not establish which tagged release contains the new format changes. The implementation uses MIT licensing; specification text, example data and bundled fonts have their own license notices. [Viewer release](#source-viewer-release) · [Specification release](#source-spec-release) · [Repository](#source-code)

### Activity and development provenance

The October 20 first-parent change splits EDA symbols and visual style into separate packages, updates the gallery and adds executable CLI, WASM and viewer tests. Its Claude coauthor credit and retained test code support AI-assisted development of this change only. [Reviewed activity](#source-activity) · [Development implementation](#source-development-implementation) · [Retained tests](#source-development-retained)

### Per-file parsing and viewer overrides

The October 24 integrations add per-file parse-format interfaces and make each included file default to its own detected format. A `.scs` file, or a file declaring `simulator lang=spectre` within its first 50 lines, defaults to Spectre; other files default to SPICE. `--dialect` selects the main file only, while an explicit per-file format can override include detection. Mixed-file name resolution follows each format's rules, and automatic inclusion conservatively rejects a library that would change an existing binding. This is parse/display behavior, not a guarantee that an electrical simulator accepts a mixed-dialect deck. [Format interface](#source-review-20261024-formats) · [Integrated defaults and conflict checks](#source-review-20261024-defaults).

The viewer adds a format menu for each file and include, preserving edits while rebuilding. Desktop overrides persist in settings; the web viewer persists choices for server-served files by address, while local-file choices last only for the open page. These October controls did not themselves add solving or graphical placement editing. [Viewer implementation](#source-review-20261024-viewer).

Meaningful activity advances to first-parent integration `810a83d02a24a081bca9f9e588ef4b61ee2217a0` on October 24 UTC, following the format-interface and viewer merges. This source review did not independently execute Rust/WASM/viewer tests or verify tagged-release inclusion. Existing AI Design and AI-assisted development labels are preserved; the new parsing controls do not themselves establish new AI participation. Code remains MIT; specification/documentation is CC-BY-4.0, libraries/tests/examples are CC0-1.0, and bundled font metrics use OFL-1.1. [Integration](#source-review-20261024-integration) · [License mapping](#source-review-20261024-readme).

### Hierarchical browsing and parameter context

The October 30/31 integrations let the viewer choose among multiple library definitions for an instance and display a subcircuit's parameters with their default, instance or changed origin. A parameter dialog rebuilds the Document with bound values and can carry them when entering a separately stored definition. These are schematic-inspection and display bindings: the drawing retains its written expressions and the operation does not rewrite the netlist's electrical parameters. Source and browser-test changes were reviewed, without reproducing the upstream Rust/WASM suite. [Definition choice](#source-review-20261031-choices) · [Parameters and regression tests](#source-review-20261031-params) · [Retained code](#source-review-20261031-param-code).

At that review the native solver was labeled a preview; this update does not promote it to a mature placement editor or add Simulation. Existing AI Design and software-development provenance are retained on their earlier evidence. Meaningful activity follows the first-parent parameter integration, not the subsequent version bump. [Solver boundary](#source-review-20261031-preview).

### Selection and current source review

Substantive integrations add per-level constraints, solve reports describing which facts hold, viewer constraint inspection and object registration-point overlays. A web development server started with an explicit local rnl executable can serve preview solves through temporary files; this was the native-backed implementation before the separately reviewed browser solver. At the November 3 review, main was ahead of the then-reviewed core 0.5.5/viewer 0.5.3 releases, so these development capabilities are not attributed to those tags. The existing model-hosted authoring workflow retains AI Design; the new constraint checks are deterministic. [Native-service implementation and tests](#source-review-20261103-solve) · [Solve report](#source-review-20261103-report) · [Current viewer implementation/tests](#source-review-20261103-origins).

### November implementation review

The local viewer embeds the web interface and serves it over loopback, while its native process performs solving and file operations. Implementation includes session/origin checks, bounded file access and browser/file/solver regressions. Its Linux packaging targets older enterprise distributions; container tests do not establish compatibility with their original kernels, and a local browser retains its own system dependencies. Packaging and release automation were inspected, not independently executed; a release workflow alone does not establish a published package version. The November 6 implementation also adds named-point text attachment with snapshot regressions. [Local viewer](#source-review-20261107-local) · [Packaging boundaries](#source-review-20261107-guide) · [Reviewed implementation](#source-review-20261107-implementation).


### November 12, 2026 implementation review

The November 12 native implementation introduces an independent rnl-solver executable, versioned lossless JSON protocol and checked external-solver writeback. It rejects stale input, invalid pin identities, nonfinite geometry, malformed or oversized results and timeouts; later-level failures discard earlier in-memory writebacks. These deterministic schematic operations are not IC Layout or electrical Simulation, and absent third-party solver reports remain unknown rather than successful. Existing AI Design derives from separately reviewed authoring operations, not this solver protocol. Tagged-release inclusion was not verified. [Integrated activity](#source-review-20261112-activity). [External solver execution and checked writeback](#source-review-20261112-implementation) · [Solver protocol failure and writeback regressions](#source-review-20261112-tests).

### November 19, 2026 review

Core and Viewer 0.6.0 were reviewed. The Viewer loads a WASM Worker on first solve for placement and routing, with progress and cancellation. Solving on file open previews the result without changing the input. This is schematic Design, not physical IC Layout or SPICE simulation. Core 0.6 reads and writes RNL 0.4 only; the last legacy-compatible CLI, core 0.5.7, converts 0.2/0.3 files with `rnl upgrade`, while the frozen legacy web viewer can still display them. [Core](#source-review-20261119-core) · [Viewer](#source-review-20261119-viewer) · [Language implementation](#source-review-20261119-activity).

The November 24 retention review distinguishes the surviving executable package-path assertion from superseded optional-package expectations. The retained contribution supports AI-ASSISTED under the same isolated-test standard used elsewhere; it does not claim that every historical test or package still ships. [Credited package/test change](#source-development-implementation) · [Current library-publication test](#source-development-retained).
