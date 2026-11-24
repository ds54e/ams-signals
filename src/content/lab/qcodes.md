---
name: "QCoDeS"
aliases: ["Qcodes"]
description: "Python framework for instrument control, acquisition and repeatable measurement sweeps. Drivers and parameter abstractions feed doNd scan procedures and datasets containing run metadata and instrument settings; saved runs can be reopened for plotting and complex-data inspection."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  test: { ai: false }
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
  - id: sweep-procedure
    title: "Reusable doNd measurement sweep orchestration"
    url: "https://github.com/microsoft/Qcodes/blob/a8443cda5f1df38fd4c8d5403104e89de7ace42a/src/qcodes/dataset/dond/do_nd.py"
  - id: saved-run-analysis
    title: "Saved-run loading and complex-data plotting"
    url: "https://github.com/microsoft/Qcodes/blob/a8443cda5f1df38fd4c8d5403104e89de7ace42a/src/qcodes/dataset/plotting.py"
---

## Scope and limits

Instrument configuration, cached state and measured readback are different. A driver does not establish the actual aperture, settling or calibration of an instrument.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.

The measurement context can record an exception and still mark a dataset completed. Completion describes closure, not successful acquisition of every planned point or a DUT verdict. Snapshots can also use cached values. [Measurement context](#source-measurement-state). The reviewed repository license is MIT. [License](#source-license).

Test Automation follows the reusable doNd procedure: it coordinates multiple parameter sweeps, settling delays, measurements, dataset writes, entry/exit actions and interruption handling. Analysis follows `plot_by_id`, which reloads a saved run and supports real/imaginary or magnitude/phase inspection. These are distinct implemented operations, beyond a scriptable driver or an internal read loop. [Sweep procedure](#source-sweep-procedure) · [Saved-run analysis](#source-saved-run-analysis).
