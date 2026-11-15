---
name: "CircuitGenome"
aliases: []
summary: "Enumerates, recognizes and sizes modular op-amp circuits, then checks candidates with ngspice."
description: "Python toolkit for modular op-amp topology enumeration, structural recognition and transistor sizing using analytical and gm/Id methods. Its designer exports sized SPICE netlists and accepts candidates against ngspice-measured specifications; supported templates and technology models bound the search, and ngspice is supplied separately."
scope:
  design:
    ai: false
  simulation:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "A Claude-coauthored fix gives OpAmpBlocks field defaults so GmIdCircuitView can construct its empty block decomposition, with an executable regression test. The correction is merged through PR 230 and retained in main."
  sources: ["claude-implementation", "provenance-pr", "block-implementation"]
  reviewedAt: "2026-11-15"
access: "MIT toolkit; requires Python >=3.9, PyYAML>=6.0, OR-Tools>=9.8 and NumPy>=1.21. Electrical verification requires an external ngspice executable and compatible technology/model data. Bundled GF180/SKY130 material retains upstream notices; optional visualization requires Streamlit and PyVis."
addedAt: "2026-11-15"
reviewedAt: "2026-11-15"
sources:
  - id: "official"
    title: "CircuitGenome documentation"
    url: "https://circuitgenome.readthedocs.io/en/latest/index.html"
    purpose: "official"
  - id: "code"
    title: "Canonical CircuitGenome repository"
    url: "https://github.com/analog-ml/CircuitGenome"
    purpose: "code"
  - id: "overview"
    title: "Implemented op-amp workflows and research references"
    url: "https://github.com/analog-ml/CircuitGenome/blob/8571bf9689a837a9519e89a3c2ded821af5bc667/README.md"
  - id: "synthesizer"
    title: "Executable module enumeration and compatibility checks"
    url: "https://github.com/analog-ml/CircuitGenome/blob/8571bf9689a837a9519e89a3c2ded821af5bc667/circuitgenome/synthesizer/synthesizer.py"
  - id: "recognizer"
    title: "Pattern-based structural recognition implementation"
    url: "https://github.com/analog-ml/CircuitGenome/blob/8571bf9689a837a9519e89a3c2ded821af5bc667/circuitgenome/recognizer/subcircuit_recognizer.py"
  - id: "designer"
    title: "Enumeration, sizing, measured-specification acceptance and netlist export"
    url: "https://github.com/analog-ml/CircuitGenome/blob/8571bf9689a837a9519e89a3c2ded821af5bc667/circuitgenome/designer/designer.py"
  - id: "simulator"
    title: "External ngspice execution and model/deck setup"
    url: "https://github.com/analog-ml/CircuitGenome/blob/8571bf9689a837a9519e89a3c2ded821af5bc667/circuitgenome/sizer/verify/deck.py"
  - id: "activity"
    title: "October 31 nodal-CMRR sizing correction and regression integration"
    url: "https://github.com/analog-ml/CircuitGenome/commit/cb8ccdd341802a933a9c9c17d9f2d6dc18b79122"
  - id: "cmrr-implementation"
    title: "Retained bounded CMRR re-sizing and acceptance constraints"
    url: "https://github.com/analog-ml/CircuitGenome/blob/8571bf9689a837a9519e89a3c2ded821af5bc667/circuitgenome/sizer/physics/preprocess.py"
  - id: "slew-integration"
    title: "October 31 fast-edge measurement and oscillation-rejection repair with tests"
    url: "https://github.com/analog-ml/CircuitGenome/commit/3bc1953ed7adf2f2ca1bf2b78e108332e2eeb0fb"
  - id: "claude-implementation"
    title: "Claude-credited executable OpAmpBlocks default-construction repair"
    url: "https://github.com/analog-ml/CircuitGenome/commit/c47bb8af5421d13518da29b8d73b733d9955059d"
  - id: "provenance-pr"
    title: "Merged PR 230, including the default-construction fix"
    url: "https://github.com/analog-ml/CircuitGenome/pull/230"
  - id: "block-implementation"
    title: "Retained OpAmpBlocks defaults and GmIdCircuitView"
    url: "https://github.com/analog-ml/CircuitGenome/blob/8571bf9689a837a9519e89a3c2ded821af5bc667/circuitgenome/sizer/gmid/analyze.py"
  - id: "block-test"
    title: "Retained empty-decomposition regression test"
    url: "https://github.com/analog-ml/CircuitGenome/blob/8571bf9689a837a9519e89a3c2ded821af5bc667/tests/test_gmid_blocks.py"
  - id: "dependencies"
    title: "Python package, runtime dependencies and optional visualization"
    url: "https://github.com/analog-ml/CircuitGenome/blob/8571bf9689a837a9519e89a3c2ded821af5bc667/pyproject.toml"
  - id: "license"
    title: "CircuitGenome MIT license"
    url: "https://github.com/analog-ml/CircuitGenome/blob/8571bf9689a837a9519e89a3c2ded821af5bc667/LICENSE"
  - id: "gf180-notice"
    title: "Vendored GF180 global-parameter file with Apache-2.0 notice"
    url: "https://github.com/analog-ml/CircuitGenome/blob/8571bf9689a837a9519e89a3c2ded821af5bc667/circuitgenome/sizer/pdk/gf180/ngspice/design.ngspice"
  - id: "sky130-notice"
    title: "Trimmed SKY130 model scope and Apache-2.0 upstream attribution"
    url: "https://github.com/analog-ml/CircuitGenome/blob/8571bf9689a837a9519e89a3c2ded821af5bc667/circuitgenome/sizer/pdk/sky130/README.rst"
  - id: "release"
    title: "CircuitGenome v0.3.0, August 24, 2026"
    url: "https://github.com/analog-ml/CircuitGenome/releases/tag/v0.3.0"
