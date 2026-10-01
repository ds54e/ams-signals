---
name: "Amaranth HDL"
aliases: ["Amaranth"]
description: "Python HDL and hardware construction toolchain with typed signals, reusable interfaces and a native simulator for testbenches and waveform generation. Its build system specializes device primitives, generates constraints and drives Yosys or vendor synthesis through FPGA placement, routing and bitstream creation."
scope:
  design:
    ai: false
  synthesis:
    ai: false
  verification:
    ai: false
  layout:
    ai: false
access: "Public source Python language and toolchain; native simulation is included, while FPGA builds require the selected external toolchain."
addedAt: "2026-09-06"
reviewedAt: "2026-10-01"
sources:
  - id: "official"
    title: "Official Amaranth language and toolchain documentation"
    url: "https://amaranth-lang.org/docs/amaranth/latest/"
    purpose: "official"
  - id: "code"
    title: "Canonical Amaranth repository"
    url: "https://github.com/amaranth-lang/amaranth"
    purpose: "code"
  - id: "readme"
    title: "Reviewed Amaranth toolchain and platform support"
    url: "https://github.com/amaranth-lang/amaranth/blob/90449f1e6d5abdfb8cac7519ac7b34d83a9f42b7/README.md"
  - id: "language"
    title: "Current language guide: values, shapes, modules and elaboration"
    url: "https://github.com/amaranth-lang/amaranth/blob/56f1cab5a19240d54e1bf587a27d831bade6de61/docs/guide.rst"
  - id: "toolchain"
    title: "Language, standard library, simulator and platform integration"
    url: "https://amaranth-lang.org/docs/amaranth/latest/intro.html"
  - id: "simulator"
    title: "Current async testbench API and waveform capture"
    url: "https://github.com/amaranth-lang/amaranth/blob/90449f1e6d5abdfb8cac7519ac7b34d83a9f42b7/docs/simulator.rst"
  - id: "verilog"
    title: "RTLIL-to-Verilog conversion through Yosys"
    url: "https://github.com/amaranth-lang/amaranth/blob/56f1cab5a19240d54e1bf587a27d831bade6de61/amaranth/back/verilog.py"
  - id: "build"
    title: "Platform elaboration, portable build plans and build products"
    url: "https://github.com/amaranth-lang/amaranth/blob/56f1cab5a19240d54e1bf587a27d831bade6de61/amaranth/build/plat.py"
  - id: "implementation"
    title: "Lattice device primitives, synthesis, pin/clock constraints and bitstream flows"
    url: "https://github.com/amaranth-lang/amaranth/blob/90449f1e6d5abdfb8cac7519ac7b34d83a9f42b7/amaranth/vendor/_lattice.py"
  - id: "changelog"
    title: "Main-branch release history and unreleased 0.6 interface changes"
    url: "https://github.com/amaranth-lang/amaranth/blob/90449f1e6d5abdfb8cac7519ac7b34d83a9f42b7/docs/changes.rst"
  - id: "release"
    title: "Amaranth 0.5.10 release"
    url: "https://github.com/amaranth-lang/amaranth/releases/tag/v0.5.10"
  - id: "activity"
    title: "Add iteration over hardware value bits"
    url: "https://github.com/amaranth-lang/amaranth/commit/e3c9215e195443aefde6c9591409d74802bdd10f"
---

### Implementation context

Amaranth uses ordinary Python to construct synchronous digital hardware during elaboration. Modules, signals with explicit shapes, clock domains, finite-state machines and typed component signatures describe hardware rather than executing the eventual circuit as ordinary Python. The standard library includes reusable interfaces, FIFOs, clock-domain crossing primitives and I/O buffers. [Language guide](#source-language); [toolchain overview](#source-toolchain).

The native simulator supports testbenches written as `async` Python functions with `SimulatorContext` operations, clocks, signal inspection and VCD waveform capture. This is a documented user-facing test environment. The current simulator guide is used here instead of the older generator-function wording still present in the introduction. [Current simulation API](#source-simulator).

Verilog export lowers Amaranth's RTLIL through Yosys conversion passes; export alone is not the basis for Synthesis. Platform builds additionally run target synthesis and implementation. For example, the Lattice integration selects device-specific buffers and tools, emits Yosys synthesis scripts and JSON netlists, derives LPF pin/clock constraints, drives nextpnr and packs binary/JTAG outputs. Portable build plans carry these inputs and scripts, with customization hooks and returned build products. [Verilog conversion](#source-verilog); [build API](#source-build); [implemented platform flow](#source-implementation).

### Release boundary

Reviewed October 1, 2026 at `90449f1e6d5abdfb8cac7519ac7b34d83a9f42b7`. The September 18 head changes documentation. The meaningful August 23 implementation makes hardware values iterable and updates flattening behavior with tests; documentation traffic is not promoted to implementation activity. [Current project source](#source-readme); [meaningful activity](#source-activity).

The latest stable release is **0.5.10**, published September 10, while the main-branch changelog continues to identify 0.6.0 as unreleased. Current-branch changes must not all be attributed to the stable release. [Stable release](#source-release); [changelog](#source-changelog).

### Scope classification

Design covers Python hardware construction, elaboration and reusable components. Verification covers native simulation, testbenches and waveforms. Synthesis covers configured target synthesis in platform builds. Layout covers generated pin/clock constraints, device-specific placement/routing inputs and programming artifacts. This is substantial platform integration, beyond an incidental invocation of nextpnr or vendor tools; those external tools still supply the physical algorithms.

All runtime stage AI booleans are false. The reviewed sources do not establish qualifying AI-assisted or AI-built implementation.
