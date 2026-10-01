---
name: "vibe-analog"
summary: "Agent-native schematic and SPICE workbench for natural-language circuit design."
description: "Turns natural-language circuit requirements into editable schematics and SPICE artifacts. Its agent authors verification plans, analysis directives and measurements before ngspice execution; analog-IC mode adds PDK/model binding and device-parameter audits, while PCB layout, IC mask layout and production signoff remain outside the core workflow."
scope:
  design:
    ai: true
  simulation:
    ai: true
access: "Public source workbench and portable agent skill. Requires Node.js/Python and ngspice for simulation; analog-IC use requires user-supplied PDK/model files, while Claude Code, Codex or another compatible coding agent supplies the model-driven workflow."
addedAt: "2026-09-26"
reviewedAt: "2026-10-01"
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
  - id: "verification-plan"
    title: "Agent-authored analysis and measurement plan"
    url: "https://github.com/DeconBear/vibe-analog/blob/d97ca469ca9dab71a7394d7ede848d3d53e2b693/skills/circuit-design-ngspice/references/jobs-workflow.md"
  - id: "desktop-agent"
    title: "Runtime agent prompt and simulation-directive workflow"
    url: "https://github.com/DeconBear/vibe-analog/blob/d97ca469ca9dab71a7394d7ede848d3d53e2b693/electron/agent/desktopAgentService.ts"
---

### Project workflow

The desktop canvas and portable skill expose revisioned schematic edits, ERC, compilation and simulation as an agent-facing loop. The analog-IC path adds model binding and explicit MOS W/L/M/NF checks before ngspice execution and schematic handoff. [Skill contract](#source-skill)

### Boundary

The project explicitly excludes PCB layout, IC mask layout and production signoff from this workflow. KiCad, Virtuoso and other handoff packages preserve schematic connectivity but do not establish completed physical implementation. [Reviewed source](#source-readme)

### Scope classification

A coding agent creates and revises topology and parameters, establishing AI Design. The packaged workflow also makes the agent author a verification plan with analysis types, measurement directives and expected ranges, while the built-in agent writes simulation directives into stimulus notebooks. Those evaluation-planning operations establish AI Simulation. [Verification plan](#source-verification-plan) · [Runtime agent](#source-desktop-agent)

Ngspice and deterministic extraction still produce the numerical evidence. Schematic symbol placement and rendering do not establish physical IC Layout. [Scope boundary](#source-skill)
