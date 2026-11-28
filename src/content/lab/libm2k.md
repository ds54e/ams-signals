---
name: "libm2k"
aliases: ["ADALM2000 M2K"]
description: "Programming library for Analog Devices ADALM2000 analog and digital I/O, triggers and onboard supplies. It exposes live acquisition and stimulus APIs for bench automation; the reviewed implementation targets libiio v0.26 or older, so backend compatibility must be checked when assembling a measurement stack."
scope:
  control: { ai: false }
  acquisition: { ai: false }
access: "LGPL-2.1 family library; supported hardware is separate."
addedAt: "2026-11-24"
reviewedAt: "2026-11-28"
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
  - id: analog-acquisition
    title: "Retained ADALM2000 analog acquisition implementation"
    url: "https://github.com/analogdevicesinc/libm2k/blob/a4f6d8a87fc26acfd0b2a569ce2cfd182349d1e8/src/analog/m2kanalogin_impl.cpp"
---

## Scope and limits

The supply interface is not an SMU or a current-compliance measurement. Distinguish USB/buffer failure from a valid acquisition and check the hardware range.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.

The canonical README names libiio v0.26 or older and the libiio-v0 branch as its compatible API. The separately cataloged libiio default branch is not an automatic drop-in dependency for this revision. [Compatibility notice](#source-libiio-compatibility).

## November 28, 2026 implementation review

The ADALM2000 API implements sample acquisition and device-specific range and sample-rate configuration on top of IIO. This independently usable device API is distinct from libiio's generic context/channel transport and Scopy's desktop application. November 19 repairs acquisition/stimulus buffer retry handling: allocation is retried if the buffer pointer is null, and the cached sample count is updated only after creation succeeds. The retained implementation fixes a software retry failure, not physical capture fidelity, and the hardware and upstream suite were not independently exercised. [Analog acquisition](#source-analog-acquisition) · [Buffer correction](#source-activity).
