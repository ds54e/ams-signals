---
name: "Verilator"
aliases: []
roles: ["eda-tool"]
ai: "traditional"
description: "Compiled SystemVerilog simulator and lint system that translates RTL into C++/SystemC models with assertion, coverage and waveform support."
flow: {"verification":"core"}
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical Verilator repository"
    url: "https://github.com/verilator/verilator"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/verilator/verilator/blob/b1c06fdb09c45e018804ef603058abf866a910fc/README.rst"
  - id: "implementation"
    title: "Reviewed implementation: src/V3Coverage.cpp"
    url: "https://github.com/verilator/verilator/blob/b1c06fdb09c45e018804ef603058abf866a910fc/src/V3Coverage.cpp"
  - id: "activity"
    title: "Fix use-after-free of captured interface typedef in deleted generate branch (#8287)"
    url: "https://github.com/verilator/verilator/commit/b1c06fdb09c45e018804ef603058abf866a910fc"
  - id: "website"
    title: "Official project documentation"
    url: "https://verilator.org"
    purpose: "official"
---


### Classification

Tracked as the established compiled simulator. Incidental coding-agent contributions do not make AI a defining build or runtime characteristic. [Reviewed source](#source-readme).

### Release boundary

Performance and compatibility vary by design and enabled features; project benchmark reports are not independent catalog measurements. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Flow scope

Compiled simulation, assertions, coverage, lint and waveform output serve verification. C++/SystemC compilation is simulator implementation, not logic synthesis or DUT generation. [Reviewed source](#source-readme).
