---
name: "tpt-electronics"
aliases: ["TPT Electronics"]
summary: "Reusable Rust electronic-system modeling libraries for PDN, electrothermal and RF circuit evaluation and filter synthesis."
description: "Modular Rust electronic-system analysis libraries with lumped PDN impedance, decoupling selection, coupled conduction and Joule heating, and RF filter synthesis. The electrical and thermal models expose reusable native APIs and selected WASM interfaces; simplified component and geometry assumptions limit their use as signoff models."
scope: {"design":{"ai":false},"simulation":{"ai":false}}
access: "MIT OR Apache-2.0 for reviewed library crates; Rust toolchain and appropriate input models are required. Selected WASM and Python interfaces have separate build prerequisites."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/tpt-solutions/tpt-electronics"
    purpose: code
  - id: activity
    title: "September 26 elliptic prototype implementation and SciPy reference checks"
    url: "https://github.com/tpt-solutions/tpt-electronics/commit/e234d1ee5e6686721777ad6118303b633e08cf1c"
  - id: earlier
    title: "September 25 expanded CLI and WASM PDN/circuit interfaces"
    url: "https://github.com/tpt-solutions/tpt-electronics/commit/e48f4a93a7d6a3c423ee2b04f28ca2671a779b99"
  - id: initial
    title: "September 15 initial multi-crate solver implementation"
    url: "https://github.com/tpt-solutions/tpt-electronics/commit/f39e28052e4fd89c35a29dd3a39e0ab35f09ba4c"
  - id: pdn
    title: "Retained lumped PDN impedance and decoupling search"
    url: "https://github.com/tpt-solutions/tpt-electronics/blob/1bf8a17befa9368ec031da3ba091b6b30b754f9c/crates/signal-integrity/tpt-elec-pi-pdn/src/lib.rs"
  - id: joule
    title: "Retained voxel-grid electrothermal coupling"
    url: "https://github.com/tpt-solutions/tpt-electronics/blob/1bf8a17befa9368ec031da3ba091b6b30b754f9c/crates/thermal/tpt-elec-joule/src/lib.rs"
  - id: decoupling
    title: "Retained approximate mounting-inductance and antiresonance helpers"
    url: "https://github.com/tpt-solutions/tpt-electronics/blob/1bf8a17befa9368ec031da3ba091b6b30b754f9c/crates/signal-integrity/tpt-elec-pi-decoupling/src/lib.rs"
  - id: elliptic
    title: "Retained elliptic prototype algorithm and reference test"
    url: "https://github.com/tpt-solutions/tpt-electronics/blob/1bf8a17befa9368ec031da3ba091b6b30b754f9c/crates/rf/tpt-elec-rf-filters/src/elliptic.rs"
  - id: wasm
    title: "Retained WASM analysis interfaces"
    url: "https://github.com/tpt-solutions/tpt-electronics/blob/1bf8a17befa9368ec031da3ba091b6b30b754f9c/crates/core/tpt-elec-wasm/src/lib.rs"
---

## Scope and limits

The native Rust libraries expose electrical and electrothermal models and filter synthesis separately from external EDA orchestration. PDN analysis combines lumped regulator and capacitor models and searches decoupling configurations; the mounting helper uses an order-of-magnitude loop-length approximation. The Joule-heating implementation iterates a voxel-grid conduction solve, heat dissipation and temperature-dependent resistivity with a reported convergence flag. Unlike PCB Power Integrity Lab, these are reusable native numerical components rather than an Elmer/ngspice pipeline. [PDN](#source-pdn) · [Mounting model](#source-decoupling) · [Joule solver](#source-joule).

The filter crate implements elliptic prototype synthesis with vendored SciPy reference values used by a regression. These limited model and test paths do not establish general SPICE equivalence, distributed package extraction or signoff accuracy across the full workspace. [Filter algorithm](#source-elliptic).

## Reviewed maintenance

September 15 publishes the initial solver libraries; September 25 integrates new executable CLI and WASM paths, including PDN analysis; September 26 adds elliptic prototype synthesis and reference checks. Later CI and build changes remain raw history. Public engineering follow-through is concentrated in September and longer-term maintenance remains unestablished. No tests were independently run; no qualifying AI-development attribution was established from the reviewed changes. [Initial code](#source-initial) · [Interface expansion](#source-earlier) · [Retained WASM](#source-wasm) · [Synthesis change](#source-activity).
