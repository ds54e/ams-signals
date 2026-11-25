---
name: "labgrid"
aliases: []
description: "Python abstractions for controlling local and remote embedded test boards, connecting power switches, serial ports and loaders to drivers. A coordinator manages acquisition and reservation of shared fixtures, while pytest can drive repeatable hardware tests."
scope:
  control: { ai: false }
  test: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited on the Sunxi USB loader driver and its accompanying test code."
  sources: [ai-change, development-retained]
  reviewedAt: "2026-11-24"
access: "LGPL-2.1-or-later; requires drivers and access to configured fixtures."
addedAt: "2026-11-24"
reviewedAt: "2026-11-25"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://labgrid.readthedocs.io/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/labgrid-project/labgrid"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/labgrid-project/labgrid/commit/9412cc8ab0a82958815fa312e196f3eead2a2b92"
  - id: implementation
    title: "Specific implementation reviewed"
    url: "https://github.com/labgrid-project/labgrid/commit/d399a5857f53db9d6a229a630fb62619c4917317"
  - id: ai-change
    title: "Credited executable implementation change"
    url: "https://github.com/labgrid-project/labgrid/commit/5f6de3485b2581db2fb390298edcf50bc7c4ace0"
  - id: development-retained
    title: "Retained Sunxi USB loader implementation"
    url: "https://github.com/labgrid-project/labgrid/blob/a556a0d016bd5eb8728e26d8bdb41cf952c151aa/labgrid/driver/usbloader.py"
  - id: lager
    title: "Related remote bench and instrument-control platform"
    url: "https://github.com/lagerdata/lager/blob/bded23b4ca07ae8782d196b204fe085c6f566d04/README.md"
  - id: supplier-dedup
    title: "November 21 deduplicate matching resources and drivers during binding"
    url: "https://github.com/labgrid-project/labgrid/commit/1d451f6d9db4db00566c4cc458ab1eae1e93f2e8"
  - id: supplier-regression
    title: "Retained inherited-resource binding regression"
    url: "https://github.com/labgrid-project/labgrid/blob/a556a0d016bd5eb8728e26d8bdb41cf952c151aa/tests/test_target.py"
  - id: imx-usb-identities
    title: "November 23 additional i.MX USB loader identities"
    url: "https://github.com/labgrid-project/labgrid/commit/a556a0d016bd5eb8728e26d8bdb41cf952c151aa"
  - id: imx-usb-retained
    title: "Retained USB device matching table"
    url: "https://github.com/labgrid-project/labgrid/blob/a556a0d016bd5eb8728e26d8bdb41cf952c151aa/labgrid/resource/udev.py"
---

## Scope and limits

The reviewed stale-setting rejection follows v26.0.1. Fixture coordination is distinct from test verdicts, while resource ownership alone is not verification of physical state.

[Reviewed upstream implementation](#source-implementation).

## Related workflow

The related [Lager](#source-lager) maps named electrical test points to instrument channels and provides bench-host script execution. labgrid retains its embedded board resource, driver and reservation workflow. The two implementations have different interfaces and independent activity; neither substitutes for the other's fixture setup or physical test evidence.

## Reviewed implementation update, November 25, 2026

November 21 changes supplier matching to a set, so the same resource satisfying multiple inherited type requirements is not reported as conflicting suppliers. The retained regression binds a single derived resource to a driver accepting either the base or derived class. November 23 adds USB vendor/product IDs for five additional i.MX bootloader device families, improving resource discovery for compatible loader workflows. This latest device matching change advances the saved checkpoint. Correct discovery and binding do not establish successful programming or the electrical state of the fixture. [Binding fix](#source-supplier-dedup) · [Regression](#source-supplier-regression) · [Identity integration](#source-imx-usb-identities) · [Retained table](#source-imx-usb-retained).

Source inspection only; no physical measurement, programming, service migration or upstream regression was independently executed.
