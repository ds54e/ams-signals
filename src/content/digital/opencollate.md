---
name: "OpenCollate"
aliases: []
description: "Local-first consistency checker for RTL and implementation collateral including Liberty, LEF/DEF, SDC and UPF. Parsers and cross-view rules expose mismatches and unsupported facts, with revision-specific formal paths on main; it complements dedicated verification tools without providing comprehensive low-power or physical signoff."
scope:
  verification:
    ai: false
access: "Public Python implementation; supported parser inputs and optional formal dependencies are required by the chosen checks."
addedAt: "2026-10-22"
reviewedAt: "2026-11-24"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/ajayasai/OpenCollate"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/ajayasai/OpenCollate/blob/1d6b4ba2e1b379fc0fc6f19a49fea17c82c7713a/README.md"
  - id: "implementation-1"
    title: "Reviewed source: src/opencollate/cli.py"
    url: "https://github.com/ajayasai/OpenCollate/blob/1d6b4ba2e1b379fc0fc6f19a49fea17c82c7713a/src/opencollate/cli.py"
  - id: "implementation-2"
    title: "Reviewed source: src/opencollate/parsers/upf.py"
    url: "https://github.com/ajayasai/OpenCollate/blob/1d6b4ba2e1b379fc0fc6f19a49fea17c82c7713a/src/opencollate/parsers/upf.py"
  - id: "activity"
    title: "Reviewed meaningful change: Add manifest-bound native preprocessing with source-bound proof evidence"
    url: "https://github.com/ajayasai/OpenCollate/commit/1d6b4ba2e1b379fc0fc6f19a49fea17c82c7713a"
  - id: "release"
    title: "August 31 usable v0.3.0 release and its documented scope"
    url: "https://github.com/ajayasai/OpenCollate/releases/tag/v0.3.0"
  - id: "post-release-symbolic"
    title: "September 5 symbolic checks, guarded evidence replay and regression tests"
    url: "https://github.com/ajayasai/OpenCollate/commit/2445ef5cfad3d8019f01e686513684ef2243e165"
---

### Implemented operations and boundaries

The reviewed main includes native/preprocessing and bounded/formal paths absent from the older v0.3.0 tag. Format support is partial; unsupported UPF facts taint affected scope rather than establishing comprehensive low-power checking. View consistency does not replace dedicated RTL, timing or physical verification.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Verification. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-09-09T04:10:13Z (`1d6b4ba2e1b379fc0fc6f19a49fea17c82c7713a`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

After the August 31 v0.3.0 release, September 5 added optional symbolic checks and replayable guarded evidence; September 9 added manifest-bound preprocessing and corresponding verification tests. These are implemented extensions of a usable release. The observed implementation sequence remains concentrated in August 31–September 9, so longer-term maintenance is not yet established. The additional paths require the reviewed main revision; the v0.3.0 tag does not contain them. [Release](#source-release) · [Symbolic extension](#source-post-release-symbolic) · [Preprocessing extension](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
