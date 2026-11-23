---
name: RustSTA
aliases: []
description: "Rust static timing engine for gate-level Verilog, Liberty, SDC and SPEF. It computes multi-corner setup and hold timing and stores results for path queries without rerunning analysis. The Rust API supports incremental updates; the CLI update recomputes timing, and generated clocks, CPPR and crosstalk are outside the supported scope."
scope:
  layout:
    ai: false
access: "Apache-2.0 source with a standalone CPU build. Optional CUDA and ngspice cross-check paths are experimental."
addedAt: "2026-11-23"
reviewedAt: "2026-11-23"
sources:
  - id: code
    title: Canonical public RustSTA implementation
    url: https://github.com/lab-emi/RustSTA
    purpose: code
  - id: website
    title: Official RustSTA documentation
    url: https://lab-emi.github.io/RustSTA/
    purpose: official
  - id: readme
    title: Quickstart and operating boundaries at the reviewed revision
    url: https://github.com/lab-emi/RustSTA/blob/d919d7aeec36dc2bc107dfa2664d8fe939c06e1e/README.md
  - id: activity
    title: Integrated Liberty-unit handling and RC fallback
    url: https://github.com/lab-emi/RustSTA/commit/4f2d2ec652a8bf55b2fbf8c28e7ff1cc260d0a4d
  - id: implementation
    title: Mixed-library timing and parallel RC preparation
    url: https://github.com/lab-emi/RustSTA/commit/44926a3e392343819dcfa4eb57ef0c3e082e8e80
  - id: status
    title: Integrated scope and development evidence
    url: https://lab-emi.github.io/RustSTA/development-status/
  - id: integration
    title: RustEDA benchmark inputs, measurements and caveats
    url: https://lab-emi.github.io/RustEDA/benchmarks/
---

### Implemented workflow and limits

The standalone RustSTA CLI imports a design revision, calculates timing across corners and stores results for endpoint and path queries. Its extracted-RC workflow supports effective capacitance and explicitly propagated primary clocks within the documented limits. The incremental session is a Rust API capability; the CLI update recomputes timing. Generated clocks, common-path pessimism removal, CCS/ECSM and crosstalk are outside the reviewed support. This backend timing and closure work is conventional Layout, not runtime AI. [Quickstart](#source-readme) · [Integrated scope](#source-status)

### Selection and activity

RustSTA is the timing engine in RustEDA but can be built and invoked separately. The catalog tracks this canonical engine repository, not superproject or dependency history. The published code went beyond the October snapshot: November 1 adds mixed-library timing and bounded parallel RC preparation, and the November 14 integration adds per-library unit handling and an explicit lumped fallback for drivers that cannot be fitted. The later structural module split and branding changes are not used as the substantive activity checkpoint. [First implementation checkpoint](#source-implementation) · [Integrated correction](#source-activity)

The maintainers compare against OpenSTA on specific inputs and use both tools in reported RustEDA signoff checks. Such results describe the selected platform, layouts, corners and timing modes rather than independent validation or a general replacement for OpenSTA. [Comparison and qualification](#source-integration)
