---
name: "UCAgent"
aliases: []
description: "Hardware unit-test agent that analyzes DUTs, generates tests and refines them from execution and coverage feedback. Direct model backends and MCP-connected coding agents share configurable stages and checkers, with optional formal and coverage workflows; heuristic, model and human review remain distinct quality gates."
scope:
  verification:
    ai: true
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Canonical UCAgent repository"
    url: "https://github.com/XS-MLVP/UCAgent"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/XS-MLVP/UCAgent/blob/ac007684b2c6b1b4b7a1ca6e3090fef174d459fa/README.en.md"
  - id: "implementation"
    title: "Reviewed implementation: ucagent/abackend/blank.py"
    url: "https://github.com/XS-MLVP/UCAgent/blob/ac007684b2c6b1b4b7a1ca6e3090fef174d459fa/ucagent/abackend/blank.py"
  - id: "activity"
    title: "Add blank backend for model-free master mode"
    url: "https://github.com/XS-MLVP/UCAgent/commit/fd1d77f73e9d7d55d31eacedb75af445a6bb589b"
  - id: "website"
    title: "Official project documentation"
    url: "https://ucagent.open-verify.cc/"
    purpose: "official"
  - id: "activity-refresh"
    title: "Previously reviewed meaningful implementation update"
    url: "https://github.com/XS-MLVP/UCAgent/commit/82e7b224e613bca5284719be819619869dbe5fa0"
  - id: "activity-review"
    title: "Parallel task MCP-port selection and regression tests"
    url: "https://github.com/XS-MLVP/UCAgent/commit/ac007684b2c6b1b4b7a1ca6e3090fef174d459fa"
---


### Implementation context

Agent backends and MCP collaboration are implemented runtime paths. The optional blank backend delegates work to external agents rather than making all modes model-free. [Reviewed source](#source-readme).

### Release boundary

Public examples and checkers define specific execution contracts; their existence does not independently demonstrate arbitrary-DUT coverage closure. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

DUT analysis, generated tests, execution checkers and coverage closure are verification. MCP collaboration and code-agent backends do not independently establish DUT generation. [Reviewed source](#source-readme).

Implemented model backends analyze DUTs, generate tests and choose verification actions with checker/coverage feedback. This justifies AI Verification beyond the optional MCP transport. [AI/stage evidence](#source-readme).

### Current-source review

Reviewed 2026-10-01. The current README documents direct model and external coding-agent modes, plus optional formal and coverage workflows. Default Python stage checking is heuristic; optional LLM and human checking does not establish arbitrary-DUT correctness. The blank backend remains a model-free coordination option rather than evidence that all modes lack inference. [README](#source-readme); [Blank backend](#source-implementation).

The newest reviewed meaningful first-parent change is parallel task MCP-port selection and regression tests (2026-09-30 UTC). [Reviewed commit](#source-activity-review).
