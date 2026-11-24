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
reviewedAt: "2026-11-24"
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
---

## Scope and limits

Configuration readback is distinct from active clock selection, lock and settling. A production image update does not establish reproducible HDL equivalence, and this is not a close-in phase-noise analyzer.

[Reviewed upstream implementation](#source-activity).

Additional context: [Production FPGA bitstream terms](#source-bitstream-terms).
