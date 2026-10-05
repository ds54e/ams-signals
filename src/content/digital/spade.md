---
name: "Spade"
aliases: []
description: "HDL for RTL design with a strong type system, zero-cost abstractions and pipelines with checked latency, compiling to Verilog/SystemVerilog. Its Swim toolchain manages packages and simulation tests, synthesizes through Yosys, and coordinates supported FPGA place-and-route with pin constraints and timing reports."
scope:
  design:
    ai: false
  synthesis:
    ai: false
  verification:
    ai: false
  layout:
    ai: false
access: "Public source compiler and Swim build tool; simulation and FPGA implementation require the selected external tools."
addedAt: "2026-09-06"
reviewedAt: "2026-10-05"
sources:
  - id: "official"
    title: "Official Spade language website"
    url: "https://spade-lang.org/"
    purpose: "official"
  - id: "code"
    title: "Canonical Spade Codeberg repository"
    url: "https://codeberg.org/spade-lang/spade"
    purpose: "code"
  - id: "readme"
    title: "Spade goals and contribution policy at the reviewed revision"
    url: "https://codeberg.org/spade-lang/spade/src/commit/9b427c8728c3c2992978f349c8dd4dd6ec9deda0/README.md"
  - id: "units"
    title: "Official guide to functions, entities and pipelines"
    url: "https://docs.spade-lang.org/units.html"
  - id: "project"
    title: "Official Spade project and Swim workflow"
    url: "https://docs.spade-lang.org/swim_project.html"
  - id: "simulation"
    title: "Swim test discovery, cocotb and Verilator implementation"
    url: "https://codeberg.org/spade-lang/swim/src/commit/d1bb5ee1a1643aa82681819d24b07491e8d792a4/src/simulation.rs"
  - id: "synthesis"
    title: "Swim synthesis scripts, dependencies, netlists and reports"
    url: "https://codeberg.org/spade-lang/swim/src/commit/d1bb5ee1a1643aa82681819d24b07491e8d792a4/src/synth.rs"
  - id: "implementation"
    title: "Swim FPGA constraints, routed outputs and detailed timing reports"
    url: "https://codeberg.org/spade-lang/swim/src/commit/d1bb5ee1a1643aa82681819d24b07491e8d792a4/src/pnr.rs"
  - id: "packing"
    title: "Swim bitstream packing for supported devices"
    url: "https://codeberg.org/spade-lang/swim/src/commit/d1bb5ee1a1643aa82681819d24b07491e8d792a4/src/packing.rs"
  - id: "swim-migration"
    title: "Swim's GitLab README records its Codeberg migration"
    url: "https://gitlab.com/spade-lang/swim/-/blob/11300ab523b3b6fb63d1b52ecd6b879ba3655580/README.md"
  - id: "changelog"
    title: "Spade release history and compatibility boundary"
    url: "https://codeberg.org/spade-lang/spade/src/commit/9b427c8728c3c2992978f349c8dd4dd6ec9deda0/CHANGELOG.md"
  - id: "release"
    title: "Spade 0.20.0: associated functions and version-aware LSP completion"
    url: "https://blog.spade-lang.org/v0-20-0/"
  - id: "packages"
    title: "Spade 0.19.0: Reef package index and language improvements"
    url: "https://blog.spade-lang.org/v0-19-0/"
  - id: "activity"
    title: "Correct integer-range diagnostics and regression snapshots"
    url: "https://codeberg.org/spade-lang/spade/commit/9b427c8728c3c2992978f349c8dd4dd6ec9deda0"
  - id: "activity-current"
    title: "Correct dereference lowering and memory initialization output"
    url: "https://codeberg.org/spade-lang/spade/commit/f5a4a5d5992381a3b8effe7c7131fa5342dd4dac"
---

### Implementation context

Spade draws on Rust and Clash while retaining low-level hardware control. Its units distinguish combinational functions, stateful entities and pipelines whose latency is checked by the compiler. Generics, algebraic data types and linear handling of inverted signals support reusable hardware abstractions; pipeline stage boundaries determine inserted registers. [Reviewed goals](#source-readme); [language overview](#source-official); [unit semantics](#source-units).

Swim manages project dependencies and compiler versions, compiles Spade into `build/spade.sv`, and integrates additional Verilog. Its test runner discovers and executes cocotb or C++/Verilator testbenches, supplies generated bindings and records failures and traces. Reef supplies package discovery and generated library documentation. [Project workflow](#source-project); [test implementation](#source-simulation); [package facilities](#source-packages).

The synthesis path assembles sources and include paths, generates Yosys commands for the chosen top and target, tracks rebuild dependencies, produces a JSON netlist and parses synthesis statistics. The physical path consumes that netlist with device/package and pin constraints, handles failed runs before publishing routed output, and presents detailed critical-path, frequency and utilization reports. Packing then converts supported routed configurations into programming files. These are implemented project workflows, with Yosys and nextpnr supplying the synthesis and physical algorithms. [Synthesis](#source-synthesis); [place-and-route](#source-implementation); [packing](#source-packing).

### Release boundary

Reviewed October 1, 2026 at `9b427c8728c3c2992978f349c8dd4dd6ec9deda0`. The September 30 head fixes range diagnostics that incorrectly printed uint as int and adds regression snapshots. The review uses the canonical Codeberg project 2600806, branch main; the former September pin is not reused as first-parent activity evidence. [Current project source](#source-readme); [meaningful activity](#source-activity).

The reviewed changelog still lists **0.20.0**, August 20, as its latest release entry and warns that 0.x releases may break compatibility. Swim was independently reopened at `d1bb5ee1a1643aa82681819d24b07491e8d792a4`; its simulation, Yosys synthesis, place-and-route and packing integrations remain present. Its separate history does not contribute to the compiler activity counts. [Release history](#source-changelog).

### Scope classification

Design covers typed RTL authoring and compilation. Verification covers the integrated testbench and simulation workflow. Synthesis covers the configured Yosys flow and netlist/statistics outputs. Layout covers supported FPGA implementation with constraints, routed artifacts, timing analysis and packing. The last two stages reflect meaningful integration in Swim, without attributing Yosys or nextpnr algorithms to the language compiler.

All stage AI booleans are false. The reviewed sources do not establish qualifying AI-assisted or AI-built implementation; the compiler's reviewed contribution policy explicitly excludes LLM-generated submissions. [Evidence boundary](#source-readme).

### Current activity review

Reviewed 2026-10-05. Dereference lowering now preserves a black-box alias and avoids panics, with compiler regressions. The preceding change also removes an invalid trailing comma in emitted memory initialization. These are concrete compiler/Synthesis corrections. [Reviewed change](#source-activity-current).
