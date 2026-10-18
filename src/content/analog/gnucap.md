---
name: Gnucap
summary: Modular analog and mixed-signal circuit simulation with language and device plugins.
description: Modular analog and mixed-signal circuit simulator with a numerical core and plugins for devices, languages and simulation commands. Its public development tree includes SPICE-oriented analyses and logic integration, while Verilog-AMS support remains partial and depends on the selected plugin collection.
scope:
  simulation:
    ai: false
access: Public C++ source; build dependencies and additional model/language plugins follow the official project documentation.
addedAt: '2026-10-18'
reviewedAt: '2026-10-18'
sources:
- id: code
  title: Canonical Gnucap Codeberg repository
  url: https://codeberg.org/gnucap/gnucap
  purpose: code
- id: readme
  title: Project architecture and language boundary
  url: https://codeberg.org/gnucap/gnucap/src/commit/2efebaa0df0bfc390bf90743a2b85c28401a1490/README
- id: hosting
  title: Official contribution and host references
  url: https://codeberg.org/gnucap/gnucap/src/commit/2efebaa0df0bfc390bf90743a2b85c28401a1490/CONTRIBUTE
- id: implementation
  title: Transmission-line simulation implementation
  url: https://codeberg.org/gnucap/gnucap/src/commit/2efebaa0df0bfc390bf90743a2b85c28401a1490/devices/d_trln.cc
- id: activity
  title: Transmission-line time-pair correction and regression test
  url: https://codeberg.org/gnucap/gnucap/commit/2efebaa0df0bfc390bf90743a2b85c28401a1490
---

### Implementation and boundaries

The numerical core and device/command plugins implement conventional Simulation. Partial Verilog-AMS support is not complete language conformance. The reviewed transmission-line fix updates TIME_PAIR access and adds a transient regression case, establishing meaningful technical maintenance. [Architecture](#source-readme) · [Device implementation](#source-implementation) · [Fix and test](#source-activity).

### Canonical activity

The official contribution guide points to Codeberg for project development. Its repository ID and actual default branch, `develop`, were verified directly and its complete first-parent UTC history was captured. The Savannah repository defaults to an older `master`; the GitHub project is a read-only mirror. Neither is substituted into this capture. [Host references](#source-hosting).
