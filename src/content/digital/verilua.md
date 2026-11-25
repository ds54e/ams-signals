---
name: Verilua
description: "LuaJIT hardware verification framework with coroutine scheduling, signal handles, simulator control, waveform analysis and SystemVerilog coverage construction. Its standalone luasim backend runs Lua behavioral models without RTL or an external simulator; backend-specific scheduling and compatibility limitations remain."
scope:
  verification:
    ai: false
access: Public Lua/Rust/C++ implementation; LuaJIT and a supported simulator/backend are required.
addedAt: '2026-10-18'
reviewedAt: "2026-11-25"
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
- id: luasim-integration
  title: "November 12 standalone Lua simulation backend"
  url: "https://github.com/cyril0124/verilua/commit/2c78943b87ba2cecd8594cb88c1d12f7b4f6d3bf"
- id: luasim-guide
  title: "Standalone behavioral simulation workflow and limits"
  url: "https://github.com/cyril0124/verilua/blob/4685beb39ef7bdde734e6d08ffe4b61f93c0b98e/docs/how-to-guides/luasim_simulation.mdx"
- id: luasim-api
  title: "Retained signal declarations and simulation API"
  url: "https://github.com/cyril0124/verilua/blob/4685beb39ef7bdde734e6d08ffe4b61f93c0b98e/src/lua/verilua/luasim/Sim.lua"
- id: nosim-fix
  title: "November 13 missing-backend diagnostic correction"
  url: "https://github.com/cyril0124/verilua/commit/797e58060076d09718ee10b729e05a7378fed4bb"
---

### Implementation and boundaries

Native bindings and the Lua simulator layer implement Verification operations. Generating coverage constructs is testbench work, not DUT Design. The selected SVBuilder change preserves source location in generated coverage comments as part of the supported generation workflow; neighboring generation-order corrections also demonstrate meaningful technical maintenance. No runtime AI follows from an agent-readable guide. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The earlier meaningful checkpoint was `ea0c6ec5500f271ca401c4e9486a732561beed22` (2026-10-15 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).

### Reviewed implementation update, November 25, 2026

November 12 integrates luasim, an in-process backend with Lua-declared signals, Lua behavior models, time/edge waits and VCD output. Testbench components can run without RTL when supplied with a behavioral model. This is not a SystemVerilog simulator and does not guarantee identical scheduling or equivalence with an RTL DUT. November 13 adds a missing nosim-build diagnostic before execution. [Implementation](#source-luasim-integration) · [Guide](#source-luasim-guide) · [API](#source-luasim-api) · [Diagnostic correction](#source-nosim-fix).

The reviewed meaningful checkpoint within the existing capture is 2026-11-13 UTC. The source and retained tests were inspected, not independently executed.
