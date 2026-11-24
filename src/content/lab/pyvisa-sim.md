---
name: "PyVISA-sim"
aliases: []
description: "VISA simulation backend for developing and testing Python instrument drivers. YAML definitions supply dialogues, stateful properties, byte responses and error registers so command handling can be exercised without access to the physical instrument."
scope:
  test: { ai: false }
access: "MIT; runs without a physical instrument."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://pyvisa-sim.readthedocs.io/en/latest/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/pyvisa/pyvisa-sim"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/pyvisa/pyvisa-sim/commit/aea284b00a1c1b4eac8d9e1cb78a54ec21c84a89"
---

## Scope and limits

The reviewed main branch rejects unknown resources more explicitly, but not every invalid-session path uses the same exception convention. Virtual responses do not model aperture, settling or real instrument noise.

[Reviewed upstream implementation](#source-activity).

Test Automation covers simulated command fixtures for driver regressions. The backend responds to instrument commands without setting a physical instrument, unlike the real VISA backends.
