---
name: "Surfer"
aliases: []
description: "Native and web waveform viewer for VCD, FST, GHW and transaction data, with remote viewing and extensible value translations."
flow: {"verification":"core"}
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
    url: "https://gitlab.com/surfer-project/surfer/-/blob/db1ca915a989860f11c440b0a932b1f5fbce71b2/README.md"
  - id: "activity"
    title: "Open log window on errors: implementation update"
    url: "https://gitlab.com/surfer-project/surfer/-/commit/db1ca915a989860f11c440b0a932b1f5fbce71b2"
  - id: "website"
    title: "Official project documentation"
    url: "https://surfer-project.org/"
    purpose: "official"
---


### Implementation context

Tracked as a conventional waveform viewer; no distinctive AI build process or AI runtime is established. [Reviewed source](#source-readme).

### Release boundary

Native and web builds have different feature availability. Activity uses reviewed first-parent monthly history from the canonical GitLab repository. [Public update](#source-activity).

### Flow scope

Waveform inspection, remote viewing and debug interaction serve verification. Canonical GitLab history remains the reviewed activity source. [Reviewed source](#source-readme).
