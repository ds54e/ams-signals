---
name: "LibreVNA"
aliases: ["VNA vector network analyzer LibreCAL"]
description: "Open vector network analyzer project with instrument hardware, firmware and desktop software. It acquires and calibrates S-parameter sweeps for network and fixture measurements and supports remote control for repeatable measurement setups; compound devices lack phase information for transmission between separate units."
scope:
  control: { ai: false }
  board: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for tightening the second-LO retune threshold and rounding the frequency divider. The current VNA firmware retains the tighter IF deviation threshold."
  sources: [development-code, development-retained]
  reviewedAt: "2026-11-24"
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
  - id: compound-phase
    title: "Reviewed compound-device limitation"
    url: "https://github.com/jankae/LibreVNA/blob/e21e2fe218b7cc61dca85f3897a945711118389d/Documentation/UserManual/manual.tex"
  - id: development-code
    title: "Credited LO frequency-plan correction"
    url: "https://github.com/jankae/LibreVNA/commit/a05b59b001251d0697af0d235c8d073f3f7d34aa"
  - id: development-retained
    title: "Retained second-LO retuning implementation"
    url: "https://github.com/jankae/LibreVNA/blob/e21e2fe218b7cc61dca85f3897a945711118389d/Software/VNA_embedded/Application/VNA.cpp"
---

## Scope and limits

Calibration and fixture reference planes matter. S-parameter measurements are not measurements of phase noise or jitter. [LibreCAL](#source-librecal) is a companion, not a second analyzer.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.

Control includes the published SCPI interface for configuring the physical instrument through its host application. This is separate from acquiring or calibrating a sweep. [Programming guide](#source-scpi-control).

The compound-device manual states that transmission phase between separate physical units is unavailable and is set to zero in software. A compound sweep therefore does not provide a complete coherent multiport S-matrix for mixed-mode conversion. [Manual](#source-compound-phase). The credited frequency-plan repair improves absolute receiver-level accuracy under the reported test conditions; it does not remove that hardware limitation. [Credited change](#source-development-code) · [Retained implementation](#source-development-retained).
