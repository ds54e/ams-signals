---
name: "Icarus Verilog"
aliases: []
description: "Verilog compiler and event-driven simulator supporting a SystemVerilog subset. The VVP runtime and VPI extensions support testbench-driven verification, while a separate source-translation target emits Verilog-1995 for supported newer constructs, with documented language and conversion limitations."
scope:
  design:
    ai: false
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited for implemented constant-function unpacked-array handling across elaboration and compile-time evaluation. The canonical project retains the code."
  sources: ["development-implementation-20261018", "development-retained-20261018"]
  reviewedAt: '2026-10-18'
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-11-15"
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
  - id: "development-implementation-20261018"
    title: "AI-credited executable implementation"
    url: "https://github.com/steveicarus/iverilog/commit/c8611317c6a0fec68df3f219ef9839c8cfad27f4"
  - id: "development-retained-20261018"
    title: "Retained executable code at the reviewed canonical head"
    url: "https://github.com/steveicarus/iverilog/blob/ad0260be5bb384e13ef68eef6881d62bbf16df93/elab_expr.cc"
  - id: "activity-review-20261115"
    title: "Preserve dispatch to overrides of empty virtual methods"
    url: "https://github.com/steveicarus/iverilog/commit/e77e9ef21b8e747692bf2ffd97dbd91a5c52a100"
  - id: "implementation-review-20261115"
    title: "Retained virtual-call elaboration repair"
    url: "https://github.com/steveicarus/iverilog/blob/e77e9ef21b8e747692bf2ffd97dbd91a5c52a100/elaborate.cc"
  - id: "tests-review-20261115"
    title: "Empty virtual-function and task dispatch regression"
    url: "https://github.com/steveicarus/iverilog/blob/e77e9ef21b8e747692bf2ffd97dbd91a5c52a100/ivtest/ivltests/br_gh1786.v"
  - id: "test-targets-review-20261115"
    title: "VVP regression configuration and unsupported class translation"
    url: "https://github.com/steveicarus/iverilog/blob/e77e9ef21b8e747692bf2ffd97dbd91a5c52a100/ivtest/vvp_tests/br_gh1786.json"
  - id: "classes-review-20261115"
    title: "Integrated parameterized-class implementation and regressions"
    url: "https://github.com/steveicarus/iverilog/commit/24116138a7b460c9dcbea1145f6ad68f27b5f178"
  - id: "class-implementation-review-20261115"
    title: "Retained class specialization and parameter binding"
    url: "https://github.com/steveicarus/iverilog/blob/e77e9ef21b8e747692bf2ffd97dbd91a5c52a100/elab_scope.cc"
  - id: "class-limits-review-20261115"
    title: "Class parameters still require default values"
    url: "https://github.com/steveicarus/iverilog/blob/e77e9ef21b8e747692bf2ffd97dbd91a5c52a100/pform.cc"
  - id: "release-review-20261115"
    title: "Published stable Icarus Verilog 13.0"
    url: "https://github.com/steveicarus/iverilog/releases/tag/v13_0"
---

### Implementation and scope

The compiler and VVP event runtime provide conventional HDL Verification, with VPI connecting external testbench infrastructure. Separately, the exposed vlog95 target converts supported newer Verilog constructs into Verilog-1995 source; this implemented user-facing source transformation supports conventional Design. The classification does not follow merely from the simulator's internal parser or elaborator. [Project overview](#source-readme); [translation contract](#source-translation); [source generator](#source-translation-code).

### Language and project boundary

SystemVerilog support remains a growing subset, and this upstream project is distinct from the UVM-focused derivative. The source translator has explicit unsupported constructs and known conversion limitations; it is not a general lossless conversion or full SystemVerilog frontend claim. [Translation limits](#source-translation).

### Reviewed activity

The September 28 UTC change makes indexed signal expressions own their word-index expressions and duplicates them correctly, repairing lifetime/ownership handling across elaboration. [Reviewed change](#source-activity-refresh); [current expression representation](#source-implementation).

### Current activity review

Reviewed 2026-10-05. Nonblocking assignments now own their event-control and count expressions through managed pointers. The inspected implementation repairs elaboration lifetime handling; it does not claim new language conformance. [Reviewed change](#source-activity-current).

### Development provenance

Claude is credited for implemented constant-function unpacked-array handling across elaboration and compile-time evaluation. The canonical project retains the code. This supports AI-assisted development. [AI-credited executable implementation](#source-development-implementation-20261018) · [Retained executable code at the reviewed canonical head](#source-development-retained-20261018).

### Current development and release boundary

The November 15 default-branch merge adds parameterized classes with value and type parameters, positional/named overrides and specialization reuse. Its regressions cover value, type and string parameters, inheritance and rejected declarations. Class parameters without defaults remain unsupported. These are additions to the SystemVerilog subset, not complete language support or class translation through vlog95. [Integrated implementation and regressions](#source-classes-review-20261115) · [Retained specialization implementation](#source-class-implementation-review-20261115) · [Default-value limit](#source-class-limits-review-20261115) · [Translation test boundary](#source-test-targets-review-20261115).

The subsequent merge preserves calls to empty virtual methods so a base-class handle can dispatch to a derived override. The regression exercises virtual functions, tasks, an intermediate empty override and an empty nonvirtual method. This implementation repair is the meaningful first-parent checkpoint at `e77e9ef21b8e747692bf2ffd97dbd91a5c52a100`. [Integrated repair](#source-activity-review-20261115) · [Retained code](#source-implementation-review-20261115) · [Regression](#source-tests-review-20261115).

Stable 13.0 was published on March 2; the reviewed November master changes are separate development work and are not attributed to that release. Existing Design, Verification and development-provenance classifications remain supported. Review was static: source, regression fixtures and release metadata were inspected without compiling or running upstream code. [Stable release](#source-release-review-20261115).
