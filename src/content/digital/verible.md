---
name: "Verible"
aliases: []
description: "SystemVerilog developer-tool suite providing parsing, linting, formatting, language-server support and source-analysis utilities."
flow: {"design":"core","verification":"supporting"}
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical Verible repository"
    url: "https://github.com/chipsalliance/verible"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/chipsalliance/verible/blob/b975d9d903f7a60510393d438a086294ab086dea/README.md"
  - id: "implementation"
    title: "Reviewed implementation: verible/verilog/tools/lint/verilog-lint.cc"
    url: "https://github.com/chipsalliance/verible/blob/b975d9d903f7a60510393d438a086294ab086dea/verible/verilog/tools/lint/verilog-lint.cc"
  - id: "activity"
    title: "Merge pull request #2581 from kbrunham-intel/fix/2008"
    url: "https://github.com/chipsalliance/verible/commit/b975d9d903f7a60510393d438a086294ab086dea"
  - id: "website"
    title: "Official project documentation"
    url: "https://chipsalliance.github.io/verible/"
    purpose: "official"
---


### Implementation context

Tracked as a conventional developer-tool suite. AI is not a material runtime component in the reviewed tools. [Reviewed source](#source-readme).

### Release boundary

Source-formatting and lint utilities do not perform logic synthesis. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Flow scope

Formatting, language services and source transformation support HDL authoring. Style lint provides secondary checking; neither parsing nor linting implies logic synthesis. [Reviewed source](#source-readme).
