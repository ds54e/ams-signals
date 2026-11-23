---
name: "Magic"
aliases: []
summary: "Edits custom-IC layouts and extracts circuits and parasitics with technology rules."
description: "VLSI layout editor with design-rule checking, circuit extraction and parasitic extraction (PEX) for custom-IC workflows. Interactive editing and Tcl scripts operate on layout geometry, with technology files supplying the process-specific rules used by open PDKs."
scope:
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "The maintainer credits Claude Opus 5.5 with implementing same-name label connectivity for getnode and select net, while taking responsibility for the specified behavior. The canonical head retains the connectivity implementation."
  sources: ["review-20261115-activity", "review-20261115-retained", "review-20261115-modes"]
  reviewedAt: "2026-11-15"
access: "Public C/Tcl implementation; technology files supply process-specific layout and extraction rules."
addedAt: "2026-09-05"
reviewedAt: '2026-11-23'
sources:
  - id: "site"
    title: "Official project documentation"
    url: "https://opencircuitdesign.com/magic/"
    purpose: "official"
  - id: "code"
    title: "Canonical public source repository"
    url: "https://github.com/RTimothyEdwards/magic"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed default-branch revision"
    url: "https://github.com/RTimothyEdwards/magic/blob/4481c509dae88e96c3af51f45bc3545ec6af7f60/README.md"
  - id: "activity"
    title: "Reviewed substantive default-branch update"
    url: "https://github.com/RTimothyEdwards/magic/commit/f63e7dad5ab60a443f5710c408cbf3c4b03bbb3c"
  - id: "activity-refresh"
    title: "Include via/contact layers in LEF output, September 17, 2026"
    url: "https://github.com/RTimothyEdwards/magic/commit/ba4d9d46543dd0557b5dba13b83e99c7d70547ca"
  - id: "review-20261011-1"
    title: "Reviewed implementation integration"
    url: "https://github.com/RTimothyEdwards/magic/commit/4d249cd45c3df0fc4bd5ea17e42ccc0f3e93e266"
  - id: "development-audit-implementation"
    title: "Reviewed AI-attributed implementation"
    url: "https://github.com/RTimothyEdwards/magic/commit/718e02ec3f2e078b98263fdbf808637c29a36a7a"
  - id: "development-audit-retained"
    title: "Retained implementation at the reviewed repository head"
    url: "https://github.com/RTimothyEdwards/magic/blob/bed8d4ff84333767aa923d469d339cd05c56a00a/extract/ExtCouple.c"
  - id: "review-20261022-557"
    title: "Reported extraction defects and affected configurations"
    url: "https://github.com/RTimothyEdwards/magic/issues/557"
  - id: "review-20261022-550"
    title: "Reported extresist coupling-capacitance handling"
    url: "https://github.com/RTimothyEdwards/magic/issues/550"
  - id: "review-20261022-bench"
    title: "Version-specific IHP extraction regression context"
    url: "https://github.com/iic-jku/open-pdks-regression-tests/blob/3a97ca55bfbf482400f6b8d35f341b465303fe13/ihp-sg13g2/pex_bench/README.md"
  - id: review-20261107-implementation
    title: "Extraction timestamp, bounding-box and output-stability corrections"
    url: https://github.com/RTimothyEdwards/magic/commit/48d0ea2aa2f943cc2736650b8c6205cee2e2e076
  - id: review-20261112-activity
    title: "Internal resistor-node elimination and configurable path pruning"
    url: https://github.com/RTimothyEdwards/magic/commit/0d182b60425199266ebd13527de114d7be207e3d
  - id: review-20261112-implementation
    title: "Star-mesh resistor-network reduction"
    url: https://github.com/RTimothyEdwards/magic/blob/0d182b60425199266ebd13527de114d7be207e3d/resis/ResSimple.c
  - id: review-20261112-limits
    title: "User-facing extresist pruning controls and limits"
    url: https://github.com/RTimothyEdwards/magic/blob/0d182b60425199266ebd13527de114d7be207e3d/doc/html/extresist.html
  - id: review-20261115-activity
    title: "Maintainer-attributed same-name connectivity behavior change"
    url: https://github.com/RTimothyEdwards/magic/commit/4ec40d2c1314b7a4c675ca14453ac51b1376bda7
  - id: review-20261115-retained
    title: "Virtual-connectivity implementation retained at the reviewed head"
    url: https://github.com/RTimothyEdwards/magic/blob/b3d80234a93bbe3fea95f64ea96a338bd81e398c/database/DBconnect.c
  - id: review-20261115-modes
    title: "Retained extraction-option to connectivity-mode mapping"
    url: https://github.com/RTimothyEdwards/magic/blob/b3d80234a93bbe3fea95f64ea96a338bd81e398c/extract/ExtMain.c
  - id: review-20261115-select
    title: "Current name-connectivity modes, LEF exception and substrate limits"
    url: https://github.com/RTimothyEdwards/magic/blob/b3d80234a93bbe3fea95f64ea96a338bd81e398c/doc/html/select.html
  - id: review-20261115-getnode
    title: "Current getnode aliases and top-cell port stopping behavior"
    url: https://github.com/RTimothyEdwards/magic/blob/b3d80234a93bbe3fea95f64ea96a338bd81e398c/doc/html/getnode.html
  - id: review-20261115-resistance
    title: "Resistance extraction retains physical-only connectivity"
    url: https://github.com/RTimothyEdwards/magic/blob/b3d80234a93bbe3fea95f64ea96a338bd81e398c/resis/ResMain.c
  - id: review-20261115-split
    title: "Maintainer-attributed netmenu split-tile correctness repair"
    url: https://github.com/RTimothyEdwards/magic/commit/f790f2f1ec35f422cd9512cd2570be3f6e87020d
  - id: review-20261115-split-retained
    title: "Retained side-aware netmenu tile handling and erasure"
    url: https://github.com/RTimothyEdwards/magic/blob/b3d80234a93bbe3fea95f64ea96a338bd81e398c/netmenu/NMwiring.c
  - id: review-20261123
    title: "Overlap extraction clipping corrections"
    url: "https://github.com/RTimothyEdwards/magic/commit/1d42dfcdf6cd91df7a59198477324c2ca78ba439"
