---
name: "virtuoso-agent"
summary: "Runs an LLM parameter-tuning loop for existing circuits using specification checks from Maestro/Spectre or remote HSpice."
description: "Uses an LLM to tune existing circuit parameters from Virtuoso/Maestro/Spectre measurements or remote HSpice results. A Markdown specification defines targets, variables and measurement rules, and the loop stops on a specification pass or an iteration limit."
scope:
  design:
    ai: true
  simulation:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude-credited development added the HSpice backend, including remote execution, measurement parsing, netlist rewriting and CLI integration. The backend extends the existing Maestro/Spectre workflow."
  sources: ["development-1", "development-2", "development-3"]
  reviewedAt: "2026-09-07"
targets: "Existing analog/AMS circuits; public specification examples use LC VCOs"
access: "Agent, spec evaluator, execution wrappers, and configuration examples are public. Users supply EDA licenses, PDK, DUT, testbench, specification, host access, and model."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
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
---
### Execution contract

A Markdown specification defines goals, tunable variables, and measurement rules. The loop stops on a specification pass or iteration limit. Maestro/Spectre uses OCEAN and PSF results; remote HSpice uses measurement outputs. The executed testbench and parameter rewrite target are distinct. [Backend contract](#source-review)

### Implementation boundary

The Virtuoso path builds on virtuoso-bridge-lite, adding specification evaluation and LLM control. An LC VCO specification template is neither a supplied circuit nor a measured design result. Public tests include mocks; integration requires an accessible EDA host. The repository does not establish unrestricted topology synthesis or verified operation across arbitrary PDKs and circuits. [Prerequisites and tests](#source-review)

### Scope classification

Parameter editing, electrical measurements and iterative specification closure form the central loop through Virtuoso/Maestro/Spectre or remote HSpice. Layout is not inferred from its bridge dependency. [Reviewed source](#source-review).

The LLM proposes tunable circuit parameters and iterates toward specification targets, giving AI Design. The reviewed backends run numerical simulation and compute measurements/pass-fail conventionally; feedback to the sizing policy does not relabel the solver as AI. [AI/stage evidence](#source-review).

### Development provenance review

Reviewed 2026-09-07: **AI-ASSISTED**. The credited T1–T8 implementation and main-branch merge add a complete alternate backend, including SSH worker, measure parser/resolver, scrubbing and netlist rewriting. Current CLI wiring retains it alongside the existing Spectre flow. [HSpice backend implementation](#source-development-1); [Backend integration into main](#source-development-2); [Current backend selection](#source-development-3).
