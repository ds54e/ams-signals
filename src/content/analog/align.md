---
name: "ALIGN"
aliases: []
summary: "Generates placed and routed analog layouts from circuit netlists and constraints."
description: "Turns SPICE netlists and analog constraints into hierarchical, placed and routed GDSII layouts, with circuit annotation and parameterized primitive generation."
flow: {"design":"supporting","layout":"core"}
access: "Public Python/C++ flow, examples and PDK abstractions; each target technology requires compatible primitive and rule definitions."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "site"
    title: "Official project documentation"
    url: "https://align-analoglayout.github.io/ALIGN-public/"
    purpose: "official"
  - id: "code"
    title: "Canonical public source repository"
    url: "https://github.com/ALIGN-analoglayout/ALIGN-public"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed default-branch revision"
    url: "https://github.com/ALIGN-analoglayout/ALIGN-public/blob/e392ae4789eb49193a4865244d8cc31dbe1744b7/README.md"
  - id: "activity"
    title: "Reviewed substantive default-branch update"
    url: "https://github.com/ALIGN-analoglayout/ALIGN-public/commit/e392ae4789eb49193a4865244d8cc31dbe1744b7"
  - id: "implementation"
    title: "Layout flow entry point at the reviewed revision"
    url: "https://github.com/ALIGN-analoglayout/ALIGN-public/blob/e392ae4789eb49193a4865244d8cc31dbe1744b7/align/main.py"
---

### Scope

Recognizes circuit hierarchy, generates primitive layout cells and assembles constrained placement/routing. Layout is the core output, with supporting Design for hierarchy annotation; this is not unrestricted circuit-topology synthesis. [Flow](#source-readme) and [entry point](#source-implementation).

### Release boundary

The July 5 merge replaces legacy OTA benches with parameterized DUT wrappers and AC, CMRR, ICMR, OCMR, operating-point, PSRR and slew testbenches. This is substantive benchmark infrastructure maintenance, not evidence of newly reproduced electrical results. [Reviewed change](#source-activity).

### Flow scope

Circuit annotation reorganizes the supplied netlist into a hierarchy that enables the central primitive-generation, placement and routing flow; it does not select a new electrical topology. [Reviewed source](#source-readme).
