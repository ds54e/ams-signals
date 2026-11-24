---
name: "QMI"
aliases: ["Quantum Measurement Infrastructure"]
description: "Python services and RPC-based drivers for distributed instrument control and acquisition. Clients operate instruments hosted in separate QMI contexts; a bundled laser and power-meter calibration example sweeps current, measures optical power and fits a calibration curve, while general test procedures require application code."
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
  - id: calibration-procedure
    title: "Executable laser-current sweep, power measurements and fit"
    url: "https://github.com/QuTech-Delft/QMI/blob/d3ecd5c01609528fabbc6801996fd1eb562c38ff/examples/calibration/calibration_client.py"
  - id: calibration-server
    title: "Remote Cobolt laser and Thorlabs meter setup for the example"
    url: "https://github.com/QuTech-Delft/QMI/blob/d3ecd5c01609528fabbc6801996fd1eb562c38ff/examples/calibration/calibration_server.py"
  - id: development-retained
    title: "Retained BB60C mock-transport tests"
    url: "https://github.com/QuTech-Delft/QMI/blob/d3ecd5c01609528fabbc6801996fd1eb562c38ff/tests/instruments/signal_hound/test_bb60c.py"
---

## Scope and limits

The BB60C driver adds frequency, bandwidth and trace operations; mock transport checks are not measured instrument performance. Check the tested driver, firmware and library version for each instrument.

[Reviewed upstream implementation](#source-activity).

The distinct use here is operating instrument services from separate client contexts, with driver and transport details held by the server. The bundled calibration server creates concrete Cobolt laser and Thorlabs power-meter instances for a remote client. [Calibration server](#source-calibration-server).

Test Automation is grounded in the bundled calibration client: it configures the meter, sweeps laser drive current through 81 settings, reads power, selects the fitting region and reports linear-fit coefficients. This is a specific executable measurement procedure, not a general fixture or pass/fail test system. It requires the stated instruments and setup; the example switches the laser off only on its normal completion path. [Calibration procedure](#source-calibration-procedure).

The generic task lifecycle and periodic scheduler provide application infrastructure. Their measurement callbacks are supplied by the application, so those abstractions alone do not establish Test Automation. [Task implementation](#source-task-execution).
