---
name: "RustSpice"
summary: "Rust circuit simulation with sparse-solver specialization and DC adjoint sensitivity."
description: "Rust circuit simulator with topology-specialized sparse solvers, adaptive transient analysis and adjoint sensitivities at converged DC operating points. Its CLI compares supported SPICE decks with ngspice; current device coverage includes diodes and Level-1 MOSFETs, while published extracted-interconnect benchmarks cover RC networks and do not establish full-chip transistor-model support."
scope:
  simulation:
    ai: false
access: "Public Rust workspace under Apache-2.0 with a standalone CLI; the reviewed workspace requires Rust 1.100. Python and accelerator adapters are separate from the core solver, and differential reference runs require ngspice."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: Canonical public implementation
    url: https://github.com/lab-emi/RustSpice
    purpose: code
  - id: readme
    title: CLI entry points, implemented devices and model limits
    url: https://github.com/lab-emi/RustSpice/blob/6cdffef0f617bc9f37239179345b4a9176b86ff8/README.md
  - id: activity
    title: Buffered rawfile parsing with selected-column retention
    url: https://github.com/lab-emi/RustSpice/commit/d4d6a5043af226643d39ecc43f9a3859e29b0cc5
  - id: earlier-maintenance
    title: October 28 implementation of previously ignored device parameters
    url: https://github.com/lab-emi/RustSpice/commit/2fd287a191d99bd06ccada25c12a5c4a6e347086
  - id: rawfile-reader
    title: Retained buffered rawfile reader and parser regressions
    url: https://github.com/lab-emi/RustSpice/blob/6cdffef0f617bc9f37239179345b4a9176b86ff8/crates/rustspice-cli/src/bench/rawfile.rs
  - id: adjoint
    title: Transposed sparse solve and parameter contractions at the DC solution
    url: https://github.com/lab-emi/RustSpice/blob/6cdffef0f617bc9f37239179345b4a9176b86ff8/crates/rustspice-solver/src/adjoint.rs
  - id: sparse-solvers
    title: Topology-specialized symbolic and JIT solvers with sparse-LU fallback
    url: https://github.com/lab-emi/RustSpice/blob/6cdffef0f617bc9f37239179345b4a9176b86ff8/crates/rustspice-solver/src/linear.rs
  - id: verification
    title: Analytic circuit, DC finite-difference sensitivity and transient regressions
    url: https://github.com/lab-emi/RustSpice/blob/6cdffef0f617bc9f37239179345b4a9176b86ff8/crates/rustspice-solver/tests/golden_verification.rs
  - id: transient
    title: Adaptive transient integration and streamed output implementation
    url: https://github.com/lab-emi/RustSpice/blob/6cdffef0f617bc9f37239179345b4a9176b86ff8/crates/rustspice-solver/src/transient.rs
  - id: stream-tests
    title: Streamed and collected waveforms compared bit for bit
    url: https://github.com/lab-emi/RustSpice/blob/6cdffef0f617bc9f37239179345b4a9176b86ff8/crates/rustspice-solver/tests/tran_stream.rs
  - id: cli
    title: Simulation, adjoint and ngspice comparison commands
    url: https://github.com/lab-emi/RustSpice/blob/6cdffef0f617bc9f37239179345b4a9176b86ff8/crates/rustspice-cli/src/main.rs
  - id: benchmark-boundaries
    title: Host-specific RC benchmark methodology, noise flags and model exclusions
    url: https://github.com/lab-emi/RustSpice/blob/6cdffef0f617bc9f37239179345b4a9176b86ff8/docs/development-status.md
  - id: manifest
    title: Core and adapter crates, Rust toolchain and license
    url: https://github.com/lab-emi/RustSpice/blob/6cdffef0f617bc9f37239179345b4a9176b86ff8/Cargo.toml
---

### Implemented operation and selection

RustSpice exposes a standalone circuit-simulation CLI and a solver library within the RustEDA family. Its distinct operations are sparse-solver specialization, adaptive transient execution and DC parameter sensitivities. The adjoint API re-evaluates the Jacobian at a converged operating point, solves its transposed system and contracts the result with supported device-parameter derivatives. Tests compare diode and Level-1 MOSFET sensitivities with central finite differences. [Sparse solvers](#source-sparse-solvers) · [Adjoint implementation](#source-adjoint) · [Verification cases](#source-verification) · [CLI](#source-cli).

The reviewed sensitivity API is explicitly DC. Having transient simulation and an adjoint solver in the same workspace does not establish transient-adjoint sensitivity. Numerical sensitivity can feed an external sizing loop, but the inspected public operation is electrical evaluation, so this entry has conventional Simulation scope. The RustEDA umbrella and companion engines do not supply additional stages to this listing. [DC API](#source-adjoint) · [Transient solver](#source-transient).

### Coverage and result boundaries

The source includes linear devices, controlled sources, diodes and Level-1 MOSFETs. The documented current limits exclude BJT, JFET, MESFET, BSIM4 and IHP PSP103 compact models. The published Ibex-derived measurements use extracted RC interconnect decks, not transistor-level Ibex simulation. Reported performance comparisons are host/session-specific, with noisy timing cases and output-grid effects documented; no general speedup or foundry-model equivalence is asserted here. [Device limits](#source-readme) · [Benchmark methodology](#source-benchmark-boundaries).

Streaming transient tests compare emitted rows against collected rows and cover sink failure handling. Those are inspectable verification assets, separate from the project's published benchmark claims. [Stream implementation](#source-transient) · [Regression tests](#source-stream-tests).

### Activity review

October 28 work implements previously ignored diode, Level-1 MOS and controlled-element parameters and repairs shared CPU/Metal device handling. November 3 then addresses the comparison harness's memory use through buffered rawfile parsing. These are substantive follow-up changes to existing paths. The observed record remains short, concentrated in October and November; it does not establish long-term maintenance or validate the published speed comparisons. [Device corrections](#source-earlier-maintenance) · [Rawfile maintenance](#source-activity).

The reviewed meaningful first-parent checkpoint is 2026-11-03T20:00:28Z: the comparison harness changed from loading whole rawfiles to buffered, selected-column parsing, with executable regression coverage. The reader remains present at the reviewed head. Later documentation, toolchain and mechanical cleanup commits were not promoted to this meaningful-activity date. [Implementation change](#source-activity) · [Retained reader and tests](#source-rawfile-reader).

Review was static. Public implementation, tests and benchmark methods were inspected; upstream test execution, CPU/GPU performance and numerical accuracy were not independently reproduced.
