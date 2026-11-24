---
name: "libiio"
aliases: []
description: "Library and tools for controlling and streaming data from local or remote Industrial I/O devices. Contexts, channels and buffered I/O connect acquisition and signal generation applications to supported ADCs, DACs and board interfaces."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "The Zephyr ADC scale calculation and formatting repair carries an explicit AI assistance credit."
  sources: [activity, development-retained]
  reviewedAt: "2026-11-24"
access: "MIT, LGPL and GPL apply to different components; check the selected build."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://analogdevicesinc.github.io/libiio/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/analogdevicesinc/libiio"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/analogdevicesinc/libiio/commit/30d16e7c9549d1181d71e3c91232a8f7c2c629dd"
  - id: development-retained
    title: "Retained Zephyr ADC scale calculation"
    url: "https://github.com/analogdevicesinc/libiio/blob/081fd1380feb6fbfae106ef189a90a37b3fb3939/zephyr/drivers/iio_device/io_channels.c"
---

## Scope and limits

The reviewed Zephyr ADC scale repair follows v1.0.0. The v1 API and ABI have migration requirements, while separate legacy compatibility remains available. Correct scale formatting is not device calibration.

[Reviewed upstream implementation](#source-activity).
