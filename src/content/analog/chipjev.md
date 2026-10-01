---
name: "ChipJev"
summary: "Typed-model topology and sizing search with simulation-checked SKY130 layout generation."
description: "Searches analog topologies and transistor sizes using a typed decision model and Gaussian-process-guided search, with ngspice checking candidate circuits. For supported SKY130 circuits, a model-guided Magic layout loop runs DRC, LVS, RC extraction and post-layout simulation, retaining netlists, schematics and evaluation artifacts."
scope:
  design:
    ai: true
  simulation:
    ai: false
  layout:
    ai: true
  aiDevelopment: "assisted"
developmentEvidence:
  summary: "The September 26 layout implementation credits Claude Opus and adds the SKY130 layout compiler, placement/routing components and model-guided layout search. The reviewed contribution supports substantial AI-assisted implementation of this subsystem."
  sources: ["layout-implementation", "layout-compiler", "layout-search"]
  reviewedAt: "2026-10-01"
targets: "Analog topology/sizing search on PTM 45 nm and SKY130; physical flows are limited to supported SKY130 circuit families."
access: "Public Apache-2.0 Python source and recorded experiments; ngspice and model weights are required. GPU acceleration is optional; the physical path additionally needs Magic, Netgen and SKY130, and xschem is used for schematic export."
addedAt: "2026-10-01"
reviewedAt: "2026-10-01"
sources:
  - id: "site"
    title: "ChipJev project and live demonstration"
    url: "https://chipjev.com/"
    purpose: "official"
  - id: "code"
    title: "Canonical ChipJev repository"
    url: "https://github.com/lab-emi/ChipJev"
    purpose: "code"
  - id: "release"
    title: "TU Delft EMI Lab release announcement, September 25, 2026"
    url: "https://www.tudemi.com/news/2026-09-25-chipjev-release/"
  - id: "readme"
    title: "Reviewed capabilities, dependencies and reproduction limits"
    url: "https://github.com/lab-emi/ChipJev/blob/a7d65f171632b5f682d4aeb8b653fa7e96415cba/README.md"
  - id: "search"
    title: "Joint topology/sizing search and strict ngspice acceptance"
    url: "https://github.com/lab-emi/ChipJev/blob/a7d65f171632b5f682d4aeb8b653fa7e96415cba/src/chipjev/search/loop.py"
  - id: "layout-search"
    title: "Model-ranked layout actions and physical verification loop"
    url: "https://github.com/lab-emi/ChipJev/blob/a7d65f171632b5f682d4aeb8b653fa7e96415cba/src/chipjev/search/pro_layout.py"
  - id: "layout-compiler"
    title: "SKY130 layout compiler implementation"
    url: "https://github.com/lab-emi/ChipJev/blob/d9d623a465797cd2ea11eed3c702438ae1abd737/src/chipjev/layout/pro/compiler.py"
  - id: "layout-limits"
    title: "Layout coverage, acceptance rules and remaining limitations"
    url: "https://github.com/lab-emi/ChipJev/blob/a7d65f171632b5f682d4aeb8b653fa7e96415cba/docs/analog-layout-usage.md"
  - id: "results"
    title: "Recorded studies, protocols and evidence archives"
    url: "https://github.com/lab-emi/ChipJev/tree/a7d65f171632b5f682d4aeb8b653fa7e96415cba/experiments"
    purpose: "results"
  - id: "layout-implementation"
    title: "Attributed layout-generator and knowledge-guided search implementation"
    url: "https://github.com/lab-emi/ChipJev/commit/d9d623a465797cd2ea11eed3c702438ae1abd737"
  - id: "activity"
    title: "Simulation-backed schematic/post-layout signal comparison and tests"
    url: "https://github.com/lab-emi/ChipJev/commit/a7d65f171632b5f682d4aeb8b653fa7e96415cba"
---

### Inclusion and scope

ChipJev is a distinct design framework around the separately released ChipLaya decision model. Its public implementation and recorded experiments provide the inspection surface; the live demonstration is supplementary. The university announcement dates the public release to September 25, 2026, not the earlier experiment-protocol dates. [Release](#source-release) · [Implementation](#source-code) · [Experiments](#source-results)

The typed model supplies topology priors and a Gaussian-process-guided search proposes topology/sizing candidates. That model-driven search is AI Design. Every accepted incumbent is re-simulated with strict ngspice tolerances; the surrogate guides candidate selection rather than replacing the electrical acceptance operation, so Simulation remains unprefixed. [Search](#source-search)

Layout is a separate implemented stage: a compiler produces native Magic geometry, while a Laya-ranked action loop varies layout plans and evaluates DRC, LVS, extracted RC and post-layout behavior. This justifies AI Layout for supported circuits, without implying that every circuit family has a physical generator. The tools do not establish full-chip density/antenna closure, electromigration sign-off or fabrication readiness. [Layout loop](#source-layout-search) · [Compiler](#source-layout-compiler) · [Limits](#source-layout-limits)

### Evidence boundaries

Reported benchmark results were not reproduced for this catalog review. The repository retains protocols, measurements and reports, but full historical reruns require separately supplied frozen-source snapshots; GPU searches are not bit-identical under a fixed seed. Avoid promoting author-reported speedups or development-layout examples into independent validation. [Reproduction requirements](#source-readme) · [Recorded studies](#source-results)

The September 30 first-parent merge is meaningful activity because it adds actual schematic/extracted-netlist simulation runners, signal comparisons and tests, beyond visual presentation. [Reviewed activity](#source-activity)

### Development provenance

The September 26 commit explicitly credits Claude Opus for the layout implementation. Its reviewed diff introduces the compiler, device planning, routing and model-guided search, and those components remain in the current tree. This supports AI-ASSISTED for a substantial subsystem without attributing the whole project or upstream EDA engines to AI construction. [Attributed implementation](#source-layout-implementation) · [Compiler](#source-layout-compiler) · [Current integration](#source-layout-search)
