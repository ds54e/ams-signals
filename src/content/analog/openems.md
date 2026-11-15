---
name: "openEMS"
aliases: []
summary: "Electromagnetic field solver using the EC-FDTD method, with Python and Octave/Matlab interfaces."
description: "Electromagnetic field solver using the EC-FDTD method, with Python and Octave/Matlab interfaces. Geometry, materials, excitations and ports define RF analyses and network responses; device or interconnect studies require explicit meshing and boundary setup rather than automatic foundry-qualified GDS extraction."
scope:
  simulation:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Code is credited with assisting implementation of the VTK-independent field-dump writer. The canonical C++ implementation retains XML escaping, base64 encoding and zlib-compressed array output."
  sources: [activity, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public C++/Python/Matlab implementation; CSXCAD and solver build/runtime dependencies are required."
addedAt: "2026-10-22"
reviewedAt: "2026-11-15"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/thliebig/openEMS"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/thliebig/openEMS/blob/11aa0638ec2c554d84fd77f71ba778d7fb2d6de9/README.md"
  - id: "implementation-1"
    title: "Reviewed source: python/openEMS/ports.py"
    url: "https://github.com/thliebig/openEMS/blob/11aa0638ec2c554d84fd77f71ba778d7fb2d6de9/python/openEMS/ports.py"
  - id: "implementation-2"
    title: "Reviewed source: main.cpp"
    url: "https://github.com/thliebig/openEMS/blob/11aa0638ec2c554d84fd77f71ba778d7fb2d6de9/main.cpp"
  - id: "activity"
    title: "Reviewed meaningful change: Write the VTK files without VTK"
    url: "https://github.com/thliebig/openEMS/commit/d9ca3b6a6359c7b04bf862adc59ed54fbd275bd4"
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/thliebig/openEMS/blob/11aa0638ec2c554d84fd77f71ba778d7fb2d6de9/tools/vtk_file_writer.cpp
  - id: website
    title: Official project website and documentation
    url: https://www.openems.de/
    purpose: official
  - id: "activity-20261115"
    title: "Serialize reduced timestep factors in XML with a regression test"
    url: "https://github.com/thliebig/openEMS/commit/fc002359254cda9dfbb5c503cc5933306083eb57"
  - id: "xml-20261115"
    title: "Retained XML timestep-factor serialization and regression"
    url: "https://github.com/thliebig/openEMS/blob/fc002359254cda9dfbb5c503cc5933306083eb57/python/Tests/test_XML_RoundTrip.py"
  - id: "engines-20261115"
    title: "CPU and GPU engine comparison cases"
    url: "https://github.com/thliebig/openEMS/blob/fc002359254cda9dfbb5c503cc5933306083eb57/python/Tests/Engine_Compare.py"
  - id: "build-20261115"
    title: "Current dependency and optional GPU backend requirements"
    url: "https://github.com/thliebig/openEMS/blob/fc002359254cda9dfbb5c503cc5933306083eb57/CMakeLists.txt"
  - id: "gpu-20261115"
    title: "GPU cell model and unsupported-extension rejection"
    url: "https://github.com/thliebig/openEMS/blob/fc002359254cda9dfbb5c503cc5933306083eb57/FDTD/engine_gpu.cpp"
  - id: "retained-20261115"
    title: "Retained AI-credited VTK-independent writer"
    url: "https://github.com/thliebig/openEMS/blob/fc002359254cda9dfbb5c503cc5933306083eb57/tools/vtk_file_writer.cpp"
  - id: "changes-20261115"
    title: "Unreleased engine changes and experimental CPU boundary"
    url: "https://github.com/thliebig/openEMS/blob/fc002359254cda9dfbb5c503cc5933306083eb57/CHANGELOG.md"
  - id: "release-20261115"
    title: "openEMS v0.37.0 stable release"
    url: "https://github.com/thliebig/openEMS/releases/tag/v0.37.0"
---

### Implemented operations and boundaries

Track the solver repository rather than summing openEMS-Project meta-repository activity. Geometry/materials come through CSXCAD and explicit ports/boundaries; IC passives and interconnects need modeling and mesh preparation. FDTD analysis does not establish physical-rule verification.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Simulation. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The earlier reviewed checkpoint was 2026-10-20T23:46:26Z (`d9ca3b6a6359c7b04bf862adc59ed54fbd275bd4`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude Code is credited with assisting implementation of the VTK-independent field-dump writer. The canonical C++ implementation retains XML escaping, base64 encoding and zlib-compressed array output. This supports AI-ASSISTED. [Credited change](#source-activity) · [Retained implementation](#source-development-retained-20261022).

### Current implementation and release boundary

The November 13 master revision corrects `Write2XML()` to serialize a reduced `TimeStepFactor`; the regression checks that 0.5 survives XML output. The current engine comparison suite covers CPU and GPU paths, including probes and field dumps, with device cases skipped when no GPU is available. These are Simulation correctness and validation changes. [Serialization repair](#source-activity-20261115); [regression](#source-xml-20261115); [engine comparisons](#source-engines-20261115).

The latest verified stable release is v0.37.0 (October 9). The later GPU cell-model implementation and experimental CPU engine are unreleased source-tree work. GPU use requires a compatible HIP/CUDA or macOS Metal backend; the GPU engine rejects an extension without a device implementation. The C++17 build still needs CSXCAD, HDF5, zlib and other declared dependencies. No benchmark performance or numerical accuracy was independently reproduced. [Stable release](#source-release-20261115); [unreleased changes](#source-changes-20261115); [build requirements](#source-build-20261115); [GPU implementation](#source-gpu-20261115).

The original Claude Code credit remains supported by the integrated writer change and its retained XML escaping, base64 encoding and zlib compression. Development assistance remains independent of the conventional Simulation workflow. [Credited change](#source-activity); [current retained writer](#source-retained-20261115).
