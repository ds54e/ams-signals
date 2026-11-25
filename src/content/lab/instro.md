---
name: "Instro"
aliases: ["Nominal Instro"]
description: "Vendor-agnostic Python instrumentation library with typed instrument and driver interfaces, measurement and command publishers, and optional adapters for supported devices. A PyMeasure integration can publish property reads and writes to the same file or streaming destinations without requiring the Nominal service for local instrument operation."
scope:
  control: { ai: false }
  acquisition: { ai: false }
access: "Apache-2.0; physical operation requires compatible instruments and drivers. Nominal cloud publishing requires separate service access."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/nominal-io/instro"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/nominal-io/instro/commit/4aaaf15118c52b53fc1eb0f4d3010422d4821909"
  - id: earlier
    title: "August AWG sweep operations and regression cases"
    url: "https://github.com/nominal-io/instro/commit/a55974c1cbecc561e721440556dc2031dd3d0faa"
  - id: standalone
    title: "Optional Nominal dependency and local import correction"
    url: "https://github.com/nominal-io/instro/commit/7bd4b77bfbe599f6f4c820c31944134c40ea2cfe"
  - id: pymeasure
    title: "Retained command and measurement publishing adapter"
    url: "https://github.com/nominal-io/instro/blob/6fa91f45f5d178ab0013d9146143603e9df0a505/packages/instro-pymeasure/instro/pymeasure/wrapper.py"
  - id: driver
    title: "Retained experimental Fluke serial implementation"
    url: "https://github.com/nominal-io/instro/blob/6fa91f45f5d178ab0013d9146143603e9df0a505/packages/instro-unstable/instro/unstable/dmm/drivers/fluke_8808a.py"
---

## Scope and limits

Instro combines instrument-category interfaces with structured measurement and command publishers. It has its own drivers and can also wrap existing PyMeasure properties: reads publish measurements and writes publish command channels. The latter is an optional integration, not a second source of independent driver validation. Local operation does not require the Nominal service, and separate service dependencies apply to its cloud publishers. Neither ordinary driver unit tests nor publishing a reading establishes an independent Test or Analysis stage. [Publishing adapter](#source-pymeasure) · [Standalone operation](#source-standalone).

## Reviewed maintenance

August 2026 adds linear and logarithmic sweep configuration to the Keysight 33521B AWG driver with software and hardware test cases. November adds an experimental Fluke 8808A serial driver, including prompt errors, timeout recovery and software tests, and removes the mandatory Nominal package import. The experimental driver remains in the reviewed tree. Tests were inspected, not executed against hardware. [AWG sweep](#source-earlier) · [DMM integration](#source-activity) · [Retained driver](#source-driver).
