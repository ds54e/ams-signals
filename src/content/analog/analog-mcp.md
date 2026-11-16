---
name: Analog_MCP
description: MCP toolkit for operating Virtuoso schematics, simulation measurements and physical-verification flows through implemented EDA clients. SKILL execution and remote tool orchestration connect circuit edits to licensed Cadence/Siemens environments; users must supply the tools, process libraries and appropriate access.
scope:
  design:
    ai: false
  simulation:
    ai: false
  layout:
    ai: false
access: Public Python source; requires configured remote EDA tools, SSH access and PDKs.
addedAt: '2026-11-16'
reviewedAt: '2026-11-16'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/SiliCAD/Analog_MCP
  purpose: code
- id: readme
  title: Reviewed workflow and access boundaries
  url: https://github.com/SiliCAD/Analog_MCP/blob/606ac2eba83233d8834ce9fa8eb889c5145c7611/README.md
- id: activity
  title: Reviewed first-parent integration of substantive implementation
  url: https://github.com/SiliCAD/Analog_MCP/commit/606ac2eba83233d8834ce9fa8eb889c5145c7611
- id: implementation
  title: Reviewed implementation and validation change
  url: https://github.com/SiliCAD/Analog_MCP/commit/606ac2eba83233d8834ce9fa8eb889c5145c7611
- id: retained
  title: Current implementation at review
  url: https://github.com/SiliCAD/Analog_MCP/blob/606ac2eba83233d8834ce9fa8eb889c5145c7611/src/clients/virtuoso_client.py
summary: MCP toolkit for operating Virtuoso schematics, simulation measurements and physical-verification flows through implemented EDA clients.
---

### Implementation and selection

Large-SKILL transfer, working-directory and shell compatibility repairs support ongoing maintenance. MCP exposure alone does not establish model-driven stage decisions. [Workflow](#source-readme) · [Implementation change](#source-implementation) · [Retained code](#source-retained).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).
