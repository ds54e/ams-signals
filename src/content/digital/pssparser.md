---
name: pssparser
description: "Parser and semantic/lint toolkit for PSS 3.1 draft verification models, with linked ASTs, declarative rules and C++/Python APIs. The CLI and browser/WASM core share declarative checks, while Python plugins run only in batch; users must inspect plugin failures as well as diagnostics, and the parser does not execute stimulus."
scope:
  verification:
    ai: false
  aiDevelopment: assisted
access: Public Apache-2.0 C++/Python source with ANTLR dependencies and packaged checker APIs. Supported PSS draft and library revisions must match the consuming toolchain.
addedAt: '2026-10-31'
reviewedAt: "2026-11-24"
sources:
- id: "official"
  title: "Official project website"
  url: "https://psstools.github.io/pssparser/"
  purpose: "official"
- id: code
  title: Canonical public implementation
  url: https://github.com/PSSTools/pssparser
  purpose: code
- id: readme
  title: Reviewed project workflow and boundaries
  url: https://github.com/PSSTools/pssparser/blob/0df076b37c94310203178cf122bce72f6fae7d97/README.md
- id: activity
  title: Reviewed substantive first-parent implementation
  url: https://github.com/PSSTools/pssparser/commit/c904f333b94b92aa4999d76d3e96613158521c51
- id: annotations
  title: Annotation folding and validation API
  url: https://github.com/PSSTools/pssparser/blob/262a99f138b7c3f57d5ba0bb50062ee3de2e69fe/python/pssparser/annotations.py
- id: checking
  title: Packaged semantic and lint workflow
  url: https://github.com/PSSTools/pssparser/blob/0df076b37c94310203178cf122bce72f6fae7d97/skills/pssparser/SKILL.md
- id: development-implementation
  title: Credited executable implementation
  url: https://github.com/PSSTools/pssparser/commit/c904f333b94b92aa4999d76d3e96613158521c51
- id: development-retained
  title: Retained implementation at reviewed head
  url: https://github.com/PSSTools/pssparser/blob/262a99f138b7c3f57d5ba0bb50062ee3de2e69fe/python/pssparser/annotations.py
- id: checker-boundaries
  title: Declarative rules, Python extensions and checker-failure handling
  url: https://github.com/PSSTools/pssparser/blob/0df076b37c94310203178cf122bce72f6fae7d97/skills/pssparser-checkers/SKILL.md
- id: checker-execution
  title: CLI checker dispatch and exception handling
  url: https://github.com/PSSTools/pssparser/blob/0df076b37c94310203178cf122bce72f6fae7d97/python/pssparser/cli/commands.py
- id: lint-core
  title: Shared declarative-rule loading and execution engine
  url: https://github.com/PSSTools/pssparser/blob/0df076b37c94310203178cf122bce72f6fae7d97/src/lint/LintEngine.cpp
- id: lint-wasm
  title: TypeScript interface to the shared C++ lint core
  url: https://github.com/PSSTools/pssparser/blob/0df076b37c94310203178cf122bce72f6fae7d97/ts/src/Lint.ts
developmentEvidence:
  summary: Claude is credited for implementing computed annotation values, parameter checks and export-reference support with parsing/linking tests. The canonical head retains the executable annotation module, supporting assisted development of this change.
  sources:
  - development-implementation
  - development-retained
  reviewedAt: '2026-10-31'
---

### Frontend and verification checks

The parser constructs a linked AST and exposes annotations, reference queries and standalone semantic/lint checks over verification models. It targets the documented PSS 3.1 public-review draft. These user-facing checks justify a separate frontend listing alongside stimulus-generating consumers; parsing does not run stimulus, simulate a DUT or certify complete standard conformance. [Project](#source-readme) · [Annotation API](#source-annotations).

Declarative `pss-rules` use CEL expressions over the model and run through the common core in CLI and TypeScript/WASM environments. Python checker extensions are batch-only. [Common engine](#source-lint-core) · [TypeScript interface](#source-lint-wasm) · [Rule and plugin boundaries](#source-checker-boundaries).

In the reviewed CLI, an exception from `checker.check()` is caught and written as a warning to stderr without adding an error diagnostic, so an otherwise clean run can still exit successfully. Check plugin execution and stderr as well as the final diagnostic count when using custom checks as a CI gate. [Actual dispatch](#source-checker-execution).

### Classification and provenance

Parsing, semantic checks and rule evaluation are deterministic Verification. The packaged usage/API/checker-authoring skills document how an external coding agent can call or extend them; that does not make the parser's rule evaluation model-driven. The October annotation implementation explicitly credits Claude and remains the basis for AI-assisted development. Its activity checkpoint is separate from this editorial review. [Checking workflow](#source-checking) · [Credited implementation](#source-development-implementation) · [Retained annotation code](#source-development-retained).

Public source and test examples were inspected; no complete parser/consumer-toolchain campaign was rerun.
