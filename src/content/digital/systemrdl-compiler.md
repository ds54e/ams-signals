---
name: "SystemRDL Compiler"
aliases: []
description: "Python frontend for parsing and elaborating SystemRDL register descriptions into a register-map model. It resolves parameters, expressions and properties and exposes elaborated nodes to downstream tools; it is not itself a SystemVerilog register-block exporter or a generated Python register-access layer."
scope: {"design": {"ai": false}}
access: "MIT-licensed Python package; downstream exporters and target-specific behavior are separate."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/SystemRDL/systemrdl-compiler"
    purpose: code
  - id: activity
    title: "Reviewed substantive implementation checkpoint"
    url: "https://github.com/SystemRDL/systemrdl-compiler/commit/594a752042ad2879683601bfa0fd339e6f328301"
  - id: website
    title: "Official compiler and elaborated-node documentation"
    url: "https://systemrdl-compiler.readthedocs.io/en/stable/"
    purpose: official
  - id: release
    title: "Compiler release v1.33.0"
    url: "https://github.com/SystemRDL/systemrdl-compiler/releases/tag/v1.33.0"
  - id: earlier
    title: "Volatile-field handling for singlepulse properties"
    url: "https://github.com/SystemRDL/systemrdl-compiler/commit/6aabe5e497f7600389d7fb2d47ce06050a0b7b42"
  - id: regblock
    title: "Related SystemVerilog RTL exporter"
    url: "https://github.com/SystemRDL/PeakRDL-regblock"
  - id: pyaccess
    title: "Related Python register access generator"
    url: "https://github.com/krcb197/PeakRDL-python"
---

### Scope and maintenance

The independently usable output is an elaborated register definition. It is Design rather than verification of device behavior, and separate from both the hardware RTL exporter and the Python register-access generator. RgGen is a different register generation workflow. [Compiler API](#source-website) · [RTL exporter](#source-regblock) · [Python generator](#source-pyaccess).

January corrected volatile-field semantics. Later first-parent work adjusts extreme expression inputs and extends regression tests; the October expression patch follows the v1.33.0 tag and is not attributed to that published version. [Earlier semantics](#source-earlier) · [Tagged version](#source-release) · [Expression regressions](#source-activity).
