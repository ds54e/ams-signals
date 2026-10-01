---
name: "Surfer"
aliases: []
description: "Native and web waveform viewer for VCD, FST, GHW and transaction data, with extensible value translations. Client-server mode lets users inspect remote waveform files without copying them locally; the browser build offers a subset of native features."
scope:
  verification:
    ai: false
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Canonical Surfer repository"
    url: "https://gitlab.com/surfer-project/surfer"
    purpose: "code"
  - id: "readme"
    title: "Surfer README at the reviewed revision"
    url: "https://gitlab.com/surfer-project/surfer/-/blob/c9db19e7ebba3a7c25c6bb0466cfacd8cf7180e2/README.md"
  - id: "activity"
    title: "Avoid synchronous byte loading for dropped waveform files with paths"
    url: "https://gitlab.com/surfer-project/surfer/-/commit/c9db19e7ebba3a7c25c6bb0466cfacd8cf7180e2"
  - id: "website"
    title: "Official project documentation"
    url: "https://surfer-project.org/"
    purpose: "official"
---

### Implementation and scope

Waveform and transaction inspection, translations, remote viewing and debug interaction are conventional Verification. Native and browser builds differ in performance and feature coverage; server mode allows inspecting remote files without copying the complete waveform locally. [Current README](#source-readme).

### Reviewed activity

The September 22 canonical GitLab change prefers a dropped file's path before reading its bytes, allowing the existing file-loading path to return without synchronously loading a large VCD on the UI thread. The bytes-only case remains a documented limitation. This substantive responsiveness repair is the meaningful checkpoint, replacing the previous gray-code update; all monthly history comes from the canonical GitLab repository. [Reviewed implementation](#source-activity).
