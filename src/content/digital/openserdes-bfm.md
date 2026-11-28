---
name: "openSERDES_BFM"
aliases: ["GateMate SerDes BFM"]
description: "SystemVerilog behavioral replacement for the CologneChip GateMate SerDes wrapper, with selectable CDR fidelity, PLL/reset sequencing, 8b/10b, PRBS, loopback and receive-clock correction. Includes executable simulator regressions and coding proofs; the IHP SG13G2 and GF180MCU targets are still planned."
scope:
  verification: { ai: false }
access: "Public BFM, synthesis wrapper and regression sources; the physical GateMate macro and appropriate simulator tools are separate."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical public SerDes model repository"
    url: "https://github.com/chili-chips/openSERDES_BFM"
    purpose: code
  - id: readme
    title: "Target availability and simulation self-tests"
    url: "https://github.com/chili-chips/openSERDES_BFM/blob/14c4fef849de8f2faa9f46dbb77e3a77ebc41855/README.md"
  - id: target
    title: "GateMate wrapper contract, model fidelity and exclusions"
    url: "https://github.com/chili-chips/openSERDES_BFM/blob/14c4fef849de8f2faa9f46dbb77e3a77ebc41855/1.gatemate/README.md"
  - id: activity
    title: "November 24 configurable RX polarity latency and regression"
    url: "https://github.com/chili-chips/openSERDES_BFM/commit/14c4fef849de8f2faa9f46dbb77e3a77ebc41855"
  - id: prior-fix
    title: "November 23 PLL/reset and receiver behavior corrections"
    url: "https://github.com/chili-chips/openSERDES_BFM/commit/a961a76669d9380cb17df63b932fd209a554052d"
  - id: model
    title: "Retained SystemVerilog SerDes BFM"
    url: "https://github.com/chili-chips/openSERDES_BFM/blob/14c4fef849de8f2faa9f46dbb77e3a77ebc41855/1.gatemate/1.model/ccfpga_serdes.BFM.sv"
  - id: regression
    title: "Executable model rules and polarity-latency tests"
    url: "https://github.com/chili-chips/openSERDES_BFM/blob/14c4fef849de8f2faa9f46dbb77e3a77ebc41855/1.gatemate/3.sim-regression/tb_rules.sv"
  - id: formal
    title: "Executable 8b/10b exhaustive formal test"
    url: "https://github.com/chili-chips/openSERDES_BFM/blob/14c4fef849de8f2faa9f46dbb77e3a77ebc41855/1.gatemate/2.formal/fv_8b10b_exhaustive.sv"
---

### Implementation and selection

The GateMate model substitutes the vendor ccfpga_serdes simulation wrapper while keeping the interface for the design's synthesis wrapper. It provides protocol-facing behavioral checks with selectable CDR models, modeled PLL clock and lock sequencing, transmitter and receiver coding, PRBS and receive-buffer behavior. The November 23 implementation corrects behavior following reported lab observations; the November 24 revision adds configurable RX polarity latency and corresponding executable tests. This is reusable verification IP rather than an incidental RTL tutorial. [Target contract](#source-target) · [Prior correction](#source-prior-fix) · [Model](#source-model) · [Regression](#source-regression).

### Scope and limits

The BFM's PLL lock time and line/receiver behavior are behavioral approximations. It does not implement transistor-level PLL noise, channel equalization or analog jitter-tolerance signoff. The IHP SG13G2 and GF180MCU model targets remain plans. The synthesis wrapper selects the vendor hard macro rather than implementing a synthesizer or a general SerDes generator. Verification is conventional; upstream test and proof results were not independently reproduced. [Availability](#source-readme) · [Formal test](#source-formal) · [Activity](#source-activity).
