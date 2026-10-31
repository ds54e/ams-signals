---
name: Gnucap Modelgen-Verilog
summary: Verilog-AMS behavioral-model compiler that generates C++ plugins for Gnucap, with analog operators and mixed-signal event support under active development.
description: Verilog-AMS behavioral-model compiler that generates C++ plugins for Gnucap, with analog operators and mixed-signal event support under active development. Recent fixes address pending soft-event evaluation and delayed signals; execution requires a compatible Gnucap build, and language support remains partial.
scope:
  simulation:
    ai: false
access: Public GPL-3.0-or-later C++ source; requires a compatible Gnucap snapshot and C++ toolchain. Generated output follows the input model license under the documented conditions.
addedAt: '2026-10-31'
reviewedAt: '2026-10-31'
sources:
- id: code
  title: Canonical public implementation
  url: https://codeberg.org/gnucap/gnucap-modelgen-verilog
  purpose: code
- id: readme
  title: Reviewed project workflow and boundaries
  url: https://codeberg.org/gnucap/gnucap-modelgen-verilog/src/commit/37e0b2af90950cc76c3ed3c51c55c1f9fed53ea8/README
- id: activity
  title: Reviewed substantive first-parent implementation
  url: https://codeberg.org/gnucap/gnucap-modelgen-verilog/commit/284ca0939301370ea99517d61fb60e43f6569ade
- id: implementation
  title: Generated module event evaluation
  url: https://codeberg.org/gnucap/gnucap-modelgen-verilog/src/commit/37e0b2af90950cc76c3ed3c51c55c1f9fed53ea8/src/mg_out_module.cc
- id: delay
  title: absdelay correction and interpolation update
  url: https://codeberg.org/gnucap/gnucap-modelgen-verilog/commit/f3758f729a42674217fdb69ea5aad77603475cd4
---

### Implementation and distinct role

This separately distributed compiler adds behavioral-model support to the Gnucap numerical simulator. It emits C++ that is compiled and loaded as a simulator plugin; the experimental language plugin is also packaged here. Simulation coverage follows that executable model deliverable, rather than treating parsing as complete AMS execution. Develop snapshots generally require the corresponding Gnucap develop tree. [Workflow and license](#source-readme).

### Event and delay maintenance

The October 29 change makes generated modules request evaluation when a soft event is pending and adds a crossing-event regression. The October 27 change repairs the absdelay path while updating waveform interpolation. These are implementation and fixture changes, not claims of full Verilog-AMS conformance. This review inspected code and tests without rebuilding Gnucap. [Pending-event fix](#source-activity) · [Delay correction](#source-delay).

### Canonical activity

Activity is captured from Codeberg's actual develop branch, repository ID 119338, using its full first-parent committer history. The GitHub repository describes itself as a mirror and is not the activity source. This article describes the compiler; the Gnucap article describes the host simulator. [Canonical source](#source-code).
