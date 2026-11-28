---
name: "rf-bench"
aliases: ["rf_bench"]
description: "Python RF measurement framework with SCPI and GPIB instrument drivers and repeatable characterization procedures. Includes crystal equivalent-circuit parameter extraction from complex S21, oscillator frequency tracking and Allan deviation, and spectrum-analyzer noise measurements; physical validation and calibration vary by procedure."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  test: { ai: false }
access: "Public Python source with a GPL-3.0 root license; individual package terms and supported instruments vary. Physical acquisition requires the relevant hardware and calibrated fixtures."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical RF bench implementation"
    url: "https://github.com/jfrancis42/rf-bench"
    purpose: code
  - id: readme
    title: "Integrated instrument and characterization workflows"
    url: "https://github.com/jfrancis42/rf-bench/blob/b36bd53bd64f92aff7e87929d6b9cf66b79dd6d4/README.md"
  - id: activity
    title: "August 3 shared GPIB transport and emulator integration"
    url: "https://github.com/jfrancis42/rf-bench/commit/521fbd95082304e1cf4fae76d5b599fd7bf762eb"
  - id: packaging
    title: "August 3 virtual instrument package consolidation"
    url: "https://github.com/jfrancis42/rf-bench/commit/c479e347208d2b2ba68c2d7d71a70e7dad455661"
  - id: gpib-tests
    title: "Retained shared-bus and instrument protocol emulator regressions"
    url: "https://github.com/jfrancis42/rf-bench/blob/b36bd53bd64f92aff7e87929d6b9cf66b79dd6d4/drivers/gpib/tests/test_kiss488.py"
  - id: crystal
    title: "Complex S21 crystal BVD parameter estimation"
    url: "https://github.com/jfrancis42/rf-bench/blob/b36bd53bd64f92aff7e87929d6b9cf66b79dd6d4/projects/vna/crystal-bvd-pdf/crystal_bvd_pdf.py"
  - id: stability
    title: "Narrow-span frequency tracking and sample timestamps"
    url: "https://github.com/jfrancis42/rf-bench/blob/b36bd53bd64f92aff7e87929d6b9cf66b79dd6d4/projects/signal-sources/osc-stability/osc_stability.py"
  - id: stability-limits
    title: "Untested oscillator-stability measurement procedure"
    url: "https://github.com/jfrancis42/rf-bench/blob/b36bd53bd64f92aff7e87929d6b9cf66b79dd6d4/projects/signal-sources/osc-stability/README.md"
  - id: adev
    title: "Non-overlapping Allan deviation computation"
    url: "https://github.com/jfrancis42/rf-bench/blob/b36bd53bd64f92aff7e87929d6b9cf66b79dd6d4/drivers/utils/rf_bench/utils/rf_utils.py"
  - id: phase-noise
    title: "Offset-frequency zero-span measurement implementation"
    url: "https://github.com/jfrancis42/rf-bench/blob/b36bd53bd64f92aff7e87929d6b9cf66b79dd6d4/projects/radio/phase-noise/phase_noise.py"
  - id: phase-noise-limits
    title: "Untested spectrum analyzer noise procedure"
    url: "https://github.com/jfrancis42/rf-bench/blob/b36bd53bd64f92aff7e87929d6b9cf66b79dd6d4/projects/radio/phase-noise/README.md"
  - id: license
    title: "Repository root GPL version 3 license"
    url: "https://github.com/jfrancis42/rf-bench/blob/b36bd53bd64f92aff7e87929d6b9cf66b79dd6d4/LICENSE"
---

## Implementation and selection

The project integrates concrete RF characterization procedures, not only an instrument transport or a saved-data viewer. Its crystal workflow converts complex S21 to series impedance, locates the first two reactance zero crossings, estimates C0 from off-resonance admittance with iterative motional correction, and derives Rm, Lm, Cm and Q. The oscillator procedure acquires frequency samples and calculates non-overlapping Allan deviation; the noise procedure orchestrates zero-span sweeps and carrier-normalized offset-noise estimates. These user-facing Control, Acquisition, Analysis and Test operations are conventional. No distinct runtime model operation or qualifying AI-development evidence was established. [Crystal](#source-crystal) · [Stability](#source-stability) · [Noise](#source-phase-noise).

The RF characterization procedures add a specific discovery path alongside general instrument SDKs, the separate AllanTools numerical library, and the narrower tinySA Ultra phase-noise application. August 3 introduces a shared GPIB adapter with serialized address selection and emulator tests after earlier bench implementation. The same day also consolidates conflicting virtual-instrument packages. The September MQTT address change is specific to the maintainer's network and is not promoted to the meaningful implementation checkpoint. The oscillator and RF subprojects are retained inside the canonical repository rather than separate listings. [Overview](#source-readme) · [GPIB integration](#source-activity) · [Emulator tests](#source-gpib-tests) · [Packaging](#source-packaging).

## Limits

The BVD estimator requires a suitable calibrated series fixture, both resonances and adequate off-resonance samples; it is not a general nonlinear impedance fit. Oscillator and phase-noise procedure READMEs explicitly state that physical hardware has not been tested. The frequency tracker can skip failed sweeps and calculates a single average sample interval from the first and last timestamps; the Allan computation assumes uniformly spaced frequency samples and does not correct these gaps. The README and helper docstring give inconsistent and incorrect ADEV slope-to-noise identifications; the conventional white FM, flicker FM and random-walk FM slopes are -1/2, 0 and +1/2 respectively. The spectrum-analyzer procedure normalizes to nominal RBW, not independently measured equivalent noise bandwidth, and does not isolate phase noise from amplitude noise or the analyzer's residual noise. These paths are exploratory bench procedures, not qualified oscillator measurements. No upstream software tests or hardware measurements were independently executed. [Stability limits](#source-stability-limits) · [ADEV helper](#source-adev) · [Noise limits](#source-phase-noise-limits) · [License](#source-license).
