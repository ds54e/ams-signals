---
name: "Suncal"
aliases: ["Sandia Uncertainty Calculator"]
description: "Python library and graphical application for evaluating measurement uncertainty in multivariable measurement models. It propagates specified input uncertainties using GUM calculations and Monte Carlo sampling, including sensitivity analysis and uncertainty sweeps."
scope:
  analysis: { ai: false }
access: "GPL-3.0; requires a suitable measurement model and justified input uncertainties."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: website
    title: "Project documentation"
    url: "https://sandiapsl.github.io/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/sandialabs/suncal"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/sandialabs/suncal/commit/99fb29585c677cfc298d671f7d6c9b8cfa425ab1"
  - id: sensitivity-units
    title: "Sensitivity unit correction and regression"
    url: "https://github.com/sandialabs/suncal/commit/ef566f66f65e29e21e7b6a583a2beddbdb158a8a"
  - id: metrolopy
    title: "Related unit-aware uncertainty arithmetic library"
    url: "https://github.com/nrc-cnrc/MetroloPy/blob/3ed1a4dd7c00498aafbbc2f552892826bcec7df7/README.md"
---

## Scope and limits

Suncal evaluates measurement models and specified uncertainty inputs; it is not a transistor-level or RF network simulator. Its distinct Lab operation is uncertainty evaluation rather than the frequency-stability statistics provided by AllanTools. The result depends on the input distributions, correlations, units and validity of the measurement model. It does not independently calibrate an instrument.

## Reviewed maintenance

January 2026 corrects sensitivity units for GUM and Monte Carlo results, with tests for chained functions. April 2026 caches generated numerical functions for repeated sweep evaluation; the cache remains in the reviewed July head. [Sensitivity regression](#source-sensitivity-units) · [Sweep implementation](#source-activity).

## Related workflow

The related [MetroloPy library](#source-metrolopy) represents uncertainties and units in Python numerical objects and propagates them through arithmetic in application code. Suncal's separate entry exposes explicit measurement-model evaluation and uncertainty sweeps; the two repositories have independent numerical implementations and activity.
