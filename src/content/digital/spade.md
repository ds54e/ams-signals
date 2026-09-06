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
reviewedAt: "2026-09-06"
sources:
  - id: "official"
    title: "Official Spade language website"
    url: "https://spade-lang.org/"
    purpose: "official"
  - id: "code"
    title: "Canonical Spade GitLab repository"
    url: "https://gitlab.com/spade-lang/spade"
    purpose: "code"
  - id: "readme"
    title: "Spade goals and contribution policy at the reviewed revision"
    url: "https://gitlab.com/spade-lang/spade/-/blob/c48e232694966e52104498c4887ee6c860f17114/README.md"
  - id: "units"
    title: "Official guide to functions, entities and pipelines"
    url: "https://docs.spade-lang.org/units.html"
  - id: "project"
    title: "Official Spade project and Swim workflow"
    url: "https://docs.spade-lang.org/swim_project.html"
  - id: "simulation"
    title: "Swim test discovery, cocotb and Verilator implementation"
    url: "https://codeberg.org/spade-lang/swim/src/commit/32d464ce68d6ab342910c9f2abe7e7b6837899bd/src/simulation.rs"
  - id: "synthesis"
    title: "Swim synthesis scripts, dependencies, netlists and reports"
    url: "https://codeberg.org/spade-lang/swim/src/commit/32d464ce68d6ab342910c9f2abe7e7b6837899bd/src/synth.rs"
  - id: "implementation"
    title: "Swim FPGA constraints, routed outputs and detailed timing reports"
    url: "https://codeberg.org/spade-lang/swim/src/commit/32d464ce68d6ab342910c9f2abe7e7b6837899bd/src/pnr.rs"
  - id: "packing"
    title: "Swim bitstream packing for supported devices"
    url: "https://codeberg.org/spade-lang/swim/src/commit/32d464ce68d6ab342910c9f2abe7e7b6837899bd/src/packing.rs"
  - id: "swim-migration"
    title: "Swim's GitLab README records its Codeberg migration"
    url: "https://gitlab.com/spade-lang/swim/-/blob/11300ab523b3b6fb63d1b52ecd6b879ba3655580/README.md"
  - id: "changelog"
    title: "Reviewed Spade release history and compatibility boundary"
    url: "https://gitlab.com/spade-lang/spade/-/blob/c48e232694966e52104498c4887ee6c860f17114/CHANGELOG.md"
  - id: "release"
    title: "Spade 0.20.0: associated functions and version-aware LSP completion"
    url: "https://blog.spade-lang.org/v0-20-0/"
  - id: "packages"
    title: "Spade 0.19.0: Reef package index and language improvements"
    url: "https://blog.spade-lang.org/v0-19-0/"
  - id: "activity"
    title: "Propagate non-Data values through if and match blocks"
    url: "https://gitlab.com/spade-lang/spade/-/commit/c48e232694966e52104498c4887ee6c860f17114"
---

### Implementation context

Spade draws on Rust and Clash while retaining low-level hardware control. Its units distinguish combinational functions, stateful entities and pipelines whose latency is checked by the compiler. Generics, algebraic data types and linear handling of inverted signals support reusable hardware abstractions; pipeline stage boundaries determine inserted registers. [Reviewed goals](#source-readme); [language overview](#source-official); [unit semantics](#source-units).

Swim manages project dependencies and compiler versions, compiles Spade into `build/spade.sv`, and integrates additional Verilog. Its test runner discovers and executes cocotb or C++/Verilator testbenches, supplies generated bindings and records failures and traces. Reef supplies package discovery and generated library documentation. [Project workflow](#source-project); [test implementation](#source-simulation); [package facilities](#source-packages).

The synthesis path assembles sources and include paths, generates Yosys commands for the chosen top and target, tracks rebuild dependencies, produces a JSON netlist and parses synthesis statistics. The physical path consumes that netlist with device/package and pin constraints, handles failed runs before publishing routed output, and presents detailed critical-path, frequency and utilization reports. Packing then converts supported routed configurations into programming files. These are implemented project workflows, with Yosys and nextpnr supplying the synthesis and physical algorithms. [Synthesis](#source-synthesis); [place-and-route](#source-implementation); [packing](#source-packing).

### Release boundary

Reviewed Spade at `c48e232694966e52104498c4887ee6c860f17114` on September 6, 2026. Releases **0.17.0**, **0.18.0**, **0.19.0** and **0.20.0** shipped in March, April, May and August respectively. The current release, August 20, adds associated functions and LSP completion aware of the project's compiler version; May introduced Reef and copy views. The actual dates show sustained substantive releases, rather than an uninterrupted six-week cadence. The project still warns that 0.x releases can break compatibility. [Release history](#source-changelog); [August release](#source-release); [May release](#source-packages).

The latest and meaningful compiler commit is September 5 UTC, extending non-`Data` values through conditional blocks with lowering, code-generation and simulation tests. Activity uses the complete first-parent history of canonical GitLab project **20965359**, branch **main**. Swim separately migrated to Codeberg on August 24; its implementation references pin `32d464ce68d6ab342910c9f2abe7e7b6837899bd`. This migration does not replace Spade's repository authority. [Compiler activity](#source-activity); [Swim migration](#source-swim-migration).

### Scope classification

Design covers typed RTL authoring and compilation. Verification covers the integrated testbench and simulation workflow. Synthesis covers the configured Yosys flow and netlist/statistics outputs. Layout covers supported FPGA implementation with constraints, routed artifacts, timing analysis and packing. The last two stages reflect meaningful integration in Swim, without attributing Yosys or nextpnr algorithms to the language compiler.

All stage AI booleans are false. The reviewed sources do not establish meaningful AI-built development provenance; the compiler's current contribution policy explicitly excludes LLM-generated submissions. [Evidence boundary](#source-readme).
