---
name: Bender
description: Manages RTL IP dependencies, ordered source sets and tool inputs for reusable hardware projects. Its Slang-backed SystemVerilog pickling can trim unreachable sources and rename module, package and interface declarations with their references; generated scripts prepare downstream EDA tools rather than performing synthesis or verification themselves.
scope:
  design:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: A Claude-coauthored June 2026 code change added parse-failure safeguards for script generation and source pickling. The reviewed master implementation retains the corresponding safeguards, including refusing to rewrite partially parsed source trees.
  sources: [parse-safety, pickle, script]
  reviewedAt: '2026-11-07'
access: Public Rust implementation with a C++ Slang bridge enabled by the default feature set. Source rewriting requires parseable SystemVerilog; downstream EDA tools remain separate dependencies.
addedAt: '2026-11-07'
reviewedAt: '2026-11-07'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/pulp-platform/bender
  purpose: code
- id: readme
  title: Dependency, source-set and tool-input workflow
  url: https://github.com/pulp-platform/bender/blob/e80020910fc91fd223dd64a240fd3bd5fb607b9d/README.md
- id: pickle
  title: Slang source pickling, reachability and declaration/reference rewriting
  url: https://github.com/pulp-platform/bender/blob/e80020910fc91fd223dd64a240fd3bd5fb607b9d/src/cmd/pickle.rs
- id: script
  title: Source filtering and retained parse-error handling
  url: https://github.com/pulp-platform/bender/blob/e80020910fc91fd223dd64a240fd3bd5fb607b9d/src/cmd/script.rs
- id: pickle-tests
  title: Pickling regression fixtures for trimming and renaming
  url: https://github.com/pulp-platform/bender/blob/e80020910fc91fd223dd64a240fd3bd5fb607b9d/tests/pickle.rs
- id: parse-safety
  title: Claude-coauthored executable parse-safety change
  url: https://github.com/pulp-platform/bender/commit/e96194875bbae5cf4ebeeffff6bed1feacc6a129
- id: activity
  title: Integrated Slang FFI slice-interface maintenance
  url: https://github.com/pulp-platform/bender/commit/b407dd65f7e8a8136bd64f47334d50d92af7d679
---

### Selection and implementation

Bender fills the reusable RTL IP dependency and source-preparation workflow, with substantive implementation and correctness maintenance beyond a single release. The reviewed implementation resolves source sets and provides Slang-backed source transformations, not merely a list of tool templates. The pickler selects reachable trees and rewrites declarations followed by references; fixtures explicitly cover modules, packages, interfaces, excluded names, undefined references and scoped parameters. [Workflow](#source-readme) · [Pickler](#source-pickle) · [Regression fixtures](#source-pickle-tests).

### Scope and operating boundaries

Source pickling and renaming are user-facing Design transformations. Emitting scripts or source lists for synthesis, simulators and backend tools does not itself establish Synthesis, Verification or Layout. The Slang bridge is part of the default Rust/C++ build, but source rewriting refuses partially parsed trees rather than claiming support for encrypted or otherwise unparseable input. The inspected upstream tests are implementation evidence; they were not executed for this catalog review. [Source handling](#source-script) · [Parse safety](#source-pickle).

### Development provenance

The June change explicitly credits Claude Opus as code coauthor and adds executable parse-error handling and regression tests. The reviewed master code retains the source-rewrite refusal and script safeguards, although later maintenance changes their surrounding implementation. This supports AI-ASSISTED for the attributed contribution, not runtime AI in any functional stage. [Attributed code change](#source-parse-safety) · [Retained pickler](#source-pickle) · [Retained script handling](#source-script).

### Reviewed activity

The meaningful checkpoint is the September 10, 2026 canonical merge changing the Slang Rust/C++ FFI from vectors to slices. It is technical maintenance, not a claim that the July release contains every subsequently integrated feature. First-parent activity and capture identity are recorded separately in the snapshot. [Integrated maintenance](#source-activity).
