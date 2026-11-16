---
name: Analog Layout Diff
description: Layout versioning and review for Virtuoso and KLayout, with structured snapshots, semantic differences and three-way merging. Native replay requires the matching technology, masters and bridge environment; GDS/OASIS comparison is useful without claiming preservation of every Virtuoso-specific semantic.
scope:
  layout:
    ai: false
access: Public Python source. Virtuoso operations require Cadence, technology libraries and the bridge; KLayout has a separate adapter.
addedAt: '2026-11-16'
reviewedAt: '2026-11-16'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/nekomona/analog-layout-diff
  purpose: code
- id: readme
  title: Reviewed workflow and access boundaries
  url: https://github.com/nekomona/analog-layout-diff/blob/5a5deded1be31657a4fcc6d62eb63bccb7c6aa22/README.md
- id: activity
  title: Reviewed first-parent integration of substantive implementation
  url: https://github.com/nekomona/analog-layout-diff/commit/473306ff327d73669856bf12ff83deeec22fea9f
- id: implementation
  title: Reviewed implementation and validation change
  url: https://github.com/nekomona/analog-layout-diff/commit/473306ff327d73669856bf12ff83deeec22fea9f
- id: retained
  title: Current implementation at review
  url: https://github.com/nekomona/analog-layout-diff/blob/5a5deded1be31657a4fcc6d62eb63bccb7c6aa22/layoutdiff/eda/virtuoso/adapter.py
summary: Layout versioning and review for Virtuoso and KLayout, with structured snapshots, semantic differences and three-way merging.
---

### Implementation and selection

This is a distinct history/diff/merge layer above the already cataloged bridge, not another bridge entry. PCell property-datatype replay fixes and tests demonstrate continued correctness work. [Workflow](#source-readme) · [Implementation change](#source-implementation) · [Retained code](#source-retained).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).
