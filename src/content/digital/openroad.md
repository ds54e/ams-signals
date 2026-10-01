---
name: "OpenROAD"
aliases: []
description: "Physical-design engine for floorplanning, placement, clock-tree synthesis, timing analysis, parasitic estimation and routing. Tcl and limited Python interfaces operate on a shared design database, providing the backend algorithms and implementation outputs used by surrounding ASIC RTL-to-GDS flows."
scope:
  layout:
    ai: false
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Canonical OpenROAD repository"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD/blob/eb752b2f9025769a5b8e2991ba0471d026cfa2ab/README.md"
  - id: "implementation"
    title: "Reviewed implementation: src/grt/src/GlobalRouter.cpp"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD/blob/372189ed6554794bc47473259b5e6edfdecd6f1a/src/grt/src/GlobalRouter.cpp"
  - id: "activity"
    title: "Merge pull request #11330 from eder-matheus/grt_cugr_debug"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD/commit/372189ed6554794bc47473259b5e6edfdecd6f1a"
  - id: "website"
    title: "Official project documentation"
    url: "https://theopenroadproject.org/"
    purpose: "official"
  - id: "activity-refresh"
    title: "Parallelize global-route parasitic estimation"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD/commit/c4d317e4fa2398b9880920a1411c20258a2175a9"
  - id: "api"
    title: "OpenROAD Tcl/Python design-data interfaces"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD/blob/eb752b2f9025769a5b8e2991ba0471d026cfa2ab/src/README.md"
---


### Implementation context

OpenROAD supplies floorplanning, placement, clock-tree synthesis, routing, extraction and timing-driven repair over an OpenDB design database. Its Tcl interface imports LEF, DEF and netlists and writes implementation data; Python exposes a documented subset. OpenROAD-flow-scripts and agent wrappers remain separate consumers. [Project overview](#source-readme); [API boundary](#source-api).

### Release boundary

Reviewed October 1, 2026 at `eb752b2f9025769a5b8e2991ba0471d026cfa2ab`. The October 1 head concerns Bazel warning handling. The reviewed September 30 first-parent merge implements parallel global-route parasitic estimation, with corresponding interfaces and OpenMP build integration. [Current project source](#source-readme); [meaningful activity](#source-activity-refresh).

### Scope classification

Floorplanning, placement, clock trees, routing and backend timing/extraction define this physical implementation entry. Separate RTL-to-GDS flow orchestration is not attributed to the engine merely from its surrounding toolchain. [Reviewed source](#source-readme).

Placement, clock trees, routing and backend timing are conventional Layout algorithms. No AI behavior of downstream agents is attributed to the engine. [AI/stage evidence](#source-readme).
