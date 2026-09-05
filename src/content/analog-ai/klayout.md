---
name: "KLayout"
aliases: []
roles: ["eda-tool"]
summary: "Views, edits and verifies IC layouts with programmable geometry and PCells."
description: "Layout editor and verification platform with Python/Ruby scripting, PCells, DRC/LVS and GDS/OASIS support for custom integrated-circuit workflows."
keywords: ["Layout", "PCell", "DRC", "GDS/OASIS"]
workflow:
  eda-integration: supporting
  physical: core
access: "Public implementation and binary packages; technology-specific verification uses supplied rule decks."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "site"
    title: "Official project documentation"
    url: "https://www.klayout.de/intro.html"
    purpose: "official"
  - id: "code"
    title: "Canonical public source repository"
    url: "https://github.com/KLayout/klayout"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed default-branch revision"
    url: "https://github.com/KLayout/klayout/blob/e71272c3b178105bd2a2f25af54673a7af7ed60d/README.md"
  - id: "activity"
    title: "Reviewed substantive default-branch update"
    url: "https://github.com/KLayout/klayout/commit/e71272c3b178105bd2a2f25af54673a7af7ed60d"
---

### Scope

Reads and edits layout geometry and hierarchy, generates parameterized cells and executes scripting-based checks. Physical is core; scripting and external library/technology interfaces support EDA Integration. [Official feature overview](#source-site) and [implementation](#source-readme).

### Release boundary

A programmable DRC/LVS platform does not itself establish signoff for any process. The August 26 editor change reconnects PCell parameter edit events. [Reviewed implementation update](#source-activity).
