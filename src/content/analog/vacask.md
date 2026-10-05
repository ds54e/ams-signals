---
name: "VACASK"
aliases: ["Verilog-A Circuit Analysis Kernel"]
summary: "Loads compiled Verilog-A models for scripted analog circuit analyses."
description: "Analog circuit simulator loading compiled Verilog-A compact models through OSDI, with DC, AC, transient, noise and periodic analyses. Its Spectre-like netlists, control scripting and optional parallel evaluation support circuit exploration; SPICE/Spectre import remains experimental and model compilation requires OpenVAF-Reloaded."
scope:
  simulation:
    ai: false
access: "Public AGPL-3.0 C++ source and prebuilt packages; model compilation, numerical libraries and process-specific models are separate dependencies."
addedAt: "2026-10-05"
reviewedAt: "2026-10-05"
sources:
  - id: "site"
    title: "Official VACASK overview and distributions"
    url: "https://fides.fe.uni-lj.si/vacask/"
    purpose: "official"
  - id: "code"
    title: "Canonical Codeberg implementation"
    url: "https://codeberg.org/arpadbuermen/VACASK"
    purpose: "code"
  - id: "readme"
    title: "Reviewed analyses, model interface, build requirements and AI-use statement"
    url: "https://codeberg.org/arpadbuermen/VACASK/src/commit/7eeb9d2ec0234139b96a53ab194f772c0b902dc9/README.md"
  - id: "implementation"
    title: "Simulator entry point and analysis execution"
    url: "https://codeberg.org/arpadbuermen/VACASK/src/commit/7eeb9d2ec0234139b96a53ab194f772c0b902dc9/simulator/main.cpp"
  - id: "activity"
    title: "OSDI device bypass checks use cached node mappings"
    url: "https://codeberg.org/arpadbuermen/VACASK/commit/29d99ad2df4d8262e64ba883849c2974b3f01cce"
---

### Implementation and limits

The public C++ simulator loads OpenVAF-Reloaded device libraries through OSDI. Implemented analyses include DC, AC, transient, noise, periodic steady state, harmonic balance and their small-signal/noise variants. Control scripting, parameter changes and optional parallel device evaluation support repeated circuit analyses. The native input language is Spectre-like; experimental foreign parsers do not establish complete SPICE or Spectre compatibility. [Reviewed overview](#source-readme); [simulator implementation](#source-implementation).

Author-reported performance comparisons depend on the stated circuits, model libraries, tolerances and hardware. They were not reproduced for this review and are not generalized into a speed or signoff claim. [Reported experiments](#source-readme).

### Scope and development provenance

Simulation covers electrical equation solving and analysis. Netlist/control scripting supports that operation rather than independently establishing circuit synthesis or layout. The numerical solver has no reviewed runtime model decision path. The authors disclose GenAI use primarily for mathematical preparation, audits, debugging, testing, builds and documentation; this statement alone does not establish an attributable substantial implementation contribution under the catalog's development-badge policy. [Capabilities and development statement](#source-readme).

### Reviewed public activity

Canonical Codeberg identity, main branch and complete first-parent committer history were captured directly. The October 2 UTC implementation replaces repeated node-pointer lookups with cached index mappings in OSDI input/output bypass checks. The later demo reorganization advances the repository tip without replacing this reviewed implementation checkpoint. [Reviewed change](#source-activity).
