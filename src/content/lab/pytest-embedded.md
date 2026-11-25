---
name: "pytest-embedded"
aliases: []
description: "Pytest plugins for testing embedded devices through selectable services. Serial and device-specific services support communication and programming, while DUT expectations and test reporting exercise firmware against physical targets or supported emulators."
scope:
  control: { ai: false }
  test: { ai: false }
access: "Package-specific license terms; physical testing requires supported boards and interfaces."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: website
    title: "Project documentation"
    url: "https://docs.espressif.com/projects/pytest-embedded/en/latest/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/espressif/pytest-embedded"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/espressif/pytest-embedded/commit/889d61fbe0bb1879c1ee9d39eff5cfa7c9970e2f"
  - id: virtual-targets
    title: "Emulator service extensions"
    url: "https://github.com/espressif/pytest-embedded/commit/2633b0140c7707224235e4da3db582af1740d8d7"
  - id: serial-selection
    title: "Physical serial port selection correction"
    url: "https://github.com/espressif/pytest-embedded/commit/18a94744dbed019de43322f3be291a53c83342ce"
---

## Scope and limits

This is an embedded firmware/DUT test runner with service-selected interfaces and executable expectations, distinct from labgrid's resource and remote-fixture coordination. Serial output consumed by test expectations is part of the test workflow, not an independent measurement acquisition operation. Emulator tests do not validate physical electrical behavior.

## Reviewed maintenance

September 2026 extends the virtual ESP target service with flash and eFuse image handling and additional control operations. November 2026 preserves USB-first serial-port selection and adds optional relative application paths to JUnit results with regression tests. The virtual service is not evidence of physical target support. [Virtual target integration](#source-virtual-targets) · [Serial selection](#source-serial-selection) · [JUnit integration](#source-activity).
