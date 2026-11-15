---
name: "mockturtle"
aliases: []
description: "C++17 logic-network library for logic optimization and LUT mapping, with readers for structural Verilog and other netlist formats. It provides network simulation and SAT-based combinational equivalence checking; sequential simulation is available in the reviewed development source, while full RTL elaboration and physical implementation remain outside this library's scope."
scope:
  synthesis:
    ai: false
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Code is explicitly credited for the merged AIGER reader correction that materializes latch signals when flattening into a combinational network. The canonical development head retains the implementation and associated regression cases."
  sources: ["ai-contribution", "ai-integration", "aiger-reader"]
  reviewedAt: "2026-11-15"
access: "MIT project source with separately licensed bundled dependencies. Requires a C++17 toolchain; the supplied build uses CMake and bundled lorina, kitty, percy, bill, fmt and SAT support. Z3, Nauty, static ABC linkage and Python/NumPy plotting are optional configurations with separate requirements."
addedAt: "2026-11-15"
reviewedAt: "2026-11-15"
sources:
  - id: "official"
    title: "Official mockturtle documentation"
    url: "https://mockturtle.readthedocs.io/en/latest/"
    purpose: "official"
  - id: "code"
    title: "Canonical EPFL mockturtle repository"
    url: "https://github.com/lsils/mockturtle"
    purpose: "code"
  - id: "overview"
    title: "Logic-network library and synthesis role"
    url: "https://github.com/lsils/mockturtle/blob/a3f817de4005ee6ae12b4dd1ffcf4a4f910691d7/README.md"
  - id: "mapping"
    title: "Implemented cut-based LUT mapping and area/delay optimization"
    url: "https://github.com/lsils/mockturtle/blob/a3f817de4005ee6ae12b4dd1ffcf4a4f910691d7/include/mockturtle/algorithms/lut_mapping.hpp"
  - id: "equivalence"
    title: "SAT-based combinational miter equivalence checking"
    url: "https://github.com/lsils/mockturtle/blob/a3f817de4005ee6ae12b4dd1ffcf4a4f910691d7/include/mockturtle/algorithms/equivalence_checking.hpp"
  - id: "activity"
    title: "November 6 NOR/XNOR reader repair and multi-network regressions"
    url: "https://github.com/lsils/mockturtle/commit/894832fdd9cc8daf5aa551e94a32881d48e05eab"
  - id: "verilog-reader"
    title: "Retained NAND/NOR/XNOR callback implementation and fallbacks"
    url: "https://github.com/lsils/mockturtle/blob/a3f817de4005ee6ae12b4dd1ffcf4a4f910691d7/include/mockturtle/io/verilog_reader.hpp"
  - id: "reader-tests"
    title: "Executable seven-network structural and truth-table regressions"
    url: "https://github.com/lsils/mockturtle/blob/a3f817de4005ee6ae12b4dd1ffcf4a4f910691d7/test/io/verilog_reader.cpp"
  - id: "simulation-history"
    title: "September 22 sequential simulation implementation and tests"
    url: "https://github.com/lsils/mockturtle/commit/51acd70f2811f18905402774a589c2500fd6b9ed"
  - id: "simulation"
    title: "Retained register-state and per-cycle stimulus simulation"
    url: "https://github.com/lsils/mockturtle/blob/a3f817de4005ee6ae12b4dd1ffcf4a4f910691d7/include/mockturtle/algorithms/simulation_sequential.hpp"
  - id: "simulation-tests"
    title: "LFSR, shift-register, reset and trace-boundary tests"
    url: "https://github.com/lsils/mockturtle/blob/a3f817de4005ee6ae12b4dd1ffcf4a4f910691d7/test/algorithms/simulation_sequential.cpp"
  - id: "ai-contribution"
    title: "Claude-credited AIGER flattening code and executable tests"
    url: "https://github.com/lsils/mockturtle/commit/0886ebfdd101ce1110daf3d60b96d72edd3143ea"
  - id: "ai-integration"
    title: "Merged PR 705 with explicit Claude Code attribution"
    url: "https://github.com/lsils/mockturtle/pull/705"
  - id: "aiger-reader"
    title: "Retained latch materialization and combinational flattening"
    url: "https://github.com/lsils/mockturtle/blob/a3f817de4005ee6ae12b4dd1ffcf4a4f910691d7/include/mockturtle/io/aiger_reader.hpp"
  - id: "aiger-tests"
    title: "Retained combinational flattening, zero-input and latch-name regressions"
    url: "https://github.com/lsils/mockturtle/blob/a3f817de4005ee6ae12b4dd1ffcf4a4f910691d7/test/io/aiger_reader.cpp"
  - id: "release"
    title: "Latest reviewed GitHub release v0.3, July 12, 2022"
    url: "https://github.com/lsils/mockturtle/releases/tag/v0.3"
  - id: "build"
    title: "C++17 build and optional backend configurations"
    url: "https://github.com/lsils/mockturtle/blob/a3f817de4005ee6ae12b4dd1ffcf4a4f910691d7/CMakeLists.txt"
  - id: "dependencies"
    title: "Bundled libraries, SAT support and optional dependencies"
    url: "https://github.com/lsils/mockturtle/blob/a3f817de4005ee6ae12b4dd1ffcf4a4f910691d7/lib/CMakeLists.txt"
  - id: "license"
    title: "MIT project license"
    url: "https://github.com/lsils/mockturtle/blob/a3f817de4005ee6ae12b4dd1ffcf4a4f910691d7/LICENSE"
