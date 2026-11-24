---
name: "OpenTAP"
aliases: ["Open Test Automation Platform"]
description: "Extensible test sequencing engine for automated measurement and production test. Test plans combine executable steps, instrument and DUT plugins, and result listeners; the capabilities of each setup depend on its installed plugins."
scope:
  test: { ai: false }
  control: { ai: false }
access: "MPL-2.0 for the core; plugins can have separate terms."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Project documentation"
    url: "https://opentap.io/"
    purpose: official
  - id: code
    title: "Canonical project source"
    url: "https://github.com/opentap/opentap"
    purpose: code
  - id: activity
    title: "Reviewed implementation or test change"
    url: "https://github.com/opentap/opentap/commit/2f0da929d84edbc145e2f3352b9dcf3d98fdf172"
---

## Scope and limits

The core provides sequencing and reporting. Driver behavior, hardware timing and coverage are properties of the installed instruments and plugins.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.
