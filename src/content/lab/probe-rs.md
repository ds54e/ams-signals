---
name: "probe-rs"
aliases: []
description: "Rust libraries and command-line tools for programming and debugging supported Arm, RISC-V and Xtensa devices. Probe access, flash programming, reset and RTT logging can be used in automated evaluation-board firmware workflows."
scope:
  control: { ai: false }
  test: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited on serializing CMSIS-DAP requests for a supported micro:bit probe."
  sources: [activity]
  reviewedAt: "2026-11-24"
access: "MIT or Apache-2.0; supported hardware depends on target and probe."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://probe.rs/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/probe-rs/probe-rs"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/probe-rs/probe-rs/commit/02d10bdec3891bcf0b469286ee706440f0b1ad20"
---

## Scope and limits

The reviewed CMSIS-DAP request fix follows v0.32.0. Reset cleanup can attempt release without proving physical release if transport fails. This is a distinct target and tooling ecosystem from the Arm-focused pyOCD.

[Reviewed upstream implementation](#source-activity).
