---
name: "SpecKit"
aliases: []
description: "Python estimators for power and cross-spectral density from sampled measurement records. Frequency-dependent segment lengths trade averaging against resolution across the spectrum; sample quality, windowing and estimator settings affect the result, and some analysis utilities are available only in the reviewed source."
scope: {"analysis": {"ai": false}}
access: "Public Python source and distribution; no live instrument driver or hardware calibration is implied."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
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
---

### Scope and evidence

SpecKit estimates spectra from existing samples, rather than acquiring data or calculating the time-domain stability metrics provided by AllanTools. December 2025 maintenance corrects the MISO estimator's common frequency grid and spectra; October 2026 work adds spectral planning and a single-length Hann-window risk estimator. These are implementation changes across separate development periods. The verified PyPI 1.0.3 wheel does not include the reviewed main-branch spectral plan, PSD confidence interval or single-length risk APIs. [Earlier work](#source-earlier) · [Distribution](#source-release) · [Planning code](#source-plan) · [Risk estimator](#source-activity).

PhaseNoiseDataProcessorLib is a separate C++ implementation worth examining when integrating multiband spectral or cross-correlation processing into native measurement software. Its own API also converts spectra using supplied calibration levels. Its binary reader does not reject short records, and its real-time example leaves capture-device hooks unimplemented, so input validation and device integration require application work. These are properties of that related project, not SpecKit features or validation. [C++ source](#source-related-cpp) · [Processing implementation](#source-related-cpp-processing) · [Device-integration example](#source-related-cpp-integration).

SpecKit's Scope, provenance and activity are based only on its own repository. This reference adds neither a live acquisition path nor the C++ project's dBc calibration conversion to SpecKit.
