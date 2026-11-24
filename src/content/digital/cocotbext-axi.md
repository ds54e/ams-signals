---
name: "cocotbext-axi"
aliases: []
description: "Python bus-functional simulation models for AXI, AXI Lite, AXI Stream and APB in cocotb tests. Drivers, monitors and register or memory models exercise RTL-facing transactions; a passing test does not prove full protocol compliance or physical bus timing."
scope: {"verification": {"ai": false}}
access: "Public Python extension; requires cocotb, an HDL simulator and a compatible testbench."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/alexforencich/cocotbext-axi"
    purpose: code
  - id: activity
    title: "Reviewed substantive implementation checkpoint"
    url: "https://github.com/alexforencich/cocotbext-axi/commit/264319c17f0869e4d0efb15ad0e6d74e3bef453c"
  - id: release
    title: "Published cocotbext-axi v0.1.28"
    url: "https://pypi.org/project/cocotbext-axi/0.1.28/"
  - id: earlier
    title: "APB slave read implementation and tests"
    url: "https://github.com/alexforencich/cocotbext-axi/commit/b2d126c4bc0f4cafa6e2fd3cdcfafc333e716a9a"
  - id: implementation
    title: "Reviewed bus model modules"
    url: "https://github.com/alexforencich/cocotbext-axi/tree/264319c17f0869e4d0efb15ad0e6d74e3bef453c/cocotbext/axi"
---

### Scope and maintenance

The package implements transaction participants rather than a hardware interconnect generator or a test scheduler. It complements cocotb itself by providing reusable bus models, including master and memory behavior for tests. [Implementation](#source-implementation).

March corrected APB transactions; August migrated the protocol testbenches to cocotb runners. The latter is substantive executable test maintenance and follows v0.1.28. These activities are not evidence that every AXI corner case is covered. [APB correction](#source-earlier) · [Runner migration](#source-activity) · [Published package](#source-release).
