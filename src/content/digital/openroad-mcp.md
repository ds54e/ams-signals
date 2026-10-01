---
name: "OpenROAD-MCP"
aliases: []
description: "MCP server exposing persistent OpenROAD sessions and tracked OpenROAD-flow-scripts jobs to external agents. Explicit targets cover synthesis through floorplanning, placement, CTS and routing, with validated overrides, current-run metrics and report access; the server supplies execution tools rather than its own model-driven optimization policy."
scope:
  synthesis:
    ai: false
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "A Claude-credited implementation introduced separate query and execute tools with Tcl command-permission checks. That permission model remains in the current TypeScript server; the evidence concerns the original subsystem implementation."
  sources: ["development-1", "development-2", "development-3"]
  reviewedAt: "2026-09-07"
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Canonical OpenROAD-MCP repository"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD-MCP"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD-MCP/blob/77f39cc9c290da0e564af6ef01b336672ed40066/README.md"
  - id: "implementation"
    title: "Reviewed implementation: typescript/src/interactive/pty_handler.ts"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD-MCP/blob/77f39cc9c290da0e564af6ef01b336672ed40066/typescript/src/interactive/pty_handler.ts"
  - id: "activity"
    title: "MCP tool improvements: bounded physical-design actions and reports"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD-MCP/commit/d8eec2aeff6b8f2273037254eb42413e03595e3d"
  - id: "development-1"
    title: "Security/refactor history"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD-MCP/commit/e6b22895ddcfe3971b952ff12aef6d0e7ccdab8b"
  - id: "development-2"
    title: "Current command validators"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD-MCP/blob/ae4937cdc1183029c29c8597f7319517058a2929/typescript/src/config/command_whitelist.ts"
  - id: "development-3"
    title: "Current query/execute tools"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD-MCP/blob/ae4937cdc1183029c29c8597f7319517058a2929/typescript/src/tools/interactive.ts"
  - id: "flow-runner"
    title: "Explicit synthesis and physical-design job implementation"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD-MCP/blob/77f39cc9c290da0e564af6ef01b336672ed40066/typescript/src/tools/flow_run.ts"
  - id: "activity-review"
    title: "Remove obsolete ORFS gate evaluation and correct result semantics"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD-MCP/commit/0e0d4bfe35c3ecb84c86fd443615363fd661e84e"
---


### Implementation context

The official MCP tool surface is an implemented agent interface. [Reviewed source](#source-readme).

### Release boundary

Tool exposure is not evidence of autonomous physical-design success. Meaningful activity must distinguish functional flow/report changes from automated dependency and release traffic. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

The implemented ORFS runner explicitly accepts synth, floorplan, place, cts, grt, route and finish targets, so Synthesis and Layout are direct user-facing operations. This is stronger evidence than merely depending on ORFS. The server has no inspected substantive stage-decision skill or internal model policy; these stages remain conventional despite MCP client support. [Flow runner](#source-flow-runner); [README](#source-readme).

### Development provenance review

Reviewed 2026-09-07: **AI-ASSISTED**. The credited Python campaign implements permission checks, separate read/query and modifying/execute tools, server wiring and regression tests. The same tool boundary and validators persist in the current TypeScript port, verified in code; the port itself is not attributed to AI. [Security/refactor history](#source-development-1); [Current command validators](#source-development-2); [Current query/execute tools](#source-development-3).

### Current-source review

Reviewed 2026-10-01. The current runner includes only metrics freshly produced by a run. Its legacy gate fields no longer judge removed ORFS rules-base.json criteria; empty gates must not be read as a signoff verdict. [Flow runner](#source-flow-runner).

The newest reviewed meaningful first-parent change is remove obsolete ORFS gate evaluation and correct result semantics (2026-09-29 UTC). [Reviewed commit](#source-activity-review).
