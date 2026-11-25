---
name: "gf180-efuse-otp"
aliases: ["2AM Logic eFuse OTP", "GF180 OTP array"]
summary: "GF180MCU eFuse array reference design, electrical verification benches and layout generation."
description: "Reference implementation of a 32-by-8 eFuse OTP array on GF180MCU, including programming and sensing circuits, controller RTL, corner and Monte Carlo benches, and layout-generation scripts with physical verification records. Sense results depend on assumed fuse-resistance distributions; full array LVS and silicon characterization remain open."
scope:
  design: { ai: false }
  simulation: { ai: false }
  layout: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Sonnet is co-credited for adding a layout-generator assertion that prevents pre-growth leaf widths from being used for spacing, with associated regression tests. The assertion remains in the reviewed generator."
  sources: [credited-change, activity, layout]
  reviewedAt: "2026-11-25"
access: "Apache-2.0 project source; requires compatible GF180MCU PDK and separately installed EDA tools. The checked-in flow and reports are not a qualified OTP macro."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/2AMLogic/gf180-efuse-otp"
    purpose: code
  - id: activity
    title: "November 24 integrated layout-generator guard and regression tests"
    url: "https://github.com/2AMLogic/gf180-efuse-otp/commit/9494dee471f469c481c77246cb5110ecd32073ec"
  - id: credited-change
    title: "Claude-credited executable placement guard and test change"
    url: "https://github.com/2AMLogic/gf180-efuse-otp/commit/ae8bb2011c8f4a269b450d607c19cbbcda2ce59d"
  - id: earlier
    title: "October analog schematics and netlist implementation"
    url: "https://github.com/2AMLogic/gf180-efuse-otp/commit/f898b5c54c720420f21b43895aaeaa07cdc9c58e"
  - id: overview
    title: "Reviewed design scope, maturity and measurement assumptions"
    url: "https://github.com/2AMLogic/gf180-efuse-otp/blob/f103081b06270707f48be8ebd2f8bd8f792a6b5d/README.md"
  - id: netlist
    title: "Retained GF180MCU array netlist"
    url: "https://github.com/2AMLogic/gf180-efuse-otp/blob/f103081b06270707f48be8ebd2f8bd8f792a6b5d/design/efuse_otp_array.spice"
  - id: sense
    title: "Retained PVT sense-margin benchmark execution"
    url: "https://github.com/2AMLogic/gf180-efuse-otp/blob/f103081b06270707f48be8ebd2f8bd8f792a6b5d/sim/sense-margin/run.sh"
  - id: layout
    title: "Retained GDS generator, placement and routing implementation"
    url: "https://github.com/2AMLogic/gf180-efuse-otp/blob/f103081b06270707f48be8ebd2f8bd8f792a6b5d/layout/gen_efuse_otp.py"
  - id: signoff
    title: "Current block evidence and unmet signoff items"
    url: "https://github.com/2AMLogic/gf180-efuse-otp/blob/f103081b06270707f48be8ebd2f8bd8f792a6b5d/signoff/block-manifest.signoff.json"
---

## Scope and limits

This is a process-specific reference design and executable verification workflow, not a general eFuse compiler or a wrapper around an existing PDK macro. Its netlist instantiates a 32-row, eight-column array, row and column drivers, and sensing circuits. The simulation workflow includes program-select and sense-margin benches; the layout generator constructs GDS geometry and the project includes verification records. The related klayout-tools implementation supplies reusable EDA operations, whereas this entry exposes a particular mixed-signal block and its electrical and physical verification evidence. [Netlist](#source-netlist) · [Sense bench](#source-sense) · [Layout generator](#source-layout).

The maintainer reports a 45-corner sense campaign and Monte Carlo evidence using assumed intact/programmed resistance ranges and reference-resistor tolerance. A resistor model does not simulate the physical destructive programming event. Foundry-deck DRC and subcell LVS results do not establish full-array connectivity, power delivery, programming yield, retention or qualification; full array LVS and silicon measurement remain open. No simulation or physical verification was independently rerun. [Project status](#source-overview) · [Signoff record](#source-signoff).

## Reviewed maintenance and provenance

October history adds the analog schematics and netlist. The November 24 integration adds a guard and tests for expanded leaf placement and spacing, retained in the current generator. The Claude credit is tied to that executable correction, not to all project code. The repository was publicly accessible on November 25 and its history includes earlier development; first-parent committer timestamps do not establish public availability of that earlier work. The current evidence supports concrete development follow-through but not an established public maintenance cadence. [October implementation](#source-earlier) · [Credited change](#source-credited-change) · [Integration](#source-activity).
