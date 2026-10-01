---
name: "virtuoso-agent"
summary: "Runs an LLM parameter-tuning loop for existing circuits using specification checks from Maestro/Spectre or remote HSpice."
description: "Uses an LLM to tune existing circuit parameters from Virtuoso/Maestro/Spectre measurements or remote HSpice results. An optional Maestro path also applies model-authored analyses, outputs and corners; the spec-derived path computes setup and pass/fail conventionally, with stopping controlled by specification checks or an iteration limit."
scope:
  design:
    ai: true
  simulation:
    ai: true
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude-credited development added the HSpice backend, including remote execution, measurement parsing, netlist rewriting and CLI integration. The backend extends the existing Maestro/Spectre workflow."
  sources: ["development-1", "development-2", "development-3"]
  reviewedAt: "2026-09-07"
targets: "Existing analog/AMS circuits; public specification examples use LC VCOs"
access: "Agent, spec evaluator, execution wrappers, and configuration examples are public. Users supply EDA licenses, PDK, DUT, testbench, specification, host access, and model."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Public repository"
    url: "https://github.com/lixunqi12/virtuoso-agent"
    purpose: "code"
  - id: "review"
    title: "Reviewed README: backends, specification contract, and prerequisites"
    url: "https://github.com/lixunqi12/virtuoso-agent/blob/54974c33c5f5a6d380b216ea12750aff6ee8bc99/README.md"
  - id: "development-1"
    title: "HSpice backend implementation"
    url: "https://github.com/lixunqi12/virtuoso-agent/commit/b4b5aad21ff248cbadc86756a0dd9581e119d9cc"
  - id: "development-2"
    title: "Backend integration into main"
    url: "https://github.com/lixunqi12/virtuoso-agent/commit/73bc3d49af5c5f6c4d9d52833ec6d9ebcdefa3f5"
  - id: "development-3"
    title: "Current backend selection"
    url: "https://github.com/lixunqi12/virtuoso-agent/blob/54974c33c5f5a6d380b216ea12750aff6ee8bc99/scripts/run_agent.py"
  - id: "simulation-setup"
    title: "Model-authored Maestro setup and spec-derived mode boundaries"
    url: "https://github.com/lixunqi12/virtuoso-agent/blob/54974c33c5f5a6d380b216ea12750aff6ee8bc99/src/agent.py"
  - id: "simulation-setup-tests"
    title: "Maestro setup validation and dispatch tests"
    url: "https://github.com/lixunqi12/virtuoso-agent/blob/54974c33c5f5a6d380b216ea12750aff6ee8bc99/tests/test_track_c_v2_maestro_setup.py"
---
### Execution contract

A Markdown specification defines goals, tunable variables, and measurement rules. The loop stops on a specification pass or iteration limit. Maestro/Spectre uses OCEAN and PSF results; remote HSpice uses measurement outputs. The executed testbench and parameter rewrite target are distinct. [Backend contract](#source-review)

### Implementation boundary

The Virtuoso path builds on virtuoso-bridge-lite, adding specification evaluation and LLM control. An LC VCO specification template is neither a supplied circuit nor a measured design result. Public tests include mocks; integration requires an accessible EDA host. The repository does not establish unrestricted topology synthesis or verified operation across arbitrary PDKs and circuits. [Prerequisites and tests](#source-review)

### Scope classification

The LLM proposes circuit parameters, establishing AI Design. The retained optional Maestro path also accepts model-authored tests, analyses, outputs and corners and dispatches them to the backend. This material simulation-setup operation supports AI Simulation independently of sizing feedback. [Runtime dispatch](#source-simulation-setup) · [Setup tests](#source-simulation-setup-tests)

When a machine-readable evaluation block is present, the current path ignores model-authored setup blocks and derives setup and pass/fail conventionally. Numerical Spectre/HSpice execution remains conventional in both cases; the AI label does not claim a learned solver. [Mode boundary](#source-simulation-setup)

### Development provenance review

Reviewed 2026-09-07: **AI-ASSISTED**. The credited T1–T8 implementation and main-branch merge add a complete alternate backend, including SSH worker, measure parser/resolver, scrubbing and netlist rewriting. Current CLI wiring retains it alongside the existing Spectre flow. [HSpice backend implementation](#source-development-1); [Backend integration into main](#source-development-2); [Current backend selection](#source-development-3).
