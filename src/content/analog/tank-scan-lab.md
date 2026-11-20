---
name: Tank Scan Lab
description: RF analysis toolkit for LC tanks, switched-capacitor arrays and transconductance cores using simulator measurements. It reports resonance, loss, array linearity and small-signal startup margins; these calculations do not replace transient or harmonic-balance analysis of steady-state oscillation.
scope:
  simulation:
    ai: false
  aiDevelopment: assisted
access: Public source; live measurement needs Cadence, Spectre and the relevant PDK.
addedAt: '2026-11-16'
reviewedAt: '2026-11-16'
sources:
- id: "official"
  title: "Official project website"
  url: "https://rf-fieldwork.pages.dev/tank/?lang=en"
  purpose: "official"
- id: code
  title: Canonical public implementation
  url: https://github.com/chloeyntu-byte/tank-scan-lab
  purpose: code
- id: readme
  title: Reviewed workflow and access boundaries
  url: https://github.com/chloeyntu-byte/tank-scan-lab/blob/1d848d394b495c6f0ca588147e2a4f463d2f73d0/README.md
- id: activity
  title: Reviewed first-parent integration of substantive implementation
  url: https://github.com/chloeyntu-byte/tank-scan-lab/commit/c007ba53a1dab361ddad528e660712a951c77413
- id: implementation
  title: Reviewed implementation and validation change
  url: https://github.com/chloeyntu-byte/tank-scan-lab/commit/c007ba53a1dab361ddad528e660712a951c77413
- id: retained
  title: Current implementation at review
  url: https://github.com/chloeyntu-byte/tank-scan-lab/blob/1d848d394b495c6f0ca588147e2a4f463d2f73d0/caplab/backend.py
summary: RF analysis toolkit for LC tanks, switched-capacitor arrays and transconductance cores using simulator measurements.
developmentEvidence:
  summary: The reviewed implementation commit credits Claude for port-two register validation and its regression tests. The attributed executable changes are integrated and retained in the pinned source; this does not attribute unrelated project code.
  sources:
  - implementation
  - retained
  reviewedAt: '2026-11-16'
---

### Implementation and selection

Recent tank, port and linearity features plus register-value validation tests show substantive iteration despite a short public history. The tool does not itself run EMX or establish steady-state amplitude. [Workflow](#source-readme) · [Implementation change](#source-implementation) · [Retained code](#source-retained).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).

### Development provenance

The credited Claude identity, executable diff, canonical integration and retained implementation were checked together. This is development assistance, separate from runtime stage classification. [Attributed change](#source-implementation) · [Current code](#source-retained).
