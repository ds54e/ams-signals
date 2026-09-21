---
name: "Surfer"
aliases: []
description: "Native and web waveform viewer for VCD, FST, GHW and transaction data, with extensible value translations. Client-server mode lets users inspect remote waveform files without copying them locally; the browser build offers a subset of native features."
scope:
  verification:
    ai: false
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical Surfer repository"
    url: "https://gitlab.com/surfer-project/surfer"
    purpose: "code"
  - id: "readme"
    title: "Surfer README at the reviewed revision"
    url: "https://gitlab.com/surfer-project/surfer/-/blob/d8ece80b92047b1313154006b88ee74a3ad2886e/README.md"
  - id: "activity"
    title: "Add gray-code value translator"
    url: "https://gitlab.com/surfer-project/surfer/-/commit/587974858483257304050c7a63239b38e29431e9"
  - id: "website"
    title: "Official project documentation"
    url: "https://surfer-project.org/"
    purpose: "official"
---


### Implementation context

Tracked as a conventional waveform viewer; no distinctive AI build process or AI runtime is established. [Reviewed source](#source-readme).

### Release boundary

Native and web builds have different feature availability. The September 12 gray-code translator is the latest reviewed meaningful change; the September 13 publishing-container update remains the raw ordering tip. Activity uses reviewed first-parent monthly history from the canonical GitLab repository. [Public update](#source-activity).

### Scope classification

Waveform inspection, remote viewing and debug interaction serve verification. Canonical GitLab history remains the reviewed activity source. [Reviewed source](#source-readme).

Waveform viewing and translations are conventional Verification. Canonical GitLab history remains activity provenance, independent of Scope. [AI/stage evidence](#source-readme).
