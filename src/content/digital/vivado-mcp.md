---
name: "vivado_mcp"
aliases: []
description: "MCP server keeping a persistent Vivado Tcl session for FPGA synthesis, implementation, timing and XSim operations. External agents can query the design, inspect utilization or timing reports and request bitstream generation without restarting Vivado for each command."
scope:
  synthesis:
    ai: false
  verification:
    ai: false
  layout:
    ai: false
  aiDevelopment: built
developmentEvidence:
  summary: "The maintainer reports creating this MCP server through conversations with Claude, including persistent Vivado sessions and tool commands. The account describes implementation of the server itself."
  sources: ["readme", "development-2"]
  reviewedAt: "2026-09-07"
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
  - id: "development-2"
    title: "Session implementation"
    url: "https://github.com/coreyhahn/vivado_mcp/commit/c019e32ed8618f11635ee1dad1bf2cc38bbd71f8"
---


### Implementation context

The author explicitly states the server was built through conversations with Claude, corroborated by the session implementation. The implemented MCP interface exposes the persistent session to agents at runtime. [Reviewed source](#source-readme).

### Release boundary

Available Vivado commands are infrastructure, not demonstrated autonomous FPGA design closure. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

Persistent Vivado commands directly expose synthesis and implementation; XSim exposes behavioral and netlist simulation for Verification. Raw Tcl access alone does not establish RTL design generation. [Reviewed source](#source-readme).

The server exposes conventional synthesis, XSim and implementation commands. The author states that the server was built through Claude conversations, justifying AI-built; the transport does not itself make these AI stages. [AI/stage evidence](#source-readme).

### Development provenance review

Reviewed 2026-09-07: **AI-BUILT**. The maintainer explicitly says the server was created through Claude conversations, with concrete process/session, command and report implementation. This is a creation account spanning the server’s defining code. [Creation account](#source-readme); [Session implementation](#source-development-2).
