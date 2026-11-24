---
name: "PhaseNoiseDataProcessorLib"
aliases: ["phase-noise-data-processor-lib residual phase noise cross correlation"]
description: "C++ library for processing sampled voltage data in phase-noise measurements with single-channel spectra or two-channel cross-correlation. It implements multiband processing and calibration conversion, while capture hardware, voltage scaling and calibration values remain the user's responsibility; the real-time example contains device-integration stubs."
scope:
  analysis: { ai: false }
access: "LGPL-2.1 license text; C++ source and Visual Studio project, with a bundled Windows static library."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical phase-noise processing source"
    url: "https://github.com/lrd512/phase-noise-data-processor-lib"
    purpose: code
  - id: activity
    title: "Configuration validation and error-reporting implementation"
    url: "https://github.com/lrd512/phase-noise-data-processor-lib/commit/ab9ef4b81fcb92e121478978da1657b4e718b66b"
  - id: earlier-examples
    title: "Earlier file-processing and measurement-integration examples"
    url: "https://github.com/lrd512/phase-noise-data-processor-lib/commit/074b139bb12637693956cca9dd711eac97d1b412"
  - id: api
    title: "Configuration, input format and calibration API"
    url: "https://github.com/lrd512/phase-noise-data-processor-lib/blob/ab9ef4b81fcb92e121478978da1657b4e718b66b/PhaseNoiseDataProcessorLib/PhaseNoiseDataProcessorLib.h"
  - id: processing
    title: "File input, multiband spectra and dBc conversion implementation"
    url: "https://github.com/lrd512/phase-noise-data-processor-lib/blob/ab9ef4b81fcb92e121478978da1657b4e718b66b/PhaseNoiseDataProcessorLib/PhaseNoiseDataProcessorLib.cpp"
  - id: live-example
    title: "Real-time example with unimplemented capture-device hooks"
    url: "https://github.com/lrd512/phase-noise-data-processor-lib/blob/ab9ef4b81fcb92e121478978da1657b4e718b66b/Examples/real_time_measurement.cpp"
  - id: license
    title: "Repository license"
    url: "https://github.com/lrd512/phase-noise-data-processor-lib/blob/ab9ef4b81fcb92e121478978da1657b4e718b66b/LICENSE"
---

## Scope and limits

Analysis is supported by the implemented file reader, fixed-window and fixed-sample-rate processing paths, spectral accumulation, cross-correlation and output writer. The library consumes sampled voltage records; an appropriate phase detector or measurement front end must produce those records. The built-in binary reader expects 16-bit offset-binary samples, with each channel stored as a consecutive block for each measurement. Input scale and sample rate must match the capture. [API](#source-api) · [Processing](#source-processing).

The binary reader does not check the number of bytes returned by its reads and can report success for a truncated record. The caller must verify the expected byte count and capture completeness before interpreting its output. [File-reading implementation](#source-processing).

The API labels its uncalibrated spectral output in dBV/Hz. Conversion to dBc/Hz uses the RF input level and calibration input/output levels supplied by the caller. These operations do not establish instrument noise floor, AM rejection, traceable accuracy or an integrated-jitter result. Flat-top windowing is explicitly marked unimplemented in the configuration API. [API](#source-api) · [Calibration conversion](#source-processing).

The real-time example leaves device open, setup, capture, wait and close functions unimplemented and also requires application-specific sample conversion. It demonstrates how to feed the processing API; it does not supply an acquisition driver. No Board, Control or Acquisition scope is assigned. [Integration example](#source-live-example).

## Selection and activity

The May 2025 addition of executable file-processing and integration examples is followed by February 2026 configuration validation and error-reporting changes retained in the current implementation. This is low-frequency technical maintenance of a small library, not evidence of a complete measurement instrument or independent accuracy validation. [Earlier examples](#source-earlier-examples) · [Reviewed change](#source-activity).
