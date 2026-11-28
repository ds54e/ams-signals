---
name: "Open Lab Automation"
aliases: ["OLA"]
description: "Measurement application for automated electrical bench experiments with supported instruments. Project-defined sweeps include conditional oscilloscope acquisition, post-run alignment and VNA workflows with fixture de-embedding and quartz-resonator equivalent-circuit parameter estimation."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  test: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for conditional multi-oscilloscope waveform capture and post-run alignment. The merged project retains the cross-correlation alignment implementation."
  sources: ["development-code","development-integration","development-retained"]
  reviewedAt: "2026-11-25"
access: "GPL-3.0; requires compatible instruments and interfaces for physical measurements."
addedAt: "2026-11-25"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/mede-erik/Open-Lab-Automation"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/mede-erik/Open-Lab-Automation/commit/3bde6534b97bb6ff1d00d1a584b7350b939c1357"
  - id: earlier
    title: "August oscilloscope trigger configuration implementation"
    url: "https://github.com/mede-erik/Open-Lab-Automation/commit/d0e9973ca0cada74bcd2bb6b504fc885f4288fb4"
  - id: development-code
    title: "Credited conditional capture and post-run waveform alignment"
    url: "https://github.com/mede-erik/Open-Lab-Automation/commit/59c7d30a7b11a25b3ba791ead9df24a12252e241"
  - id: development-integration
    title: "Canonical integration of waveform measurement and viewer changes"
    url: "https://github.com/mede-erik/Open-Lab-Automation/commit/ceb5b294d85ebae61773a30bec50b2da14e7895c"
  - id: development-retained
    title: "Retained post-run cross-correlation waveform alignment"
    url: "https://github.com/mede-erik/Open-Lab-Automation/blob/3bde6534b97bb6ff1d00d1a584b7350b939c1357/ola/wave_align.py"
  - id: review-20261128-activity
    title: "November 27 unified VNA fixture de-embedding"
    url: "https://github.com/mede-erik/Open-Lab-Automation/commit/e9104a584fae25eddd2cfb47e5164f0992d1afd2"
  - id: review-20261128-crystal
    title: "November 27 crystal/resonator VNA measurement integration"
    url: "https://github.com/mede-erik/Open-Lab-Automation/commit/b21a24671b6eadf3b9403323a53148056be898d1"
  - id: review-20261128-bvd
    title: "Retained crystal equivalent-circuit extraction"
    url: "https://github.com/mede-erik/Open-Lab-Automation/blob/e9104a584fae25eddd2cfb47e5164f0992d1afd2/ola/crystal.py"
  - id: review-20261128-crystal-tests
    title: "Simulated crystal parameter-extraction and workflow tests"
    url: "https://github.com/mede-erik/Open-Lab-Automation/blob/e9104a584fae25eddd2cfb47e5164f0992d1afd2/tests/test_crystal.py"
  - id: review-20261128-fixtures
    title: "Retained one-port and two-port fixture correction"
    url: "https://github.com/mede-erik/Open-Lab-Automation/blob/e9104a584fae25eddd2cfb47e5164f0992d1afd2/ola/fixtures.py"
---

## Scope and limits

The application implements a bench workflow for power-conversion efficiency measurements and related oscilloscope captures rather than only supplying generic instrument drivers. Control configures instrument settings, Acquisition retrieves waveforms and measurement values, Test executes project-defined sweeps and capture conditions, and Analysis reopens recorded runs and calculates relative time offsets. [Canonical integration](#source-development-integration).

The alignment routine estimates a relative shift using cross-correlation of a named signal shared by two captures and rejects poor matches. Its output is not hardware trigger synchronization, calibrated skew or independent timebase correction; a common signal can have ambiguous correlation peaks. The original waveform files are preserved. [Alignment implementation](#source-development-retained).

## Reviewed maintenance

August 2026 adds library-driven oscilloscope trigger configuration. November adds conditional multi-scope acquisition and recorded-waveform alignment, with the credited change merged in the canonical project; a subsequent correction supports binary serial framing and saved VNA calibration selection. This follows an established power measurement workflow. [August change](#source-earlier) · [Credited waveform change](#source-development-code) · [Integrated waveform workflow](#source-development-integration) · [Binary serial and calibration correction](#source-activity).

## November 28, 2026 source review

November 27 adds a series-through VNA measurement for quartz crystals and ceramic resonators. The implementation estimates the Butterworth–Van Dyke parameters from complex S21, including motional R/L/C, Q, and C0 when antiresonance is in the sweep. Optional load capacitance gives estimated loaded frequency and pulling using a small-separation approximation. The algorithm needs sufficient samples around resonance and is tested against a simulated crystal. It is not a general broadband BVD fit or a measurement of oscillator phase noise. Later integration unifies one- and two-port fixture correction; full corrections require the corresponding measured complex S-parameters and suitable calibration. This extends the existing Lab measurement procedure, not a second Analog listing. Upstream hardware measurements and tests were not independently reproduced. [Crystal integration](#source-review-20261128-crystal) · [Parameter extraction](#source-review-20261128-bvd) · [Tests](#source-review-20261128-crystal-tests) · [Fixtures](#source-review-20261128-fixtures) · [Integration](#source-review-20261128-activity).
