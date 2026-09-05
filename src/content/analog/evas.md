---
name: "EVAS"
summary: "An event-driven simulator for behavioral Verilog-A."
description: "Runs event-driven Verilog-A models with Spectre-style testbenches to produce transient waveforms, and exposes static lint diagnostics for agent-driven model development and repair."
scope:
  simulation:
    level: core
    ai: false
access: "The evas-sim Python package with its Rust core; compatible wheels or a Rust build environment."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "website"
    title: "Official EVAS documentation"
    url: "https://evas.tokenzhang.com/"
    purpose: "official"
  - id: "code"
    title: "Public project implementation"
    url: "https://github.com/Arcadia-1/EVAS"
    purpose: "code"
  - id: "package"
    title: "Independently published evas-sim package"
    url: "https://pypi.org/project/evas-sim/"
  - id: "evas-cli-py"
    title: "Simulation and lint CLI"
    url: "https://github.com/Arcadia-1/EVAS/blob/6cb6fa7a7dac70fc0d4120126d8cf74258e6637b/evas/cli.py"
  - id: "pyproject-toml"
    title: "Package identity and build"
    url: "https://github.com/Arcadia-1/EVAS/blob/6cb6fa7a7dac70fc0d4120126d8cf74258e6637b/pyproject.toml"
  - id: "readme-md"
    title: "Voltage-mode behavioral scope"
    url: "https://github.com/Arcadia-1/EVAS/blob/6cb6fa7a7dac70fc0d4120126d8cf74258e6637b/README.md"
---

### Independent tool

EVAS has its own repository, versioned `evas-sim` package, documentation and release lifecycle. The CLI accepts behavioral Verilog-A plus Spectre-style stimuli and writes transient CSVs, logs and plots. Static lint can emit machine-readable diagnostics. vaBench consumes this tool; it is not just a benchmark-internal alias. [Documentation](#source-website) · [Package](#source-package) · [CLI](#source-evas-cli-py)

### Simulation scope

The implemented engine is event-driven and voltage-mode, with a required Rust backend. It is not a KCL/MNA circuit solver or general SPICE replacement. Behavioral AC/noise helpers do not establish transistor-level small-signal/noise equivalence. Simulation is core; the tool itself does not reason, generate models or autonomously optimize circuits. [Scope](#source-readme-md) · [Build contract](#source-pyproject-toml)

### Scope classification

Running behavioral Verilog-A transient models and producing waveform data is the central user-facing operation. The internal compiler serves simulation, not circuit design. [Reviewed source](#source-readme-md).

Event-driven behavioral Verilog-A execution is conventional Simulation. Being available to an agent does not introduce AI into the simulator. [AI/stage evidence](#source-readme-md).
