---
name: "DVSim"
description: "Build-and-run orchestrator for ASIC verification, developed in OpenTitan and packaged separately by lowRISC. It reuses configured builds across tests and seeds, schedules regressions and collects results from external simulation, formal and lint tools."
scope:
  verification:
    ai: false
access: "Apache-2.0 Python implementation; design configurations and suitable EDA backends are required."
addedAt: "2026-11-23"
reviewedAt: "2026-11-23"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/lowRISC/dvsim"
    purpose: "code"
  - id: "website"
    title: "Official project documentation"
    url: "https://opentitan.org/book/util/dvsim/index.html"
    purpose: "official"
  - id: "activity"
    title: "Reviewed substantive implementation on the default branch"
    url: "https://github.com/lowRISC/dvsim/commit/e4a6b7129e4db1b0afe5e6f7318c3d57fed883fe"
  - id: "evidence"
    title: "Reviewed reference or implementation example"
    url: "https://github.com/lowRISC/dvsim/commit/cd7a5474e6236dcb275069b7d86a641a4a953329"
---

### Implemented operations and review

Verification orchestration is distinct from the FuseSoC dependency and file-list operations it can invoke. The standalone repository has a Verilator plugin from September, nested regression targets from October and resource requests on builds and tests from November. Backend availability does not imply all commercial and open flows are equivalent. [Implementation](#source-activity) · [Reviewed evidence](#source-evidence).
