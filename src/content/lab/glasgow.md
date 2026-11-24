---
name: "Glasgow"
aliases: ["Glasgow Interface Explorer"]
description: "Programmable digital interface for board bring-up and instrument-style access to hardware. Its FPGA and host applets drive and capture supported interfaces, including I2C and SPI, with configurable I/O banks and protocol-specific behavior."
scope:
  board: { ai: false }
  control: { ai: false }
  acquisition: { ai: false }
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
---

## Scope and limits

Observe the board and applet voltage and timing limits. Protocol bring-up is not a substitute for high-bandwidth analog waveform acquisition.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.
