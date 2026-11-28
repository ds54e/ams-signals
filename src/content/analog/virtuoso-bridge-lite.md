---
name: "virtuoso-bridge-lite"
aliases: ["VirtuosoBridgeLite","Virtuoso-Bridge"]
summary: "Exposes Python and CLI primitives for Virtuoso schematic, layout, Maestro, and Spectre operations."
description: "Python, CLI and optional MCP bridge for Virtuoso schematic/layout editing, Maestro engine and Spectre X preset configuration, asynchronous simulation jobs, standalone Spectre execution and PSF parsing. A bundled model-driven netlist skill repairs circuit/testbench structure; licensed EDA installations and PDKs remain user-supplied."
scope:
  design:
    ai: true
  simulation:
    ai: false
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude-credited development added the doctor diagnostic subsystem and CLI integration. Its retained implementation analyzes connection identity, configuration, session blockers, host permissions and EDA availability, with structured findings and guarded read-only checks."
  sources: ["development-doctor-implementation", "development-doctor-retained"]
  reviewedAt: "2026-10-18"
targets: "Schematics, layout, Maestro, Spectre, PSF, and remote sessions"
access: "Bridge, Python APIs, CLI, and operating guides are public. Users supply licensed Virtuoso or Spectre installations and the required PDK and circuit assets."
addedAt: "2026-09-05"
reviewedAt: "2026-11-28"
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
  - id: "development-doctor-implementation"
    title: "Claude-attributed diagnostic subsystem and CLI integration"
    url: https://github.com/Arcadia-1/virtuoso-bridge-lite/commit/fe814c2f4049a38bfd60e3120d387fb50d287795
  - id: "development-doctor-retained"
    title: "Retained setup diagnosis implementation"
    url: https://github.com/Arcadia-1/virtuoso-bridge-lite/blob/ecaf5a5c5499051ea4c4796a480e278a3e9c0da8/src/virtuoso_bridge/doctor.py
  - id: mcp-adapter
    title: Optional MCP adapter over existing bridge APIs
    url: https://github.com/Arcadia-1/virtuoso-bridge-lite/commit/b7fdc810cff4a1d7bb1a1a0e04ad50e2366f8765
  - id: psf-fast-parser
    title: Optional PSF ASCII parser and RMS regressions
    url: https://github.com/Arcadia-1/virtuoso-bridge-lite/commit/25a6d14bc65d4c70fb2c988dd1f59ea3c7410529
  - id: website
    title: Official project website and documentation
    url: https://virtuoso-bridge.tokenzhang.com/
    purpose: official
  - id: review-20261103-engine
    title: "Maestro Spectre engines and explicit X presets"
    url: https://github.com/Arcadia-1/virtuoso-bridge-lite/commit/6bde1430c4b905e5d6fb5436b1dca49e69e45a94
  - id: review-20261103-bbox
    title: "Diagnose and safely recompute cellview bounds"
    url: https://github.com/Arcadia-1/virtuoso-bridge-lite/commit/e21635ccad3bb122c08bad0fe099858dbfd71eaf
  - id: review-20261103-groups
    title: "Checked OA groups and figGroups"
    url: https://github.com/Arcadia-1/virtuoso-bridge-lite/commit/8842058f712e1270aa96f4524463007f2abbf8a3
  - id: review-20261107-implementation
    title: "Bridge reliability corrections and unit regressions"
    url: https://github.com/Arcadia-1/virtuoso-bridge-lite/commit/e2a69fca2fc8295a35674451a1e0aec2d52b308f
  - id: review-20261124-schematic
    title: "Structured schematic reading with connectivity and parameter evidence"
    url: https://github.com/Arcadia-1/virtuoso-bridge-lite/blob/672b451416b1ef3cc560db4196365075e94c8d4e/src/virtuoso_bridge/virtuoso/schematic/reader.py
  - id: review-20261124-maestro
    title: "Typed Maestro operations for setup, jobs, histories and results"
    url: https://github.com/Arcadia-1/virtuoso-bridge-lite/blob/672b451416b1ef3cc560db4196365075e94c8d4e/src/virtuoso_bridge/virtuoso/maestro/ops.py
  - id: related-eda-agent
    title: "Related EDA Agent: retrieval-grounded Python generation over this bridge"
    url: https://github.com/HrishikeshGawasIIITH/EDA_Agent/blob/50a1b67a9caa3ff74cf1f5572226498523ce73a1/eda_agent/agent.py
  - id: related-eda-agent-benchmark
    title: "Related EDA Agent grounding and operation-round-trip benchmark"
    url: https://github.com/HrishikeshGawasIIITH/EDA_Agent/blob/50a1b67a9caa3ff74cf1f5572226498523ce73a1/tools/benchmark_roundtrips.py
  - id: related-analog-mcp
    title: "Separate Analog_MCP command transport for Virtuoso and Eldo"
    url: https://github.com/SiliCAD/Analog_MCP/blob/606ac2eba83233d8834ce9fa8eb889c5145c7611/src/server.py
  - id: related-analog-mcp-eldo
    title: "Analog_MCP Eldo batch and interactive execution client"
    url: https://github.com/SiliCAD/Analog_MCP/blob/606ac2eba83233d8834ce9fa8eb889c5145c7611/src/clients/eldo_client.py
  - id: related-analog-agents
    title: "Separate analog-agents workflow and skills"
    url: "https://github.com/Arcadia-1/analog-agents"
  - id: related-analog-agents-submodules
    title: "Declared bridge and ADCToolbox dependencies"
    url: "https://github.com/Arcadia-1/analog-agents/blob/4d6bd218ceff60624d7ee62887787aa83daecdb4/.gitmodules"
  - id: related-analog-agents-pipeline
    title: "Role-separated design and verification workflow"
    url: "https://github.com/Arcadia-1/analog-agents/blob/4d6bd218ceff60624d7ee62887787aa83daecdb4/skills/analog-pipeline/SKILL.md"
  - id: related-analog-agents-crawl
    title: "Independent Calibre and Spectre parasitic-netlist analysis CLI"
    url: "https://github.com/Arcadia-1/analog-agents/blob/4d6bd218ceff60624d7ee62887787aa83daecdb4/skills/analog-netlist-crawl/scripts/scan.py"
  - id: related-analog-agents-resistance
    title: "Effective-resistance numerical kernel"
    url: "https://github.com/Arcadia-1/analog-agents/blob/4d6bd218ceff60624d7ee62887787aa83daecdb4/skills/analog-netlist-crawl/scripts/kernels/r_network.py"
  - id: related-analog-agents-maintenance
    title: "May 2 model-order-reduction implementation change"
    url: "https://github.com/Arcadia-1/analog-agents/commit/771d27d3b0b939b916f819ae375469cda892eb24"
  - id: review-20261128-activity
    title: "November 26 remote transport, path and transfer reliability fixes"
    url: "https://github.com/Arcadia-1/virtuoso-bridge-lite/commit/2cc3d066b27455258bd0517f4e24e4fc9f710d8d"
  - id: review-20261128-transport
    title: "Retained persistent SSH transport"
    url: "https://github.com/Arcadia-1/virtuoso-bridge-lite/blob/2cc3d066b27455258bd0517f4e24e4fc9f710d8d/src/virtuoso_bridge/transport/paramiko_backend.py"
  - id: review-20261128-maestro
    title: "Maestro lifecycle and result-handling fixes"
    url: "https://github.com/Arcadia-1/virtuoso-bridge-lite/commit/84b11a192298a45880a511f12f01eaf4ba979551"
  - id: related-netlist-crawler
    title: "Independent continuation of the parasitic netlist crawler"
    url: "https://github.com/Arcadia-1/netlist-crawler/blob/73dfdd49a51b86dd1822af91811f756ded05d8e2/README.md"
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