---

### Scope

Provides interactive and scripted layout editing, design-rule checks and extraction into circuit representations. These are Layout operations. Tcl support is part of the layout tool rather than a separate agent or EDA-session integration claim. [Maintainer documentation](#source-readme).

### Release boundary

The September 1 implementation lets select command options operate without a layout-window cursor, including configuration-file settings. The later September 17 LEF writer correction includes contact types in its reverse layer map so via-layer ports and obstructions can be exported. The following version-number-only commit does not establish meaningful freshness. [Select-command update](#source-activity); [LEF correction](#source-activity-refresh).

### Scope classification

Geometry editing, design-rule checking and circuit/parasitic extraction belong to the custom-layout flow. Extracting a netlist from geometry does not imply circuit-topology generation. [Reviewed source](#source-readme).

Interactive/scripted layout, DRC and extraction are conventional Layout. No reviewed model inference is involved in these operations. [AI/stage evidence](#source-readme).

### Current implementation and operating boundaries

The WebAssembly build uses a single-threaded Tcl notifier and a correctly typed idle callback for event-loop operations used by DRC and extraction commands. This is build-specific correctness within the existing layout flow. [Reviewed implementation integration](#source-review-20261011-1)

Runtime Scope classifications are preserved. Source and regression evidence was inspected; external EDA/model/conformance experiments were not rerun.

### Development provenance

The reviewed implementation adds convex/concave corner calculations and integration into the existing extractor, with an optional model scale factor. This retained extraction implementation supports AI-assisted development; it does not establish the electrical calibration of that factor. [Implementation](#source-development-audit-implementation) · [Retained code](#source-development-audit-retained)

### Review of exposed operations and limits, October 22, 2026

Extraction needs review by version, technology deck, hierarchy mode and resistance/coupling options. Issues 557 and 550 were open at the October 22 observation and report sidewall, hierarchy, resistor-network and coupling-capacitance concerns in specified configurations. Those issue reports and the regression suite are not an independent rerun on the latest head, and open status alone does not establish that every reported case is still unfixed. [Reported defects](#source-review-20261022-557); [coupling report](#source-review-20261022-550); [regression context](#source-review-20261022-bench).

This was a static source and documentation review. External EDA, numerical-accuracy and model/API experiments were not rerun. Existing activity freshness checkpoints and development-provenance labels are preserved.

### November implementation review

The November implementation series corrects extresist endpoints and capacitance, resistor coupling and tee lengths, technology-version-dependent fringehalo handling, and extraction output stability. Earlier issue discussions should not be read as an unchanged description of the current tree. The maintainer reports reproducibility improvements; those experiments were not independently repeated. Existing Layout and AI-assisted development classifications remain unchanged. [Current extraction maintenance](#source-review-20261107-implementation).


### November 12, 2026 implementation review

Version 8.3.698 adds star-mesh elimination of internal resistor nodes while retaining terminal and port nodes, and exposes extresist prune with a default threshold of 0.01 and zero to disable it. Exact network reduction and optional approximate path pruning are distinct; neither establishes arbitrary RC or frequency-response preservation. The source and operating limits were inspected, not executed, and the commit adds no regression files. Conventional Layout and existing development provenance remain unchanged. [Integrated activity](#source-review-20261112-activity). [Star-mesh resistor-network reduction](#source-review-20261112-implementation) · [User-facing extresist pruning controls and limits](#source-review-20261112-limits).

### November 15, 2026 connectivity and provenance review

The November 13 change (version 8.3.701) aligns getnode and select net with extraction's same-name label policy. Shared virtual-connectivity code first traces drawn material, then expands to otherwise disconnected labeled areas in the same cell instance and reports name-only connections. With extract do unique, ordinary cells use drawn connections; notopports permits same-name top-cell ports; extract no unique permits same-name labels within any cell. LEF abstract views retain name connections regardless of this setting. [Integrated behavior change](#source-review-20261115-activity); [retained connectivity engine](#source-review-20261115-retained); [mode mapping](#source-review-20261115-modes); [user-facing modes](#source-review-20261115-select).

This does not make every extraction operation follow virtual connections. Undrawn substrate connections are not traced, and resistance extraction explicitly uses physical-only connectivity because its network grows from a physical starting point. getnode stops at a top-cell port name unless alias reporting is enabled; alias on returns a per-node list beginning with the canonical name. These are behavior and output changes relevant to existing scripts, not a new layout stage or runtime AI. [Substrate limits](#source-review-20261115-select); [resistance extraction boundary](#source-review-20261115-resistance); [getnode output contract](#source-review-20261115-getnode).

The maintainer explicitly states that Claude Opus 5.5 did the coding while he specified the behavior and accepts responsibility for it. The current master head `b3d80234a93bbe3fea95f64ea96a338bd81e398c` retains that code. The preceding November 12 netmenu repair separately credits Claude for using the searched side of split tiles in connectivity/verification and preserving the triangle side when erasing. Both changes support the existing AI-ASSISTED label without attributing all Magic code to AI. Neither commit adds regression files; source inspection is not an independent execution or proof of extraction equivalence. The meaningful first-parent checkpoint is the November 13 connectivity change rather than the later revision housekeeping. [Maintainer attribution](#source-review-20261115-activity); [retained code](#source-review-20261115-retained); [split-tile repair](#source-review-20261115-split); [retained netmenu implementation](#source-review-20261115-split-retained).

### November 23 source review

The maintainer applied credited patches to extraction, including overlap-area handling for rectangular and split-tile geometry. The catalog makes no quantitative extraction-accuracy claim. [Reviewed implementation](#source-review-20261123).
