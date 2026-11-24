---
name: "PyMeasure"
aliases: []
description: "Python tools for controlling instruments and running laboratory procedures. Instrument drivers and communication adapters support repeatable sweeps, while the experiment framework queues procedures and records results for inspection or later analysis."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  test: { ai: false }
access: "MIT; usable interfaces depend on installed adapters and instruments."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Project documentation"
    url: "https://pymeasure.readthedocs.io/en/latest/"
    purpose: official
  - id: code
    title: "Canonical project source"
    url: "https://github.com/pymeasure/pymeasure"
    purpose: code
  - id: activity
    title: "Reviewed implementation or test change"
    url: "https://github.com/pymeasure/pymeasure/commit/02dba75b377b76dbdabb154b86423e61f8f3cfbe"
---

## Scope and limits

Host-side scheduling does not replace hardware trigger alignment, settling checks or an instrument-defined aperture.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.
