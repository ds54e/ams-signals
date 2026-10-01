---
name: "pyuvm"
aliases: ["Python UVM"]
description: "Implements widely used UVM concepts in Python on top of cocotb, including components, factory, phasing, TLM, sequences and a developing register layer. The project deliberately does not claim complete IEEE 1800.2 coverage; its documentation identifies remaining register-model gaps and unimplemented UVM memory functionality."
scope:
  verification:
    ai: false
access: "Open-source Python package installable with pip; cocotb supplies simulator interaction and scheduling."
addedAt: "2026-09-14"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Canonical pyuvm repository"
    url: "https://github.com/pyuvm/pyuvm"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/pyuvm/pyuvm/blob/fb7b268d0a16ab964805f86d8715f8d862e9518c/README.md"
  - id: "activity"
    title: "Adopt src package layout"
    url: "https://github.com/pyuvm/pyuvm/commit/f8355f3590142c26309eedc141fd7856552feaf7"
---

### Verification scope

pyuvm implements common UVM objects/components, factory, phasing, TLM, sequences and register-model functionality in Python, using cocotb for simulator interaction and event scheduling. These are conventional Verification operations. [Current implementation overview](#source-readme).

### Coverage boundary

The current IEEE 1800.2 coverage table still marks UVM Memory unimplemented and describes backdoor, byte-access and field-access gaps in register support. The project is a practical Python UVM implementation, not a claim of complete standards parity. [Coverage table](#source-readme).

### Reviewed activity

The August 31 packaging change moves the implementation into a src layout and adjusts build, documentation and tooling paths. The subsequent reviewed first-parent history through September 28 consists of release/dependency/pre-commit maintenance; it does not replace this substantive checkpoint. [Meaningful update](#source-activity).
