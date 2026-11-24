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
---

### Scope and evidence

SpecKit estimates spectra from existing samples, rather than acquiring data or calculating the time-domain stability metrics provided by AllanTools. Earlier numerical estimator fixes and later analysis code establish more than an initial publication. The verified PyPI 1.0.3 wheel does not include the reviewed main-branch spectral plan, PSD confidence interval or single-length risk APIs. [Earlier work](#source-earlier) · [Distribution](#source-release) · [Planning code](#source-plan) · [Risk estimator](#source-activity).
