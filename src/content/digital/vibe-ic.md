---
name: "Vibe-IC"
aliases: ["vibe-ic"]
description: "Claude Code plugin for generating and repairing RTL, running simulation and formal checks, and coordinating synthesis and physical implementation. Model-guided stage skills invoke conventional EDA tools and preserve their artifacts; use requires a configured container, toolchain and PDK, and passing project gates does not establish foundry signoff."
scope:
  design:
    ai: true
  synthesis:
    ai: true
  verification:
    ai: true
  layout:
    ai: true
  aiDevelopment: assisted
developmentEvidence:
  summary: "Codex is co-credited for implementing an ensure-only container setup mode in the deployment helper. The canonical helper retains validation that requires a distinct source and target and rejects image pulls in this mode."
  sources: ["development-implementation-20261018", "development-retained-20261018"]
  reviewedAt: "2026-11-12"
access: "Apache-2.0 public plugin and bundled MCP-EDA tooling. The open path uses pinned open-source EDA tools; FPGA, commercial-EDA, PDK and lab-hardware paths require the corresponding user-provided environments."
addedAt: "2026-09-26"
reviewedAt: "2026-11-24"
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
    url: "https://github.com/vibeic/vibe-ic/blob/972a77b8d8fe70231d2938a4a23a1ce6fefc3c55/README.md"
  - id: "agent-guide"
    title: "Agent usage and staged flow contract"
    url: "https://github.com/vibeic/vibe-ic/blob/972a77b8d8fe70231d2938a4a23a1ce6fefc3c55/vibe-ic-marketplace/AGENT_USAGE_GUIDE.md"
  - id: "activity"
    title: "September 26 live-flow and compliance merge"
    url: "https://github.com/vibeic/vibe-ic/commit/40315b3aa14baf41177203a2388a3cd62c1767a2"
  - id: "activity-review"
    title: "Native signoff-evidence preservation and validation"
    url: "https://github.com/vibeic/vibe-ic/commit/972a77b8d8fe70231d2938a4a23a1ce6fefc3c55"
  - id: "activity-current"
    title: "Explicit area-receipt and manifest wiring in the default flow"
    url: "https://github.com/vibeic/vibe-ic/commit/cdf938cca012bb30df329beb5e5e52fb1ed58e61"
  - id: "review-20261011-1"
    title: "Reviewed implementation integration"
    url: "https://github.com/vibeic/vibe-ic/commit/a1157e9aee3fd3c959f9f15767aedb437b7b30d9"
  - id: development-implementation-20261018
    title: "Codex-credited ensure-only container setup mode"
    url: https://github.com/vibeic/vibe-ic/commit/daea1d23772c807783ca0457d6ccaf5d87ebd790
  - id: development-retained-20261018
    title: "Retained ensure-only validation and image-pull guards"
    url: https://github.com/vibeic/vibe-ic/blob/c22e34b991b6380c438f88a3ee9f054f97c3a90e/tools/vibeic-eda/restart-eda.sh
  - id: maintenance-cdc
    title: "November 24 incomplete timing-class rejection and CDC regressions"
    url: https://github.com/vibeic/vibe-ic/commit/6c1bc41e2dbd07110a6ad169fa7c1e4abfc6668e
---

### Staged flow and scope

The plugin routes agent-authored RTL through deterministic lint, simulation/formal, synthesis, STA and backend runners instead of accepting a model's self-reported verdict. Stage-specific skills author and repair RTL, testbenches and properties, diagnose synthesis, review timing, repair hold violations and triage physical verification, establishing AI participation across Design, Verification, Synthesis and Layout. Yosys, SymbiYosys, OpenROAD, KLayout and related tools still provide the executable verdicts. [Agent guide](#source-agent-guide)

### Evidence and operating boundaries

Open-source tool outputs and explicit compliance gates determine whether artifacts exist and checks passed; the repository also records waived or unavailable paths rather than presenting them as bare passes. Benchmark results are model-plus-plugin datapoints, not isolated model scores. [Reviewed source](#source-readme)

The repository also contains Analog A1-A9 and mixed-signal tracks. The separately reviewed Analog entry covers its sizing, testbench, simulation and physical-implementation operations. Vibe-IC is an explicit cross-catalog exception: each entry describes only its domain-specific workflow, and shared repository activity is not a second independent project signal. [Reviewed source](#source-readme)

The default physical flow retains completed rows and their inputs through final layout evidence, and its signoff/fill/stream ordering has targeted fixes. Failure handling, retained evidence and process-specific physical acceptance remain separate. [Reviewed implementation integration](#source-review-20261011-1)

The artifact checks do not independently verify every supported technology or commercial flow. Source and regression evidence was inspected; external EDA/model/conformance experiments were not rerun. [Stage contract](#source-agent-guide); [Setup and reported results](#source-readme).

Maintenance extends beyond the initial release: October's physical-flow evidence fixes are followed by November 24 validation that rejects incomplete timing-class records, with regression cases for malformed routed-interface data. The corrective implementation is integrated in the canonical default branch. These separate changes support continued technical work; release/version counts alone are not the basis. [October integration](#source-review-20261011-1); [November correction and tests](#source-maintenance-cdc).

### Development provenance

Codex is co-credited for implementing an ensure-only container setup mode in the deployment helper. The canonical helper retains validation that requires a distinct source and target and rejects image pulls in this mode. This supports AI-assisted development. [AI-credited executable implementation](#source-development-implementation-20261018) · [Retained executable code at the reviewed canonical head](#source-development-retained-20261018).
