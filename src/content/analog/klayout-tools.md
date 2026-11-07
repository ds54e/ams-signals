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
  aiDevelopment: assisted
access: "Public MIT Python source using KLayout; ngspice, xschem, PDKs and selected EDA tools are separate requirements. Capabilities and optional native extensions vary by release; inspect the selected version."
addedAt: '2026-11-03'
reviewedAt: "2026-11-07"
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
- id: development-20261107-implementation
  title: "Claude-coauthored attestation checks and executable tests"
  url: https://github.com/2AMLogic/klayout-tools/commit/da593a9f2c18a5d0cb498a770b340381c8dcdad6
- id: development-20261107-refactor
  title: "Claude-coauthored refactoring of attestation report handlers"
  url: https://github.com/2AMLogic/klayout-tools/commit/c281c66d368e7e3d6f2ebf2f3f8f1f50802953ca
- id: development-20261107-retained
  title: "Retained attestation check handlers at the reviewed canonical head"
  url: https://github.com/2AMLogic/klayout-tools/blob/1552d754ce1494e3f2dbf866b99fa4abffd23d23/src/klayout_tools/signoff_attest_text.py
developmentEvidence:
  summary: "Claude-coauthored changes implement and test rendering of citation, recorded-hash and metric checks in attestation reports; the canonical module retains the handlers after refactoring. This attributes those changes, not the whole toolkit."
  sources: [development-20261107-implementation, development-20261107-refactor, development-20261107-retained]
  reviewedAt: "2026-11-07"
---

### Implementation and selection

Inspected Python simulation/sizing code, executable tests and integrated HBT-generation and batch-preflight corrections demonstrate substantive continued implementation since the initial release. This Analog entry covers circuit sizing, electrical evaluation and physical implementation; digital adapters do not justify a duplicate Digital article. The current SG13G2 bjt_array path instantiates the PDK's own GDS cells and reports missing resources; it does not claim an extraction round trip. Broad end-to-end autonomy in the README is a target, not a reproduced result. [Overview](#source-readme) · [Sizing code](#source-sizing) · [Simulation code](#source-simulation) · [Integrated implementation/tests](#source-activity).

### AI and release boundaries

The shipped-in-source topology skill explicitly makes the model select a topology against the block specification; the layout skill requires physical parameter/placement choices tied to implemented generation and checking operations. Those substantive model-hosted operations support AI Design and AI Layout. The sizing numerical search and ngspice runner themselves are conventional; sizing feedback alone does not add AI Simulation. Generic MCP access and bot-authored merge counts supply neither stage AI nor software-development attribution. Those facts alone do not establish development provenance; separately reviewed credited implementation is recorded below. [Topology decisions](#source-topology) · [Physical layout procedure](#source-layout-skill).

The November 3 source review must not be read as a feature list for v0.5.0. Some pipeline artifact schemas and a purpose-built circuit reasoning module remain proposed, and native yield/MoM features have packaging requirements. No cloud compute, EDA campaign or author-reported accuracy/signoff result was independently reproduced. [Access/release boundaries](#source-readme).

### November implementation review

Claude Sonnet 5.5 is explicitly credited on executable changes implementing and testing citation, recorded-hash and metric checks in attestation report rendering. The refactored canonical module retains those handlers. This establishes AI-ASSISTED for these code contributions, not AI authorship of the whole toolkit and not an additional runtime-AI stage. Source version bumps alone do not establish a published release or independently verified signoff result. [Credited implementation and tests](#source-development-20261107-implementation) · [Refactoring](#source-development-20261107-refactor) · [Retained handlers](#source-development-20261107-retained).
