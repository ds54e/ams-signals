---
name: "openFPGALoader"
aliases: []
description: "Cross-vendor command-line tool for programming supported FPGAs and flash devices. It drives compatible cables and interfaces for FPGA configuration, flash and JTAG or SVF operations, including provisioning evaluation boards and test fixtures."
scope:
  control: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited on the Gowin compressed-bitstream parser correction."
  sources: [implementation, development-retained]
  reviewedAt: "2026-11-24"
access: "Apache-2.0; supported cables, target hardware and bitstreams are separate."
addedAt: "2026-11-24"
reviewedAt: "2026-11-25"
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
  - id: development-retained
    title: "Retained Gowin zero-key parser correction"
    url: "https://github.com/trabucayre/openFPGALoader/blob/3c52ab1487ff759e1a3790346455ec7e92ba8c44/src/fsparser.cpp"
  - id: ch347f-detection
    title: "November 23 CH347F USB device detection correction"
    url: "https://github.com/trabucayre/openFPGALoader/commit/0835ac88c80f851db06a80b7f80d6c409256271a"
  - id: cmsis-dap-bulk
    title: "November 23 CMSIS-DAP bulk transfer correction"
    url: "https://github.com/trabucayre/openFPGALoader/commit/3c52ab1487ff759e1a3790346455ec7e92ba8c44"
  - id: cmsis-dap-retained
    title: "Retained CMSIS-DAP bulk write length handling"
    url: "https://github.com/trabucayre/openFPGALoader/blob/3c52ab1487ff759e1a3790346455ec7e92ba8c44/src/cmsisDAP.cpp"
---

## Scope and limits

The reviewed Gowin compressed-bitstream parser fix follows v1.2.0. Parser regression coverage does not establish USB transfer success, supported hardware combinations or a programmed device's functional behavior.

[Reviewed upstream implementation](#source-implementation).

Programming and any integrated verification of that programming are Control operations. Calling the loader in a fixture script does not assign it ownership of the test sequence or DUT verdict.

## Reviewed implementation update, November 25, 2026

November 23 adds CH347F device matching and corrects the CMSIS-DAP v2 USB bulk-transfer path. The retained code sends the actual command length rather than padding all bulk writes to 64 bytes, and removes the fixed delay after bulk reads. These are cable discovery and transport correctness changes after the earlier bitstream parser repair. They do not independently establish programming success or a board's functional result. [Device detection](#source-ch347f-detection) · [Bulk correction](#source-cmsis-dap-bulk) · [Retained driver](#source-cmsis-dap-retained).

Source inspection only; no physical measurement, programming, service migration or upstream regression was independently executed.
