---
name: "EEschematic"
roles: ["agent"]
summary: "Multimodal conversion from netlists to editable schematics."
description: "Converts SPICE netlists into editable schematic descriptions, using multimodal reasoning and visual feedback to place symbols and refine wiring for analog circuits."
flow: {"design":"core"}
access: "Python/Jupyter and multimodal LLM access; the released notebooks require local paths and rendering setup."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "paper"
    title: "EEschematic: Multimodal-LLM Based AI Agent for Schematic Generation of Analog Circuit"
    url: "https://arxiv.org/abs/2510.17002"
    purpose: "paper"
  - id: "code"
    title: "Public project implementation"
    url: "https://github.com/eelab-dev/EEschematic"
    purpose: "code"
  - id: "netlist-to-schema-test-action-test-ota1-ipynb"
    title: "Released OTA schematic-generation notebook"
    url: "https://github.com/eelab-dev/EEschematic/blob/71c6c78a13d9d4ad65940956945109400b13d754/netlist_to_schema/test_action_test_ota1.ipynb"
  - id: "netlist-to-schema-place-prompt-txt"
    title: "Schematic symbol-placement contract"
    url: "https://github.com/eelab-dev/EEschematic/blob/71c6c78a13d9d4ad65940956945109400b13d754/netlist_to_schema/place_prompt.txt"
---

### Scope

The authors' notebooks translate textual netlists into JSON-like schematic descriptions, refine symbol positions and wiring, and use rendered images as model feedback. Released examples include an inverter, five-transistor OTA and telescopic amplifier. The output is an editable schematic representation rather than a physical mask layout. [Paper](#source-paper) · [Notebook](#source-netlist-to-schema-test-action-test-ota1-ipynb)

### Classification

Schematic interpretation and generation are core Design. Symbol placement and diagram symmetry do not establish IC layout; no circuit-performance optimization or simulator-in-the-loop claim is inferred from visual refinement. The notebooks retain environment-specific paths and model credentials must be supplied by the operator. [Placement prompt](#source-netlist-to-schema-place-prompt-txt)

### Flow scope

The output is an editable schematic reconstructed from a netlist. Symbol placement and drawing geometry belong to circuit representation, not integrated-circuit layout. [Reviewed source](#source-netlist-to-schema-test-action-test-ota1-ipynb).
