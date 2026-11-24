---
name: ROHD
description: Dart framework for constructing hardware modules, simulating signal behavior and emitting synthesizable SystemVerilog. Its module graph, event-driven simulator and debug facilities connect design authoring with verification; generated RTL still needs a separate implementation toolchain for logic synthesis and physical design.
scope:
  design:
    ai: false
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Copilot-credited implementation introduced module-scoped services for waveform capture, netlist output and inspection, with registry and lifecycle integration. The merged API and current registry/waveform implementations retain this substantial extension to ROHD."
  sources: ["development-audit-services", "development-services-integration", "development-audit-retained-registry"]
  reviewedAt: "2026-11-24"
access: Public Dart implementation; external simulators and synthesis tools are separate integrations.
addedAt: '2026-10-18'
reviewedAt: '2026-11-24'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/intel/rohd
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/intel/rohd/blob/a2b439e8dccfa2e260862184c99f2a2484c26e20/README.md
- id: activity
  title: No logic array/07 devtools debugger (#736)
  url: https://github.com/intel/rohd/commit/a2b439e8dccfa2e260862184c99f2a2484c26e20
- id: implementation-1
  title: 'Released implementation: lib/src/module.dart'
  url: https://github.com/intel/rohd/blob/a2b439e8dccfa2e260862184c99f2a2484c26e20/lib/src/module.dart
- id: implementation-2
  title: 'Released implementation: lib/src/simulator.dart'
  url: https://github.com/intel/rohd/blob/a2b439e8dccfa2e260862184c99f2a2484c26e20/lib/src/simulator.dart
- id: "development-audit-services"
  title: "Copilot-attributed module services implementation"
  url: https://github.com/intel/rohd/commit/e35954abe7c81c4cd0a6042fbb67fbef0c14d06f
- id: "development-services-integration"
  title: "Merged module-services API and integration account"
  url: https://github.com/intel/rohd/pull/673
- id: "development-audit-retained-registry"
  title: "Current module service registry"
  url: https://github.com/intel/rohd/blob/03088a2d3edcdbd76c991b72697ecaf754a4825e/lib/src/diagnostics/module_services.dart
- id: "development-audit-retained-waveform"
  title: "Current waveform service implementation"
  url: https://github.com/intel/rohd/blob/03088a2d3edcdbd76c991b72697ecaf754a4825e/lib/src/diagnostics/waveform_service.dart
- id: website
  title: Official project website and documentation
  url: https://intel.github.io/rohd-website/
  purpose: official
---

### Implementation and boundaries

The module and simulator classes implement Design and Verification. SystemVerilog generation is not logic Synthesis. The selected debugger/logic-array change contains implementation and regression work, not just a version bump. Runtime simulation and code generation are conventional; no project-wide AI development claim is inferred from individual assistant-associated changes. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `a2b439e8dccfa2e260862184c99f2a2484c26e20` (2026-10-17 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).

### Development provenance

The original Copilot-credited module-services contribution implements a reusable service registry and artifact contracts, with module-build registration, netlist output and waveform lifecycle integration. The associated PR was merged through a different integration commit, which is an ancestor of the reviewed canonical head; the originally credited branch commit alone is not the integration proof. The current registry and waveform services retain the contributed behavior, without attributing reused simulator internals as new AI construction. [Attributed implementation](#source-development-audit-services) · [Merged API](#source-development-services-integration) · [Retained registry](#source-development-audit-retained-registry) · [Retained waveform service](#source-development-audit-retained-waveform).
