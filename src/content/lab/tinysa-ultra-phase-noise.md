---
name: "tinySA Ultra Phase Noise"
aliases: ["tinySA Ultra Phase Noise Measurement App"]
description: "Python measurement application controlling a tinySA Ultra spectrum analyzer for single-sideband carrier-relative noise sweeps from 1 kHz to 1 MHz offset. It applies fixed equivalent-noise-bandwidth corrections, joins the measured bands and saves CSV data; analyzer oscillator noise, AM contamination and carrier drift constrain interpretation."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  test: { ai: false }
access: "MIT repository license; requires tinySA Ultra and compatible firmware, serial access, and Python GUI and numerical dependencies."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical measurement application"
    url: "https://github.com/Hagtronics/tinySA-Ultra-Phase-Noise"
    purpose: code
  - id: activity
    title: "February 20 NumPy compatibility repair for smoothing"
    url: "https://github.com/Hagtronics/tinySA-Ultra-Phase-Noise/commit/45b3e6edad5cda34381014a1c6d9548ca63e4444"
  - id: earlier
    title: "September 2025 GUI dependency compatibility update"
    url: "https://github.com/Hagtronics/tinySA-Ultra-Phase-Noise/commit/50526a72e4c16f3bcdf037588a719eb4fac3ec26"
  - id: sweep
    title: "Retained sweep procedure and noise-bandwidth correction"
    url: "https://github.com/Hagtronics/tinySA-Ultra-Phase-Noise/blob/45b3e6edad5cda34381014a1c6d9548ca63e4444/src/phase_noise.py"
  - id: driver
    title: "Retained serial instrument driver"
    url: "https://github.com/Hagtronics/tinySA-Ultra-Phase-Noise/blob/45b3e6edad5cda34381014a1c6d9548ca63e4444/src/tinysa_ultra.py"
  - id: app
    title: "Retained measurement result plotting and CSV export"
    url: "https://github.com/Hagtronics/tinySA-Ultra-Phase-Noise/blob/45b3e6edad5cda34381014a1c6d9548ca63e4444/src/tinysa_ultra_phase_noise_app.py"
  - id: overview
    title: "Measurement setup, example traces and limitations"
    url: "https://github.com/Hagtronics/tinySA-Ultra-Phase-Noise/blob/45b3e6edad5cda34381014a1c6d9548ca63e4444/README.md"
---

## Scope and limits

The reusable measurement procedure obtains the carrier amplitude and frequency, executes multiple offset-band sweeps, subtracts a documented equivalent-noise-bandwidth correction and the carrier level, optionally recenters the sweep, and stores results. It is a single-instrument spectral estimate, not independent phase demodulation or dual-reference noise rejection. The retained code sets RBW to auto and uses predetermined correction values for each span; actual RBW selection and calibration need verification on the chosen firmware. The result includes contributions from analyzer local-oscillator noise and AM and is not a demonstrated low-jitter oscillator qualification method. [Sweep implementation](#source-sweep) · [Instrument access](#source-driver) · [Limits](#source-overview).

## Reviewed maintenance

The September 2025 change updates the GUI dependency and executable application imports after the original 2024 implementation. February 2026 replaces the removed NumPy matrix constructor in the retained smoothing routine, a concrete compatibility correction. December uploads of measurement artifacts contribute only raw activity, not a new technical checkpoint. This is low-frequency maintenance rather than an assertion of ongoing high cadence. No hardware measurement, noise floor, or numerical result was independently reproduced. [GUI correction](#source-earlier) · [NumPy correction](#source-activity) · [Application](#source-app).
