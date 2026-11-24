---
name: "ParamRF"
summary: "Builds differentiable RF network models in JAX and fits parametric circuit and transmission-line models to measured or simulated S-parameters."
description: "Builds differentiable RF circuit models in JAX and fits their parameters to measured or simulated S-parameters. An optional Gaussian-process discrepancy model learns residual electrical responses and predicts their frequency dependence with uncertainty; prediction quality depends on the fitted data, frequency coverage and kernel assumptions."
scope:
  design:
    ai: false
  simulation:
    ai: true
access: "Public Python/JAX implementation; fitting and sampling depend on the selected numerical backend and data."
addedAt: "2026-11-23"
reviewedAt: "2026-11-24"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/gvcallen/paramrf"
    purpose: "code"
  - id: "website"
    title: "Official project documentation"
    url: "https://gvcallen.github.io/paramrf/"
    purpose: "official"
  - id: "activity"
    title: "Reviewed substantive implementation on the default branch"
    url: "https://github.com/gvcallen/paramrf/commit/bce28fa07350c0e82915a936b8a49947b853e1ef"
  - id: "evidence"
    title: "Reviewed reference or implementation example"
    url: "https://arxiv.org/abs/2510.15881"
  - id: review-20261124-discrepancy
    title: "Fitted Gaussian-process residual prediction at new frequencies"
    url: https://github.com/gvcallen/paramrf/blob/bce28fa07350c0e82915a936b8a49947b853e1ef/pmrf/stats/discrepancy_models.py
  - id: review-20261124-evaluator
    title: "Public discrepancy prediction interface and frequency conversion"
    url: https://github.com/gvcallen/paramrf/blob/bce28fa07350c0e82915a936b8a49947b853e1ef/pmrf/objectives/evaluators.py
  - id: review-20261124-example
    title: "Executable S11 discrepancy fitting and prediction example"
    url: https://github.com/gvcallen/paramrf/blob/bce28fa07350c0e82915a936b8a49947b853e1ef/docs/examples/discrepancy_prediction.rst
---

### Implemented operations and review

ParamRF adds parameter estimation and uncertainty modeling rather than merely converting Touchstone or manipulating fixed S-parameter networks. Coupled two-port decomposition, shared discrepancy fitting and complex-valued discrepancy models give separate implementation checkpoints across May, October and November. The paper and regression implementations were reviewed; no accuracy claim against measured silicon was independently reproduced. [Implementation](#source-activity) · [Reviewed evidence](#source-evidence).

### Optional learned electrical-response prediction

GaussianProcess.predict conditions a covariance model on fitted residuals and returns a discrepancy distribution at new frequencies. MarginalLogLikelihood.predict_discrepancy exposes that operation, and the published S11 example fits a coaxial-line residual before predicting beyond the fit band. This is an independently exposed learned electrical-response estimate, supporting AI Simulation. Its mean tending toward zero outside the fit band and increasing uncertainty do not establish measured extrapolation accuracy. Conventional circuit-parameter optimization retains Design without an AI prefix. [Predictor](#source-review-20261124-discrepancy) · [Public API](#source-review-20261124-evaluator) · [Fitting and prediction example](#source-review-20261124-example).
