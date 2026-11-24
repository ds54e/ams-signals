---
name: "probe-rs"
aliases: []
description: "Rust libraries and command-line tools for programming and debugging supported Arm, RISC-V and Xtensa devices. In addition to probe access, flash, reset and RTT, its on-target runner executes and reports tests built with the separate embedded-test harness."
scope:
  control: { ai: false }
  test: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited on serializing CMSIS-DAP requests for a supported micro:bit probe."
  sources: [activity, development-retained]
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
  - id: test-runner
    title: "Implemented on-target runner and test options"
    url: "https://github.com/probe-rs/probe-rs/blob/569e0d0db7f700f1d70fee31e326dc9ac85d8143/probe-rs-tools/src/bin/probe-rs/cmd/run.rs"
  - id: embedded-test
    title: "Target-side embedded-test harness"
    url: "https://github.com/probe-rs/embedded-test"
  - id: development-retained
    title: "Retained CMSIS-DAP micro:bit compatibility logic"
    url: "https://github.com/probe-rs/probe-rs/blob/569e0d0db7f700f1d70fee31e326dc9ac85d8143/probe-rs/src/probe/cmsisdap/tools.rs"
---

## Scope and limits

The reviewed CMSIS-DAP request fix follows v0.32.0. Reset cleanup can attempt release without proving physical release if transport fails. This is a distinct target and tooling ecosystem from the Arm-focused pyOCD.

[Reviewed upstream implementation](#source-activity).

Test Automation is grounded in the host runner registering test cases, executing them against the device and reporting results with the separate target harness. Generic debugger or flash scripting alone would not justify it. [Runner](#source-test-runner) · [Target harness](#source-embedded-test).
