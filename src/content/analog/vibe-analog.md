---
name: "vibe-analog"
summary: "Agent-native schematic and SPICE workbench for natural-language circuit design."
description: "Turns natural-language circuit requirements into editable schematic and SPICE project artifacts, runs ngspice, and renders or exports schematics. Its analog-IC mode adds PDK/model binding and device-parameter audits; PCB layout, IC mask layout and production signoff remain outside the core design workflow."
scope:
  design:
    ai: true
  simulation:
    ai: false
access: "Public source workbench and portable agent skill. Requires Node.js/Python and ngspice for simulation; analog-IC use requires user-supplied PDK/model files, while Claude Code, Codex or another compatible coding agent supplies the model-driven workflow."
addedAt: "2026-09-26"
reviewedAt: "2026-09-26"
sources:
  - id: "code"
    title: "Canonical vibe-analog repository"
    url: "https://github.com/DeconBear/vibe-analog"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/DeconBear/vibe-analog/blob/d97ca469ca9dab71a7394d7ede848d3d53e2b693/README.md"
  - id: "skill"
    title: "Portable circuit-design skill"
    url: "https://github.com/DeconBear/vibe-analog/blob/d97ca469ca9dab71a7394d7ede848d3d53e2b693/skills/circuit-design-ngspice/SKILL.md"
  - id: "activity"
    title: "ERC interaction correctness fix"
    url: "https://github.com/DeconBear/vibe-analog/commit/7d46afe213a15dbe125ad5fedbd52942d55053bf"
---

### Project workflow

The desktop canvas and portable skill expose revisioned schematic edits, ERC, compilation and simulation as an agent-facing loop. The analog-IC path adds model binding and explicit MOS W/L/M/NF checks before ngspice execution and schematic handoff. [Skill contract](#source-skill)

### Boundary

The project explicitly excludes PCB layout, IC mask layout and production signoff from this workflow. KiCad, Virtuoso and other handoff packages preserve schematic connectivity but do not establish completed physical implementation. [Reviewed source](#source-readme)

### Scope classification

A coding agent creates and revises circuit topology and parameters, establishing AI Design. Ngspice performs the numerical simulation and the project scripts produce deterministic ERC and run evidence, so Simulation is recorded without an AI prefix. [Skill contract](#source-skill)
