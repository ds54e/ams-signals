---
name: "AllanTools"
aliases: ["ADEV Allan deviation"]
description: "Python library for time and frequency stability analysis, including Allan deviation and related estimators. It accepts evenly sampled time-error or fractional-frequency data; the estimator and input normalization must match the measurement and the intended reporting interval."
scope:
  analysis: { ai: false }
access: "LGPL-3.0-or-later."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
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
---

## Scope and limits

Use phase/time-error in seconds or normalized fractional frequency as documented. Allan deviation alone does not uniquely determine a phase-noise spectrum.

## Reviewed maintenance

April 2026 work added approximate piecewise PSD reconstruction and conversion back to Allan deviation. The October correction restores the squared `(N - 2)` term in the equivalent-degrees-of-freedom calculation for `alpha == -1, m == 1`. These separate implementation changes support continued maintenance of the numerical library. [April implementation](#source-maintenance-earlier) · [October correction](#source-activity).
