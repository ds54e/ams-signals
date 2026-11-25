---
name: "PCB EM Lab"
aliases: ["KiCad Palace workflow"]
summary: "KiCad-to-Palace electromagnetic simulation and network extraction for PCB geometries."
description: "File-based workflow for PCB electromagnetic analysis using KiCad, Gmsh and Palace. Configured board geometry, ports and materials are converted into solver inputs; driven cases yield network data and circuit-simulation handoffs, with independent mesh and numerical controls."
scope:
  simulation: { ai: false }
access: "Apache-2.0 workflow source; requires compatible KiCad, Gmsh and Palace installations or the documented container environment. Solver and other dependencies retain separate licenses."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/gerhardmalberg/pcb-em-lab"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/gerhardmalberg/pcb-em-lab/commit/95f462d33c7b82cd9a4eaaacf58773803b672919"
  - id: overview
    title: "Reviewed board-to-field-solver workflow and validation boundary"
    url: "https://github.com/gerhardmalberg/pcb-em-lab/blob/aa11742b218727fb48810b759712b87a9ba46308/README.md"
  - id: network
    title: "Retained mixed-reference network assembly"
    url: "https://github.com/gerhardmalberg/pcb-em-lab/blob/aa11742b218727fb48810b759712b87a9ba46308/src/pcb_em/postprocess.py"
  - id: follow-up
    title: "November example-board and validation workflow revision"
    url: "https://github.com/gerhardmalberg/pcb-em-lab/commit/aa11742b218727fb48810b759712b87a9ba46308"
---

## Scope and limits

The workflow prepares board-specific geometry, meshes, ports and solver inputs and assembles network results. Palace supplies the electromagnetic solve; PCB EM Lab contributes PCB preparation, validation and output handoffs, rather than a separate field solver or a PCB routing tool. The supplied differential-pair case provides an executable example. Geometry, material data, ports and mesh convergence remain case-specific. Reported validation was not reproduced in this review. [Overview](#source-overview) · [Network implementation](#source-network).

## Reviewed maintenance

Following the initial October 29 publication, November 1 corrects the per-port reference-impedance array when the number of frequency samples equals the number of ports, adds regression coverage and separates mesh-estimator controls from field-solve settings. The corrected network assembly remains in the reviewed tree. November 15 updates the example board/project and its validation workflow. Public history is short; continued maintenance beyond these follow-up changes has not yet been established. [Numerical and export corrections](#source-activity) · [Example revision](#source-follow-up).
