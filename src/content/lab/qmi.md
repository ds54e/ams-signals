---
name: "QMI"
aliases: []
description: "Quantum Measurement Infrastructure provides Python services and RPC-based drivers for monitoring and controlling laboratory instruments. It supports distributed measurement applications that issue commands, acquire traces and run managed measurement tasks without embedding transport details in each client."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  test: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for the executable mock-transport unit tests added with the Signal Hound BB60C driver. This attribution does not establish AI authorship of the complete driver."
  sources: [activity, development-retained]
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
  - id: task-execution
    title: "Published task lifecycle and periodic execution"
    url: "https://github.com/QuTech-Delft/QMI/blob/d3ecd5c01609528fabbc6801996fd1eb562c38ff/qmi/core/task.py"
  - id: development-retained
    title: "Retained BB60C mock-transport tests"
    url: "https://github.com/QuTech-Delft/QMI/blob/d3ecd5c01609528fabbc6801996fd1eb562c38ff/tests/instruments/signal_hound/test_bb60c.py"
---

## Scope and limits

The BB60C driver adds frequency, bandwidth and trace operations; mock transport checks are not measured instrument performance. Check the tested driver, firmware and library version for each instrument.

[Reviewed upstream implementation](#source-activity).

Managed tasks and periodic loop policies support repeatable experiment execution; RPC reachability alone would not support the Test Automation scope. [Task lifecycle](#source-task-execution).
