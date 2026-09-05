---
name: "Xyce"
aliases: []
summary: "Runs SPICE-compatible circuit analyses on serial and parallel platforms."
description: "Sandia-developed SPICE-compatible circuit simulator with parallel execution, DC, transient, AC, noise and harmonic-balance analyses, and compact-device models."
scope:
  simulation:
    level: core
    ai: false
access: "Public C++ implementation; build and solver-library requirements are documented by Sandia."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "site"
    title: "Official project documentation"
    url: "https://xyce.sandia.gov/"
    purpose: "official"
  - id: "code"
    title: "Canonical public source repository"
    url: "https://github.com/Xyce/Xyce"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed default-branch revision"
    url: "https://github.com/Xyce/Xyce/blob/24e13434180c40f32f16101f4e236819c9809f62/README.md"
  - id: "activity"
    title: "Reviewed substantive default-branch update"
    url: "https://github.com/Xyce/Xyce/commit/24e13434180c40f32f16101f4e236819c9809f62"
---

### Scope

Takes circuit netlists and device models into numerical analyses, including harmonic balance and sensitivity calculations. Simulation is core. Parallel execution is implemented through MPI and solver interfaces. [Project scope](#source-readme).

### Release boundary

The GitHub source is the open implementation; proprietary models supplied in some binary installers are not attributed to this tree. The project restarted its master history from the 7.9 release; activity uses only the current first-parent history, without grafting old_master. [Repository boundary](#source-readme).

### Scope classification

SPICE-compatible analyses, compact models and parallel circuit execution are the central user-facing capabilities. [Reviewed source](#source-readme).

Parallel SPICE-compatible analyses and compact-device evaluation are conventional Simulation. Parallel numerical algorithms do not imply AI. [AI/stage evidence](#source-readme).
