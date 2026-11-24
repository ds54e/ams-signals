---
name: "OpenRdson"
summary: "Rust extraction of power-device on-resistance from layout and process data."
description: "Extracts power-MOSFET on-resistance from layout, process-stack data and device connectivity using a Rust 2.5D sheet-resistance network. It resolves metal, via and bias-dependent channel contributions and exports field plots; the input flow needs compatible CCI/ICT data, and published validation is limited."
scope:
  layout:
    ai: false
access: "Public Rust implementation under MIT OR Apache-2.0; requires layout/layer maps, compatible process and connectivity inputs, and a channel-current table when active devices are present."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: Canonical public implementation
    url: https://github.com/tPkl/OpenRdson
    purpose: code
  - id: readme
    title: Extraction workflow, required data and validation limitations
    url: https://github.com/tPkl/OpenRdson/blob/5dfdc1a8574c6a5da4cde43f4021da2d8b55c210/README.md
  - id: activity
    title: Parser diagnostics, stack-connectivity fixes and integration checks
    url: https://github.com/tPkl/OpenRdson/commit/5dfdc1a8574c6a5da4cde43f4021da2d8b55c210
  - id: prior-iteration
    title: Earlier extraction-path, adaptive-reporting and cache corrections
    url: https://github.com/tPkl/OpenRdson/commit/5d7b01faf750cd68ff28c534fe9cb5da57cdd7dd
  - id: sheet-network
    title: Conducting sheets, finite-volume weights, via footprints and channel edges
    url: https://github.com/tPkl/OpenRdson/blob/5dfdc1a8574c6a5da4cde43f4021da2d8b55c210/extraction/src/sheet.rs
  - id: channel-model
    title: Bias-dependent channel-current lookup and table diagnostics
    url: https://github.com/tPkl/OpenRdson/blob/5dfdc1a8574c6a5da4cde43f4021da2d8b55c210/channel/src/lib.rs
  - id: sheet-tests
    title: Analytic sheet-network and connectivity regression tests
    url: https://github.com/tPkl/OpenRdson/blob/5dfdc1a8574c6a5da4cde43f4021da2d8b55c210/extraction/tests/sheet_network.rs
  - id: integration-tests
    title: GDS and ICT fixtures through extraction against analytic resistance
    url: https://github.com/tPkl/OpenRdson/blob/5dfdc1a8574c6a5da4cde43f4021da2d8b55c210/validation/tests/extraction_integration.rs
  - id: acceptance
    title: Generic resistance-acceptance checks included in the test suite
    url: https://github.com/tPkl/OpenRdson/blob/5dfdc1a8574c6a5da4cde43f4021da2d8b55c210/validation/tests/acceptance.rs
  - id: manifest
    title: Workspace and license declaration
    url: https://github.com/tPkl/OpenRdson/blob/5dfdc1a8574c6a5da4cde43f4021da2d8b55c210/Cargo.toml
---

### Implemented operation and selection

OpenRdson constructs a resistive network from conducting-layer geometry, connecting sheet meshes through via/contact resistances and device-channel edges. Bias-dependent channel behavior comes from a supplied current table. The CLI reports on-resistance and contribution breakdowns and can export solved fields for KLayout or ParaView. Dedicated layout-derived resistance extraction supports Layout; the numerical solve does not by itself add a general circuit-simulation stage. [Network implementation](#source-sheet-network) · [Channel table](#source-channel-model) · [CLI and outputs](#source-readme).

Its distinct role is resistance distribution across multi-finger power devices, including the metal/via/channel split. This is a narrower engineering operation than general RC netlist extraction or power-grid droop analysis. Synthetic checks cover sheet-resistance scaling and an end-to-end path from GDS, layer maps and ICT through connectivity, meshing and solving. The integration fixtures compare a metal line, a metal-via-metal series path and parallel vias against analytic expectations. [Sheet tests](#source-sheet-tests) · [Extraction integration](#source-integration-tests).

### Input and validation boundaries

The documented device flow expects compatible CCI connectivity/layout exports, an ICT stack, layer maps, a golden LVS netlist and device templates; active devices also need a current-versus-temperature-and-bias table. The public code does not provide a ready-made process kit for arbitrary foundries. The maintainer reports testing on a handful of layouts from one company's PDK, so signoff-grade accuracy and general PDK portability remain unestablished. Thermal co-simulation is listed as planned work. [Requirements and limits](#source-readme).

### Activity review

The first-parent checkpoint is 2026-10-04T17:42:27Z. It adds parser diagnostics, stack-connectivity checks and extraction integration tests after the earlier adaptive-reporting/cache corrections. This is recent implementation and validation beyond the initial source import. [Reviewed change](#source-activity) · [Earlier correction](#source-prior-iteration) · [Acceptance checks](#source-acceptance).

Review was static. Public code and test assertions were inspected; the upstream suite, proprietary input flow and numerical or silicon correlation were not independently reproduced.
