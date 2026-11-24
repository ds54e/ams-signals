---
name: "Substrate 2"
aliases: [Substrate]
summary: "Rust framework for typed analog circuit, layout and simulator-backed testbench generators."
description: "Rust framework for parametric analog generators that create typed schematics and layouts, run simulator-backed testbenches, and coordinate physical verification. Its SKY130 example connects sizing and extraction to ngspice, Magic and Netgen; users supply the PDK and external tools, and the APIs are still evolving."
scope:
  design: { ai: false }
  simulation: { ai: false }
  layout: { ai: false }
targets: "Reusable analog circuit generators, PDK mappings and pre/post-layout characterization, with an executable SKY130 inverter workflow."
access: "BSD-3-Clause Rust source. Requires Rust and the Substrate Cargo registry; the open SKY130 workflow additionally requires PDK installations, ngspice, Magic and Netgen. Other simulator integrations have their own access requirements."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: official
    title: "Substrate documentation and open-tool inverter tutorial"
    url: "https://docs.substratelabs.io/docs/main/getting-started/inverter/open/"
    purpose: official
  - id: code
    title: "Canonical Substrate 2 implementation"
    url: "https://github.com/ucb-substrate/substrate2"
    purpose: code
  - id: readme
    title: "Installation, licensing and evolving API notice"
    url: "https://github.com/ucb-substrate/substrate2/blob/16cbed1796e49b2331f84a80389ab67fa486092b/README.md"
  - id: testbench
    title: "Sizing sweep, transient measurements and extracted-inverter execution"
    url: "https://github.com/ucb-substrate/substrate2/blob/16cbed1796e49b2331f84a80389ab67fa486092b/examples/latest/sky130_inverter/src/tb/open.rs"
  - id: layout
    title: "Generated SKY130 inverter layout with DRC and LVS execution"
    url: "https://github.com/ucb-substrate/substrate2/blob/16cbed1796e49b2331f84a80389ab67fa486092b/examples/latest/sky130_inverter/src/layout.rs"
  - id: mos-tests
    title: "SKY130 parameter preservation and multiplicity regressions"
    url: "https://github.com/ucb-substrate/substrate2/blob/16cbed1796e49b2331f84a80389ab67fa486092b/pdks/sky130/src/tests.rs"
  - id: earlier-maintenance
    title: "Buffer GDS writes and avoid repeated unique-name scans"
    url: "https://github.com/ucb-substrate/substrate2/commit/01d9600f946437d3bc18806a6517e35001b68251"
  - id: activity
    title: "Preserve geometry-based SKY130 MOS parameters through netlist conversion"
    url: "https://github.com/ucb-substrate/substrate2/commit/0ffdd4b284af6a56f18b630e6c51ae3c1c4e9067"
---

### Engineering workflow

Substrate supplies reusable typed schematic and layout generators rather than only a file parser or simulator binding. The public inverter example sweeps PMOS width, runs transient simulation, measures transition times, and selects a size. Its extracted path writes GDS and invokes the supported Magic/Netgen extraction flow before simulating the resulting circuit. These executable workflows establish Design, Simulation and Layout. [Sizing and extracted simulation](#source-testbench); [Layout, DRC and LVS](#source-layout).

This offers a Rust circuit-generator and PDK-integration route alongside Python layout generators and standalone simulators. The selected PDK, simulator and physical-verification tools remain external dependencies. The review inspected implementation and regression sources without running the PDK-dependent examples or claiming foundry-qualified results. APIs are explicitly under development. [Setup and tutorial](#source-official); [Project boundaries](#source-readme).

### Identity and maintenance

The former `substrate-labs/substrate2` namespace redirects to the same GitHub repository identity, now `ucb-substrate/substrate2`; it is one project and one activity history. October work changed GDS buffering and unique-name allocation. November work preserves junction area/perimeter and other imported MOS parameters and keeps device multiplicity distinct from finger count, with conversion regressions. The later dependency-integration head is not substituted for this meaningful checkpoint. [GDS maintenance](#source-earlier-maintenance); [MOS correction](#source-activity); [Retained tests](#source-mos-tests).
