---
name: "Lewis"
aliases: []
description: "Python framework for stateful software simulations of hardware devices. Protocol adapters expose simulated device behavior through interfaces including TCP streams, Modbus and EPICS, allowing instrument-control software and test scripts to exercise command responses and failure conditions without physical equipment."
scope:
  test: { ai: false }
access: "GPL-3.0-or-later; requires device behavior definitions and protocol-specific dependencies."
addedAt: "2026-11-25"
reviewedAt: "2026-11-28"
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
  - id: device-state-machine
    title: "Retained Julabo state-machine device model"
    url: "https://github.com/ISISComputingGroup/lewis/blob/1b2086d6ce5eda9a46c264067f3e6d66d15ac8cf/lewis/devices/julabo/devices/device.py"
  - id: stream-adapter
    title: "Retained asynchronous network stream adapter"
    url: "https://github.com/ISISComputingGroup/lewis/blob/1b2086d6ce5eda9a46c264067f3e6d66d15ac8cf/lewis/adapters/stream.py"
  - id: related-visa-fixture
    title: "PyVISA-sim YAML property and response fixtures"
    url: "https://github.com/pyvisa/pyvisa-sim/blob/3132559456e32677139290b5d779d394045b89b2/pyvisa_sim/default.yaml"
---

## Scope and limits

Lewis separates device state and behavior from the protocol-facing interface. Its virtual network endpoints support driver and system-test fixtures beyond the VISA-specific simulated backend workflow. Test describes these executable device emulators, not physical instrument control or analog circuit simulation. Fidelity depends on the authored device model; it does not establish electrical or timing accuracy of the real hardware.

## Reviewed maintenance

November 2025 work makes system-test subprocesses use the active Python interpreter and adds Windows to the test matrix. August 2026 migrates stream, Modbus and EPICS adapter infrastructure to asyncio and adds stream-adapter tests. These are distinct compatibility and implementation changes despite a low commit cadence. [Windows regression](#source-windows-regression) · [Adapter migration](#source-activity).

## November 28, 2026 implementation review

The Julabo example declares circulating and noncirculating states with transitions driven by requested operation; its temperature ramp parameter is a guessed value. The stream adapter implements asynchronous request handling independently of the state machine. This enables network-facing device emulation rather than substituting a YAML-defined backend inside PyVISA. Both are reusable software-test fixtures, with different interfaces and model-authoring mechanisms. [Device model](#source-device-state-machine) · [Stream adapter](#source-stream-adapter) · [VISA fixtures](#source-related-visa-fixture).
