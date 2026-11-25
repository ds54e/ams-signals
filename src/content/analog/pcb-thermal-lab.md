---
name: "PCB Thermal Lab"
aliases: ["KiCad Elmer workflow"]
summary: "PCB heat-conduction simulation with KiCad geometry, Gmsh meshes and Elmer FEM."
description: "PCB thermal simulation workflow that converts KiCad geometry and configured heat sources into Gmsh meshes and Elmer finite-element inputs. It supports steady and transient heat conduction, explicit copper and via detail near selected resistor sources, and effective material properties outside the detailed region."
scope:
  simulation: { ai: false }
access: "Apache-2.0 workflow source; requires compatible KiCad, Gmsh, Elmer and postprocessing tools. Optional CUDA is not required for CPU operation."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/gerhardmalberg/pcb-thermal-lab"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/gerhardmalberg/pcb-thermal-lab/commit/df0f63b753a11d865cbe7128c5cdfece37c38258"
  - id: earlier
    title: "November explicit and configurable heat-source implementation"
    url: "https://github.com/gerhardmalberg/pcb-thermal-lab/commit/6ff74e72fa8a03f96b7941e388cce641e526db9d"
  - id: power
    title: "Retained explicit resistor-source accounting and validation"
    url: "https://github.com/gerhardmalberg/pcb-thermal-lab/blob/df0f63b753a11d865cbe7128c5cdfece37c38258/src/pcb_thermal/power.py"
  - id: overview
    title: "Reviewed thermal workflow and model boundaries"
    url: "https://github.com/gerhardmalberg/pcb-thermal-lab/blob/df0f63b753a11d865cbe7128c5cdfece37c38258/README.md"
---

## Scope and limits

This is an electronics-specific thermal simulation workflow using extracted board geometry and heat-source assumptions, distinct from the companion PCB EM Lab's electrical field solve. Elmer is the numerical solver. The reviewed geometry templates explicitly model selected resistor sources and nearby board features; they do not automatically infer an IC junction temperature, package stress or transistor self-heating. A model of another package requires appropriate geometry, source placement, material properties and boundary conditions. [Overview](#source-overview) · [Source accounting](#source-power).

## Reviewed maintenance

After initial publication on October 31, November 3 removes application-specific balancing-source assumptions and exposes configurable resistor powers and schedules. November 15 changes source fingerprinting to include design and referenced model assets but exclude local editor state, with a regression test. These are follow-up changes to an existing executable thermal workflow. Public history is short; no independent thermal solve or hardware correlation was performed. [Heat-source change](#source-earlier) · [Fingerprint regression](#source-activity).
