---
name: "Red Pitaya software"
aliases: ["Red Pitaya"]
description: "Platform software for Red Pitaya instruments, including signal generation, triggered acquisition, streaming and host APIs. It exposes board and FPGA functions for programmable measurements while keeping instrument calibration and hardware capabilities separate from the application interface."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
access: "Public platform software; BSD-3-Clause applies to specified components. Hardware disclosure and third-party terms differ."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://redpitaya.readthedocs.io/en/latest/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/RedPitaya/RedPitaya"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/RedPitaya/RedPitaya/commit/0f7954f385e03aeace207d398d7ac63dd3224f79"
  - id: implementation
    title: "Specific implementation reviewed"
    url: "https://github.com/RedPitaya/RedPitaya/commit/587db32e7df14287c36f6b74c633ec4e3ef52883"
  - id: release
    title: "Release 2026.1"
    url: "https://github.com/RedPitaya/RedPitaya/releases/tag/Release_2026.1"
  - id: calibration
    title: "Reviewed legacy calibration initialization"
    url: "https://github.com/RedPitaya/RedPitaya/blob/0e46d64396a57752bf97315789d6cc6c9fbddad8/rp-api/api-hw-calib/src/calib.cpp"
---

## Scope and limits

Release 2026.1 includes streaming and calibration work. Initialization can fall back to default calibration values for some invalid legacy records; success does not prove the origin or validity of device calibration.

[Reviewed upstream implementation](#source-implementation).

Additional context: [Release 2026.1](#source-release); [Reviewed legacy calibration initialization](#source-calibration).
