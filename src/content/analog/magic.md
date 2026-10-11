---
name: "Magic"
aliases: []
summary: "Edits custom-IC layouts and extracts circuits and parasitics with technology rules."
description: "VLSI layout editor with design-rule checking, circuit extraction and parasitic extraction (PEX) for custom-IC workflows. Interactive editing and Tcl scripts operate on layout geometry, with technology files supplying the process-specific rules used by open PDKs."
scope:
  layout:
    ai: false
access: "Public C/Tcl implementation; technology files supply process-specific layout and extraction rules."
addedAt: "2026-09-05"
reviewedAt: "2026-10-11"
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

The review preserves existing Scope and development-provenance classifications. Source and regression evidence was inspected; external EDA/model/conformance experiments were not rerun.
