---
name: "TICC"
aliases: ["TAPR Time Interval Counter"]
description: "Firmware for the TAPR time interval counter shield and Arduino Mega. It configures the TDC7200 measurement paths and streams time interval, period or timestamp data through a serial connection, with paired-channel and binary timestamp output for downstream stability analysis."
scope:
  control: { ai: false }
  acquisition: { ai: false }
access: "Public firmware; repository MIT license and BSD-2-Clause source headers differ. Requires the TAPR TICC shield and Arduino Mega."
addedAt: "2026-11-25"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/TAPR/TICC"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/TAPR/TICC/commit/3a716c3a61d29f275bc55544fcd67a0a1463efe0"
  - id: release-2025
    title: "December 2025 firmware release checkpoint"
    url: "https://github.com/TAPR/TICC/commit/c95ca994d76016ccd343cf3fbee1706a97dfb42b"
  - id: firmware
    title: "Reviewed timestamp and output implementation"
    url: "https://github.com/TAPR/TICC/blob/25adafebc603ebc511429f53c547951fa8999efd/TICC/TICC.ino"
  - id: changes
    title: "Mode descriptions and firmware release limitations"
    url: "https://github.com/TAPR/TICC/blob/25adafebc603ebc511429f53c547951fa8999efd/CHANGES.md"
  - id: related-ddmtd
    title: "GPSDO-PYNQ-Z2 multi-reference beat timestamp capture"
    url: "https://github.com/gallicchio/GPSDO-PYNQ-Z2/blob/e9a8cf672b9b81e043ad0ebc21af506e4cf04257/gateware/driver/dmtd.py"
---

## Scope and limits

The firmware configures and reads the attached counter hardware, including two-channel timestamp handling. Unlike a timing reference card or a numerical stability library, this is a measurement acquisition endpoint. Host-side analysis and the physical shield are separate. Timestamp representation and output precision do not establish measurement resolution, noise floor or calibration accuracy. Falling-edge triggering is documented as unreliable with the hardware. [Firmware](#source-firmware) · [Change history](#source-changes).

## Reviewed maintenance

The December 2025 release records rewritten timestamp handling, paired and binary timestamp modes and configuration changes. November 2026 work revises timestamp validity and the output gating path in the main sketch. The reviewed sketch identifies itself as beta firmware 20261102.1, rather than the finalized 20251215.1 release. The repository license and the sketch's license notice differ; review the applicable terms for each file before reuse. [Release checkpoint](#source-release-2025) · [Validity change](#source-activity).

## November 28, 2026 implementation review

The change history documents reduced decimal timestamp precision and configurable wrapping to mitigate host floating-point loss on long series. A decimal output step of 10 ps is representation precision, not a measured counter noise floor; wrapped records need an appropriate host reconstruction before stability estimation. GPSDO-PYNQ-Z2 instead compares multiple reference signals using beat-edge displacement and optional PPS cycle resolution. The two capture architectures are distinct and neither inherits the other's reported resolution or calibration. [Timestamp format](#source-changes) · [Related DDMTD driver](#source-related-ddmtd).
