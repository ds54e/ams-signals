---
name: "UCAgent"
aliases: []
roles: ["agent"]
primary: "formal-verification"
ai: "ai-enabled"
description: "Agentic unit-level verification environment that analyzes DUTs, generates and runs tests, checks coverage and connects external code agents through MCP."
keywords: ["unit verification", "coverage", "MCP", "code agents"]
areas:
  formal-verification: core
  simulation: supporting
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical UCAgent repository"
    url: "https://github.com/XS-MLVP/UCAgent"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/XS-MLVP/UCAgent/blob/cfdbbe86485e794522e0eaea1d4d131ee8b6672b/README.en.md"
  - id: "implementation"
    title: "Reviewed implementation: ucagent/abackend/blank.py"
    url: "https://github.com/XS-MLVP/UCAgent/blob/cfdbbe86485e794522e0eaea1d4d131ee8b6672b/ucagent/abackend/blank.py"
  - id: "activity"
    title: "Add blank backend for model-free master mode"
    url: "https://github.com/XS-MLVP/UCAgent/commit/fd1d77f73e9d7d55d31eacedb75af445a6bb589b"
  - id: "website"
    title: "Official project documentation"
    url: "https://ucagent.open-verify.cc/"
    purpose: "official"
---

### Scope

DUT analysis, generated tests, execution checkers and coverage closure define the main workflow. Simulator bindings support the verification environment. [Project documentation](#source-readme).

### Classification

Agent backends and MCP collaboration are implemented runtime paths. The optional blank backend delegates work to external agents rather than making all modes model-free. [Reviewed source](#source-readme).

### Release boundary

Public examples and checkers define specific execution contracts; their existence does not independently demonstrate arbitrary-DUT coverage closure. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
