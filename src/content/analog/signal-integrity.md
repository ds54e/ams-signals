---
name: "SignalIntegrity"
aliases: []
summary: "Evaluates linear package, board and fixture networks from S-parameters and circuit models."
description: "Models linear signal paths using S-parameters and schematic or programmatic network definitions. Time-domain response, de-embedding, eye visualization and linear noise contributions help evaluate packages, boards and fixtures without treating those models as measurements."
scope:
  simulation: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Copilot is credited on the executable GUI refresh, not on the solver or the separate noise contribution work."
  sources: [ai-change]
  reviewedAt: "2026-11-24"
access: "GPL-3.0-or-later; network data, fixtures and calibrated measurements remain separate inputs."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/Nubis-Communications/SignalIntegrity"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/Nubis-Communications/SignalIntegrity/commit/4d0d961360d957acbfe8bc1fd075ef2105d63d6e"
  - id: implementation
    title: "Specific implementation reviewed"
    url: "https://github.com/Nubis-Communications/SignalIntegrity/commit/dcaed6753e247866f3cdf7377ca3e9d7bd4b6e63"
  - id: ai-change
    title: "Credited executable implementation change"
    url: "https://github.com/Nubis-Communications/SignalIntegrity/commit/8b0e3fd6a6e451a8f08192bd95f4d137b5bd7943"
  - id: release
    title: "Public v1.6.0"
    url: "https://github.com/Nubis-Communications/SignalIntegrity/releases/tag/v1.6.0"
---

## Scope and limits

The reviewed v1.6.0 work exposes noise-source contributions. Linear propagation is not oscillator phase-noise simulation; de-embedding depends on the fixture definition and its invertibility.

[Reviewed upstream implementation](#source-implementation).

Additional context: [Public v1.6.0](#source-release).
