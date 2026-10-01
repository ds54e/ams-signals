---
name: Vibe-IC
summary: Claude Code analog-design skills and deterministic EDA gates within a broader IC workflow.
description: Combines Claude Code skills with EDA tools for analog topology selection, transistor sizing, testbench generation, PVT simulation and physical implementation. Model-guided layout and verification workflows use Magic, Netgen and ngspice; the broader digital/AMS framework requires a configured EDA container and PDK, and its published gates do not establish general autonomous design success.
scope:
  design:
    ai: true
  simulation:
    ai: true
  layout:
    ai: true
access: Public Apache-2.0 source. Requires Claude Code, the configured EDA container and appropriate PDK/model installation; available operations and reproducibility depend on that toolchain.
addedAt: '2026-10-01'
reviewedAt: '2026-10-01'
sources:
- id: code
  title: Canonical Vibe-IC repository
  url: https://github.com/vibeic/vibe-ic
  purpose: code
- id: readme
  title: Project structure and EDA installation requirements
  url: https://github.com/vibeic/vibe-ic/blob/972a77b8d8fe70231d2938a4a23a1ce6fefc3c55/README.md
- id: sizing
  title: Model-guided analog sizing
  url: https://github.com/vibeic/vibe-ic/blob/972a77b8d8fe70231d2938a4a23a1ce6fefc3c55/vibe-ic-marketplace/plugins/vibe-ic/skills/analog-sizing/SKILL.md
- id: netlist
  title: Agent-selected stimulus and testbench generation
  url: https://github.com/vibeic/vibe-ic/blob/972a77b8d8fe70231d2938a4a23a1ce6fefc3c55/vibe-ic-marketplace/plugins/vibe-ic/skills/analog-netlist-gen/SKILL.md
- id: layout
  title: Model-authored layout and matching workflow
  url: https://github.com/vibeic/vibe-ic/blob/972a77b8d8fe70231d2938a4a23a1ce6fefc3c55/vibe-ic-marketplace/plugins/vibe-ic/skills/analog-layout/SKILL.md
- id: layout-implementation
  title: Implemented PDK-aware analog layout emitter
  url: https://github.com/vibeic/vibe-ic/blob/972a77b8d8fe70231d2938a4a23a1ce6fefc3c55/vibe-ic-marketplace/plugins/vibe-ic/programs/analog_a5_layout_emit.py
- id: extraction
  title: Post-layout extraction and resimulation workflow
  url: https://github.com/vibeic/vibe-ic/blob/972a77b8d8fe70231d2938a4a23a1ce6fefc3c55/vibe-ic-marketplace/plugins/vibe-ic/skills/analog-extraction-resim/SKILL.md
- id: activity
  title: September 29 analog provenance and stale-layout refusal integration
  url: https://github.com/vibeic/vibe-ic/commit/2251fa186b8d35e2576b48ecd5468a0924f01a71
- id: guard-ring
  title: Implemented guard-ring and bulk-tap correctness
  url: https://github.com/vibeic/vibe-ic/commit/951fdf0e2d58ad520b87d346fa01ff0fe7e9e138
---

### Analog scope

This entry covers the analog path in a larger digital/AMS plugin, not an independent claim that its complete IC flow has been reproduced. The sizing skill assigns topology-dependent current budgets and device choices to the model, establishing AI Design. The netlist skill separately makes the agent choose stimulus class and load network for the circuit function, while measurement generation and SPICE execution are deterministic; that evaluation-planning operation establishes AI Simulation. [Sizing](#source-sizing) · [Testbench generation](#source-netlist)

The layout skill makes the agent choose matching structures, placement and routing and connect those decisions to implemented Magic layout operations and DRC/LVS workflows, establishing AI Layout. It explicitly distinguishes a scaffold-only MCP layout operation from real authored geometry. The reviewed emitter implements PDK-derived guard-ring layers and bulk-tap search, not merely a layout plan. [Layout workflow](#source-layout) · [Emitter](#source-layout-implementation) · [Guard-ring implementation change](#source-guard-ring)

### Boundaries

A green topology-only LVS gate does not prove matched physical placement. The layout workflow requires explicit matching disclosure and distinguishes unmatched-device recipes from common-centroid or interdigitated placement. Extraction may yield capacitance-only output even when an RC recipe is requested; the workflow requires that limitation to be disclosed. Docker, EDA binaries and PDK setup remain substantial prerequisites. No circuit or benchmark run was reproduced for this review. [Layout limits](#source-layout) · [Extraction limits](#source-extraction) · [Setup](#source-readme)

The September 29 first-parent integration adds layout-netlist identity checks, atomic refusal of stale layouts before LVS, and post-layout resimulation provenance. This establishes recent analog implementation activity; the repository-wide latest date also includes digital and infrastructure work. [Meaningful activity](#source-activity)

### Development provenance

Claude Code runtime skills and an AI-native product description do not establish who implemented the software. No development badge is inferred from the model-facing interface or overall repository activity. [Project description](#source-readme)
