---
name: "ngspice"
aliases: []
summary: "Simulates circuit netlists with SPICE analyses and device models."
description: "Open-source SPICE circuit simulator for DC, transient, AC, noise and device-model analysis in analog and custom-IC workflows. It takes circuit netlists and model parameters and returns voltages, currents and other electrical quantities as plots or data files."
scope:
  simulation:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Fable 5 is credited on the E-178 diode-noise repair incorporated into upstream ngspice. The retained code initializes sidewall noise slots when no sidewall model is present."
  sources: ["development-origin", "development-upstream", "development-retained"]
  reviewedAt: '2026-10-18'
access: "Upstream source and releases are distributed through SourceForge; device libraries and model parameters are provided separately."
addedAt: "2026-09-05"
reviewedAt: "2026-10-18"
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
  - id: "development-origin"
    title: "Claude-credited origin of E-178 diode-noise repair"
    url: "https://github.com/javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements/commit/72834e00e96bb6d613c568f5fb3b2cbc5e9656a0"
  - id: "development-upstream"
    title: "Upstream E-178 diode-noise integration"
    url: "https://sourceforge.net/p/ngspice/ngspice/ci/c74935eeb773325e6500ec29d741ab8eb926b80a/"
  - id: "development-retained"
    title: "Retained upstream diode-noise implementation"
    url: "https://sourceforge.net/p/ngspice/ngspice/ci/a80f6e3e95d51534905b1f23410a951802666656/tree/src/spicelib/devices/dio/dionoise.c"
---

### Scope

Takes circuit netlists and device models into numerical circuit analyses, returning voltages, currents, noise and other measurements. These are Simulation operations. Schematic entry and optimization are separate tools. [Project overview](#source-site).

### Release boundary

The canonical distribution and source history are on SourceForge. The source-backed public update is the August 11 ngspice 47 release, with device-model, code-model noise and periodic-state changes. It is not a GitHub mirror's timestamp or a version-number-only commit. No synthetic GitHub strip is shown. [Substantive release](#source-release) and [upstream access](#source-development).

### Scope classification

DC, transient, AC, noise and compact-model analysis are the simulator's central operations. Upstream releases remain source-backed activity, not inferred repository history. [Reviewed source](#source-site).

Numerical circuit analysis is conventional Simulation. The source-backed release date remains separate from repository history, and no runtime AI is inferred. [AI/stage evidence](#source-site).

### Development provenance

Claude Fable 5 is credited on the E-178 diode-noise repair incorporated into upstream ngspice. The retained code initializes sidewall noise slots when no sidewall model is present. [Claude-credited origin of E-178 diode-noise repair](#source-development-origin) · [Upstream E-178 diode-noise integration](#source-development-upstream) · [Retained upstream diode-noise implementation](#source-development-retained).
