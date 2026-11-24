---
name: "analog-agents"
summary: "Role-separated analog design and verification agents with parasitic-netlist analysis and PVT checks."
description: "Coordinates architect, designer and verifier agents across architecture decomposition, circuit revision, Spectre evaluation and PVT checks. Stage-specific review and a design-knowledge wiki support iteration, while a separate parasitic-netlist analyzer reports coupling and resistive paths from Calibre/Spectre extracts; full EDA execution requires configured servers and licensed tools."
scope:
  design:
    ai: true
  simulation:
    ai: true
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude-credited development implemented the session-evolution backend and parasitic-netlist crawl/audit tooling. The session-analysis engine remains in the current project."
  sources: ["development-audit-implementation", "development-audit-extension", "development-audit-retained"]
  reviewedAt: "2026-10-12"
access: "Public skill framework. Review mode can run without EDA; the full path requires configured servers plus the user's Virtuoso/Spectre environment, and optional external model endpoints for cross-model review."
addedAt: "2026-09-26"
reviewedAt: "2026-11-24"
sources:
  - id: "official"
    title: "analog-agents project site"
    url: "https://arcadia-1.github.io/analog-agents/"
    purpose: "official"
  - id: "code"
    title: "Canonical analog-agents repository"
    url: "https://github.com/Arcadia-1/analog-agents"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/Arcadia-1/analog-agents/blob/4d6bd218ceff60624d7ee62887787aa83daecdb4/README.md"
  - id: "pipeline"
    title: "Analog pipeline skill"
    url: "https://github.com/Arcadia-1/analog-agents/blob/4d6bd218ceff60624d7ee62887787aa83daecdb4/skills/analog-pipeline/SKILL.md"
  - id: "activity"
    title: "Analog netlist-crawl implementation update"
    url: "https://github.com/Arcadia-1/analog-agents/commit/771d27d3b0b939b916f819ae375469cda892eb24"
  - id: "development-audit-implementation"
    title: "Reviewed AI-attributed implementation"
    url: "https://github.com/Arcadia-1/analog-agents/commit/f5a55151d3b89fd80295e25f06dcccbf73eed6aa"
  - id: "development-audit-extension"
    title: "Reviewed coordinated implementation extension"
    url: "https://github.com/Arcadia-1/analog-agents/commit/dbd95f19b0a6612dcfad2351cd460e8cd9fb5a13"
  - id: "development-audit-retained"
    title: "Retained implementation at the reviewed repository head"
    url: "https://github.com/Arcadia-1/analog-agents/blob/4d6bd218ceff60624d7ee62887787aa83daecdb4/tools/evolve_engine.py"
  - id: "review-20261124-netlist-crawl"
    title: "Independent Calibre/Spectre parasitic-netlist analysis CLI"
    url: "https://github.com/Arcadia-1/analog-agents/blob/4d6bd218ceff60624d7ee62887787aa83daecdb4/skills/analog-netlist-crawl/scripts/scan.py"
  - id: "review-20261124-resistance"
    title: "Resistive-network analysis kernel"
    url: "https://github.com/Arcadia-1/analog-agents/blob/4d6bd218ceff60624d7ee62887787aa83daecdb4/skills/analog-netlist-crawl/scripts/kernels/r_network.py"
---

### Agent roles

The pipeline assigns architecture and testbench ownership to an architect, transistor-level circuit work to a designer and pre-simulation review plus electrical verification to a verifier. Behavioral validation and integration precede an L3 PVT sign-off gate in full EDA mode. [Pipeline](#source-pipeline)

### EDA boundary

The orchestrator itself sequences skills; the verifier owns simulation, measurement review and quantified margin reporting. Without configured EDA servers the workflow switches to review-only mode and does not claim simulation-verified delivery. [Reviewed source](#source-pipeline)

### Scope classification

Models make architecture, sizing and circuit-revision decisions, giving AI Design. The verifier agent also interprets simulation outcomes, diagnoses failures and routes quantified fixes around Spectre execution, which makes the Simulation stage AI-participating even though the solver remains conventional. [Reviewed source](#source-readme)

### Development provenance

The retained Python backend reads completed sessions, extracts lessons and verifier rejection patterns, and emits reviewable knowledge/checklist proposals. Attribution covers executable analysis tooling; agent-facing instructions and runtime model use are separate evidence. [Implementation](#source-development-audit-implementation) · [Implementation](#source-development-audit-extension) · [Retained code](#source-development-audit-retained)

### Independent selection value

The staged architecture/design/verifier contract assigns circuit decisions and electrical interpretation to distinct roles, rather than exposing only generic bridge calls. A separate executable netlist-crawl CLI parses Calibre mr_pp and Spectre extracts, ranks parasitic coupling and solves selected resistive paths. Those reusable review operations justify retaining this workflow alongside lower-level EDA bridges. Numerical parasitic analysis is conventional; it does not supply an additional AI stage. PVT checks are workflow gates, not an independently qualified signoff service. [Stage contract](#source-pipeline) · [Netlist analysis CLI](#source-review-20261124-netlist-crawl) · [Resistance kernel](#source-review-20261124-resistance).
