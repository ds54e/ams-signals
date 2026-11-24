---
name: "PyMoDAQ"
aliases: []
description: "Python and Qt environment for configuring experimental instruments, building scanning workflows and inspecting data as it arrives. Detector and actuator plugins connect to laboratory hardware while the dashboard and acquisition tools support logging and HDF5 storage."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  test: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited on array-shape comparison handling and its executable regression tests."
  sources: [implementation]
  reviewedAt: "2026-11-24"
access: "MIT; detector and actuator plugins may require separate instrument SDKs."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://www.pymodaq.cnrs.fr/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/PyMoDAQ/PyMoDAQ"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/PyMoDAQ/PyMoDAQ/commit/53a9bb574908b9c3e17578ceebce9e1102a53adc"
  - id: implementation
    title: "Specific implementation reviewed"
    url: "https://github.com/PyMoDAQ/PyMoDAQ/commit/b69fef95ed1db41a853fbdc15c005309eec01ce3"
---

## Scope and limits

The reviewed 5.3 branch changes array-shape comparison to avoid suppressing actuator operations. Software regression behavior does not verify timing or settling in a physical measurement setup.

[Reviewed upstream implementation](#source-implementation).
