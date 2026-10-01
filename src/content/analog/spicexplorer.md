---
name: "SpiceXplorer"
aliases: ["Analog-DB", "analog-db"]
summary: "Analog circuit database, sizing and simulation platform with agent-driven schematic/layout co-design."
description: "Combines a PDK-neutral analog circuit database with gm/ID sizing, numerical and Bayesian optimization, SPICE evaluation and parameterized layout flows. Released agent skills coordinate sizing and schematic/layout co-design, while DRC/LVS/PEX runners and optional openEMS checks produce inspectable verification artifacts."
scope:
  design:
    ai: true
  simulation:
    ai: false
  layout:
    ai: true
  aiDevelopment: "assisted"
developmentEvidence:
  summary: "The September 1 EM-verification contribution credits Claude Opus and adds net extraction, openEMS S-parameter orchestration and SPICE-model export with tests. The reviewed diff establishes AI-assisted implementation of this analysis subsystem."
  sources: ["activity", "em-implementation"]
  reviewedAt: "2026-10-01"
access: "Public Python platform, Studio interface, circuit database and agent definitions. Live SPICE is opt-in; open bindings cover IHP SG13G2, SKY130 and GF180MCU. Physical and EM flows need additional tools; the Spectre path requires a user-supplied licensed environment."
addedAt: "2026-10-01"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Canonical SpiceXplorer public release repository"
    url: "https://github.com/MacAnalog/spicexplorer-release"
    purpose: "code"
  - id: "paper"
    title: "Analog-DB: An Agent-First Analog Integrated Circuit Database, From Blocks to Systems"
    url: "https://arxiv.org/abs/2609.01286"
    purpose: "paper"
  - id: "readme"
    title: "Released components, open-PDK bindings and live-simulation setup"
    url: "https://github.com/MacAnalog/spicexplorer-release/blob/263d0322f8900dc331536fbbe6c0e804514fc454/README.md"
  - id: "database"
    title: "Versioned circuit registry and tiered verification harness"
    url: "https://github.com/MacAnalog/spicexplorer-release/blob/263d0322f8900dc331536fbbe6c0e804514fc454/analog-db/README.md"
  - id: "bayesian"
    title: "Ax Gaussian-process candidate proposal implementation"
    url: "https://github.com/MacAnalog/spicexplorer-release/blob/263d0322f8900dc331536fbbe6c0e804514fc454/platform/packages/spicexplorer/src/spicexplorer/optimization/stochastic/bayesian_ax.py"
  - id: "platform"
    title: "Optimization, simulation backends and layout-in-the-loop contract"
    url: "https://github.com/MacAnalog/spicexplorer-release/blob/263d0322f8900dc331536fbbe6c0e804514fc454/platform/packages/spicexplorer/README.md"
  - id: "agent-kit"
    title: "Released layout agents and gm/ID sizing skills"
    url: "https://github.com/MacAnalog/spicexplorer-release/blob/263d0322f8900dc331536fbbe6c0e804514fc454/.claude/README.md"
  - id: "codesign-agent"
    title: "Generator repair and schematic/layout co-design agent workflow"
    url: "https://github.com/MacAnalog/spicexplorer-release/blob/263d0322f8900dc331536fbbe6c0e804514fc454/.claude/agents/layout-schematic-codesign.md"
  - id: "physical"
    title: "DRC, LVS, PEX and post-layout simulation runners and limits"
    url: "https://github.com/MacAnalog/spicexplorer-release/blob/263d0322f8900dc331536fbbe6c0e804514fc454/platform/packages/spicexplorer-signoff/README.md"
  - id: "em-implementation"
    title: "OpenEMS verification and SPICE-model export implementation"
    url: "https://github.com/MacAnalog/spicexplorer-release/blob/06cd92dc1d56715cc064b2a39affa309311ccd5f/platform/packages/spicexplorer-layout/src/spicexplorer_layout/em.py"
  - id: "activity"
    title: "Attributed EM-verification implementation and tests, September 1, 2026"
    url: "https://github.com/MacAnalog/spicexplorer-release/commit/06cd92dc1d56715cc064b2a39affa309311ccd5f"
---

### Inclusion and project boundary

The public release repository packages the circuit database, Python tools, Studio front end and agent kit together, so one catalog entry covers SpiceXplorer and its Analog-DB component. Analog-DB's September 1, 2026 paper establishes concrete methods and schematic-level evaluation; it is not a publication validating every platform or physical-flow capability. Public source independently supports those additional operations. [Project](#source-readme) · [Database](#source-database) · [Paper](#source-paper)

The database distinguishes verifiable circuits from upstream-pointer reference records whose deeper electrical tiers are skipped. Its current README and paper give different corpus counts, so no single count is presented as the current total. Imported AnalogGym references do not make the entire project a duplicate of AnalogGym: the platform adds process-neutral representations, parameter binding, reusable measurement infrastructure and optimization/co-design workflows. [Database contract](#source-database) · [Platform](#source-platform)

### Scope classification

Design includes deterministic gm/ID lookup sizing and numerical optimizers, which do not alone justify an AI prefix. The optional Ax backend explicitly proposes candidates using a Gaussian-process surrogate; released sizing and co-design agent workflows also make model-driven design decisions. Those implemented paths support AI Design. The surrogate changes candidate proposal while sharing the conventional SPICE evaluation/scoring loop, so Simulation remains unprefixed. Dormant reinforcement-learning code is not counted as an active capability. [Bayesian implementation](#source-bayesian) · [Supported optimizers](#source-platform) · [Agent kit](#source-agent-kit)

AI Layout follows the released agent workflow that writes or repairs a parameterized generator, selects its search bounds and responds to measured results. The platform runs the underlying build, DRC, LVS, PEX and post-layout benches. These operations cover physical implementation without implying complete foundry sign-off; density/antenna checks and some second-opinion runners are outside the documented package coverage. [Co-design workflow](#source-codesign-agent) · [Physical runners](#source-physical)

### Activity and development provenance

The September 1 EM-verification commit is the reviewed meaningful first-parent change; the later same-day head updates documentation. The EM implementation extracts named nets from GDS, orchestrates the PDK's openEMS workflow and exports a fitted SPICE subcircuit. It is an optional verification lane outside the optimizer loop. Its handling of near-passive fits requires explicit warnings and checking the spliced deck's operating point, so the catalog does not imply guaranteed passivity or independently reproduced results. [Meaningful commit](#source-activity) · [Implementation](#source-em-implementation)

That commit credits Claude Opus and introduces the actual analysis pipeline with configuration and tests. The diff supports AI-ASSISTED for this substantial subsystem, not a whole-project AI-BUILT claim or attribution of the upstream simulators. [Attributed implementation](#source-activity) · [Retained subsystem](#source-em-implementation)
