---
name: "Fixate"
aliases: []
description: "Python hardware-test framework combining instrument drivers, relay and multiplexer paths, measurement checks, operator interfaces and result logs. Bundled drivers retrieve readings from supported instruments, while test procedures switch fixture signals and record per-step outcomes."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  test: { ai: false }
access: "MIT; requires supported or custom instrument drivers and a configured physical test fixture."
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
  - id: acquisition-driver
    title: "Bundled Fluke DMM measurement and readout implementation"
    url: "https://github.com/PyFixate/Fixate/blob/657713fd5e7b0c416ad8c3293a4e8e1e3114823f/src/fixate/drivers/dmm/fluke_8846a.py"
---

## Scope and limits

In the reviewed v0.7.0 switching module, intended pin state can update before a failed hardware write. The same request can then be skipped. Define independent readback and reinitialization for physical fixtures.

[Reviewed upstream implementation](#source-activity).

Additional context: [Reviewed switching and reset implementation](#source-switching).

Relay and multiplexer routing is fixture Control; the framework provides runnable checks and records under Test. Its switch model is not itself a board design or a fabrication and assembly artifact.

Acquisition follows the bundled DMM driver's `measurement`, `measurements` and live SCPI readout methods, rather than a capability assumed from external test code. [Instrument readout](#source-acquisition-driver).
