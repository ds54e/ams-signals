---
name: "OpenTAP"
aliases: ["Open Test Automation Platform"]
description: "Extensible test sequencing engine for automated measurement and production test. Built-in SCPI steps send commands, retrieve instrument responses and publish results within test plans; additional instrument and DUT capabilities depend on installed plugins."
scope:
  test: { ai: false }
  control: { ai: false }
  acquisition: { ai: false }
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
  - id: scpi-step
    title: "Built-in SCPI command, response and result step"
    url: "https://github.com/opentap/opentap/blob/172874ff9ea60f0fa6ec9be758b3eb644da9939e/BasicSteps/ScpiStep.cs"
---

## Scope and limits

The core provides sequencing and reporting. Driver behavior, hardware timing and coverage are properties of the installed instruments and plugins.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.

Control and Acquisition are grounded in the same-repository SCPI step's command and query branches. It exposes the returned response and can publish matched values to result listeners, alongside optional verdict rules. This does not imply that all vendor drivers are bundled. [SCPI implementation](#source-scpi-step).
