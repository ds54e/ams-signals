---
name: "Qucs-S"
aliases: []
summary: "Combines schematic editing, simulator setup and result visualization in a multi-backend circuit GUI."
description: "Qt GUI for schematic capture, circuit-analysis setup and result visualization using ngspice, Xyce, SpiceOpus or Qucsator backends. Current-branch net-name overlays and a Net Properties display help relate schematics to generated node names; available analyses and device support depend on the selected engine."
scope:
  design:
    ai: false
  simulation:
    ai: false
access: "GPL-2.0-or-later source and desktop packages; the Qt GUI requires the selected external simulation backend and appropriate device models for circuit analyses. Net-name overlays are reviewed current-branch work beyond stable 26.1.1."
addedAt: "2026-09-07"
reviewedAt: "2026-11-15"
sources:
  - id: "site"
    title: "Official Qucs-S overview and stable download channel"
    url: "https://ra3xdh.github.io/"
    purpose: "official"
  - id: "code"
    title: "Canonical Qucs-S repository"
    url: "https://github.com/ra3xdh/qucs_s"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed current-branch revision"
    url: "https://github.com/ra3xdh/qucs_s/blob/d13470fb87809a4e80f472a1a5aad002d69dac84/README.md"
  - id: "release"
    title: "Stable Qucs-S 26.1.1, April 26, 2026"
    url: "https://github.com/ra3xdh/qucs_s/releases/tag/26.1.1"
  - id: "continuous"
    title: "Continuous-build prerelease channel, reviewed October 1, 2026"
    url: "https://github.com/ra3xdh/qucs_s/releases/tag/continuous_build"
  - id: "validation-change"
    title: "Separate save validation from pre-simulation checks, September 1, 2026"
    url: "https://github.com/ra3xdh/qucs_s/commit/5ea551591772f4bb901d9f458ea5bf422b5caf03"
  - id: "activity"
    title: "Merge schematic-validation changes, September 4, 2026"
    url: "https://github.com/ra3xdh/qucs_s/commit/706ed127c56f3927e69fb9b3b038fa1e0e292ef6"
  - id: "monte-carlo"
    title: "Monte Carlo parameter variation and validation, September 13, 2026"
    url: "https://github.com/ra3xdh/qucs_s/commit/99848aaddd60f940b218ff788fbd76594758dc4e"
  - id: "activity-refresh"
    title: "Replace digital simulator wrapper scripts with QProcess, September 14, 2026"
    url: "https://github.com/ra3xdh/qucs_s/commit/e0c0e154edb4f8403d53c5c5601c2ee133c9e970"
  - id: "net-name-integration"
    title: "November 13 integration of net-name overlays and Net Properties display"
    url: "https://github.com/ra3xdh/qucs_s/commit/941b4b2a2774d5db581dfb3538c0b4f83165dcfc"
  - id: "net-name-implementation"
    title: "Retained net-name computation and drawing with GPL-2.0-or-later source header"
    url: "https://github.com/ra3xdh/qucs_s/blob/941b4b2a2774d5db581dfb3538c0b4f83165dcfc/qucs/schematic.cpp"
  - id: "license"
    title: "Qucs-S GNU General Public License version 2 text"
    url: "https://github.com/ra3xdh/qucs_s/blob/941b4b2a2774d5db581dfb3538c0b4f83165dcfc/COPYING"
---

### Implementation context

Qucs-S provides schematic capture, analysis setup, component libraries and result plots around ngspice, Xyce, SpiceOpus and Qucsator. The frontend integrates circuit editing and analysis across backends; it complements Xschem's custom-IC schematic/netlisting emphasis. Analyses and device support depend on the selected engine and models. [Official overview](#source-site); [reviewed README](#source-readme).

### Release boundary

Stable 26.1.1 was published April 26, 2026. At the October 1 review, `continuous_build` is the September 27 prerelease at `d13470fb87809a4e80f472a1a5aad002d69dac84`, not a newer stable release. Its latest translation update changes the raw activity date, not the meaningful implementation baseline. [Stable release](#source-release); [continuous channel](#source-continuous).

The September 1 implementation, merged September 4, applies structural checks on save while retaining full validation before simulation. This avoids demanding simulation blocks when editing subcircuits. It is later development/prerelease behavior beyond the stable release. [Implementation diff](#source-validation-change); [meaningful merge](#source-activity).

Later `current` merges add Monte Carlo parameter variation and validation, then replace HDL simulator shell/batch wrappers with QProcess stages and configurable Icarus/GHDL executables. These changes are development-branch behavior beyond stable 26.1.1. [Monte Carlo implementation](#source-monte-carlo); [simulation execution](#source-activity-refresh).

The November 15 review reconfirmed 26.1.1 as the latest stable release and inspected the November 13 `current` integration. It computes names for connected nets, draws overlays for otherwise unlabeled nets and exposes the corresponding name in Net Properties. This is implemented schematic inspection, not a new simulation engine or electrical-correctness guarantee, and is not claimed as shipped in 26.1.1. The November 13 integration is the new meaningful-activity checkpoint. [Integrated diff](#source-net-name-integration) · [Retained implementation](#source-net-name-implementation) · [Stable release](#source-release)

The checked source header grants GPL version 2 or later; the repository includes the GPL version 2 text. Backend executables and circuit/device models remain separate dependencies. [Source header](#source-net-name-implementation) · [License text](#source-license)

### Scope and development provenance

Design covers schematic editing; Simulation covers backend analysis orchestration and electrical result visualization. The project is a GUI over external engines. These conventional operations have no runtime AI prefix. Reviewed project/contribution documentation and reachable history do not establish qualifying AI-assisted implementation; no development label is assigned. [Project evidence](#source-readme).
