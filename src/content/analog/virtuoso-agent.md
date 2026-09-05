---
name: "virtuoso-agent"
summary: "Runs an LLM parameter-tuning loop for existing circuits using specification checks from Maestro/Spectre or remote HSpice."
description: "Tunes circuit parameters against specification targets in a closed loop using Virtuoso/Maestro/Spectre measurements or remote HSpice simulations."
flow: {"design":"core","simulation":"core"}
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
---
### Execution contract

A Markdown specification defines goals, tunable variables, and measurement rules. The loop stops on a specification pass or iteration limit. Maestro/Spectre uses OCEAN and PSF results; remote HSpice uses measurement outputs. The executed testbench and parameter rewrite target are distinct. [Backend contract](#source-review)

### Implementation boundary

The Virtuoso path builds on virtuoso-bridge-lite, adding specification evaluation and LLM control. An LC VCO specification template is neither a supplied circuit nor a measured design result. Public tests include mocks; integration requires an accessible EDA host. The repository does not establish unrestricted topology synthesis or verified operation across arbitrary PDKs and circuits. [Prerequisites and tests](#source-review)

### Flow scope

Parameter editing, electrical measurements and iterative specification closure form the central loop through Virtuoso/Maestro/Spectre or remote HSpice. Layout is not inferred from its bridge dependency. [Reviewed source](#source-review).
