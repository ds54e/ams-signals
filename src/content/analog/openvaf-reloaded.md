---
name: "OpenVAF-Reloaded"
aliases: []
summary: "Compiles Verilog-A device models into OSDI shared libraries."
description: "Verilog-A compiler whose current development branch emits OSDI 0.5 model libraries for compatible circuit simulators, retaining timestep-bound and batch-cache correctness work. Host compatibility is separate from language coverage; cross, above, timer and absdelta event controls still warn that their events are not scheduled."
scope:
  simulation:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude- and Cursor-credited development implemented VAMS-2023 named events and jump statements across compiler representation, validation and lowering. The current lowering code retains these language-support paths."
  sources: ["development-audit-implementation", "development-audit-extension", "development-audit-retained"]
  reviewedAt: "2026-10-12"
access: "Public Rust/LLVM compiler; generated libraries require a simulator implementing the matching OSDI interface."
addedAt: "2026-09-05"
reviewedAt: "2026-11-03"
sources:
  - id: "code"
    title: "Canonical public source repository"
    url: "https://github.com/OpenVAF/OpenVAF-Reloaded"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed default-branch revision"
    url: "https://github.com/OpenVAF/OpenVAF-Reloaded/blob/fdf2522b70f42793f64b1c72f0195c96dea0cc19/README.md"
  - id: "activity"
    title: "Reviewed substantive default-branch update"
    url: "https://github.com/OpenVAF/OpenVAF-Reloaded/commit/fdf2522b70f42793f64b1c72f0195c96dea0cc19"
  - id: "interface"
    title: "OSDI 0.4 interface at the reviewed revision"
    url: "https://github.com/OpenVAF/OpenVAF-Reloaded/blob/fdf2522b70f42793f64b1c72f0195c96dea0cc19/openvaf/osdi/header/osdi_0_4.h"
  - id: "development-audit-implementation"
    title: "Reviewed AI-attributed implementation"
    url: "https://github.com/OpenVAF/OpenVAF-Reloaded/commit/ca099d237471a99623ab4b97d899928b317f3e34"
  - id: "development-audit-extension"
    title: "Reviewed coordinated implementation extension"
    url: "https://github.com/OpenVAF/OpenVAF-Reloaded/commit/ef6436dc4e73b5f97a23cfc40546701bfc287961"
  - id: "development-audit-retained"
    title: "Retained implementation at the reviewed repository head"
    url: "https://github.com/OpenVAF/OpenVAF-Reloaded/blob/fdf2522b70f42793f64b1c72f0195c96dea0cc19/openvaf/hir_lower/src/stmt.rs"
  - id: review-20261031-bounds
    title: Minimum of multiple timestep bounds with conditional regression
    url: https://github.com/OpenVAF/OpenVAF-Reloaded/commit/008babf9855f9e79a1e759b51e1b92451564b6c2
  - id: review-20261031-events
    title: Explicit warning for event controls without scheduling
    url: https://github.com/OpenVAF/OpenVAF-Reloaded/commit/4d33225bb851c700f2d3f12f3df8554422475f54
  - id: review-20261031-cache
    title: Target and code-generation settings in batch cache keys
    url: https://github.com/OpenVAF/OpenVAF-Reloaded/commit/9a75d3d3c2f730ce92b78ca4f67e98adc929297d
  - id: review-20261031-concurrency
    title: Unique batch intermediates and atomic final-library replacement
    url: https://github.com/OpenVAF/OpenVAF-Reloaded/commit/83c251f48cea442c9869c0cb6453dcd9e17d7dfd
  - id: review-20261103-integration
    title: "Reconcile maintained compiler with upstream OSDI 0.5"
    url: https://github.com/OpenVAF/OpenVAF-Reloaded/commit/2b5909bccd17b1cdc01a3ebced8ca7b3833c8a5c
  - id: review-20261103-interface
    title: "Current OSDI 0.5 header"
    url: https://github.com/OpenVAF/OpenVAF-Reloaded/blob/2b5909bccd17b1cdc01a3ebced8ca7b3833c8a5c/openvaf/osdi/header/osdi_0_5.h
  - id: review-20261103-events
    title: "Retained unscheduled-event lint on rewritten lineage"
    url: https://github.com/OpenVAF/OpenVAF-Reloaded/commit/fae51c35c1bffee70770403257d4d06bae054269
