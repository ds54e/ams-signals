---
name: "PyRTL"
aliases: []
description: "Python hardware-construction toolkit for RTL design, Verilog export, gate-level lowering and logic optimization. It includes cycle simulation and waveform tracing, with optional generated-C simulation and Yosys-assisted Verilog import; its internal synthesis targets generic single-bit logic rather than a complete technology-mapped physical implementation flow."
scope:
  design:
    ai: false
  synthesis:
    ai: false
  verification:
    ai: false
access: "BSD-3-Clause Python source; the reviewed development metadata requires Python >=3.11 and no core Python dependencies. BLIF import needs pyparsing; Verilog import additionally invokes external Yosys. CompiledSimulation invokes GCC, and optional SVG visualization needs Graphviz and its Python interface."
addedAt: "2026-11-15"
reviewedAt: "2026-11-15"
sources:
  - id: "official"
    title: "Official PyRTL documentation"
    url: "https://pyrtl.readthedocs.io/"
    purpose: "official"
  - id: "code"
    title: "Canonical PyRTL repository"
    url: "https://github.com/UCSBarchlab/PyRTL"
    purpose: "code"
  - id: "overview"
    title: "PyRTL scope and primary development branch"
    url: "https://github.com/UCSBarchlab/PyRTL/blob/9c4fd68fc69649a9ba9dc72d3b1511707d98d7d3/README.md"
  - id: "wire-implementation"
    title: "Retained wire-source and register-next construction logic"
    url: "https://github.com/UCSBarchlab/PyRTL/blob/9c4fd68fc69649a9ba9dc72d3b1511707d98d7d3/pyrtl/wire.py"
  - id: "wire-tests"
    title: "Executable constructor-connection and register simulation regressions"
    url: "https://github.com/UCSBarchlab/PyRTL/blob/9c4fd68fc69649a9ba9dc72d3b1511707d98d7d3/tests/test_wire.py"
  - id: "activity"
    title: "September 30 constructor-assignment implementation and tests"
    url: "https://github.com/UCSBarchlab/PyRTL/commit/46b1078c0c89db25d9cbe51fd07b4337cfec9f43"
  - id: "constructor-pr"
    title: "Merged PR 512; final implementation differs from the early Register src proposal"
    url: "https://github.com/UCSBarchlab/PyRTL/pull/512"
  - id: "concat-integration"
    title: "Constant-concatenation optimization with regression expectation updates"
    url: "https://github.com/UCSBarchlab/PyRTL/commit/1a7c60665e138b4ad92fbed3e4faf0dcabfacf94"
  - id: "concat-implementation"
    title: "Retained immediate constant concatenation"
    url: "https://github.com/UCSBarchlab/PyRTL/blob/9c4fd68fc69649a9ba9dc72d3b1511707d98d7d3/pyrtl/corecircuits.py"
  - id: "synthesis"
    title: "Implemented generic gate lowering and optimization passes"
    url: "https://github.com/UCSBarchlab/PyRTL/blob/9c4fd68fc69649a9ba9dc72d3b1511707d98d7d3/pyrtl/passes.py"
  - id: "hdl-io"
    title: "Verilog emission and external Yosys/BLIF import path"
    url: "https://github.com/UCSBarchlab/PyRTL/blob/9c4fd68fc69649a9ba9dc72d3b1511707d98d7d3/pyrtl/importexport.py"
  - id: "simulation"
    title: "Cycle simulation, generated-Python simulation and waveform traces"
    url: "https://github.com/UCSBarchlab/PyRTL/blob/9c4fd68fc69649a9ba9dc72d3b1511707d98d7d3/pyrtl/simulation.py"
  - id: "compiled-simulation"
    title: "Generated C and external GCC invocation"
    url: "https://github.com/UCSBarchlab/PyRTL/blob/9c4fd68fc69649a9ba9dc72d3b1511707d98d7d3/pyrtl/compilesim.py"
  - id: "dependencies"
    title: "Python compatibility, empty core dependencies and optional imports"
    url: "https://github.com/UCSBarchlab/PyRTL/blob/9c4fd68fc69649a9ba9dc72d3b1511707d98d7d3/pyproject.toml"
  - id: "license"
    title: "Three-clause BSD license"
    url: "https://github.com/UCSBarchlab/PyRTL/blob/9c4fd68fc69649a9ba9dc72d3b1511707d98d7d3/LICENSE.md"
  - id: "changelog"
    title: "Published-release history through 1.0.3, August 4, 2026"
    url: "https://github.com/UCSBarchlab/PyRTL/blob/9c4fd68fc69649a9ba9dc72d3b1511707d98d7d3/CHANGELOG.md"
  - id: "release-tag"
    title: "PyRTL 1.0.3 tagged source"
    url: "https://github.com/UCSBarchlab/PyRTL/tree/1.0.3"
