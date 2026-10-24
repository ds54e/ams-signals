---
name: "OpenROAD"
aliases: []
description: "Physical-design engine for floorplanning, placement, clock-tree synthesis, timing, routing and UPF isolation/level-shifter insertion over OpenDB. An experimental floating-random-walk field solver reads routed net geometry for capacitance extraction; Manhattan and dielectric-model limits remain, and upstream regressions do not establish signoff accuracy."
scope:
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited for correcting the web viewer shutdown to wait for its Tcl evaluation before interpreter teardown. The canonical project retains the synchronization code."
  sources: ["development-implementation-20261018", "development-retained-20261018"]
  reviewedAt: '2026-10-18'
access: "Public source under BSD-3-Clause; build dependencies and process-stack inputs remain project- and technology-specific."
addedAt: "2026-09-05"
reviewedAt: "2026-10-24"
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
    title: "Routed SKY130HD GCD field-solver regression integration"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD/commit/ca012aeab485a964fb7a3dedaf6f5fb5ca89974d"
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
  - id: "review-20261024-fsv-nets"
    title: "Merged routed-net OpenDB reader and window-leakage implementation"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD/pull/11967"
  - id: "review-20261024-fsv-gcd"
    title: "Merged routed SKY130HD GCD regression cases"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD/pull/11975"
  - id: "review-20261024-fsv-readme"
    title: "Field-solver operations and limits at the integrated revision"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD/blob/ca012aeab485a964fb7a3dedaf6f5fb5ca89974d/src/fsv/README.md"
  - id: "review-20261024-license"
    title: "OpenROAD BSD 3-Clause license"
    url: "https://github.com/The-OpenROAD-Project/OpenROAD/blob/ca012aeab485a964fb7a3dedaf6f5fb5ca89974d/LICENSE"
---

### Implementation context

OpenROAD supplies floorplanning, placement, clock-tree synthesis, routing, extraction and timing-driven repair over an OpenDB design database. Its Tcl interface imports LEF, DEF and netlists and writes implementation data; Python exposes a documented subset. OpenROAD-flow-scripts and agent wrappers remain separate consumers. [Project overview](#source-readme); [API boundary](#source-api).

### Release boundary

Reviewed October 1, 2026 at `eb752b2f9025769a5b8e2991ba0471d026cfa2ab`. The October 1 head concerns Bazel warning handling. The reviewed September 30 first-parent merge implements parallel global-route parasitic estimation, with corresponding interfaces and OpenMP build integration. [Current project source](#source-readme); [meaningful activity](#source-activity-refresh).

### Scope classification

Floorplanning, placement, clock trees, routing and backend timing/extraction define this physical implementation entry. Separate RTL-to-GDS flow orchestration is not attributed to the engine merely from its surrounding toolchain. [Reviewed source](#source-readme).

Placement, clock trees, routing and backend timing are conventional Layout algorithms. No AI behavior of downstream agents is attributed to the engine. [AI/stage evidence](#source-readme).

### Routed-net field solver

The October 24 default-branch integrations add `add_field_solver_nets`: it reads target nets and nearby geometry from the routed OpenDB design, including wires, vias and pins, into a floating-random-walk electrostatic capacitance solve. A window/halo bounds neighbouring geometry; outside-window leakage is reported rather than used as an automatic acceptance rule. This is a new extraction operation, not merely documentation for a planned database reader. [Reader implementation](#source-review-20261024-fsv-nets) · [Pinned operations and limits](#source-review-20261024-fsv-readme).

The following integration adds three routed SKY130HD GCD net regressions, covering a short net, jogs/vias and a die-edge input pin, with window/leakage checks. The meaningful activity checkpoint is the first-parent merge `ca012aeab485a964fb7a3dedaf6f5fb5ca89974d` on October 24 UTC. [Regression changes](#source-review-20261024-fsv-gcd) · [Integrated checkpoint](#source-activity-current).

Design geometry is Manhattan-only. The reviewed ITF reader supports conformal dielectric shells with `THICKNESS = 0` and no `BW_T`; leakage is diagnostic, not signoff qualification. Upstream timing measurements depend on their specific routed designs, tolerances and thread count and are not generalized here. These are reviewed development commits; tagged-release inclusion and independent solver/EDA execution were not verified. Conventional Layout and the existing development-provenance label remain unchanged. [Limits](#source-review-20261024-fsv-readme) · [BSD-3-Clause](#source-review-20261024-license).

### Development provenance

Claude is credited for correcting the web viewer shutdown to wait for its Tcl evaluation before interpreter teardown. The canonical project retains the synchronization code. This supports AI-assisted development without establishing that AI built most of the project. [AI-credited executable implementation](#source-development-implementation-20261018) · [Retained executable code at the reviewed canonical head](#source-development-retained-20261018).

### Review of exposed operations and limits, October 22, 2026

UPF code evaluates power domains and implements isolation and level-shifter strategies in the physical design database. These exposed implementation operations remain Layout; they do not add Verification or prove all power states, retention behavior or operating modes. STA, extraction and power-grid analyses remain distinct backend operations. [Implementation](#source-review-20261022-upf); [commands](#source-review-20261022-upf-doc).

This was a static source and documentation review. External EDA, numerical-accuracy and model/API experiments were not rerun. Development-provenance labels are preserved.
