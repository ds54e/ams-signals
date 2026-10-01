---
name: "cocotbext-ams"
aliases: ["cocotbext.ams"]
summary: "Open-source event-driven mixed-signal co-simulation bridge for cocotb with ngspice and Xyce."
description: "Connects cocotb-driven Verilog/VHDL simulation to SPICE blocks through ngspice or Xyce shared-library interfaces. Digital changes drive analog voltage sources and threshold or hysteresis crossings return events to the HDL side, providing a lightweight AMS co-simulation layer rather than a separate analog simulator."
scope:
  simulation:
    ai: false
access: "Python package and public source; requires cocotb plus ngspice or Xyce with the supported shared-library interface."
addedAt: "2026-09-14"
reviewedAt: "2026-09-14"
sources:
  - id: "code"
    title: "Canonical cocotbext-ams repository"
    url: "https://github.com/VLSIDA/cocotbext-ams"
    purpose: "code"
  - id: "readme"
    title: "Project README at the reviewed revision"
    url: "https://github.com/VLSIDA/cocotbext-ams/blob/c64ad5c8a5b0a7550243520ab5d08651306edf0d/README.md"
  - id: "activity"
    title: "Add Xyce simulator support behind SimulatorInterface abstraction"
    url: "https://github.com/VLSIDA/cocotbext-ams/commit/c64ad5c8a5b0a7550243520ab5d08651306edf0d"
---

### Co-simulation path

`AnalogBlock` and `MixedSignalBridge` coordinate analog blocks with a cocotb testbench. The implementation translates digital values into analog drives and translates analog threshold crossings back into event-driven digital observations. [Reviewed source](#source-readme).

### Backend boundary

The March 2026 update extracted a common simulator interface and added Xyce alongside ngspice. The project therefore supplies synchronization and conversion around real SPICE engines; it is not counted as a new device simulator or as AI-driven simulation. [Meaningful update](#source-activity).
