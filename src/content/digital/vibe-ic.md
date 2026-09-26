---
name: "Vibe-IC"
aliases: ["vibe-ic"]
description: "Claude Code plugin and MCP-EDA flow that turns natural-language or document specifications into RTL and drives simulation/formal, synthesis/STA, FPGA prototyping and OpenROAD/KLayout/Netgen physical implementation under deterministic compliance gates. Agent skills generate and repair artifacts while tool-produced evidence remains authoritative."
scope:
  design:
    ai: true
  synthesis:
    ai: true
  verification:
    ai: true
  layout:
    ai: true
access: "Apache-2.0 public plugin and bundled MCP-EDA tooling. The open path uses pinned open-source EDA tools; FPGA, commercial-EDA, PDK and lab-hardware paths require the corresponding user-provided environments."
addedAt: "2026-09-26"
reviewedAt: "2026-09-26"
sources:
  - id: "official"
    title: "Vibe-IC project site"
    url: "https://vibeic.ai"
    purpose: "official"
  - id: "code"
    title: "Canonical Vibe-IC repository"
    url: "https://github.com/vibeic/vibe-ic"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/vibeic/vibe-ic/blob/40315b3aa14baf41177203a2388a3cd62c1767a2/README.md"
  - id: "agent-guide"
    title: "Agent usage and staged flow contract"
    url: "https://github.com/vibeic/vibe-ic/blob/40315b3aa14baf41177203a2388a3cd62c1767a2/vibe-ic-marketplace/AGENT_USAGE_GUIDE.md"
  - id: "activity"
    title: "September 26 live-flow and compliance merge"
    url: "https://github.com/vibeic/vibe-ic/commit/40315b3aa14baf41177203a2388a3cd62c1767a2"
---

### Staged flow

The plugin routes agent-authored RTL through deterministic lint, simulation/formal, synthesis, STA and backend runners instead of accepting a model's self-reported verdict. Stage-specific skills include RTL/testbench/property generation, synthesis diagnosis, timing review, hold repair and physical-verification triage. [Agent guide](#source-agent-guide)

### Evidence boundary

Open-source tool outputs and explicit compliance gates determine whether artifacts exist and checks passed; the repository also records waived or unavailable paths rather than presenting them as bare passes. Benchmark results are model-plus-plugin datapoints, not isolated model scores. [Reviewed source](#source-readme)

### Scope classification

The agent authors and repairs RTL, testbenches and properties and makes stage-specific synthesis/timing/physical remediation decisions, establishing AI participation across Design, Verification, Synthesis and Layout. Yosys, SymbiYosys, OpenROAD, KLayout and related tools still provide the executable verdicts. [Agent guide](#source-agent-guide)

The repository also contains Analog A1-A9 and mixed-signal tracks. This Digital entry does not assign those operations to the Analog catalog; their native-execution and cross-catalog duplication boundary remains a separate review decision. [Reviewed source](#source-readme)
