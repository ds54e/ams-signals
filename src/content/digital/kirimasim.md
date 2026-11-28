---
name: "kirimasim"
aliases: ["KirimaSim"]
description: "Early SystemVerilog simulator using a pinned slang frontend, a verified serialized circuit IR and a four-state scheduling VM, with optional native C++ execution for eligible RTL and VCD/FST dumping. Broader UVM, constrained randomization, concurrent assertions, coverage and DPI-C remain unfinished."
scope:
  verification: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Codex GPT-6 is explicitly credited on the November 28 randsequence lowering repair and executable scheduler, dump and VPI regression additions. The reviewed main retains the statement-owned production lookup and scheduler tests."
  sources: ["randsequence","randsequence-retained","scheduler-tests"]
  reviewedAt: "2026-11-28"
access: "Public C++23 implementation (Apache-2.0 with LLVM exception); native build and selected waveform dependencies are documented."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical kirimasim simulator"
    url: "https://github.com/kurochan001/kirimasim"
    purpose: code
  - id: readme
    title: "Current execution tiers, validation and unfinished language features"
    url: "https://github.com/kurochan001/kirimasim/blob/0106ed7d34f9864bb7b143fdc6418e38e63ad22e/README.md"
  - id: activity
    title: "November 28 observable equal-store scheduler, waveform and VPI regressions"
    url: "https://github.com/kurochan001/kirimasim/commit/70785f19b018e4c105f31d549970bbf981d834b5"
  - id: randsequence
    title: "Codex-credited statement-owned randsequence lowering"
    url: "https://github.com/kurochan001/kirimasim/commit/c61db05d36640fdbb8237894e2508c39e564e111"
  - id: randsequence-retained
    title: "Retained production identity resolution and explicit unsupported cases"
    url: "https://github.com/kurochan001/kirimasim/blob/0106ed7d34f9864bb7b143fdc6418e38e63ad22e/src/front/lower_randsequence.cpp"
  - id: scheduler-tests
    title: "Retained four-state scheduling regression implementation"
    url: "https://github.com/kurochan001/kirimasim/blob/0106ed7d34f9864bb7b143fdc6418e38e63ad22e/tests/unit/scheduler_test.cpp"
  - id: native-tier
    title: "November 22 native execution of eligible combinational RTL"
    url: "https://github.com/kurochan001/kirimasim/commit/859ebca565ba9814f5a5920f9aed1d71b5530bb3"
  - id: benchmarks
    title: "Maintainer-reported P3 performance measurements"
    url: "https://github.com/kurochan001/kirimasim/blob/0106ed7d34f9864bb7b143fdc6418e38e63ad22e/docs/BENCHMARKS.md"
  - id: ai-policy
    title: "Maintainer AI-development policy"
    url: "https://github.com/kurochan001/kirimasim/blob/0106ed7d34f9864bb7b143fdc6418e38e63ad22e/docs/spec/AI_POLICY.md"
  - id: uvm-tests
    title: "Related UVM conformance-test development and explicit oracle limitations"
    url: "https://github.com/kurochan001/kirimasim-uvm-tests/blob/78d162ef8a4376e9479fa8c725e79983b7be2386/README.md"
  - id: language-tests
    title: "Related SystemVerilog language tests"
    url: "https://github.com/kurochan001/kirimasim-tests"
---

### Implementation and selection

The simulator consumes SystemVerilog through pinned slang, lowers supported constructs into SIR, verifies and executes the representation, and can save it for later simulation. Its shared scheduler, four-state VM and optional native execution are a distinct simulator workflow. November 22 native-tier integration and November 28 randsequence lowering and scheduler-observation tests show technical follow-through. The public frontend code explicitly rejects unsupported randsequence forms rather than accepting them silently. [Overview](#source-readme) · [Native tier](#source-native-tier) · [Lowering](#source-randsequence-retained) · [Scheduler tests](#source-scheduler-tests).

### Scope and limits

Verification is conventional simulation, not a model-driven execution engine. The implementation is early and the verified internal representation is not classified as a separate user-facing RTL design or synthesis system. The maintainer reports P2/P3 benchmark results on fixed populations; these are not independent measurements or broad IEEE 1800 conformance claims. The UVM suite is a separate evolving companion: its documented cases include AI-reviewed oracles and open coverage/approval boundaries. It does not establish that kirimasim can execute the full UVM reference implementation. Related test histories are not counted as simulator activity. [Benchmarks](#source-benchmarks) · [UVM tests](#source-uvm-tests) · [Language tests](#source-language-tests).

The explicit Codex implementation credit and retained lowering and executable regression code support AI-ASSISTED development, independently of simulator runtime behavior. No upstream tests were independently executed for this review. [AI policy](#source-ai-policy) · [Credited implementation](#source-randsequence) · [Activity](#source-activity).
