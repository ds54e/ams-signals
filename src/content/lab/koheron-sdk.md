---
name: "Koheron SDK"
aliases: ["Koheron"]
description: "FPGA/Linux SDK for building measurement instruments with board drivers and Python clients. Its implementations include phase-noise acquisition, signed cross-spectral processing and a Red Pitaya hardware-test suite; instrument images and clients must match, and calibration and demonstrated noise floors remain specific to the board and setup."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  test: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Koheron credits Codex for the ALPHA250 chirp instrument’s FPGA logic, C++ driver and Python script. This evidence applies to that example, not the separate phase-noise instrument."
  sources: [chirp, chirp-code, development-retained]
  reviewedAt: "2026-11-24"
access: "Public SDK code; board, FPGA IP and toolchain terms are separate."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Project documentation"
    url: "https://www.koheron.com/software-development-kit/"
    purpose: official
  - id: code
    title: "Canonical project source"
    url: "https://github.com/Koheron/koheron-sdk"
    purpose: code
  - id: activity
    title: "Reviewed implementation or test change"
    url: "https://github.com/Koheron/koheron-sdk/commit/77861da8b5bc853b633cd0eed9ab8980b547f97f"
  - id: phase-noise
    title: "Phase-noise implementation notes"
    url: "https://github.com/Koheron/koheron-sdk/blob/199b8abb1388a41018c113a6877f713ab5e0d3d0/server/drivers/phase-noise/README.md"
  - id: chirp
    title: "Koheron account of the chirp instrument"
    url: "https://www.koheron.com/blog/2026/09/29/from-prompt-to-instrument/"
  - id: chirp-code
    title: "Merged ALPHA250 chirp instrument"
    url: "https://github.com/Koheron/koheron-sdk/commit/b813f1460b2610ca6e1458d61f4761e15d748d41"
  - id: board-support
    title: "Reviewed ALPHA250 board support and build configuration"
    url: "https://github.com/Koheron/koheron-sdk/tree/199b8abb1388a41018c113a6877f713ab5e0d3d0/boards/alpha250"
  - id: hardware-test
    title: "Executable Red Pitaya BIST workloads and failure checks"
    url: "https://github.com/Koheron/koheron-sdk/blob/199b8abb1388a41018c113a6877f713ab5e0d3d0/examples/red-pitaya/bist/tests/hardware_checks.py"
  - id: development-retained
    title: "Retained credited ALPHA250 capture logic"
    url: "https://github.com/Koheron/koheron-sdk/blob/199b8abb1388a41018c113a6877f713ab5e0d3d0/examples/alpha250/adc-dma-chirp/adc_capture_v1_0/adc_capture.v"
  - id: cross-spectrum
    title: "Streaming Welch auto-spectral and signed cross-spectral estimator"
    url: "https://github.com/Koheron/koheron-sdk/blob/199b8abb1388a41018c113a6877f713ab5e0d3d0/server/drivers/phase-noise/streaming-welch.hpp"
  - id: saved-analysis
    title: "Reopen saved phase-noise segments for spectral plotting"
    url: "https://github.com/Koheron/koheron-sdk/blob/199b8abb1388a41018c113a6877f713ab5e0d3d0/examples/alpha250-4/phase-noise-analyzer/python/plot_data.py"
  - id: quad-pna
    title: "ALPHA250-4 instrument revisions and hardware-validation boundaries"
    url: "https://github.com/Koheron/koheron-sdk/blob/199b8abb1388a41018c113a6877f713ab5e0d3d0/examples/alpha250-4/phase-noise-analyzer/README.md"
---

## Scope and limits

The V1 phase-noise instruments expose acquisition and numerical analysis through supported FPGA/server/client combinations. Their shared estimator computes Hann-windowed auto spectra and signed complex cross density; overlapping segment counts do not represent independent averages. The ALPHA250-4 Python workflow also reopens saved phase-noise segments for plotting, providing an offline Analysis entry point. [Processing guide](#source-phase-noise); [Estimator](#source-cross-spectrum); [Saved-record analysis](#source-saved-analysis).

ADC range, reference clock, overflow, detrending response and absolute noise-floor calibration remain setup-specific. The ALPHA250-4 documentation distinguishes the current split-filter configuration from measurements made with an earlier 200 MHz revision; those results do not qualify the later 250 MHz configuration. V1 clients and images must be matched to the instrument. [Instrument revision boundaries](#source-quad-pna).

Board support provides definitions and configuration to build instruments targeting the hardware. It is not a fabrication package for the board. [Board support](#source-board-support).

Test Automation is supported by the same-repository Red Pitaya BIST example. Its executable hardware checks repeat live workloads, inspect per-metric verdicts, exercise a missing-loopback negative case and cancellation/recovery, and save JSON reports. It requires the stated physical loopback setup; the AI-development attribution remains limited to the separately credited chirp example. [Hardware test suite](#source-hardware-test).
