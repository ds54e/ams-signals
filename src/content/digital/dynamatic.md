---
name: "Dynamatic"
aliases: []
description: "MLIR-based HLS compiler for C/C++ kernels that produces dynamically scheduled dataflow circuits and synthesizable RTL, addressing irregular memory and control behavior. Handshake IR and load-store queues organize execution, with C–RTL co-simulation, interactive dataflow visualization and a fixed-target Vivado synthesis/place-and-route flow for timing and utilization evaluation."
scope:
  design:
    ai: false
  synthesis:
    ai: false
  verification:
    ai: false
  layout:
    ai: false
access: "Public source academic compiler; optional simulation, model-checking, visualization and FPGA evaluation tools have separate installation requirements."
addedAt: "2026-09-06"
reviewedAt: "2026-09-06"
sources:
  - id: "official"
    title: "Official Dynamatic documentation"
    url: "https://epfl-lap.github.io/dynamatic/"
    purpose: "official"
  - id: "code"
    title: "Canonical EPFL-LAP Dynamatic repository"
    url: "https://github.com/EPFL-LAP/dynamatic"
    purpose: "code"
  - id: "readme"
    title: "Reviewed dynamic HLS purpose and supported hardware output"
    url: "https://github.com/EPFL-LAP/dynamatic/blob/83bfa9897f9a1b37d695b2c29e2bef4d2df449e6/README.md"
  - id: "frontend"
    title: "Current Clang/LLVM-to-MLIR frontend and memory analysis"
    url: "https://github.com/EPFL-LAP/dynamatic/blob/83bfa9897f9a1b37d695b2c29e2bef4d2df449e6/docs/DeveloperGuide/CompilerIntrinsics/Frontend.md"
  - id: "compile"
    title: "Current frontend, Handshake lowering and hardware optimization pipeline"
    url: "https://github.com/EPFL-LAP/dynamatic/blob/83bfa9897f9a1b37d695b2c29e2bef4d2df449e6/tools/dynamatic/scripts/compile.sh"
  - id: "commands"
    title: "User-facing compile, HDL, simulation, invariant and visualizer commands"
    url: "https://github.com/EPFL-LAP/dynamatic/blob/83bfa9897f9a1b37d695b2c29e2bef4d2df449e6/docs/UserGuide/CommandReference.md"
  - id: "memory"
    title: "Load-store queue behavior and current limitations"
    url: "https://github.com/EPFL-LAP/dynamatic/blob/83bfa9897f9a1b37d695b2c29e2bef4d2df449e6/docs/UserGuide/LSQ.md"
  - id: "verification"
    title: "User C testbenches, generated RTL comparison and simulation results"
    url: "https://github.com/EPFL-LAP/dynamatic/blob/83bfa9897f9a1b37d695b2c29e2bef4d2df449e6/docs/UserGuide/Verification.md"
  - id: "simulators"
    title: "Cosimulation implementation and supported simulator backends"
    url: "https://github.com/EPFL-LAP/dynamatic/blob/83bfa9897f9a1b37d695b2c29e2bef4d2df449e6/docs/DeveloperGuide/CompilerIntrinsics/Cosimulation.md"
  - id: "formal"
    title: "Generated formal properties for simulation and model checking"
    url: "https://github.com/EPFL-LAP/dynamatic/blob/83bfa9897f9a1b37d695b2c29e2bef4d2df449e6/docs/DeveloperGuide/DynamaticFeaturesAndOptimizations/FormalProperties.md"
  - id: "evaluation"
    title: "Fixed-target Vivado synthesis and physical PPA evaluation script"
    url: "https://github.com/EPFL-LAP/dynamatic/blob/83bfa9897f9a1b37d695b2c29e2bef4d2df449e6/tools/dynamatic/scripts/synthesize.sh"
  - id: "cli"
    title: "Current CLI connects synthesis/implementation to the selected kernel and target clock"
    url: "https://github.com/EPFL-LAP/dynamatic/blob/83bfa9897f9a1b37d695b2c29e2bef4d2df449e6/tools/dynamatic/dynamatic.cpp"
  - id: "xls-integration"
    title: "Opt-in experimental XLS integration and compatibility limits"
    url: "https://github.com/EPFL-LAP/dynamatic/blob/83bfa9897f9a1b37d695b2c29e2bef4d2df449e6/docs/DeveloperGuide/Xls/XlsIntegration.md"
  - id: "release"
    title: "Official Dynamatic v2.0.0 release, March 3, 2024"
    url: "https://github.com/EPFL-LAP/dynamatic/releases/tag/dynamatic-v2.0.0"
  - id: "activity"
    title: "Partition arrays and their accesses with generated control logic and tests"
    url: "https://github.com/EPFL-LAP/dynamatic/commit/83bfa9897f9a1b37d695b2c29e2bef4d2df449e6"
