---
name: "SpecKit"
aliases: []
description: "Python estimators for power and cross-spectral density from sampled measurement records. Frequency-dependent segment lengths trade averaging against resolution across the spectrum; sample quality, windowing and estimator settings affect the result, and some analysis utilities are available only in the reviewed source."
scope: {"analysis": {"ai": false}}
access: "Public Python source and distribution; no live instrument driver or hardware calibration is implied."
addedAt: "2026-11-24"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/mdovale/SpecKit"
    purpose: code
  - id: activity
    title: "Reviewed substantive implementation checkpoint"
    url: "https://github.com/mdovale/SpecKit/commit/1900827bcd5daad49855a46670d4c8b23ce0e3f1"
  - id: release
    title: "PyPI 1.0.3 and published wheel digest"
    url: "https://pypi.org/project/speckit/1.0.3/"
  - id: earlier
    title: "Earlier numerical estimator work"
    url: "https://github.com/mdovale/SpecKit/commit/f98931b3ff9e0bcd3b382d6af6765264d2c85a0b"
  - id: plan
    title: "Spectral planning implementation on main"
    url: "https://github.com/mdovale/SpecKit/commit/18c837dd6d8e6a793aa41e88d4a47fc926c2d2da"
  - id: related-cpp
    title: "Separate C++ PhaseNoiseDataProcessorLib implementation"
    url: "https://github.com/lrd512/phase-noise-data-processor-lib"
  - id: related-cpp-processing
    title: "Separate C++ file reader, multiband spectra and calibration conversion"
    url: "https://github.com/lrd512/phase-noise-data-processor-lib/blob/ab9ef4b81fcb92e121478978da1657b4e718b66b/PhaseNoiseDataProcessorLib/PhaseNoiseDataProcessorLib.cpp"
  - id: related-cpp-integration
    title: "Separate C++ measurement example with capture-device stubs"
    url: "https://github.com/lrd512/phase-noise-data-processor-lib/blob/ab9ef4b81fcb92e121478978da1657b4e718b66b/Examples/real_time_measurement.cpp"
  - id: related-tinysa
    title: "Related tinySA Ultra carrier-relative spectral sweep application"
    url: "https://github.com/Hagtronics/tinySA-Ultra-Phase-Noise"
  - id: related-tinysa-sweep
    title: "Related instrument-specific sweep and fixed noise-bandwidth corrections"
    url: "https://github.com/Hagtronics/tinySA-Ultra-Phase-Noise/blob/45b3e6edad5cda34381014a1c6d9548ca63e4444/src/phase_noise.py"
  - id: related-tinysa-maintenance
    title: "Related February 20 NumPy smoothing compatibility correction"
    url: "https://github.com/Hagtronics/tinySA-Ultra-Phase-Noise/commit/45b3e6edad5cda34381014a1c6d9548ca63e4444"
  - id: related-tinysa-limits
    title: "Related application setup and measurement limitations"
    url: "https://github.com/Hagtronics/tinySA-Ultra-Phase-Noise/blob/45b3e6edad5cda34381014a1c6d9548ca63e4444/README.md"
  - id: spectral-contract
    title: "One-sided PSD scaling and cross-spectrum orientation"
    url: "https://github.com/mdovale/SpecKit/blob/8c1d1070d6a6c752482f4a0bfdaa87e30878c6df/docs/reference/spectral-contract.md"
  - id: related-allantools
    title: "AllanTools stability and approximate fractional-frequency PSD reconstruction"
    url: "https://github.com/aewallin/allantools/blob/32ad8fce6be9f51dda4ab407931f71503c50d101/allantools/allantools.py"
---

### Scope and evidence

SpecKit estimates spectra from existing samples, rather than acquiring data or calculating the time-domain stability metrics provided by AllanTools. December 2025 maintenance corrects the MISO estimator's common frequency grid and spectra; October 2026 work adds spectral planning and a single-length Hann-window risk estimator. These are implementation changes across separate development periods. The verified PyPI 1.0.3 wheel does not include the reviewed main-branch spectral plan, PSD confidence interval or single-length risk APIs. [Earlier work](#source-earlier) · [Distribution](#source-release) · [Planning code](#source-plan) · [Risk estimator](#source-activity).

PhaseNoiseDataProcessorLib is a separate C++ implementation worth examining when integrating multiband spectral or cross-correlation processing into native measurement software. Its own API also converts spectra using supplied calibration levels. Its binary reader does not reject short records, and its real-time example leaves capture-device hooks unimplemented, so input validation and device integration require application work. These are properties of that related project, not SpecKit features or validation. [C++ source](#source-related-cpp) · [Processing implementation](#source-related-cpp-processing) · [Device-integration example](#source-related-cpp-integration).

SpecKit's Scope, provenance and activity are based only on its own repository. This reference adds neither a live acquisition path nor the C++ project's dBc calibration conversion to SpecKit.

## Reviewed implementation and retention, November 25, 2026

The separate MIT-licensed tinySA Ultra Phase Noise application controls a supported spectrum analyzer, estimates carrier-relative noise in offset bands from 1 kHz to 1 MHz, applies predetermined equivalent-noise-bandwidth corrections and saves CSV results. The instrument is configured for automatic RBW, so the actual selected bandwidth and normalization must be checked. A single spectrum measurement includes analyzer LO noise and amplitude-noise contributions and does not isolate DUT phase noise. Its latest public implementation change on February 20, 2026 replaces the removed NumPy matrix constructor in the smoothing routine; the reviewed public repository has no later change, additional branch, GitHub release or pull request. The application is a separately cataloged instrument-specific measurement workflow; this cross-reference does not merge its implementation with SpecKit. This is not a SpecKit acquisition feature, dependency, license or activity record, and the two implementations are independent. No hardware noise floor or numerical result was independently established. [Related application](#source-related-tinysa) · [Sweep](#source-related-tinysa-sweep) · [Maintenance](#source-related-tinysa-maintenance) · [Limits](#source-related-tinysa-limits).

## November 28, 2026 implementation review

The reviewed source contract uses one-sided densities and defines Gxy as X times the complex conjugate of Y, opposite the scipy.signal.csd(x, y) orientation. It documents uniform factor-of-two normalization even at DC and Nyquist. A caller must account for those conventions when comparing complex cross spectra or integrating spectral bins. The estimator is distinct from AllanTools' stability statistics and constrained ADEV-to-PSD reconstruction. Applying it to oscillator phase or frequency records requires the appropriate input units, phase/frequency conversion and measurement calibration; no instrument floor or integrated timing-jitter accuracy follows from a general PSD estimate. [Spectral contract](#source-spectral-contract) · [Related stability estimators](#source-related-allantools).
