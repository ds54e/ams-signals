---
name: uvm_bridge
description: Bridges Python test code to a SystemVerilog UVM environment through DPI-C, exposing UVM configuration and test operations without recompiling Python scenarios. The public svuvm binding and simulator compatibility tests support mixed Python/UVM workflows; a suitable simulator and UVM library remain required.
scope:
  verification:
    ai: false
access: Public Python/C++/SystemVerilog implementation; simulator, UVM version and DPI/VPI support determine compatibility.
addedAt: '2026-10-18'
reviewedAt: '2026-10-18'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/Dragon-Git/uvm_bridge
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/Dragon-Git/uvm_bridge/blob/b178c9ace130cdf448625a44f356491fd60823c4/README.md
- id: activity
  title: 'test: run the UVM compatibility matrix under pytest'
  url: https://github.com/Dragon-Git/uvm_bridge/commit/2ac3b4656f6cab28b7bcc9781b64e7c89c3a6dca
- id: implementation-1
  title: 'Released implementation: src/svuvm/svuvm.cpp'
  url: https://github.com/Dragon-Git/uvm_bridge/blob/b178c9ace130cdf448625a44f356491fd60823c4/src/svuvm/svuvm.cpp
- id: implementation-2
  title: 'Released implementation: test/uvm_compat/test_compat.py'
  url: https://github.com/Dragon-Git/uvm_bridge/blob/b178c9ace130cdf448625a44f356491fd60823c4/test/uvm_compat/test_compat.py
---

### Implementation and boundaries

The binding implements reusable interaction with UVM rather than a single protocol verification example. The selected compatibility-matrix tests exercise real simulator/library combinations and qualify as technical maintenance. Later CI-only build dispatches are not the freshness basis. Foreign-language interoperability is conventional Verification, not runtime AI. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `2ac3b4656f6cab28b7bcc9781b64e7c89c3a6dca` (2026-10-16 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).
