---
name: "Multiline TRL Calibration"
aliases: ["mTRL", "TUG multiline TRL", "MultiCal"]
description: "Python reference implementations of TUG and NIST multiline thru-reflect-line calibration for measured VNA networks, with line-only propagation-constant extraction and a Monte Carlo comparison of calibration methods. A separately maintained companion implements covariance-based uncertainty propagation; these are measurement-calibration research tools rather than instrument drivers."
scope:
  analysis: { ai: false }
access: "BSD-3-Clause public source; requires NumPy, scikit-rf and compatible calibration measurements. The optional uncertainty companion additionally uses METAS UncLib and its dependencies."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical calibration method implementation"
    url: "https://github.com/ZiadHatab/multiline-trl-calibration"
    purpose: code
  - id: activity
    title: "June 28 propagation-constant estimation and Monte Carlo comparison"
    url: "https://github.com/ZiadHatab/multiline-trl-calibration/commit/d85494e0883f7b214d77a6d6bcc2803af22b2640"
  - id: earlier
    title: "April 27 two-stage propagation-constant estimation"
    url: "https://github.com/ZiadHatab/multiline-trl-calibration/commit/ce3701f8f3d8a1eba2ca443cfa1f76ecc96dd95b"
  - id: reflect
    title: "May 24 thru normalization and multiple-reflect handling"
    url: "https://github.com/ZiadHatab/multiline-trl-calibration/commit/ab16311a87b269f8b69dee5b8061df73cb8b7879"
  - id: tug
    title: "Retained TUG calibration and gamma estimation"
    url: "https://github.com/ZiadHatab/multiline-trl-calibration/blob/72931719b345af62a8a7400735c5e3fa8ea5d8aa/TUGmTRL.py"
  - id: interface
    title: "Retained calibration application and reference-plane shift API"
    url: "https://github.com/ZiadHatab/multiline-trl-calibration/blob/72931719b345af62a8a7400735c5e3fa8ea5d8aa/mTRL.py"
  - id: monte-carlo
    title: "Retained executable Monte Carlo method comparison"
    url: "https://github.com/ZiadHatab/multiline-trl-calibration/blob/72931719b345af62a8a7400735c5e3fa8ea5d8aa/example_3.py"
  - id: uncertainty
    title: "Related separately maintained uncertainty-propagation implementation"
    url: "https://github.com/ZiadHatab/uncertainty-multiline-trl-calibration"
  - id: uncertainty-code
    title: "Covariance propagation in the companion's July 3 revision"
    url: "https://github.com/ZiadHatab/uncertainty-multiline-trl-calibration/blob/727214278199af7fb4cd3c250068a0ee8822f0f5/umTRL.py"
  - id: overview
    title: "Author's algorithm comparison and scikit-rf relationship"
    url: "https://github.com/ZiadHatab/multiline-trl-calibration/blob/72931719b345af62a8a7400735c5e3fa8ea5d8aa/README.md"
---

## Scope and limits

The primary operation is calibration and de-embedding of measured two-port networks, including switch-term handling, propagation-constant extraction, reference-plane shift and impedance renormalization. The TUG method combines measured lines using a weighted eigenproblem; the repository also supplies a NIST reference implementation and a runnable comparison against scikit-rf under synthetic perturbations. The author explicitly identifies shared TUG method lineage with scikit-rf. The separate entry is justified by the calibration-specific research implementation and comparative experiment, not by counting the shared algorithm twice as independent evidence. [TUG implementation](#source-tug) · [Interface](#source-interface) · [Monte Carlo comparison](#source-monte-carlo) · [Relationship](#source-overview).

The related uncertainty implementation uses supplied frequency-dependent covariance matrices and METAS UncLib to propagate measurement noise and specified calibration-standard uncertainties. It is a companion source, not a capability or activity count assigned to the canonical repository. Neither a successful fit nor a synthetic noise comparison establishes calibration traceability or hardware accuracy. [Companion](#source-uncertainty) · [Uncertainty code](#source-uncertainty-code).

## Reviewed maintenance

April 2026 changes gamma estimation, May updates thru and reflect processing, and June 28 adds further estimation changes and an executable Monte Carlo comparison of the algorithms. June 30 follows with eigenvalue-processing cleanup; the June 28 change is retained as the reviewed substantive checkpoint. These updates establish technical follow-through on a mature research implementation. No measurement dataset, Monte Carlo trial or VNA calibration was independently rerun. [April change](#source-earlier) · [May change](#source-reflect) · [June change](#source-activity).
