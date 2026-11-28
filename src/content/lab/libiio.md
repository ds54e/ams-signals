---
name: "libiio"
aliases: []
description: "Library and tools for controlling and streaming data from local or remote Industrial I/O devices. Contexts, channels and buffered I/O connect applications to supported ADCs, DACs and board interfaces; the reviewed main also exposes firmware upload and status operations for devices implementing the kernel interface."
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
reviewedAt: "2026-11-28"
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
  - id: pyadi-iio
    title: "Related device-specific Python interfaces on libiio"
    url: "https://github.com/analogdevicesinc/pyadi-iio/blob/4870d1f43c195e8483ac11a47cb8e51a3a1fafff/README.md"
  - id: review-20261128-activity
    title: "November 27 C# firmware upload bindings"
    url: "https://github.com/analogdevicesinc/libiio/commit/e6064c815710edce1f0870c401f96de2d12f9840"
  - id: review-20261128-fwu
    title: "C firmware upload interface and status/error handling"
    url: "https://github.com/analogdevicesinc/libiio/commit/a1d4450e675e8ab3c27041b8a18e6d155274bdea"
  - id: review-20261128-fwu-tests
    title: "EMU fixture API regression tests"
    url: "https://github.com/analogdevicesinc/libiio/commit/3526037fae4a26c99404b0b00ef23dee26b3cac7"
  - id: review-20261128-python
    title: "Python firmware upload interface"
    url: "https://github.com/analogdevicesinc/libiio/commit/8710d4aba42de9abe48d33ca4518b54a02fddae2"
  - id: review-20261128-cpp
    title: "C++ firmware upload interface"
    url: "https://github.com/analogdevicesinc/libiio/commit/4603df532c8a5bfba18e2e874c6063b6241348c4"
---

## Scope and limits

The reviewed Zephyr ADC scale repair follows v1.0.0. The v1 API and ABI have migration requirements, while separate legacy compatibility remains available. Correct scale formatting is not device calibration.

[Reviewed upstream implementation](#source-activity).

## Related workflow

The related [pyadi-iio](#source-pyadi-iio) provides device-specific settings and acquisition interfaces above libiio. The generic transport and the part-specific operations are separate workflows; neither the coverage nor compatibility of every device class with a particular libiio revision is established by the shared dependency.

### November 28, 2026 source review

November 27 adds enumeration, image handoff, waiting, status and cancellation for IIO devices exposing kernel firmware upload instances, along with local, remote protocol and emulation paths. Python, C++ and C# bindings expose the operation. The EMU regression fixture checks enumeration, XML, invalid arguments, waiting, cancellation and device error mapping. This is a substantive Control extension, not generic flashing support for every IIO device or proof of hardware programming reliability. The change is on reviewed main, not a tagged-release claim; tests and hardware were not independently exercised. [C API](#source-review-20261128-fwu) · [Tests](#source-review-20261128-fwu-tests) · [Python](#source-review-20261128-python) · [C++](#source-review-20261128-cpp) · [C#](#source-review-20261128-activity).
