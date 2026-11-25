---
name: "Origen 2"
aliases: ["O2","Origen Semiconductor Developer's Kit"]
description: "Python and Rust toolkit for modeling device pins, registers and timesets, and generating semiconductor tester patterns and test programs. Implemented tester backends include IG-XL and Advantest V93000 workflows; generated artifacts require the corresponding tester environment for execution."
scope:
  test: { ai: false }
access: "MIT; tester-specific compilation and execution require separately available tools and compatible ATE."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/Origen-SDK/o2"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/Origen-SDK/o2/commit/78ec0a081291a4edfa2b478cb3962e15eb702aa5"
  - id: rendering
    title: "August V93000 SMT7 and SMT8 flow rendering correction and tests"
    url: "https://github.com/Origen-SDK/o2/commit/7240c898b2e4ce7182f27de96b01eaed55d1df98"
  - id: timesets
    title: "Executable pin-drive and timeset pattern example"
    url: "https://github.com/Origen-SDK/o2/blob/f4c6b5b91f30b9805aa1044c566e474a646327d1/test_apps/python_app/example/patterns/timeset_workout.py"
  - id: retained-flow
    title: "Retained conditional-flow transformation implementation"
    url: "https://github.com/Origen-SDK/o2/blob/f4c6b5b91f30b9805aa1044c566e474a646327d1/rust/origen_metal/src/prog_gen/processors/adjacent_if_combiner.rs"
---

## Scope and limits

Origen 2 produces tester-facing artifacts from device and test definitions. Its pattern example selects named timesets and drives pins cycle by cycle; the generated test flow is separate from RTL scan insertion or fault-pattern generation. Test Automation covers the executable tester-program and pattern generation workflow. Generation alone does not establish physical instrument control, acquisition, timing accuracy, or compatibility with every tester model. [Timeset example](#source-timesets).

The entry records the Python/Rust O2 repository only, not the older Ruby Origen ecosystem or separate plugins. It is not a virtual mixed-signal tester or circuit simulator.

## Reviewed maintenance

August 2026 corrects multiline rendering in SMT7 and SMT8 flow generators and adds tests. November revises conditional-flow combination to account for the variables, flags and test results that the first branch can change. The reviewed revision retains this transformation. These are separate substantive corrections to existing test-program generation, not release-number changes. [Flow rendering](#source-rendering) · [Conditional correction](#source-activity) · [Retained transformation](#source-retained-flow).
