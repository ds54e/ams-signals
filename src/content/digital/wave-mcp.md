---
name: "wave-mcp"
aliases: []
description: "MCP backend exposing FST waveform values, SystemVerilog hierarchy, drivers, fan-in, X propagation and waveform comparisons as structured agent tools."
scope:
  verification:
    level: core
    ai: false
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical wave-mcp repository"
    url: "https://github.com/Tencent/wave-mcp"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/Tencent/wave-mcp/blob/4c9a2550cbc99ec4448cac556948d5ce32d7a214/README.md"
  - id: "implementation"
    title: "Reviewed implementation: wave_mcp/netlist/trace_engine.py"
    url: "https://github.com/Tencent/wave-mcp/blob/4c9a2550cbc99ec4448cac556948d5ce32d7a214/wave_mcp/netlist/trace_engine.py"
  - id: "activity"
    title: "fix(deploy): resolve install paths to absolute and verify launcher at install time"
    url: "https://github.com/Tencent/wave-mcp/commit/cbd367ada0da49ca9cd5ef34dd201f751cfb5ea5"
---


### Implementation context

The MCP server exposes implemented waveform and RTL query operations to agents. [Reviewed source](#source-readme).

### Release boundary

The tool reads existing simulation artifacts; it is not a simulator. Reported production and query-accuracy results were not independently reproduced. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

FST queries, connectivity tracing and failure comparisons are debug/verification operations over existing artifacts. Static elaboration does not edit the design. [Reviewed source](#source-readme).

Structured waveform, driver and X-tracing queries serve conventional Verification. The inspected server supplies tools to an external model rather than implementing model-driven debug decisions itself. [AI/stage evidence](#source-readme).
