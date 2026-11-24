---
name: "PeakRDL-python"
aliases: []
description: "Generates Python register access layers and tests from SystemRDL definitions, with synchronous and asynchronous callbacks and a development simulator. Field helpers can control whether an access reads hardware before writing, connecting register specifications to test scripts and device interfaces."
scope:
  verification: { ai: false }
access: "LGPL; distinguish the copied runtime library from generated project-specific definitions."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://peakrdl-python.readthedocs.io/en/stable/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/krcb197/PeakRDL-python"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/krcb197/PeakRDL-python/commit/dfa195780f365fb08bd0dce523bfc33a17713b34"
  - id: release
    title: "Public v4.0.0"
    url: "https://github.com/krcb197/PeakRDL-python/releases/tag/4.0.0"
  - id: pyftdi
    title: "Related FTDI transport for device access"
    url: "https://github.com/eblot/pyftdi"
---

## Scope and limits

Version 4.0.0 adds explicit write paths without implicit reads. The initial state supplied by a caller is not hardware readback; read-clear and write-to-clear semantics need intentional handling. Its development simulator does not verify RTL or bus electrical timing.

[Reviewed upstream implementation](#source-activity).

Additional context: [Public v4.0.0](#source-release); [Related FTDI transport for device access](#source-pyftdi).
