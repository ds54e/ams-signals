---
name: "eevee-rs"
aliases: []
description: "Pre-alpha Rust SystemVerilog simulator with four-state event-driven execution, class elaboration and early runs of the unmodified Accellera UVM library. An event kernel and register-bytecode interpreter execute processes; broader UVM workflows and language conformance remain under development."
scope:
  verification:
    ai: false
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Canonical eevee-rs repository"
    url: "https://github.com/dellerbr/eevee-rs"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/dellerbr/eevee-rs/blob/958dcbb5b2921be0033a9b56644d257deb9282de/README.md"
  - id: "implementation"
    title: "Reviewed implementation: crates/eevee-sched/src/kernel.rs"
    url: "https://github.com/dellerbr/eevee-rs/blob/958dcbb5b2921be0033a9b56644d257deb9282de/crates/eevee-sched/src/kernel.rs"
  - id: "activity"
    title: "Route zero delays through Inactive before NBA"
    url: "https://github.com/dellerbr/eevee-rs/commit/958dcbb5b2921be0033a9b56644d257deb9282de"
  - id: "development-ledger"
    title: "Implementation ledger and bounded model-attributed contributions"
    url: "https://github.com/dellerbr/eevee-rs/blob/958dcbb5b2921be0033a9b56644d257deb9282de/docs/implementation-plan.md"
  - id: "hierarchy-update"
    title: "Static hierarchical lookup implementation and regression changes"
    url: "https://github.com/dellerbr/eevee-rs/commit/99e4625ece9d051750b5bb33ff156c7746b34d1b"
---

### Implementation and scope

The Rust event kernel and register-bytecode interpreter implement conventional Verification. The September source includes explicit top selection and allocated static hierarchy lookup, but these serve simulation rather than a separate design-generation or synthesis product. [Current status](#source-readme); [hierarchy implementation](#source-hierarchy-update).

### Conformance boundary

The project remains pre-alpha and explicitly unsuitable for signoff. Its UVM reporting, factory and delayed run-phase probes are bounded results, not complete IEEE 1800 or UVM conformance. Resilient callable stubs and strict fail-closed modes must not be conflated. The September 9 scheduler repair sends zero delays through Inactive before NBA settlement and includes an end-to-end regression. [Project limits](#source-readme); [reviewed repair](#source-activity); [kernel](#source-implementation).

### Development provenance review

The implementation ledger records an agent workflow and specifically attributes negative hierarchy regressions, an allocated-context width repair and the zero-delay correction to Sonnet, with other models reviewing or testing. Those bounded attributions do not establish that AI implemented the whole hierarchical-lookup subsystem or the simulator's defining core; instruction files and the size of the surrounding change are not enough. No public development badge is assigned from this evidence. [Attribution and limits](#source-development-ledger); [actual hierarchy diff](#source-hierarchy-update).
