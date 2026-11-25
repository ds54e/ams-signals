---
name: "SENTIO Prober Control"
aliases: ["MPI probe station"]
description: "Python bindings for MPI probe stations running SENTIO software. The package exposes wafer alignment, stage and probe operations and silicon-photonics positioner commands, enabling external measurement and test scripts to configure supported commercial probing systems."
scope:
  control: { ai: false }
access: "BSD-2-Clause; requires a compatible MPI SENTIO installation and probe station."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/SentioProberDev/SentioProberControl"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/SentioProberDev/SentioProberControl/commit/65e6e3370c27072f2b8b32e0e37c155a8223b66c"
  - id: wafer-align
    title: "Wafer alignment command and timeout support"
    url: "https://github.com/SentioProberDev/SentioProberControl/commit/ce51000cb44ce2009ae7257d643f8acb184fb3d0"
  - id: vision-control
    title: "Retained wafer alignment command implementation"
    url: "https://github.com/SentioProberDev/SentioProberControl/blob/65e6e3370c27072f2b8b32e0e37c155a8223b66c/sentio_prober_control/Sentio/CommandGroups/VisionCommandGroup.py"
---

## Scope and limits

The package operates a specific commercial probe-station platform, distinct from a generic VISA transport or a standalone motorized probe-station application. Control reflects the implemented command groups. The package does not by itself supply an electrical measurement acquisition system or a complete test-plan runner. Verify the installed SENTIO version, station capabilities and safe-motion requirements.

## Reviewed maintenance

July 2026 expands the wafer-alignment API with an explicit timeout and version-dependent handling. September 2026 integrates a changed silicon-photonics positioner API that mirrors the remote command hierarchy and introduces a breaking interface change in version 26.2.0. [Alignment change](#source-wafer-align) · [Retained alignment code](#source-vision-control) · [Positioner integration](#source-activity).
