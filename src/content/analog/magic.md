---
name: "Magic"
aliases: []
roles: ["eda-tool"]
summary: "Edits custom-IC layouts and extracts circuits and parasitics with technology rules."
description: "VLSI layout editor with design-rule checking, circuit and parasitic extraction, and Tcl-driven custom-IC workflows used with open PDKs."
flow: {"layout":"core"}
access: "Public C/Tcl implementation; technology files supply process-specific layout and extraction rules."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
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
---

### Scope

Provides interactive and scripted layout editing, design-rule checks and extraction into circuit representations. Layout is core. Tcl support is part of the layout tool rather than a separate agent or EDA-session integration claim. [Maintainer documentation](#source-readme).

### Release boundary

The September 1 implementation lets select command options operate without a layout-window cursor, including configuration-file settings. The following version-number-only commit does not establish meaningful freshness. An isolated Claude-assisted August fix does not justify an AI-built classification. [Substantive update](#source-activity).

### Flow scope

Geometry editing, design-rule checking and circuit/parasitic extraction belong to the custom-layout flow. Extracting a netlist from geometry does not imply circuit-topology generation. [Reviewed source](#source-readme).
