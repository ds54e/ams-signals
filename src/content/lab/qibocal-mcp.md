---
name: "Qibocal MCP"
aliases: ["qibocal-mcp", "qibocal-agent", "AI calibration agent"]
description: "Model-directed calibration agent and MCP servers for Qibocal, supporting protocol discovery, interactive or autonomous selection and execution, fitted-result inspection and plot analysis. Applying calibration updates is separate from measurement; the project also provides Git-backed platform version management and remote execution through SSH and SLURM."
scope:
  control: { ai: true }
  acquisition: { ai: true }
  analysis: { ai: true }
  test: { ai: true }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Opus is co-credited for implementing model-oriented compact report images, textual plot metadata and batched image rendering. The image rendering code and execution integration remain in the reviewed head."
  sources: [activity, images, runtime]
  reviewedAt: "2026-11-25"
access: "Apache-2.0; requires a compatible Qibocal runtime and model access for agent operation. Live operation requires appropriate hardware limits, operator-approved budgets and a compatible platform; the project is not a hardware safety layer."
addedAt: "2026-11-25"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical MCP and calibration agent implementation"
    url: "https://github.com/qiboteam/qibocal-mcp"
    purpose: code
  - id: activity
    title: "November 5 AI-credited report image and batched rendering implementation"
    url: "https://github.com/qiboteam/qibocal-mcp/commit/245c656c10d829035d5b8750bf56475aa82181fe"
  - id: version-integration
    title: "October 23 platform versioning integration"
    url: "https://github.com/qiboteam/qibocal-mcp/commit/2b674b303cf585e4c84ab538656adff12d6ebaf8"
  - id: runtime
    title: "Retained acquisition snapshots, fitted-result application and state handling"
    url: "https://github.com/qiboteam/qibocal-mcp/blob/8efde09e88d72d956412cd5b6bd7c5d652033169/packages/mcp/src/qibocal_mcp/runtime.py"
  - id: versions
    title: "Retained Git-backed calibration version operations"
    url: "https://github.com/qiboteam/qibocal-mcp/blob/8efde09e88d72d956412cd5b6bd7c5d652033169/packages/mcp/src/qibocal_mcp/versions.py"
  - id: agent
    title: "Retained model-directed agent orchestration"
    url: "https://github.com/qiboteam/qibocal-mcp/blob/8efde09e88d72d956412cd5b6bd7c5d652033169/packages/agent/src/qibocal_agent/agent.py"
  - id: images
    title: "Retained compact plot rendering and textual metadata"
    url: "https://github.com/qiboteam/qibocal-mcp/blob/8efde09e88d72d956412cd5b6bd7c5d652033169/packages/mcp/src/qibocal_mcp/images.py"
  - id: instructions
    title: "Calibration instructions, inspection and approval boundaries"
    url: "https://github.com/qiboteam/qibocal-mcp/blob/8efde09e88d72d956412cd5b6bd7c5d652033169/packages/mcp/src/qibocal_mcp/calibration.py"
  - id: related-protocol
    title: "Underlying numerical spectroscopy protocol"
    url: "https://github.com/qiboteam/qibocal/blob/06764d4c1d097f35832fc23be4d819b933441570/src/qibocal/protocols/resonator_spectroscopies/resonator_spectroscopy.py"
  - id: citation-update
    title: "November 26 citation metadata change"
    url: "https://github.com/qiboteam/qibocal-mcp/commit/74148de92c8745c593532173db54f1a74a67f736"
---

## Scope and limits

The agent selects calibration protocols and parameters using model reasoning, runs acquisition and fitting through MCP tools, and inspects numerical and visual outputs before requesting application of fitted results. Execution records the platform snapshot used for a run. Applying results is a separate operation with a once-per-run update-attempt guard, while saving an accepted platform state is another operation backed by Git commits and refs. This is a separate workflow from the underlying Qibocal numerical protocols, not a duplicate measurement driver. [Agent](#source-agent) · [Runtime](#source-runtime) · [Versions](#source-versions).

The project explicitly describes itself as a single-platform draft rather than a hardware safety layer. Model instructions to respect limits or obtain approval are not independent instrument interlocks. Temporary software-state isolation or rejection of fitted updates does not undo physical stimulus, and a failed update is not established to be transactionally reversible. The inspected workflow requires operator-defined limits and suitable physical protection. [Calibration instructions](#source-instructions).

## Reviewed maintenance and provenance

October 23 integrates platform listing, differences, saving and checkout. November 5 adds compact model-facing images with textual axes and trace metadata and exports multiple images in one rendering call; the original report figures remain available. This is substantive follow-through beyond the initial October release. The latter commit explicitly credits Claude Opus and the implementation remains at the reviewed head. November 24 adds license declarations rather than advancing meaningful implementation activity. No agent, model, instrument or upstream suite was independently executed. [Version integration](#source-version-integration) · [Image change](#source-activity) · [Retained image code](#source-images).

## November 28, 2026 implementation review

Session creation can use the accepted state, initial baseline, saved snapshot or a completed run's execution platform with its fitted results applied. The last path applies results to the run's original platform checkpoint rather than automatically merging with later calibration edits. This is state management around model-selected protocols and does not make the underlying numerical spectroscopy implementation a second AI-developed measurement algorithm. The November 26 default-branch change adds citation metadata only; it does not advance the saved implementation checkpoint. [Runtime](#source-runtime) · [Underlying protocol](#source-related-protocol) · [Citation update](#source-citation-update).
