---
name: "LiteX"
aliases: []
description: "Python-based FPGA SoC builder that connects CPUs, buses, memories and peripherals, emits gateware and drives supported FPGA synthesis and place-and-route flows. It also supports Verilator-based SoC simulation; usable features depend on the selected platform, cores and installed toolchain."
scope: {"design": {"ai": false}, "synthesis": {"ai": false}, "verification": {"ai": false}, "layout": {"ai": false}, "aiDevelopment": "assisted"}
access: "Public SoC and build implementation; platform definitions, external HDL cores, and installed toolchains vary."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
developmentEvidence: {"summary": "Claude is co-credited on propagating the clock-domain frequency into LiteI2C. The reviewed SoC integration retains the frequency requirement for a non-system clock domain and passes it to the core.", "sources": ["credited", "retained"], "reviewedAt": "2026-11-24"}
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/enjoy-digital/litex"
    purpose: code
  - id: activity
    title: "Reviewed substantive implementation checkpoint"
    url: "https://github.com/enjoy-digital/litex/commit/6438a25a060bd691b082da4c845ad26885f4059e"
  - id: website
    title: "Maintainer’s LiteX documentation and tutorials"
    url: "https://github.com/enjoy-digital/litex/wiki"
    purpose: official
  - id: release
    title: "Tagged LiteX 2026.08"
    url: "https://github.com/enjoy-digital/litex/tree/2026.08"
  - id: tool-flow
    title: "Reviewed Yosys/nextpnr build flow"
    url: "https://github.com/enjoy-digital/litex/blob/afed66238638fac1d1e13c3edd6568cdccea5356/litex/build/yosys_nextpnr_toolchain.py"
  - id: simulation
    title: "Reviewed Verilator simulation entry point"
    url: "https://github.com/enjoy-digital/litex/blob/afed66238638fac1d1e13c3edd6568cdccea5356/litex/tools/litex_sim.py"
  - id: credited
    title: "Credited LiteI2C clock-domain frequency correction"
    url: "https://github.com/enjoy-digital/litex/commit/776e7cb1802e898de511757f4f5c264e706d665a"
  - id: retained
    title: "Retained SoC integration implementation"
    url: "https://github.com/enjoy-digital/litex/blob/afed66238638fac1d1e13c3edd6568cdccea5356/litex/soc/integration/soc.py#L2959-L2982"
---

### Scope, maintenance and provenance

Design is the SoC generation itself. Synthesis and Layout cover implemented orchestration of synthesis and FPGA place-and-route, not an independent synthesis or ASIC layout engine. Verification is the usable Verilator system simulation path, not comprehensive verification of an installed board. LiteScope is a separate capture core and is not counted as a LiteX bench instrument. [Build flow](#source-tool-flow) · [Simulation entry point](#source-simulation).

The 2026.08 tag is separate from later SoC code. November includes the supported PCIe shared-buffer integration and the clock-domain frequency fix for LiteI2C, with separate scoped tests. Claude is co-credited on the retained LiteI2C fix, not on producing a runtime AI tool. [Tagged source](#source-release) · [Later integration](#source-activity) · [Credited fix](#source-credited) · [Retained code](#source-retained).
