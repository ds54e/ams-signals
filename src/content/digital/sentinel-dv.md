---
name: "Sentinel DV"
aliases: []
description: "Read-only verification-evidence server with packaged agent skills for regression triage, causal failure analysis and coverage planning. Models query bounded UVM, assertion, coverage and waveform evidence indexed in DuckDB; replay and run requests produce reviewable commands rather than executing simulations or editing RTL."
scope:
  verification:
    ai: true
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
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
  - id: "debug-skill"
    title: "Packaged causal failure-debugging workflow"
    url: "https://github.com/kiranreddi/sentinel-dv/blob/0915256a8eda99ad2a5a5a2529d658e1bba8b6cc/skills/sentinel-dv-failure-debugging/SKILL.md"
  - id: "coverage-skill"
    title: "Packaged coverage-prioritization workflow"
    url: "https://github.com/kiranreddi/sentinel-dv/blob/0915256a8eda99ad2a5a5a2529d658e1bba8b6cc/skills/sentinel-dv-coverage-closure/SKILL.md"
---


### Implementation context

MCP tools expose verification evidence to the shipped host-agent debugging, regression-triage and coverage-planning skills. [Reviewed source](#source-readme).

### Release boundary

Run submission and replay return commands for review; they do not execute simulations. Waveform summaries and bounded VCD analysis are not unrestricted native FSDB/WLF streaming. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

The released failure-debugging skill builds causal timelines and tests hypotheses using bounded evidence; the coverage skill prioritizes reachable gaps and proposes specific follow-up tests or constraints. These model-hosted diagnostic decisions justify AI Verification beyond generic MCP access. The server remains read-only and its indexed evidence is not a model verdict. [Failure debugging](#source-debug-skill); [Coverage planning](#source-coverage-skill).

### Current-source review

Reviewed 2026-10-01. The documented skills are shipped for Codex, Claude Code and GitHub Copilot and call the implemented query tools. Coverage-advisor snippets are reviewable candidates; only a later indexed run can demonstrate closure. [README](#source-readme); [Coverage skill](#source-coverage-skill).
