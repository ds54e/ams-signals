---
name: "Icarus Verilog"
aliases: []
description: "Verilog compiler and event-driven simulator supporting a SystemVerilog subset. The VVP runtime and VPI extensions support testbench-driven verification, while a separate source-translation target emits Verilog-1995 for supported newer constructs, with documented language and conversion limitations."
scope:
  design:
    ai: false
  verification:
    ai: false
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-05"
sources:
  - id: "code"
    title: "Canonical Icarus Verilog repository"
    url: "https://github.com/steveicarus/iverilog"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/steveicarus/iverilog/blob/2e81fcccb36edd2c4dd357034061fc9f2df36548/README.md"
  - id: "implementation"
    title: "Reviewed implementation: netlist.h"
    url: "https://github.com/steveicarus/iverilog/blob/2e81fcccb36edd2c4dd357034061fc9f2df36548/netlist.h"
  - id: "activity"
    title: "Merge pull request #1412 from drewbabel/fix-countones-vpi-buffer"
    url: "https://github.com/steveicarus/iverilog/commit/5ab23063fe15bae91f8453e5f50a35cb03ea3206"
  - id: "website"
    title: "Official project documentation"
    url: "https://steveicarus.github.io/iverilog/"
    purpose: "official"
  - id: "activity-refresh"
    title: "Own and free indexed signal expressions"
    url: "https://github.com/steveicarus/iverilog/commit/2e81fcccb36edd2c4dd357034061fc9f2df36548"
  - id: "translation"
    title: "Documented Verilog-1995 source translation and limits"
    url: "https://github.com/steveicarus/iverilog/blob/2e81fcccb36edd2c4dd357034061fc9f2df36548/Documentation/targets/tgt-vlog95.rst"
  - id: "translation-code"
    title: "Implemented Verilog-1995 source generator"
    url: "https://github.com/steveicarus/iverilog/blob/2e81fcccb36edd2c4dd357034061fc9f2df36548/tgt-vlog95/vlog95.c"
  - id: "activity-current"
    title: "Own nonblocking-assignment event-control expressions"
    url: "https://github.com/steveicarus/iverilog/commit/467d830d2435d28d63ecdfc011c5bf150f15f206"
---

### Implementation and scope

The compiler and VVP event runtime provide conventional HDL Verification, with VPI connecting external testbench infrastructure. Separately, the exposed vlog95 target converts supported newer Verilog constructs into Verilog-1995 source; this implemented user-facing source transformation supports conventional Design. The classification does not follow merely from the simulator's internal parser or elaborator. [Project overview](#source-readme); [translation contract](#source-translation); [source generator](#source-translation-code).

### Language and project boundary

SystemVerilog support remains a growing subset, and this upstream project is distinct from the UVM-focused derivative. The source translator has explicit unsupported constructs and known conversion limitations; it is not a general lossless conversion or full SystemVerilog frontend claim. [Translation limits](#source-translation).

### Reviewed activity

The September 28 UTC change makes indexed signal expressions own their word-index expressions and duplicates them correctly, repairing lifetime/ownership handling across elaboration. [Reviewed change](#source-activity-refresh); [current expression representation](#source-implementation).

### Current activity review

Reviewed 2026-10-05. Nonblocking assignments now own their event-control and count expressions through managed pointers. The inspected implementation repairs elaboration lifetime handling; it does not claim new language conformance. [Reviewed change](#source-activity-current).
