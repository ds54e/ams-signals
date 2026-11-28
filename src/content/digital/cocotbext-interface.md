---
name: "cocotbext-interface"
aliases: ["cocotbext interface"]
description: "Python cocotb extension for declarative signal grouping, role-specific modport views and clocked sampling/driving wrappers with configurable trigger skews. Supports reusable verification components independent of a particular bus protocol; the abstractions resemble SystemVerilog interfaces rather than implementing its complete scheduling semantics."
scope:
  verification: { ai: false }
access: "BSD-3-Clause Python source; uses cocotb, with simulator requirements inherited from the chosen cocotb environment."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/RasmusGOlsen/cocotbext-interface"
    purpose: code
  - id: readme
    title: "Project overview and operating boundaries"
    url: "https://github.com/RasmusGOlsen/cocotbext-interface/blob/05ab6211813b5cac876a0553087dc3cd565d2c6b/README.md"
  - id: activity
    title: "Reviewed meaningful implementation checkpoint"
    url: "https://github.com/RasmusGOlsen/cocotbext-interface/commit/e3ffd4dbc3c4c823ac5697fe0b95fb7951ea63c2"
  - id: implementation
    title: "Retained interface, modport and clocking wrappers"
    url: "https://github.com/RasmusGOlsen/cocotbext-interface/blob/05ab6211813b5cac876a0553087dc3cd565d2c6b/cocotbext/interface/interface.py"
  - id: tests
    title: "Retained tests including mocked scheduler and handles"
    url: "https://github.com/RasmusGOlsen/cocotbext-interface/blob/05ab6211813b5cac876a0553087dc3cd565d2c6b/tests/test_interface.py"
  - id: earlier
    title: "March unconnected-signal default capture repair"
    url: "https://github.com/RasmusGOlsen/cocotbext-interface/commit/a24b6493dd80d6c40c12be9a097efdeb5c37a742"
  - id: compatibility
    title: "November cocotb 2.0 and 2.1 test matrix"
    url: "https://github.com/RasmusGOlsen/cocotbext-interface/commit/05ab6211813b5cac876a0553087dc3cd565d2c6b"
---

## Implementation and selection

The extension groups handles using typed declarations, exposes role-specific signal access and imported methods through modport views, and wraps synchronous captures and drives with cocotb triggers and a shared ReadOnly manager. The March repair handles default capture values for unconnected signals; November fixes modport method-name collisions and extends the cocotb compatibility test matrix. It provides reusable protocol-independent verification structure rather than duplicating an AXI or I2C-specific bus driver. [Implementation](#source-implementation) · [Earlier correction](#source-earlier) · [Modport fix](#source-activity) · [Compatibility](#source-compatibility).

## Limits

The Python wrappers are not the SystemVerilog language constructs themselves, and the tests mock scheduler and handle behavior. They do not prove race-free operation across real HDL simulators or the complete semantics of SystemVerilog clocking-block regions and input skew. No upstream tests or simulator runs were independently executed. [Tests](#source-tests).