---

### Implementation and selection

PyRTL's Python design representation and Verilog emitter establish a supported Verilog workflow, independently of VHDL. Its synthesize pass lowers to generic one-bit Boolean gates and registers, and optimize applies logic passes; these establish Synthesis without implying technology mapping or physical implementation. Cycle execution, generated-Python simulation and waveform tracing establish Verification. No Layout stage is claimed. [Design representation](#source-wire-implementation) · [HDL I/O](#source-hdl-io) · [Synthesis passes](#source-synthesis) · [Simulation](#source-simulation)

Selection rests on sustained implementation and maintenance, including distinct reviewed changes. Constant concatenation now directly constructs a Const instead of adding avoidable concat nets, with updated regression expectations. The September 30 integration adds executable construction-time connections and tests for wire sources and register next-state assignment. Both remain in development. These technical changes support selection independently of commit totals or the latest CI/dependency update. [Constant optimization](#source-concat-integration) · [Retained implementation](#source-concat-implementation) · [Constructor integration](#source-activity) · [Retained tests](#source-wire-tests)

The early PR description proposes src for registers, but the integrated diff and current implementation use next for Register and src for WireVector/Output. The code and executable tests govern that claim. PyRTL is an independent toolkit, not a second activity record for optional Yosys or another Python HDL. [Proposal context](#source-constructor-pr) · [Final diff](#source-activity) · [Current constructors](#source-wire-implementation)

### Release, license and dependencies

The actual default is development, described by the project as its primary stable working branch. No GitHub Release objects were returned in this review. The published-release changelog and latest stable tag identify 1.0.3, dated August 4, at de8e3f8; the September constructor feature is later development work, not a claimed 1.0.3 capability. The reviewed development metadata requires Python >=3.11. [Branch convention](#source-overview) · [Release history](#source-changelog) · [Tagged source](#source-release-tag) · [Current metadata](#source-dependencies)

The toolkit uses BSD-3-Clause and has no declared core Python dependencies. Optional BLIF parsing requires pyparsing; Verilog import invokes separately supplied Yosys and then parses BLIF. CompiledSimulation generates C and invokes GCC, while ordinary Python simulation does not require that compiler. Optional SVG output needs Graphviz and its Python interface. Downstream synthesis, simulator and visualization tools retain their own installation and license requirements. [License](#source-license) · [Dependency declarations](#source-dependencies) · [Import path](#source-hdl-io) · [C backend](#source-compiled-simulation)

### AI classification

The reviewed design, synthesis and simulation operations are conventional executable algorithms. Teaching/research use, Python programmability and possible use by ML projects do not establish runtime AI or a stage-specific AI benchmark. Review of the captured reachable commit messages and the constructor PR did not establish a credited AI implementation; no AI-assisted development label is assigned. This is a bounded public-evidence judgment, not a claim of exclusively human development. [Implemented passes](#source-synthesis) · [Simulation](#source-simulation) · [Reviewed contribution](#source-constructor-pr)

### Activity capture

The activity record pins the actual development head and counts UTC committer dates along its complete 1,130-commit first-parent chain to the root, reconstructed from public GitHub metadata. The reviewed meaningful SHA 46b1078 occurs on that chain with UTC date September 30; the latest commit is November 4. Merge integrations count once and side branches are excluded. Dates are not independently verified push times, and November is partial. No HDL toolchain or project regression suite was executed for this review. [Canonical repository](#source-code) · [Meaningful implementation](#source-activity)
