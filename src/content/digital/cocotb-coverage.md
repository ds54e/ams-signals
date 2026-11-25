---
name: "cocotb-coverage"
aliases: ["cocotb_coverage"]
description: "Python functional-coverage and constrained-randomization extensions for cocotb testbenches, including coverpoints, cross coverage, pass/fail checks and XML/YAML coverage merging. The September 2026 development source corrects merged bin identification and CoverCheck semantics; it does not collect simulator-native code coverage."
scope:
  verification: { ai: false }
access: "BSD-2-Clause Python source; requires compatible Python and cocotb for HDL testbench use. The reviewed merge corrections are on the development branch after release 2.0."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/mciepluc/cocotb-coverage"
    purpose: code
  - id: activity
    title: "September 22 CoverCheck merge correctness integration"
    url: "https://github.com/mciepluc/cocotb-coverage/commit/e295c4846911a5b228c3aefb124b34f0ce7f7f9c"
  - id: bin-fix
    title: "XML bin identity correction"
    url: "https://github.com/mciepluc/cocotb-coverage/commit/1638ddf52b369c1f8c59fb675399990a37ba5dc1"
  - id: seed-fix
    title: "Integrated reproducible test seed and cocotb configuration correction"
    url: "https://github.com/mciepluc/cocotb-coverage/commit/82cfbb3083e42a2a0eea08ad03597927d70850d8"
  - id: coverage
    title: "Retained coverage primitives and report merging"
    url: "https://github.com/mciepluc/cocotb-coverage/blob/6bae4f629b0edde5169d20ca792627495ab7a38e/cocotb_coverage/coverage.py"
  - id: covercheck-test
    title: "Retained pass/fail merge regression cases"
    url: "https://github.com/mciepluc/cocotb-coverage/blob/6bae4f629b0edde5169d20ca792627495ab7a38e/tests/test_coverage/test_covercheck_merge.py"
  - id: bin-test
    title: "Retained XML bin-name regression cases"
    url: "https://github.com/mciepluc/cocotb-coverage/blob/6bae4f629b0edde5169d20ca792627495ab7a38e/tests/test_coverage/test_xml_bin_names.py"
---

### Implemented operation and limits

Python coverage decorators support functional coverage sampling, cross coverage and pass/fail checks. The independently useful operation is executable sampling and merging of its own report formats, not the HDL simulator binding provided by cocotb or the UCIS interchange/storage workflow of PyUCIS. In contrast to the separately listed PyVSC coverage and constraint model API, this package exposes its own decorators and CoverCheck failure semantics. Neither merged coverage nor a passed CoverCheck proves complete verification. [Implementation](#source-coverage).

### Reviewed maintenance

April's test-seed repair was integrated in September, together with fixes that recognize XML bins by attributes rather than names and preserve live CoverCheck semantics during report merging. A failed sample must prevent full check coverage even if enough passing samples are present in other files. The retained tests include older XML exports and YAML. These are substantive corrections in a mature but low-frequency project; the later version bump and example-only correction do not replace the meaningful checkpoint. The default branch is reviewed, not a claim of inclusion in the earlier 2.0 release. No simulation or regression was independently run. [Seed correction](#source-seed-fix) · [Bin correction](#source-bin-fix) · [Check correction](#source-activity) · [Check tests](#source-covercheck-test) · [Bin tests](#source-bin-test).
