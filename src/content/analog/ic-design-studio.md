---
name: "IC Design Studio"
summary: "Desktop IC workspace connecting schematic capture, analog optimization, simulation and physical verification."
description: "Open-source Qt workspace combining hierarchical schematics, analog sizing and optimization, SPICE/RTL experiments, and editable IC layouts with external DRC/LVS/extraction engines. Optional Gaussian-process search learns from simulated candidates to guide design choices; the engineering preview retains process-specific verification limits, and its bounded ngspice/Icarus bridge does not provide general Verilog-AMS support."
scope:
  design:
    ai: true
  simulation:
    ai: false
  layout:
    ai: false
access: "GPL-3.0-or-later Python/PySide6 source and Windows/Linux desktop packages. Process work requires matching models and physical decks; engine and runtime requirements vary by workflow. Windows digital implementation uses an app-owned WSL 2 runtime, while the SAR bridge requires native local ngspice/Icarus executables."
addedAt: "2026-10-12"
reviewedAt: "2026-10-12"
sources:
  - id: "code"
    title: "Canonical IC Design Studio repository"
    url: "https://github.com/jonahsaunders/IC-Design-Studio"
    purpose: "code"
  - id: "readme"
    title: "Reviewed default-branch capabilities and workflow requirements"
    url: "https://github.com/jonahsaunders/IC-Design-Studio/blob/49c79957b4d6f4978127da612e167e5c75cda6b3/README.md"
  - id: "optimizer"
    title: "Analog optimization methods and experimental surrogate limits"
    url: "https://github.com/jonahsaunders/IC-Design-Studio/blob/49c79957b4d6f4978127da612e167e5c75cda6b3/docs/ANALOG_OPTIMIZER.md"
  - id: "surrogate"
    title: "Implemented Gaussian-process training and candidate acquisition"
    url: "https://github.com/jonahsaunders/IC-Design-Studio/blob/49c79957b4d6f4978127da612e167e5c75cda6b3/icstudio/analog_surrogate.py"
  - id: "search-integration"
    title: "Surrogate proposals integrated into analog search"
    url: "https://github.com/jonahsaunders/IC-Design-Studio/blob/49c79957b4d6f4978127da612e167e5c75cda6b3/icstudio/analog_adaptive.py"
  - id: "physical-flow"
    title: "External simulation, DRC, LVS and extraction orchestration"
    url: "https://github.com/jonahsaunders/IC-Design-Studio/blob/49c79957b4d6f4978127da612e167e5c75cda6b3/icstudio/silicon_flow.py"
  - id: "qualification"
    title: "Archived Banba schematic and routed-layout qualification"
    url: "https://github.com/jonahsaunders/IC-Design-Studio/blob/49c79957b4d6f4978127da612e167e5c75cda6b3/docs/REFERENCE_QUALIFICATION.md"
  - id: "mixed-signal"
    title: "Bounded ngspice/Icarus SAR coupling contract"
    url: "https://github.com/jonahsaunders/IC-Design-Studio/blob/49c79957b4d6f4978127da612e167e5c75cda6b3/docs/MIXED_SIGNAL_SAR.md"
  - id: "release"
    title: "Public v0.23.0 desktop engineering preview"
    url: "https://github.com/jonahsaunders/IC-Design-Studio/releases/tag/v0.23.0"
  - id: "release-status"
    title: "Package source identity and reported validation scope"
    url: "https://github.com/jonahsaunders/IC-Design-Studio/blob/49c79957b4d6f4978127da612e167e5c75cda6b3/docs/RELEASE_STATUS.md"
  - id: "activity"
    title: "Default-branch setup cancellation and workspace correctness fixes"
    url: "https://github.com/jonahsaunders/IC-Design-Studio/commit/f954c3c1c837c5ff88733a292a163cd2982b504f"
  - id: "experimental-pr"
    title: "Unmerged GF180/IHP fill and SKY130 physical qualification work"
    url: "https://github.com/jonahsaunders/IC-Design-Studio/pull/68"
  - id: "experimental-activity"
    title: "Experimental SKY130 global-rule and conductor-connectivity implementation, October 12"
    url: "https://github.com/jonahsaunders/IC-Design-Studio/commit/fb1a741c145595b1b0931157f1fb7ec3f236058b"
---

### Contribution and scope

The native project joins cells, symbols, models, saved testbenches, results and editable layouts in one desktop workspace. This complements agent-oriented schematic workbenches by exposing a connected human design, optimization and physical-verification workflow. Digital tooling is described as part of this integrated environment; this addition does not create a separate Digital entry. [Reviewed capabilities](#source-readme)

Design includes hierarchical circuit editing, sizing and optimization. The optional Gaussian-process implementation trains on simulated candidate scores and uses expected-improvement acquisition with an approximate feasibility surrogate to propose further candidates. Its integration is executable rather than a planned model interface, supporting AI Design. Training and proposals are bounded; predicted scores are search guidance, not verified electrical performance or manufacturing yield. [Search specification](#source-optimizer) · [Surrogate implementation](#source-surrogate) · [Search integration](#source-search-integration)

Simulation is conventional electrical execution and result inspection. Layout includes editable IC geometry and external physical-engine orchestration. The reviewed paths do not establish model-driven simulation planning or physical-layout decisions, so neither receives an AI prefix. Runtime surrogate optimization does not establish software-development provenance; no development badge is assigned in this bounded review. [Physical implementation](#source-physical-flow) · [Capabilities](#source-readme)

### Release and verification boundaries

Version 0.23.0 is a desktop engineering preview, published from commit 6c9cf950737c5d0e793d47ef8e9ddcb7caa72b83. Reported package and source tests apply to their recorded artifacts and environments, not arbitrary edited circuits. Source and retained evidence were inspected; this catalog review did not execute EDA engines or independently qualify the installers. [Public release](#source-release) · [Source and package identity](#source-release-status)

The archived Banba layout has bounded DRC/LVS and capacitance-only post-layout results, while distributed-RC extraction and dummy-fill coupling remain blocked. Broader extraction paths have their own fixture-specific evidence; these limits must not be generalized into either complete extraction support or its complete absence. This is not foundry signoff or a qualified Virtuoso replacement. [Reference qualification](#source-qualification)

The SAR bridge couples local ngspice and Icarus in bounded clocked experiments. It does not establish general Verilog-AMS support, transistor-level ADC accuracy, UVM-MS integration or arbitrary analog/digital view substitution. [Coupling contract](#source-mixed-signal)

### Reviewed activity

The activity strip records the canonical repository's main first-parent committer history only. The October 2 merge fixes setup-dialog cancellation and slow example imports, including implementation and regression changes; October 4 documentation is the raw latest commit. [Meaningful main activity](#source-activity)

Development continues separately on experimental: the October 12 commit expands SKY130 rule checking and conductor connectivity under draft PR 68. This is evidence of ongoing public implementation, not a main merge or a newly qualified public package. Its commits are not added to main's activity buckets. [Development PR](#source-experimental-pr) · [Reviewed experimental implementation](#source-experimental-activity)
