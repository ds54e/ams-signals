---
name: Verilua
description: LuaJIT hardware verification framework with coroutine scheduling, signal handles and simulator control through native bindings. It supports interactive and scripted checking, waveform-oriented analysis and SystemVerilog coverage construction; simulator backends and their supported operations retain separate compatibility limits.
scope:
  verification:
    ai: false
access: Public Lua/Rust/C++ implementation; LuaJIT and a supported simulator/backend are required.
addedAt: '2026-10-18'
reviewedAt: '2026-10-23'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/cyril0124/verilua
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/cyril0124/verilua/blob/88d0104e8b2d790c4f6ba2c36809120b2ecafa38/README.md
- id: activity
  title: 'feat(svbuilder): add opt-in source-located block comments'
  url: https://github.com/cyril0124/verilua/commit/ea0c6ec5500f271ca401c4e9486a732561beed22
- id: implementation-1
  title: 'Released implementation: libverilua/src/lib.rs'
  url: https://github.com/cyril0124/verilua/blob/88d0104e8b2d790c4f6ba2c36809120b2ecafa38/libverilua/src/lib.rs
- id: implementation-2
  title: 'Released implementation: src/lua/verilua/LuaSimulator.lua'
  url: https://github.com/cyril0124/verilua/blob/88d0104e8b2d790c4f6ba2c36809120b2ecafa38/src/lua/verilua/LuaSimulator.lua
- id: website
  title: Official project website and documentation
  url: https://cyril0124.github.io/verilua/
  purpose: official
---

### Implementation and boundaries

Native bindings and the Lua simulator layer implement Verification operations. Generating coverage constructs is testbench work, not DUT Design. The selected SVBuilder change preserves source location in generated coverage comments as part of the supported generation workflow; neighboring generation-order corrections also demonstrate meaningful technical maintenance. No runtime AI follows from an agent-readable guide. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `ea0c6ec5500f271ca401c4e9486a732561beed22` (2026-10-15 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).
