---
name: "Koheron SDK"
aliases: ["Koheron"]
description: "FPGA and software development kit for Koheron instruments, with board designs, server drivers and client APIs. Example instruments demonstrate synchronized data paths and spectral processing; the supported functions and bandwidth depend on the board and instrument implementation."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Koheron credits Codex for the ALPHA250 chirp instrument’s FPGA logic, C++ driver and Python script. This evidence applies to that example, not the separate phase-noise instrument."
  sources: [chirp, chirp-code]
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
---

## Scope and limits

The [phase-noise example](#source-phase-noise) is a specific DSP implementation. ADC range, reference clock, overflow, calibration and demonstrated noise floor remain setup-specific. The V1 SDK is not a compatibility claim for V0 instruments.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.
