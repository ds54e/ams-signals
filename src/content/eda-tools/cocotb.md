---
name: "cocotb"
aliases: []
roles: ["eda-tool"]
primary: "formal-verification"
ai: "traditional"
description: "Python coroutine-based verification framework that drives and observes HDL simulators through simulator interfaces, triggers and testbench scheduling."
keywords: ["Python", "testbench", "simulator integration", "coroutine"]
areas:
  formal-verification: core
  simulation: supporting
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical cocotb repository"
    url: "https://github.com/cocotb/cocotb"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/cocotb/cocotb/blob/ca64add11543021f36578fbc4731c94c9483c93f/README.md"
  - id: "implementation"
    title: "Reviewed implementation: src/cocotb/_event_loop.py"
    url: "https://github.com/cocotb/cocotb/blob/ca64add11543021f36578fbc4731c94c9483c93f/src/cocotb/_event_loop.py"
  - id: "activity"
    title: "Propagate Python exceptions through GPI callbacks"
    url: "https://github.com/cocotb/cocotb/commit/ca64add11543021f36578fbc4731c94c9483c93f"
  - id: "website"
    title: "Official project documentation"
    url: "https://docs.cocotb.org/en/stable/"
    purpose: "official"
---

### Scope

Testbench execution and simulator callbacks are central. Simulation is supporting integration with external HDL engines. [Project documentation](#source-readme).

### Classification

Tracked as conventional verification infrastructure, independent of whether an AI agent authors a user testbench. [Reviewed source](#source-readme).

### Release boundary

cocotb integrates simulators; it does not replace their HDL execution engines. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
