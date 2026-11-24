---
name: "lctime"
aliases: []
summary: "SPICE-based timing characterization and transistor-level Boolean function recognition."
description: "Characterizes standard-cell SPICE netlists into Liberty timing data and can infer combinational Boolean functions from transistor connectivity with sp2bool. Characterization depends on the models, test conditions and supported cell structures; Boolean identification alone does not validate sequential timing or a complete library."
scope: {"simulation": {"ai": false}}
access: "Public Python implementation; characterization requires SPICE models, cell netlists and a compatible simulation setup."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://codeberg.org/librecell/lctime"
    purpose: code
  - id: activity
    title: "Reviewed substantive implementation checkpoint"
    url: "https://codeberg.org/librecell/lctime/commit/d6ef4f5fe4305c88e4b2fde6abdd9695747fa210"
  - id: pulse
    title: "Sequential cell clock-pulse measurement correction"
    url: "https://codeberg.org/librecell/lctime/commit/29ffa6bb65cbae9b9d301acfa959315faff9c8b3"
  - id: release
    title: "Reviewed PyPI release 0.0.26"
    url: "https://pypi.org/project/lctime/0.0.26/"
  - id: canonical-tag
    title: "Canonical source tag 0.0.28"
    url: "https://codeberg.org/librecell/lctime/src/tag/0.0.28"
---

### Scope and evidence

The canonical project couples characterization with transistor-level combinational function recognition. This does not produce new RTL or layout and is not a claim of independent Liberty signoff. The clock-pulse correction and later SymPy compatibility fix are substantive. [Clock measurement](#source-pulse) · [Compatibility](#source-activity).

The Codeberg source tag and the reviewed PyPI release are distinct. The recorded activity follows canonical Codeberg main, not a GitHub mirror. [Tagged source](#source-canonical-tag) · [Distribution](#source-release).
