---
name: "Glasgow"
aliases: ["Glasgow Interface Explorer"]
description: "Programmable digital interface for board bring-up and hardware access, with public board designs and FPGA/host applets for driving and capturing supported interfaces. A hardware self-test applet checks I/O paths, voltage readback and USB loopback and reports failures."
scope:
  board: { ai: false }
  control: { ai: false }
  acquisition: { ai: false }
  test: { ai: false }
access: "Public hardware and software; see the project for component-specific terms."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Project documentation"
    url: "https://glasgow-embedded.org/"
    purpose: official
  - id: code
    title: "Canonical project source"
    url: "https://github.com/GlasgowEmbedded/glasgow"
    purpose: code
  - id: activity
    title: "Reviewed implementation or test change"
    url: "https://github.com/GlasgowEmbedded/glasgow/commit/208f01f21e1d0fa71b52965910592a3ab6363cc7"
  - id: board-designs
    title: "Published hardware designs and revisions"
    url: "https://github.com/GlasgowEmbedded/glasgow/tree/aca0361b770297ab606442bf972c230fd2176711/hardware/boards"
  - id: hardware-selftest
    title: "Executable I/O, voltage and USB hardware diagnostics"
    url: "https://github.com/GlasgowEmbedded/glasgow/blob/aca0361b770297ab606442bf972c230fd2176711/software/glasgow/applet/internal/selftest/__init__.py"
---

## Scope and limits

Observe the board and applet voltage and timing limits. Protocol bring-up is not a substitute for high-bandwidth analog waveform acquisition.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.

Board coverage follows the published schematics and layouts. Test Automation follows the hardware self-test applet, which drives and measures physical paths, applies voltage tolerances and raises a failed-test result. Modes have explicit wiring and hardware-revision requirements; this evidence is distinct from the repository's software unit tests. [Board designs](#source-board-designs) · [Hardware self-test](#source-hardware-selftest).
