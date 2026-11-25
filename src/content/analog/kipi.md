---
name: "KiPI"
aliases: ["KiCad Power Integrity"]
summary: "PCB power integrity analysis for DC voltage drop, AC rail impedance and coupled switching noise."
description: "PCB power-integrity analyzer using KiCad or supported imported board geometry. It computes DC rail and return-path voltage drops, current density and optional board heating, AC PDN impedance with capacitor and package models, and estimates switching-regulator noise coupled into selected signal nets."
scope:
  simulation: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Opus 5.5 is credited on the integrated copper-meshing correction that avoids losing an entire polygon when an invalid hole seed removes its domain. The fallback and regression cases are retained."
  sources: [activity, mesher, mesher-tests]
  reviewedAt: "2026-11-25"
access: "GPL-3.0 Python source; KiCad plugin or standalone operation requires supported geometry, stackup, regulator/load definitions and component models."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/drewsum/KiPI"
    purpose: code
  - id: activity
    title: "November 12 v1.0.1 integration: meshing, regulation and coupling fixes"
    url: "https://github.com/drewsum/KiPI/commit/9cf1fcc126c19c9331ed9e31cc9d4f80cd482c5c"
  - id: earlier
    title: "October 31 v1.0.0 integration including KiCad geometry and plugin corrections"
    url: "https://github.com/drewsum/KiPI/commit/842b4ce74178f68eceec71c13c82d67368431daf"
  - id: mesher
    title: "Retained hole-seed validation and hole-carving fallback"
    url: "https://github.com/drewsum/KiPI/blob/9cf1fcc126c19c9331ed9e31cc9d4f80cd482c5c/kipi/core/mesh/mesher.py"
  - id: mesher-tests
    title: "Retained mesh-domain and terminal-pad regression tests"
    url: "https://github.com/drewsum/KiPI/blob/9cf1fcc126c19c9331ed9e31cc9d4f80cd482c5c/tests/core/test_mesher.py"
  - id: ac
    title: "Retained AC rail impedance solver"
    url: "https://github.com/drewsum/KiPI/blob/9cf1fcc126c19c9331ed9e31cc9d4f80cd482c5c/kipi/ac/solver/sweep.py"
  - id: dc
    title: "Retained power-tree and local-ground regulation"
    url: "https://github.com/drewsum/KiPI/blob/9cf1fcc126c19c9331ed9e31cc9d4f80cd482c5c/kipi/dc/pi/tree.py"
  - id: noise
    title: "Retained switch-loop parasitic and image-plane extraction"
    url: "https://github.com/drewsum/KiPI/blob/9cf1fcc126c19c9331ed9e31cc9d4f80cd482c5c/kipi/noise/parasitics.py"
---

## Scope and limits

The board-specific power-tree, conduction, AC sweep and coupled-noise paths expose electrical evaluation, not PCB placement or routing. KiPI complements PCB EM Lab's port-based field simulation and PCB Thermal Lab's explicit heat-conduction workflow: its central operation is rail integrity with load, ground, regulator and decoupling definitions. The switching-noise path uses geometry-derived parasitic approximations; it is not a general oscillator PNOISE solver or a substitute for package parameters, measured supply spectra or an IC supply-to-phase transfer function. [AC solver](#source-ac) · [DC power tree](#source-dc) · [Coupling extraction](#source-noise).

## Reviewed maintenance and provenance

The October 31 integration includes executable KiCad geometry and plugin corrections. November 12 fixes degenerate hole seeds, carves holes when the fallback triangulation would otherwise lose them, retains local-ground regulation and changes the switching-loop image-plane selection. The canonical integrated code and mesh regression cases retain the credited Claude contribution. Public development started in October 2026; source and tests were inspected but numerical accuracy, reported performance and hardware correlation were not independently reproduced. [October integration](#source-earlier) · [November integration](#source-activity) · [Mesher](#source-mesher) · [Regressions](#source-mesher-tests).
