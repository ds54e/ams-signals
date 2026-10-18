---
name: "slang"
aliases: []
description: "SystemVerilog frontend exposing parsing, elaboration, type checking and reusable design representations. Its standalone tool performs static analysis, while C++ APIs and pyslang Python bindings support source inspection, refactoring and integration into other compilers or developer tools."
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
reviewedAt: "2026-10-18"
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
---

### Implementation and scope

Round-trippable syntax, reusable elaborated design models and C++/Python APIs support conventional Design representation, source inspection and refactoring. The standalone executable also provides static analysis and diagnostics for Verification. Downstream simulator/synthesis consumers are separate tools; slang is not itself a simulator or logic-synthesis engine. [Documented uses](#source-readme).

### Reviewed activity and provenance

The September 30 change corrects zero-multiplier string replication and string-concatenation folding, with runtime-evaluation and diagnostic tests. This is compiler correctness work. These runtime operations remain conventional; credited software-development contributions are assessed separately. [Reviewed change](#source-activity-refresh); [current expression implementation](#source-implementation).

### Current activity review

Reviewed 2026-10-05. Python bindings add checked conversion from scope-bearing symbols to Scope views, retaining object lifetime. This is a concrete reusable design-API improvement, not simulation or synthesis execution. [Reviewed change](#source-activity-current).

### Development provenance

Claude is credited for correcting parseGuess to handle member keywords that do not parse as members, avoiding a null dereference. The canonical project retains the parser correction and tests. This supports AI-assisted development without establishing that AI built most of the project. [AI-credited executable implementation](#source-development-implementation-20261018) · [Retained executable code at the reviewed canonical head](#source-development-retained-20261018).
