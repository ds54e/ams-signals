---
name: "RgGen"
aliases: []
description: "Register-map and CSR generator producing SystemVerilog RTL, UVM RAL models, C headers and Markdown documentation. Ruby, structured-text and spreadsheet inputs feed an extensible bit-field, bus-protocol and writer system; current master adds an optional SystemRDL input plugin beyond the latest stable release."
scope:
  design:
    ai: false
  verification:
    ai: false
access: "Public Ruby toolchain; optional input/language plugins and generated RTL/UVM dependencies are selected separately."
addedAt: "2026-09-07"
reviewedAt: "2026-09-07"
sources:
  - id: "readme"
    title: "Official RgGen guide at the reviewed master revision"
    url: "https://github.com/rggen/rggen/blob/a55d05aed0b1785bf44905ce3b194e8db723444d/README.md"
    purpose: "official"
  - id: "code"
    title: "Canonical RgGen repository"
    url: "https://github.com/rggen/rggen"
    purpose: "code"
  - id: "release-features"
    title: "RgGen v0.36.0, January 7, 2026"
    url: "https://github.com/rggen/rggen/releases/tag/v0.36.0"
  - id: "release"
    title: "RgGen v0.36.1, April 19, 2026"
    url: "https://github.com/rggen/rggen/releases/tag/v0.36.1"
  - id: "activity"
    title: "SystemRDL plugin integration and generated-output tests, August 16, 2026"
    url: "https://github.com/rggen/rggen/commit/a55d05aed0b1785bf44905ce3b194e8db723444d"
  - id: "systemrdl"
    title: "SystemRDL plugin documentation at the reviewed revision"
    url: "https://github.com/rggen/rggen-systemrdl/blob/c2647adb817398aeedbc514fef383ecc408da266/README.md"
  - id: "precedence"
    title: "Implemented SystemRDL precedence validation"
    url: "https://github.com/rggen/rggen-systemrdl/blob/c2647adb817398aeedbc514fef383ecc408da266/lib/rggen/systemrdl/converter/field.rb"
  - id: "mapping"
    title: "SystemRDL component mapping and unsupported constructs"
    url: "https://github.com/rggen/rggen-systemrdl/blob/c2647adb817398aeedbc514fef383ecc408da266/notes/systemrdl_to_rggen_mapping.md"
---

### Implementation context

Ruby DSL, YAML, JSON, TOML and spreadsheet register maps feed RTL, UVM register-model, C-header and documentation writers. APB, AXI4-Lite, Avalon-MM and Wishbone support and custom bit-field/protocol extensions are documented; optional writers include Verilog, Veryl and VHDL. These choices distinguish RgGen's multi-format authoring from PeakRDL's SystemRDL-centered model/exporter ecosystem. [Reviewed guide](#source-readme).

### Release and SystemRDL boundary

Version 0.36.0 shipped January 7, 2026 with counter bit fields, maskable registers and writer changes; 0.36.1 followed April 19 with a dependency fix. The August 16 master change documents and tests optional SystemRDL plugin integration against generated outputs. That integration is later than the stable root release. [Feature release](#source-release-features); [stable release](#source-release); [meaningful integration](#source-activity).

RgGen uses hardware precedence, whereas SystemRDL defaults to software precedence. The reviewed plugin rejects effective software precedence unless `ignore_precedence` is enabled; an explicit or inherited hardware setting is accepted. The override discards the input choice and generates hardware-precedence behavior. This is not lossless semantic interchange. [Plugin contract](#source-systemrdl); [field validation](#source-precedence).

External registers/regfiles, reference-valued resets, user reset signals and property references are among the unsupported constructs. Memories reserve external address regions without generating memory contents; access width follows RgGen configuration. [Mapping notes](#source-mapping).

### Scope and development provenance

Design covers generated register RTL; Verification covers UVM RAL models. Synthesizable output alone does not establish Synthesis. Generation and conversion are conventional operations. Reviewed root/plugin documentation and reachable history do not establish qualifying AI-assisted implementation, so no development label is assigned. [Functional evidence](#source-readme); [plugin evidence](#source-systemrdl).
