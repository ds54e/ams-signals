---
name: "PyOPUS"
aliases: []
summary: "Integrates numerical analog sizing with circuit simulation, performance extraction and variation analysis."
description: "Python library and GUI for analog circuit sizing and simulation-driven optimization across process corners. Simulator adapters and performance extraction connect numerical search with sensitivity analysis, worst-case methods and yield-oriented design, integrating circuit evaluation with sizing decisions."
scope:
  design:
    ai: false
  simulation:
    ai: false
access: "Public Python library and GUI; simulator installations, device models and optional parallel-computing dependencies are supplied separately."
addedAt: "2026-09-07"
reviewedAt: "2026-09-07"
sources:
  - id: "site"
    title: "Official PyOPUS overview and 0.12 release announcement"
    url: "https://fides.fe.uni-lj.si/pyopus/"
    purpose: "official"
  - id: "code"
    title: "Canonical Codeberg source repository"
    url: "https://codeberg.org/arpadbuermen/PyOPUS"
    purpose: "code"
  - id: "release-readme"
    title: "Official PyOPUS 0.12 README and canonical Git access"
    url: "https://fides.fe.uni-lj.si/pyopus/download/0.12/README"
  - id: "documentation"
    title: "Versioned PyOPUS 0.12 documentation"
    url: "https://fides.fe.uni-lj.si/pyopus/download/0.12/docsrc/_build/html/"
  - id: "sizing"
    title: "Versioned corner-based circuit sizing documentation"
    url: "https://fides.fe.uni-lj.si/pyopus/download/0.12/docsrc/_build/html/design.cbd.html"
  - id: "changelog"
    title: "Reviewed changelog including NumPy 2 and evaluator/design updates"
    url: "https://codeberg.org/arpadbuermen/PyOPUS/src/commit/56e601eabd6331d4669782ceb01cea91c90b3efc/Changelog"
  - id: "gui-fix"
    title: "GUI circular-import correction, January 15, 2026"
    url: "https://codeberg.org/arpadbuermen/PyOPUS/commit/8cd375d7339ee68c49475c0a51fee858615aa6a2"
  - id: "activity"
    title: "NumPy-scalar aggregate-result reporting fix, March 13, 2026"
    url: "https://codeberg.org/arpadbuermen/PyOPUS/commit/56e601eabd6331d4669782ceb01cea91c90b3efc"
---

### Implementation context

Performance evaluators run selected simulator analyses across parameter sets/corners and extract electrical measures for numerical sizing. Sensitivity, screening, worst-case/distance and Monte Carlo/yield methods support variation-aware optimization. The library and GUI combine evaluation and sizing in a broader workflow than device-table lookup alone. [Versioned documentation](#source-documentation); [corner-based sizing](#source-sizing).

Documentation lists SpiceOpus, ngspice, Xyce, HSPICE and Spectre adapters. Their presence is not a compatibility test against every current simulator installation, model deck or commercial environment. The GUI covers documented tasks rather than every library method. [Official release README](#source-release-readme); [documentation](#source-documentation).

### Release and activity boundary

Version 0.12 was released January 14, 2026. Its changelog records the NumPy 2 transition and evaluator/design fixes. Later main changes repair GUI startup through a circular-import fix and convert a NumPy scalar to a scalar item before formatting aggregate results. The latter March 13 correction is the latest reviewed meaningful commit. [Release announcement](#source-site); [changelog](#source-changelog); [GUI correction](#source-gui-fix); [meaningful activity](#source-activity).

The official release README names Codeberg as the Git source. Canonical API identity and full first-parent history were retrieved; the activity record uses the existing non-GitHub repository method, actual Codeberg ID, branch, head and UTC counts. No mirror history is substituted. [Canonical source](#source-code); [upstream Git instructions](#source-release-readme).

### Scope and development provenance

Design covers sizing and numerical optimization; Simulation covers simulator execution and electrical performance extraction. Conventional search and statistical methods do not establish runtime AI. Reviewed official documentation and canonical history do not establish qualifying AI-assisted implementation; no development label is assigned. [Workflow evidence](#source-documentation).
