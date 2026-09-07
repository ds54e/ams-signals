---
name: "SiliconCompiler"
aliases: []
description: "Modular hardware build system that defines EDA flowgraphs, manages inputs and results, and records provenance in compilation manifests. It orchestrates simulation and formal checking alongside synthesis and ASIC/FPGA APR, integrating tools such as Verilator, Yosys, OpenROAD and KLayout through a common tool interface."
scope:
  synthesis:
    ai: false
  verification:
    ai: false
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude-credited flow work implemented an optional post-global-route timing-repair task and connected it to SiliconCompiler’s routing flow. The campaign also aligned the OpenROAD adapter and repair sequence."
  sources: ["development-1", "development-2", "development-3"]
  reviewedAt: "2026-09-07"
access: "Public source Python build framework and releases; selected EDA tools, licenses, device data and PDKs are separate requirements."
addedAt: "2026-09-06"
reviewedAt: "2026-09-06"
sources:
  - id: "official"
    title: "Official SiliconCompiler documentation"
    url: "https://docs.siliconcompiler.com/"
    purpose: "official"
  - id: "code"
    title: "Canonical SiliconCompiler repository"
    url: "https://github.com/siliconcompiler/siliconcompiler"
    purpose: "code"
  - id: "readme"
    title: "Reviewed build-system overview and supported tool matrix"
    url: "https://github.com/siliconcompiler/siliconcompiler/blob/d499d5bca16bd54d1390312a7c4de6c47ea646d2/README.md"
  - id: "data-model"
    title: "Schema, filesets and per-node compilation manifests"
    url: "https://github.com/siliconcompiler/siliconcompiler/blob/d499d5bca16bd54d1390312a7c4de6c47ea646d2/docs/user_guide/data_model.rst"
  - id: "execution"
    title: "Flowgraph dependencies and execution model"
    url: "https://github.com/siliconcompiler/siliconcompiler/blob/d499d5bca16bd54d1390312a7c4de6c47ea646d2/docs/user_guide/execution_model.rst"
  - id: "verification"
    title: "User-facing simulation, cocotb and formal property-check tutorial"
    url: "https://github.com/siliconcompiler/siliconcompiler/blob/d499d5bca16bd54d1390312a7c4de6c47ea646d2/docs/user_guide/tutorials/simulate.rst"
  - id: "formal"
    title: "PropertyCheckFlow and logical/sequential equivalence flow implementation"
    url: "https://github.com/siliconcompiler/siliconcompiler/blob/d499d5bca16bd54d1390312a7c4de6c47ea646d2/siliconcompiler/flows/formalflow.py"
  - id: "asic"
    title: "ASIC synthesis and configurable physical implementation flow"
    url: "https://github.com/siliconcompiler/siliconcompiler/blob/d499d5bca16bd54d1390312a7c4de6c47ea646d2/siliconcompiler/flows/asicflow.py"
  - id: "fpga"
    title: "Vivado, nextpnr and VPR FPGA implementation flows"
    url: "https://github.com/siliconcompiler/siliconcompiler/blob/d499d5bca16bd54d1390312a7c4de6c47ea646d2/siliconcompiler/flows/fpgaflow.py"
  - id: "signoff"
    title: "Separate layout DRC and LVS signoff flow"
    url: "https://github.com/siliconcompiler/siliconcompiler/blob/d499d5bca16bd54d1390312a7c4de6c47ea646d2/siliconcompiler/flows/signoffflow.py"
  - id: "changelog"
    title: "2026 release history, property checks, LEC and physical-flow additions"
    url: "https://github.com/siliconcompiler/siliconcompiler/blob/d499d5bca16bd54d1390312a7c4de6c47ea646d2/Changes"
  - id: "release"
    title: "SiliconCompiler 0.38.7 release"
    url: "https://github.com/siliconcompiler/siliconcompiler/releases/tag/v0.38.7"
  - id: "dft"
    title: "Update OpenROAD scan-chain operations, configuration and reports"
    url: "https://github.com/siliconcompiler/siliconcompiler/commit/999053c54b6b4dbe7eddc7adec669955af307a6b"
  - id: "activity"
    title: "Resolve EDA tool prerequisites and container dependencies from per-tool data"
    url: "https://github.com/siliconcompiler/siliconcompiler/commit/d499d5bca16bd54d1390312a7c4de6c47ea646d2"
  - id: "development-1"
    title: "Post-route timing implementation"
    url: "https://github.com/siliconcompiler/siliconcompiler/commit/9afa0294e772a7cde96aaf66a37c32aaef4a715c"
  - id: "development-2"
    title: "Flow integration follow-up"
    url: "https://github.com/siliconcompiler/siliconcompiler/commit/ae54e90abe9b505b813d9fb879a8d4a4a0c968bf"
  - id: "development-3"
    title: "Current routing flow"
    url: "https://github.com/siliconcompiler/siliconcompiler/blob/54d02425c2935dde1a9e7f3048d45dc1bc506059/siliconcompiler/flows/asicflow.py"
