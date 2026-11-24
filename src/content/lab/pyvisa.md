---
name: "PyVISA"
aliases: []
description: "VISA API for instrument discovery, sessions and command or binary-block I/O in Python. It separates instrument-facing code from the selected backend and supports reading structured arrays from compatible test equipment."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited on the binary-block datatype size fix and its executable regression tests."
  sources: [ai-change]
  reviewedAt: "2026-11-24"
access: "MIT; real instruments require a compatible VISA backend and transport."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://pyvisa.readthedocs.io/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/pyvisa/pyvisa"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/pyvisa/pyvisa/commit/a5b56ab857115e44e59f240f99207b305f77c459"
  - id: ai-change
    title: "Credited executable implementation change"
    url: "https://github.com/pyvisa/pyvisa/commit/843d62a50cac9a23e7585c5135f3fd5eb9470f17"
---

## Scope and limits

The reviewed main-branch change handles an HP block length that includes its termination character. Transport and parser checks do not establish calibration, aperture or measurement accuracy.

[Reviewed upstream implementation](#source-activity).
