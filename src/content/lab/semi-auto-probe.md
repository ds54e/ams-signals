---
name: "Semi Auto Probe"
aliases: ["SAP semi-automatic probe station"]
description: "Software for a motorized probe station combining XYZ motion, microscope acquisition, GDS-aligned positioning and programmable electrical measurements. It supports measurement workflows with external instruments and an optional LLM planner that proposes high-level motion, imaging and measurement steps for local validation and confirmation."
scope:
  control: { ai: true }
  acquisition: { ai: true }
  test: { ai: true }
access: "Public source; explicit software reuse license was not found in the reviewed tree. Requires compatible stage, camera and measurement instruments; LLM access is optional."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/GEMsLab-NUS/semi-auto-probe"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/GEMsLab-NUS/semi-auto-probe/commit/ef186ed71eb16dcc50d8922f1af4faa4fbfceeff"
  - id: workflow-update
    title: "September measurement workflow and mapping integration"
    url: "https://github.com/GEMsLab-NUS/semi-auto-probe/commit/988796b34de8553bb8a94f29d03fce69c7102a7b"
  - id: agent-planner
    title: "Optional LLM planner and local capability checks"
    url: "https://github.com/GEMsLab-NUS/semi-auto-probe/blob/ef186ed71eb16dcc50d8922f1af4faa4fbfceeff/src/semi_auto_probe/agent.py"
  - id: agent-runtime
    title: "Preflight and execution lifecycle"
    url: "https://github.com/GEMsLab-NUS/semi-auto-probe/blob/ef186ed71eb16dcc50d8922f1af4faa4fbfceeff/src/semi_auto_probe/agent_runtime.py"
---

## Scope and limits

Control covers motor positioning and measurement-instrument configuration; Acquisition covers live microscope and instrument measurements. Test follows the mapping and electrical measurement workflow, including repeatable instrument sequences. The public hardware description is not classified as a separate Design stage without verified fabrication or assembly-design outputs.

The optional model-driven planner selects existing high-level motion, imaging and measurement actions using application context. The local runtime checks prerequisites and invokes existing workflows; the LLM does not issue low-level instrument commands directly. These are runtime AI operations, not evidence of how the project was developed. Confirm physical clearance, probe contact, bias limits and output state independently of software completion. [Planner](#source-agent-planner) · [Runtime](#source-agent-runtime).

## Reviewed maintenance

September 2026 adds a measurement workflow editor, mapping operations and device support. October adds timed Keithley measurement templates and HP 6614C gate-bias loops, with regression code for the nested workflow and instrument configuration. This is continuing implementation beyond the original probe positioning and imaging application. [September integration](#source-workflow-update) · [October changes](#source-activity).
