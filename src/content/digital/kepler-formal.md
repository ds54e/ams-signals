---
name: "Kepler-Formal"
aliases: ["kepler-formal"]
description: "Open-source equivalence checker supporting gate-level combinational LEC, gate-level and RTL sequential equivalence, SystemVerilog file-list flows, RTL-to-gate SEC and Naja interchange inputs. It can export SEC problems to BTOR2 and distinguishes proved, partially proved, inconclusive and counterexample outcomes."
scope:
  verification:
    ai: false
access: "Apache-2.0 public source; Nix binary distribution and CMake/Bazel source-build paths are documented."
addedAt: "2026-09-18"
reviewedAt: "2026-09-18"
sources:
  - id: "code"
    title: "Canonical Kepler-Formal repository"
    url: "https://github.com/keplertech/kepler-formal"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/keplertech/kepler-formal/blob/1c826a95fa9bffa59d9121a427010a6efbf7c7f9/README.md"
  - id: "activity"
    title: "Latest reviewed technical maintenance update"
    url: "https://github.com/keplertech/kepler-formal/commit/1c826a95fa9bffa59d9121a427010a6efbf7c7f9"
  - id: "activity-refresh"
    title: "Latest reviewed meaningful implementation update"
    url: "https://github.com/keplertech/kepler-formal/commit/c7b8fe6db94d605acd6c4c2ae9b349dc272b1106"
---

### Verification modes

The public CLI separates gate-level LEC from SEC and supports sequential comparison at both gate and RTL levels, including SystemVerilog file lists and SystemVerilog-to-Verilog RTL/gate comparisons. Naja interchange inputs provide a path for incremental modifications that preserve stable design indices. [Reviewed source](#source-readme)

### Result boundary

SEC reports proved, partially proved, inconclusive and counterexample outcomes separately, and BTOR2 export without solving is not presented as an equivalence verdict. This entry records the implemented checking modes, not a claim that every transformation or hierarchy is provable. [Reviewed source](#source-readme)

### Scope classification

Equivalence and sequential-equivalence checking are direct Verification tasks. Parsing, netlist preparation and solver backends support those checks rather than becoming separate Design or Synthesis stages, and no model-driven decision path is established. [Reviewed source](#source-readme)
