---
name: "RigolWFM"
aliases: []
description: "Decodes supported oscilloscope files from Rigol and several other vendors into a common Python representation. It preserves supported analog, digital and segmented captures and exports data for analysis or replay, including CSV, NumPy, sigrok and piecewise-linear stimulus files."
scope:
  analysis: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited on changes to executable piecewise-linear stimulus export."
  sources: [implementation]
  reviewedAt: "2026-11-24"
access: "BSD-3-Clause; some third-party waveform fixtures have separate notices."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://scottprahl.github.io/RigolWFM/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/scottprahl/RigolWFM"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/scottprahl/RigolWFM/commit/881bc547bb5873543822a11a0d37fabde99b3251"
  - id: implementation
    title: "Specific implementation reviewed"
    url: "https://github.com/scottprahl/RigolWFM/commit/b4847a8482e3a44d5ed04a23d0b632b6f950dec6"
---

## Scope and limits

PWL export shifts the time origin and uses seven significant digits. Closely spaced samples can collapse at that precision, so retain the original file for precision timing analysis. See the compatibility table for covered formats.

[Reviewed upstream implementation](#source-implementation).
