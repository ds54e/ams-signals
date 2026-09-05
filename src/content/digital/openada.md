---
name: "OpenADA"
aliases: []
roles: ["eda-tool"]
ai: "ai-enabled"
description: "Local agent-to-EDA interface running circuit simulation, measurement, synthesis and DRC/LVS operations through tool drivers that return structured evidence."
flow: {"synthesis":"supporting","verification":"core","layout":"core"}
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical OpenADA repository"
    url: "https://github.com/simra-tech/OpenADA"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/simra-tech/OpenADA/blob/ff9415e24fe6407820ca23147e3cf42625dd69b7/README.md"
  - id: "implementation"
    title: "Reviewed implementation: src/openada/engines/klayout_engine.py"
    url: "https://github.com/simra-tech/OpenADA/blob/ff9415e24fe6407820ca23147e3cf42625dd69b7/src/openada/engines/klayout_engine.py"
  - id: "activity"
    title: "Merge bet2/tbplan-ir: testbench-plan IR (closed schema, deterministic compiler w/ DUT sealing, comparator implementing the 12 ratified pll2 meta-rows, execution runner w/ per-condition receipts, CLI + conformance) integrated with osc-primitives main; all seven signed semantic receipts regenerated via the native workflow; 107 domain + 40 osc + 50 semantic-coverage tests pass, release verifier 279 rows zero gaps"
    url: "https://github.com/simra-tech/OpenADA/commit/3bd838c0f1db15e6d38c26d43ece68402e841005"
---


### Classification

Agent skills consume implemented local CLI operations and structured results. This is AI-enabled even though a normative MCP binding remains future work. [Reviewed source](#source-readme).

### Release boundary

Experimental oscillator/testbench profiles are bounded. The reverted knowledge-graph spike and planned remote/MCP adapters are not counted as implemented scope. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Flow scope

Explicit drivers expose RTL checks/tests and layout DRC/LVS with retained evidence. Mapped Yosys synthesis is a supporting operation in the broader tool contract; synthesis-stage timing is not physical closure. No RTL editing is inferred from netlisting or tool integration. [Reviewed source](#source-readme).
