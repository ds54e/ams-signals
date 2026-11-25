---
name: "MetroloPy"
aliases: ["MetroloPy uncertainty propagation"]
description: "Python library for calculations with physical quantities, units and measurement uncertainties. Uncertainty-bearing numerical objects support correlated quantities, arithmetic, Monte Carlo propagation, uncertainty budgets and curve fitting within user-authored measurement-analysis code."
scope:
  analysis: { ai: false }
access: "GPL-3.0 repository license; requires justified input uncertainties, correlations and a suitable analysis model."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/nrc-cnrc/MetroloPy"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/nrc-cnrc/MetroloPy/commit/7f260881b1d058179eb2137c0df4f88685d8427c"
  - id: arithmetic-fix
    title: "February uncertain-number arithmetic and constant handling correction"
    url: "https://github.com/nrc-cnrc/MetroloPy/commit/b6a6b16ff27777386b06e2652f9609c66f822895"
  - id: package-refactor
    title: "July lazy-loading and quantity implementation reorganization"
    url: "https://github.com/nrc-cnrc/MetroloPy/commit/4e3b7947ef157215c6149f39d5aea20819559546"
  - id: quantity-arithmetic
    title: "Retained uncertain-number arithmetic implementation"
    url: "https://github.com/nrc-cnrc/MetroloPy/blob/3ed1a4dd7c00498aafbbc2f552892826bcec7df7/src/metrolopy/_ummy.py"
  - id: overview
    title: "Quantity objects, unit conversion and uncertainty workflow"
    url: "https://github.com/nrc-cnrc/MetroloPy/blob/3ed1a4dd7c00498aafbbc2f552892826bcec7df7/README.md"
---

## Scope and limits

Unlike a dedicated measurement-model application, MetroloPy supplies uncertainty-bearing objects that can be composed directly in Python arithmetic and analysis programs. Its unit-aware quantities, correlation representation and uncertainty propagation give it a distinct integration interface alongside Suncal's model evaluation and uncertainty sweeps. The result depends on the specified distributions, covariance, degrees of freedom and model assumptions. This is an Analysis operation, not instrument calibration or acquisition. [Quantity examples](#source-overview).

## Reviewed maintenance

February 2026 changes numerical result-type handling and constants used in uncertainty calculations; the arithmetic result-type selection remains in the reviewed source. July reorganizes the package for lazy loading and subsequently corrects IPython display integration and package dependencies. These are separate technical maintenance changes, not inferred from citation or release-version updates. [February correction](#source-arithmetic-fix) · [Retained arithmetic](#source-quantity-arithmetic) · [July package change](#source-package-refactor) · [Display compatibility](#source-activity).
