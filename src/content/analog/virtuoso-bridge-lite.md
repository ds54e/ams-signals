---
name: "virtuoso-bridge-lite"
aliases: ["VirtuosoBridgeLite","Virtuoso-Bridge"]
summary: "Exposes Python and CLI primitives for Virtuoso schematic, layout, Maestro, and Spectre operations."
description: "Connects Python or CLI workflows to local or remote Virtuoso sessions for SKILL execution, schematic planning, layout geometry, and Maestro setup. Also provides standalone Spectre execution and PSF result parsing."
scope:
  design:
    level: core
    ai: false
  simulation:
    level: core
    ai: false
  layout:
    level: supporting
    ai: false
targets: "Schematics, layout, Maestro, Spectre, PSF, and remote sessions"
access: "Bridge, Python APIs, CLI, and operating guides are public. Users supply licensed Virtuoso or Spectre installations and the required PDK and circuit assets."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Public repository"
    url: "https://github.com/Arcadia-1/virtuoso-bridge-lite"
    purpose: "code"
  - id: "review"
    title: "Reviewed README: APIs, CLI, connection modes, and prerequisites"
    url: "https://github.com/Arcadia-1/virtuoso-bridge-lite/blob/ae8e26791c137e638e0f451f12a483d7f275ba0e/README.md"
  - id: "layout"
    title: "Reviewed layout geometry implementation"
    url: "https://github.com/Arcadia-1/virtuoso-bridge-lite/blob/ae8e26791c137e638e0f451f12a483d7f275ba0e/src/virtuoso_bridge/virtuoso/layout/editor.py"
---
### Implemented interfaces

Interfaces cover SKILL expressions and files, explicit-connectivity schematic planning, layout generation, and Maestro setup. Local and SSH-based operation support multiple connection profiles. [Interfaces](#source-review)

### Simulator boundary

Standalone Spectre execution and PSF parsing are also provided. Spectre and the SKILL bridge can operate independently; neither includes the commercial simulator or a PDK. Optional optimizer guides and external workflows add higher-level procedures, whose design results must be assessed separately. [Setup and workflow boundaries](#source-review)

### Scope classification

Schematic editing, Maestro setup, standalone Spectre and PSF extraction are exposed operations. Layout primitives provide supporting geometry control, not a demonstrated autonomous physical-design flow. [Reviewed source](#source-review).

Schematic, simulation/result and supporting geometry interfaces are conventional operations. MCP/CLI/Python access for a separately supplied agent does not establish model-driven behavior inside the bridge. [AI/stage evidence](#source-review).
