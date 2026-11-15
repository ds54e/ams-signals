---
name: "Clash"
aliases: ["Clash compiler"]
description: "Haskell-based hardware description language and compiler for parameterized synchronous circuits, producing synthesizable Verilog, SystemVerilog or VHDL. Signal simulation, an interactive workflow and testbench primitives support validation; downstream tools perform technology mapping and physical implementation."
scope:
  design:
    ai: false
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Code is explicitly credited for the merged zero-width field-projection correction and executable regression. The canonical development head retains the guard that suppresses an invalid HDL reference."
  sources: ["ai-contribution", "ai-integration", "netlist"]
  reviewedAt: "2026-11-15"
access: "BSD-2-Clause project source, with separate GHC-derived notices. Reviewed development packages are version 1.11.0 and require compatible GHC >=9.6 and <9.15, matching Clash libraries and Haskell dependencies. Generated-HDL simulation and FPGA/ASIC implementation require separately supplied tools."
addedAt: "2026-11-15"
reviewedAt: "2026-11-15"
sources:
  - id: "official"
    title: "Official Clash website"
    url: "https://clash-lang.org/"
    purpose: "official"
  - id: "code"
    title: "Canonical Clash compiler repository"
    url: "https://github.com/clash-lang/clash-compiler"
    purpose: "code"
  - id: "overview"
    title: "Supported HDL generation, interactive workflow and branch conventions"
    url: "https://github.com/clash-lang/clash-compiler/blob/920973dbb208b14f875eff730dbcf739fad22870/README.md"
  - id: "verilog"
    title: "Implemented Verilog backend"
    url: "https://github.com/clash-lang/clash-compiler/blob/920973dbb208b14f875eff730dbcf739fad22870/clash-lib/src/Clash/Backend/Verilog.hs"
  - id: "simulation"
    title: "Signal sampling and functional simulation implementation"
    url: "https://github.com/clash-lang/clash-compiler/blob/920973dbb208b14f875eff730dbcf739fad22870/clash-prelude/src/Clash/Signal/Internal.hs"
  - id: "testbench"
    title: "Stimulus generation and output verification primitives"
    url: "https://github.com/clash-lang/clash-compiler/blob/920973dbb208b14f875eff730dbcf739fad22870/clash-prelude/src/Clash/Explicit/Testbench.hs"
  - id: "activity"
    title: "October 27 constant BitVector index implementation and output regression"
    url: "https://github.com/clash-lang/clash-compiler/commit/94fd741bce962733cf590cfd16c9206c33c5b2fe"
  - id: "index-implementation"
    title: "Retained literal-specific Verilog/SystemVerilog index template selection"
    url: "https://github.com/clash-lang/clash-compiler/blob/920973dbb208b14f875eff730dbcf739fad22870/clash-lib/src/Clash/Primitives/Sized/BitVector.hs"
  - id: "index-test"
    title: "Retained BitVector/Vec constant-index generated-Verilog regression"
    url: "https://github.com/clash-lang/clash-compiler/blob/920973dbb208b14f875eff730dbcf739fad22870/tests/shouldwork/Issues/T3056.hs"
  - id: "ai-contribution"
    title: "Claude-credited zero-width projection code and regression integration"
    url: "https://github.com/clash-lang/clash-compiler/commit/3b87bbdb436c246064305abf7ad85466c79bf3a8"
  - id: "ai-integration"
    title: "Merged PR 3459 with explicit Claude Code disclosure"
    url: "https://github.com/clash-lang/clash-compiler/pull/3459"
  - id: "netlist"
    title: "Retained isVoid field guard in mkProjection"
    url: "https://github.com/clash-lang/clash-compiler/blob/920973dbb208b14f875eff730dbcf739fad22870/clash-lib/src/Clash/Netlist.hs"
  - id: "projection-test"
    title: "Retained executable zero-width projection testbench"
    url: "https://github.com/clash-lang/clash-compiler/blob/920973dbb208b14f875eff730dbcf739fad22870/tests/shouldwork/Issues/T3460_void_projection.hs"
  - id: "release"
    title: "Clash v1.10.3 release, October 15, 2026"
    url: "https://github.com/clash-lang/clash-compiler/releases/tag/v1.10.3"
  - id: "dependencies"
    title: "GHC compatibility, matching libraries and development package version"
    url: "https://github.com/clash-lang/clash-compiler/blob/920973dbb208b14f875eff730dbcf739fad22870/clash-ghc/clash-ghc.cabal"
  - id: "library-dependencies"
    title: "Compiler-library dependencies and BSD-2-Clause declaration"
    url: "https://github.com/clash-lang/clash-compiler/blob/920973dbb208b14f875eff730dbcf739fad22870/clash-lib/clash-lib.cabal"
  - id: "license"
    title: "Project two-clause BSD terms"
    url: "https://github.com/clash-lang/clash-compiler/blob/920973dbb208b14f875eff730dbcf739fad22870/LICENSE"
  - id: "ghc-license"
    title: "Separate GHC-derived three-clause notice"
    url: "https://github.com/clash-lang/clash-compiler/blob/920973dbb208b14f875eff730dbcf739fad22870/clash-ghc/LICENSE_GHC"
