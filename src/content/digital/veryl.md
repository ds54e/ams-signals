---
name: "Veryl"
aliases: []
description: "HDL for RTL design with readable SystemVerilog transpilation, typed generics and integrated formatting, linting and package management. Its toolchain combines native simulator testing, external SystemVerilog and cocotb tests, and lightweight logic synthesis with early area, timing and power estimates."
scope:
  design:
    ai: false
  synthesis:
    ai: false
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "The maintainer reports that Claude Code implemented module instantiation and much of the remaining native-simulator syntax after its overall structure was in place. The simulator remains integrated with Veryl’s native test command."
  sources: ["claude-development", "test-cli"]
  reviewedAt: "2026-10-01"
access: "Public source implementation and releases; native and external test backends have documented compiler and simulator requirements."
addedAt: "2026-09-06"
reviewedAt: "2026-10-01"
sources:
  - id: "official"
    title: "Official Veryl website"
    url: "https://veryl-lang.org/"
    purpose: "official"
  - id: "code"
    title: "Canonical Veryl repository"
    url: "https://github.com/veryl-lang/veryl"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/veryl-lang/veryl/blob/d76466c5ee7cafeac7d6f679cc0c40c2c22a32a6/README.md"
  - id: "features"
    title: "Official language and tooling features"
    url: "https://doc.veryl-lang.org/book/02_features.html"
  - id: "test-cli"
    title: "Current native and external test dispatch"
    url: "https://github.com/veryl-lang/veryl/blob/d76466c5ee7cafeac7d6f679cc0c40c2c22a32a6/crates/veryl/src/cmd_test.rs"
  - id: "backends"
    title: "Native interpreter, Cranelift and C backend implementation"
    url: "https://github.com/veryl-lang/veryl/blob/10c4d89a548dcab2d395384de6cc0c4e266863aa/crates/simulator/src/backend.rs"
  - id: "cocotb"
    title: "Current cocotb runner and Verilator integration"
    url: "https://github.com/veryl-lang/veryl/blob/10c4d89a548dcab2d395384de6cc0c4e266863aa/crates/veryl/src/runner/cocotb.rs"
  - id: "synthesis"
    title: "Current native synthesis command and PPA reports"
    url: "https://github.com/veryl-lang/veryl/blob/d76466c5ee7cafeac7d6f679cc0c40c2c22a32a6/crates/veryl/src/cmd_synth.rs"
  - id: "native-release"
    title: "Veryl 0.19.1: native testbench release"
    url: "https://veryl-lang.org/blog/announcing-veryl-0-19-1/"
  - id: "synthesis-release"
    title: "Veryl 0.20.0: lightweight native synthesis"
    url: "https://veryl-lang.org/blog/announcing-veryl-0-20-0/"
  - id: "release"
    title: "Veryl 0.21.0 release announcement"
    url: "https://veryl-lang.org/blog/announcing-veryl-0-21-0/"
  - id: "claude-development"
    title: "dalance: Using Claude Code in Veryl, March 13, 2026"
    url: "https://zenn.dev/dalance/articles/2a6b1b0ce92442"
  - id: "simulator-landing"
    title: "Native simulator engine landing retained in current history"
    url: "https://github.com/veryl-lang/veryl/commit/a4c125430cf0cf59c38bbb9335037ed9bbcb9c15"
  - id: "simulator-benchmark"
    title: "Retained Wallace multiplier simulation benchmark"
    url: "https://github.com/veryl-lang/veryl/tree/10c4d89a548dcab2d395384de6cc0c4e266863aa/crates/simulator/compare/wallace"
  - id: "activity"
    title: "Include files required by unreferenced definitions in the build filelist"
    url: "https://github.com/veryl-lang/veryl/commit/a889bf2cbe003b1c8438d18f92f88deb4940351d"
  - id: "activity-refresh"
    title: "Emit typedefs for type-bound generic parameters and constants"
    url: "https://github.com/veryl-lang/veryl/commit/d76466c5ee7cafeac7d6f679cc0c40c2c22a32a6"
---

### Implementation context

Veryl is a SystemVerilog-based HDL whose Rust toolchain emits readable SystemVerilog for existing tools and mixed-language designs. Typed generics, type inference, clock/reset abstractions, editor diagnostics, formatting and dependency management accompany RTL authoring. [Reviewed README](#source-readme); [official features](#source-features).

`veryl test` executes native Veryl testbenches through the analyzer IR and native simulator. Its default `cc` backend compiles generated C, with Cranelift JIT execution during asynchronous compilation and fallback when no C compiler is available; Cranelift and interpreter modes can also be selected. External SystemVerilog tests use Verilator, VCS, DSim or Vivado. The cocotb runner supports 1.9 and 2.x through Verilator. [Test dispatch](#source-test-cli); [native backends](#source-backends); [cocotb runner](#source-cocotb).

`veryl synth` lowers analyzer IR into gates and reports area, timing and power using selected cell-library models. These estimates support early RTL iteration; the release describes lightweight synthesis rather than signoff accuracy. [Synthesis implementation](#source-synthesis); [synthesis release](#source-synthesis-release).

### Release boundary

Reviewed October 1, 2026 at `d76466c5ee7cafeac7d6f679cc0c40c2c22a32a6`. The October 1 first-parent merge emits typedefs for type-bound generic parameters and constants, with emitter and expected-output tests. The current native simulator and synthesis commands remain integrated; no physical implementation stage is inferred from PPA estimates. [Current project source](#source-readme); [meaningful activity](#source-activity-refresh).

The latest stable release remains **0.21.0**, published September 2. Native testbenches and lightweight synthesis shipped earlier in 0.19.1 and 0.20.0; current-branch fixes are not all part of 0.21.0. [Stable release](#source-release); [native testing](#source-native-release); [synthesis release](#source-synthesis-release).

### Scope classification

Design covers RTL authoring and transpilation; Synthesis covers native gate synthesis and PPA estimation; Verification includes simulation and testbenches under the existing Digital stage definition. The reviewed capabilities do not establish Layout.

The March 13 maintainer article documents significant Claude-assisted native simulator development. dalance says the broad architecture was already nearly complete before Claude Code implemented module instantiation and remaining syntax under human planning and structural review. Claude also ran tests, generated and debugged a Wallace multiplier benchmark, and investigated a branch-related performance bottleneck. [Original account](#source-claude-development).

The engine landing remains in current history, the Wallace benchmark remains present, and the CLI invokes the evolved simulator. The contribution therefore matters to a shipped, substantial subsystem. Its documented extent supports AI-ASSISTED for the native simulator, while it does not characterize creation of Veryl's whole HDL/compiler/toolchain. The account does not attribute the original HDL, compiler or simulator architecture to AI. All three runtime stage booleans remain false. The simulator remains part of this one Veryl entry. [Engine landing](#source-simulator-landing); [retained benchmark](#source-simulator-benchmark); [current CLI](#source-test-cli).

### Development provenance review

Reviewed 2026-10-01: **AI-ASSISTED**. The maintainer explicitly describes Claude Code implementing module instantiation and much of the remaining syntax after the simulator structure already existed. Current native-test dispatch and simulator crate confirm integration; this is significant simulator assistance, not creation of the HDL/compiler. [Maintainer account](#source-claude-development); [Current native-test integration](#source-test-cli).
