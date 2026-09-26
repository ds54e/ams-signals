---
name: "nextpnr"
aliases: []
description: "Vendor-neutral, timing-driven FPGA place-and-route framework. Architecture backends consume synthesized netlists and device databases to pack, place and route supported FPGA families, with timing reports, constraints and optional GUI inspection."
scope:
  layout:
    ai: false
access: "Public source implementation; each architecture requires its documented device database and build dependencies."
addedAt: "2026-09-22"
reviewedAt: "2026-09-22"
sources:
  - id: "code"
    title: "Canonical nextpnr repository"
    url: "https://github.com/YosysHQ/nextpnr"
    purpose: "code"
  - id: "readme"
    title: "Supported architectures and build workflow at the reviewed revision"
    url: "https://github.com/YosysHQ/nextpnr/blob/3edea68ef37eddbe9fc4556de7d51ba08af201a0/README.md"
  - id: "architecture"
    title: "Architecture API documentation"
    url: "https://github.com/YosysHQ/nextpnr/blob/3edea68ef37eddbe9fc4556de7d51ba08af201a0/docs/archapi.md"
  - id: "activity"
    title: "Tidy pin-constraint handling for singleton vectors"
    url: "https://github.com/YosysHQ/nextpnr/commit/3edea68ef37eddbe9fc4556de7d51ba08af201a0"
  - id: "activity-refresh"
    title: "Latest reviewed meaningful implementation update"
    url: "https://github.com/YosysHQ/nextpnr/commit/c4fbb55a66010e6564848458453c3adc94b40d0c"
---

### Implementation context

nextpnr provides timing-driven packing, placement and routing above architecture-specific device databases. Stable and experimental backends cover multiple Lattice, Gowin, NanoXplore, Cologne Chip, Intel and Xilinx families, while the generic and Himbächel interfaces let projects supply additional architectures. [Supported backends](#source-readme) · [Architecture API](#source-architecture)

### Release boundary

Yosys supplies synthesis in the documented examples; database and packing projects provide family-specific bitstream collateral. Those dependencies are not folded into nextpnr's own scope. The September 21 pin-constraint correction is the latest reviewed substantive first-parent change. [Workflow boundary](#source-readme) · [Meaningful activity](#source-activity)

### Scope classification

Packing, placement, routing, constraints and post-route timing are Layout under the Digital catalog contract. Synthesis remains attributed to upstream tools such as Yosys. The reviewed algorithms are conventional, so the stage AI flag is false.
