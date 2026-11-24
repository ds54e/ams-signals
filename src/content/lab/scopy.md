---
name: "Scopy"
aliases: ["ADALM2000 M2K"]
description: "Desktop instrument suite for supported Analog Devices hardware. Its graphical tools combine acquisition, waveform inspection and device control; ADALM2000 functionality uses libm2k and is not an independent measurement backend."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
access: "GPL-3.0 family application; plugin and instrument requirements vary."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Project documentation"
    url: "https://analogdevicesinc.github.io/scopy/"
    purpose: official
  - id: code
    title: "Canonical project source"
    url: "https://github.com/analogdevicesinc/scopy"
    purpose: code
  - id: activity
    title: "Reviewed implementation or test change"
    url: "https://github.com/analogdevicesinc/scopy/commit/b26aeea11227f3a3f301d960fbe9b70aed7dce7e"
  - id: libm2k
    title: "libm2k instrument API"
    url: "https://github.com/analogdevicesinc/libm2k"
---

## Scope and limits

Scopy and the [libm2k API](#source-libm2k) serve different users but share an instrument stack. Disconnected and output-off-confirmed are distinct states.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.
