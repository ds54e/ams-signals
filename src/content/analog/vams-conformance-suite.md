---
name: VAMS Conformance Suite
summary: Verilog-A/AMS and SPICE compatibility test suite with a C harness, tool adapters and numerical-output oracles.
description: Verilog-A/AMS and SPICE compatibility test suite with a C harness, tool adapters and numerical-output oracles. It separates compile acceptance, execution, skips and expected failures across selected fixtures; the infrastructure compares model and simulator behavior without certifying full language conformance or serving as a standalone circuit simulator.
scope:
  simulation:
    ai: false
access: Public C harness, Python adapters and HDL/SPICE fixtures; external tools and pinned submodules must be installed separately. Imported VerA and ESPice fixture trees are identified as Apache-2.0; upstream submodules retain their own terms.
addedAt: '2026-10-31'
reviewedAt: '2026-10-31'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/OpenFAT/VAMS-Conformance-Suite
  purpose: code
- id: readme
  title: Reviewed project workflow and boundaries
  url: https://github.com/OpenFAT/VAMS-Conformance-Suite/blob/9d74f7374b6f05ab98a86519a8561ea9f58feb98/README.md
- id: activity
  title: Reviewed substantive first-parent implementation
  url: https://github.com/OpenFAT/VAMS-Conformance-Suite/commit/044c6cced380ad62bfd43c5ef76400b0f964697a
- id: harness
  title: Tool-independent verdict harness
  url: https://github.com/OpenFAT/VAMS-Conformance-Suite/blob/9d74f7374b6f05ab98a86519a8561ea9f58feb98/harness/conform.c
- id: oracles
  title: Numerical netlist output checker
  url: https://github.com/OpenFAT/VAMS-Conformance-Suite/blob/9d74f7374b6f05ab98a86519a8561ea9f58feb98/tools/rawcheck.py
---

### Executable verification infrastructure

The tool-independent C harness interprets verdict directives, exit status and expected output; configuration files invoke each compiler/simulator. Numerical netlist adapters run electrical analyses and compare results with JSON oracles. This serves Simulation testing in Analog; the project is a test suite rather than a solver or compiler. Its Verilog-A, mixed-signal, IEEE 1364 and SPICE fixtures remain distinct. [Harness and layout](#source-readme) · [Executable harness](#source-harness) · [Numerical adapter](#source-oracles).

### Verdict and coverage boundaries

A compile-only tool does not receive execution credit for runtime tests. Missing expressible analyses are skipped; an unexpected pass against an expected-failure baseline can fail the gate. The OpenVAF/ngspice adapter documented here runs operating-point tests and skips transient, AC and noise testbenches. These are adapter limits rather than a census of the tool's entire capabilities. The October 25 discipline-rejection fixture correction is meaningful test maintenance; later automated result commits do not renew eligibility. No external conformance campaign was reproduced. [Verdict contract](#source-readme) · [Reviewed fixture correction](#source-activity).
