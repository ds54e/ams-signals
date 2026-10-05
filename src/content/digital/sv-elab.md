---
name: "sv-elab"
aliases: ["yosys-slang"]
description: "Slang-based SystemVerilog elaborator that lowers synthesizable designs into a word-level netlist. It is integrated into current Yosys and OpenROAD synthesis tooling and can also be built as a frontend component, carrying design semantics into downstream synthesis flows."
scope:
  synthesis:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Explicitly AI-assisted changes introduced an intermediate-representation layer and refactored frontend emission around it. The current Yosys backend retains the IR and builder separation."
  sources: ["development-1", "development-2", "development-3"]
  reviewedAt: "2026-10-01"
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-05"
sources:
  - id: "code"
    title: "Canonical sv-elab repository"
    url: "https://github.com/povik/sv-elab"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/povik/sv-elab/blob/8911a6ca2bece247df266de59e8ba2cf9dac1031/README.md"
  - id: "implementation"
    title: "Reviewed implementation: src/yosys_plugin/driver.cc"
    url: "https://github.com/povik/sv-elab/blob/8911a6ca2bece247df266de59e8ba2cf9dac1031/src/yosys_plugin/driver.cc"
  - id: "activity"
    title: "Fix signedness comparison (#379)"
    url: "https://github.com/povik/sv-elab/commit/b6e440d6a2586b93c2a43da676c207c8c2a15778"
  - id: "development-1"
    title: "Portable IR layer"
    url: "https://github.com/povik/sv-elab/commit/d8c9d578fee4e96a3586b5041dcc16bd6a1c94d8"
  - id: "development-2"
    title: "Emission refactor"
    url: "https://github.com/povik/sv-elab/commit/554e6186d0cad2a68b37bfdb0a962b61952ca05f"
  - id: "development-3"
    title: "Current backend IR"
    url: "https://github.com/povik/sv-elab/blob/8911a6ca2bece247df266de59e8ba2cf9dac1031/src/yosys_plugin/ir.h"
  - id: "activity-refresh"
    title: "Integrate slang 12 and the new Yosys diagnostic client"
    url: "https://github.com/povik/sv-elab/commit/2d9026ac153e1bd5ba3f03d8b5246aa46edab155"
  - id: "activity-current"
    title: "Yosys backend release-build compatibility"
    url: "https://github.com/povik/sv-elab/commit/1582cc2d5bd199949669a1440a4c8947d713f842"
---

### Implementation and scope

sv-elab lowers the synthesizable SystemVerilog subset into word-level netlists for synthesis consumers. Current Yosys and OpenROAD integration, and the retained optional Yosys plugin, are documented separately. This is conventional Synthesis-oriented lowering; internal IR construction does not add a separate Design stage. yosys-slang is the historical project name. [Current integration](#source-readme).

### Reviewed activity

The September 29 integration updates slang and introduces a Yosys diagnostic client using the new logging/source-snippet interface. The later tip corrects the dependency pin; the reviewed implementation checkpoint remains the diagnostic integration. [Reviewed change](#source-activity-refresh); [diagnostic client](#source-implementation).

### Development provenance review

Reviewed 2026-10-01: **AI-ASSISTED**. Explicit assistance accompanies a coordinated portable IR abstraction and frontend/emission refactor. The actual diffs create a backend-independent signal/type surface and route port/instance emission through builders; the current Yosys backend retains that separation. This is a meaningful architectural contribution, not evidence of AI creation of the complete elaborator. Current contribution-policy restrictions do not erase the attributed implementation history. [Portable IR layer](#source-development-1); [emission refactor](#source-development-2); [retained IR](#source-development-3).

### Current activity review

Reviewed 2026-10-05. The Yosys backend suppresses an unused-width warning after release builds remove assertions. This is an actual source-build compatibility correction, not a new transformation stage. [Reviewed change](#source-activity-current).
