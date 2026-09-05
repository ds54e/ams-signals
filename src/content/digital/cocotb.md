---
name: "cocotb"
aliases: []
description: "Python coroutine-based verification framework that drives and observes HDL simulators through simulator interfaces, triggers and testbench scheduling."
scope:
  verification:
    level: core
    ai: false
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


### Implementation context

Tracked as conventional verification infrastructure, independent of whether an AI agent authors a user testbench. [Reviewed source](#source-readme).

### Release boundary

cocotb integrates simulators; it does not replace their HDL execution engines. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

Python testbenches drive and observe existing HDL simulators. Test generation and simulator bindings are verification operations, not RTL design generation or synthesis. [Reviewed source](#source-readme).

Coroutine testbenches and HDL simulator bindings are conventional Verification. A user may author a test with AI, but that is not a model-driven cocotb stage. [AI/stage evidence](#source-readme).
