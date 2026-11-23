---
name: "ParamRF"
summary: "Builds differentiable RF network models in JAX and fits parametric circuit and transmission-line models to measured or simulated S-parameters."
description: "Builds differentiable RF network models in JAX and fits parametric circuit and transmission-line models to measured or simulated S-parameters. Optimization, network evaluation and uncertainty estimation support model extraction; it is not an electromagnetic field solver."
scope:
  design:
    ai: false
  simulation:
    ai: false
access: "Public Python/JAX implementation; fitting and sampling depend on the selected numerical backend and data."
addedAt: "2026-11-23"
reviewedAt: "2026-11-23"
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
---

### Implemented operations and review

ParamRF adds parameter estimation and uncertainty modeling rather than merely converting Touchstone or manipulating fixed S-parameter networks. Coupled two-port decomposition, shared discrepancy fitting and complex-valued discrepancy models give separate implementation checkpoints across May, October and November. The paper and regression implementations were reviewed; no accuracy claim against measured silicon was independently reproduced. [Implementation](#source-activity) · [Reviewed evidence](#source-evidence).
