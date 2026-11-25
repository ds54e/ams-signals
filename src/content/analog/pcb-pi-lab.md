---
name: "PCB Power Integrity Lab"
aliases: ["PCB PI Lab","KiCad Elmer PDN"]
summary: "Combines PCB resistance extraction, steady electrothermal coupling and ngspice rail impedance and load-transient evaluation."
description: "KiCad-based power integrity workflow using Gmsh, Elmer and ngspice. It extracts a terminal resistance network, iterates copper heating and temperature-dependent resistance, then evaluates driving-point and transfer impedance and load transients; inductance, capacitance and mounting parasitics remain explicit circuit inputs."
scope: {"simulation":{"ai":false}}
access: "Apache-2.0. Requires compatible KiCad, Gmsh, Elmer and ngspice environments; optional CUDA/AMGX accelerates electrical and thermal linear solves, not circuit simulation."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/gerhardmalberg/pcb-pi-lab"
    purpose: code
  - id: activity
    title: "November 15 CUDA field solves and numerical validation update"
    url: "https://github.com/gerhardmalberg/pcb-pi-lab/commit/8b57a4f70e175a6f37477bf7a177d2b9454e33b4"
  - id: initial
    title: "November 7 standalone power integrity implementation"
    url: "https://github.com/gerhardmalberg/pcb-pi-lab/commit/fc326ba238b8f6039c96b041442a9a7edf094804"
  - id: pipeline
    title: "Retained electrothermal iteration and workflow"
    url: "https://github.com/gerhardmalberg/pcb-pi-lab/blob/8b57a4f70e175a6f37477bf7a177d2b9454e33b4/src/pcb_pi/pipeline.py"
  - id: fem
    title: "Electrical and thermal field solve and energy audits"
    url: "https://github.com/gerhardmalberg/pcb-pi-lab/blob/8b57a4f70e175a6f37477bf7a177d2b9454e33b4/src/pcb_pi/fem.py"
  - id: circuit
    title: "Circuit evaluation and network handoff"
    url: "https://github.com/gerhardmalberg/pcb-pi-lab/blob/8b57a4f70e175a6f37477bf7a177d2b9454e33b4/src/pcb_pi/circuit.py"
  - id: comparison
    title: "CPU and CUDA comparison workflow"
    url: "https://github.com/gerhardmalberg/pcb-pi-lab/blob/8b57a4f70e175a6f37477bf7a177d2b9454e33b4/scripts/compare-backends.py"
  - id: overview
    title: "Model boundaries and setup"
    url: "https://github.com/gerhardmalberg/pcb-pi-lab/blob/8b57a4f70e175a6f37477bf7a177d2b9454e33b4/README.md"
---

## Scope and limits

The workflow extracts board geometry and terminal conductances, reconstructs currents and Joule heating, iterates temperature-dependent copper resistance, and uses the converged resistance network for AC and transient circuit evaluation. It is distinct from the companion PCB EM Lab and PCB Thermal Lab: the former extracts electrical field networks and the latter focuses on heat conduction, while this workflow couples resistive heating with power rail analysis. KiPI offers a separate power integrity implementation and coupled switching-noise path. [Pipeline](#source-pipeline) · [Field solves](#source-fem) · [Circuit evaluation](#source-circuit).

Inductance, capacitance, ESR, ESL and mounting effects are explicit inputs rather than broadband field-extracted quantities. This does not model skin effect, regulator loop stability or IC junction temperature. CUDA accelerates electrical and thermal linear solves, not the complete pipeline or ngspice. [Overview](#source-overview) · [Backend comparison](#source-comparison).

## Reviewed maintenance

Following the November 7 standalone implementation, November 15 adds CUDA field solve support and numerical comparison tooling with runtime regression cases. The short public history establishes follow-up work but not long-term maintenance. No numerical results or hardware correlation were independently reproduced. No qualifying AI-development attribution was established from the reviewed changes. [Initial implementation](#source-initial) · [Follow-up](#source-activity).
