---
name: "slang"
aliases: []
description: "SystemVerilog frontend exposing parsing, elaboration, type checking and reusable design representations for code tooling, including pyslang Python bindings."
flow: {"design":"core","verification":"supporting"}
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical slang repository"
    url: "https://github.com/MikePopoloski/slang"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/MikePopoloski/slang/blob/77d4cbfccd5abc6f396954a0e02caec4287e46ce/README.md"
  - id: "implementation"
    title: "Reviewed implementation: source/ast/Compilation.cpp"
    url: "https://github.com/MikePopoloski/slang/blob/77d4cbfccd5abc6f396954a0e02caec4287e46ce/source/ast/Compilation.cpp"
  - id: "activity"
    title: "Fix instance cache key ignoring arrayed interface port connections (#1949)"
    url: "https://github.com/MikePopoloski/slang/commit/bb629fee263d8ed82b330098e4e29296bdb6bcf6"
  - id: "website"
    title: "Official project documentation"
    url: "https://sv-lang.com"
    purpose: "official"
---


### Implementation context

Tracked as a conventional reusable compiler frontend; AI involvement is not a defining product characteristic. [Reviewed source](#source-readme).

### Release boundary

Language services and elaborated design models should not be described as a standalone simulator or synthesis engine. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Flow scope

The standalone frontend exposes elaborated design representations and round-trippable syntax for code generation/refactoring; this is more than a simulator's internal parser. Static diagnostics and linting support verification. It does not itself perform logic synthesis. [Reviewed source](#source-readme).
