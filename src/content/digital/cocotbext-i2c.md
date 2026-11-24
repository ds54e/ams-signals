---
name: "cocotbext-i2c"
aliases: []
description: "Cocotb I2C models provide master transactions, subclassable device callbacks and an EEPROM-style memory for Verilog/SystemVerilog testbenches. Repeated-start and address-matching hooks support custom devices; users add expected register behavior and ACK/NACK assertions and explicitly issue STOP to finish transfers."
scope:
  verification:
    ai: false
access: "Public Python implementation; the reviewed development checkout requires cocotb, a compatible HDL simulator and explicit SDA/SCL connections."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: Canonical I2C simulation-model repository
    url: https://github.com/alexforencich/cocotbext-i2c
    purpose: code
  - id: overview
    title: Model API and development-checkout installation
    url: https://github.com/alexforencich/cocotbext-i2c/blob/a1a4d5da1cffe7b317a0ca2f3aff15e72df35bea/README.md
  - id: master
    title: Master transactions, STOP handling and NACK logging
    url: https://github.com/alexforencich/cocotbext-i2c/blob/a1a4d5da1cffe7b317a0ca2f3aff15e72df35bea/cocotbext/i2c/i2c_master.py
  - id: device
    title: Device callbacks and repeated-start/address dispatch
    url: https://github.com/alexforencich/cocotbext-i2c/blob/a1a4d5da1cffe7b317a0ca2f3aff15e72df35bea/cocotbext/i2c/i2c_device.py
  - id: memory
    title: Memory-device address matching and byte access
    url: https://github.com/alexforencich/cocotbext-i2c/blob/a1a4d5da1cffe7b317a0ca2f3aff15e72df35bea/cocotbext/i2c/i2c_memory.py
  - id: testbench
    title: Executable write/read test and HDL simulator runner
    url: https://github.com/alexforencich/cocotbext-i2c/blob/a1a4d5da1cffe7b317a0ca2f3aff15e72df35bea/tests/i2c/test_i2c.py
  - id: address-extension
    title: March 2026 configurable address-matching implementation
    url: https://github.com/alexforencich/cocotbext-i2c/commit/472a49a5275af96c46f61f06653bb6056389d2da
  - id: repeated-start-extension
    title: March 2026 repeated-start callback argument
    url: https://github.com/alexforencich/cocotbext-i2c/commit/cd9a70f94af5040706577d3d50f77e0be43bf9ce
  - id: activity
    title: August 2026 migration to cocotb simulator runners
    url: https://github.com/alexforencich/cocotbext-i2c/commit/a1a4d5da1cffe7b317a0ca2f3aff15e72df35bea
---

### Implemented workflow and boundaries

The master drives bit-level I2C transfers; the device dispatches address matches and start, write, read and stop callbacks. The memory subclass supplies a small EEPROM-style target. The included Verilog-backed test writes bytes, changes the memory pointer, reads them through a repeated start and asserts the result. These are reusable simulation components for controller/target and register-access tests. [API](#source-overview) · [Master](#source-master) · [Device](#source-device) · [Memory](#source-memory) · [Testbench](#source-testbench).

High-level `read()` and `write()` log NACKs rather than raising an assertion or returning an ACK verdict. They leave the transaction active until `send_stop()` is called; low-level `send_byte()` exposes the sampled ACK bit for custom checks. A project still needs its own expected register behavior and protocol assertions. The reviewed operations exercise digital SDA/SCL signals and do not characterize physical pad voltage, rise time or bus loading. [Transaction implementation](#source-master).

### Scope, activity and development provenance

Verification is conventional. This listing covers the I2C-specific simulation models, a distinct operation from cocotb's general simulator coroutine framework and from physical instrument control.

The March 2026 changes added configurable address matching and repeated-start callbacks, both retained in the reviewed checkout. The August 24 change replaced the test runner with explicit cocotb build/test calls and removed the old runner dependency. These separate periods of functional extension and simulator compatibility work support selection. The August change is the reviewed meaningful first-parent checkpoint, `a1a4d5da1cffe7b317a0ca2f3aff15e72df35bea`, at `2026-08-24T23:13:22Z`. The linked development checkout is the reviewed capability baseline. [Address extension](#source-address-extension) · [Repeated-start extension](#source-repeated-start-extension) · [Runner implementation](#source-activity).

The reviewed public code and commit history did not establish a qualifying credited AI implementation contribution. Source and test logic were inspected; no upstream HDL simulation or electrical experiment was rerun.
