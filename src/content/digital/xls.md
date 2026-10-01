---
name: "Google XLS"
aliases: ["XLS"]
description: "High-level synthesis (HLS) infrastructure with DSLX and experimental C++ frontends targeting XLS IR. Optimization and scheduling drive Verilog/SystemVerilog code generation, while documented property proving and equivalence tools check hardware computations alongside interpreter and native execution."
scope:
  design:
    ai: false
  synthesis:
    ai: false
  verification:
    ai: false
access: "Public source implementation and rolling binary releases; the project documents experimental interfaces and build requirements."
addedAt: "2026-09-06"
reviewedAt: "2026-10-01"
sources:
  - id: "official"
    title: "Official XLS documentation"
    url: "https://google.github.io/xls/"
    purpose: "official"
  - id: "code"
    title: "Canonical Google XLS repository"
    url: "https://github.com/google/xls"
    purpose: "code"
  - id: "readme"
    title: "XLS architecture and scope at the reviewed revision"
    url: "https://github.com/google/xls/blob/1f1e152a856d223eaa474f01d67abd8e5ec727c7/README.md"
  - id: "cpp-frontend"
    title: "Experimental xlscc C++ frontend and supported subset"
    url: "https://github.com/google/xls/blob/1b53da61b4ada47576818851dc6a4018d81d1dcb/xls/contrib/xlscc/README.md"
  - id: "scheduling"
    title: "Pipeline scheduling, timing constraints and delay estimation"
    url: "https://github.com/google/xls/blob/1b53da61b4ada47576818851dc6a4018d81d1dcb/docs_src/scheduling.md"
  - id: "tools"
    title: "User-facing conversion, code generation, execution and proof tools"
    url: "https://github.com/google/xls/blob/1b53da61b4ada47576818851dc6a4018d81d1dcb/docs_src/tools.md"
  - id: "native-execution"
    title: "LLVM JIT and AOT execution of XLS IR"
    url: "https://github.com/google/xls/blob/1b53da61b4ada47576818851dc6a4018d81d1dcb/docs_src/ir_jit.md"
  - id: "property-proof"
    title: "DSLX property-proving command implementation"
    url: "https://github.com/google/xls/blob/1b53da61b4ada47576818851dc6a4018d81d1dcb/xls/dslx/prove_quickcheck_main.cc"
  - id: "ir-equivalence"
    title: "IR function and bounded-proc equivalence command"
    url: "https://github.com/google/xls/blob/1b53da61b4ada47576818851dc6a4018d81d1dcb/xls/dev_tools/check_ir_equivalence_main.cc"
  - id: "netlist-equivalence"
    title: "IR-to-netlist logical equivalence command"
    url: "https://github.com/google/xls/blob/1b53da61b4ada47576818851dc6a4018d81d1dcb/xls/tools/lec_main.cc"
  - id: "release"
    title: "Rolling binary release v0.0.0-10626-g1b53da61b"
    url: "https://github.com/google/xls/releases/tag/v0.0.0-10626-g1b53da61b"
  - id: "activity"
    title: "Implement __builtin_memcpy in the C++ frontend"
    url: "https://github.com/google/xls/commit/1b53da61b4ada47576818851dc6a4018d81d1dcb"
  - id: "activity-refresh"
    title: "Implement module-scoped configured values in DSLX library builds"
    url: "https://github.com/google/xls/commit/7b88d7d4e7b9afb85617d960336062cfe4462d96"
---

### Implementation context

XLS is compiler infrastructure for high-level synthesis. DSLX is its Rust-inspired hardware dataflow language, with pure functions and communicating stateful procs. The experimental `xlscc` frontend uses Clang to translate a supported subset of C++. Both feed XLS IR; neither frontend is synonymous with the IR or the complete synthesis system. [Architecture](#source-readme); [C++ frontend](#source-cpp-frontend).

IR optimization precedes scheduling operations into clock-constrained pipeline stages and generating Verilog or SystemVerilog with the required registers and interfaces. Scheduling uses delay estimates and constraints. DSLX/IR interpreters and LLVM-based JIT/AOT execution let users evaluate computations on a host processor. Documented PPA examples pass generated hardware through downstream Yosys and OpenROAD; those tools provide technology synthesis and physical implementation. [Scheduling](#source-scheduling); [tools](#source-tools); [native execution](#source-native-execution); [downstream flow](#source-readme).

Verification is exposed to users: `prove_quickcheck_main` accepts a DSLX module and proves its selected quickcheck properties; `check_ir_equivalence_main` compares supplied IR functions, with proc comparisons bounded by an explicit activation count. `lec_main` checks XLS IR against a netlist using cell-library information and, for multistage pipelines, a schedule. These are usable proof/equivalence operations on hardware computations, beyond the compiler's own regression tests; they do not establish unrestricted whole-system verification. [Property prover](#source-property-proof); [IR equivalence](#source-ir-equivalence); [netlist equivalence](#source-netlist-equivalence).

### Release boundary

Reviewed October 1, 2026 at `1f1e152a856d223eaa474f01d67abd8e5ec727c7`. The September 30 reviewed implementation propagates module-scoped configured values through DSLX library build rules, parsing and compilation, with conflict/precedence tests. Later helper removal and dependency integration are not used as the meaningful feature evidence. [Current project source](#source-readme); [meaningful activity](#source-activity-refresh).

XLS describes itself as experimental infrastructure and warns that DSLX interfaces may change. The retained September binary release is historical context, not a claim to be the latest build. [Project boundary](#source-readme); [earlier release](#source-release).

### Scope classification

Design covers hardware authoring and reusable IR transformations. Synthesis covers HLS optimization, pipeline scheduling and RTL generation. Verification is supported by the explicit property and equivalence tools above, rather than inferred from internal tests or the existence of an interpreter. Layout is omitted: the reviewed physical-design examples delegate placement and routing to OpenROAD. The reviewed workflows use conventional compilers and solvers, so all stage AI booleans are false; the reviewed evidence does not establish qualifying AI-assisted or AI-built implementation.
