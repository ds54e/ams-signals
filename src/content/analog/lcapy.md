---
name: "Lcapy"
aliases: []
description: "Python package for symbolic linear circuit analysis with SymPy. It derives transfer functions, poles, zeros and state-space equations from netlists, and also supports synthesis of networks from impedance or admittance expressions. Symbolic analysis does not directly solve nonlinear transistor or diode models."
scope: {"design": {"ai": false}, "simulation": {"ai": false}}
access: "Public Python source; symbolic and numerical capabilities have different model limits."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
summary: "Symbolic circuit equations, transfer functions and passive-network synthesis."
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/mph-/lcapy"
    purpose: code
  - id: activity
    title: "Reviewed substantive implementation checkpoint"
    url: "https://github.com/mph-/lcapy/commit/ef59ffd8f1882bc1ccad046c37b39e6a756d2fd9"
  - id: website
    title: "Official circuit-analysis overview"
    url: "https://lcapy.readthedocs.io/en/stable/overview.html"
    purpose: official
  - id: roots
    title: "Option to compute numerical poles, zeros and roots"
    url: "https://github.com/mph-/lcapy/commit/7ff03fef30c8ea656b264a835abb246756b52b7d"
  - id: loops
    title: "Earlier circuit loop basis work"
    url: "https://github.com/mph-/lcapy/commit/e8de02e514849b0713558baf65e5cafceeb8c331"
  - id: release
    title: "PyPI Lcapy 1.26"
    url: "https://pypi.org/project/lcapy/1.26/"
---

### Scope and release boundary

Symbolic circuit evaluation and equations are Simulation. Design covers the separate network synthesis operation that constructs an equivalent network from a supplied immittance expression, not schematic drawing alone. This does not replace physical-device transient simulation in ngspice. [Operations](#source-website).

The reviewed default branch includes an initial-value handling correction after the published package; May loop-basis development and July root/pole options show separate implementation periods. The published 1.26 package and reviewed branch are not interchangeable. [Earlier loop work](#source-loops) · [Numerical roots](#source-roots) · [Initial-value correction](#source-activity) · [Distribution](#source-release).
