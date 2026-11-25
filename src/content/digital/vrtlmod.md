---
name: "vRTLmod"
aliases: ["Verilated RTL Injection Modifier"]
description: "LLVM/Clang-based transformation of Verilator-generated C++ or SystemC models to expose selected RTL state as runtime fault-injection targets. The generated API supports controlled injection and differential comparison; the November 2026 implementation adds Verilator 5 layout and clocked-injection compatibility."
scope:
  verification: { ai: false }
access: "Apache-2.0 public C++ source; requires matching Verilator and LLVM/Clang versions. SystemC is required for the applicable tests or model path; the reviewed source documents LLVM 13–18 and Verilator 4.228/5.054 regression targets."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/tum-ei-eda/vrtlmod"
    purpose: code
  - id: activity
    title: "November 6 Verilator 5 compatibility and runtime injection regression integration"
    url: "https://github.com/tum-ei-eda/vrtlmod/commit/658641ee0233a240fedfd0d8c7e39697a0192287"
  - id: earlier
    title: "March 26 configurable Clang standard library selection"
    url: "https://github.com/tum-ei-eda/vrtlmod/commit/f7fccfe1fbdad617dd82c648e799ca23f085970e"
  - id: rewrite
    title: "Retained generated-code injection rewrite"
    url: "https://github.com/tum-ei-eda/vrtlmod/blob/c78e43cee2990105306f9bfeaad14ce709a332d8/src/passes/injectionrewrite.cpp"
  - id: scheduling
    title: "Retained clock-domain and held-state fault-injection regression"
    url: "https://github.com/tum-ei-eda/vrtlmod/blob/c78e43cee2990105306f9bfeaad14ce709a332d8/test/scheduling/scheduling_test.cpp"
  - id: api
    title: "Retained generated target API and differential comparison implementation"
    url: "https://github.com/tum-ei-eda/vrtlmod/blob/c78e43cee2990105306f9bfeaad14ce709a332d8/src/vapi/templates/vrtlmodapi_header.cpp"
  - id: overview
    title: "Reviewed architecture and version requirements"
    url: "https://github.com/tum-ei-eda/vrtlmod/blob/c78e43cee2990105306f9bfeaad14ce709a332d8/README.adoc"
  - id: website
    title: "Official user documentation"
    url: "https://tum-ei-eda.github.io/vrtlmod/"
    purpose: official
---

### Implemented operation and limits

The transformation rewrites the Verilated simulation model using Clang analysis, exposes injectable targets and generates an API for injection and differential observation. Unlike rtl-buddy-xeno's source-level structural mutants, this approach changes selected state during execution without regenerating the HDL mutant for each injection. The November scheduling test exercises held state, reset, derived clocks and independent clocks with injection counters and expected state. These are targeted runtime fault models rather than transistor-level defects or a general timing-fault simulator. [Rewrite](#source-rewrite) · [Scheduling regression](#source-scheduling) · [API](#source-api).

### Reviewed maintenance

March adds configurable Clang standard-library selection. November 6 integrates support for Verilator 5 generated C++/SystemC model layouts, clocked injection and additional regression cases; the later documentation merge is recorded as raw activity. Upstream reports tests against Verilator 4.228 and 5.054 with LLVM 18 and SystemC 2.3.4. Build against the version that generated the model; arbitrary future Verilator layouts are not guaranteed. No build, injection campaign or differential comparison was independently run. [March change](#source-earlier) · [November integration](#source-activity) · [Requirements](#source-overview).
