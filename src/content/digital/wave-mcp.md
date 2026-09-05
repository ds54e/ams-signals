---
name: "wave-mcp"
aliases: []
roles: ["eda-tool"]
primary: "debug-waveform"
ai: "ai-enabled"
description: "Agent-facing waveform and RTL query backend exposing FST values, hierarchy, drivers, fan-in, X propagation and waveform comparisons as structured tools."
keywords: ["FST", "SystemVerilog", "X tracing", "MCP"]
areas:
  debug-waveform: core
  formal-verification: supporting
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

### Scope

FST queries and pyslang-based static connectivity/driver analysis form the core debug scope. Comparison and failure analysis support verification. [Project documentation](#source-readme).

### Classification

The MCP server exposes actual waveform and RTL query operations to agents, establishing AI-enabled runtime integration. [Reviewed source](#source-readme).

### Release boundary

The tool reads existing simulation artifacts; it is not a simulator. Reported production and query-accuracy results were not independently reproduced. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
