---
name: "LazyVerilog"
aliases: []
description: "SystemVerilog language server for Neovim and VS Code, with class, package and UVM-aware completion, navigation, formatting and diagnostics. Slang-backed analysis and configurable lint rules accompany RTL code actions and CLI autofixes, including distinct safe, unsafe and interactive modes."
scope:
  design:
    ai: false
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude-credited implementation introduced project-scoped compilation groups and connected cross-reference resolution to the requesting project. The current analyzer and background compiler retain the per-project compilation architecture."
  sources: ["development-audit-implementation", "development-audit-extension", "development-audit-retained"]
  reviewedAt: "2026-10-12"
access: "MIT. The public C++/slang-based language server and editor tooling need the documented build environment. UVM editing support does not supply a UVM simulator."
addedAt: "2026-10-11"
reviewedAt: "2026-11-25"
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
  - id: "development-audit-implementation"
    title: "Reviewed AI-attributed implementation"
    url: "https://github.com/lazyverilog/LazyVerilog/commit/a0fc2c3a978f92d4d83b7c4909c05347791dbe13"
  - id: "development-audit-extension"
    title: "Reviewed coordinated implementation extension"
    url: "https://github.com/lazyverilog/LazyVerilog/commit/893c1db11597eb5cb716c6a28984e07ef0030c81"
  - id: "development-audit-retained"
    title: "Retained implementation at the reviewed repository head"
    url: "https://github.com/lazyverilog/LazyVerilog/blob/472926fb70c0a68d21259d9021129e3b4b8ca04c/src/background_compiler.cpp"
  - id: website
    title: Official project website and documentation
    url: https://lazyverilog.github.io
    purpose: official
  - id: lint-autofix
    title: "November 3 shared LSP and CLI autofix integration"
    url: "https://github.com/lazyverilog/LazyVerilog/commit/921c6276eb60918fba34c7199ecfe6623eb8ed6e"
  - id: autofix-cli
    title: "Retained lint autofix modes and safety classifications"
    url: "https://github.com/lazyverilog/LazyVerilog/blob/906e44e443d86a567568ce8b5e52c058d4f70490/docs/linter/cli.md"
  - id: fuzz-maintenance
    title: "November 15 LSP fuzz-runner resource and timeout corrections"
    url: "https://github.com/lazyverilog/LazyVerilog/commit/17c79c6aa2a0649f6cc66b41f17bee072f1506ff"
  - id: compiler-cleanup
    title: "November 18 background-compiler lifecycle and cleanup"
    url: "https://github.com/lazyverilog/LazyVerilog/commit/906e44e443d86a567568ce8b5e52c058d4f70490"
---

## Implementation and Scope

C++/slang-based SystemVerilog LSP with classes/packages/UVM editor support, completion/navigation, formatting, semantic/parse/lint diagnostics and deterministic RTL code actions. The reviewed implementation is described in the [README](#source-readme) and [Release](#source-release), [Lint implementation](#source-lint-implementation), [Instantiation implementation](#source-instantiation-implementation).

The class/UVM-aware editor workflow complements general frontend and lint tools. Auto-instantiation and wiring actions materially serve Design, while parse, semantic and lint diagnostics serve Verification.

## Evidence and operating boundaries

UVM editor support is not UVM simulation. Completion and generated wiring are conventional code actions; no runtime AI prefix is supported by the inspected code. No simulator, synthesis or layout stage is proposed.

MIT. The public C++/slang-based language server and editor tooling need the documented build environment. UVM editing support does not supply a UVM simulator. Test fixtures and the CTest workflow were inspected; they were not executed here. See the [README](#source-readme) for setup and the linked source materials for their own terms.

## Reviewed public activity

The earlier meaningful checkpoint is b92801a05c653cc6df1ad5d6005a62c36375b471 (2026-10-02 UTC). November 15 verification maintenance supersedes it in the saved capture. The [implementation update](#source-activity) supports the meaningful date; the latest head is separately retained for activity ordering.

### Development provenance

The changes replace one combined compilation context with per-project inputs, snapshots and background compilation, then route the Connect feature through that identity boundary. This is substantial language-server architecture and resolution work; the label is not based on the number of credited formatting fixes. [Implementation](#source-development-audit-implementation) · [Implementation](#source-development-audit-extension) · [Retained code](#source-development-audit-retained)

## November implementation review

November 3 integrates diagnostic fixes for the language server and standalone linter. The CLI distinguishes `--fix`, `--fix-unsafe` and `--fix-interactive`. These are deterministic edits; a safe classification is the tool's own assessment, not an independent proof of equivalence. November 15 streams fuzz sessions instead of keeping them entirely in memory, preserves the command timeout for queued requests and adds resource heartbeats and watchdog regression coverage. The saved meaningful checkpoint is the November 15 test-maintenance integration. November 18 primarily refactors existing code and simplifies the background compiler to one worker, including lifecycle cleanup; no new language capability is inferred from that refactor. No LSP, lint or simulator test was independently executed. [Autofix integration](#source-lint-autofix) · [CLI](#source-autofix-cli) · [Fuzzer maintenance](#source-fuzz-maintenance) · [Cleanup](#source-compiler-cleanup).
