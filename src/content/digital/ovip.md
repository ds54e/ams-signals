---
name: "OVIP"
description: "SystemVerilog/UVM verification IP with drivers, monitors, sequences and protocol checks for AXI3/AXI4/AXI4-Lite, AXI-Stream and APB3/APB4. The public examples exercise loopback, response timing and ordering; ACE is experimental and does not have comparable regression evidence."
scope:
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Opus is co-credited for the integration that added the experimental ACE agent and monitor. The monitor implementation remains in the canonical tree; the evidence does not establish protocol qualification."
  sources: [development-code, development-retained]
  reviewedAt: "2026-11-23"
access: "Apache-2.0 source; a compatible UVM simulator and UVM library are needed. The reviewed Verilator flow is two-state and needs an SMT solver for constrained randomization."
addedAt: "2026-11-23"
reviewedAt: "2026-11-23"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/idanzaguri/ovip"
    purpose: "code"
  - id: "activity"
    title: "Reviewed substantive implementation on the default branch"
    url: "https://github.com/idanzaguri/ovip/commit/e1e18903bf874e032e4054d6a6a39f7cafac506b"
  - id: "evidence"
    title: "Reviewed reference or implementation example"
    url: "https://github.com/idanzaguri/ovip-dev"
  - id: "development-code"
    title: "Attributed executable implementation"
    url: "https://github.com/idanzaguri/ovip/commit/69aa48ba8b51dd17c02f068a36ac7d1eaa672277"
  - id: "development-retained"
    title: "Retained implementation at the reviewed revision"
    url: "https://github.com/idanzaguri/ovip/blob/e1e18903bf874e032e4054d6a6a39f7cafac506b/verif/ovip_ace/src/ovip_ace_monitor.sv"
---

### Implemented operations and review

The release series has integrated implementations for different bus protocols since June. The November release repairs monitor behavior and returns incomplete master transactions on reset. The development repository supplies regression sources, separate from the canonical reusable package. Commercial simulator targets are not proof of identical coverage; the reviewed Verilator path does not qualify X/Z checks. [Implementation](#source-activity) · [Reviewed evidence](#source-evidence).
