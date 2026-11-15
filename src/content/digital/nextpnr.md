---
name: "nextpnr"
aliases: []
description: "Vendor-neutral, timing-driven FPGA place-and-route framework. Architecture backends consume synthesized netlists and device databases to pack, place and route supported FPGA families, with timing reports, constraints and optional GUI inspection."
scope:
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited for correcting RAMB36E1 width-9 parity connections in the Xilinx packer. The canonical project retains the implemented pin connections."
  sources: ["development-implementation-20261018", "development-retained-20261018"]
  reviewedAt: '2026-10-18'
access: "Public source implementation; each architecture requires its documented device database and build dependencies."
addedAt: "2026-09-22"
reviewedAt: "2026-11-15"
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
  - id: "development-implementation-20261018"
    title: "AI-credited executable implementation"
    url: "https://github.com/YosysHQ/nextpnr/commit/44a6c7399c77a16749d60fbf9e6f60a9ebc3571e"
  - id: "development-retained-20261018"
    title: "Retained executable code at the reviewed canonical head"
    url: "https://github.com/YosysHQ/nextpnr/blob/e677d5c37378daf4e3f1a28145e5cdd086cf091f/himbaechel/uarch/xilinx/pack.cc"
  - id: "activity-20261115"
    title: "Disable fast pip delays before final Himbachel timing reports"
    url: "https://github.com/YosysHQ/nextpnr/commit/5e2718b6364e189e414c35b8eef3db4d5e3c0773"
  - id: "router1-20261115"
    title: "Router1 restores full pip delays before timing analysis"
    url: "https://github.com/YosysHQ/nextpnr/blob/5e2718b6364e189e414c35b8eef3db4d5e3c0773/common/route/router1.cc"
  - id: "router2-20261115"
    title: "Router2 restores full pip delays before timing analysis"
    url: "https://github.com/YosysHQ/nextpnr/blob/5e2718b6364e189e414c35b8eef3db4d5e3c0773/common/route/router2.cc"
  - id: "delay-20261115"
    title: "Himbachel pip delay resistance and capacitance calculation"
    url: "https://github.com/YosysHQ/nextpnr/blob/5e2718b6364e189e414c35b8eef3db4d5e3c0773/himbaechel/arch.h"
  - id: "retained-20261115"
    title: "Retained AI-credited width-9 RAM parity connections"
    url: "https://github.com/YosysHQ/nextpnr/blob/5e2718b6364e189e414c35b8eef3db4d5e3c0773/himbaechel/uarch/xilinx/pack.cc"
  - id: "release-20261115"
    title: "nextpnr 0.11.1 stable release"
    url: "https://github.com/YosysHQ/nextpnr/releases/tag/nextpnr-0.11.1"
---

### Implementation context

nextpnr provides timing-driven packing, placement and routing above architecture-specific device databases. Stable and experimental backends cover multiple Lattice, Gowin, NanoXplore, Cologne Chip, Intel and Xilinx families, while the generic and Himbächel interfaces let projects supply additional architectures. [Supported backends](#source-readme) · [Architecture API](#source-architecture)

### Release boundary

Reviewed October 1, 2026 at `eb4f15c35f4bfcc953604513100c503f7df0a01d`. The September 29 GateMate change removes an incorrect upper limit from PLL REF_CLK validation while retaining the positive-frequency check. The current README distinguishes stable from experimental architecture support. [Current project source](#source-readme); [meaningful activity](#source-activity-refresh).

### Scope classification

Packing, placement, routing, constraints and post-route timing are Layout under the Digital catalog contract. Synthesis remains attributed to upstream tools such as Yosys. The reviewed algorithms are conventional, so the stage AI flag is false.

### Current activity review

Reviewed 2026-10-05. The router stops sink-path reservation at wires marked RESERVED_UNAVAILABLE. This is physical-routing correctness within conventional Layout, not a logic-synthesis feature. [Reviewed change](#source-activity-current).

### Development provenance

Claude is credited for correcting RAMB36E1 width-9 parity connections in the Xilinx packer. The canonical project retains the implemented pin connections. This supports AI-assisted development. [AI-credited executable implementation](#source-development-implementation-20261018) · [Retained executable code at the reviewed canonical head](#source-development-retained-20261018).

### November 15 review

The canonical `main` head is `5e2718b6364e189e414c35b8eef3db4d5e3c0773` (November 12 UTC). Four first-parent commits reconnect to the saved November 4 head. The latest change disables Himbächel fast pip-delay mode before final timing analysis in both routers, restoring the resistance/capacitance contribution omitted by that mode. This is conventional Layout timing correctness, with no new stage or runtime AI involvement. The reviewed change modifies both router implementations and adds no dedicated regression test; upstream tests were not executed. [Reviewed change](#source-activity-20261115); [Router1](#source-router1-20261115); [Router2](#source-router2-20261115); [delay calculation](#source-delay-20261115).

The latest verified stable release is nextpnr-0.11.1 (August 11). Its tag is an ancestor of the reviewed head; the four new commits follow the tag and are development changes rather than verified capabilities of that stable release. [Stable release](#source-release-20261115); [development change](#source-activity-20261115).

The earlier Claude-credited width-9 RAMB36E1 parity repair is integrated into canonical history, and the current Xilinx packer retains both implemented parity-pin connections. This supports the existing AI-assisted development label independently of conventional Layout algorithms. The original commit reports hardware and fork-regression results; this review does not independently reproduce them or attribute the fork's test to canonical nextpnr. [Credited repair](#source-development-implementation-20261018); [retained connections](#source-retained-20261115).
