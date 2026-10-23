---
name: MorphNet
summary: Python circuit model and bidirectional netlist translation library supporting SPICE-family dialects and Verilog-AMS.
description: Python circuit model and bidirectional netlist translation library supporting SPICE-family dialects and Verilog-AMS. Parsers and writers map connectivity, parameters and simulation declarations through a shared schema, helping interchange circuit descriptions without executing electrical analyses or proving equivalent simulator behavior.
scope:
  design:
    ai: false
access: Public Python implementation with Lark/protobuf-based data models; dialect support is bounded by the released parsers and writers.
addedAt: '2026-10-18'
reviewedAt: '2026-10-23'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/das-dias/morphnet
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/das-dias/morphnet/blob/63c7868826fe0c2ac7b9112aaa1ff7b6847694f8/README.md
- id: activity
  title: 'Merge pull request #8 from das-dias/dev/update-schema'
  url: https://github.com/das-dias/morphnet/commit/63c7868826fe0c2ac7b9112aaa1ff7b6847694f8
- id: implementation-1
  title: 'Released implementation: src/morphnet/_api.py'
  url: https://github.com/das-dias/morphnet/blob/63c7868826fe0c2ac7b9112aaa1ff7b6847694f8/src/morphnet/_api.py
- id: implementation-2
  title: 'Released implementation: src/morphnet/netlist/vams/writer.py'
  url: https://github.com/das-dias/morphnet/blob/63c7868826fe0c2ac7b9112aaa1ff7b6847694f8/src/morphnet/netlist/vams/writer.py
- id: website
  title: Official project website and documentation
  url: https://das-dias.github.io/morphnet/
  purpose: official
---

### Implementation and boundaries

Circuit/module construction and dialect conversion materially serve Design. The VAMS writer emits source rather than compiling or executing an electrical model, so Simulation is not assigned. The schema/model update and executable examples are substantive technical maintenance. This is the circuit-netlist project, not the unrelated neural-network MorphNet project. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `63c7868826fe0c2ac7b9112aaa1ff7b6847694f8` (2026-10-14 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).
