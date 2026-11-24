---
name: "libm2k"
aliases: ["ADALM2000 M2K"]
description: "Programming library for Analog Devices ADALM2000 analog and digital I/O, triggers and onboard supplies. It exposes live acquisition and stimulus APIs for bench automation; the reviewed implementation targets libiio v0.26 or older, so backend compatibility must be checked when assembling a measurement stack."
scope:
  control: { ai: false }
  acquisition: { ai: false }
access: "LGPL-2.1 family library; supported hardware is separate."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Project documentation"
    url: "https://analogdevicesinc.github.io/libm2k/"
    purpose: official
  - id: code
    title: "Canonical project source"
    url: "https://github.com/analogdevicesinc/libm2k"
    purpose: code
  - id: activity
    title: "Reviewed implementation or test change"
    url: "https://github.com/analogdevicesinc/libm2k/commit/a4f6d8a87fc26acfd0b2a569ce2cfd182349d1e8"
  - id: libiio-compatibility
    title: "Canonical libiio-v0 compatibility notice"
    url: "https://github.com/analogdevicesinc/libm2k/blob/a4f6d8a87fc26acfd0b2a569ce2cfd182349d1e8/README.md"
---

## Scope and limits

The supply interface is not an SMU or a current-compliance measurement. Distinguish USB/buffer failure from a valid acquisition and check the hardware range.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.

The canonical README names libiio v0.26 or older and the libiio-v0 branch as its compatible API. The separately cataloged libiio default branch is not an automatic drop-in dependency for this revision. [Compatibility notice](#source-libiio-compatibility).
