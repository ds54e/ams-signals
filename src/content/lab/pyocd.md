---
name: "pyOCD"
aliases: []
description: "Python tools for programming and debugging supported Arm microcontrollers through a hardware probe. Flash programming, reset control, memory and register access and GDB integration can be used to provision and test evaluation-board firmware."
scope:
  control: { ai: false }
access: "Apache-2.0; target packs and flash algorithms may have separate conditions."
addedAt: "2026-11-24"
reviewedAt: "2026-11-25"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://pyocd.io/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/pyocd/pyOCD"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/pyocd/pyOCD/commit/8d378fa08f384df1c77622479bd3b5cd9855cd0b"
  - id: reset-context-fix
    title: "October 29 isolate halt-on-reset state to the reset debug sequence"
    url: "https://github.com/pyocd/pyOCD/commit/20c2dbc5d6c9db5fe7f49f351a9e17ab1fc9ebdd"
  - id: reset-context-retained
    title: "Retained Cortex-M reset and halt state handling"
    url: "https://github.com/pyocd/pyOCD/blob/0ce0fbd201010d617d7a4e3582c39b8e8561e33d/pyocd/coresight/cortex_m.py"
  - id: related-probe-rs
    title: "Separate multi-architecture debugger and on-target test runner"
    url: "https://github.com/probe-rs/probe-rs"
---

## Scope and limits

The reviewed probe-lock recovery repair is present in v0.46.1. Flash command success, independent readback and functional test verdicts are separate outcomes.

[Reviewed upstream implementation](#source-activity).

Flash, reset and debugger operations provide Control; command scripting or use by an external test runner does not by itself supply an executable test workflow.

## Reviewed implementation update, November 25, 2026

October 29 corrects leakage of the halt-on-reset flag into unrelated debug sequences. The retained Cortex-M implementation sets the context flag around the reset sequence and clears it in a finally block; reset_and_halt likewise clears its private state after the reset attempt. This advances the saved October 27 probe-lock correction checkpoint, while November CI pinning remains raw activity. The Arm debug-sequence and target-pack workflow is a distinct control option alongside probe-rs, which also provides an on-target test runner. The pyOCD listing remains Control only; software state cleanup is not a guarantee that a failed physical reset or halt was completed. [Reset correction](#source-reset-context-fix) · [Retained implementation](#source-reset-context-retained) · [Related alternative](#source-related-probe-rs).

Source inspection only; no physical measurement, programming, service migration or upstream regression was independently executed.
