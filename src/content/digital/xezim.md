---
name: "xezim"
aliases: ["sisSIM"]
description: "Rust SystemVerilog simulator for RTL, gate-level and UVM verification, with randomization, coverage, DPI/VPI, SDF timing and optional native compilation. Recent main-branch fixes include real-valued user-defined nettype input resolution; UPF and resolved-real/wreal support remain subsets, not general analog simulation."
scope:
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "The maintainer credits AI-assisted implementation of the SystemVerilog simulator through iterative coding, testing and correction."
  sources: ["development-2", "development-1"]
  reviewedAt: "2026-11-12"
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: '2026-11-19'
sources:
  - id: "code"
    title: "Canonical xezim repository"
    url: "https://github.com/aionhw/xezim"
    purpose: "code"
  - id: "readme"
    title: "README at xezim 0.11.0"
    url: "https://github.com/aionhw/xezim/blob/6558a1e64e251cbd8d0c4e936860af268cf7e04f/README.md"
  - id: "implementation"
    title: "Reviewed implementation: src/compiler/simulator.rs at xezim 0.11.0"
    url: "https://github.com/aionhw/xezim/blob/6558a1e64e251cbd8d0c4e936860af268cf7e04f/src/compiler/simulator.rs"
  - id: "activity"
    title: "xezim 0.11.0 release commit"
    url: "https://github.com/aionhw/xezim/commit/6558a1e64e251cbd8d0c4e936860af268cf7e04f"
  - id: "release-0-11-0"
    title: "xezim 0.11.0 release"
    url: "https://github.com/aionhw/xezim/releases/tag/0.11.0"
  - id: "coverage-0-11-0"
    title: "Coverage guide at xezim 0.11.0"
    url: "https://github.com/aionhw/xezim/blob/6558a1e64e251cbd8d0c4e936860af268cf7e04f/docs/coverage-guide.md"
  - id: "wreal-0-11-0"
    title: "Verilog-AMS wreal compliance test at xezim 0.11.0"
    url: "https://github.com/aionhw/xezim/blob/6558a1e64e251cbd8d0c4e936860af268cf7e04f/tests/sv_compliance/tests_advanced/50_wreal_nets.sv"
  - id: "development-1"
    title: "Project premise"
    url: "https://github.com/aionhw/xezim/blob/409bc7724a130a6fa6052d663dfc97db113cae3e/README.md"
  - id: "development-2"
    title: "Maintainer account"
    url: "https://www.linkedin.com/posts/bondan-rufen_from-skeptic-to-believer-building-xezim-activity-7475570954924978176-DaAy"
  - id: "activity-refresh"
    title: "Previously reviewed meaningful implementation update"
    url: "https://github.com/aionhw/xezim/commit/6558a1e64e251cbd8d0c4e936860af268cf7e04f"
  - id: "readme-current"
    title: "README at the October 5 implementation revision"
    url: "https://github.com/aionhw/xezim/blob/4751de222f962bf0a723a68b4084c9e7e53ee58c/README.md"
  - id: "upf-current"
    title: "Implemented UPF subset and limitations"
    url: "https://github.com/aionhw/xezim/blob/4751de222f962bf0a723a68b4084c9e7e53ee58c/docs/upf-guide.md"
  - id: "notes-current"
    title: "Post-0.11 correctness and performance notes"
    url: "https://github.com/aionhw/xezim/blob/4751de222f962bf0a723a68b4084c9e7e53ee58c/NOTES.md"
  - id: "activity-october"
    title: "Correct two-state stores from JIT code"
    url: "https://github.com/aionhw/xezim/commit/2fdc4c36f282088c04dbe66fae211f55ee9a44e4"
  - id: "activity-current"
    title: "Pre-randomization callback and mailbox value fixes"
    url: "https://github.com/aionhw/xezim/commit/a314f086513a8e0d82e0dfbcb460d3557535f097"
  - id: "review-20261011-1"
    title: "Joint randomization"
    url: "https://github.com/aionhw/xezim/commit/bb26f48e7a506778cc8ea3c3d0adad40d75d8313"
  - id: "review-20261011-2"
    title: "Captured development history"
    url: "https://github.com/aionhw/xezim/commits/main"
  - id: review-20261103-implementation
    title: "Resolved-net struct-default and side-effect regressions"
    url: https://github.com/aionhw/xezim/commit/16a3379ad5404eebcbb8a71f39ffe03cd9746bbb
  - id: review-20261103-resolver
    title: "Retain struct-default semantics in resolver code"
    url: https://github.com/aionhw/xezim/commit/60b49ed9d12ddfb38723e6c39072057bd370adb8
  - id: review-20261107-implementation
    title: "Executable library-package and diagnostic-location regressions"
    url: https://github.com/aionhw/xezim/commit/c64e6b9c2dea5c606fc61debc62a8299f226c5eb
  - id: review-20261112-activity
    title: "Immediate-child wait-fork semantics and scheduling regressions"
    url: https://github.com/aionhw/xezim/commit/185750167c60f4f10eab2abdfa520dd7ca6cbb27
  - id: review-20261112-implementation
    title: "Separate adopted descendants from immediate fork children"
    url: https://github.com/aionhw/xezim/commit/826b3a7db997f42378f6f213291420552453a936
  - id: review-20261112-tests
    title: "Immediate-child wait-fork scheduling regressions"
    url: https://github.com/aionhw/xezim/blob/185750167c60f4f10eab2abdfa520dd7ca6cbb27/tests/scheduling/wait_fork_immediate_children.rs
  - id: review-20261115-implementation
    title: Combine same-time dumpvars selections with per-call depths
    url: https://github.com/aionhw/xezim/commit/5f80ad357d4a234abd8c4876d1b6153898ab2369
  - id: review-20261115-activity
    title: Repeated dumpvars selection regressions
    url: https://github.com/aionhw/xezim/commit/863f4afc4b6cb4579fa14e0b9da2109fa6789b79
  - id: review-20261115-retained
    title: Retained dumpvars start-time and checkpoint handling
    url: https://github.com/aionhw/xezim/blob/dd55f104e29dbe18b4e9680798a6c8081da6eac5/src/compiler/simulator/system_tasks.rs
  - id: review-20261115-tests
    title: Waveform selections across blocks, depths and whole-design calls
    url: https://github.com/aionhw/xezim/blob/dd55f104e29dbe18b4e9680798a6c8081da6eac5/tests/gates/dumpvars_repeated_calls.rs
  - id: review-20261115-release
    title: xezim 0.11.6 release preceding the reviewed waveform changes
    url: https://github.com/aionhw/xezim/releases/tag/0.11.6
  - id: review-20261118-modport-core
    title: "Merged parser support for modport task and function prototypes"
    url: https://github.com/aionhw/xezim-core/pull/241
  - id: review-20261118-modport-tests
    title: "Merged modport method-prototype regression tests"
    url: https://github.com/aionhw/xezim/pull/1238
  - id: review-20261118-real-core
    title: "Merged real relational operand conversion before unknown-bit checks"
    url: https://github.com/aionhw/xezim-core/pull/242
  - id: review-20261118-real-tests
    title: "Merged real relational operator regressions with unknown bits"
    url: https://github.com/aionhw/xezim/pull/1244
  - id: review-20261118-struct
    title: "Merged registered-cell writes for struct concatenation leaves"
    url: https://github.com/aionhw/xezim/pull/1236
  - id: review-20261118-waveform
    title: "Merged exclusion of qualified parameter aliases from waveform scopes"
    url: https://github.com/aionhw/xezim/pull/1214
  - id: review-20261119-real-udn-core
    title: "Elaboration fix for real-valued user-defined nettype input ports"
    url: https://github.com/aionhw/xezim-core/commit/4f851d2ea5b56915f844b10cb772235e415dcdc9
  - id: review-20261119-activity
    title: "Simulator regressions for user-defined nettype input resolution"
    url: https://github.com/aionhw/xezim/commit/eebbca22bf79adcb1b8b35b0f036b4e6eb01e083
