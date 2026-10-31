---
name: pssparser
description: PSS parser, linked AST and semantic/lint tooling with C++ and Python interfaces, targeting the documented PSS 3.1 public-review draft. Annotation evaluation, reference queries and checker plugins support verification-model tooling; parsing or checking a PSS model does not execute stimulus, simulate RTL or certify standard conformance.
scope:
  verification:
    ai: false
  aiDevelopment: assisted
access: Public Apache-2.0 C++/Python source with ANTLR dependencies and packaged checker APIs. Supported PSS draft and library revisions must match the consuming toolchain.
addedAt: '2026-10-31'
reviewedAt: '2026-10-31'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/PSSTools/pssparser
  purpose: code
- id: readme
  title: Reviewed project workflow and boundaries
  url: https://github.com/PSSTools/pssparser/blob/262a99f138b7c3f57d5ba0bb50062ee3de2e69fe/README.md
- id: activity
  title: Reviewed substantive first-parent implementation
  url: https://github.com/PSSTools/pssparser/commit/c904f333b94b92aa4999d76d3e96613158521c51
- id: annotations
  title: Annotation folding and validation API
  url: https://github.com/PSSTools/pssparser/blob/262a99f138b7c3f57d5ba0bb50062ee3de2e69fe/python/pssparser/annotations.py
- id: checking
  title: Packaged semantic and lint workflow
  url: https://github.com/PSSTools/pssparser/blob/262a99f138b7c3f57d5ba0bb50062ee3de2e69fe/skills/pssparser/SKILL.md
- id: development-implementation
  title: Credited executable implementation
  url: https://github.com/PSSTools/pssparser/commit/c904f333b94b92aa4999d76d3e96613158521c51
- id: development-retained
  title: Retained implementation at reviewed head
  url: https://github.com/PSSTools/pssparser/blob/262a99f138b7c3f57d5ba0bb50062ee3de2e69fe/python/pssparser/annotations.py
developmentEvidence:
  summary: Claude is credited for implementing computed annotation values, parameter checks and export-reference support with parsing/linking tests. The canonical head retains the executable annotation module, supporting assisted development of this change.
  sources:
  - development-implementation
  - development-retained
  reviewedAt: '2026-10-31'
---

### Frontend and verification checks

The parser constructs a reusable AST and links names/types before semantic and optional checker passes. The current project declares support for the PSS 3.1 public-review draft, not an issued final standard. Annotation-value folding, exported-reference queries and plugin lint APIs help inspect verification models; this receives Verification coverage, without DUT authoring or stimulus-runtime claims. [Project](#source-readme) · [Annotation implementation](#source-annotations) · [Checking workflow](#source-checking).

### Reviewed implementation and provenance

The October 21 change adds computed annotation values, parameter validation, export-reference queries and corresponding parsing/linking tests. It explicitly credits Claude; the canonical head retains the executable annotation module. This supports AI-assisted development, not AI-based runtime lint decisions or AI authorship of the entire parser. The subsequent parity rebaseline is captured as latest activity separately. No complete parser/consumer-toolchain test campaign was reproduced here. [Credited implementation and tests](#source-activity) · [Retained code](#source-development-retained).
