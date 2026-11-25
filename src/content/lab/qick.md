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
  - id: adc-interrupt-integration
    title: "November 20 RF board driver and ADC interrupt handling integration"
    url: "https://github.com/openquantumhardware/qick/commit/c5134cd935fa45df16565c4dc6a80f7cb371f435"
  - id: adc-interrupt-api
    title: "Retained ADC interrupt inspection and clearing implementation"
    url: "https://github.com/openquantumhardware/qick/blob/b2abda7b8ad092aca0b9c0ba5f28f429be32efe8/qick_lib/qick/qick.py"
  - id: filter-fix
    title: "November 20 RF filter frequency validation syntax repair"
    url: "https://github.com/openquantumhardware/qick/commit/b2abda7b8ad092aca0b9c0ba5f28f429be32efe8"
  - id: filter-retained
    title: "Retained RF hardware driver and frequency validation"
    url: "https://github.com/openquantumhardware/qick/blob/b2abda7b8ad092aca0b9c0ba5f28f429be32efe8/qick_lib/qick/drivers/hardware.py"
---

## Scope and limits

QICK implements programmable excitation and acquisition on RFSoC boards. Its real-time programs load pulse and readout settings, run repeated shots, stream ADC results and support parameter sweeps and averaging. This is a combined hardware-timed stimulus/readout workflow, not a general-purpose software instrument scheduler. Firmware for existing RFSoC boards does not establish a separate Board stage. [Acquisition program](#source-acquire-program).

The main application is quantum instrumentation; other RF experiments require appropriate application code, frontend bandwidth, clocking and calibration. The source does not establish precision oscillator phase-noise or jitter performance.

## Reviewed maintenance

October 2026 adds compile-time guards for oversized tone tables, envelopes and delays. November adds gain limits and corrects ADC reference-clock metadata to use the ADC tile's parameter rather than the DAC parameter. These substantive compiler and configuration changes follow prior hardware and software releases. [Pulse limits](#source-pulse-limits) · [Gain validation](#source-gain-check) · [Reference clock correction](#source-activity).

## Reviewed implementation and retention, November 25, 2026

November 20 integrates RF-board driver restructuring and an ADC interrupt-handling API that inspects converter interrupts, attempts bounded clearing, and can raise an error for observed or persistent interrupts. The driver explicitly identifies overrange and overvoltage indications as relevant to the supported RFSoC path. A same-day follow-up repairs invalid Python syntax in the RF filter frequency validation branch. These are concrete hardware-control and driver correctness changes; the interrupt API is not an independent protection interlock, a guarantee against overvoltage damage or evidence of calibrated ADC performance. The final same-day correction supersedes the November 12 ADC reference-clock metadata checkpoint. No physical RFSoC acquisition or driver test was independently executed. [Integration](#source-adc-interrupt-integration) · [Interrupt API](#source-adc-interrupt-api) · [Correction](#source-filter-fix) · [Retained driver](#source-filter-retained).
