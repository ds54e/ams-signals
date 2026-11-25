---
name: "QICK"
aliases: ["Quantum Instrumentation Control Kit"]
description: "RFSoC-based instrumentation platform for programmable pulse generation and digitized readout. FPGA firmware and a Python API execute hardware-timed measurement sequences, parameter sweeps and averaging on supported RFSoC development boards, primarily for quantum-system experiments."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  test: { ai: false }
access: "MIT repository license; requires compatible RFSoC hardware and matching firmware. FPGA build tools and vendor IP have separate requirements."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: website
    title: "Project documentation"
    url: "https://docs.qick.dev/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/openquantumhardware/qick"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/openquantumhardware/qick/commit/515933320587f32995573571451379c41f4e2c4c"
  - id: pulse-limits
    title: "October hardware-program compile-time range checks"
    url: "https://github.com/openquantumhardware/qick/commit/667221549146811c78d4565fa8890896a3a84089"
  - id: gain-check
    title: "November gain range validation"
    url: "https://github.com/openquantumhardware/qick/commit/08a1a69116f10a3d83d3fb3d03bd0d96a518e756"
  - id: acquire-program
    title: "Hardware program loading, ADC readout and sweep execution"
    url: "https://github.com/openquantumhardware/qick/blob/b2abda7b8ad092aca0b9c0ba5f28f429be32efe8/qick_lib/qick/averager_program.py"
---

## Scope and limits

QICK implements programmable excitation and acquisition on RFSoC boards. Its real-time programs load pulse and readout settings, run repeated shots, stream ADC results and support parameter sweeps and averaging. This is a combined hardware-timed stimulus/readout workflow, not a general-purpose software instrument scheduler. Firmware for existing RFSoC boards does not establish a separate Board stage. [Acquisition program](#source-acquire-program).

The main application is quantum instrumentation; other RF experiments require appropriate application code, frontend bandwidth, clocking and calibration. The source does not establish precision oscillator phase-noise or jitter performance.

## Reviewed maintenance

October 2026 adds compile-time guards for oversized tone tables, envelopes and delays. November adds gain limits and corrects ADC reference-clock metadata to use the ADC tile's parameter rather than the DAC parameter. These substantive compiler and configuration changes follow prior hardware and software releases. [Pulse limits](#source-pulse-limits) · [Gain validation](#source-gain-check) · [Reference clock correction](#source-activity).
