---
name: "ACE-RTL"
aliases: []
description: "Agentic RTL generation and verification framework with Generator, Reflector and Coordinator roles. Model-generated RTL, testbenches or assertions are checked by EDA tools; focused failure diagnosis and accumulated context guide repair or restart, with native and Docker CVDP integration."
scope:
  design:
    ai: true
  verification:
    ai: true
access: "Public source and agent skills. Requires a coding-agent host or configured external model backend, Python and task-specific EDA tools; commercial CVDP rows need licensed tools."
addedAt: "2026-10-01"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Canonical ACE-RTL repository"
    url: "https://github.com/NVlabs/ACE-RTL"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/NVlabs/ACE-RTL/blob/94754d796350d42502c9a32639a20d86f50e9678/README.md"
  - id: "implementation"
    title: "Reviewed implementation"
    url: "https://github.com/NVlabs/ACE-RTL/blob/94754d796350d42502c9a32639a20d86f50e9678/skills/ace-rtl/scripts/ace_cvdp_native_runner.py"
  - id: "activity"
    title: "Implement public LLM backend and external adapter configuration"
    url: "https://github.com/NVlabs/ACE-RTL/commit/65a990605dd354f228fb5c536bb32a42c180e18f"
  - id: "paper"
    title: "ACE-RTL paper"
    url: "https://arxiv.org/abs/2602.10218"
    purpose: "paper"
  - id: "agent-protocol"
    title: "Released role-agent protocol"
    url: "https://github.com/NVlabs/ACE-RTL/blob/94754d796350d42502c9a32639a20d86f50e9678/skills/ace-rtl/SKILL.md"
---

### Implemented agent workflow

The released skill directs a Generator to produce complete RTL, testbench, assertion or optimization artifacts. A FocusedDebugger Reflector interprets bounded evaluator reports, and a FreshStartCoordinator preserves history and decides restarts. These roles connect to checked-in native-runner and model-routing code rather than only exposing a generic API. [Agent protocol](#source-agent-protocol); [Runner](#source-implementation); [Backend implementation](#source-activity).

### Scope classification

Artifact generation and repair establish AI Design. Testbench/assertion generation and model-driven failure diagnosis establish AI Verification, independently of conventional simulator pass/fail verdicts. Merely using Yosys for selected benchmark rows does not establish a separate synthesis-optimization capability. [Agent protocol](#source-agent-protocol); [Reviewed README](#source-readme).

### Access and activity boundary

The host-agent path and explicitly configured external LLM path are distinct; the latter supports an external adapter as well as the documented NVIDIA provider. Native and Docker execution both depend on the selected task's EDA environment. September dependency-security maintenance is the current head; the July public-backend/adapter change supplies substantive implementation evidence. No development-provenance badge is inferred from the product's use of agents. [Reviewed README](#source-readme); [Backend implementation](#source-activity).
