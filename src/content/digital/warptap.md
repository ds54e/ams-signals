---
name: "warptap"
description: "Python library for adding IEEE 1149.1 JTAG and IEEE 1687 IJTAG test access to synthesizable RTL. It emits ICL, PDL and tester patterns, checks network integrity, and retargets FaultFlow scan patterns. The alpha release exposes these operations through the Python API rather than a full CLI."
scope:
  design:
    ai: false
  verification:
    ai: false
access: "Apache-2.0 Python library. RTL insertion uses Yosys; ICL and PDL import require the optional parser dependency."
addedAt: '2026-11-23'
reviewedAt: '2026-11-23'
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/ranaumarnadeem/warptap"
    purpose: code
  - id: website
    title: "Official documentation"
    url: "https://ranaumarnadeem.github.io/warptap/"
    purpose: official
  - id: implementation
    title: "Reviewed generator implementation"
    url: "https://github.com/ranaumarnadeem/warptap/blob/1f455e7d8734788339e1ef9cd47cad80f116ce7c/src/warptap/pipeline.py"
  - id: tests
    title: "Reviewed verification code"
    url: "https://github.com/ranaumarnadeem/warptap/blob/1f455e7d8734788339e1ef9cd47cad80f116ce7c/tests/test_tap_integrity.py"
  - id: activity
    title: "Dedicated IJTAG access instruction, insertion changes and cross-simulation tests"
    url: "https://github.com/ranaumarnadeem/warptap/commit/e2bd3613413b9c2b3517442d7462fbb109cf7079"
  - id: release
    title: "v0.0.7 release"
    url: "https://github.com/ranaumarnadeem/warptap/releases/tag/v0.0.7"
---

### Implementation and scope

The insertion pipeline returns modified RTL and an IEEE 1687 connection model. PDL and exported network-integrity patterns, including expected TDO, support Verification separately from Design. It retargets existing ATPG patterns rather than generating new fault-targeted vectors. The dedicated IJTAG access change includes executable RTL and cross-simulator regressions.

[Implementation](#source-implementation) · [Tests](#source-tests) · [Reviewed change](#source-activity).

Static source review only. The project EDA flow and reported numerical results were not independently rerun. Development provenance is not assigned without retained executable attribution.