---

### Implementation and selection

mockturtle provides executable cut enumeration, LUT mapping and area/delay optimization on logic networks, establishing Synthesis. Network simulation and SAT-based combinational miter equivalence checking establish Verification. Its structural Verilog reader is a supported netlist workflow, not a complete behavioral RTL/SystemVerilog elaborator. The synthesis-oriented network representation and input adapters do not independently add Design; no Layout stage is claimed. Bundled EPFL libraries and optional ABC integration do not create additional catalog identities or activity records. [Library role](#source-overview) · [LUT mapper](#source-mapping) · [Equivalence checker](#source-equivalence) · [Verilog implementation](#source-verilog-reader)

The November 6 meaningful checkpoint adds missing NOR/XNOR callbacks: previously lorina dispatched these assignments to inherited empty callbacks, leaving outputs undefined and eventually constant zero. The integrated code uses native network constructors where available and complemented OR/XOR fallbacks otherwise, with the same treatment added for NAND. Executable tests cover seven network variants, including a test-only k-LUT without NAND, and check truth tables for ordinary and complemented operands. [Reviewed diff](#source-activity) · [Retained callbacks](#source-verilog-reader) · [Regression logic](#source-reader-tests)

Distinct September 22 work adds cycle-accurate simulation of sequential networks: it seeds registers from reset values, evaluates outputs, then latches next state. Per-cycle stimulus, undefined-reset policy and state/output trace boundaries are explicit. Tests cover LFSRs, a shift register, short stimulus, truth tables and zero-cycle execution. This substantive iteration and the later reader correctness work support selection independently of release age or raw commit totals. [Simulation integration](#source-simulation-history) · [Current simulator](#source-simulation) · [Executable tests](#source-simulation-tests)

### Development provenance

PR 705 explicitly discloses Claude Code, and its merged August 29 implementation credits Claude Opus with Anthropic's attribution address. The canonical squash commit is in the captured first-parent chain. Its executable AIGER-reader change materializes every latch output, using register outputs for sequential networks and free primary inputs for combinational ones; next-state functions become primary outputs in the flattened case. The current head retains the code and regression cases. This supports AI-assisted development for the attributed contribution without extending attribution to all mockturtle or bundled dependencies. [Disclosure and merged integration](#source-ai-integration) · [Credited diff](#source-ai-contribution) · [Retained implementation](#source-aiger-reader) · [Retained tests](#source-aiger-tests)

Flattening preserves the one-timeframe logic but removes sequential behavior; it does not prove sequential equivalence to the original circuit. Runtime mapping, simulation and SAT checking are conventional algorithms, so development provenance does not set runtime AI flags. [Flattening boundary](#source-ai-integration) · [Mapping](#source-mapping) · [SAT implementation](#source-equivalence)

### Release, license and dependencies

The actual default branch is master. The latest reviewed GitHub Release object is v0.3, published July 12, 2022; the 2026 implementation checkpoints are later development work and are not claimed as v0.3 features. A sparse release list does not erase substantive current code maintenance. [Release](#source-release) · [Reader implementation checkpoint](#source-activity) · [Sequential simulation checkpoint](#source-simulation-history)

MIT covers mockturtle source; bundled dependencies keep their own licenses. The supplied build selects C++17 and includes lorina, kitty, percy, bill, fmt, hash-map utilities and SAT support. Optional configurations enable Z3, Nauty, separately supplied static ABC or Python/NumPy plotting. Core library inspection does not establish a fully installed toolchain or a turnkey physical-design flow. [License](#source-license) · [Build options](#source-build) · [Dependency wiring](#source-dependencies)

### Activity capture

The record pins the canonical repository, numeric identity, actual master head a3f817d and capture time. UTC committer buckets are reconstructed from the complete 635-commit first-parent chain to the root. The manually reviewed meaningful SHA is 894832f on November 6; a later same-day GENLIB fix is the captured head and does not replace the reviewed checkpoint automatically. Merge integrations count once; side branches are excluded. Commit dates are not independently verified push times, and November is partial. No C++/EDA build or upstream regression suite was executed. [Repository](#source-code) · [Meaningful reader change](#source-activity)
