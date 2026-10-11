---
name: "Kepler-Formal"
aliases: ["kepler-formal"]
description: "Equivalence checker for gate-level combinational LEC and gate/RTL sequential equivalence, with SystemVerilog file lists, RTL-to-gate comparisons, Naja interchange and Python design inputs. Experimental VHDL SEC and BTOR2 export extend the checking paths; proved, partial, inconclusive and counterexample outcomes remain distinct."
scope:
  verification:
    ai: false
access: "Apache-2.0 public source; Nix binary distribution and CMake/Bazel source-build paths are documented."
addedAt: "2026-09-18"
reviewedAt: "2026-10-11"
sources:
  - id: "code"
    title: "Canonical Kepler-Formal repository"
    url: "https://github.com/keplertech/kepler-formal"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/keplertech/kepler-formal/blob/acb85ea8eb7b733ee8269d103df7b37f8c28fe4f/README.md"
  - id: "activity"
    title: "Earlier reviewed technical maintenance update"
    url: "https://github.com/keplertech/kepler-formal/commit/1c826a95fa9bffa59d9121a427010a6efbf7c7f9"
  - id: "activity-refresh"
    title: "Previously reviewed meaningful implementation update"
    url: "https://github.com/keplertech/kepler-formal/commit/c2e6a070bb32a4035d3e672776695403cd9781b0"
  - id: "sec-methods"
    title: "Sequential-equivalence engines and result semantics"
    url: "https://github.com/keplertech/kepler-formal/blob/7b260cc1a0ef0f663d727addecaf3305f33931d2/docs/sec-flags-spec.md"
  - id: "activity-review"
    title: "Naja integration, build compatibility and miter regression updates"
    url: "https://github.com/keplertech/kepler-formal/commit/7b260cc1a0ef0f663d727addecaf3305f33931d2"
  - id: "activity-current"
    title: "Naja Python design-input loading"
    url: "https://github.com/keplertech/kepler-formal/commit/acb85ea8eb7b733ee8269d103df7b37f8c28fe4f"
  - id: "review-20261011-1"
    title: "Reviewed implementation integration"
    url: "https://github.com/keplertech/kepler-formal/commit/ea09c2a7917496e5c1db596c79f3fef308a827b5"
---

### Verification modes

The public CLI separates gate-level LEC from SEC and supports sequential comparison at both gate and RTL levels, including SystemVerilog file lists and SystemVerilog-to-Verilog RTL/gate comparisons. Naja interchange inputs provide a path for incremental modifications that preserve stable design indices. [Reviewed source](#source-readme)

### Result boundary

SEC reports proved, partially proved, inconclusive and counterexample outcomes separately, and BTOR2 export without solving is not presented as an equivalence verdict. This entry records the implemented checking modes, not a claim that every transformation or hierarchy is provable. [Reviewed source](#source-readme)

### Scope classification

Equivalence and sequential-equivalence checking are direct Verification tasks. Parsing, netlist preparation and solver backends support those checks rather than becoming separate Design or Synthesis stages, and no model-driven decision path is established. [Reviewed source](#source-readme)

### Current-source review

Reviewed 2026-10-01. Current documentation retains separate LEC, gate/RTL SEC and RTL-to-gate modes. Optional certified internal-relation learning is a formal relation-discovery/checking mechanism, not evidence of a learned model or hosted AI decision path. Keep conventional Verification and the distinction between proof, partial/inconclusive results and BTOR2 export. [README](#source-readme); [SEC methods](#source-sec-methods).

### Current implementation and operating boundaries

The reviewed counter-SEC regressions define truth tables and sequential-cell behavior through the Python input path without a Liberty dependency. Naja compatibility maintenance is separate. These are implemented test/setup paths, not a new general proof engine. [Reviewed implementation integration](#source-review-20261011-1)

The review preserves existing Scope and development-provenance classifications. Source and regression evidence was inspected; external EDA/model/conformance experiments were not rerun.
