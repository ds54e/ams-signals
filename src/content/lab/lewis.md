---
name: "Lewis"
aliases: []
description: "Python framework for stateful software simulations of hardware devices. Protocol adapters expose simulated device behavior through interfaces including TCP streams, Modbus and EPICS, allowing instrument-control software and test scripts to exercise command responses and failure conditions without physical equipment."
scope:
  test: { ai: false }
access: "GPL-3.0-or-later; requires device behavior definitions and protocol-specific dependencies."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/ISISComputingGroup/lewis"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/ISISComputingGroup/lewis/commit/1b2086d6ce5eda9a46c264067f3e6d66d15ac8cf"
  - id: windows-regression
    title: "Windows system-test portability"
    url: "https://github.com/ISISComputingGroup/lewis/commit/fa73d0714dd0d90eb6c3d571892343ff694a7ad1"
---

## Scope and limits

Lewis separates device state and behavior from the protocol-facing interface. Its virtual network endpoints support driver and system-test fixtures beyond the VISA-specific simulated backend workflow. Test Automation describes these executable device emulators, not physical instrument control or analog circuit simulation. Fidelity depends on the authored device model; it does not establish electrical or timing accuracy of the real hardware.

## Reviewed maintenance

November 2025 work makes system-test subprocesses use the active Python interpreter and adds Windows to the test matrix. August 2026 migrates stream, Modbus and EPICS adapter infrastructure to asyncio and adds stream-adapter tests. These are distinct compatibility and implementation changes despite a low commit cadence. [Windows regression](#source-windows-regression) · [Adapter migration](#source-activity).
