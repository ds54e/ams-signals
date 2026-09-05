---
name: "vivado_mcp"
aliases: []
roles: ["eda-tool"]
ai: "ai-built"
description: "MCP server keeping a persistent Vivado Tcl session and exposing FPGA project, synthesis, implementation, timing and XSim operations to agents."
flow: {"synthesis":"core","verification":"supporting","layout":"core"}
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical vivado_mcp repository"
    url: "https://github.com/coreyhahn/vivado_mcp"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/coreyhahn/vivado_mcp/blob/bfe6ce2a9f97f3732ae7602ee40447b7e64902f7/README.md"
  - id: "implementation"
    title: "Reviewed implementation: vivado_session.py"
    url: "https://github.com/coreyhahn/vivado_mcp/blob/bfe6ce2a9f97f3732ae7602ee40447b7e64902f7/vivado_session.py"
  - id: "activity"
    title: "Add get_host_status tool for memory-based server selection"
    url: "https://github.com/coreyhahn/vivado_mcp/commit/bfe6ce2a9f97f3732ae7602ee40447b7e64902f7"
---


### Classification

The author explicitly states the server was built through conversations with Claude, corroborated by the session implementation. AI-built takes precedence over its also-present MCP runtime interface; the UI still shows exactly one relation. [Reviewed source](#source-readme).

### Release boundary

Available Vivado commands are infrastructure, not demonstrated autonomous FPGA design closure. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Flow scope

Persistent Vivado commands directly expose synthesis and implementation; XSim is a supporting verification path. Raw Tcl access alone does not establish RTL design generation. [Reviewed source](#source-readme).