---

### Scope

Compiles Verilog-A models into dynamic libraries implementing the OSDI simulator API. The delivered model libraries serve Simulation; electrical execution occurs in the host simulator. [Compiler documentation](#source-readme) and [OSDI header](#source-interface).

### Release boundary

The verified default branch is mob, despite older master wording in the README. The October review established OSDI 0.4 on that earlier lineage; the November source review below supersedes the current-interface claim. The legacy OSDI 0.3 branch was documented as unmaintained. Simulator compatibility and available OSDI features are separate from compiler generation. [Interface boundary](#source-readme).

### Scope classification

The compiler turns Verilog-A models into OSDI libraries consumed by simulators. The compiled simulation models are the user-facing deliverable; the host simulator executes electrical analyses. [Reviewed source](#source-readme).

Verilog-A-to-OSDI compilation enables numerical simulation in a host tool. This compiler path does not use reviewed AI inference. [AI/stage evidence](#source-readme).

### Development provenance

Named-event declaration/trigger/detection and break/continue/return support span syntax, HIR, semantic diagnostics and control-flow lowering, with compiler/OSDI regression fixtures. This is executable language implementation within OpenVAF-Reloaded; attribution is not borrowed from the separately cataloged ngspice/OpenVAF enhancement repository. [Implementation](#source-development-audit-implementation) · [Implementation](#source-development-audit-extension) · [Retained code](#source-development-audit-retained)

### Timestep correctness and actual event boundary

The October 23 lowering change takes the minimum across multiple $bound_step calls instead of allowing the last call to overwrite an earlier tighter bound. Its MIR fixture includes a conditional second call. Separately, the new unscheduled_event lint warns that cross, above, timer and absdelta event expressions are checked but do not participate in scheduling; the guarded body is evaluated on each analog-block evaluation. Retained-state handling and named-event lowering do not supply missing event-time scheduling. This is a material capability limitation, not a new claim of complete event support. [Bound and regression](#source-review-20261031-bounds) · [Diagnostic and fixtures](#source-review-20261031-events).

The October 25 batch-compiler corrections incorporate target/CPU/optimization/codegen settings in cache keys and use unique temporary artifacts with final rename, reducing incorrect cache reuse and concurrent file collisions. At the October review, meaningful activity advanced to that first-parent cache-key change; the November review below records its rewritten replacement. These are canonical development changes; tagged-release inclusion and external simulator behavior were not independently reproduced. Existing AI-development provenance remains supported independently. [Cache key](#source-review-20261031-cache) · [Concurrent output handling](#source-review-20261031-concurrency).

### Selection and current source review

The canonical default remains mob. Its November history was rewritten: the previously reviewed cache-key SHA is absent from the captured first-parent lineage. The replacement checkpoint is the inspected OSDI 0.5 reconciliation, including lowering, limiting-delta handling and diagnostic/integration-test changes; it retains the code-generation cache fix on the new lineage. The current header/descriptor and README establish OSDI 0.5 development output, while older README references to master/mb-experimental describe other lines. Do not infer released host support from that compiler interface or transfer this update to the August v24.0.2mob tag. The unscheduled_event lint and fixtures still warn for cross/above/timer/absdelta. Existing credited named-event/jump implementation remains independent software-development provenance. [Reconciliation](#source-review-20261103-integration) · [Current interface](#source-review-20261103-interface) · [Retained scheduling limitation](#source-review-20261103-events).
