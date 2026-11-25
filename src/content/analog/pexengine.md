---
name: "PEXEngine"
aliases: ["pexengine", "Circuite PEX"]
summary: "Parasitic extraction orchestration, native RC modeling and normalized backannotation."
description: "Swift parasitic extraction framework with Magic and OpenRCX adapters, bounded native RC calculation, and a normalized parasitic intermediate representation. It parses SPEF, DSPF and extracted SPICE, retains multi-corner artifacts and retry lineage, and can compose extracted parasitics into selected SPICE subcircuits."
scope:
  layout: { ai: false }
access: "MIT-licensed source; Swift 6.3 and macOS 26 are declared requirements. The reviewed package pins public companion repositories; external backends and appropriate extraction models or PDK profiles are separate requirements."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/1amageek/PEXEngine"
    purpose: code
  - id: activity
    title: "October 20 controlled standard parasitic I/O implementation"
    url: "https://github.com/1amageek/PEXEngine/commit/b1bbf83af9218590ff47bb6c8c31482a1dd03bb0"
  - id: earlier
    title: "June 13 process cleanup and coupling-lowering correction"
    url: "https://github.com/1amageek/PEXEngine/commit/6dfc333d7f0a164844be7ea89a3cb11e280ec313"
  - id: native-integration
    title: "October 19 source-bound native extraction and public dependency pins"
    url: "https://github.com/1amageek/PEXEngine/commit/8b8ead61d08ba9a6f43c191b1897f7bac09c530c"
  - id: native
    title: "Retained native extraction adapter and physical projection"
    url: "https://github.com/1amageek/PEXEngine/blob/af89be07e9a5f87e945993860442851e1c69c3e3/Sources/PEXAdapters/NativeBackend/NativePEXAdapter.swift"
  - id: parser-tests
    title: "Retained controlled parasitic I/O regression cases"
    url: "https://github.com/1amageek/PEXEngine/blob/af89be07e9a5f87e945993860442851e1c69c3e3/Tests/PEXParsersTests/ControlledStandardIOTests.swift"
  - id: requirements
    title: "Reviewed package requirements and public dependencies"
    url: "https://github.com/1amageek/PEXEngine/blob/af89be07e9a5f87e945993860442851e1c69c3e3/Package.swift"
  - id: overview
    title: "Backend, artifact and SPICE backannotation workflow"
    url: "https://github.com/1amageek/PEXEngine/blob/af89be07e9a5f87e945993860442851e1c69c3e3/README.md"
---

## Scope and limits

The project provides an independently exposed API and CLI around extraction and standard parasitic representations. The native adapter invokes a geometry-to-RC calculation and canonical projection for supported input configurations; its modeled geometry and technology admission rules constrain physical coverage. Magic and OpenRCX remain separate external extractors, not numerical capabilities reimplemented by their adapters. The project is distinct from KLayout-PEX's geometry/connectivity and PEX25D workflow: its main additional operation is the common intermediate representation, bounded standard I/O, preserved per-corner artifacts and SPICE composition across backends. No runtime AI or certified extractor accuracy is asserted. [Native adapter](#source-native) · [Workflow](#source-overview).

## Reviewed maintenance

June 13 corrected SPEF coupling lowering and process cleanup with tests. October 19 implemented source-bound native execution and public dependency pins. October 20 adds controlled parsing, lowering and SPICE writing/composition with resource reservation and rejection tests. The parser tests are executable source evidence, not an independently reproduced accuracy or memory-bound result. The current package declares macOS 26 and Swift 6.3, and pins public dependencies even though an older installation paragraph in the README still mentions a sibling package. No build, external tool run or numerical correlation was reproduced for this review. [Earlier correction](#source-earlier) · [Native integration](#source-native-integration) · [I/O change](#source-activity) · [Tests](#source-parser-tests) · [Package manifest](#source-requirements).
