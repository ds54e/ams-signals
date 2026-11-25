---
name: "Lager"
aliases: ["Lager Data hardware test automation"]
description: "Remote hardware-test platform that maps named bench signals to instruments and embedded targets connected to a Linux host. A CLI and on-host script executor support instrument configuration, acquisition, firmware programming and repeatable wired hardware tests from a workstation or CI."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  test: { ai: false }
access: "Apache-2.0; requires a configured Linux bench host, compatible instruments and network access."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: website
    title: "Project documentation"
    url: "https://docs.lagerdata.com/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/lagerdata/lager"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/lagerdata/lager/commit/d0201d58ee3a55aff9277fa1d2f9baa00964240a"
  - id: debug-verdict
    title: "September flash verification and error propagation correction"
    url: "https://github.com/lagerdata/lager/commit/c550fd4b8193940a6adc9900b72dafb70ae56b45"
  - id: scope-correction
    title: "October oscilloscope acquisition-state correction"
    url: "https://github.com/lagerdata/lager/commit/39495d4da891b6eea7d1d59ca3fd8decd984d2f8"
  - id: boot-config
    title: "Retained LabJack power-up configuration implementation"
    url: "https://github.com/lagerdata/lager/blob/bded23b4ca07ae8782d196b204fe085c6f566d04/box/lager/io/gpio/labjack_boot_config.py"
  - id: script-executor
    title: "Bench-host script execution and run lifecycle"
    url: "https://github.com/lagerdata/lager/blob/bded23b4ca07ae8782d196b204fe085c6f566d04/box/lager/python/executor.py"
  - id: gpio-test
    title: "Executable wired GPIO loopback test"
    url: "https://github.com/lagerdata/lager/blob/bded23b4ca07ae8782d196b204fe085c6f566d04/test/integration/io/gpio_aardvark_loopback.sh"
  - id: overview
    title: "Bench architecture and optional MCP interface"
    url: "https://github.com/lagerdata/lager/blob/bded23b4ca07ae8782d196b204fe085c6f566d04/README.md"
---

## Scope and limits

Lager's named nets bind application-level signals to concrete instrument channels and buses. The bench host provides control and acquisition operations, and runs test scripts close to hardware. Unlike labgrid's resource and fixture abstraction, this workflow also exposes instrument-oriented operations through the named-net CLI. The wired GPIO loopback script exercises real outputs and inputs and reports failures; it requires the specified physical connections. [Architecture](#source-overview) · [Script executor](#source-script-executor) · [Wired test](#source-gpio-test).

The optional MCP server exposes bench discovery and test-planning interfaces to an external agent. This alone does not establish a model-driven implementation of a functional stage. Use access controls and a trusted network, check instrument limits and verify physical state independently of command completion. [MCP interface](#source-overview).

## Reviewed maintenance

September 2026 corrects J-Link flash verification failure handling and error propagation, including a device-specific uncached readback exception. October separates lost scope capture-card state from device disconnect and corrects trace presentation. November adds LabJack GPIO boot configuration; the retained code accounts for device-wide saved settings and distinguishes the T7's lack of direct stored-level readback. [Flash verdict](#source-debug-verdict) · [Scope correction](#source-scope-correction) · [Boot configuration change](#source-activity) · [Retained implementation](#source-boot-config).