---

### Implementation context

SiliconCompiler is a Python hardware build and orchestration layer above EDA tools. Flowgraph nodes describe tool tasks and dependencies; a shared schema carries sources, settings, target technology, metrics and results, with manifests recording each node's configuration. Tool adapters manage execution and outputs. The current API uses `Design` filesets and target-specific project classes; the old monolithic `Chip` API was replaced in 0.35.0. [Build-system overview](#source-readme); [data model](#source-data-model); [execution model](#source-execution); [API transition](#source-changelog).

Simulation flows expose RTL/testbench execution through tools including Verilator and Icarus, with cocotb integration and waveform results. `PropertyCheckFlow` runs SymbiYosys bounded checking, induction-based proving and cover tasks as selectable parallel nodes. `LECFlow` supplies separate combinational, sequential and Yosys induction-based equivalence options; input views and backend requirements differ. [User tutorial](#source-verification); [formal-flow implementation](#source-formal).

ASIC flows coordinate synthesis, floorplanning, placement, clock-tree synthesis, routing, extraction and output generation using tool adapters such as Yosys, OpenROAD and KLayout. FPGA flows integrate synthesis and implementation through Vivado, nextpnr or VPR-based paths. The separate `SignoffFlow` combines Magic DRC with extraction and Netgen LVS; ordinary route violation metrics are not equivalent to completing that signoff flow. The supported matrix also lists commercial EDA integrations whose tools and licenses must be supplied separately. [ASIC flow](#source-asic); [FPGA flows](#source-fpga); [physical checking](#source-signoff); [supported matrix](#source-readme).

### Release boundary

Reviewed on September 6, 2026 at `d499d5bca16bd54d1390312a7c4de6c47ea646d2`, after **0.38.7** was published September 3. **0.38.1** added property checking on July 9; **0.38.4** added a separate physical implementation flow in August; **0.38.6** added `LECFlow` on September 2. These are current, released interfaces. [Release history](#source-changelog); [latest release](#source-release).

The latest and meaningful first-parent commit is September 6 UTC: per-tool prerequisite and container dependency handling replaces hard-coded lists, with implementation and tests. This is substantive maintenance of EDA tool provisioning, separate from automated version bumps. September 4 also updated OpenROAD scan-chain operations, configurable limits and reports, with execution tests. [Meaningful activity](#source-activity); [DFT integration](#source-dft).

### Scope classification

Synthesis records first-class synthesis flows and artifacts. Verification records simulation, property checking and equivalence operations exposed to users. Layout records configured ASIC/FPGA implementation and physical-check flows. These stages describe orchestration; SiliconCompiler does not implement the underlying synthesis or place-and-route algorithms. Design is omitted: the `Design` object and language frontends ingest and organize hardware sources rather than supplying a separate hardware-authoring capability.

All runtime stage AI booleans are false. Accepting a machine-learning model as a hardware compilation input does not make the build system's decisions AI-driven. The reviewed sources do not establish meaningful AI-built development provenance.

### Development provenance review

Reviewed 2026-09-07: **AI-ASSISTED**. The credited campaign introduces an optional post-route repair task and flow node, Tcl repair sequencing and tested adapter behavior. This is a meaningful new timing-closure path inside the existing build system, retained in the current routing flow. [Post-route timing implementation](#source-development-1); [Flow integration follow-up](#source-development-2); [Current routing flow](#source-development-3).