---

### Implementation context

Dynamatic is an academic dynamic HLS compiler developed at EPFL and ETH Zurich. It targets synchronous circuits whose operations proceed through dataflow handshakes as data and control become available, including kernels with irregular memory dependencies. The project describes C/C++ input; current user guides and the default flow focus on supported C kernels, without promising arbitrary C++ compatibility. [Project purpose](#source-readme); [current frontend](#source-frontend); [user commands](#source-commands).

The current default frontend uses Clang, selected LLVM optimizations and memory-dependence analysis before translating LLVM IR to standard MLIR dialects. Handshake lowering, buffer optimization and hardware conversion lead to synthesizable Verilog or VHDL. This current path supersedes the older Polygeist frontend description. When accesses cannot be disambiguated statically, generated load-store queues preserve required ordering while allowing supported out-of-order behavior. [Frontend architecture](#source-frontend); [implemented compilation pipeline](#source-compile); [LSQ behavior](#source-memory).

The `simulate` command compares generated RTL with the C implementation using inputs captured from the user's `CALL_KERNEL` testbench. Supported backends include ModelSim/Questa, Vivado XSim, GHDL and Verilator, subject to HDL/backend compatibility. Reports and waveforms support debugging, and `visualize` animates the resulting dataflow execution through Godot. This checks the supplied executions, not unrestricted formal C-to-RTL equivalence. Separately, generated-property infrastructure and `verify-invariants` support model checking of compiler-produced invariants with nuXmv. [Verification guide](#source-verification); [simulator integration](#source-simulators); [command interface](#source-commands); [formal-property boundary](#source-formal).

### Release boundary

The official **v2.0.0** release was published **March 3, 2024**, distinguishing the MLIR incarnation from the legacy LLVM-based version. It is not a 2026 release. This entry reviews **main** at `83bfa9897f9a1b37d695b2c29e2bef4d2df449e6` on September 6, 2026, including subsequent architecture and tool changes. The latest and meaningful commit, September 4 UTC, implements array partitioning and access control with integration tests. August also brought RTL operation support and Fast Token Delivery work. [Release](#source-release); [current implementation](#source-compile); [meaningful activity](#source-activity).

XLS interoperability is present behind the opt-in `--experimental-enable-xls` build flag, with separate experimental passes and compatibility patches. It is disabled by default and does not make Dynamatic equivalent to the XLS compilation flow. [Integration boundary](#source-xls-integration).

### Scope classification

Design covers kernel authoring and reusable MLIR/dataflow transformations. Synthesis covers HLS lowering, hardware optimization and RTL generation. Verification is justified by the documented user co-simulation, traces and inspection tools, independently of internal compiler regression tests.

Layout records a limited but implemented user-facing physical evaluation flow. The current `synthesize` CLI passes the selected kernel, output directory and target clock to a script that assembles HDL/IP resources, generates clock constraints, and runs Vivado synthesis, placement, physical optimization and routing, returning both post-synthesis and post-route timing/utilization reports. The device is fixed to Kintex-7 `xc7k160tfbg484-2` in out-of-context mode; this is not a general board/bitstream workflow. The assignment follows actual physical operations and delivered measurements, without requiring configurable devices or implying complete implementation coverage. [User command](#source-commands); [current CLI connection](#source-cli); [physical evaluation implementation](#source-evaluation).

All runtime stage AI booleans are false. The reviewed compiler, optimization and verification sources do not establish meaningful AI-built development provenance.
