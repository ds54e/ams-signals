---
name: "eevee-rs"
aliases: []
roles: ["eda-tool"]
primary: "simulation"
ai: "traditional"
description: "Rust event-driven SystemVerilog simulator with four-state execution, class elaboration and early runs of the unmodified Accellera UVM library."
keywords: ["SystemVerilog", "UVM", "event-driven", "Rust"]
areas:
  simulation: core
  formal-verification: core
  frontend-synthesis: supporting
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical eevee-rs repository"
    url: "https://github.com/dellerbr/eevee-rs"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/dellerbr/eevee-rs/blob/f37ad6a3c742685e25a37335c66fd7288ed27501/README.md"
  - id: "implementation"
    title: "Reviewed implementation: crates/eevee-sched/src/kernel.rs"
    url: "https://github.com/dellerbr/eevee-rs/blob/f37ad6a3c742685e25a37335c66fd7288ed27501/crates/eevee-sched/src/kernel.rs"
  - id: "activity"
    title: "Add integral sizing and coercion"
    url: "https://github.com/dellerbr/eevee-rs/commit/f37ad6a3c742685e25a37335c66fd7288ed27501"
---

### Scope

The runtime schedules events and nonblocking assignments, while class elaboration enables UVM execution probes. UVM is a central development target, so verification is core scope. [Project documentation](#source-readme).

### Classification

Tracked as a conventional simulator implementation. The reviewed material does not establish distinctive AI authorship or an AI runtime. [Reviewed source](#source-readme).

### Release boundary

The public release is pre-alpha. Demonstrated UVM probes and strict/resilient elaboration modes do not imply complete UVM or IEEE 1800-2023 conformance. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
