---
name: "EMerge"
aliases: []
summary: "Full-wave electromagnetic finite-element modeling and simulation from Python."
description: "Python-driven full-wave electromagnetic finite-element solver for models such as RF interconnects, filters and packaging structures. Geometry, mesh, material and port definitions feed frequency-domain solves and S-parameter extraction; reference planes, conductor models and mesh convergence must be checked for the structure being analyzed."
scope: {"simulation": {"ai": false}, "aiDevelopment": "assisted"}
developmentEvidence:
  summary: "Claude is co-credited on the lumped-port power-wave change. The reviewed solver retains the port excitation and normalization implementation."
  sources: [development-code, development-retained]
  reviewedAt: "2026-11-24"
access: "Public Python and native solver implementation; backend and platform support vary."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/FennisRobert/EMerge"
    purpose: code
  - id: activity
    title: "Reviewed substantive implementation checkpoint"
    url: "https://github.com/FennisRobert/EMerge/commit/addbe25b3a41a85184324bf8907506b00bc0a19b"
  - id: release
    title: "EMerge 3.0.10 package and provenance"
    url: "https://pypi.org/project/emerge/3.0.10/"
  - id: guide
    title: "Verified examples and modeling resources"
    url: "https://github.com/FennisRobert/EMerge-hub"
  - id: website
    title: "Official manual and resources"
    url: "https://www.emerge-software.com/resources/"
    purpose: official
  - id: earlier
    title: "Earlier assembly and acceleration work"
    url: "https://github.com/FennisRobert/EMerge/commit/MAY"
  - id: development-code
    title: Credited implementation
    url: https://github.com/FennisRobert/EMerge/commit/addbe25b3a41a85184324bf8907506b00bc0a19b
  - id: development-retained
    title: Retained executable implementation
    url: https://github.com/FennisRobert/EMerge/blob/6fe5253863de9b8c62671f7f819135743a3b704e/src/emerge/_emerge/physics/microwave/bcs/port_bcs.py
---

### Scope and evidence

The API configures materials, ports and meshing for full-wave finite-element solves. November's power-wave lumped-port change is substantive, independent of the packaging change at the 3.0.10 release head. Earlier assembly and solver work supports continued development. [Power-wave implementation](#source-activity) · [Earlier work](#source-earlier) · [Distribution](#source-release).

Simulation covers solving the model, not layout implementation: importing geometry does not make EMerge a layout editor. FasterCap solves a different electrostatic capacitance-extraction problem; openEMS is a separate full-wave time-domain implementation rather than this frequency-domain finite-element path. Source review does not establish numerical accuracy on a particular design.

### Development provenance

Claude is co-credited on the lumped-port power-wave change. The reviewed solver retains the port excitation and normalization implementation. [Credited change](#source-development-code) · [Retained implementation](#source-development-retained).
