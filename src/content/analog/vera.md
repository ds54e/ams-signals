---
name: VerA
summary: Verilog-A/AMS compiler producing Zig device code, shared libraries and OSDI 0.4 models for host simulators.
description: Verilog-A/AMS compiler producing Zig device code, shared libraries and OSDI 0.4 models for host simulators. Its fixture runner also exercises analog and mixed-signal models, but uses a declared time grid; adaptive circuit simulation and event-time accuracy depend on the host and supported interface.
scope:
  simulation:
    ai: false
access: Public Apache-2.0 Zig source; device builds require the pinned Zig development toolchain. OSDI output needs an OSDI 0.4 host and cannot carry every native device-contract feature.
addedAt: '2026-10-31'
reviewedAt: '2026-10-31'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/OpenFAT/VerA
  purpose: code
- id: readme
  title: Reviewed project workflow and boundaries
  url: https://github.com/OpenFAT/VerA/blob/c3df3498ec42a761f5c70332507fcbee05ad796a/README.md
- id: activity
  title: Reviewed substantive first-parent implementation
  url: https://github.com/OpenFAT/VerA/commit/14541a6f966b2e96eca145546b36e4550078dc0f
- id: contract
  title: Native device/host contract
  url: https://github.com/OpenFAT/VerA/blob/c3df3498ec42a761f5c70332507fcbee05ad796a/lib/contract.zig
- id: osdi
  title: OSDI boundary checks
  url: https://github.com/OpenFAT/VerA/blob/c3df3498ec42a761f5c70332507fcbee05ad796a/src/codegen/osdi.zig
- id: changelog
  title: Version-specific implementation and test account
  url: https://github.com/OpenFAT/VerA/blob/c3df3498ec42a761f5c70332507fcbee05ad796a/CHANGELOG.md
---

### Compiler, runner and host boundary

VerA emits device evaluation code, residual/Jacobian contributions and state through its native host contract, with shared-library and OSDI backends. This compiled model delivery serves Simulation. It is distinct from Gnucap's C++ plugin compiler and from ESPice, a circuit simulator using VerA models. [Project](#source-readme) · [Host contract](#source-contract) · [OSDI backend](#source-osdi).

The built-in model fixture runner uses fixed-step backward Euler over declared time points. An event lands on the next declared point; this runner is not an adaptive circuit simulator. OSDI 0.4 cannot represent every native contract operation: the reviewed backend rejects step-rejection requests and warns about correlated-noise information. SystemVerilog and VHDL are outside the stated language scope. [Runner and scope](#source-readme) · [Backend checks](#source-osdi).

### Reviewed development

The October 25 first-parent integration includes discipline/access resolution, runtime-direction crossing handling, digital scheduling and VPI fixes, plus executable tests. The maintainer reports all 6,817 selected suite fixtures passing for v0.20.0; that is a project-reported fixture result, not independently reproduced or proof of complete language conformance. No compiler/simulator campaign was executed for this catalog review. [Integrated changes](#source-activity) · [Version-specific account](#source-changelog).
