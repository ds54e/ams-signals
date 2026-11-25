---
name: "vibe-analog"
summary: "Agent-native schematic and SPICE workbench for natural-language circuit design."
description: "Turns natural-language circuit requirements into editable schematics and SPICE artifacts. Its agent authors verification plans, analysis directives and measurements before ngspice execution; analog-IC mode adds PDK/model binding and device-parameter audits, while PCB layout, IC mask layout and production signoff remain outside the core workflow."
scope:
  design:
    ai: true
  simulation:
    ai: true
  aiDevelopment: assisted
developmentEvidence:
  summary: "Cursor-credited implementation added project-specific component parameter forms, PDK installation/registration binding and schematic import/export integration. The current desktop retains the Analog IC parameter-form implementation."
  sources: ["development-audit-implementation", "development-audit-retained"]
  reviewedAt: "2026-10-18"
access: "Public source workbench and portable agent skill. Requires Node.js/Python and ngspice for simulation; analog-IC use requires user-supplied PDK/model files, while Claude Code, Codex or another compatible coding agent supplies the model-driven workflow."
addedAt: "2026-09-26"
reviewedAt: "2026-11-25"
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
  - id: "development-audit-implementation"
    title: "Reviewed AI-attributed implementation"
    url: "https://github.com/DeconBear/vibe-analog/commit/642f308377078106aec91e8c0c5802bf64751c15"
  - id: "development-audit-retained"
    title: "Retained implementation at the reviewed repository head"
    url: "https://github.com/DeconBear/vibe-analog/blob/d97ca469ca9dab71a7394d7ede848d3d53e2b693/renderer/src/components/canvas/componentParams/AnalogIcParamForm.tsx"
  - id: pdk-checkout-fix
    title: "October 13 integration of public PDK checkout compatibility fix"
    url: "https://github.com/DeconBear/vibe-analog/commit/14210e73f1974db3e7adee4155e3bb36c64354c5"
  - id: pdk-checkout-regression
    title: "Retained offline regression for recursive locked PDK checkout"
    url: "https://github.com/DeconBear/vibe-analog/blob/14210e73f1974db3e7adee4155e3bb36c64354c5/scripts/pdk-checkout-regression.py"
---

### Project workflow

The desktop canvas and portable skill expose revisioned schematic edits, ERC, compilation and simulation as an agent-facing loop. The analog-IC path adds model binding and explicit MOS W/L/M/NF checks before ngspice execution and schematic handoff. [Skill contract](#source-skill)

### Boundary

The project explicitly excludes PCB layout, IC mask layout and production signoff from this workflow. KiCad, Virtuoso and other handoff packages preserve schematic connectivity but do not establish completed physical implementation. [Reviewed source](#source-readme)

### Scope classification

A coding agent creates and revises topology and parameters, establishing AI Design. The packaged workflow also makes the agent author a verification plan with analysis types, measurement directives and expected ranges, while the built-in agent writes simulation directives into stimulus notebooks. Those evaluation-planning operations establish AI Simulation. [Verification plan](#source-verification-plan) · [Runtime agent](#source-desktop-agent)

Ngspice and deterministic extraction still produce the numerical evidence. Schematic symbol placement and rendering do not establish physical IC Layout. [Scope boundary](#source-skill)

### Development provenance

The Cursor-credited desktop change implements Electron IPC, project/model binding, type-specific forms and schematic interchange controls across the desktop. The development label records this executable contribution, independently of the coding agents that operate the workbench at runtime. [Implementation](#source-development-audit-implementation) · [Retained code](#source-development-audit-retained)

### Continued maintenance

October 13 integrates a correction to the nightly qualification workflow: public GitHub SSH submodule URLs in historical PDK revisions are rewritten to HTTPS only within the recursive Git invocation. The offline regression executes the checkout step against mocked inputs and checks URL resolution in real Git, locked source revision preservation and the absence of persistent rewrite settings. This is concrete PDK-access and verification maintenance beyond the September ERC correction, not support for additional foundry processes or completed electrical qualification. October 13 supersedes September 1 within the saved capture. No PDK download, live agent or EDA run was reproduced. [Integrated correction](#source-pdk-checkout-fix) · [Retained regression](#source-pdk-checkout-regression).
