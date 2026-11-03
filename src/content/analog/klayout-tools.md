---
name: klayout-tools
summary: Headless IC toolkit for parametric layout, DRC/LVS/extraction, ngspice corner simulation and gm/Id sizing, with JSON CLI/MCP interfaces.
description: Headless IC toolkit for parametric layout, DRC/LVS/extraction, ngspice corner simulation and gm/Id sizing, with JSON CLI/MCP interfaces. Bundled agent skills guide topology and physical-layout decisions; deterministic kernels perform execution, while process coverage, optional native extensions and development-versus-release capabilities remain explicit.
scope:
  design:
    ai: true
  simulation:
    ai: false
  layout:
    ai: true
access: Public MIT Python source using KLayout; ngspice, xschem, PDKs and selected EDA tools are separate requirements. Some Rust-backed features require source builds; the current main branch exceeds the v0.5.0 release.
addedAt: '2026-11-03'
reviewedAt: '2026-11-03'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/2AMLogic/klayout-tools
  purpose: code
- id: readme
  title: Current implementation overview and boundaries
  url: https://github.com/2AMLogic/klayout-tools/blob/99bcebbf25b149efe6aad6ca7734f37d7e378fd1/README.md
- id: activity
  title: Reviewed substantive first-parent implementation
  url: https://github.com/2AMLogic/klayout-tools/commit/f94eaa6c00f267e3b58031e6ddaeab0507d2cd9d
- id: sizing
  title: Deterministic ngspice-scored sizing implementation
  url: https://github.com/2AMLogic/klayout-tools/blob/99bcebbf25b149efe6aad6ca7734f37d7e378fd1/src/klayout_tools/size.py
- id: simulation
  title: SPICE PVT runner implementation
  url: https://github.com/2AMLogic/klayout-tools/blob/99bcebbf25b149efe6aad6ca7734f37d7e378fd1/src/klayout_tools/sim.py
- id: topology
  title: Model-hosted topology selection workflow
  url: https://github.com/2AMLogic/klayout-tools/blob/99bcebbf25b149efe6aad6ca7734f37d7e378fd1/.claude/skills/design-topology-selection/SKILL.md
- id: layout-skill
  title: Model-hosted physical layout workflow
  url: https://github.com/2AMLogic/klayout-tools/blob/99bcebbf25b149efe6aad6ca7734f37d7e378fd1/.claude/skills/design-layout-generation/SKILL.md
- id: website
  title: Official project website and documentation
  url: https://klayout-tools.org
  purpose: official
---

### Implementation and selection

Inspected Python simulation/sizing code, executable tests and integrated HBT-generation and batch-preflight corrections demonstrate substantive continued implementation since the initial release. This Analog entry covers circuit sizing, electrical evaluation and physical implementation; digital adapters do not justify a duplicate Digital article. The current SG13G2 bjt_array path instantiates the PDK's own GDS cells and reports missing resources; it does not claim an extraction round trip. Broad end-to-end autonomy in the README is a target, not a reproduced result. [Overview](#source-readme) · [Sizing code](#source-sizing) · [Simulation code](#source-simulation) · [Integrated implementation/tests](#source-activity).

### AI and release boundaries

The shipped-in-source topology skill explicitly makes the model select a topology against the block specification; the layout skill requires physical parameter/placement choices tied to implemented generation and checking operations. Those substantive model-hosted operations support AI Design and AI Layout. The sizing numerical search and ngspice runner themselves are conventional; sizing feedback alone does not add AI Simulation. Generic MCP access and bot-authored merge counts supply neither stage AI nor software-development attribution. No development-provenance badge is inferred from those facts. [Topology decisions](#source-topology) · [Physical layout procedure](#source-layout-skill).

Current-source capabilities must not all be attributed to v0.5.0. Some pipeline artifact schemas and a purpose-built circuit reasoning module remain proposed, and native yield/MoM features have packaging requirements. No cloud compute, EDA campaign or author-reported accuracy/signoff result was independently reproduced. [Access/release boundaries](#source-readme).
