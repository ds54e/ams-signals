---
name: Agentic AI Analog IC Auto-Designer
summary: Released Claude Code agents for analog sizing, layout repair and pre/post-layout verification.
description: Provides Claude Code agents for transistor sizing, layout construction and repair, and pre/post-layout verification using ngspice, Magic and Netgen. Four of six planned roles are released; the newer Miller OTA mechanism example explicitly does not demonstrate design convergence, and GF180 support remains unverified alongside the SKY130 default.
scope:
  design:
    ai: true
  simulation:
    ai: true
  layout:
    ai: true
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude-credited implementation added routing optimization, shared design-constraint handling and device-shaping algorithms. The retained shaping code preserves tie-group geometry and total device width within declared bounds."
  sources: ["development-audit-implementation", "development-audit-extension", "development-audit-retained"]
  reviewedAt: "2026-10-12"
access: Public MIT source and Claude Code agent/skill definitions. Requires Claude Code, Magic, Netgen, ngspice, Python layout dependencies and an installed PDK; SKY130 is the documented default and GF180 is unverified.
addedAt: '2026-10-01'
reviewedAt: '2026-10-01'
sources:
- id: code
  title: Canonical Agentic AI Analog IC Auto-Designer repository
  url: https://github.com/SunCherry/agentic-AI_analog_IC_auto-designer
  purpose: code
- id: readme
  title: Released roles, prerequisites and PDK limitations
  url: https://github.com/SunCherry/agentic-AI_analog_IC_auto-designer/blob/bfc0fd5e006c05d13472080fe9a3254eba3321e7/README.md
- id: schematic-agent
  title: Sizing decisions and measurement-plan audit
  url: https://github.com/SunCherry/agentic-AI_analog_IC_auto-designer/blob/bfc0fd5e006c05d13472080fe9a3254eba3321e7/.claude/agents/schematic-agent.md
- id: sizing-runner
  title: Implemented ngspice sizing iteration runner
  url: https://github.com/SunCherry/agentic-AI_analog_IC_auto-designer/blob/bfc0fd5e006c05d13472080fe9a3254eba3321e7/.claude/skills/schematic-sizing/script/run_sizing_iteration.py
- id: layout-agent
  title: Model-controlled physical placement and routing
  url: https://github.com/SunCherry/agentic-AI_analog_IC_auto-designer/blob/bfc0fd5e006c05d13472080fe9a3254eba3321e7/.claude/agents/layout-agent.md
- id: verify-agent
  title: Gated extraction and pre/post-layout measurement
  url: https://github.com/SunCherry/agentic-AI_analog_IC_auto-designer/blob/bfc0fd5e006c05d13472080fe9a3254eba3321e7/.claude/agents/verify-agent.md
- id: example-state
  title: Miller OTA mechanism demonstration limitations
  url: https://github.com/SunCherry/agentic-AI_analog_IC_auto-designer/blob/bfc0fd5e006c05d13472080fe9a3254eba3321e7/example/test_miller_ota_0908/README_STATE.md
- id: activity
  title: Reviewed substantive implementation commit
  url: https://github.com/SunCherry/agentic-AI_analog_IC_auto-designer/commit/54c8d699b0f2f87e5a2013dde50596c506ec3aaf
- id: "development-audit-implementation"
  title: "Reviewed AI-attributed implementation"
  url: "https://github.com/SunCherry/agentic-AI_analog_IC_auto-designer/commit/a2dcee00d9d6c530839a1fcbed4acdefedd07b31"
- id: "development-audit-extension"
  title: "Reviewed coordinated implementation extension"
  url: "https://github.com/SunCherry/agentic-AI_analog_IC_auto-designer/commit/5bff9e4e798db6302501f2e11702c28b96c3562e"
- id: "development-audit-retained"
  title: "Retained implementation at the reviewed repository head"
  url: "https://github.com/SunCherry/agentic-AI_analog_IC_auto-designer/blob/bfc0fd5e006c05d13472080fe9a3254eba3321e7/.claude/skills/device-shaper/script/shape_devices.py"
---

### Released implementation and scope

The released schematic agent chooses device sizes within a supplied topology, supported by a Python iteration runner that invokes ngspice and records measurements. That is AI Design, not automatic topology invention. It separately analyzes specification observability, audits the user-supplied testbench and writes results-processing logic, establishing AI Simulation beyond sizing feedback alone. The agent must ask rather than invent unspecified measurement conditions. [Schematic agent](#source-schematic-agent) · [Iteration runner](#source-sizing-runner)

The layout agent controls device placement, orientation and routing against a frozen netlist, with a separate layout-fixer role handling DRC/LVS. The verify agent gates extraction and pre/post-layout measurement on a clean, matched layout. These are released model-hosted physical-design workflows, supporting AI Layout; deterministic tools still produce geometry checks and electrical results. [Layout agent](#source-layout-agent) · [Verification agent](#source-verify-agent)

### Release and result limits

Four of six roles are released. The analysis and knowledge-graph co-optimization roles remain planned, and GF180 is listed but unverified; SKY130 is the documented default. Inputs include the user's netlist, testbench and target specification, rather than an unconstrained natural-language design request. [Release status](#source-readme)

The September 8 Miller OTA mechanism demonstration uses hand-picked moves to test shared mirror-device parameters and netlist generation. Its state note explicitly denies a converged sizing result and separates it from a subsequent design run. Do not treat that demonstration or the README's end-to-end ambition as proven general autonomous convergence. No EDA experiment was reproduced for this review. [Example state](#source-example-state)

The reviewed September 8 commit changes actual placement/routing and device-cell implementation. The later README-image removal is included in raw activity but is not the meaningful freshness evidence. [Implementation activity](#source-activity)

### Development provenance

The reviewed changes implement geometric shaping and routing support in executable Python, including constraints and verification paths. These are substantial implemented design-flow components; their attribution is independent of running the project through Claude Code. [Implementation](#source-development-audit-implementation) · [Implementation](#source-development-audit-extension) · [Retained code](#source-development-audit-retained)
