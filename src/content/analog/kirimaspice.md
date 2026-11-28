---
name: "kirimaspice"
aliases: ["KirimaSPICE"]
summary: "C++23 SPICE simulator using KLU with explicit reference-comparison and device-model limitations."
description: "Early C++23 SPICE simulator using SuiteSparse KLU for operating-point, DC sweep, transient, AC, transfer-function and small-signal noise analyses. Includes compact-model implementations and ngspice comparison tests; device-model coverage varies, and the CLI still skips some parsed analyses including Monte Carlo and sensitivity."
scope:
  simulation: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Fable 5.2 is explicitly credited on the November 28 lossy transmission-line DC/AC stamping correction. The reviewed source retains the zero-frequency two-port implementation and associated transfer-function tests."
  sources: ["activity","line","line-tests"]
  reviewedAt: "2026-11-28"
access: "Public C++23 source, Apache-2.0 with LLVM exception; requires CMake, SuiteSparse and the documented build dependencies. No release had been published at the reviewed revision."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical kirimaspice implementation"
    url: "https://github.com/kurochan001/kirimaspice"
    purpose: code
  - id: readme
    title: "Supported analyses, device models and reference-test boundaries"
    url: "https://github.com/kurochan001/kirimaspice/blob/1ed73318150dec94a0a1d57c8a7a6e5cf022c560/README.md"
  - id: activity
    title: "November 28 zero-frequency lossy-line stamping repair"
    url: "https://github.com/kurochan001/kirimaspice/commit/10a07a968364483019289eb008dfc0b5971ed006"
  - id: line
    title: "Retained lossy-line two-port implementation"
    url: "https://github.com/kurochan001/kirimaspice/blob/1ed73318150dec94a0a1d57c8a7a6e5cf022c560/src/devices/tline_lossy.cpp"
  - id: line-tests
    title: "Executable transfer-function tests"
    url: "https://github.com/kurochan001/kirimaspice/blob/1ed73318150dec94a0a1d57c8a7a6e5cf022c560/tests/unit/test_transfer_function.cpp"
  - id: noise-change
    title: "November 28 CLI noise analysis integration"
    url: "https://github.com/kurochan001/kirimaspice/commit/3854fbd6e3cef140c96682f90a4ce0c605b357b5"
  - id: noise
    title: "Adjoint solver and input-source noise referral"
    url: "https://github.com/kurochan001/kirimaspice/blob/1ed73318150dec94a0a1d57c8a7a6e5cf022c560/src/solvers/noise_solver.cpp"
  - id: earlier-tests
    title: "November 23 device comparison fixture repair"
    url: "https://github.com/kurochan001/kirimaspice/commit/1a8a33472b555a534fd4b06cb21fd3a5327b80b5"
  - id: known-issues
    title: "Known limitations and reference comparison evidence"
    url: "https://github.com/kurochan001/kirimaspice/blob/1ed73318150dec94a0a1d57c8a7a6e5cf022c560/KNOWN_ISSUES.md"
  - id: ai-policy
    title: "Maintainer development policy"
    url: "https://github.com/kurochan001/kirimaspice/blob/1ed73318150dec94a0a1d57c8a7a6e5cf022c560/docs/spec/AI_POLICY.md"
  - id: related
    title: "Related independently maintained SystemVerilog simulator"
    url: "https://github.com/kurochan001/kirimasim"
---

### Implementation and selection

The CLI reads SPICE netlists and executes the documented electrical analyses using a KLU-backed solver. The November 23 device-card regression changes and November 28 implementation of source-referred small-signal noise and repair of zero-frequency transmission-line stamping demonstrate technical follow-through after initial implementation. The latter uses a finite-conductance wire approximation when the series impedance vanishes, with executable transfer-function checks. [Overview](#source-readme) · [Earlier tests](#source-earlier-tests) · [Noise integration](#source-noise-change) · [Noise solver](#source-noise) · [Line implementation](#source-line) · [Regression](#source-line-tests).

### Scope and limits

The project's explicit ngspice comparison fixtures and supported compact-model paths distinguish it from a basic circuit-solver demonstration. The maintainer reports 1,505 passing tests on November 23, including a live comparison at a specific earlier revision. That does not establish comprehensive compact-model, noise or SPICE compatibility, and some reference artifact origins are not confirmed. The current source exposes small-signal noise rather than oscillator periodic phase noise. The CLI does not execute all library analyses. It remains an unreleased project. [Known issues](#source-known-issues) · [Overview](#source-readme).

Simulation is conventional numerical execution. Explicit credited changes to executable code support AI-ASSISTED development, not runtime AI. The catalog did not rerun upstream tests or compare numerical output. The related kirimasim is a separate digital simulator; this does not imply integrated AMS co-simulation. [Credited activity](#source-activity) · [Development policy](#source-ai-policy) · [Related simulator](#source-related).
