---
name: "virtuoso-bridge-lite"
aliases: ["VirtuosoBridgeLite","Virtuoso-Bridge"]
summary: "Exposes Python and CLI primitives for Virtuoso schematic, layout, Maestro, and Spectre operations."
description: "Python and CLI bridge for Virtuoso schematic/layout editing, Maestro configuration and standalone Spectre execution with PSF parsing. Its bundled netlist skill uses model reasoning to separate circuit/testbench decks and clean semantic structure; simulation, Monte Carlo export and geometry operations remain conventional tool interfaces."
scope:
  design:
    ai: true
  simulation:
    ai: false
  layout:
    ai: false
targets: "Schematics, layout, Maestro, Spectre, PSF, and remote sessions"
access: "Bridge, Python APIs, CLI, and operating guides are public. Users supply licensed Virtuoso or Spectre installations and the required PDK and circuit assets."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Public repository"
    url: "https://github.com/Arcadia-1/virtuoso-bridge-lite"
    purpose: "code"
  - id: "review"
    title: "Reviewed README: APIs, CLI, connection modes, and prerequisites"
    url: "https://github.com/Arcadia-1/virtuoso-bridge-lite/blob/cf6344cff410bcbd32fd6fe595a53d1fdbeeb7c3/README.md"
  - id: "layout"
    title: "Reviewed layout geometry implementation"
    url: "https://github.com/Arcadia-1/virtuoso-bridge-lite/blob/cf6344cff410bcbd32fd6fe595a53d1fdbeeb7c3/src/virtuoso_bridge/virtuoso/layout/editor.py"
  - id: "activity-refresh"
    title: "Latest reviewed meaningful implementation update"
    url: "https://github.com/Arcadia-1/virtuoso-bridge-lite/commit/cf6344cff410bcbd32fd6fe595a53d1fdbeeb7c3"
  - id: "monte-carlo"
    title: "Maestro Monte Carlo configuration, execution and result export"
    url: "https://github.com/Arcadia-1/virtuoso-bridge-lite/commit/469855afb26eb5c3668fcf9ca083e364fa895a04"
  - id: "runtime-netlist"
    title: "Bundled model-driven netlist interpretation and cleanup skill"
    url: "https://github.com/Arcadia-1/virtuoso-bridge-lite/blob/cf6344cff410bcbd32fd6fe595a53d1fdbeeb7c3/skills/netlist/SKILL.md"
---
### Implemented interfaces

Interfaces cover SKILL expressions and files, explicit-connectivity schematic planning, layout generation, and Maestro setup. Local and SSH-based operation support multiple connection profiles. [Interfaces](#source-review)

The September 30 API configures process/mismatch variation, seeds, sampling and DUT filters, executes the selected Maestro session, protects result histories and exports CSV results. Shared-CIW protection separately inspects dialogs and blocks uncertain operations rather than dismissing user dialogs automatically. These are conventional orchestration and reliability features, not new AI stages. [Monte Carlo API](#source-monte-carlo) · [Dialog guard](#source-activity-refresh)

### Simulator boundary

Standalone Spectre execution and PSF parsing are also provided. Spectre and the SKILL bridge can operate independently; neither includes the commercial simulator or a PDK. Optional optimizer guides and external workflows add higher-level procedures, whose design results must be assessed separately. [Setup and workflow boundaries](#source-review)

### Scope classification

The bundled netlist skill explicitly makes model semantic reasoning the primary cleanup engine: it identifies circuit boundaries, separates DUT/testbench/run decks and selects meaningful node names, with scripts checking the result. These model-driven circuit-understanding and editing operations support AI Design. [Released netlist skill](#source-runtime-netlist) · [Skill installation](#source-review)

Generic CLI/Python/MCP access alone would not qualify. Maestro/Spectre execution, PSF parsing and layout primitives remain conventional Simulation and Layout. The tag describes the bundled model-hosted workflow, not inference inside every bridge call. [Interfaces](#source-review)
