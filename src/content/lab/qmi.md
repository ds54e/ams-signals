---
name: "QMI"
aliases: []
description: "Quantum Measurement Infrastructure provides Python services and RPC-based drivers for monitoring and controlling laboratory instruments. It supports distributed experiment applications that need to issue instrument commands and acquire traces without embedding the transport details in each client."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  test: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited on the Signal Hound BB60C change that includes executable mock-transport unit tests."
  sources: [activity]
  reviewedAt: "2026-11-24"
access: "MIT; some instrument drivers require separate vendor DLLs or SDKs."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/QuTech-Delft/QMI"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/QuTech-Delft/QMI/commit/14d079df902bc19880e67e006fb5312e89bc10ab"
---

## Scope and limits

The BB60C driver adds frequency, bandwidth and trace operations; mock transport checks are not measured instrument performance. Check the tested driver, firmware and library version for each instrument.

[Reviewed upstream implementation](#source-activity).
