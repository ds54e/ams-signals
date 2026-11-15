---
name: "slang"
aliases: []
description: "SystemVerilog frontend exposing parsing, elaboration, type checking and reusable design representations. Its standalone tools and slang-tidy provide static analysis, while C++ APIs and pyslang Python bindings support source inspection and compiler integration; parsing assertions does not itself prove their properties."
scope:
  design:
    ai: false
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited for correcting parseGuess to handle member keywords that do not parse as members, avoiding a null dereference. The canonical project retains the parser correction and tests."
  sources: ["development-implementation-20261018", "development-retained-20261018"]
  reviewedAt: '2026-10-18'
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-11-15"
sources:
  - id: "code"
    title: "Canonical slang repository"
    url: "https://github.com/MikePopoloski/slang"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/MikePopoloski/slang/blob/2f93a7a12fed6f4903cd342f44f2da4216b5ce79/README.md"
  - id: "implementation"
    title: "Reviewed implementation: source/ast/expressions/OperatorExpressions.cpp"
    url: "https://github.com/MikePopoloski/slang/blob/2f93a7a12fed6f4903cd342f44f2da4216b5ce79/source/ast/expressions/OperatorExpressions.cpp"
  - id: "activity"
    title: "Fix instance cache key ignoring arrayed interface port connections (#1949)"
    url: "https://github.com/MikePopoloski/slang/commit/bb629fee263d8ed82b330098e4e29296bdb6bcf6"
  - id: "website"
    title: "Official project documentation"
    url: "https://sv-lang.com"
    purpose: "official"
  - id: "activity-refresh"
    title: "Allow string replication with a zero multiplier"
    url: "https://github.com/MikePopoloski/slang/commit/2f93a7a12fed6f4903cd342f44f2da4216b5ce79"
  - id: "activity-current"
    title: "Checked Python symbol-to-Scope conversions"
    url: "https://github.com/MikePopoloski/slang/commit/6965da187d9c3b5aa2fa2ee23f19c228f90ef74a"
  - id: "development-implementation-20261018"
    title: "AI-credited executable implementation"
    url: "https://github.com/MikePopoloski/slang/commit/6ea0db699d0947bed17b278faad9e24cd2935a43"
  - id: "development-retained-20261018"
    title: "Retained executable code at the reviewed canonical head"
    url: "https://github.com/MikePopoloski/slang/blob/b7f11c1f034029b9534444ee9d63090037f23e87/source/parsing/Parser.cpp"
  - id: "review-20261022-tidy"
    title: "Current slang-tidy configuration and checks"
    url: "https://github.com/MikePopoloski/slang/blob/3b351a52b15755b896d3b0144ae0432547d86618/tools/tidy/README.md"
  - id: review-20261112-activity
    title: "Constant-case unevaluated-branch diagnostic correctness"
    url: https://github.com/MikePopoloski/slang/commit/0d49773adefee549c5fab7fac6485faa98112e1c
  - id: review-20261112-implementation
    title: "Known-branch matching and unevaluated case bodies"
    url: https://github.com/MikePopoloski/slang/blob/0d49773adefee549c5fab7fac6485faa98112e1c/source/ast/statements/ConditionalStatements.cpp
  - id: review-20261112-tests
    title: "Positive and negative constant-case semantic regressions"
    url: https://github.com/MikePopoloski/slang/blob/0d49773adefee549c5fab7fac6485faa98112e1c/tests/unittests/ast/StatementTests.cpp
  - id: review-20261115-activity
    title: "Restrict new expressions to LRM-permitted contexts"
    url: https://github.com/MikePopoloski/slang/commit/6d677aecd5ad4febec25f0c2632caec42ea6d361
  - id: review-20261115-retained
    title: "Retained context-sensitive new-expression parsing"
    url: https://github.com/MikePopoloski/slang/blob/2664c559c78c150e8b144c8be2cfc1871a66304f/source/parsing/Parser_expressions.cpp
  - id: review-20261115-ast-tests
    title: "Positive and negative new-expression compilation regressions"
    url: https://github.com/MikePopoloski/slang/blob/2664c559c78c150e8b144c8be2cfc1871a66304f/tests/unittests/ast/ClassTests.cpp
  - id: review-20261115-parser-tests
    title: "Misplaced-new parser diagnostics and constructor-call regressions"
    url: https://github.com/MikePopoloski/slang/blob/2664c559c78c150e8b144c8be2cfc1871a66304f/tests/unittests/parsing/ExpressionParsingTests.cpp
