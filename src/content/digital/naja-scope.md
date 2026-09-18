---
name: "naja-scope"
aliases: []
description: "MCP server exposing elaborated SystemVerilog structure to coding agents through bounded hierarchy, connectivity, driver/load, logic-cone and source-location queries. It supports RTL and post-synthesis gate netlists with Liberty libraries, giving an agent structural context without treating source search or waveform text as a substitute for elaboration."
scope:
  verification:
    ai: false
access: "Apache-2.0 public source and PyPI package; requires Python and najaeda, with optional MCP clients for agent use."
addedAt: "2026-09-18"
reviewedAt: "2026-09-18"
sources:
  - id: "code"
    title: "Canonical naja-scope repository"
    url: "https://github.com/najaeda/naja-scope"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/najaeda/naja-scope/blob/4ab87869a458f8e32fe378c32cb495a55a3f8f07/README.md"
  - id: "activity"
    title: "v0.1.13 preparation and traversal update"
    url: "https://github.com/najaeda/naja-scope/commit/95afc206c7ffde4291efa8c6d280378cd6223077"
---

### Structural query boundary

naja-scope loads an elaborated design once and exposes targeted queries for hierarchy, connectivity, drivers, loads, source locations and combinational cones. Gate-level use adds Liberty data and retains structural navigation while source-line retrieval remains an RTL feature. [Reviewed source](#source-readme)

### Agent boundary

The MCP server supplies deterministic design facts to an external agent. Its public benchmark compares agent performance with and without these structural tools, but the server itself does not implement model-driven verification decisions, so MCP integration alone does not create an AI-prefixed stage. [Reviewed source](#source-readme)

### Scope classification

Elaborated-design inspection, source tracing and logic-cone navigation are verification/debug operations. The tool does not edit RTL or perform synthesis as a user-facing deliverable, so only conventional Verification is assigned. [Reviewed source](#source-readme)
