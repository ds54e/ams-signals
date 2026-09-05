---
name: "ngspice"
aliases: []
roles: ["eda-tool"]
summary: "Simulates circuit netlists with SPICE analyses and device models."
description: "Open-source SPICE circuit simulator for DC, transient, AC, noise and device-model analysis in analog and custom-IC workflows."
flow: {"simulation":"core"}
access: "Upstream source and releases are distributed through SourceForge; device libraries and model parameters are provided separately."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "site"
    title: "Official ngspice project"
    url: "https://ngspice.sourceforge.io/"
    purpose: "official"
  - id: "code"
    title: "Canonical upstream SourceForge repository"
    url: "https://sourceforge.net/p/ngspice/ngspice/ci/master/tree/"
    purpose: "code"
  - id: "release"
    title: "ngspice 47 release announcement, August 11, 2026"
    url: "https://ngspice.sourceforge.io/news.html"
  - id: "development"
    title: "Official upstream Git access and branch information"
    url: "https://ngspice.sourceforge.io/gitaccess.html"
---

### Scope

Takes circuit netlists and device models into numerical circuit analyses, returning voltages, currents, noise and other measurements. Simulation is core. Schematic entry and optimization are separate tools. [Project overview](#source-site).

### Release boundary

The canonical distribution and source history are on SourceForge. The source-backed public update is the August 11 ngspice 47 release, with device-model, code-model noise and periodic-state changes. It is not a GitHub mirror's timestamp or a version-number-only commit. No synthetic GitHub strip is shown. [Substantive release](#source-release) and [upstream access](#source-development).

### Flow scope

DC, transient, AC, noise and compact-model analysis are the simulator's central operations. Upstream releases remain source-backed activity, not inferred repository history. [Reviewed source](#source-site).