---

### Implementation and scope

Round-trippable syntax, reusable elaborated design models and C++/Python APIs support conventional Design representation, source inspection and refactoring. The standalone executable also provides static analysis and diagnostics for Verification. Downstream simulator/synthesis consumers are separate tools; slang is not itself a simulator or logic-synthesis engine. [Documented uses](#source-readme).

### Reviewed activity and provenance

The September 30 change corrects zero-multiplier string replication and string-concatenation folding, with runtime-evaluation and diagnostic tests. This is compiler correctness work. These runtime operations remain conventional; credited software-development contributions are assessed separately. [Reviewed change](#source-activity-refresh); [current expression implementation](#source-implementation).

### Current activity review

Reviewed 2026-10-05. Python bindings add checked conversion from scope-bearing symbols to Scope views, retaining object lifetime. This is a concrete reusable design-API improvement, not simulation or synthesis execution. [Reviewed change](#source-activity-current).

### Development provenance

Claude is credited for correcting parseGuess to handle member keywords that do not parse as members, avoiding a null dereference. The canonical project retains the parser correction and tests. This supports AI-assisted development. [AI-credited executable implementation](#source-development-implementation-20261018) · [Retained executable code at the reviewed canonical head](#source-development-retained-20261018).

### Review of exposed operations and limits, October 22, 2026

slang-tidy supplies configurable static checks in addition to the frontend. Assertion parsing and elaboration are distinct from lowering to an executable property model or proving that model. Existing Design/Verification stages are retained without inferring a formal solver. [Static-analysis tool](#source-review-20261022-tidy).

This was a static source and documentation review. External EDA, numerical-accuracy and model/API experiments were not rerun. Existing activity freshness checkpoints and development-provenance labels are preserved.


### November 12, 2026 implementation review

The November 11 correction binds case expressions before marking known unselected bodies as unevaluated and shares constant matching with known-branch selection. Positive and negative tests cover grouped cases, casez, inside ranges, type cases and unknown preceding items while retaining selected-branch diagnostics. This is frontend semantic and diagnostic correctness, not a simulator or new synthesis capability. Existing scope and provenance remain unchanged; upstream tests were inspected, not rerun. [Integrated activity](#source-review-20261112-activity). [Known-branch matching and unevaluated case bodies](#source-review-20261112-implementation) · [Positive and negative constant-case semantic regressions](#source-review-20261112-tests).

### November 15, 2026 new-expression placement review

The November 14 correction diagnoses class construction, dynamic-array allocation and shallow-copy new expressions outside the LRM contexts implemented by the parser. AllowNew applies only to the immediate expression: variable initializers (including for-loop variable declarations) and the right-hand side of an outermost blocking assignment statement can allow it, while nested expressions do not inherit permission. super.new constructor calls retain separate placement checks. [Integrated parser and declaration changes](#source-review-20261115-activity); [retained expression parser](#source-review-20261115-retained).

The compilation regression expects 13 MisplacedNew diagnostics across return expressions, a default argument, nonblocking assignments, conditional/parenthesized expressions, assignment patterns, a nested assignment and a call argument. It also includes accepted variable initializers, blocking assignments, scoped construction, shallow copies, dynamic-array initialization, for-loop variable initialization and a valid derived-class super.new call. The parser regression expects 13 MisplacedNew diagnostics plus one InvalidSuperNew, including for-loop assignment and delayed-assignment cases; earlier tests are adjusted to use legal contexts. [Compilation cases](#source-review-20261115-ast-tests); [parser cases](#source-review-20261115-parser-tests); [complete diff](#source-review-20261115-activity).

The repair and regressions remain at master head `2664c559c78c150e8b144c8be2cfc1871a66304f` and the reviewed commit is on its first-parent chain. This is frontend syntax/diagnostic correctness, not new simulation, synthesis or runtime-AI coverage, and it supplies no new AI implementation attribution. Existing Design/Verification and the separately evidenced AI-ASSISTED label remain unchanged. Tests were inspected, not executed; integration does not establish a released version or comprehensive LRM conformance.
