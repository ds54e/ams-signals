---
name: "OpenROAD"
aliases: []
roles: ["eda-tool"]
primary: "flow-physical"
ai: "traditional"
description: "Physical-design implementation engine for floorplanning, placement, clock-tree synthesis, timing analysis and routing within RTL-to-GDS flows."
keywords: ["RTL-to-GDS", "P&R", "timing", "routing"]
areas:
  flow-physical: core
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

### Scope

Physical implementation is the central scope. Flow controllers and synthesis tools are separate consumers or dependencies. [Project documentation](#source-readme).

### Classification

Tracked as conventional physical-design infrastructure. Deterministic automation is not itself an AI runtime. [Reviewed source](#source-readme).

### Release boundary

The OpenROAD engine is distinct from OpenROAD-flow-scripts and OpenROAD-MCP. No AI capability from those consumers is attributed to the engine. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
