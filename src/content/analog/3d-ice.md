---
name: "3D-ICE"
aliases: ["3D Interlayer Cooling Emulator"]
summary: "Compact steady and transient thermal simulation for IC stacks and floorplans."
description: "C-based compact thermal simulator for 2D and stacked IC structures. Stack descriptions, material properties, floorplan power inputs and cooling boundary conditions determine steady-state or transient temperatures. Uniform and nonuniform thermal discretization paths support device and package temperature studies."
scope:
  simulation: { ai: false }
access: "GPL-3.0 repository license; requires the documented numerical build dependencies and physically justified stack, power and boundary-condition inputs."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/esl-epfl/3d-ice"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/esl-epfl/3d-ice/commit/a9875356a636ea0a06691a7abb2a68c0a6b35818"
  - id: website
    title: "Official thermal emulator overview"
    url: "https://www.epfl.ch/labs/esl/research/open-source-tools-datasets/3d-ice/"
    purpose: official
  - id: earlier
    title: "May floorplan temperature extrema output support"
    url: "https://github.com/esl-epfl/3d-ice/commit/8e828a7bb5713c4775a0a8ff20f557ce55763b85"
  - id: conductance
    title: "Retained thermal-grid and bottom boundary conductance implementation"
    url: "https://github.com/esl-epfl/3d-ice/blob/a9875356a636ea0a06691a7abb2a68c0a6b35818/sources/thermal_grid.c"
---

## Scope and limits

The compact thermal solver consumes physical layer descriptions and power distributions to calculate temperature fields and histories. It provides a complementary IC-stack modeling route to detailed PCB finite-element workflows. Temperature accuracy depends on the spatial discretization, material and interface properties, power inputs and cooling conditions. It does not solve circuit electrical behavior, thermal stress, ageing or foundry signoff. [Project overview](#source-website) · [Conductance implementation](#source-conductance).

## Reviewed maintenance

May 2026 extends floorplan temperature output to request minima and maxima. November corrects the nonuniform bottom heat-sink path by using cell-specific conductivity and the half-cell conduction in series with the configured ambient heat-transfer coefficient, consistently in the thermal matrix and power-grid path. The reviewed tree contains the boundary conductance helper. These are distinct technical updates after established releases. The numerical results were not independently reproduced. [Output change](#source-earlier) · [Boundary correction](#source-activity).
