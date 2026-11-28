---
name: "AllanTools"
aliases: ["ADEV Allan deviation"]
description: "Python library for time and frequency stability analysis, including Allan deviation and related estimators. It also implements approximate piecewise power-law fractional-frequency PSD reconstruction and conversion between PSD and deviation; input normalization, sampling and model assumptions must match the measurement."
scope:
  analysis: { ai: false }
access: "LGPL-3.0-or-later."
addedAt: "2026-11-24"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical project source"
    url: "https://github.com/aewallin/allantools"
    purpose: code
  - id: activity
    title: "Reviewed implementation or test change"
    url: "https://github.com/aewallin/allantools/commit/5cc6d4dbae3985d6cb452583ad25be9c434180b1"
  - id: maintenance-earlier
    title: "April 2026 piecewise PSD and Allan-deviation implementation"
    url: "https://github.com/aewallin/allantools/commit/07227fd02637db17fa02fa17b8e8abfb606cdd7a"
  - id: retained-estimators
    title: "Retained stability estimators and piecewise PSD conversions"
    url: "https://github.com/aewallin/allantools/blob/32ad8fce6be9f51dda4ab407931f71503c50d101/allantools/allantools.py"
  - id: related-speckit
    title: "SpecKit one-sided spectrum estimation conventions"
    url: "https://github.com/mdovale/SpecKit/blob/8c1d1070d6a6c752482f4a0bfdaa87e30878c6df/docs/reference/spectral-contract.md"
---

## Scope and limits

Use phase/time-error in seconds or normalized fractional frequency as documented. Allan deviation alone does not uniquely determine a phase-noise spectrum.

## Reviewed maintenance

April 2026 work added approximate piecewise PSD reconstruction and conversion back to Allan deviation. The October correction restores the squared `(N - 2)` term in the equivalent-degrees-of-freedom calculation for `alpha == -1, m == 1`. These separate implementation changes support continued maintenance of the numerical library. [April implementation](#source-maintenance-earlier) · [October correction](#source-activity).

## November 28, 2026 implementation review

The retained `adev2psd_piecewise_approx` reconstructs a one-sided fractional-frequency PSD using piecewise local power laws, continuity and the Allan/Hadamard variance integral. The reverse path evaluates deviation from such a PSD. This constrained approximation does not uniquely recover the measured oscillator spectrum from arbitrary deviation points. SpecKit instead estimates spectra directly from sampled records; it is not a duplicate time-domain stability estimator. November's reviewed merges document existing parameters and confidence-interval/noise-identification functions rather than adding new executable algorithms. The October implementation checkpoint remains unchanged. [Estimators](#source-retained-estimators) · [Spectrum convention](#source-related-speckit).
