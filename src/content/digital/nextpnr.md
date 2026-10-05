---
name: "nextpnr"
aliases: []
description: "Vendor-neutral, timing-driven FPGA place-and-route framework. Architecture backends consume synthesized netlists and device databases to pack, place and route supported FPGA families, with timing reports, constraints and optional GUI inspection."
scope:
  layout:
    ai: false
access: "Public source implementation; each architecture requires its documented device database and build dependencies."
addedAt: "2026-09-22"
reviewedAt: "2026-10-05"
sources:
  - id: "code"
    title: "Canonical nextpnr repository"
    url: "https://github.com/YosysHQ/nextpnr"
    purpose: "code"
  - id: "readme"
    title: "Supported architectures and build workflow at the reviewed revision"
    url: "https://github.com/YosysHQ/nextpnr/blob/eb4f15c35f4bfcc953604513100c503f7df0a01d/README.md"
  - id: "architecture"
    title: "Architecture API documentation"
    url: "https://github.com/YosysHQ/nextpnr/blob/3edea68ef37eddbe9fc4556de7d51ba08af201a0/docs/archapi.md"
  - id: "activity"
    title: "Tidy pin-constraint handling for singleton vectors"
    url: "https://github.com/YosysHQ/nextpnr/commit/3edea68ef37eddbe9fc4556de7d51ba08af201a0"
  - id: "activity-refresh"
    title: "Correct GateMate PLL reference-clock parameter validation"
    url: "https://github.com/YosysHQ/nextpnr/commit/eb4f15c35f4bfcc953604513100c503f7df0a01d"
  - id: "activity-current"
    title: "Respect unavailable wires during sink-path reservation"
    url: "https://github.com/YosysHQ/nextpnr/commit/6f71bc280b17805ee7687cad6dfdcdcb504d01d1"
---

### Implementation context

nextpnr provides timing-driven packing, placement and routing above architecture-specific device databases. Stable and experimental backends cover multiple Lattice, Gowin, NanoXplore, Cologne Chip, Intel and Xilinx families, while the generic and Himbächel interfaces let projects supply additional architectures. [Supported backends](#source-readme) · [Architecture API](#source-architecture)

### Release boundary

Reviewed October 1, 2026 at `eb4f15c35f4bfcc953604513100c503f7df0a01d`. The September 29 GateMate change removes an incorrect upper limit from PLL REF_CLK validation while retaining the positive-frequency check. The current README distinguishes stable from experimental architecture support. [Current project source](#source-readme); [meaningful activity](#source-activity-refresh).

### Scope classification

Packing, placement, routing, constraints and post-route timing are Layout under the Digital catalog contract. Synthesis remains attributed to upstream tools such as Yosys. The reviewed algorithms are conventional, so the stage AI flag is false.

### Current activity review

Reviewed 2026-10-05. The router stops sink-path reservation at wires marked RESERVED_UNAVAILABLE. This is physical-routing correctness within conventional Layout, not a logic-synthesis feature. [Reviewed change](#source-activity-current).
