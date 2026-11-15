---
name: "SpinalHDL"
aliases: []
description: "Scala hardware-construction library for parameterized RTL generators that emit Verilog, SystemVerilog or VHDL. Its component and bus libraries support design reuse, while Scala simulation APIs drive generated RTL through external simulators such as Verilator or Icarus Verilog; synthesis and physical implementation use downstream tools."
scope:
  design:
    ai: false
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "GitHub Copilot implemented the BusIf correction that records an explicitly requested register address and reports that address in duplicate checks. The merged change remains in the canonical dev branch."
  sources: ["copilot-implementation", "activity", "register-implementation"]
  reviewedAt: "2026-11-15"
access: "LGPL-3.0 core and MIT hardware library; requires Scala/JVM and the SpinalHDL compiler plugin. Simulation also requires a supported external HDL simulator and its native build tools; vendor backends have separate licensing."
addedAt: "2026-11-15"
reviewedAt: "2026-11-15"
sources:
  - id: "official"
    title: "Official SpinalHDL documentation"
    url: "https://spinalhdl.github.io/SpinalDoc-RTD/"
    purpose: "official"
  - id: "code"
    title: "Canonical SpinalHDL repository"
    url: "https://github.com/SpinalHDL/SpinalHDL"
    purpose: "code"
  - id: "rtl-generation"
    title: "Implemented Verilog and SystemVerilog generation at the reviewed dev head"
    url: "https://github.com/SpinalHDL/SpinalHDL/blob/de72faf6062206a89b445e5cc07e32ed982712c8/core/src/main/scala/spinal/core/Spinal.scala"
  - id: "simulation"
    title: "Scala simulation compilation and external Verilator/Icarus backends"
    url: "https://github.com/SpinalHDL/SpinalHDL/blob/de72faf6062206a89b445e5cc07e32ed982712c8/core/src/main/scala/spinal/core/sim/SimBootstraps.scala"
  - id: "simulation-tests"
    title: "Executable Scala tests for Verilator signal access"
    url: "https://github.com/SpinalHDL/SpinalHDL/blob/de72faf6062206a89b445e5cc07e32ed982712c8/tester/src/test/scala/spinal/core/SpinalSimVerilatorIoTest.scala"
  - id: "tilelink-integration"
    title: "October 19 TileLink register-interface implementation and tests"
    url: "https://github.com/SpinalHDL/SpinalHDL/commit/68f824372b21042e3fe56254c48584e91a7644be"
  - id: "activity"
    title: "October 22 integration of the explicit register-address correctness fix"
    url: "https://github.com/SpinalHDL/SpinalHDL/commit/de72faf6062206a89b445e5cc07e32ed982712c8"
  - id: "copilot-implementation"
    title: "Copilot-authored executable BusIf correction"
    url: "https://github.com/SpinalHDL/SpinalHDL/commit/569ba5d91cd5eddd0758c6fc29054a53e5ef3e54"
  - id: "copilot-integration"
    title: "Merged Copilot coding-agent pull request 1983"
    url: "https://github.com/SpinalHDL/SpinalHDL/pull/1983"
  - id: "register-implementation"
    title: "Retained explicit-address registration and duplicate checks"
    url: "https://github.com/SpinalHDL/SpinalHDL/blob/de72faf6062206a89b445e5cc07e32ed982712c8/lib/src/main/scala/spinal/lib/bus/regif/BusIf.scala"
  - id: "release"
    title: "SpinalHDL v1.15.0, September 2, 2026"
    url: "https://github.com/SpinalHDL/SpinalHDL/releases/tag/v1.15.0"
  - id: "build"
    title: "Scala compiler plugin and library dependencies"
    url: "https://github.com/SpinalHDL/SpinalHDL/blob/de72faf6062206a89b445e5cc07e32ed982712c8/build.sbt"
  - id: "license-split"
    title: "Project core/library license split"
    url: "https://github.com/SpinalHDL/SpinalHDL/blob/de72faf6062206a89b445e5cc07e32ed982712c8/LICENSE"
  - id: "license-core"
    title: "Core GNU Lesser General Public License version 3"
    url: "https://github.com/SpinalHDL/SpinalHDL/blob/de72faf6062206a89b445e5cc07e32ed982712c8/LICENSE_core"
  - id: "license-lib"
    title: "Hardware library MIT license"
    url: "https://github.com/SpinalHDL/SpinalHDL/blob/de72faf6062206a89b445e5cc07e32ed982712c8/LICENSE_lib"
---

### Implementation and selection

The reviewed generator has explicit Verilog and SystemVerilog emission paths, alongside VHDL. This is a supported Verilog workflow rather than a VHDL-only frontend with incidental export. Scala components, elaboration and reusable bus libraries establish Design; simulation compilation/control and executable Verilator tests establish Verification. Downstream synthesis and physical implementation do not add those stages to this entry. [RTL generation](#source-rtl-generation) · [Simulation APIs](#source-simulation) · [Signal-access tests](#source-simulation-tests)

Selection rests on distinct integrated implementation changes, not the latest timestamp alone. The October 19 change adds a TileLink register-interface adapter and tests, supporting single-beat Get/Put operations rather than bursts, atomics or coherency. The October 22 change repairs explicit-address registration and duplicate-address diagnostics. Both are on the canonical default branch, dev, and support continued substantive maintenance. [Adapter and tests](#source-tilelink-integration) · [Correctness integration](#source-activity)

### Release and dependencies

The latest reviewed release is v1.15.0, published September 2, 2026, supporting Scala 2.12/2.13 after dropping 2.11. The October implementation checkpoints are later dev-branch work, not claimed as v1.15.0 features. Elaboration uses Scala/JVM, the IDSL compiler plugin and declared libraries; simulation invokes separately supplied HDL backends and their toolchains. No simulator or vendor license is supplied merely by using SpinalHDL. [Release](#source-release) · [Build dependencies](#source-build) · [Backend implementation](#source-simulation)

The project explicitly separates the LGPL-3.0 core from the MIT hardware library. This is not a single MIT license for the whole repository. [License split](#source-license-split) · [Core terms](#source-license-core) · [Library terms](#source-license-lib)

### Development provenance

The implementation commit is authored by the verified GitHub Copilot coding-agent account, changes executable BusIf code, and is integrated by merged pull request 1983. At the pinned dev head, createReg calls attachAddr with the requested address; duplicate diagnostics use that same address. This supports AI-assisted development for the retained correction, without attributing all project code to AI. [Actor and diff](#source-copilot-implementation) · [Merged PR](#source-copilot-integration) · [Integration](#source-activity) · [Retained code](#source-register-implementation)

Runtime Design and Verification remain conventional. The credited development correction does not introduce model-driven RTL generation or simulation decisions.

### Activity capture

The activity record pins the actual dev head and counts UTC committer dates along its complete first-parent chain to the root, reconstructed from public GitHub commit metadata. Merge integrations count once; side-branch commits are excluded. The November cell is partial, and commit dates are not independently verified push times. The meaningful checkpoint is the reviewed October 22 correctness integration. [Canonical repository](#source-code) · [Meaningful change](#source-activity)
