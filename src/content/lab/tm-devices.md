---
name: "tm_devices"
aliases: ["tm devices"]
description: "Python drivers and command APIs for supported Tektronix and Keithley instruments, built on PyVISA. It manages connections and exposes device-specific operations for oscilloscopes, generators, supplies, meters and source-measure units."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Cursor is co-credited for Python compatibility changes, including the retained wrapper that runs pylint with one worker on Python 3.15. This credit is separate from the AWG frequency calculation repair."
  sources: [ai-change, development-retained]
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
  - id: development-retained
    title: "Retained Python 3.15 pylint execution wrapper"
    url: "https://github.com/tektronix/tm_devices/blob/eb4969cd15795999b9184e679b1b65d847ac8e01/scripts/run_pylint.py"
---

## Scope and limits

The AWG calculation fix in v3.8.0 distinguishes waveform record length from samples per cycle and enforces hardware limits. A software frequency-setting check is not output jitter characterization.

[Reviewed upstream implementation](#source-activity).
