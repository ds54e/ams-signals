---
name: LibreLane
description: ASIC implementation flow infrastructure orchestrating Verilog synthesis, lint and physical implementation with Yosys, Verilator, OpenROAD, KLayout and related tools. Classic and Chip flows retain configuration/state snapshots and PDK-dependent checks; the stable main branch accepts fixes while feature development proceeds separately.
scope:
  synthesis:
    ai: false
  verification:
    ai: false
  layout:
    ai: false
access: Public Apache-2.0 Python flow implementation with separately licensed Nix files. Requires compatible EDA utilities and a supported PDK; Python-only installation does not supply those tools.
addedAt: '2026-11-03'
reviewedAt: '2026-11-03'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/librelane/librelane
  purpose: code
- id: readme
  title: Current implementation overview and boundaries
  url: https://github.com/librelane/librelane/blob/64ef80802d3d189b476636d2a6b17888c03304ee/README.md
- id: activity
  title: Reviewed substantive first-parent implementation
  url: https://github.com/librelane/librelane/commit/64ef80802d3d189b476636d2a6b17888c03304ee
- id: flow
  title: Classic reference flow and checks
  url: https://github.com/librelane/librelane/blob/64ef80802d3d189b476636d2a6b17888c03304ee/librelane/flows/classic.py
- id: synthesis
  title: Yosys synthesis step implementation
  url: https://github.com/librelane/librelane/blob/64ef80802d3d189b476636d2a6b17888c03304ee/librelane/steps/yosys.py
- id: lint
  title: Verilator lint step implementation
  url: https://github.com/librelane/librelane/blob/64ef80802d3d189b476636d2a6b17888c03304ee/librelane/steps/verilator.py
- id: website
  title: Official project website and documentation
  url: https://librelane.org
  purpose: official
---

### Flow implementation and selection

Classic explicitly orders synthesis, timing/checker, placement/routing and physical-verification steps. The Yosys and Verilator step implementations support conventional Synthesis and Verification; physical implementation and DRC/LVS serve Layout. Internal RTL lowering is not independently exposed circuit Design. No runtime AI or credited executable AI-development contribution was established in this review. [Flow](#source-flow) · [Synthesis adapter](#source-synthesis) · [Lint adapter](#source-lint).

LibreLane continues the OpenLane 2 infrastructure and has sustained compatibility/correctness work, including the October correction to SYNTH_DRIVING_CELL and a later Magic memory-fix backport in stable 3.0.17. The project explicitly keeps main stable and directs features to dev; the separately observed dev head adds test/step traceability and is not substituted into default-branch activity or stable-release capabilities. Low main-branch cadence is not abandonment. No end-to-end tapeout or reproducibility result was independently run for this review. [History/operating contract](#source-readme) · [Stable technical maintenance](#source-activity).
