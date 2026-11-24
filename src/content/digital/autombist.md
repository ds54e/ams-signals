---
name: "autoMBIST"
description: "Generates synthesizable memory self-test, redundancy-analysis and self-repair logic around OpenRAM SRAM macros, with simulation and fault-model tools for supported port topologies. Its harden command also configures and runs LibreLane synthesis and physical implementation, including macro placement and repair settings; the EDA engines and process files are external dependencies."
scope:
  design:
    ai: false
  synthesis:
    ai: false
  verification:
    ai: false
  layout:
    ai: false
access: "Apache-2.0 implementation. OpenRAM macros and simulator or physical-flow dependencies are required for the corresponding workflows."
addedAt: '2026-11-23'
reviewedAt: '2026-11-24'
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
  - id: harden-command
    title: "Implemented harden command and optional LibreLane execution"
    url: "https://github.com/ranaumarnadeem/autoMBIST/blob/e918d13eeff5675658c6f4baaf6cfb6ca48c2c3b/src/autombist/cli.py"
  - id: harden-config
    title: "Synthesis strategy, macro placement and physical-flow configuration"
    url: "https://github.com/ranaumarnadeem/autoMBIST/blob/e918d13eeff5675658c6f4baaf6cfb6ca48c2c3b/src/autombist/signoff.py"
---

### Implementation and scope

The generator validates memory-port and repair configurations and emits RTL; it wraps existing SRAM macros rather than compiling their bitcell arrays. Simulation and fault analysis support Verification. The reviewed integration changes the sequential repair analyzer and adds pipeline regression coverage.

[Implementation](#source-implementation) · [Tests](#source-tests) · [Reviewed change](#source-activity).

The user-facing `harden` command emits a validated LibreLane Classic configuration and, with `--run`, invokes the pinned external flow and propagates failures. Configuration includes the synthesis strategy, clock, die area, macro placement, PDN connections and repair options, supporting conventional Synthesis and Layout as orchestration. The underlying synthesis and physical algorithms remain LibreLane's dependencies. Macro-internal DRC exclusions and the separate macro-signoff path bound any reported clean result; generated configuration alone is not a completed hardening run. [Command implementation](#source-harden-command) · [Configuration and checks](#source-harden-config) · [Reference run](#source-flow).

Static source review only. The project EDA flow and reported numerical results were not independently rerun. Development provenance is not assigned without retained executable attribution.
