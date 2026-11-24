---
name: "openFPGALoader"
aliases: []
description: "Cross-vendor command-line tool for programming supported FPGAs and flash devices. It drives compatible cables and interfaces for FPGA configuration, flash and JTAG or SVF operations, including provisioning evaluation boards and test fixtures."
scope:
  control: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited on the Gowin compressed-bitstream parser correction."
  sources: [implementation]
  reviewedAt: "2026-11-24"
access: "Apache-2.0; supported cables, target hardware and bitstreams are separate."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://trabucayre.github.io/openFPGALoader/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/trabucayre/openFPGALoader"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/trabucayre/openFPGALoader/commit/2aafd90208dc8c3142fb617d2a91522513107c17"
  - id: implementation
    title: "Specific implementation reviewed"
    url: "https://github.com/trabucayre/openFPGALoader/commit/ac8eab2abad8f7e8cb4d5b1e4e2c16d0b874531f"
---

## Scope and limits

The reviewed Gowin compressed-bitstream parser fix follows v1.2.0. Parser regression coverage does not establish USB transfer success, supported hardware combinations or a programmed device's functional behavior.

[Reviewed upstream implementation](#source-implementation).

Programming and any integrated verification of that programming are Control operations. Calling the loader in a fixture script does not assign it ownership of the test sequence or DUT verdict.
