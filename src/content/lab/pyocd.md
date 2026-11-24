---
name: "pyOCD"
aliases: []
description: "Python tools for programming and debugging supported Arm microcontrollers through a hardware probe. Flash programming, reset control, memory and register access and GDB integration can be used to provision and test evaluation-board firmware."
scope:
  control: { ai: false }
access: "Apache-2.0; target packs and flash algorithms may have separate conditions."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
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
---

## Scope and limits

The reviewed probe-lock recovery repair is present in v0.46.1. Flash command success, independent readback and functional test verdicts are separate outcomes.

[Reviewed upstream implementation](#source-activity).

Flash, reset and debugger operations provide Control; command scripting or use by an external test runner does not by itself supply an executable test workflow.
