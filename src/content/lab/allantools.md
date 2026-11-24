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
---

## Scope and limits

Use phase/time-error in seconds or normalized fractional frequency as documented. Allan deviation alone does not uniquely determine a phase-noise spectrum.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.
