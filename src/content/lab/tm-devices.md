---
name: "tm_devices"
aliases: ["tm devices"]
description: "Python drivers and command APIs for supported Tektronix and Keithley instruments, built on PyVISA. It manages connections and exposes device-specific operations for oscilloscopes, generators, supplies, meters and source-measure units."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Cursor is credited on Python compatibility and executable code changes, not on the separate AWG frequency calculation repair."
  sources: [ai-change]
  reviewedAt: "2026-11-24"
access: "Apache-2.0; supported models require a compatible VISA backend and instrument firmware."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://tm-devices.readthedocs.io/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/tektronix/tm_devices"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/tektronix/tm_devices/commit/730214258a49eca4eb213ee70d2b43a19de70aae"
  - id: ai-change
    title: "Credited executable implementation change"
    url: "https://github.com/tektronix/tm_devices/commit/61af41a2c49560c6363c5d32d63aafa30189517e"
---

## Scope and limits

The AWG calculation fix in v3.8.0 distinguishes waveform record length from samples per cycle and enforces hardware limits. A software frequency-setting check is not output jitter characterization.

[Reviewed upstream implementation](#source-activity).
