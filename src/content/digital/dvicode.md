---
name: DVICode
description: SystemVerilog/UVM navigation and semantic lint for VS Code and CI, including source-based hierarchies, factory/configuration analysis and assertion cross-references. Preview analysis has explicit elaboration and connectivity limits; its results are neither simulation outcomes nor formal proofs.
scope:
  verification:
    ai: false
  aiDevelopment: assisted
access: Public VS Code extension and Rust/CLI source; editor lint is opt-in.
addedAt: '2026-11-16'
reviewedAt: '2026-11-16'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/hexkDotCom/dvicode
  purpose: code
- id: readme
  title: Reviewed workflow and access boundaries
  url: https://github.com/hexkDotCom/dvicode/blob/c55f9a70cf507a1e165559de71babf91dae3308e/README.md
- id: activity
  title: Reviewed first-parent integration of substantive implementation
  url: https://github.com/hexkDotCom/dvicode/commit/9747a89d45a89080ed20778d608ed26e46433375
- id: implementation
  title: Reviewed implementation and validation change
  url: https://github.com/hexkDotCom/dvicode/commit/9747a89d45a89080ed20778d608ed26e46433375
- id: retained
  title: Current implementation at review
  url: https://github.com/hexkDotCom/dvicode/blob/c55f9a70cf507a1e165559de71babf91dae3308e/client/src/viewmodel.ts
developmentEvidence:
  summary: The reviewed implementation commit credits Claude for incremental hierarchy loading and regression tests. The attributed executable changes are integrated and retained in the pinned source; this does not attribute unrelated project code.
  sources:
  - implementation
  - retained
  reviewedAt: '2026-11-16'
---

### Implementation and selection

Bind navigation and incremental large-hierarchy loading include implementation and regression tests. Read-only navigation does not independently establish Design. This entry covers UVM-aware inspection beyond generic language editing. [Workflow](#source-readme) · [Implementation change](#source-implementation) · [Retained code](#source-retained).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).

### Development provenance

The credited Claude identity, executable diff, canonical integration and retained implementation were checked together. This is development assistance, separate from runtime stage classification. [Attributed change](#source-implementation) · [Current code](#source-retained).
