---
name: "Fixate"
aliases: []
description: "Python hardware-test framework connecting instrument drivers, named relay and multiplexer paths, measurement checks, operator interfaces and result logs. It supports fixture-based test procedures that need to switch signals and record per-step outcomes."
scope:
  board: { ai: false }
  control: { ai: false }
  test: { ai: false }
access: "MIT; drivers and physical test fixtures must be supplied and configured."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/PyFixate/Fixate"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/PyFixate/Fixate/commit/3f86e4e64772ae04971283c4979ea84355febd00"
  - id: switching
    title: "Reviewed switching and reset implementation"
    url: "https://github.com/PyFixate/Fixate/blob/657713fd5e7b0c416ad8c3293a4e8e1e3114823f/src/fixate/_switching.py"
---

## Scope and limits

In the reviewed v0.7.0 switching module, intended pin state can update before a failed hardware write. The same request can then be skipped. Define independent readback and reinitialization for physical fixtures.

[Reviewed upstream implementation](#source-activity).

Additional context: [Reviewed switching and reset implementation](#source-switching).
