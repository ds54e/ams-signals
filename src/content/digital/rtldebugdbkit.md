---
name: "RTLDebugDBKit + RTLTracer"
aliases: []
description: "Elaborates SystemVerilog into an instance-level SQLite dependency database, then traces signals, drivers, fan-in, fan-out and bit-level paths through that data."
scope:
  verification:
    level: core
    ai: false
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical RTLDebugDBKit + RTLTracer repository"
    url: "https://github.com/neveltyc/RTLDebugDBKit"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/neveltyc/RTLDebugDBKit/blob/42a651940beca744b53a849e150043e6bf869867/README.md"
  - id: "implementation"
    title: "Reviewed implementation: src/Extractor.cpp"
    url: "https://github.com/neveltyc/RTLDebugDBKit/blob/42a651940beca744b53a849e150043e6bf869867/src/Extractor.cpp"
  - id: "activity"
    title: "feat(schema): v22 -- map_kind on v_driver/v_load, dep_kind on v_load"
    url: "https://github.com/neveltyc/RTLDebugDBKit/commit/f6aa5bd99206616899b71c45579225baa16c6c26"
  - id: "rtltracer"
    title: "RTLTracer database consumer"
    url: "https://github.com/neveltyc/RTLTracer"
---


### Implementation context

Tracked as conventional static debug tools. Being usable by an agent is insufficient evidence of an AI runtime. [Reviewed source](#source-readme).

### Release boundary

The database holds static relations, not runtime waveform values. Only RTLDebugDBKit contributes activity; the related RTLTracer repository remains a secondary source. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

[Related RTLTracer source](#source-rtltracer).

### Scope classification

The elaborated SQLite dependency database and RTLTracer queries support read-only signal/debug analysis. Building a debug representation does not generate or transform the user's RTL design. [Reviewed source](#source-readme).

The database and related tracer expose static design/debug relations for conventional Verification. Agent accessibility and an internal elaborator do not imply AI or a design-generation stage. [AI/stage evidence](#source-readme).
