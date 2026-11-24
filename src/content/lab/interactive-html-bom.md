---
name: "InteractiveHtmlBom"
aliases: ["iBOM Interactive HTML BOM"]
description: "Interactive HTML bill of materials and assembly viewer for PCBs. It links part rows to footprints on a board view so reviewers and assemblers can locate components, track placement and inspect variants without opening the native layout editor."
scope:
  board: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "The merged change for case-normalized DNP and variant fields credits Claude in its commit and changes the assembly filter logic."
  sources: [activity]
  reviewedAt: "2026-11-24"
access: "MIT plugin; requires design input from a supported workflow."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical project source"
    url: "https://github.com/openscopeproject/InteractiveHtmlBom"
    purpose: code
  - id: activity
    title: "Reviewed implementation or test change"
    url: "https://github.com/openscopeproject/InteractiveHtmlBom/commit/30ce006dcf42d6b280fa6c87219a8104d0ca8d70"
---

## Scope and limits

Assembly visualization does not verify connectivity or electrical specifications.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.