The October 20 optional MCP adapter exposes existing bridge operations to MCP clients; it does not add model-driven simulation or replace licensed Virtuoso, Spectre or a PDK. The separately opt-in PSF ASCII parser adds faster result reading with RMS regressions, without changing the simulation engine. The persistent job contract still avoids resending a timed-out request and recovers through receipts and history rather than assuming a second execution. [MCP adapter](#source-mcp-adapter) · [PSF parser](#source-psf-fast-parser) · [Job contract](#source-review-20261011-2)

### Development provenance

The Claude-attributed doctor feature implements a user-facing diagnostic subsystem with shared observation state, guarded read-only queries, connection and ownership checks, session-blocker handling and structured findings. Its retained diagnosis logic is substantial implementation beyond setup instructions or thin command forwarding; attribution does not extend to separate Maestro features or the whole bridge. [Attributed implementation](#source-development-doctor-implementation) · [Retained diagnosis](#source-development-doctor-retained).

### Selection and current source review

The November 2 integrations add checked OA group/figGroup builders, bounding-box diagnosis/recomputation and Maestro Spectre engine/X-preset configuration, each with unit and opt-in live tests. Explicit engine/preset validation avoids inferring a valid preset from a generic simulator name. The later traffic-statistics commits count only in raw activity; the meaningful checkpoint is the engine implementation. These deterministic operations retain ordinary Simulation/Layout and the separately evidenced AI Design netlist skill. They are development changes beyond the reviewed v1.0.0 tag; no licensed live EDA tests were run for the catalog. [Engine implementation and tests](#source-review-20261103-engine) · [Bounding-box operations](#source-review-20261103-bbox) · [Checked groups](#source-review-20261103-groups).

### November implementation review

Recent reliability changes avoid bridge-generated save dialogs, repaint edited views and preserve process-wide netlister state. Connected-PID inspection uses the authenticated handshake without sending SKILL. Unit tests were inspected; licensed live EDA behavior was not independently reproduced. [Implementation and regression evidence](#source-review-20261107-implementation).

### Catalog consolidation and related integrations

The bridge remains a separate listing because it provides reusable, structured circuit/database operations, Maestro setup and result handling, and persistent session/job behavior. These interfaces give applications more than arbitrary remote command transport. The current schematic reader and Maestro facade retain those operations. [Structured schematic API](#source-review-20261124-schematic) · [Maestro operations](#source-review-20261124-maestro).

EDA Agent is a related application over this bridge: it retrieves API/design context, generates Python, executes it and retries errors. Its round-trip benchmark measures grounding and operator execution. It is recorded here as a companion instead of a separate catalog entry; its model-driven behavior is not a capability or provenance claim for the bridge. [EDA Agent implementation](#source-related-eda-agent) · [Operator benchmark](#source-related-eda-agent-benchmark).

Analog_MCP is a separate alternative integration, not a component of this repository. It exposes Virtuoso SKILL/shell transport, Eldo batch/interactive execution and waveform plotting. Those implemented adapter operations remain discoverable as related sources, while their additional catalog value does not justify a separate entry in this review. This consolidation does not add Eldo or Calibre support, runtime AI, development attribution or repository activity to virtuoso-bridge-lite. [Analog_MCP interfaces](#source-related-analog-mcp) · [Eldo execution](#source-related-analog-mcp-eldo).

analog-agents is a separate role-oriented analog design and verification skill framework from the same organization, with this bridge and ADCToolbox declared as submodules. Its earlier parasitic-netlist crawl CLI reads Calibre and Spectre extractions, ranks coupling, and computes resistive paths. The separately listed Netlist Crawler explicitly extends that implementation; the bridge remains the EDA session and execution layer, not a second owner of the crawler operation. [Independent continuation](#source-related-netlist-crawler). The May 2, 2026 model-order-reduction simplification is its last reviewed substantive change; the July 2 integration adds an installation link, not further numerical or agent implementation. Under the stricter retention review, consolidate its discovery reference here instead of keeping a separate catalog row. Its workflow, AI stages, attribution and repository activity are not inherited by the bridge. [Related project](#source-related-analog-agents) · [Dependencies](#source-related-analog-agents-submodules) · [Pipeline](#source-related-analog-agents-pipeline) · [Analysis CLI](#source-related-analog-agents-crawl) · [Resistance kernel](#source-related-analog-agents-resistance) · [Maintenance](#source-related-analog-agents-maintenance).

### November 28, 2026 source review

The November 26 integrations harden remote Paramiko I/O, scratch path handling and downloads, including changes to the transport, transfer and wrapper regression suites. A separate same-day integration addresses Maestro lifecycle, history and result-handling edge cases. These are reliability improvements to existing operations; the functional Scope and development attribution remain unchanged. Source changes were inspected without executing licensed EDA tests. [Transport integration](#source-review-20261128-activity) · [Retained transport](#source-review-20261128-transport) · [Maestro integration](#source-review-20261128-maestro).
