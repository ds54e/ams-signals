---
name: "LazyVerilog"
aliases: []
description: "SystemVerilog language server for Neovim and VS Code, with class, package and UVM-aware completion, navigation, formatting and diagnostics. Slang-backed analysis and configurable lint rules accompany RTL code actions for module instantiation, wiring, arguments and sequential logic."
scope:
  design:
    ai: false
  verification:
    ai: false
access: "MIT. The public C++/slang-based language server and editor tooling need the documented build environment. UVM editing support does not supply a UVM simulator."
addedAt: "2026-10-11"
reviewedAt: "2026-10-11"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/lazyverilog/LazyVerilog"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed default-branch revision"
    url: "https://github.com/lazyverilog/LazyVerilog/blob/472926fb70c0a68d21259d9021129e3b4b8ca04c/README.md"
  - id: "release"
    title: "Release"
    url: "https://github.com/lazyverilog/LazyVerilog/releases/tag/v2.1.1"
  - id: "lint-implementation"
    title: "Lint implementation"
    url: "https://github.com/lazyverilog/LazyVerilog/blob/472926fb70c0a68d21259d9021129e3b4b8ca04c/src/features/lint.cpp"
  - id: "instantiation-implementation"
    title: "Instantiation implementation"
    url: "https://github.com/lazyverilog/LazyVerilog/blob/472926fb70c0a68d21259d9021129e3b4b8ca04c/src/features/autoinst.cpp"
  - id: "license"
    title: "License"
    url: "https://github.com/lazyverilog/LazyVerilog/blob/472926fb70c0a68d21259d9021129e3b4b8ca04c/LICENSE"
  - id: "activity"
    title: "Reviewed substantive first-parent implementation update"
    url: "https://github.com/lazyverilog/LazyVerilog/commit/b92801a05c653cc6df1ad5d6005a62c36375b471"
---

## Implementation and Scope

C++/slang-based SystemVerilog LSP with classes/packages/UVM editor support, completion/navigation, formatting, semantic/parse/lint diagnostics and deterministic RTL code actions. The reviewed implementation is described in the [README](#source-readme) and [Release](#source-release), [Lint implementation](#source-lint-implementation), [Instantiation implementation](#source-instantiation-implementation).

The class/UVM-aware editor workflow complements general frontend and lint tools. Auto-instantiation and wiring actions materially serve Design, while parse, semantic and lint diagnostics serve Verification.

## Evidence and operating boundaries

UVM editor support is not UVM simulation. Completion and generated wiring are conventional code actions; no runtime AI prefix is supported by the inspected code. No simulator, synthesis or layout stage is proposed.

MIT. The public C++/slang-based language server and editor tooling need the documented build environment. UVM editing support does not supply a UVM simulator. Test fixtures and the CTest workflow were inspected; they were not executed here. See the [README](#source-readme) for setup and the linked source materials for their own terms.

## Reviewed public activity

The meaningful checkpoint is b92801a05c653cc6df1ad5d6005a62c36375b471 (2026-10-02 UTC), verified on the captured default branch's first-parent chain. The [implementation update](#source-activity) supports the meaningful date; the latest head is separately retained for activity ordering.
