---
name: "Red Pitaya software"
aliases: ["Red Pitaya"]
description: "Platform software for Red Pitaya instruments, with signal generation, triggered acquisition, streaming and host APIs. Its oscilloscope and spectrum applications expose time-domain and FFT measurements; results depend on the installed FPGA image, board model, input scaling, windowing and device calibration."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
access: "Public platform software; BSD-3-Clause applies to specified components. Hardware disclosure and third-party terms differ."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://redpitaya.readthedocs.io/en/latest/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/RedPitaya/RedPitaya"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/RedPitaya/RedPitaya/commit/0f7954f385e03aeace207d398d7ac63dd3224f79"
  - id: implementation
    title: "Specific implementation reviewed"
    url: "https://github.com/RedPitaya/RedPitaya/commit/587db32e7df14287c36f6b74c633ec4e3ef52883"
  - id: release
    title: "Release 2026.1"
    url: "https://github.com/RedPitaya/RedPitaya/releases/tag/Release_2026.1"
  - id: calibration
    title: "Reviewed legacy calibration initialization"
    url: "https://github.com/RedPitaya/RedPitaya/blob/0e46d64396a57752bf97315789d6cc6c9fbddad8/rp-api/api-hw-calib/src/calib.cpp"
  - id: spectrum-app
    title: "Spectrum application controls for windowing, impedance and probe scaling"
    url: "https://github.com/RedPitaya/RedPitaya/blob/0e46d64396a57752bf97315789d6cc6c9fbddad8/apps-tools/spectrumpro/src/main.cpp"
  - id: spectrum-dsp
    title: "Window, FFT and amplitude/power conversion implementation"
    url: "https://github.com/RedPitaya/RedPitaya/blob/0e46d64396a57752bf97315789d6cc6c9fbddad8/rp-api/api-dsp/src/rp_dsp.cpp"
---

## Scope and limits

The spectrum application exposes FFT-window, DC-removal, buffer-length, impedance and probe-factor controls. Its DSP implementation applies those settings during spectral and amplitude/power conversion, establishing Analysis beyond streaming acquired samples. A spectral result must be interpreted with those settings and the corresponding board/input calibration. [Spectrum application](#source-spectrum-app); [DSP implementation](#source-spectrum-dsp).

Release 2026.1 includes streaming and calibration work. Initialization can fall back to default calibration values for some invalid legacy records; success does not prove the origin or validity of device calibration. [Reviewed change](#source-implementation); [Release](#source-release); [Legacy calibration initialization](#source-calibration).
