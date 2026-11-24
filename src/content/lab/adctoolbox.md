---
name: "ADCToolbox"
aliases: []
description: "Python and MATLAB tools for ADC waveform evaluation, including spectral figures of merit, sine fitting and linearity analysis. Signal-generation utilities provide known test stimuli and nonidealities for checking analysis scripts and exploring how sampling-clock errors affect recorded data."
scope:
  analysis: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Fable is credited on the Python sampling-jitter injection repair."
  sources: [implementation]
  reviewedAt: "2026-11-24"
access: "MIT with an academic citation notice; synthetic checks do not require an ADC."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://adctoolbox.tokenzhang.com/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/Arcadia-1/ADCToolbox"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/Arcadia-1/ADCToolbox/commit/cb3636cd3b68ba3a6ec321a6b5c71e244d9a85d3"
  - id: implementation
    title: "Specific implementation reviewed"
    url: "https://github.com/Arcadia-1/ADCToolbox/commit/6e920bdf7cb0dd92d6ad25af754c44f77fdc4ff5"
  - id: release
    title: "Public v0.9.3 predates the reviewed change"
    url: "https://github.com/Arcadia-1/ADCToolbox/releases/tag/v0.9.3"
---

## Scope and limits

The reviewed Python chained-jitter repair follows the v0.9.3 tag, although source still displays that version. The method uses the generator's known carrier and is not arbitrary-waveform resampling or automatic separation of measured jitter sources.

[Reviewed upstream implementation](#source-implementation).

Additional context: [Public v0.9.3 predates the reviewed change](#source-release).
