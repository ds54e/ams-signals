---
name: Crescendo
description: "Analog sizing optimizer for Cadence Maestro with Spectre or ALPS. It supports corner constraints, checkpointed runs, generation-batched evaluation and a three-objective Pareto view; selected candidates can be saved as Virtuoso schematic views. Live optimization requires licensed EDA and a PDK."
scope:
  design:
    ai: false
  simulation:
    ai: false
  aiDevelopment: assisted
access: Public source; live optimization requires Cadence/Maestro/Ocean, a supported simulator, PDK and licenses.
addedAt: '2026-11-16'
reviewedAt: '2026-11-24'
sources:
- id: "official"
  title: "Official project website"
  url: "https://rf-fieldwork.pages.dev/crescendo/?lang=en"
  purpose: "official"
- id: code
  title: Canonical public implementation
  url: https://github.com/chloeyntu-byte/crescendo
  purpose: code
- id: readme
  title: Reviewed workflow and access boundaries
  url: https://github.com/chloeyntu-byte/crescendo/blob/1df82d03762eb1c2c631b2e0f62d0413e9277680/README.md
- id: activity
  title: "1.4.5 changelog, Pareto implementation and schematic saving"
  url: https://github.com/chloeyntu-byte/crescendo/commit/cb4c9e6ad5cf647dfef3b220718a186c08ec48b2
- id: implementation
  title: Reviewed native-log scoping, timing diagnostics and checkpoint implementation
  url: https://github.com/chloeyntu-byte/crescendo/commit/1df82d03762eb1c2c631b2e0f62d0413e9277680
- id: retained
  title: Current implementation at review
  url: https://github.com/chloeyntu-byte/crescendo/blob/1df82d03762eb1c2c631b2e0f62d0413e9277680/crescendo_engine/completion.py
- id: initial-public-release
  title: Initial public release of the usable optimizer
  url: https://github.com/chloeyntu-byte/crescendo/commit/037dc8a304209194f161dd6f245ec6eeacafb8dd
- id: release-history
  title: Published optimizer releases and their changes
  url: https://github.com/chloeyntu-byte/crescendo/releases
summary: Analog sizing optimizer integrated with Cadence Maestro and Spectre or ALPS measurement flows.
developmentEvidence:
  summary: The reviewed implementation commit credits Claude for native-log scoping and checkpoint/diagnostic corrections. The attributed executable changes are integrated and retained in the pinned source; this does not attribute unrelated project code.
  sources:
  - implementation
  - retained
  reviewedAt: '2026-11-16'
---

### Implementation and selection

The initial-public-release commit is dated November 10, 2026. Subsequent released versions repair native-log reader/cleanup scoping and checkpoint integrity on November 16, then add three-objective viewing and schematic persistence on November 18. These are corrections and extensions to an already usable optimizer. Public follow-through is visible within this first release sequence; longer-term maintenance remains unestablished. Conventional optimization is Design; synthetic demos do not validate electrical accuracy. [Initial release](#source-initial-public-release) · [Corrective implementation](#source-implementation) · [Later implementation](#source-activity) · [Releases](#source-release-history).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).

### Development provenance

The credited Claude identity, executable diff, canonical integration and retained implementation were checked together. This is development assistance, separate from runtime stage classification. [Attributed change](#source-implementation) · [Current code](#source-retained).

### November 19, 2026 review

The November 18 version 1.4.5 source includes a three-objective 3D Pareto viewer and saves selected points as separate Virtuoso schematic views. Generation batching defaults on for new runs without an explicit engine setting; explicit serial configuration remains supported. Bundled demonstrations do not establish live electrical accuracy. [Version and implementation](#source-activity).
