---
name: "Hardcaml"
aliases: []
description: "OCaml hardware-construction library for parameterized circuit design and Verilog, SystemVerilog or VHDL generation. It provides cycle simulation, waveform data and circuit inspection; the reviewed development version also implements four-state logic values, while FPGA synthesis and physical implementation use downstream tools."
scope:
  design:
    ai: false
  verification:
    ai: false
access: "MIT OCaml source. Reviewed development metadata requires OCaml >=5.1, dune >=3.17, ppxlib >=0.39 and Jane Street libraries/PPX packages; 32-bit x86 is excluded. Terminal waveform rendering and accelerated/external simulation backends are separate packages; downstream FPGA/ASIC tools retain their own requirements."
addedAt: "2026-11-15"
reviewedAt: "2026-11-15"
sources:
  - id: "official"
    title: "Hardcaml manual at the reviewed revision"
    url: "https://github.com/janestreet/hardcaml/blob/d9da179ea12228a0e3f7c1358fedec2ab8971f73/docs/index.md"
    purpose: "official"
  - id: "code"
    title: "Canonical Jane Street Hardcaml repository"
    url: "https://github.com/janestreet/hardcaml"
    purpose: "code"
  - id: "overview"
    title: "Hardware construction, simulation and separate companion libraries"
    url: "https://github.com/janestreet/hardcaml/blob/d9da179ea12228a0e3f7c1358fedec2ab8971f73/README.md"
  - id: "rtl"
    title: "Implemented Verilog/SystemVerilog and VHDL emission"
    url: "https://github.com/janestreet/hardcaml/blob/d9da179ea12228a0e3f7c1358fedec2ab8971f73/src/rtl.ml"
  - id: "simulation"
    title: "Cycle execution, reset and circuit simulation"
    url: "https://github.com/janestreet/hardcaml/blob/d9da179ea12228a0e3f7c1358fedec2ab8971f73/src/cyclesim.ml"
  - id: "activity"
    title: "November 3 implementation snapshot including four-state logic and tests"
    url: "https://github.com/janestreet/hardcaml/commit/d9da179ea12228a0e3f7c1358fedec2ab8971f73"
  - id: "four-state"
    title: "Retained two-plane four-state logic implementation"
    url: "https://github.com/janestreet/hardcaml/blob/d9da179ea12228a0e3f7c1358fedec2ab8971f73/src/four_state_logic.ml"
  - id: "four-state-contract"
    title: "Pessimistic and optimistic logic semantics and boundaries"
    url: "https://github.com/janestreet/hardcaml/blob/d9da179ea12228a0e3f7c1358fedec2ab8971f73/src/four_state_logic.mli"
  - id: "four-state-tests"
    title: "Executable encoding, truth-table, mux and arithmetic tests"
    url: "https://github.com/janestreet/hardcaml/blob/d9da179ea12228a0e3f7c1358fedec2ab8971f73/test/lib/test_four_state_logic.ml"
  - id: "waveform-history"
    title: "July 10 substantive VCD read/write implementation and regression tests"
    url: "https://github.com/janestreet/hardcaml/commit/ff4fe609b15d2627d3d5aa14a54595e38424808a"
  - id: "waveform"
    title: "Current mutable-event waveform VCD I/O"
    url: "https://github.com/janestreet/hardcaml/blob/d9da179ea12228a0e3f7c1358fedec2ab8971f73/src/vcd.ml"
  - id: "dependencies"
    title: "Current OCaml, dune and library requirements"
    url: "https://github.com/janestreet/hardcaml/blob/d9da179ea12228a0e3f7c1358fedec2ab8971f73/hardcaml.opam"
  - id: "license"
    title: "MIT license"
    url: "https://github.com/janestreet/hardcaml/blob/d9da179ea12228a0e3f7c1358fedec2ab8971f73/LICENSE.md"
  - id: "stable-tag"
    title: "Reviewed v0.17.1 tagged source, distinct from master development"
    url: "https://github.com/janestreet/hardcaml/tree/cc2f35b00a16aa83da38957100b31b2f2cb4384c"
  - id: "ai-guidance"
    title: "Prompt guidance for users writing Hardcaml with external AI models"
    url: "https://github.com/janestreet/hardcaml/blob/d9da179ea12228a0e3f7c1358fedec2ab8971f73/docs/using_ai.md"
---

### Implementation and selection

Hardcaml exposes circuit construction and explicit Verilog/SystemVerilog emission, alongside VHDL. This establishes a supported Verilog workflow. Circuit elaboration and RTL generation support Design; cycle execution, signal inspection and waveform I/O support Verification. Downstream FPGA synthesis does not establish a separate Synthesis or Layout stage for this library. Companion waveform renderers and simulation accelerators are separate projects, not additional activity identities here. [Overview](#source-overview) · [RTL implementation](#source-rtl) · [Cycle simulator](#source-simulation)

The November 3 master snapshot has a version-style message but substantive code: it adds equal-width value/mask planes encoding 0, 1, X and Z, arithmetic and structural operations, and distinct pessimistic/optimistic combinational implementations. Tests cover encoding, width errors, truth tables, mux behavior and arithmetic. An impure mux selector yields X in both implementations; these semantics do not establish a complete Verilog event simulator or four-state execution throughout Cyclesim. [Meaningful diff](#source-activity) · [Implementation](#source-four-state) · [Semantic limits](#source-four-state-contract) · [Executable tests](#source-four-state-tests)

Distinct substantive history includes the July 10 snapshot's VCD readers/writers and executable round-trip, scope and event-order regressions. November subsequently changes the waveform representation and I/O to mutable events, including four-state data. Selection rests on inspected implementation and validation across these snapshots, rather than their version messages or commit counts. [Earlier VCD work](#source-waveform-history) · [Current VCD implementation](#source-waveform)

### Release, access and AI classification

The actual default branch is master. Its reviewed head identifies itself as a v0.18 preview; the reviewed stable v0.17.1 tag resolves to cc2f35b, dated October 8, 2025, and lacks the new four_state_logic module. November functionality is development capability, not a claimed v0.17.1 feature. GitHub Release objects lag the tags, so they are not used as the current package-version inventory. [Development snapshot](#source-activity) · [Tagged source](#source-stable-tag)

MIT covers the project source. The current opam file requires OCaml >=5.1, dune >=3.17 and ppxlib >=0.39, plus Base/Core, bignum, jane_rope and PPX/serialization dependencies; it excludes 32-bit x86. Separate backends and downstream vendor tools have their own requirements. [License](#source-license) · [Dependency declarations](#source-dependencies) · [Companion libraries](#source-overview)

Runtime Design and Verification use conventional algorithms. The AI document provides prompts for external models writing user designs/testbenches; it does not establish an implemented model-driven stage in this library or attribute a retained Hardcaml implementation to AI. The bounded review of reachable commit messages and the selected diffs did not establish qualifying development credit, so no AI-assisted development label is assigned. This is not a claim of exclusively human development. [AI guidance](#source-ai-guidance) · [Reviewed implementation](#source-activity)

### Activity capture

The record pins the canonical repository, numeric identity, actual master head and capture time, with UTC committer buckets reconstructed from its complete 148-commit first-parent chain to the root. The manually reviewed meaningful checkpoint is d9da179 on November 3. Published bulk snapshots can contain many internal changes; these counts describe public first-parent commits, not internal engineering cadence or verified push times. November is partial. No OCaml/HDL toolchain or upstream regression suite was executed. [Repository](#source-code) · [Meaningful source](#source-activity)
