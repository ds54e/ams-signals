---
name: "PyFtdi"
aliases: []
description: "Python access to I²C, SPI, GPIO and UART through supported FTDI adapters. It connects register-oriented device and board-control scripts to USB-attached interfaces for tasks such as configuration, readback and reset."
scope:
  control: { ai: false }
access: "BSD-3-Clause; requires supported FTDI hardware and appropriate wiring."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://eblot.github.io/pyftdi/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/eblot/pyftdi"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/eblot/pyftdi/commit/25d77b02960dd42c018ac7c463b6a5500b95b5b6"
  - id: implementation
    title: "Specific implementation reviewed"
    url: "https://github.com/eblot/pyftdi/commit/7a0bf11a27f606d1c5813d0783ce88c1db371262"
  - id: register-access
    title: "Related SystemRDL-generated access layer"
    url: "https://github.com/krcb197/PeakRDL-python"
  - id: maintenance-earlier
    title: "August 2025 I2C output-direction correction"
    url: "https://github.com/eblot/pyftdi/commit/104bfe699e625fc92d6dc4579513aff21f83f017"
---

## Scope and limits

Supported electrical behavior depends on the FTDI model and wiring. USB latency and hardware limitations prevent using ordinary host requests as precisely timed acquisition triggers.

[Reviewed upstream implementation](#source-implementation).

Additional context: [Related SystemRDL-generated access layer](#source-register-access).

## Reviewed maintenance

The August 2025 I²C correction restores output-direction bits in the fake-tristate path. June 2026 maintenance adds FT4232HP EEPROM properties and corresponding virtual-device and USB fixtures. The merged `main` changes show intermittent device-compatibility work on the established implementation. [I²C correction](#source-maintenance-earlier) · [FT4232HP integration](#source-activity).