---

### Implementation context

xezim 0.11.0 documents built-in UVM DPI, broader constrained-random solving, functional and assertion coverage, opt-in statement/branch/toggle code coverage, specify timing checks and SDF `TIMINGCHECK` annotation. These are simulator features rather than separate design or synthesis stages. [0.11.0 release](#source-release-0-11-0); [Coverage guide](#source-coverage-0-11-0).

The authors explicitly describe AI agents as first-class contributors to the simulator implementation. This describes the development process, independently of whether a user runs an AI agent. [Reviewed source](#source-readme).

### RNM boundary

The 0.11.0 tree includes a Verilog-AMS `wreal` compliance test covering fractional real values, summed multi-driver resolution, signed contributions and module-port propagation. The README also documents user-defined nettypes with resolution functions. These are useful real-number-modeling primitives, but they do not establish a general Verilog-AMS analog solver. [wreal test](#source-wreal-0-11-0); [Reviewed source](#source-readme).

### Release boundary

Release 0.11.0 and the subsequent October 5 main-branch implementation were reviewed. At that earlier checkpoint, subsequent correctness/performance changes were marked unreleased; the November review below records the later 0.11.4 release. UVM and language conformance reports describe tested cases and workloads, not complete IEEE compliance. The xezim-core dependency is not a second activity repository. [0.11.0 release](#source-release-0-11-0); [Current notes](#source-notes-current); [Current implementation update](#source-activity-current).

[Implementation inspected](#source-implementation).

### Scope classification

SystemVerilog execution, UVM, randomization, coverage, timing checks and RNM-oriented net semantics remain Verification capabilities. Internal bytecode/native compilation and elaboration serve verification, not a separate Design or Synthesis stage. [Reviewed source](#source-readme).

SystemVerilog execution is conventional Verification. The maintainer’s development account supports AI-assisted provenance independently of conventional Verification. [AI/stage evidence](#source-readme).

### Development provenance review

Reviewed 2026-09-07: **AI-ASSISTED**. The maintainer credits AI-assisted parser, elaboration and event-driven/four-state simulator implementation. These are development contributions, independently of runtime Verification behavior. [Project premise](#source-development-1); [Maintainer account](#source-development-2).

### Power-aware and post-release verification

The current UPF path models supply states/voltage, switches, powered-down domain corruption, output isolation and retained values. It is explicitly a subset: level shifters are transparent, power-state-table legality and retention save/restore timing are not modeled, and several parsed commands have no runtime effect. These are Verification semantics, not physical power-grid design or a continuous electrical solver. [UPF guide](#source-upf-current).

The reviewed main branch also documents cocotb integration, FST output, cache/native/JIT execution and post-release fixes for DPI failures, class/struct access, virtual interfaces, memory sensitivity and two-state JIT stores. Performance comparisons remain maintainer-reported, workload-specific results; the catalog does not claim blanket speed superiority. [Current README](#source-readme-current); [Post-release notes](#source-notes-current); [JIT correctness commit](#source-activity-october).

### Current implementation and operating boundaries

The reviewed randomization integration jointly solves random object arrays and wide subobject members. The sampled later history also changes DPI export/formal handling, automatic task storage, block shadowing and fork-child wake-up handling. [Joint randomization](#source-review-20261011-1) · [Captured development history](#source-review-20261011-2)

No new general analog solver or expanded RNM coverage is established by these commits. Existing resolved-real/wreal notes should be retained on their original evidence. This research did not rerun simulator conformance or UVM workloads.

### Selection and current source review

Current main repairs scalarized resolver handling when a returned struct has member defaults or an actual argument has side effects, with dedicated executable regressions. This adds correctness evidence for resolved-net execution without asserting broader RNM coverage or an analog solver. The inspected 0.11.4 release precedes these November changes; earlier 0.11.0-only release wording is historical. SystemVerilog/UVM coverage remains workload-specific. The adequate description, ordinary Verification and separately sourced AI-assisted maintainer account are retained. [Implementation and regression evidence](#source-review-20261103-implementation). [Related correction](#source-review-20261103-resolver).

### November implementation review

New executable regressions distinguish packages in library files from separately compiled package sources and check diagnostic locations. This maintains SystemVerilog verification behavior without establishing a general analog solver or broader RNM support. The upstream regressions were inspected, not executed. [Reviewed regressions](#source-review-20261107-implementation).


### November 12, 2026 implementation review

The November 12 implementation distinguishes adopted descendants from immediate fork children so wait fork waits only for immediate children while disable fork can still reach inherited descendants. The following test checkpoint adds joined/join_none, descendant, task and disable-fork coverage, plus a DPI exported-task timing case. That DPI case uses standard-derived expected timing because the reference simulator rejects the timing-control form; cross-simulator reproduction is not claimed. Conventional Verification and existing development provenance remain unchanged. [Integrated activity](#source-review-20261112-activity). [Separate adopted descendants from immediate fork children](#source-review-20261112-implementation) · [Immediate-child wait-fork scheduling regressions](#source-review-20261112-tests).

### Waveform-selection correctness

The waveform path now combines every `$dumpvars` selection made at the time dumping starts, preserving each call's own depth and deduplicating selected signals. Regressions cover repeated calls in one block, calls in separate blocks at that same time, independent depth limits and an argument-free whole-design selection. Calls at later simulation times remain checkpoints of the running dump. [Implementation](#source-review-20261115-implementation) · [Retained handling](#source-review-20261115-retained) · [Regression checkpoint](#source-review-20261115-activity) · [Executable cases](#source-review-20261115-tests).

The canonical 0.11.6 release precedes these November 14 development commits; its publication does not establish inclusion of these fixes. The later tip only synchronizes a core revision and is not promoted to the meaningful checkpoint. This review inspected source and tests without running conformance workloads. Conventional Verification, the existing AI-development evidence and the real-number-modeling/analog-solver boundary remain unchanged. [Release boundary](#source-review-20261115-release) · [Integrated waveform correction](#source-review-20261115-implementation).

### Integrated language and waveform corrections

Source review and targeted activity capture: November 18, 2026. Earlier meaningful-activity checkpoints are retained separately from the newer implementation evidence below.

Six pull requests merged on November 17, 2026 UTC cover four related correctness areas: modport task/function prototype parsing and its regression tests; real relational operand conversion before unknown-bit checks and its tests; registered-cell writes for struct concatenation leaves; and exclusion of package-, `$unit`- and class-qualified parameter aliases from waveform scopes. The paired core and simulator changes are one implementation/test story per behavior, not six independent capabilities. [Modport parser](#source-review-20261118-modport-core) · [Modport tests](#source-review-20261118-modport-tests) · [Real comparison implementation](#source-review-20261118-real-core) · [Real comparison tests](#source-review-20261118-real-tests) · [Struct writes](#source-review-20261118-struct) · [Waveform aliases](#source-review-20261118-waveform).

The prototype parser still rejects default arguments and does not establish interface-signature matching. The real-comparison correction retains integral X/Z behavior; continuous/nonblocking struct-concatenation assignments and other alias forms remain separate boundaries. These merged changes do not establish full IEEE conformance, release inclusion, broader RNM support or a general analog solver. Upstream regressions were inspected, not executed. Conventional Verification, existing AI-development evidence and the single canonical activity repository remain unchanged.

### November 19, 2026 review

The reviewed simulator regression covers real-valued source expressions including variables, literals, package and struct members passed to a user-defined nettype input. These source-to-sink assignments keep a separately resolved input net unless both ends are compatible nets of the same user-defined nettype. The implementation lives in xezim-core; only xezim itself counts for the activity series. This fixes RNM elaboration semantics and does not add an analog solver or establish tagged release inclusion. [Core implementation](#source-review-20261119-real-udn-core) · [Simulator regression](#source-review-20261119-activity).
