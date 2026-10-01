---
name: "Verible"
aliases: []
description: "SystemVerilog developer-tool suite providing parsing, linting, formatting, language-server support and source-analysis utilities. Its parser handles unpreprocessed source for editor and single-file workflows, with reusable components for building additional HDL tooling without a full simulation or synthesis run."
scope:
  design:
    ai: false
  verification:
    ai: false
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Canonical Verible repository"
    url: "https://github.com/chipsalliance/verible"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/chipsalliance/verible/blob/0f26265133bda3ade669bc36fc71a6e1f39ad809/README.md"
  - id: "implementation"
    title: "Reviewed implementation: verible/verilog/formatting/token-annotator.cc"
    url: "https://github.com/chipsalliance/verible/blob/0f26265133bda3ade669bc36fc71a6e1f39ad809/verible/verilog/formatting/token-annotator.cc"
  - id: "activity"
    title: "Merge pull request #2581 from kbrunham-intel/fix/2008"
    url: "https://github.com/chipsalliance/verible/commit/b975d9d903f7a60510393d438a086294ab086dea"
  - id: "website"
    title: "Official project documentation"
    url: "https://chipsalliance.github.io/verible/"
    purpose: "official"
  - id: "activity-refresh"
    title: "Fix formatting of modport dot member selects"
    url: "https://github.com/chipsalliance/verible/commit/0f26265133bda3ade669bc36fc71a6e1f39ad809"
---

### Implementation and scope

Formatting, source transformations and language services support conventional HDL Design authoring, while standalone style lint supplies Verification. The parser supports unpreprocessed source and reusable syntax components; none of these operations performs logic synthesis or simulation. [Reviewed tool suite](#source-readme).

### Reviewed activity

The September 23 merge corrects spacing for nested member selects inside explicit modport connections. Formatter and token-annotation regressions distinguish the leading port-name separator from dots inside expressions, so this is functional formatter correctness rather than cosmetic repository churn. [Reviewed merge](#source-activity-refresh); [spacing implementation](#source-implementation).
