---
name: "Cell-Aware SPICE Simulation"
aliases: ["cell-aware-spice-simulation"]
description: "Generates digital cell-aware fault models by injecting electrical defects into SPICE cell netlists, simulating selected input sequences, and comparing thresholded outputs with fault-free and Liberty-derived behavior. The analysis exports fault classifications, state-machine models and UDFM patterns for external ATPG workflows."
scope:
  verification: { ai: false }
access: "Public MIT Python source; requires PySpice, ngspice, compatible cell SPICE and Liberty data, and numerical dependencies. External ATPG tools and cell-library permissions are separate."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/TobiasFaller/cell-aware-spice-simulation"
    purpose: code
  - id: activity
    title: "November 11 explicit fault propagation and state-machine output implementation"
    url: "https://github.com/TobiasFaller/cell-aware-spice-simulation/commit/6e7fb7a5d3390cc2fc8f2d623f2561bffcdd0e97"
  - id: earlier
    title: "May 24 Liberty timing-arc implementation"
    url: "https://github.com/TobiasFaller/cell-aware-spice-simulation/commit/96bfc2289df8359af1481245ed32652274e55cdb"
  - id: june
    title: "June 10 result merging and measured input validation"
    url: "https://github.com/TobiasFaller/cell-aware-spice-simulation/commit/fc854939b544ae7578685a8c7f4158210b017fd2"
  - id: fault-injector
    title: "Retained electrical fault enumeration and injection"
    url: "https://github.com/TobiasFaller/cell-aware-spice-simulation/blob/6e7fb7a5d3390cc2fc8f2d623f2561bffcdd0e97/Spice/SpiceFaultInjector.py"
  - id: classifier
    title: "Retained fault data comparison and classification"
    url: "https://github.com/TobiasFaller/cell-aware-spice-simulation/blob/6e7fb7a5d3390cc2fc8f2d623f2561bffcdd0e97/ToolSimulationDataToFaultData.py"
  - id: states
    title: "Retained fault state-machine output"
    url: "https://github.com/TobiasFaller/cell-aware-spice-simulation/blob/6e7fb7a5d3390cc2fc8f2d623f2561bffcdd0e97/ToolFaultDataToStateMachine.py"
  - id: simulation
    title: "Simulation workflow, fault models and validation boundaries"
    url: "https://github.com/TobiasFaller/cell-aware-spice-simulation/blob/6e7fb7a5d3390cc2fc8f2d623f2561bffcdd0e97/Documentation/Simulation.md"
  - id: analysis
    title: "Fault classification and modeled testability limits"
    url: "https://github.com/TobiasFaller/cell-aware-spice-simulation/blob/6e7fb7a5d3390cc2fc8f2d623f2561bffcdd0e97/Documentation/Analysis.md"
---

### Implemented operation and limits

The workflow prepares and simulates cell-local faults, including resistive opens and bridges, stuck-at pin behavior, weakened transistor drive and leakage. It derives logic observations from electrical thresholds and compares them with fault-free and Liberty-derived behavior. It then classifies modeled faults and emits ATPG-oriented data rather than generating chip-level patterns itself. The current state-machine export records propagating and unknown outputs separately. [Injection implementation](#source-fault-injector) · [Simulation workflow](#source-simulation) · [Classification](#source-classifier) · [State-machine output](#source-states).

The primary deliverable is a digital cell fault model, so the entry belongs in Digital Verification despite the underlying analog simulation. It complements FaultFlow's gate-level ATPG and OpenTestability's structural analysis rather than duplicating spicefault's general circuit fault campaigns. Fault equivalence and detectability are conditional on the applied sequences, load, timing, thresholds and chosen fault resistance; they do not establish physical defect probabilities, process-specific cell-aware signoff or compatibility with a particular commercial ATPG engine. The installation guide references a requirements file not present in the reviewed tree; dependencies may need manual resolution. [Analysis workflow](#source-analysis).

### Reviewed maintenance

After the April initial release, May adds Liberty timing arcs, June adds simulation and fault result merging plus measured-input validation, and November adds explicit propagation and unknown-state data to the exported state-machine model. These are separated substantive implementation checkpoints despite the small commit count. No simulations, exported models or ATPG integration were independently executed. [May change](#source-earlier) · [June change](#source-june) · [November change](#source-activity).