---

### Implementation and selection

The public code assembles compatible module variants into op-amp netlists, recognizes structures through explicit patterns, sizes devices and runs an end-to-end measured-specification acceptance loop. This is executable implementation rather than the papers listed as references. Design covers topology, recognition and sizing; Simulation covers external ngspice benches and measurement. The project is independently implemented in its own canonical repository, not an activity alias for the cited papers or another catalog tool. [Enumerator](#source-synthesizer) · [Recognizer](#source-recognizer) · [Designer](#source-designer) · [Reference context](#source-overview)

Selection rests on continued technical iteration, including two distinct October 31 integrations. The CMRR repair sizes against the same nodal CMRR reported by the circuit model, with bounded re-sizing and tests guarding other specifications. The separate slew-rate repair remeasures fast edges at finer resolution and rejects sustained oscillation, with regression coverage. The selected CMRR integration, not the later documentation-only head, is the meaningful checkpoint. [CMRR integration and tests](#source-activity) · [Retained algorithm](#source-cmrr-implementation) · [Slew-measurement integration](#source-slew-integration)

### Classification and operating limits

Pattern matching, module enumeration, CP-SAT constraints, analytical equations and gm/Id lookup tables establish conventional Design. The analog-ml owner name, dataset-generation use and data-driven research references do not establish runtime AI; neither does using ngspice to grade a candidate. No implemented AI benchmark task or Layout workflow is claimed. [Implemented operations](#source-overview) · [Pattern logic](#source-recognizer) · [Acceptance loop](#source-designer)

Templates and supplied technology models bound the design space. The designer rejects failed sizing, infeasible bias, missed measured constraints and constrained metrics that cannot be measured; it does not treat an analytical prediction alone as electrical acceptance. Device/model limitations and failed or unavailable simulator results remain relevant. The reported electrical results and regression suites were inspected as source evidence, not independently rerun. [Acceptance rules](#source-designer) · [Simulator invocation](#source-simulator) · [Technology scope](#source-sky130-notice)

### Release, license and dependencies

The actual default is main. The latest reviewed release is v0.3.0, published August 24; its tag resolves to 3473719, before the reviewed September/October integrations. The package declaration still says 0.3.0, which does not make those later main-branch fixes released features. [Release](#source-release) · [Current declaration](#source-dependencies) · [Later implementation](#source-activity)

The toolkit license is MIT. Runtime metadata declares Python >=3.9, PyYAML >=6.0, OR-Tools >=9.8 and NumPy >=1.21; visualization optionally adds Streamlit and PyVis. Electrical verification invokes a separately available ngspice executable. Bundled technology/model material is not all covered by the toolkit's MIT statement: the reviewed GF180 global-parameter file carries an Apache-2.0 notice, and the SKY130 note attributes the trimmed 1.8 V core models to the Apache-2.0 SkyWater PDK. These subsets are not a complete foundry implementation or fabrication qualification. [Toolkit license](#source-license) · [Dependencies](#source-dependencies) · [External engine](#source-simulator) · [GF180 notice](#source-gf180-notice) · [SKY130 scope and notice](#source-sky130-notice)

### Development provenance

Commit c47bb8a explicitly coauthors Claude and changes executable field defaults plus an executable regression, independently of the preceding code-movement refactor. PR 230 is merged through 62c9778 on main's first-parent chain. At the pinned current head, OpAmpBlocks still defaults to an empty dictionary and false differential flag, and the GmIdCircuitView construction regression remains. This supports AI-assisted development for that retained fix; it does not attribute unrelated sizing logic or upstream dependencies to AI. [Attributed diff](#source-claude-implementation) · [Integration](#source-provenance-pr) · [Retained defaults](#source-block-implementation) · [Retained test](#source-block-test)

### Activity capture

The activity record pins the actual main head and counts UTC committer dates along its complete 178-commit first-parent chain to the root, reconstructed from public GitHub metadata. The meaningful SHA cb8ccdd occurs on that chain with UTC date October 31. Merges count once, side branches are excluded, and commit dates are not independently verified push times. November is partial. [Canonical repository](#source-code) · [Meaningful integration](#source-activity)
