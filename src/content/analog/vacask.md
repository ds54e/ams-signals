---
name: "VACASK"
aliases: ["Verilog-A Circuit Analysis Kernel"]
summary: "Loads compiled Verilog-A models for scripted analog circuit analyses."
description: "Analog simulator loading compiled Verilog-A models through OSDI for DC, AC, transient, noise and periodic analyses. Spectre-like netlists and control scripting now accept file-driven PWL stimuli and numeric-file reads; optional parallel evaluation supports repeated analyses. SPICE/Spectre import remains experimental, and model compilation requires OpenVAF-Reloaded."
scope:
  simulation:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Code is credited with co-developing the ng2vc parameter-parser correction. The canonical converter retains comparison-aware assignment splitting after the code moved into the Python package."
  sources: [development-code-20261022, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public AGPL-3.0 C++ source and prebuilt packages; model compilation, numerical libraries and process-specific models are separate dependencies."
addedAt: "2026-10-05"
reviewedAt: "2026-10-31"
sources:
  - id: "site"
    title: "Official VACASK overview and distributions"
    url: "https://fides.fe.uni-lj.si/vacask/"
    purpose: "official"
  - id: "code"
    title: "Canonical Codeberg implementation"
    url: "https://codeberg.org/arpadbuermen/VACASK"
    purpose: "code"
  - id: "readme"
    title: "Reviewed analyses, model interface, build requirements and AI-use statement"
    url: "https://codeberg.org/arpadbuermen/VACASK/src/commit/7eeb9d2ec0234139b96a53ab194f772c0b902dc9/README.md"
  - id: "implementation"
    title: "Simulator entry point and analysis execution"
    url: "https://codeberg.org/arpadbuermen/VACASK/src/commit/7eeb9d2ec0234139b96a53ab194f772c0b902dc9/simulator/main.cpp"
  - id: "activity"
    title: "OSDI device bypass checks use cached node mappings"
    url: "https://codeberg.org/arpadbuermen/VACASK/commit/29d99ad2df4d8262e64ba883849c2974b3f01cce"
  - id: development-code-20261022
    title: Credited executable development contribution
    url: https://codeberg.org/arpadbuermen/VACASK/commit/25d93818cdc1a98048e9809ce432ae4aba2fdf47
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://codeberg.org/arpadbuermen/VACASK/src/commit/9ca4982a3d199005fbb40179d75a40de6ea00db0/python/src/vacask/ng2vclib/m_params.py
  - id: activity-reviewed-20261022
    title: Skip unused Newton-Raphson point maxima
    url: https://codeberg.org/arpadbuermen/VACASK/commit/9ca4982a3d199005fbb40179d75a40de6ea00db0
  - id: review-20261031-pwl
    title: "File-driven PWL stimulus implementation"
    url: https://codeberg.org/arpadbuermen/VACASK/commit/d07c1f6f41e3072557e0ecd784451568ffe57c79
  - id: review-20261031-readfile
    title: "Numeric-file loading through the RPN readfile function"
    url: https://codeberg.org/arpadbuermen/VACASK/commit/d7b4db43b4534cbe92de4c12e25d33019acd5b01
---

### Implementation and limits

The public C++ simulator loads OpenVAF-Reloaded device libraries through OSDI. Implemented analyses include DC, AC, transient, noise, periodic steady state, harmonic balance and their small-signal/noise variants. Control scripting, parameter changes and optional parallel device evaluation support repeated circuit analyses. The native input language is Spectre-like; experimental foreign parsers do not establish complete SPICE or Spectre compatibility. [Reviewed overview](#source-readme); [simulator implementation](#source-implementation).

Author-reported performance comparisons depend on the stated circuits, model libraries, tolerances and hardware. They were not reproduced for this review and are not generalized into a speed or signoff claim. [Reported experiments](#source-readme).

### Scope and development provenance

Simulation covers electrical equation solving and analysis. Netlist/control scripting supports that operation rather than independently establishing circuit synthesis or layout. The numerical solver has no reviewed runtime model decision path. The general GenAI disclosure alone does not attribute implementation. Separately reviewed, integrated converter code explicitly credits Claude Code and supports the development label below. [Capabilities and development statement](#source-readme).

### Reviewed public activity

Canonical Codeberg identity, main branch and complete first-parent committer history were captured directly. The October 2 UTC implementation replaces repeated node-pointer lookups with cached index mappings in OSDI input/output bypass checks. The later demo reorganization advances the repository tip without replacing this reviewed implementation checkpoint. [Reviewed change](#source-activity).

### Development provenance

Claude Code is credited with co-developing the ng2vc parameter-parser correction. The canonical converter retains comparison-aware assignment splitting after the code moved into the Python package. This supports AI-ASSISTED; it does not establish that AI built most of the project. [Credited change](#source-development-code-20261022) · [Retained implementation](#source-development-retained-20261022).

### Current implementation and activity

The October 22 implementation skips residual and solution point-maximum loops when the configured tolerance references do not consume them. The guard retains the point-global and LTE cases. The maintainer reports output comparisons and timing measurements; those experiments were not independently rerun. [Reviewed implementation change](#source-activity-reviewed-20261022).

Independent voltage/current PWL sources can load waveform values from a file, resolving relative paths from the defining input file before the working directory and reloading changed files during setup. The RPN `readfile(name)` function separately returns a real vector of numeric file contents on evaluation. This supports reusable external stimulus and control data without establishing complete foreign-netlist compatibility. Source and examples were inspected; simulator accuracy and author-reported performance were not rerun. [PWL source implementation](#source-review-20261031-pwl) · [RPN file reader](#source-review-20261031-readfile).
