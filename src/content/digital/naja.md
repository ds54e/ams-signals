---
name: "Naja"
aliases: ["najaeda"]
description: "C++ and Python EDA framework for elaborating RTL, inspecting hierarchy and connectivity, and editing structural netlists. Its netlist CLI applies dead-logic elimination, constant propagation and primitive optimizations, with Verilog/SNL interchange and beta VHDL loading; companion tools provide formal checking and agent interfaces."
scope:
  design:
    ai: false
  synthesis:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited in a canonical implementation change that releases parameter properties before destruction, including Python-wrapper invalidation. Current Naja code retains these cleanup calls."
  sources: ["activity", "development-retained-20261018"]
  reviewedAt: '2026-10-18'
access: "Public Apache-2.0 source and najaeda Python wheels; source builds require the documented frontend and native-library dependencies."
addedAt: "2026-10-05"
reviewedAt: "2026-10-31"
sources:
  - id: "site"
    title: "Official najaeda Python API documentation"
    url: "https://najaeda.readthedocs.io/en/latest/"
    purpose: "official"
  - id: "code"
    title: "Canonical Naja implementation"
    url: "https://github.com/keplertech/naja"
    purpose: "code"
  - id: "readme"
    title: "Reviewed framework, APIs, transformations and companion boundaries"
    url: "https://github.com/keplertech/naja/blob/931afedebbd6269bb5e1f27a2cc2cc1a73dfc37f/README.md"
  - id: "implementation"
    title: "Netlist editing and optimization CLI"
    url: "https://github.com/keplertech/naja/blob/931afedebbd6269bb5e1f27a2cc2cc1a73dfc37f/src/apps/naja_edit/NajaEdit.cpp"
  - id: "activity"
    title: "Avoid memory inference for arrays with multiple sequential writers"
    url: "https://github.com/keplertech/naja/commit/931afedebbd6269bb5e1f27a2cc2cc1a73dfc37f"
  - id: "activity-tip"
    title: "Primitive wiring, Verilog dump controls and PULP regressions"
    url: "https://github.com/keplertech/naja/commit/50306aa8662347000ee43bfce0ebcf6cf44720b9"
  - id: "review-20261011-1"
    title: "Reviewed implementation integration"
    url: "https://github.com/keplertech/naja/commit/545ebd99803d301bdb46b4f326998945df83aa28"
  - id: "development-retained-20261018"
    title: "Retained executable code at the reviewed canonical head"
    url: "https://github.com/keplertech/naja/blob/217a85474042f6c5a38e1b6217427ea94f10e51e/src/nl/netlist/snl/SNLParameter.cpp"
---

### Implementation and scope

The reusable SNL representation and Python/C++ APIs support direct netlist edits, distinct from read-only simulator internals. The CLI runs dead-logic elimination, constant propagation and primitive reductions before export. Those user-facing transformations establish Design and bounded Synthesis coverage; this is not a complete technology-mapping or physical implementation flow. [Framework architecture](#source-readme); [implemented CLI](#source-implementation).

VHDL loading is beta. Formal equivalence belongs to Kepler-Formal, and model-hosted inspection belongs to naja-scope; their verification and AI classifications are not inherited by this conventional core framework. The separate credited code contribution supports AI-assisted development. [Frontend and companion boundaries](#source-readme).

### Reviewed public activity

The canonical main branch history was captured in full. The October 4 UTC frontend change prevents memory inference when multiple always blocks write the same array, avoiding conflicting lowered drivers. [Reviewed change](#source-activity).

The later implementation adds canonical assignment primitives for VHDL wiring and optional packed-signal splitting annotations in Verilog dumps, with Python bindings and structural regressions. Expanded PULP tests exercise elaborated/dumped designs through external tools; reported workload outcomes are not independent catalog reproduction. [Current implementation checkpoint](#source-activity-tip).

### Current implementation and operating boundaries

The reviewed implementation repairs VHDL full-adder behavior and adds parameterized flip-flop modeling. These are targeted representation and semantic fixes within the current synthesis/design workflow. [Reviewed implementation integration](#source-review-20261011-1)

The implementation review preserves functional Scope. Source and regression evidence was inspected; external EDA/model/conformance experiments were not rerun.

### Development provenance

Claude is credited in a canonical implementation change that releases parameter properties before destruction, including Python-wrapper invalidation. Current Naja code retains these cleanup calls. This supports AI-assisted development without establishing that AI built most of the project. [AI-credited executable implementation](#source-activity) · [Retained executable code at the reviewed canonical head](#source-development-retained-20261018).


The canonical repository moved from `najaeda/naja` to `keplertech/naja` with GitHub repository ID 414906187 unchanged. Source links now use that canonical owner; the move does not independently establish new implementation activity.
