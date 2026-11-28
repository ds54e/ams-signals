---
name: "Lyra"
aliases: ["lyra-sv"]
description: "SystemVerilog compiler and simulator using slang and LLVM, with native executable generation and a reusable build cache. Implements selected verification constructs including clocking-block sampling and weighted randcase execution; a public clause-organized conformance suite distinguishes implemented behavior from remaining language gaps."
scope:
  verification: { ai: false }
access: "MIT source; documented native build uses Bazel/Bazelisk on x86-64 Linux."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/hankhsu1996/lyra"
    purpose: code
  - id: readme
    title: "Project overview and operating boundaries"
    url: "https://github.com/hankhsu1996/lyra/blob/8984c1560790fdc691d6932f1a4dde9fe87aa644/README.md"
  - id: activity
    title: "Reviewed meaningful implementation checkpoint"
    url: "https://github.com/hankhsu1996/lyra/commit/8984c1560790fdc691d6932f1a4dde9fe87aa644"
  - id: clocking
    title: "November 25 clocking input sampling correction"
    url: "https://github.com/hankhsu1996/lyra/commit/d55cec6463374498846e88abe2ed35671e2b8a20"
  - id: clocking-code
    title: "Retained clocking-block lowering implementation"
    url: "https://github.com/hankhsu1996/lyra/blob/8984c1560790fdc691d6932f1a4dde9fe87aa644/src/lyra/lowering/hir_to_mir/clocking_block.cpp"
  - id: clocking-test
    title: "Clocking input skew regression"
    url: "https://github.com/hankhsu1996/lyra/blob/8984c1560790fdc691d6932f1a4dde9fe87aa644/conformance/cases/14_clocking_blocks/input_sampling_follows_the_skew/main.sv"
  - id: randcase
    title: "November 27 weighted randcase execution"
    url: "https://github.com/hankhsu1996/lyra/commit/d3a4e8dc12c43354f1b37d504fa45bffab7f6f20"
  - id: randcase-code
    title: "Retained randcase lowering"
    url: "https://github.com/hankhsu1996/lyra/blob/8984c1560790fdc691d6932f1a4dde9fe87aa644/src/lyra/lowering/hir_to_mir/statement/branches.cpp"
  - id: randcase-test
    title: "Executable weighted-selection conformance case"
    url: "https://github.com/hankhsu1996/lyra/blob/8984c1560790fdc691d6932f1a4dde9fe87aa644/conformance/cases/18_random_value_generation/randcase_takes_a_branch_by_weight/main.sv"
  - id: temporary-test
    title: "Retained temporary method receiver regression"
    url: "https://github.com/hankhsu1996/lyra/blob/8984c1560790fdc691d6932f1a4dde9fe87aa644/conformance/cases/07_aggregate_data_types/a_method_changes_a_value_a_call_returns/main.sv"
  - id: conformance
    title: "Conformance framework and tool adapters"
    url: "https://github.com/hankhsu1996/lyra/blob/8984c1560790fdc691d6932f1a4dde9fe87aa644/conformance/README.md"
  - id: language
    title: "Language conformance rules and known gaps"
    url: "https://github.com/hankhsu1996/lyra/blob/8984c1560790fdc691d6932f1a4dde9fe87aa644/docs/architecture/language_conformance.md"
---

## Implementation and selection

Lyra compiles analyzed SystemVerilog into a native program and executes it; unchanged inputs can use its cached program. The separate clause-organized self-checking programs and adapters for Lyra and Verilator provide inspectable language-conformance evidence. On November 25 the clocking input correction distinguishes #1step, #0 and nonzero skew sampling, including sampling relative to the clocking event and nonblocking updates. November 27 implements weighted randcase selection through HIR and MIR lowering. November 28 corrects method receivers that are temporary values rather than named storage, with aggregate and class cases. [Clocking implementation](#source-clocking) · [Retained lowering](#source-clocking-code) · [Clocking regression](#source-clocking-test) · [Randcase implementation](#source-randcase) · [Retained lowering](#source-randcase-code) · [Randcase regression](#source-randcase-test) · [Latest regression](#source-temporary-test).

## Limits

The simulator targets IEEE 1800-2023 but its own conformance documentation explicitly describes unsupported or not-yet-correct behavior. The individual executable cases and upstream nightly results do not establish full SystemVerilog, UVM, cocotb or AMS conformance. The compiler and its conformance suite were not independently executed. Native compilation is not logic synthesis. No qualifying specific AI-development contribution was verified in this review. [Conformance framework](#source-conformance) · [Language rules](#source-language).
