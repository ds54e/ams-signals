---
name: MorphNet
summary: Python circuit model and bidirectional netlist translation library supporting SPICE-family dialects and Verilog-AMS.
description: Python circuit model and netlist interchange library for supported SPICE-family and structural Verilog-AMS constructs. Parsers and writers share a schema, but the Verilog-AMS path currently loses symbolic and string parameter values and treats analog bodies as opaque text; converted output needs review before simulation.
scope:
  design:
    ai: false
access: Public Python implementation with Lark/protobuf-based data models. Structural format support does not guarantee lossless parameter or behavioral translation; inspect converted output and supply required device modules separately.
addedAt: '2026-10-18'
reviewedAt: '2026-11-24'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/das-dias/morphnet
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/das-dias/morphnet/blob/63c7868826fe0c2ac7b9112aaa1ff7b6847694f8/README.md
- id: activity
  title: 'Merge pull request #8 from das-dias/dev/update-schema'
  url: https://github.com/das-dias/morphnet/commit/63c7868826fe0c2ac7b9112aaa1ff7b6847694f8
- id: implementation-1
  title: 'Released implementation: src/morphnet/_api.py'
  url: https://github.com/das-dias/morphnet/blob/63c7868826fe0c2ac7b9112aaa1ff7b6847694f8/src/morphnet/_api.py
- id: implementation-2
  title: 'Released implementation: src/morphnet/netlist/vams/writer.py'
  url: https://github.com/das-dias/morphnet/blob/63c7868826fe0c2ac7b9112aaa1ff7b6847694f8/src/morphnet/netlist/vams/writer.py
- id: website
  title: Official project website and documentation
  url: https://das-dias.github.io/morphnet/
  purpose: official
- id: vams-transformer
  title: Verilog-AMS parameter conversion and analog-block storage
  url: https://github.com/das-dias/morphnet/blob/63c7868826fe0c2ac7b9112aaa1ff7b6847694f8/src/morphnet/netlist/vams/transformer.py
- id: vams-grammar
  title: Structural Verilog-AMS grammar and supported parameter forms
  url: https://github.com/das-dias/morphnet/blob/63c7868826fe0c2ac7b9112aaa1ff7b6847694f8/src/morphnet/netlist/grammars/vams.lark
- id: vams-preprocessor
  title: Opaque analog-block preprocessing
  url: https://github.com/das-dias/morphnet/blob/63c7868826fe0c2ac7b9112aaa1ff7b6847694f8/src/morphnet/netlist/vams/preprocess.py
---

### Implementation and boundaries

Circuit/module construction and dialect conversion materially serve Design. The VAMS writer emits source rather than compiling or executing an electrical model, so Simulation is not assigned. The schema/model update and executable examples are substantive technical maintenance. This is the circuit-netlist project, not the unrelated neural-network MorphNet project. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

The Verilog-AMS grammar accepts a structural subset. Analog blocks are removed into placeholders and stored as raw text, not interpreted or translated into another simulator's behavioral equations. The transformer retains only one stored analog-block property per module, so this path does not preserve arbitrary multi-block behavioral models. [Grammar](#source-vams-grammar) · [Preprocessing](#source-vams-preprocessor) · [Module transformation](#source-vams-transformer).

More concretely, `pvalue_ident` and `pvalue_string` return empty `ParameterValue` objects, and the writer formats an empty value as `0`. Symbolic or string parameter declarations can therefore change during a parse/write round trip. The public numeric examples and structural schema remain useful for controlled inputs, but they do not establish general lossless conversion or simulator equivalence. No converter execution was reproduced in this review. [Parameter transformation](#source-vams-transformer) · [Writer fallback](#source-implementation-2).

### Reviewed activity

The meaningful checkpoint is `63c7868826fe0c2ac7b9112aaa1ff7b6847694f8` (2026-10-14 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).
