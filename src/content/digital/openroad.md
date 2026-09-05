---
name: "OpenROAD"
aliases: []
description: "Physical-design implementation engine for floorplanning, placement, clock-tree synthesis, timing analysis and routing within RTL-to-GDS flows."
flow: {"layout":"core"}
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical OpenROAD repository"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD/blob/372189ed6554794bc47473259b5e6edfdecd6f1a/README.md"
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
---


### Implementation context

Tracked as conventional physical-design infrastructure. Deterministic automation is not itself an AI runtime. [Reviewed source](#source-readme).

### Release boundary

The OpenROAD engine is distinct from OpenROAD-flow-scripts and OpenROAD-MCP. No AI capability from those consumers is attributed to the engine. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Flow scope

Floorplanning, placement, clock trees, routing and backend timing/extraction define this physical implementation entry. Separate RTL-to-GDS flow orchestration is not attributed to the engine merely from its surrounding toolchain. [Reviewed source](#source-readme).
