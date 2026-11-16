---
name: Crescendo
description: Analog sizing optimizer integrated with Cadence Maestro and Spectre or ALPS measurement flows. It supports several search algorithms, corner constraints and checkpointed runs; live use needs the licensed EDA environment and PDK, while bundled demonstrations are not independent circuit-validation results.
scope:
  design:
    ai: false
  simulation:
    ai: false
  aiDevelopment: assisted
access: Public source; live optimization requires Cadence/Maestro/Ocean, a supported simulator, PDK and licenses.
addedAt: '2026-11-16'
reviewedAt: '2026-11-16'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/chloeyntu-byte/crescendo
  purpose: code
- id: readme
  title: Reviewed workflow and access boundaries
  url: https://github.com/chloeyntu-byte/crescendo/blob/1df82d03762eb1c2c631b2e0f62d0413e9277680/README.md
- id: activity
  title: Reviewed first-parent integration of substantive implementation
  url: https://github.com/chloeyntu-byte/crescendo/commit/1df82d03762eb1c2c631b2e0f62d0413e9277680
- id: implementation
  title: Reviewed implementation and validation change
  url: https://github.com/chloeyntu-byte/crescendo/commit/1df82d03762eb1c2c631b2e0f62d0413e9277680
- id: retained
  title: Current implementation at review
  url: https://github.com/chloeyntu-byte/crescendo/blob/1df82d03762eb1c2c631b2e0f62d0413e9277680/crescendo_engine/completion.py
summary: Analog sizing optimizer integrated with Cadence Maestro and Spectre or ALPS measurement flows.
developmentEvidence:
  summary: The reviewed implementation commit credits Claude for native-log scoping and checkpoint/diagnostic corrections. The attributed executable changes are integrated and retained in the pinned source; this does not attribute unrelated project code.
  sources:
  - implementation
  - retained
  reviewedAt: '2026-11-16'
---

### Implementation and selection

Short public history nevertheless contains distinct batching, headless execution, diagnostics and checkpoint implementation iterations. Conventional optimization is Design, not automatically runtime AI; synthetic demo results are not electrical validation. [Workflow](#source-readme) · [Implementation change](#source-implementation) · [Retained code](#source-retained).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).

### Development provenance

The credited Claude identity, executable diff, canonical integration and retained implementation were checked together. This is development assistance, separate from runtime stage classification. [Attributed change](#source-implementation) · [Current code](#source-retained).
