---
name: "labscript"
description: "Python compiler for hardware-timed experimental control sequences. It resolves device connections, quantizes event times, expands analog ramps and writes instrument instructions and timing metadata into HDF5 shot files; BLACS and compatible device drivers program and execute those shots on the hardware."
scope:
  control: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for repairing the custom-ramp example and adding an actual call to that ramp. The current example retains the cubic interpolation and its scheduled analog-output instruction."
  sources: [development, example]
  reviewedAt: "2026-11-24"
access: "BSD-2-Clause compiler. Hardware execution requires other labscript-suite components, compatible device integrations and the corresponding instruments and vendor drivers. Compilation does not establish timing accuracy on the physical setup."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical labscript compiler implementation"
    url: "https://github.com/labscript-suite/labscript"
    purpose: code
  - id: readme
    title: "Hardware-timed experiment composition and suite dependencies"
    url: "https://github.com/labscript-suite/labscript/blob/607cfaecd58869b876d19cf30c52566a4f490cc6/README.md"
  - id: clock-compiler
    title: "Pseudoclock quantization, clock limits and ramp expansion"
    url: "https://github.com/labscript-suite/labscript/blob/607cfaecd58869b876d19cf30c52566a4f490cc6/labscript/core.py"
  - id: shot-compiler
    title: "Device instruction generation and HDF5 shot metadata"
    url: "https://github.com/labscript-suite/labscript/blob/607cfaecd58869b876d19cf30c52566a4f490cc6/labscript/labscript.py"
  - id: outputs
    title: "Scheduled output values and waveform construction"
    url: "https://github.com/labscript-suite/labscript/blob/607cfaecd58869b876d19cf30c52566a4f490cc6/labscript/outputs.py"
  - id: example
    title: "Retained executable ramp, trigger and shot-compilation example"
    url: "https://github.com/labscript-suite/labscript/blob/607cfaecd58869b876d19cf30c52566a4f490cc6/example.py"
  - id: license
    title: "Compiler license"
    url: "https://github.com/labscript-suite/labscript/blob/607cfaecd58869b876d19cf30c52566a4f490cc6/LICENSE.txt"
  - id: activity
    title: "Integrate working custom-ramp example and compilation diagnostics"
    url: "https://github.com/labscript-suite/labscript/commit/607cfaecd58869b876d19cf30c52566a4f490cc6"
  - id: earlier-maintenance
    title: "Correct BLACS connection metadata and variable-length shot fields"
    url: "https://github.com/labscript-suite/labscript/commit/a0787c40dd3b5ec2ce452141758bc523b1d187c5"
  - id: development
    title: "Claude-credited executable custom-ramp correction"
    url: "https://github.com/labscript-suite/labscript/commit/fbcb1916e7193c4df60a614714988278028c9498"
  - id: coordinator
    title: "BLACS shot-programming and execution coordinator"
    url: "https://github.com/labscript-suite/blacs"
  - id: devices
    title: "Separate instrument-specific compiler and worker integrations"
    url: "https://github.com/labscript-suite/labscript-devices"
---

### Distinct compiler operation

The compiler converts scheduled analog and digital instructions into quantized pseudoclock times, expands ramps, checks declared clock limits and invokes device code generation. It saves connection, wait and device metadata alongside the generated HDF5 shot. This instrument-programming operation establishes Control. The compiler can be used to prepare and check shots before a hardware run; its timing checks enforce declared constraints rather than measure electrical behavior. [Clock compiler](#source-clock-compiler); [Shot compiler](#source-shot-compiler); [Outputs](#source-outputs).

BLACS is the separately maintained coordinator that programs and runs compiled shots, while instrument-specific generation and worker logic live in labscript-devices. An acquisition window recorded in a shot is not a live capture path in this compiler. This entry therefore does not inherit Acquisition or Test Automation from those companions, and its activity records only the labscript repository. [Compiler role](#source-readme); [BLACS](#source-coordinator); [Device integrations](#source-devices).

### Selection and development provenance

Substantive work in March 2026 corrected connection metadata and HDF5 field handling. The October integration includes an executable custom-ramp repair in addition to documentation and diagnostic corrections, so the meaningful checkpoint is not based on documentation alone. The revised cubic ramp and scheduled call remain in the current example; no hardware shot was run for this catalog review. [Earlier maintenance](#source-earlier-maintenance); [Integrated change](#source-activity); [Current example](#source-example).

The ramp repair explicitly co-credits Claude and is an ancestor of the reviewed default branch. Its implemented interpolation and added call establish AI-ASSISTED development for the example, without attributing the compiler as a whole or making runtime control AI-backed. [Attributed code change](#source-development); [Retained example](#source-example).
