---
name: Gnucap
summary: Modular analog and mixed-signal circuit simulation with language and device plugins.
description: "Modular analog and mixed-signal circuit simulator with numerical analyses, device plugins and logic integration. Recent logic changes separate acceptance-queue handling from timestep review and move connection rules into the logic plugin; behavioral-model compilation is provided separately by Modelgen-Verilog, and Verilog-AMS support remains partial."
scope:
  simulation:
    ai: false
access: Public C++ source; build dependencies and additional model/language plugins follow the official project documentation.
addedAt: '2026-10-18'
reviewedAt: "2026-10-31"
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
- id: activity-reviewed-20261022
  title: Add arbitrary-order interpolation and measurement regressions
  url: https://codeberg.org/gnucap/gnucap/commit/31528ae729a537b2048794c29e7d3883123824e9
- id: website
  title: Official project website and documentation
  url: http://gnucap.org/
  purpose: official
- id: review-20261031-accept
  title: Logic acceptance queued from advance rather than review
  url: https://codeberg.org/gnucap/gnucap/commit/245d23a1ea370bd2addbe87f69dfe18dd2748a37
- id: review-20261031-connect
  title: Connection rules move into the logic plugin
  url: https://codeberg.org/gnucap/gnucap/commit/3504b93da546b4f497b26c5334b42f9642d30aee
---

### Implementation and boundaries

The numerical core and device/command plugins implement conventional Simulation. Partial Verilog-AMS support is not complete language conformance. The reviewed transmission-line fix updates TIME_PAIR access and adds a transient regression case, establishing meaningful technical maintenance. [Architecture](#source-readme) · [Device implementation](#source-implementation) · [Fix and test](#source-activity).

### Canonical activity

The official contribution guide points to Codeberg for project development. Its repository ID and actual default branch, `develop`, were verified directly and its complete first-parent UTC history was captured. The Savannah repository defaults to an older `master`; the GitHub project is a read-only mirror. Neither is substituted into this capture. [Host references](#source-hosting).

### Current implementation and activity

The October 22 implementation adds an interpolation-order argument and Neville-style evaluation, and updates measurement/waveform callers and regression fixtures. Its own notes retain an extrapolation limitation; this review does not turn the new numerical path into a general accuracy or language-conformance claim. [Reviewed implementation change](#source-activity-reviewed-20261022).

### Logic lifecycle and compiler relationship

The October 29 logic change moves q_accept calls from tr_review into advance/regress paths, separating acceptance-queue handling from timestep review. The following change moves connection rules into the logic plugin. These source changes extend the previously reviewed interpolation work; they do not establish complete Verilog-AMS execution or general PDK qualification. Behavioral compilation is separately implemented in Modelgen-Verilog, whose generated plugins require a compatible Gnucap tree. [Acceptance handling](#source-review-20261031-accept) · [Connection-rule change](#source-review-20261031-connect).

Canonical Codeberg develop history was recaptured directly. The manually meaningful checkpoint is the acceptance change, not mirror synchronization. No external PDK or circuit simulation was run for this update.
