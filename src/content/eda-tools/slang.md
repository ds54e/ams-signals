---
name: "slang"
aliases: []
primary: "frontend-synthesis"
ai: "traditional"
description: "SystemVerilog compiler frontend providing parsing, type checking, semantic analysis and elaboration through reusable C++ and Python language services."
keywords: ["SystemVerilog", "elaboration", "static analysis", "pyslang"]
areas:
  frontend-synthesis: core
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

### Scope

Parsing, semantic checking and elaboration are the reviewed product scope. Downstream consumers supply simulation or synthesis execution. [Project documentation](#source-readme).

### Classification

Tracked as a conventional reusable compiler frontend; AI involvement is not a defining product characteristic. [Reviewed source](#source-readme).

### Release boundary

Language services and elaborated design models should not be described as a standalone simulator or synthesis engine. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
