---
name: "virtuoso-bridge-lite"
aliases: ["VirtuosoBridgeLite","Virtuoso-Bridge"]
summary: "Exposes Python and CLI primitives for Virtuoso schematic, layout, Maestro, and Spectre operations."
description: "Python and CLI bridge for Virtuoso schematic/layout editing, Maestro configuration and persistent asynchronous simulation jobs, plus standalone Spectre execution and PSF parsing. A bundled model-driven netlist skill separates circuit/testbench decks and repairs semantic structure; users supply the licensed EDA installation and PDK."
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
reviewedAt: "2026-10-11"
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
    title: "Previously reviewed meaningful implementation update"
    url: "https://github.com/Arcadia-1/virtuoso-bridge-lite/commit/cf6344cff410bcbd32fd6fe595a53d1fdbeeb7c3"
  - id: "monte-carlo"
    title: "Maestro Monte Carlo configuration, execution and result export"
    url: "https://github.com/Arcadia-1/virtuoso-bridge-lite/commit/469855afb26eb5c3668fcf9ca083e364fa895a04"
  - id: "runtime-netlist"
    title: "Bundled model-driven netlist interpretation and cleanup skill"
    url: "https://github.com/Arcadia-1/virtuoso-bridge-lite/blob/cf6344cff410bcbd32fd6fe595a53d1fdbeeb7c3/skills/netlist/SKILL.md"
  - id: "activity-current"
    title: "Optional shell environments and profile auditing"
    url: "https://github.com/Arcadia-1/virtuoso-bridge-lite/commit/d758783b0ebe73259e2a1c5ee31739dcd8fc2821"
  - id: "activity-tip"
    title: "Package default CDF filters and check built distributions"
    url: "https://github.com/Arcadia-1/virtuoso-bridge-lite/commit/aab1180fc1399a00d18867d56594fa1fdb457a6c"
  - id: "review-20261011-1"
    title: "Job implementation and tests"
    url: "https://github.com/Arcadia-1/virtuoso-bridge-lite/commit/ace996733ccca94a8554986a4072113cde279d98"
  - id: "review-20261011-2"
    title: "Maestro operating contract"
    url: "https://github.com/Arcadia-1/virtuoso-bridge-lite/blob/378f0b640451d82bf6bccf8ece687aa27b1dcafe/skills/virtuoso/references/maestro-python-api.md"
  - id: "activity-reviewed-20261011"
    title: "Reviewed substantive first-parent implementation checkpoint"
    url: "https://github.com/Arcadia-1/virtuoso-bridge-lite/commit/378f0b640451d82bf6bccf8ece687aa27b1dcafe"
---
### Implemented interfaces

Interfaces cover SKILL expressions and files, explicit-connectivity schematic planning, layout generation, and Maestro setup. Local and SSH-based operation support multiple connection profiles. [Interfaces](#source-review)

The September 30 API configures process/mismatch variation, seeds, sampling and DUT filters, executes the selected Maestro session, protects result histories and exports CSV results. Shared-CIW protection separately inspects dialogs and blocks uncertain operations rather than dismissing user dialogs automatically. These are conventional orchestration and reliability features, not new AI stages. [Monte Carlo API](#source-monte-carlo) · [Dialog guard](#source-activity-refresh)

### Simulator boundary

Standalone Spectre execution and PSF parsing are also provided. Spectre and the SKILL bridge can operate independently; neither includes the commercial simulator or a PDK. Optional optimizer guides and external workflows add higher-level procedures, whose design results must be assessed separately. [Setup and workflow boundaries](#source-review)

### Scope classification

The bundled netlist skill explicitly makes model semantic reasoning the primary cleanup engine: it identifies circuit boundaries, separates DUT/testbench/run decks and selects meaningful node names, with scripts checking the result. These model-driven circuit-understanding and editing operations support AI Design. [Released netlist skill](#source-runtime-netlist) · [Skill installation](#source-review)

Generic CLI/Python/MCP access alone would not qualify. Maestro/Spectre execution, PSF parsing and layout primitives remain conventional Simulation and Layout. The tag describes the bundled model-hosted workflow, not inference inside every bridge call. [Interfaces](#source-review)

### Current implementation and operating boundaries

MaestroJobManager persists job identity and request/completion evidence. A later Python process can reattach and observe completion markers without sending additional SKILL to the CIW. The patch includes recovery logic and tests; a separate native-grid/power-rail import fix improves schematic interoperability. [Job implementation and tests](#source-review-20261011-1) · [Maestro operating contract](#source-review-20261011-2) · [Reviewed substantive first-parent implementation checkpoint](#source-activity-reviewed-20261011)

The licensed Virtuoso process and Maestro GUI session are still required for starting the run. Client survival/reconnection is not evidence that a run survives loss of the EDA process. This API is deterministic orchestration and does not establish AI Simulation.
