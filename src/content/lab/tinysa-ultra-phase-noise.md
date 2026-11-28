---
name: "tinySA Ultra Phase Noise"
aliases: ["tinySA-Ultra-Phase-Noise"]
description: "Python application that automates single-sideband noise measurements with a tinySA Ultra spectrum analyzer, joining offset-frequency sweeps, normalizing to carrier level and applying measured equivalent-noise-bandwidth corrections. The measurement is limited by analyzer local-oscillator noise, drift and the instrument's band transition."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
access: "MIT Python source; requires a compatible tinySA Ultra and USB serial connection. Hardware and firmware coverage is limited to the documented setup."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical tinySA phase-noise application"
    url: "https://github.com/Hagtronics/tinySA-Ultra-Phase-Noise"
    purpose: code
  - id: readme
    title: "Measurement procedure, offset bands and instrument limits"
    url: "https://github.com/Hagtronics/tinySA-Ultra-Phase-Noise/blob/45b3e6edad5cda34381014a1c6d9548ca63e4444/README.md"
  - id: activity
    title: "February 20 NumPy smoothing compatibility correction"
    url: "https://github.com/Hagtronics/tinySA-Ultra-Phase-Noise/commit/45b3e6edad5cda34381014a1c6d9548ca63e4444"
  - id: earlier
    title: "September 2025 FreeSimpleGUI compatibility migration"
    url: "https://github.com/Hagtronics/tinySA-Ultra-Phase-Noise/commit/50526a72e4c16f3bcdf037588a719eb4fac3ec26"
  - id: measurement
    title: "Sweep orchestration, carrier normalization and RBW corrections"
    url: "https://github.com/Hagtronics/tinySA-Ultra-Phase-Noise/blob/45b3e6edad5cda34381014a1c6d9548ca63e4444/src/phase_noise.py"
  - id: transport
    title: "Instrument communication"
    url: "https://github.com/Hagtronics/tinySA-Ultra-Phase-Noise/blob/45b3e6edad5cda34381014a1c6d9548ca63e4444/src/tinysa_ultra.py"
  - id: filter
    title: "Retained smoothing implementation"
    url: "https://github.com/Hagtronics/tinySA-Ultra-Phase-Noise/blob/45b3e6edad5cda34381014a1c6d9548ca63e4444/src/savitzky_golay_filter.py"
---

## Scope and limits

The application configures analyzer sweeps over offset bands from 1 kHz to 1 MHz and uses per-band equivalent-noise-bandwidth corrections and measured carrier amplitude to express spectral results in dBc/Hz. This narrow oscillator-characterization procedure is distinct from a generic spectrum display or frequency-stability estimator. [Measurement](#source-measurement) · [Instrument interface](#source-transport).

A September 2025 GUI dependency migration and a February 2026 replacement of the removed NumPy matrix constructor are concrete compatibility maintenance after the original implementation. The latter retains the numerical smoothing path; it is not an improvement in the analyzer's noise floor. This is low-cadence maintenance, not evidence of active new feature development. [Earlier change](#source-earlier) · [Activity](#source-activity) · [Filter](#source-filter).

The spectrum-analyzer method cannot distinguish phase noise from all amplitude-noise contributions and cannot measure below the instrument's own oscillator noise floor. The documented carrier-frequency band transition, drift, AM/FM and calibration limitations matter; smoothing does not improve physical sensitivity. No hardware measurements or numerical comparisons were independently reproduced. [Measurement limits](#source-readme).
