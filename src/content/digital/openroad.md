---
name: "OpenROAD"
aliases: []
description: "Physical-design engine for floorplanning, placement, clock-tree synthesis, timing analysis, parasitic estimation and routing. Tcl and limited Python interfaces operate on a shared design database; UPF-driven power-domain implementation can insert isolation and level-shifter cells, without establishing comprehensive low-power verification."
scope:
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited for correcting the web viewer shutdown to wait for its Tcl evaluation before interpreter teardown. The canonical project retains the synchronization code."
  sources: ["development-implementation-20261018", "development-retained-20261018"]
  reviewedAt: '2026-10-18'
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-22"
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
  - id: "activity-current"
    title: "Generated macro-placement-file regression"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD/commit/13fb7ea1a03ff75562c1fa06004f12c54911f0ac"
  - id: "development-implementation-20261018"
    title: "AI-credited executable implementation"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD/commit/33da610b4d812a0e085328cd0812b67ac1964ab8"
  - id: "development-retained-20261018"
    title: "Retained executable code at the reviewed canonical head"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD/blob/3cc34a657d42b68f18fffb26235e9598e33f7899/src/web/src/web_serve.cpp"
  - id: "review-20261022-upf"
    title: "Current UPF implementation and insertion logic"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD/blob/cee41731fae55adbdf73912d05a1114ee3c5cfb4/src/upf/src/upf.cpp"
  - id: "review-20261022-upf-doc"
    title: "UPF operations and command reference"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD/blob/cee41731fae55adbdf73912d05a1114ee3c5cfb4/src/upf/README.md"
---

### Implementation context

OpenROAD supplies floorplanning, placement, clock-tree synthesis, routing, extraction and timing-driven repair over an OpenDB design database. Its Tcl interface imports LEF, DEF and netlists and writes implementation data; Python exposes a documented subset. OpenROAD-flow-scripts and agent wrappers remain separate consumers. [Project overview](#source-readme); [API boundary](#source-api).

### Release boundary

Reviewed October 1, 2026 at `eb752b2f9025769a5b8e2991ba0471d026cfa2ab`. The October 1 head concerns Bazel warning handling. The reviewed September 30 first-parent merge implements parallel global-route parasitic estimation, with corresponding interfaces and OpenMP build integration. [Current project source](#source-readme); [meaningful activity](#source-activity-refresh).

### Scope classification

Floorplanning, placement, clock trees, routing and backend timing/extraction define this physical implementation entry. Separate RTL-to-GDS flow orchestration is not attributed to the engine merely from its surrounding toolchain. [Reviewed source](#source-readme).

Placement, clock trees, routing and backend timing are conventional Layout algorithms. No AI behavior of downstream agents is attributed to the engine. [AI/stage evidence](#source-readme).

### Current activity review

Reviewed 2026-10-05. An executable macro-placement regression checks the generated placement file and its exclusion of standard-cell locations. This is substantive physical-flow test coverage rather than a new placement algorithm or AI capability. [Reviewed change](#source-activity-current).

### Development provenance

Claude is credited for correcting the web viewer shutdown to wait for its Tcl evaluation before interpreter teardown. The canonical project retains the synchronization code. This supports AI-assisted development without establishing that AI built most of the project. [AI-credited executable implementation](#source-development-implementation-20261018) · [Retained executable code at the reviewed canonical head](#source-development-retained-20261018).

### Review of exposed operations and limits, October 22, 2026

UPF code evaluates power domains and implements isolation and level-shifter strategies in the physical design database. These exposed implementation operations remain Layout; they do not add Verification or prove all power states, retention behavior or operating modes. STA, extraction and power-grid analyses remain distinct backend operations. [Implementation](#source-review-20261022-upf); [commands](#source-review-20261022-upf-doc).

This was a static source and documentation review. External EDA, numerical-accuracy and model/API experiments were not rerun. Existing activity freshness checkpoints and development-provenance labels are preserved.
