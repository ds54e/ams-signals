---
name: "EMI Analyzer"
aliases: ["PCB ESD analyzer","EMC analyzer"]
summary: "Checks PCB electromagnetic compatibility and compares ESD protection layouts using board-derived transient circuit models."
description: "PCB electromagnetic compatibility analysis with board-derived ngspice ESD transient models, clamp topology comparisons and power-rail impedance checks. The ESD workflow compares the routed design with relocated clamps and reduced ground inductance using generic or supplied protection models; it does not establish IC-level HBM/CDM ratings or product immunity compliance."
scope: {"simulation":{"ai":false},"aiDevelopment":"assisted"}
developmentEvidence: {"summary":"Claude Opus 5.5 is co-credited for correcting generic clamp subcircuit ground-port naming to preserve the modeled ground path and adding transient regression tests. The current parts.py retains the correction.","sources":["activity","parts"],"reviewedAt":"2026-11-25"}
access: "Apache-2.0. Public application and worker source; transient simulation requires ngspice and board inputs. Other solvers and vendor protection models have separate setup and licensing requirements."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/embeddedci-com/emi-analyzer"
    purpose: code
  - id: activity
    title: "November 7 credited clamp ground-port correction and regression tests"
    url: "https://github.com/embeddedci-com/emi-analyzer/commit/13c3583cd2416dcb527d2e5ffd8447ae727fa129"
  - id: earlier
    title: "September 28 routing checks under antennas and ESD clamps"
    url: "https://github.com/embeddedci-com/emi-analyzer/commit/86e7427a25574a5f57fbaf931aa33ef44a710e5b"
  - id: simulate
    title: "Retained ESD variant simulation and waveform reduction"
    url: "https://github.com/embeddedci-com/emi-analyzer/blob/eabaf77bd9cb35a1e33ddb1b17bfab18dd2b2584/worker/emi_worker/transient/simulate.py"
  - id: netlist
    title: "Board-derived transient circuit generation"
    url: "https://github.com/embeddedci-com/emi-analyzer/blob/eabaf77bd9cb35a1e33ddb1b17bfab18dd2b2584/worker/emi_worker/transient/netlist.py"
  - id: waveform
    title: "IEC 61000-4-2:2008 contact-discharge source implementation"
    url: "https://github.com/embeddedci-com/emi-analyzer/blob/eabaf77bd9cb35a1e33ddb1b17bfab18dd2b2584/worker/emi_worker/transient/waveforms.py"
  - id: parts
    title: "Retained generic clamp model and ground-port correction"
    url: "https://github.com/embeddedci-com/emi-analyzer/blob/eabaf77bd9cb35a1e33ddb1b17bfab18dd2b2584/worker/emi_worker/transient/parts.py"
  - id: tests
    title: "Executable transient and clamp ground-inductance regression tests"
    url: "https://github.com/embeddedci-com/emi-analyzer/blob/eabaf77bd9cb35a1e33ddb1b17bfab18dd2b2584/worker/tests/test_transient_sim.py"
  - id: rules
    title: "Retained structural EMC and ESD protection checks"
    url: "https://github.com/embeddedci-com/emi-analyzer/blob/eabaf77bd9cb35a1e33ddb1b17bfab18dd2b2584/worker/emi_worker/rules/emc.py"
  - id: overview
    title: "ESD simulation implementation notes and boundaries"
    url: "https://github.com/embeddedci-com/emi-analyzer/blob/eabaf77bd9cb35a1e33ddb1b17bfab18dd2b2584/docs/esd-transient-simulation.md"
---

## Scope and limits

The electrical evaluation path derives routed interconnect, protection and generic IC input models from board information and compares the existing layout, clamp relocation and a reduced-inductance ground variant in ngspice. It implements a sampled IEC 61000-4-2:2008 contact-discharge waveform, not air-discharge or IC-level HBM/CDM qualification. The generic device assumptions make absolute pin-voltage results estimates. Structural protection checks supplement the electrical evaluation. Unlike PCB EM Lab's field-solver network extraction, this workflow explicitly compares protection topology and transient stress. The project evaluates boards rather than generating or routing them. [Simulation](#source-simulate) · [Netlist generation](#source-netlist) · [Waveform](#source-waveform) · [Rules](#source-rules).

## Reviewed maintenance and provenance

September 28 adds board-routing checks around antennas and ESD clamps. November 7 fixes a circuit-generation problem in which a generic subcircuit's ground pin was interpreted as global node zero by ngspice, bypassing the modeled ground-path inductance. The fix retains a distinct ref port and adds regression cases; the change credits Claude Opus 5.5. November 17 automated dependency updates remain the later raw activity date, not a new meaningful checkpoint. No simulator or immunity test was independently reproduced. [September change](#source-earlier) · [November correction](#source-activity) · [Retained implementation](#source-parts) · [Tests](#source-tests).
