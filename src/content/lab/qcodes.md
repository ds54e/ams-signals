---
name: "QCoDeS"
aliases: ["Qcodes"]
description: "Python framework for instrument control and repeatable data acquisition. It provides reusable instrument drivers, parameter abstractions and a dataset model that stores measurements alongside run metadata and instrument settings."
scope:
  control: { ai: false }
  acquisition: { ai: false }
access: "BSD-3-Clause; some drivers require vendor libraries or instruments."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Project documentation"
    url: "https://microsoft.github.io/Qcodes/"
    purpose: official
  - id: code
    title: "Canonical project source"
    url: "https://github.com/microsoft/Qcodes"
    purpose: code
  - id: activity
    title: "Reviewed implementation or test change"
    url: "https://github.com/microsoft/Qcodes/commit/1583027138ef8d1b45370c56c2aba65fa2d119fd"
---

## Scope and limits

Instrument configuration, cached state and measured readback are different. A driver does not establish the actual aperture, settling or calibration of an instrument.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.
