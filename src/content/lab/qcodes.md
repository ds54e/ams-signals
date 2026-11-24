---
name: "QCoDeS"
aliases: ["Qcodes"]
description: "Python framework for instrument control and repeatable data acquisition. It provides reusable instrument drivers, parameter abstractions and a dataset model that stores measurements alongside run metadata and instrument settings."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "GitHub Copilot is co-credited for rejecting mismatched parameter scale or offset lengths instead of silently dropping values. The current parameter implementation retains strict elementwise pairing."
  sources: [development-code, development-retained]
  reviewedAt: "2026-11-24"
access: "MIT; some drivers require vendor libraries or instruments."
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
  - id: license
    title: "Reviewed MIT license"
    url: "https://github.com/microsoft/Qcodes/blob/1583027138ef8d1b45370c56c2aba65fa2d119fd/LICENSE"
  - id: measurement-state
    title: "Measurement context and exception metadata"
    url: "https://github.com/microsoft/Qcodes/blob/1583027138ef8d1b45370c56c2aba65fa2d119fd/src/qcodes/dataset/measurements.py"
  - id: development-code
    title: "Credited scale and offset length validation"
    url: "https://github.com/microsoft/Qcodes/commit/50b073a12415ab3b2603d6877d6c394d067316a9"
  - id: development-retained
    title: "Retained strict elementwise conversion"
    url: "https://github.com/microsoft/Qcodes/blob/1583027138ef8d1b45370c56c2aba65fa2d119fd/src/qcodes/parameters/parameter_base.py"
---

## Scope and limits

Instrument configuration, cached state and measured readback are different. A driver does not establish the actual aperture, settling or calibration of an instrument.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.

The measurement context can record an exception and still mark a dataset completed. Completion describes closure, not successful acquisition of every planned point or a DUT verdict. Snapshots can also use cached values. [Measurement context](#source-measurement-state). The reviewed repository license is MIT. [License](#source-license).
