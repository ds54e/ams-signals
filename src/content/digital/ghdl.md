---
name: "GHDL"
aliases: []
description: "VHDL analyzer, compiler and simulator with native execution, waveform output and foreign interfaces for verification frameworks. Its experimental synthesis path produces structural netlists and supports Yosys integration; newer VHDL revisions and PSL have partial support, with downstream mapping and physical implementation supplied separately."
scope:
  synthesis:
    ai: false
  verification:
    ai: false
access: "Public GPL-2.0-or-later source, packaged and nightly binaries; runtime-library terms and backend build dependencies vary."
addedAt: "2026-10-05"
reviewedAt: "2026-10-18"
sources:
  - id: "site"
    title: "Official GHDL documentation"
    url: "https://ghdl.github.io/ghdl/"
    purpose: "official"
  - id: "code"
    title: "Canonical GHDL implementation"
    url: "https://github.com/ghdl/ghdl"
    purpose: "code"
  - id: "readme"
    title: "Reviewed simulation, synthesis and standards support"
    url: "https://github.com/ghdl/ghdl/blob/4919fc2cad7b045a166861d5cec345d06429a6d7/README.md"
  - id: "implementation"
    title: "Implemented synthesis driver and output formats"
    url: "https://github.com/ghdl/ghdl/blob/4919fc2cad7b045a166861d5cec345d06429a6d7/src/ghdldrv/ghdlsynth.adb"
  - id: "activity"
    title: "Synthesis regression for issue 3417"
    url: "https://github.com/ghdl/ghdl/commit/4919fc2cad7b045a166861d5cec345d06429a6d7"
  - id: "development-audit-implementation"
    title: "Reviewed AI-attributed implementation"
    url: "https://github.com/ghdl/ghdl/commit/cf98e47517d0076427823097c21d5c7d5bc33890"
  - id: "development-audit-extension"
    title: "Reviewed coordinated implementation extension"
    url: "https://github.com/ghdl/ghdl/commit/10ea0d9b9dfce40e5fa2fe9eba03f29f9b07ef6e"
  - id: "development-audit-retained"
    title: "Retained implementation at the reviewed repository head"
    url: "https://github.com/ghdl/ghdl/blob/2c451de76b07b73fd338c91d68fd5cefcb152512/src/vhdl/vhdl-sem_assocs.adb"
---

### Implementation and scope

Simulation executes analyzed/elaborated VHDL using the selected mcode, LLVM or GCC backend and exposes waveform and foreign-interface paths. Experimental synthesis has a real CLI driver and structural-netlist output; Yosys integration is a separate plugin. Verification and Synthesis are therefore independently supported, without attributing downstream technology mapping or layout to GHDL. [Reviewed capabilities](#source-readme); [synthesis driver](#source-implementation).

The project reports full support for VHDL-1987/1993/2002 and partial support for VHDL-2008/2019 and PSL. Framework compatibility and native execution do not establish full standards compliance or general performance superiority. Reviewed operations are conventional, with no qualifying AI-stage or development-badge evidence. [Support boundaries](#source-readme).

### Reviewed public activity

The canonical master branch history is captured in full. The October 4 UTC change adds an executable synthesis regression involving a clocked process and an inout signal, providing substantive technical test activity rather than only a release-label change. [Reviewed regression](#source-activity).

### Development provenance

The cited Claude-credited changes repair formal-association direction/error handling and declared-versus-analyzed purity in existing compiler semantics. These isolated correctness repairs do not establish substantial implementation of a new subsystem or broad campaign, so no development badge is assigned; this does not assert exclusively human development. [Association repair](#source-development-audit-implementation) · [Purity repair](#source-development-audit-extension) · [Retained frontend](#source-development-audit-retained).
