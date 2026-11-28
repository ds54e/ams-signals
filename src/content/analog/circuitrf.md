---
name: "circuitRF"
summary: "RF circuit simulation, schematic and layout editing with planar EM extraction and external 3D solvers."
description: "RF circuit and electromagnetic simulator with schematic editing, harmonic balance, loadpull, LC filter synthesis and parameterized layout. Its planar solver and external 3D solver integrations support EM co-simulation; measured-wave loadpull imports and mask-based ladder design extend the conventional RF design workflow."
scope:
  design:
    ai: false
  simulation:
    ai: false
  layout:
    ai: false
  aiDevelopment: "assisted"
developmentEvidence:
  summary: "The project identifies Claude/Claude Code assistance. A Claude Opus coauthored commit implements cached SDD frequency weights, retained in the reviewed main-branch source."
  sources: ["readme", "credited-code", "retained-code"]
  reviewedAt: "2026-11-15"
access: "MIT project source; .NET 10/Avalonia desktop application and CLI. Bundled third-party components have separate terms, including LGPL CSparse.NET and Open CASCADE and an MPL OSDI header. 3D EM requires the selected external solver and mesher; external device kits/models have their own requirements."
addedAt: "2026-11-15"
reviewedAt: "2026-11-28"
sources:
  - id: "official"
    title: "Official project website"
    url: "https://potatobeanradio.github.io/circuitRF/"
    purpose: "official"
  - id: "code"
    title: "Canonical circuitRF repository"
    url: "https://github.com/potatobeanradio/circuitRF"
    purpose: "code"
  - id: "readme"
    title: "Reviewed overview, dependencies and AI-assisted development disclosure"
    url: "https://github.com/potatobeanradio/circuitRF/blob/be045bbf577abf103da798223b002fa66ddc0967/README.md"
  - id: "release"
    title: "circuitRF 1.8.4, November 14, 2026"
    url: "https://github.com/potatobeanradio/circuitRF/releases/tag/1.8.4"
  - id: "activity"
    title: "Integrated IC PCell ports, pin conductors and EM mesh/run fixes"
    url: "https://github.com/potatobeanradio/circuitRF/commit/a963dd51431f4bb291c500faad5d8ee242c471d6"
  - id: "pin-conductor"
    title: "Retained pin-layer to stackup-conductor resolution"
    url: "https://github.com/potatobeanradio/circuitRF/blob/be045bbf577abf103da798223b002fa66ddc0967/src/Design/Layout/Em/EmPinConductor.cs"
  - id: "credited-code"
    title: "Claude Opus credited SDD frequency-weight cache implementation"
    url: "https://github.com/potatobeanradio/circuitRF/commit/813d8a7d8daa25e2fe0409a87cceac2f51578798"
  - id: "retained-code"
    title: "SDD weight cache retained in reviewed main"
    url: "https://github.com/potatobeanradio/circuitRF/blob/be045bbf577abf103da798223b002fa66ddc0967/src/Core/Devices/SddModel.cs"
  - id: "code-integration"
    title: "Merged weighted-term implementation PR 64"
    url: "https://github.com/potatobeanradio/circuitRF/pull/64"
  - id: "agent-interface"
    title: "External-agent MCP workflow and its boundaries"
    url: "https://github.com/potatobeanradio/circuitRF/blob/be045bbf577abf103da798223b002fa66ddc0967/docs/user/src/reference/ai-agents.md"
  - id: "license"
    title: "Project MIT license"
    url: "https://github.com/potatobeanradio/circuitRF/blob/be045bbf577abf103da798223b002fa66ddc0967/LICENSE"
  - id: "third-party"
    title: "Third-party components and redistribution terms"
    url: "https://github.com/potatobeanradio/circuitRF/blob/be045bbf577abf103da798223b002fa66ddc0967/THIRD-PARTY-NOTICES.md"
  - id: "review-20261128-filter"
    title: "November 24 load-termination-aware LC filter mask search"
    url: "https://github.com/potatobeanradio/circuitRF/commit/54eb4f51174f418c26a27217f8025edf03073a2a"
  - id: "review-20261128-filter-tests"
    title: "Retained ladder mask and termination tests"
    url: "https://github.com/potatobeanradio/circuitRF/blob/518ba77e77535223aa56b1d619115c0846bea829/tests/Ui.Tests/Filters/LcFilterMaskGuaranteeTests.cs"
  - id: "review-20261128-loadpull"
    title: "November 24 measured-wave loadpull metrics and reader integration"
    url: "https://github.com/potatobeanradio/circuitRF/commit/2959c5052fae4f04b30507a52a1410ad28c26978"
  - id: "review-20261128-waves"
    title: "Retained common power-wave metric implementation"
    url: "https://github.com/potatobeanradio/circuitRF/blob/518ba77e77535223aa56b1d619115c0846bea829/src/RfCore/Loadpull/LoadpullWaves.cs"
  - id: "review-20261128-offgrid"
    title: "November 24 off-grid loadpull marker interpolation"
    url: "https://github.com/potatobeanradio/circuitRF/commit/ceb802f5a5b34c5a9e2eb4fa57b21f56ce5aac00"
  - id: "review-20261128-offgrid-tests"
    title: "Retained analytic-grid off-grid loadpull regressions"
    url: "https://github.com/potatobeanradio/circuitRF/blob/518ba77e77535223aa56b1d619115c0846bea829/tests/Ui.Tests/DataDisplay/LoadpullOffGridLinkTests.cs"
  - id: "review-20261128-activity"
    title: "November 26 marker-table integration and executable regressions"
    url: "https://github.com/potatobeanradio/circuitRF/commit/dc60fd73233439694cc8fedeee6a253b350b7d19"
