---
name: "TopStitch"
aliases: []
description: "Rust library for integrating SystemVerilog blocks through programmable port, interface and hierarchy connections. It emits Verilog wrappers and builds block floorplans and pin placements with LEF/DEF exchange. Useful for scripted top-level assembly; its API is evolving, and physical checks are limited to the modeled geometry."
scope:
  design:
    ai: false
  layout:
    ai: false
access: "Apache-2.0 source and Rust crate. Builds require Rust, CMake, Python and a C++20 compiler for Slang; a supported precompiled Slang library is an alternative. The API is subject to frequent changes."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: Canonical TopStitch implementation
    url: https://github.com/xlsynth/topstitch
    purpose: code
  - id: official
    title: TopStitch Rust API documentation
    url: https://docs.rs/topstitch
    purpose: official
  - id: overview
    title: Reviewed build instructions and executable integration example
    url: https://github.com/xlsynth/topstitch/blob/a72f116898165eb617ff21bebc21ad4b4d7b4845/README.md
  - id: connections
    title: Executable port, interface, tie-off and feedthrough example
    url: https://github.com/xlsynth/topstitch/blob/a72f116898165eb617ff21bebc21ad4b4d7b4845/examples/features.rs
  - id: frontend
    title: SystemVerilog module import and supported port representations
    url: https://github.com/xlsynth/topstitch/blob/a72f116898165eb617ff21bebc21ad4b4d7b4845/src/mod_def/parser.rs
  - id: packed-tests
    title: Packed field selection and retained layout regressions
    url: https://github.com/xlsynth/topstitch/blob/a72f116898165eb617ff21bebc21ad4b4d7b4845/tests/syntax/struct_ports.rs
  - id: floorplan
    title: Executable block placement and pin-spreading workflow
    url: https://github.com/xlsynth/topstitch/blob/a72f116898165eb617ff21bebc21ad4b4d7b4845/examples/pinning.rs
  - id: physical
    title: LEF/DEF import, geometry validation and export implementation
    url: https://github.com/xlsynth/topstitch/blob/a72f116898165eb617ff21bebc21ad4b4d7b4845/src/mod_def/lefdef.rs
  - id: physical-options
    title: Physical pin model, import policies and validation options
    url: https://github.com/xlsynth/topstitch/blob/a72f116898165eb617ff21bebc21ad4b4d7b4845/src/lefdef.rs
  - id: physical-tests
    title: LEF/DEF output, placement and orientation regressions
    url: https://github.com/xlsynth/topstitch/blob/a72f116898165eb617ff21bebc21ad4b4d7b4845/tests/emit_lefdef.rs
  - id: activity
    title: Integrated pipeline tap-width correction and Bedrock RTL regression
    url: https://github.com/xlsynth/topstitch/commit/a72f116898165eb617ff21bebc21ad4b4d7b4845
  - id: license
    title: Apache-2.0 project license
    url: https://github.com/xlsynth/topstitch/blob/a72f116898165eb617ff21bebc21ad4b4d7b4845/LICENSE
---

### Implemented integration workflow

TopStitch imports SystemVerilog module interfaces through Slang or constructs module stubs in Rust, instantiates blocks, connects ports and interface groups, inserts feedthroughs and emits Verilog wrappers. Packed layouts support field and array selection across copied or exported ports. The executable examples exercise width checks, tie-offs and unused-port declarations. This provides a programmable top-level assembly workflow alongside declarative integration tools. [Build and demo](#source-overview) · [Connectivity example](#source-connections) · [Frontend](#source-frontend) · [Packed-layout regressions](#source-packed-tests)

The same model stores block outlines, instance locations and orientations, placement tracks and physical pins. Its pinning example places connected blocks, spreads or abuts their pins and emits LEF/DEF; the implementation also imports physical module descriptions. These operations establish Layout in addition to Design. The connection and geometry checks support assembly and do not establish a separate simulation or formal-verification workflow. [Floorplan example](#source-floorplan) · [Physical implementation](#source-physical) · [Placement/output regressions](#source-physical-tests)

### Operating boundaries

The public API is evolving. Import currently rejects unsupported unpacked port types unless skipping is requested, and the frontend explicitly records an anonymous-enum input case that can emit an invalid connection without the required enum cast. Packed-field support should therefore not be read as unrestricted SystemVerilog type support. [Build/API notice](#source-overview) · [Frontend boundaries](#source-frontend)

Each logical port bit holds at most one physical polygon on one layer. Default LEF/DEF import takes the first eligible shape and skips POWER/GROUND pins; alternative shape-resolution and layer-selection policies are available. Pin containment, overlap and placement-grid checks operate on this model and do not establish foundry DRC/LVS or routed timing. [Physical model and policies](#source-physical-options) · [Import/export implementation](#source-physical)

### Reviewed activity

The November 21 first-parent checkpoint fixes the `br_delay_nr.out_stages` tap-bus width to include the input stage. It adds zero-depth and multi-stage regressions and a CI check against a pinned Bedrock RTL interface. The reviewed head retains the correction and the broader connectivity and physical workflows. This review inspected source and executable regression definitions; it did not rebuild Slang or run an external EDA flow. [Integrated correction and tests](#source-activity)
