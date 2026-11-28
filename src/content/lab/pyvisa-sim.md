---
name: "PyVISA-sim"
aliases: []
description: "VISA simulation backend for developing and testing Python instrument drivers. YAML definitions supply dialogues, stateful properties, byte responses and error registers so command handling can be exercised without access to the physical instrument."
scope:
  test: { ai: false }
access: "MIT; runs without a physical instrument."
addedAt: "2026-11-24"
reviewedAt: "2026-11-28"
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
  - id: maintenance-earlier
    title: "June 2026 byte-response newline correction and regression"
    url: "https://github.com/pyvisa/pyvisa-sim/commit/4f3ff2460cc98dc76abf80094503a153ead99735"
  - id: virtual-device
    title: "Retained simulated VISA device error and response handling"
    url: "https://github.com/pyvisa/pyvisa-sim/blob/3132559456e32677139290b5d779d394045b89b2/pyvisa_sim/devices.py"
  - id: virtual-definitions
    title: "Retained YAML dialogue and property fixtures"
    url: "https://github.com/pyvisa/pyvisa-sim/blob/3132559456e32677139290b5d779d394045b89b2/pyvisa_sim/default.yaml"
  - id: related-lewis
    title: "Lewis state-machine device example"
    url: "https://github.com/ISISComputingGroup/lewis/blob/1b2086d6ce5eda9a46c264067f3e6d66d15ac8cf/lewis/devices/julabo/devices/device.py"
---

## Scope and limits

The reviewed main branch rejects unknown resources more explicitly, but not every invalid-session path uses the same exception convention. Virtual responses do not model aperture, settling or real instrument noise.

[Reviewed upstream implementation](#source-activity).

Test covers simulated command fixtures for driver regressions. The backend responds to instrument commands without setting a physical instrument, unlike the real VISA backends.

## Reviewed maintenance

June 2026 maintenance fixes newline handling inside `BYTES(...)` response definitions and adds a regression. October changes route supported error results through PyVISA's exception-handling convention, with backend tests. These separate corrections support ongoing maintenance despite the later history containing frequent automated configuration updates. [Byte-response correction](#source-maintenance-earlier) · [Error-handling integration](#source-activity).

## November 28, 2026 implementation review

The YAML fixture supports command/reply dialogues, typed property limits, error queues and status registers in a VISA backend. Lewis instead supplies user-authored Python device state machines with protocol adapters. Keep the VISA driver-regression fixture and protocol-facing behavioral emulator separate; neither reproduces real analog noise or instrument calibration. [YAML fixtures](#source-virtual-definitions) · [Device implementation](#source-virtual-device) · [Lewis example](#source-related-lewis).
