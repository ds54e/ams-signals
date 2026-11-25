---
name: "Time Card"
aliases: []
description: "GNSS-referenced timing card design and software, with clock selection, counters, pulse-per-second inputs and timestamp capture. The project documents FPGA and driver interfaces for disciplined time and frequency references used by hosts and measurement systems."
scope:
  board: { ai: false }
  control: { ai: false }
  acquisition: { ai: false }
access: "Public implementations under component-specific terms; production bitstreams have separate terms."
addedAt: "2026-11-24"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/Time-Appliances-Project/Time-Card"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/Time-Appliances-Project/Time-Card/commit/fbb5f33be7117613cc4557390c869ad7ec2bd9cc"
  - id: bitstream-terms
    title: "Production FPGA bitstream terms"
    url: "https://github.com/Time-Appliances-Project/Time-Card/blob/af8becdae503f80ac8f74a5c6f207cf1b894852b/FPGA/Binary/Production/Binaries/LICENSE.md"
  - id: serial-session-integration
    title: "September 5 native macOS serial session implementation"
    url: "https://github.com/Time-Appliances-Project/Time-Card/commit/b5f54a2323496d189119383948cc8cdfc493080c"
  - id: serial-session-tests
    title: "Retained serial-session regression implementation"
    url: "https://github.com/Time-Appliances-Project/Time-Card/blob/af8becdae503f80ac8f74a5c6f207cf1b894852b/DRV/MacOS/Tests/SerialSessionTests.swift"
  - id: production-image-8011
    title: "November 19 published production LitePCIe image update"
    url: "https://github.com/Time-Appliances-Project/Time-Card/commit/af8becdae503f80ac8f74a5c6f207cf1b894852b"
  - id: image-notes
    title: "Image IDs, hashes, flash layout and fallback limits"
    url: "https://github.com/Time-Appliances-Project/Time-Card/blob/af8becdae503f80ac8f74a5c6f207cf1b894852b/FPGA/Binary/Production/Binaries/LitePCIe/README.md"
---

## Scope and limits

Configuration readback is distinct from active clock selection, lock and settling. A production image update does not establish reproducible HDL equivalence, and this is not a close-in phase-noise analyzer.

[Reviewed upstream implementation](#source-activity).

Additional context: [Production FPGA bitstream terms](#source-bitstream-terms).

## Reviewed implementation and retention, November 25, 2026

September 5 adds persistent native macOS serial sessions, including session state, reviewed transmission requests and tests. This is host-side control implementation and is the selected meaningful source checkpoint, still on the same date as the earlier saved checkpoint. November 19 publishes production LitePCIe image 0x8011; the accompanying documentation attributes a warm-restart fallback issue to SPI flash data capture on the rising configuration-clock edge and describes a falling-edge capture correction. The published files include updated binary images, image identifiers and hashes, not the source implementation of that change. A successfully configured but malfunctioning update image does not trigger the documented configuration-error fallback. The binary release is useful deployment evidence but does not advance the source implementation checkpoint or establish a reproducible build, measured timing performance or a tested recovery guarantee. [Serial implementation](#source-serial-session-integration) · [Tests](#source-serial-session-tests) · [Image update](#source-production-image-8011) · [Image documentation](#source-image-notes).
