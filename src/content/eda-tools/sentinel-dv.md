---
name: "Sentinel DV"
aliases: []
primary: "debug-waveform"
ai: "ai-enabled"
description: "Read-only agent interface indexing UVM logs, assertions, coverage, regressions and waveform summaries for failure triage and verification analysis."
keywords: ["regression triage", "UVM", "coverage", "MCP", "waveform"]
areas:
  debug-waveform: core
  formal-verification: core
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical Sentinel DV repository"
    url: "https://github.com/kiranreddi/sentinel-dv"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/kiranreddi/sentinel-dv/blob/0915256a8eda99ad2a5a5a2529d658e1bba8b6cc/README.md"
  - id: "implementation"
    title: "Reviewed implementation: sentinel_dv/adapters/waveform_summary.py"
    url: "https://github.com/kiranreddi/sentinel-dv/blob/0915256a8eda99ad2a5a5a2529d658e1bba8b6cc/sentinel_dv/adapters/waveform_summary.py"
  - id: "activity"
    title: "Fix clean-clone skill verification and security audit"
    url: "https://github.com/kiranreddi/sentinel-dv/commit/c8acc00a4ebd4b0a9079b1aa770bcfefbce63770"
  - id: "website"
    title: "Official project documentation"
    url: "https://kiranreddi.github.io/sentinel-dv/"
    purpose: "official"
---

### Scope

Debug triage and verification-evidence analysis are both central. The implemented adapters index exported artifacts and expose bounded queries. [Project documentation](#source-readme).

### Classification

MCP tools and agent workflows provide runtime AI integration over verification evidence. [Reviewed source](#source-readme).

### Release boundary

Run submission and replay return commands for review; they do not execute simulations. Waveform summaries and bounded VCD analysis are not unrestricted native FSDB/WLF streaming. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
