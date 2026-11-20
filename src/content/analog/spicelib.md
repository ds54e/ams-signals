---
name: "spicelib"
aliases: []
summary: "Edits SPICE circuits, automates simulator batches and processes electrical results from Python."
description: "Python toolkit for SPICE netlist and schematic editing, parameter sweeps, tolerance analysis and waveform/log processing. Its simulation runner schedules external LTspice, ngspice, QSPICE or Xyce processes with concurrency and timeout controls; circuit models and the selected simulator remain separate requirements."
scope:
  design:
    ai: false
  simulation:
    ai: false
access: "GPL-3.0 Python source; package metadata requires Python >=3.10,<4 plus NumPy, SciPy, psutil, matplotlib and clipin. Simulation requires a separately installed backend and suitable models; LTspice/QSPICE have separate vendor terms, and some platform paths use Wine."
addedAt: "2026-11-15"
reviewedAt: "2026-11-15"
sources:
  - id: "official"
    title: "Official project website"
    url: "https://spicelib.readthedocs.io/en/stable/"
    purpose: "official"
  - id: "code"
    title: "Canonical spicelib repository"
    url: "https://github.com/nunobrum/spicelib"
    purpose: "code"
  - id: "readme"
    title: "Reviewed tool overview, simulator integration and platform limitations"
    url: "https://github.com/nunobrum/spicelib/blob/d8f8ecceeb361741f1f660f03b03ac49697f8700/README.md"
  - id: "editor"
    title: "Implemented SPICE circuit editor"
    url: "https://github.com/nunobrum/spicelib/blob/d8f8ecceeb361741f1f660f03b03ac49697f8700/spicelib/editor/spice_editor.py"
  - id: "runner"
    title: "Simulation batch scheduling, callbacks and timeout control"
    url: "https://github.com/nunobrum/spicelib/blob/d8f8ecceeb361741f1f660f03b03ac49697f8700/spicelib/sim/sim_runner.py"
  - id: "raw-reader"
    title: "Implemented waveform and stepped-result reader"
    url: "https://github.com/nunobrum/spicelib/blob/d8f8ecceeb361741f1f660f03b03ac49697f8700/spicelib/raw/raw_read.py"
  - id: "ngspice-backend"
    title: "External ngspice executable discovery and process invocation"
    url: "https://github.com/nunobrum/spicelib/blob/d8f8ecceeb361741f1f660f03b03ac49697f8700/spicelib/simulators/ngspice_simulator.py"
  - id: "activity"
    title: "October 4 integration of include-file parsing and writing repairs"
    url: "https://github.com/nunobrum/spicelib/commit/68ae68585a05e7df09cc449b44ead73b98bba7f9"
  - id: "worst-case-fix"
    title: "September 23 fast worst-case iterator repair and regression test"
    url: "https://github.com/nunobrum/spicelib/commit/0fb662fd32d22e84314d9c60c1fb3021ce27d18a"
  - id: "worst-case-implementation"
    title: "Retained conventional fast worst-case search"
    url: "https://github.com/nunobrum/spicelib/blob/d8f8ecceeb361741f1f660f03b03ac49697f8700/spicelib/sim/tookit/fast_worst_case.py"
  - id: "release"
    title: "spicelib 1.6.4, October 4, 2026"
    url: "https://github.com/nunobrum/spicelib/releases/tag/1.6.4"
  - id: "dependencies"
    title: "GPL license declaration, Python compatibility and runtime dependencies"
    url: "https://github.com/nunobrum/spicelib/blob/d8f8ecceeb361741f1f660f03b03ac49697f8700/pyproject.toml"
  - id: "license"
    title: "GNU General Public License version 3"
    url: "https://github.com/nunobrum/spicelib/blob/d8f8ecceeb361741f1f660f03b03ac49697f8700/LICENSE"
  - id: "agent-guidance-pr"
    title: "Copilot documentation-only agent-guidance integration"
    url: "https://github.com/nunobrum/spicelib/pull/315"
  - id: "dependency-pr"
    title: "Copilot dependency declaration change in pyproject.toml"
    url: "https://github.com/nunobrum/spicelib/pull/314/files"
---

### Implementation and scope

Design covers circuit/netlist and parameter editing, including included subcircuits. Simulation covers external-engine batch control, sweeps/tolerance evaluation and waveform/log processing. The runner manages concurrent processes, callbacks and timeouts; the waveform reader exposes traces and stepped data. These are implemented circuit operations, rather than a simulator engine bundled into the Python library. [Editor](#source-editor) · [Runner](#source-runner) · [Waveform reader](#source-raw-reader)

Conventional tolerance and fast worst-case searches do not establish runtime AI. The overview's possible integration with machine-learning algorithms does not itself implement a model-driven stage. No Layout stage is established. [Overview](#source-readme) · [Worst-case algorithm](#source-worst-case-implementation)

### Selection and release boundary

Selection rests on multiple substantive integrations. The September 23 repair restarts worst-case validation with Python's iter rather than calling an iterator object; its regression exercises the public analysis API using a mock runner. The October 4 integration repairs include-file encoding, preserves unresolved include statements when writing, normalizes include path separators on Unix-like hosts and handles an empty task selection when composing RAW output. These are executable maintenance changes, distinct from the latest release-preparation commit. [Search repair and test](#source-worst-case-fix) · [Include and runner repairs](#source-activity)

The latest reviewed release is 1.6.4, published October 4, 2026, and its notes include both repair integrations. No simulator/EDA experiment was reproduced for this classification. [Release](#source-release)

### License and runtime dependencies

The project declares GPL-3.0 and includes the GPL version 3 text. Its package metadata requires Python >=3.10 and below 4, with NumPy, SciPy, psutil, matplotlib and clipin; poetry-core is the build backend, not an additional circuit simulator. No model service or LLM package is required by that metadata. [Package declaration](#source-dependencies) · [License](#source-license)

The selected SPICE executable and device models are separate. The ngspice adapter discovers and invokes an external process; LTspice, QSPICE and Wine paths have their own platform/setup requirements and licenses. Public Python code does not imply an entirely open or preconfigured simulator toolchain. [Process adapter](#source-ngspice-backend) · [Integration and platform notes](#source-readme)

### Development provenance

The reviewed Copilot contributions add agent guidance and a dependency constraint. Documentation and a static dependency declaration do not establish credited executable implementation under the catalog policy; no AI-assisted label is assigned from those changes. This bounded review does not assert exclusively human development. [Agent-guidance PR](#source-agent-guidance-pr) · [Dependency-only diff](#source-dependency-pr)

### Activity capture

The activity record pins the actual main head and counts UTC committer dates along its complete first-parent chain to the root, reconstructed from public GitHub commit metadata. The reviewed meaningful checkpoint is the October 4 include/runner integration, not the later release-preparation merge merely because it is the head. Merge integrations count once, side branches are excluded, and the partial November cell does not prove inactivity. [Canonical repository](#source-code) · [Meaningful integration](#source-activity)