---

### Implementation and selection

The canonical public repository contains the circuit engine, schematic/layout editors, EM integration and executable regression tests. It is a distinct implementation rather than a mirror of an existing catalog entry. The reviewed history includes separate SDD frequency-weight caching and hierarchical IC component-port/PCell corrections, with retained executable code in both paths. These changes support selection through substantive iteration, rather than repository age or the latest README edit. [Overview](#source-readme) · [SDD change](#source-credited-code) · [IC implementation and tests](#source-activity) · [Retained conductor resolution](#source-pin-conductor)

The November 14 meaningful checkpoint resolves pin-purpose layers onto stackup conductors, supports kit PCells and avoids requiring Palace for mesh-only runs. Its tests and reported technical results were inspected as source evidence; the simulations were not independently reproduced. Version 1.8.4 points to this implementation commit. Reviewed main is one README-only commit ahead, so the stated fixes are in that release rather than unreleased claims. [Implementation](#source-activity) · [Release](#source-release) · [Reviewed main](#source-readme)

### Scope, provenance and limits

Design covers circuit/schematic work, Simulation covers circuit and EM evaluation, and Layout covers physical geometry and PCells. The external-agent MCP interface and workflow documentation expose conventional operations; they do not establish an embedded model or a released model-hosted stage skill. No runtime AI prefix is assigned on that basis. [Implementation overview](#source-readme) · [Agent interface](#source-agent-interface)

The maintainer explicitly identifies Claude/Claude Code assistance. The credited SDD commit implements a concurrent cache keyed by weight and frequency and updates harmonic-balance callers. It is a side-branch ancestor integrated through PR 64 at first-parent merge e5f0f419cd0ea05cc3c58dce1f8b7040d07b2070 on November 13; the cache remains in current main. The attributed side-branch commit is not counted as an additional first-parent activity event. This establishes the specific integrated AI-assisted code contribution without attributing all project code to that actor. [Disclosure](#source-readme) · [Attributed diff](#source-credited-code) · [Merged integration](#source-code-integration) · [Retained implementation](#source-retained-code)

The project source is MIT, while distributed dependencies retain their own licenses. CSparse.NET, Open CASCADE and the OSDI header mean a packaged distribution cannot be described as solely MIT. External 3D solvers/meshers and device models remain separate workflow dependencies; source inspection does not establish arbitrary-kit compatibility or numerical accuracy. [License](#source-license) · [Dependency notices](#source-third-party) · [Workflow boundaries](#source-readme)

### November 28, 2026 source review

The November 24 LC Filter Designer correction includes the requested load in minimum-order mask searches: for equal terminations it steps past an unsuitable even-order Chebyshev ladder. Schematic placement can bring its own S-parameter sweep, while retaining an existing sweep. The executable regressions exercise mask and termination conditions; this is passive-network synthesis and modeled response checking, not production RF signoff. [LC implementation](#source-review-20261128-filter) · [Mask regressions](#source-review-20261128-filter-tests).

The measured-wave loadpull reader integration derives available and delivered input power, output power, gain, efficiency and impedance-related metrics from incident/reflected waves and available bias inputs; declared file columns take precedence and missing inputs do not create zero metrics. It accepts additional CST and SATwave formats. Off-grid marker reads distinguish a sampled load from interpolation or extrapolation and label the synthesized response. The November 26 marker-table merge adds multiple trace readouts and persistence/export regressions. This is RF design and analysis of stored data, not live control of a physical load-pull bench or a distinct Lab implementation. Existing Design, Simulation, Layout and AI-development provenance remain unchanged. Source tests were inspected, not executed, and no tagged-release inclusion or independent numerical comparison is claimed for these changes. [Wave integration](#source-review-20261128-loadpull) · [Wave implementation](#source-review-20261128-waves) · [Off-grid implementation](#source-review-20261128-offgrid) · [Synthetic regressions](#source-review-20261128-offgrid-tests) · [Marker-table integration](#source-review-20261128-activity).
