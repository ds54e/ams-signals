---
name: "pyuvm"
aliases: ["Python UVM"]
description: "Implements widely used UVM concepts in Python on top of cocotb, including components, factory, phasing, TLM, sequences and a developing register layer. The project deliberately does not claim complete IEEE 1800.2 coverage; its documentation identifies remaining register-model gaps and unimplemented UVM memory functionality."
scope:
  verification:
    ai: false
access: "Open-source Python package installable with pip; cocotb supplies simulator interaction and scheduling."
addedAt: "2026-09-14"
reviewedAt: "2026-09-14"
sources:
  - id: "code"
    title: "Canonical pyuvm repository"
    url: "https://github.com/pyuvm/pyuvm"
    purpose: "code"
  - id: "readme"
    title: "pyuvm README and IEEE 1800.2 coverage table"
    url: "https://github.com/pyuvm/pyuvm/blob/a87a7386c765c5d810645ac18683a340cec0f6cc/README.md"
  - id: "activity"
    title: "Adopt src package layout"
    url: "https://github.com/pyuvm/pyuvm/commit/f8355f3590142c26309eedc141fd7856552feaf7"
---

### Verification scope

pyuvm maps familiar UVM structure into Python and uses cocotb for handles, scheduling and simulator access. Its documented implementation covers the common object/component, factory, phasing, TLM and sequence families plus substantial RAL work. [Reviewed source](#source-readme).

### Coverage boundary

The project's own coverage table leaves UVM Memory unimplemented and notes incomplete backdoor, byte-access and field-access behavior in parts of the register layer. The catalog therefore describes pyuvm as a practical Python UVM implementation without treating it as complete IEEE 1800.2 parity. [Coverage table](#source-readme).

### Activity

The latest substantive reviewed maintenance moved the package into a `src` layout and updated packaging, documentation and tooling paths. Later September commits are dependency/pre-commit maintenance and remain visible in the mechanical activity strip without redefining this meaningful-activity checkpoint. [Meaningful update](#source-activity).