---

### Implementation and selection

Clash supports Verilog and SystemVerilog directly as well as VHDL; it is not a VHDL-first project with experimental Verilog export. Haskell circuit descriptions, normalization and HDL emission establish Design. Signal sampling/simulation and executable stimulus/output-verification primitives establish Verification. Generating synthesizable RTL does not itself establish technology mapping, logic-synthesis coverage or Layout in this entry. [Supported workflow](#source-overview) · [Verilog backend](#source-verilog) · [Simulation](#source-simulation) · [Testbench primitives](#source-testbench)

The October 27 first-parent checkpoint repairs constant BitVector index emission. The shared Verilog/SystemVerilog primitive selects a literal template before validation, yielding an ordinary numeric select for constant indices while preserving the argument template for variable indices. The executable output regression covers BitVector and Vec constant indexing and rejects the unwanted sized-literal prefix in generated Verilog. It is not a claim of exhaustive SystemVerilog simulator coverage. [Reviewed implementation and test diff](#source-activity) · [Retained template selection](#source-index-implementation) · [Retained output test](#source-index-test)

Distinct substantive maintenance includes the October 2 zero-width projection correction: mkProjection now returns Noop for a void field instead of emitting a reference to an undeclared binder. Its retained testbench applies True/False stimuli and expects their inverses. These independent correctness changes support inclusion beyond a single initial release or mechanical latest commit. Clash's canonical compiler identity is distinct from other hardware-construction libraries and downstream HDL tools. [Projection integration](#source-ai-contribution) · [Current guard](#source-netlist) · [Current regression](#source-projection-test)

### Development provenance

Merged PR 3459 explicitly discloses Claude Code, and the integrated executable code/test commit credits Claude Opus with Anthropic's attribution address. Its canonical squash commit is on the captured first-parent chain. The pinned development head retains the isVoid field guard and executable regression. Together the actor disclosure, actual code diff, merged integration and current retention support AI-assisted development for this correction; they do not attribute the whole compiler to AI. [Maintainer-visible disclosure and integration](#source-ai-integration) · [Credited implementation](#source-ai-contribution) · [Retained guard](#source-netlist) · [Retained test](#source-projection-test)

The reviewed runtime generation, simulation and testbench operations remain conventional. Development credit does not turn them into AI Design or AI Verification.

### Release, license and dependencies

The actual default is master; current Cabal packages identify development version 1.11.0. The latest reviewed GitHub release is v1.10.3, published October 15 from the 1.10 line. The October 27 fix is later master work, not a claimed v1.10.3 capability. The October 2 provenance review establishes retention in master and does not assert inclusion in a particular release artifact. [Release](#source-release) · [Branch conventions](#source-overview) · [Current package metadata](#source-dependencies)

Project terms are BSD-2-Clause; GHC-derived files carry a separate three-clause notice. Development metadata requires GHC >=9.6 and <9.15 and matching 1.11.0 clash-lib/clash-prelude packages, alongside declared Haskell libraries; compatible compiler/package combinations matter. Generated-HDL simulation, synthesis and FPGA/ASIC implementation rely on separate tools with their own requirements. [Project license](#source-license) · [GHC notice](#source-ghc-license) · [Frontend dependencies](#source-dependencies) · [Library dependencies](#source-library-dependencies)

### Activity capture

The record pins repository identity, actual master head 920973d and capture time. Its complete 3,326-commit first-parent chain was reconstructed to the root from public commit metadata; merge integrations count once, without their side-branch commits. UTC committer buckets preserve imported/history-date limitations and do not verify push times. The latest commit date is November 12; the manually reviewed meaningful SHA is 94fd741, October 27. November is partial. No Haskell/HDL compilation or upstream regression suite was run. [Canonical repository](#source-code) · [Meaningful implementation](#source-activity)
