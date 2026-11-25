---
name: "CVC"
aliases: ["Circuit Validity Checker","Voltage-aware ERC"]
summary: "Checks transistor-level CDL netlists for voltage, leakage, and connectivity violations across configured operating modes."
description: "Static voltage-aware electrical rule checker for transistor-level CDL netlists. Configured power states and device limits drive voltage propagation and checks for terminal overstress, leakage paths, floating inputs and expected voltage values; the analysis is not transient SPICE or physical latch-up simulation."
scope: {"simulation":{"ai":false}}
access: "GPL-3.0. Native C++ checker with a configured CDL netlist, device model settings and power definitions for each verification mode; build and optional results GUI have separate prerequisites."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/d-m-bailey/cvc"
    purpose: code
  - id: activity
    title: "April 9 Flex/Autoconf build compatibility correction"
    url: "https://github.com/d-m-bailey/cvc/commit/23c3867bb9c227ec395e2812b318379ffb9a0df9"
  - id: earlier
    title: "December 25 correction to inverter-loop detection"
    url: "https://github.com/d-m-bailey/cvc/commit/acfff11fa32ee300c9b07775ae7ce390daf38cc7"
  - id: ports
    title: "December 25 interactive subcircuit port display correction"
    url: "https://github.com/d-m-bailey/cvc/commit/4dbffb7271f048ced9aed0aad58313fefc888a1a"
  - id: checks
    title: "Retained device voltage, leakage, floating-input and expected-value checks"
    url: "https://github.com/d-m-bailey/cvc/blob/23c3867bb9c227ec395e2812b318379ffb9a0df9/src/CCvcDb_error.cc"
  - id: modes
    title: "Retained multi-mode circuit verification entry point"
    url: "https://github.com/d-m-bailey/cvc/blob/23c3867bb9c227ec395e2812b318379ffb9a0df9/src/CCvcDb_main.cc"
  - id: overview
    title: "Upstream project overview and setup"
    url: "https://github.com/d-m-bailey/cvc/blob/23c3867bb9c227ec395e2812b318379ffb9a0df9/README.md"
  - id: fork
    title: "Vibe-IC derivative: November 12 isolated native cell mode refinement"
    url: "https://github.com/vibeic/cvc/commit/bed5a1b1956dcdcba5a75ff750e4f508a9c9c4f3"
  - id: fork-regression
    title: "Derivative's retained settled-mode regression"
    url: "https://github.com/vibeic/cvc/blob/bed5a1b1956dcdcba5a75ff750e4f508a9c9c4f3/regressions/settled_mode_checks/test.py"
  - id: fork-provenance
    title: "Derivative's declared upstream lineage"
    url: "https://github.com/vibeic/cvc/blob/bed5a1b1956dcdcba5a75ff750e4f508a9c9c4f3/FORK_PROVENANCE.md"
---

## Scope and limits

CVC evaluates electrical constraints in a configured CDL transistor network. The retained implementation checks MOS terminal voltage limits, forward-biased diodes, possible leakage, floating inputs and expected voltage values. Its multi-mode driver processes configured verification modes. This is a static electrical evaluation, distinct from transient circuit simulation and from LVS's topological comparison. It cannot by itself establish time-dependent stress or parasitic thyristor latch-up behavior. Device and supply definitions determine which conditions are analyzed. [Electrical checks](#source-checks) · [Multi-mode entry point](#source-modes).

## Reviewed maintenance

December 25, 2025 integrates corrected inverter-loop detection and interactive port display. April 9, 2026 updates the Autoconf lexer check to request yywrap explicitly. This is a build compatibility correction, not an expansion of ERC coverage. [Loop correction](#source-earlier) · [Port correction](#source-ports) · [Build correction](#source-activity).

## Related implementation

The Vibe-IC derivative declares that it mirrors this upstream history. Its separate November 12 integration adds isolated native cell-mode refinement and regressions for settled latch and cascode findings. These changes are not represented as upstream functionality or upstream activity. The listing uses the original CVC repository as canonical and retains the derivative as related evidence rather than counting the same inherited history twice. No qualifying AI attribution was established for the reviewed upstream changes. No build or electrical check was independently reproduced. [Derivative lineage](#source-fork-provenance) · [Derivative integration](#source-fork) · [Regression](#source-fork-regression).
