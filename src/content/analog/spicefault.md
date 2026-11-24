---
name: "spicefault"
aliases: []
summary: "Runs recorded SPICE fault and tolerance campaigns for reliability analysis and test selection."
description: "Runs reproducible ngspice fault-injection and tolerance campaigns to measure detectability, diagnostic ambiguity and yield. Recorded samples feed statistical reports and optional test selection or plans constrained by hardware cost; faults operate on the top-level netlist, and simulated coverage depends on the supplied circuit, fault universe and operating conditions."
scope:
  simulation:
    ai: false
access: "Public MIT Python package requiring ngspice and compatible circuit models; exact test-plan optimization additionally needs PuLP and HiGHS. Third-party models in validation examples retain their own terms."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official spicefault documentation"
    url: "https://spicefault.readthedocs.io/en/latest/"
    purpose: official
  - id: code
    title: "Canonical public spicefault implementation"
    url: "https://github.com/telmomm/spicefault"
    purpose: code
  - id: overview
    title: "Current capabilities, dependencies and fault-model limits"
    url: "https://github.com/telmomm/spicefault/blob/36814e09fc651dc786c2765ec396c3d49972a372/README.md"
  - id: experiment
    title: "Sample realization, fault application and operating-condition execution"
    url: "https://github.com/telmomm/spicefault/blob/36814e09fc651dc786c2765ec396c3d49972a372/src/spicefault/experiments/experiment.py"
  - id: campaign
    title: "Resumable execution, configuration identity and recorded sample provenance"
    url: "https://github.com/telmomm/spicefault/blob/36814e09fc651dc786c2765ec396c3d49972a372/src/spicefault/experiments/engine.py"
  - id: simulator
    title: "Actual ngspice process execution and raw-file parsing"
    url: "https://github.com/telmomm/spicefault/blob/36814e09fc651dc786c2765ec396c3d49972a372/src/spicefault/simulation/ngspice.py"
  - id: plan-selection
    title: "Implemented integer-programming selection under cost and coverage constraints"
    url: "https://github.com/telmomm/spicefault/blob/36814e09fc651dc786c2765ec396c3d49972a372/src/spicefault/testdesign/select/ilp.py"
  - id: reference-selectors
    title: "Density-distance, bandwidth search and fixed-candidate subset selection"
    url: "https://github.com/telmomm/spicefault/blob/36814e09fc651dc786c2765ec396c3d49972a372/src/spicefault/testdesign/select/baselines.py"
  - id: selection-tests
    title: "Regression comparisons between ILP and exhaustive enumeration"
    url: "https://github.com/telmomm/spicefault/blob/36814e09fc651dc786c2765ec396c3d49972a372/tests/unit/testdesign/test_ilp.py"
  - id: earlier-testdesign
    title: "Earlier candidate tests, coverage metrics, stopping rules and reference selectors"
    url: "https://github.com/telmomm/spicefault/commit/1d66f089dd54e0b5d81a25bab597b946dd07efee"
  - id: activity
    title: "Cost models, fault priors, exact plan selection and testability bounds"
    url: "https://github.com/telmomm/spicefault/commit/4b84c6c9da35192f28929c1b333b5e8e6135bcdc"
  - id: reviewed-copilot-change
    title: "Merged Copilot change limited to version and release metadata"
    url: "https://github.com/telmomm/spicefault/pull/19"
---

### Workflow and distinct contribution

The package represents normal parameter variation, injected faults and operating conditions separately, then realizes and simulates each sample. It retains failures as statuses and records configuration identities, sample tables, waveforms and provenance for resumable campaigns. These operations provide an experimental fault model and analysis workflow above a simulator interface. They complement general SPICE automation with repeatable comparisons of detectable, ambiguous and tolerance-masked faults. [Experiment](#source-experiment) · [Campaign engine](#source-campaign) · [ngspice execution](#source-simulator).

Simulation covers electrical fault evaluation, statistical reports and selection of simulated measurements. The cost and ADC abstractions model a proposed test arrangement; they do not operate a physical instrument, fabricate a fixture or generate a deployable tester. Netlist changes express faults under evaluation, so they do not establish a separate circuit-design operation. [Current scope](#source-overview) · [Plan selection](#source-plan-selection).

### Boundaries and classification

The documented primary workflow uses one static fault object per sample; a composite object can group changes. Fault edits act at the top netlist level, while internal subcircuit effects require exposed instance parameters. Opens and shorts are finite-resistance approximations. Coverage is conditional on the chosen fault universe, population and measurements; it does not establish hardware fault coverage or certification. [Current fault-model limits](#source-overview) · [Realization implementation](#source-experiment).

The optional reference selectors compare existing sample distributions using KDE and a density-distance threshold. Grey-wolf search chooses the KDE bandwidth, while the genetic method selects subsets from a fixed candidate dictionary; neither supplies an electrical-response surrogate for unseen circuits. These statistical and fixed-data optimization operations, together with integer programming, remain conventional Simulation. The merged Copilot contribution changes a version string, citation metadata and changelog only; the old version is no longer current, and this is not a basis for AI-ASSISTED. [Reference selectors](#source-reference-selectors) · [ILP implementation](#source-plan-selection) · [Reviewed Copilot change](#source-reviewed-copilot-change).

### Selection and technical activity

October introduced candidate test generation, coverage metrics and stopping rules; November separately added hardware-cost models, fault priors, exact ILP selection and testability bounds. The current ILP tests compare solver results against exhaustive enumeration and exercise false-alarm and budget constraints. These implementations and first-parent integration were reviewed without rerunning the external simulator campaigns or the claimed coverage experiments. [Earlier implementation](#source-earlier-testdesign) · [November implementation](#source-activity) · [Executable checks](#source-selection-tests).
