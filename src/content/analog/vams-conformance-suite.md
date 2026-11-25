---
name: VAMS Conformance Suite
summary: Verilog-A/AMS and SPICE compatibility test suite with a C harness, tool adapters and numerical-output oracles.
description: Verilog-A/AMS and SPICE compatibility test suite with a C harness, tool adapters and numerical-output oracles. It separates compile acceptance, execution, skips and expected failures across selected fixtures; the infrastructure compares model and simulator behavior without certifying full language conformance or serving as a standalone circuit simulator.
scope:
  simulation:
    ai: false
access: Public C harness, Python adapters and HDL/SPICE fixtures; external tools and pinned submodules must be installed separately. Imported VerA and ESPice fixture trees are identified as Apache-2.0; upstream submodules retain their own terms.
addedAt: '2026-10-31'
reviewedAt: "2026-11-25"
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/Scouren/Conformance-Suite
  purpose: code
- id: readme
  title: Reviewed project workflow and boundaries
  url: https://github.com/Scouren/Conformance-Suite/blob/9d74f7374b6f05ab98a86519a8561ea9f58feb98/README.md
- id: activity
  title: Reviewed substantive first-parent implementation
  url: https://github.com/Scouren/Conformance-Suite/commit/044c6cced380ad62bfd43c5ef76400b0f964697a
- id: harness
  title: Tool-independent verdict harness
  url: https://github.com/Scouren/Conformance-Suite/blob/9d74f7374b6f05ab98a86519a8561ea9f58feb98/harness/conform.c
- id: oracles
  title: Numerical netlist output checker
  url: https://github.com/Scouren/Conformance-Suite/blob/9d74f7374b6f05ab98a86519a8561ea9f58feb98/tools/rawcheck.py
- id: review-20261115-fft
  title: "Integrated FFT reference-phase expectation corrections"
  url: https://github.com/Scouren/Conformance-Suite/commit/ca18ac9d1e44132f7b25a911ba0947356a3d74a6
- id: review-20261115-ngspice
  title: "Integrated ngspice-specific numeric expectation corrections"
  url: https://github.com/Scouren/Conformance-Suite/commit/c146b285536a9c00099ed2a9198f1432cab003ee
- id: review-20261115-json
  title: "Integrated strict JSON oracle serialization"
  url: https://github.com/Scouren/Conformance-Suite/commit/3cdbdec7143e812faa31b67e08b78c6ae26985d6
- id: review-20261125-xcheck
  title: "Retained cross-simulator comparison and strict JSON output"
  url: https://github.com/Scouren/Conformance-Suite/blob/06226fa7632f12d05c0d055ac4fcf0179b3e9381/tools/xcheck.py
- id: review-20261125-exp
  title: "Retained transient exponential-source default reference"
  url: https://github.com/Scouren/Conformance-Suite/blob/06226fa7632f12d05c0d055ac4fcf0179b3e9381/tests/netlist/tran/source_exp_defaults_ngspice.expected.json
- id: review-20261125-fft-oracle
  title: "Retained numerical FFT oracle and remaining explanatory inconsistency"
  url: https://github.com/Scouren/Conformance-Suite/blob/06226fa7632f12d05c0d055ac4fcf0179b3e9381/tests/netlist/hspice/fft_rect_ngspice.expected.json
- id: review-20261125-fft-deck
  title: "Retained FFT reference deck"
  url: https://github.com/Scouren/Conformance-Suite/blob/06226fa7632f12d05c0d055ac4fcf0179b3e9381/tests/netlist/hspice/fft_rect_ngspice.sp
---

### Executable verification infrastructure

The tool-independent C harness interprets verdict directives, exit status and expected output; configuration files invoke each compiler/simulator. Numerical netlist adapters run electrical analyses and compare results with JSON oracles. This serves Simulation testing in Analog; the project is a test suite rather than a solver or compiler. Its Verilog-A, mixed-signal, IEEE 1364 and SPICE fixtures remain distinct. [Harness and layout](#source-readme) · [Executable harness](#source-harness) · [Numerical adapter](#source-oracles).

### Verdict and coverage boundaries

A compile-only tool does not receive execution credit for runtime tests. Missing expressible analyses are skipped; an unexpected pass against an expected-failure baseline can fail the gate. The OpenVAF/ngspice adapter documented here runs operating-point tests and skips transient, AC and noise testbenches. These are adapter limits rather than a census of the tool's entire capabilities. The earlier October discipline-rejection correction was reviewed as test maintenance. The current default-branch history and November implementation changes are reviewed separately below; automated result commits do not renew eligibility. No external conformance campaign was reproduced. [Verdict contract](#source-readme) · [Reviewed fixture correction](#source-activity).

### November 25 source review

The November 15 integration revises selected ngspice-specific expectations rather than assuming agreement with another SPICE dialect. For example, the retained EXP source oracle records an observed default rise delay of TSTEP for ngspice 44.2/45, distinct from the manual's stated zero-delay default. The cross-checker records an unbounded relative error as null, not Infinity, and serializes strict JSON. The FFT twin regression changes a complex sine-bin expectation to the cosine-referenced value (0, -1); the current rectangular-window JSON still describes sine phase in its prose while its numeric expectation and deck use the cosine reference. Review both the numerical oracle and the convention before reuse. These are upstream reference fixtures and reports, not independently reproduced results or general guarantees of simulator equivalence. [Dialect change](#source-review-20261115-ngspice) · [EXP oracle](#source-review-20261125-exp) · [JSON correction](#source-review-20261115-json) · [Cross-checker](#source-review-20261125-xcheck) · [FFT integration](#source-review-20261115-fft) · [FFT oracle](#source-review-20261125-fft-oracle) · [FFT deck](#source-review-20261125-fft-deck).

The current canonical repository ID matches the prior capture, but the earlier captured head is not on the current first-parent chain. The current 41-commit chain was walked back to its root; the monthly counts describe only that chain, with no imported counts from the older history. The latest reviewed implementation is the November 15 FFT integration, while November 23 result-only activity is the raw last date.
