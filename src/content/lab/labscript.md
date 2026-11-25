---
name: "labscript"
aliases: ["labscript experiment compiler"]
description: "Python experiment compiler in the labscript suite that translates time-indexed analog, digital and DDS operations, acquisition requests and trigger relationships into device-specific HDF5 shot instructions. Compatible device definitions and a separate execution layer such as BLACS run the compiled shots."
scope:
  control: { ai: false }
  test: { ai: false }
access: "BSD-2-Clause; requires compatible labscript device definitions and execution software for physical experiments."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/labscript-suite/labscript"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/labscript-suite/labscript/commit/c8441c1029aa25652627a1f67cbfff5b852ade18"
  - id: connection-table
    title: "March device connection table compatibility correction"
    url: "https://github.com/labscript-suite/labscript/commit/a0787c40dd3b5ec2ce452141758bc523b1d187c5"
  - id: clock-compiler
    title: "Retained clock-generation and shared-trigger checks"
    url: "https://github.com/labscript-suite/labscript/blob/607cfaecd58869b876d19cf30c52566a4f490cc6/labscript/core.py"
  - id: example
    title: "Implemented multi-device experiment and clocking example"
    url: "https://github.com/labscript-suite/labscript/blob/607cfaecd58869b876d19cf30c52566a4f490cc6/example.py"
  - id: blacs
    title: "Related shot execution and queue implementation"
    url: "https://github.com/labscript-suite/blacs"
---

## Scope and limits

The compiler generates hardware programming instructions from a Python experiment and device tree, including pseudoclocks, trigger relationships and timed output operations. Its executable shot-file workflow supports Control and Test Automation; it does not itself retrieve physical samples. BLACS is the separate execution and queue layer, not an independent implementation of this compiler. Unlike QICK's RFSoC-specific programming workflow, labscript uses device definitions to generate coordinated instructions for multiple types of hardware. [Clock compiler](#source-clock-compiler) · [Experiment example](#source-example) · [Execution layer](#source-blacs).

## Reviewed maintenance

March 2026 changes the connection-table path so devices without a BLACS connection are represented appropriately, including variable-length string handling. October invokes shared-trigger checks for secondary pseudoclocks and removes implicit pylab imports from compiler paths. The trigger check remains in the reviewed revision. These are separate compatibility and compiler-correctness changes, not independent evidence of hardware timing accuracy. [Connection table](#source-connection-table) · [Trigger correction](#source-activity).
