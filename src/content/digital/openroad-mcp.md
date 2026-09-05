---
name: "OpenROAD-MCP"
aliases: []
description: "Official MCP interface managing persistent OpenROAD sessions and ORFS runs, with design commands, reports, metrics and physical-flow checks for agents."
scope:
  layout:
    level: core
    ai: false
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical OpenROAD-MCP repository"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD-MCP"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD-MCP/blob/956390a829533f92d94f084b737340256e312d87/README.md"
  - id: "implementation"
    title: "Reviewed implementation: typescript/src/interactive/pty_handler.ts"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD-MCP/blob/956390a829533f92d94f084b737340256e312d87/typescript/src/interactive/pty_handler.ts"
  - id: "activity"
    title: "MCP tool improvements: bounded physical-design actions and reports"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD-MCP/commit/d8eec2aeff6b8f2273037254eb42413e03595e3d"
---


### Implementation context

The official MCP tool surface is an implemented agent interface. [Reviewed source](#source-readme).

### Release boundary

Tool exposure is not evidence of autonomous physical-design success. Meaningful activity uses the August tool/flow implementation rather than later automated dependency and release traffic. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

Persistent OpenROAD/ORFS sessions expose physical-design actions, reports and metrics. The reviewed interface is classified by those operations, not every dependency of an ORFS installation. [Reviewed source](#source-readme).

The interface exposes persistent physical-design commands and reports. An MCP connection alone does not establish an implemented AI Layout decision loop. [AI/stage evidence](#source-readme).
