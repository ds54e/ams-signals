---
name: diagen
summary: Turns textual circuit connectivity into automatically arranged TikZ and SVG schematics for analog and digital diagrams.
description: Turns textual circuit connectivity into automatically arranged TikZ and SVG schematics for analog and digital diagrams. A shipped agent skill authors the connection netlist, inspects the rendered preview and revises the diagram; deterministic placement/routing produces drawings rather than electrical simulation or IC mask layout.
scope:
  design:
    ai: true
access: Public Python diagram generator; the optional model-hosted drawing skill requires a supported agent client, and rendering dependencies depend on the output path.
addedAt: '2026-10-18'
reviewedAt: '2026-10-18'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/Chaoos-404/diagen
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/Chaoos-404/diagen/blob/c59aa5079dc741c8fb00b7c2f3ca96ca1ffd20aa/README.md
- id: activity
  title: 'Engine: pins of one net that meet need no wire'
  url: https://github.com/Chaoos-404/diagen/commit/790df92d6635fea92259fb8489a42f5014822e65
- id: implementation-1
  title: 'Released implementation: diagen/engine.py'
  url: https://github.com/Chaoos-404/diagen/blob/c59aa5079dc741c8fb00b7c2f3ca96ca1ffd20aa/diagen/engine.py
- id: implementation-2
  title: 'Released implementation: diagen/netlist.py'
  url: https://github.com/Chaoos-404/diagen/blob/c59aa5079dc741c8fb00b7c2f3ca96ca1ffd20aa/diagen/netlist.py
- id: diagram-skill
  title: Released model-hosted circuit drawing procedure
  url: https://github.com/Chaoos-404/diagen/blob/c59aa5079dc741c8fb00b7c2f3ca96ca1ffd20aa/.claude/skills/circuit-diagram/SKILL.md
---

### Implementation and boundaries

The circuit parser and layout engine implement schematic drawing, which belongs to Design. Diagram placement is not physical IC Layout. The reviewed engine correction recognizes coincident connected pins without creating an unnecessary wire. The released model-hosted skill specifies netlist authoring, preview inspection and connectivity/port revisions, supporting AI Design on that optional workflow. The renderer itself stays deterministic; MCP availability alone and assistant instruction files do not establish AI software-development provenance. [Drawing procedure](#source-diagram-skill). [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `790df92d6635fea92259fb8489a42f5014822e65` (2026-09-27 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).
