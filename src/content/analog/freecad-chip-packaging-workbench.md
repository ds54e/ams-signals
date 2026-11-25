---
name: "FreeCAD Chip-Packaging Workbench"
aliases: ["DI-PASSIONATE Chip-Packaging Workbench"]
summary: "Builds chip-package assemblies from PDK-aware GDS geometry, wire bonds and conductor routing with package-specific geometric checks."
description: "FreeCAD workbench for PDK-aware GDSII import, package assemblies, stacked dies, wire bonding and conductor routing, with geometry and clearance checks. The related DI-PASSIONATE DesignStudio separately integrates EM simulation setup and circuit-model generation; those capabilities are not attributed to this workbench."
scope: {"layout":{"ai":false},"aiDevelopment":"assisted"}
developmentEvidence: {"summary":"Claude Opus 5 is co-credited for implementing GDS layer/cell-based bond-pad selection, including hierarchy traversal and handling of repeated placements. The canonical workbench retains the pad extraction implementation and regression tests.","sources":["activity","pads","pad-tests"],"reviewedAt":"2026-11-25"}
access: "GPL-3.0-or-later. Requires FreeCAD 1.1, gdstk in FreeCAD's Python and appropriate PDK geometry or package inputs."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public packaging workbench implementation"
    url: "https://github.com/Haggi84/FreeCAD-Chip-Packaging-Workbench-"
    purpose: code
  - id: activity
    title: "September 23 credited GDS pad extraction and selection implementation"
    url: "https://github.com/Haggi84/FreeCAD-Chip-Packaging-Workbench-/commit/65cb17b2403a692f99757b8fa6f11da031b61bad"
  - id: earlier
    title: "July 10 wire-bond profile and test infrastructure expansion"
    url: "https://github.com/Haggi84/FreeCAD-Chip-Packaging-Workbench-/commit/87a84ee03e3cf8067a3965873a7009c811a99428"
  - id: drc-change
    title: "August 5 package DRC implementation"
    url: "https://github.com/Haggi84/FreeCAD-Chip-Packaging-Workbench-/commit/ff591eba0fc2663feac31edb63c82506a8833e0d"
  - id: stack-change
    title: "September 17 stacked-die DRC"
    url: "https://github.com/Haggi84/FreeCAD-Chip-Packaging-Workbench-/commit/388f82a312ae3110907e320e10560e33f728cd24"
  - id: pads
    title: "Retained GDS pad extraction implementation"
    url: "https://github.com/Haggi84/FreeCAD-Chip-Packaging-Workbench-/blob/5f6c9d98be4d2deedc1bea373c51c9c354625ace/core/gds_pads.py"
  - id: pad-tests
    title: "Retained pad extraction regression tests"
    url: "https://github.com/Haggi84/FreeCAD-Chip-Packaging-Workbench-/blob/5f6c9d98be4d2deedc1bea373c51c9c354625ace/tests/test_gds_pads.py"
  - id: routing
    title: "Retained point-to-point conductor routing"
    url: "https://github.com/Haggi84/FreeCAD-Chip-Packaging-Workbench-/blob/5f6c9d98be4d2deedc1bea373c51c9c354625ace/core/trace_routing.py"
  - id: drc
    title: "Retained geometry and bond-wire checks"
    url: "https://github.com/Haggi84/FreeCAD-Chip-Packaging-Workbench-/blob/5f6c9d98be4d2deedc1bea373c51c9c354625ace/core/drc.py"
  - id: overview
    title: "Workbench overview and prerequisites"
    url: "https://github.com/Haggi84/FreeCAD-Chip-Packaging-Workbench-/blob/5f6c9d98be4d2deedc1bea373c51c9c354625ace/README.md"
  - id: related-designstudio
    title: "Related DI-PASSIONATE DesignStudio public repository"
    url: "https://github.com/Haggi84/DI-PASSIONATE_DesignStudio"
  - id: related-flow
    title: "Related DesignStudio package-to-circuit workflow and validation boundaries"
    url: "https://github.com/Haggi84/DI-PASSIONATE_DesignStudio/blob/d507231ca63fbc20cc583a3c9559ca458681c25e/docs/plan/README.md"
  - id: related-lineage
    title: "Related DesignStudio declaration of copied development assets"
    url: "https://github.com/Haggi84/DI-PASSIONATE_DesignStudio/blob/d507231ca63fbc20cc583a3c9559ca458681c25e/CLAUDE.md"
  - id: related-model
    title: "Related DesignStudio Touchstone-to-SPICE implementation"
    url: "https://github.com/Haggi84/DI-PASSIONATE_DesignStudio/blob/d507231ca63fbc20cc583a3c9559ca458681c25e/pkgstudio/core/circuit_model.py"
---

## Scope and limits

The workbench builds physical chip-package assemblies using imported GDSII and PDK stack information, housing and die placement, bond-wire geometry, conductor routing and geometric rule checks. The routed-conductor and wire checks cover the workbench's own objects and nearby copper rather than an exhaustive foundry signoff. Thermal geometry export and simulation-port definition do not establish a complete independent simulation path. This is Layout, distinct from the retained field solvers and IC parasitic extraction tools. [Overview](#source-overview) · [Routing](#source-routing) · [Geometry checks](#source-drc).

## Reviewed maintenance and provenance

July 10 extends bond-wire profiles and testing, August 5 introduces geometric DRC, and September 17 adds stacked-die checks. September 23 adds GDS pad selection from user-selected layout layers or cell instances, with corrections for hierarchical repetitions and regression cases. The retained implementation and tests substantiate the credited Claude Opus 5 contribution. The later September 23 stack-level visualization commit remains the raw activity head. The default branch's first-parent history is counted alone; other branches are not included. No FreeCAD execution or physical accuracy was independently reproduced. [July work](#source-earlier) · [August DRC](#source-drc-change) · [Stacked-die checks](#source-stack-change) · [Credited change](#source-activity) · [Retained code](#source-pads) · [Tests](#source-pad-tests).

## Related implementation

DI-PASSIONATE DesignStudio (Package Studio) is a separately published FreeCAD workbench by the same developer. Its development notes identify Package Designer and the DI-PASSIONATE EM/OTTER integration as sources of copied assets. It adds a package connectivity check, field-solver input generation, Touchstone-to-SPICE fitting and measurement-comparison workflow. The latter implementation uses scikit-rf and includes passivity and ngspice comparison checks; physical package measurement validation remains open according to its own plan. Its independent public history is currently concentrated on the November 20 initial publication. The relationship does not establish a formal migration, and DesignStudio's functionality, activity and development provenance are not attributed to the main listing. Retain it as a related source pending evidence of continued technical maintenance. [Related repository](#source-related-designstudio) · [Development lineage](#source-related-lineage) · [Workflow and validation limits](#source-related-flow) · [Circuit model](#source-related-model).
