---
name: "PyICe"
aliases: ["Python Instrument Control"]
description: "Python framework for bench instrument and IC register access through a common channel abstraction. It combines electrical measurements, DUT register reads and writes, logging and test evaluation, with register-map imports for supported I2C and SPI interfaces."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  test: { ai: false }
access: "Apache-2.0; physical measurements require supported instruments and DUT interfaces."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: website
    title: "Project documentation"
    url: "https://pyice-adi.github.io/PyICe/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/PyICe-ADI/PyICe"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/PyICe-ADI/PyICe/commit/f8948068758196b3cbc549917f096416327bb697"
  - id: register-presets
    title: "Signed preset implementation and tests"
    url: "https://github.com/PyICe-ADI/PyICe/commit/a2a8ec983c533306de0d703f4b4809fd31cf4f38"
  - id: compatibility
    title: "Python 3.9 test runner compatibility"
    url: "https://github.com/PyICe-ADI/PyICe/commit/c5a8f230d4a05b5c8c364901aca9a576dac275a4"
---

## Scope and limits

The channel abstraction covers bench equipment and physical IC register access in a shared test workflow. Unlike a generic instrument transport, register values can be read, written and recorded alongside external conditions. The test framework evaluates measurement results against declared limits. Logging and in-procedure evaluation do not alone establish a separate offline Analysis stage. Host-side coordination does not guarantee hardware-timed alignment, calibrated accuracy or a particular register-map format's complete support.

## Reviewed maintenance

The October 16, 2026 integration implements signed preset encoding and range checks for integer channels, including regression cases and register-map import handling. October 20 integrates test-result summary changes. November 20 repairs the Python 3.9 CI runner configuration rather than dropping that tested version. [Register presets](#source-register-presets) · [Test-result integration](#source-activity) · [Compatibility maintenance](#source-compatibility).
