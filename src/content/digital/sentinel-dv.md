---
name: "Sentinel DV"
aliases: []
description: "Read-only MCP server for triaging UVM logs, assertions, coverage, regressions and waveform summaries across simulator artifacts."
scope:
  verification:
    level: core
    ai: false
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


### Implementation context

MCP tools expose verification evidence to external agents; tool exposure alone does not establish an implemented model-driven diagnostic loop. [Reviewed source](#source-readme).

### Release boundary

Run submission and replay return commands for review; they do not execute simulations. Waveform summaries and bounded VCD analysis are not unrestricted native FSDB/WLF streaming. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

Read-only triage of logs, assertions, coverage, regressions and waveform summaries is verification. The MCP interface does not itself generate or implement RTL. [Reviewed source](#source-readme).

The read-only server exposes existing verification evidence to external agents. Its query interface and workflow instructions alone do not establish model inference within the tool, so Verification stays unprefixed. [AI/stage evidence](#source-readme).
