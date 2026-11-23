---
name: "autoMBIST"
description: "Generates synthesizable memory built-in self-test, redundancy-analysis and self-repair logic for OpenRAM SRAM macros. Its simulation and fault-model tools evaluate March tests and repair behavior for supported port topologies. It wraps existing SRAM macros rather than compiling a memory array."
scope:
  design:
    ai: false
  verification:
    ai: false
access: "Apache-2.0 implementation. OpenRAM macros and simulator or physical-flow dependencies are required for the corresponding workflows."
addedAt: '2026-11-23'
reviewedAt: '2026-11-23'
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/ranaumarnadeem/autoMBIST"
    purpose: code
  - id: website
    title: "Official documentation"
    url: "https://ranaumarnadeem.github.io/autoMBIST/"
    purpose: official
  - id: implementation
    title: "Reviewed generator implementation"
    url: "https://github.com/ranaumarnadeem/autoMBIST/blob/032deb05e7a33e7507c5aae6f38bb2a9372c5b5b/src/autombist/generator.py"
  - id: tests
    title: "Reviewed verification code"
    url: "https://github.com/ranaumarnadeem/autoMBIST/blob/032deb05e7a33e7507c5aae6f38bb2a9372c5b5b/tests/integration/test_2d_analyzer_pipeline.py"
  - id: activity
    title: "Column-repair timing changes and pipeline verification"
    url: "https://github.com/ranaumarnadeem/autoMBIST/commit/032deb05e7a33e7507c5aae6f38bb2a9372c5b5b"
  - id: flow
    title: "Column-repair implementation and reference flow"
    url: "https://github.com/ranaumarnadeem/autoMBIST/blob/032deb05e7a33e7507c5aae6f38bb2a9372c5b5b/flow/newalgo/README.md"
---

### Implementation and scope

The generator validates memory-port and repair configurations and emits RTL. Simulation and fault analysis support Verification. The sky130 LibreLane flow is a published implementation example, not a general-purpose placement or synthesis service. The reviewed integration changes the sequential repair analyzer and adds pipeline regression coverage.

[Implementation](#source-implementation) · [Tests](#source-tests) · [Reviewed change](#source-activity).

Static source review only. The project EDA flow and reported numerical results were not independently rerun. Development provenance is not assigned without retained executable attribution.
