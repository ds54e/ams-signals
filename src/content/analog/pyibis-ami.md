---
name: "PyIBIS-AMI"
aliases: ["PyAMI"]
summary: "Inspects IBIS/AMI models and evaluates supported buffer data and compiled model interfaces."
description: "Python tooling for inspecting IBIS and AMI models, evaluating IBIS I-V data and exercising compatible compiled AMI model interfaces. It supports model preparation and testing separately from a complete bit-error-rate or channel simulation application."
scope:
  simulation: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited on IBIS I-V table handling for discontinuities and the associated regression coverage."
  sources: [implementation]
  reviewedAt: "2026-11-24"
access: "BSD-2-Clause; external compiled AMI models have their own licenses and compatibility constraints."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/capn-freako/PyAMI"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/capn-freako/PyAMI/commit/7b53d39ab1266e6096eb663d19c30d32d641a802"
  - id: implementation
    title: "Specific implementation reviewed"
    url: "https://github.com/capn-freako/PyAMI/commit/b87a7be181a7ea2d3509e6b57b1594dc637b73fe"
  - id: release
    title: "Public v10.1.0"
    url: "https://github.com/capn-freako/PyAMI/releases/tag/v10.1.0"
---

## Scope and limits

The v10.1.0 code handles selected rail-relative and discontinuous I-V tables. Min and max current choices still use the typical reference voltage in the reviewed implementation; local slope is not a full nonlinear transient model.

[Reviewed upstream implementation](#source-implementation).

Additional context: [Public v10.1.0](#source-release).
