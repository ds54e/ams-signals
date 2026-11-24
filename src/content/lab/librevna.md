---
name: "LibreVNA"
aliases: ["VNA vector network analyzer LibreCAL"]
description: "Open vector network analyzer project with instrument hardware, firmware and desktop software. It acquires and calibrates S-parameter sweeps for network and fixture measurements and supports remote control for repeatable measurement setups."
scope:
  control: { ai: false }
  board: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
access: "Public source under GPL-3.0; review component-specific hardware terms separately."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical project source"
    url: "https://github.com/jankae/LibreVNA"
    purpose: code
  - id: activity
    title: "Reviewed implementation or test change"
    url: "https://github.com/jankae/LibreVNA/commit/e21e2fe218b7cc61dca85f3897a945711118389d"
  - id: librecal
    title: "LibreCAL calibration companion"
    url: "https://github.com/jankae/LibreCAL"
  - id: scpi-control
    title: "Scriptable sweep and instrument controls"
    url: "https://github.com/jankae/LibreVNA/blob/e21e2fe218b7cc61dca85f3897a945711118389d/Documentation/UserManual/ProgrammingGuide.tex"
---

## Scope and limits

Calibration and fixture reference planes matter. S-parameter measurements are not measurements of phase noise or jitter. [LibreCAL](#source-librecal) is a companion, not a second analyzer.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.

Control includes the published SCPI interface for configuring the physical instrument through its host application. This is separate from acquiring or calibrating a sweep. [Programming guide](#source-scpi-control).
