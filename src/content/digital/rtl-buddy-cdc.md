---
name: "rtl-buddy-cdc"
aliases: []
description: "Experimental structural CDC/RDC analyzer using Yosys or slang elaboration, clock constraints and configurable synchronizer recognition. It emits findings and domain maps with waiver support; runs without SDC skip rule checking, and unknown domains or unsupported structures require explicit review."
scope:
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for correcting synchronizer-chain recognition through per-stage synchronous-reset multiplexers. The canonical rule engine retains the reset-mux index and chain-walking logic."
  sources: [activity, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public Python implementation; Yosys or supported pyslang, SDC constraints and optional Tcl runtime are required."
addedAt: "2026-10-22"
reviewedAt: "2026-11-25"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/rtl-buddy/rtl-buddy-cdc"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/rtl-buddy/rtl-buddy-cdc/blob/df996d55af0e8b824183d03d531426b8601af429/README.md"
  - id: "implementation-1"
    title: "Reviewed source: src/rtl_buddy_cdc/cli.py"
    url: "https://github.com/rtl-buddy/rtl-buddy-cdc/blob/df996d55af0e8b824183d03d531426b8601af429/src/rtl_buddy_cdc/cli.py"
  - id: "implementation-2"
    title: "Reviewed source: src/rtl_buddy_cdc/sdc.py"
    url: "https://github.com/rtl-buddy/rtl-buddy-cdc/blob/df996d55af0e8b824183d03d531426b8601af429/src/rtl_buddy_cdc/sdc.py"
  - id: "implementation-3"
    title: "Reviewed source: docs/cdc-lint-coverage-survey.md"
    url: "https://github.com/rtl-buddy/rtl-buddy-cdc/blob/df996d55af0e8b824183d03d531426b8601af429/docs/cdc-lint-coverage-survey.md"
  - id: "activity"
    title: "Reviewed meaningful change: fix(rules): step over per-stage sync-reset mux in separate-flop sync chains (#304) (#305)"
    url: "https://github.com/rtl-buddy/rtl-buddy-cdc/commit/df996d55af0e8b824183d03d531426b8601af429"
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/rtl-buddy/rtl-buddy-cdc/blob/df996d55af0e8b824183d03d531426b8601af429/src/rtl_buddy_cdc/rules.py
  - id: interface-fifo-integration
    title: "November 19 interface-port lowering and FIFO register-array recognition"
    url: "https://github.com/rtl-buddy/rtl-buddy-cdc/commit/3916c663e9d2ff6310782067060d7667866b622c"
  - id: interface-regressions
    title: "Retained interface port, liveness and crossing regressions"
    url: "https://github.com/rtl-buddy/rtl-buddy-cdc/blob/3916c663e9d2ff6310782067060d7667866b622c/tests/test_slang_iface_port_members.py"
  - id: fifo-regressions
    title: "Retained register-array memory recognition and CDC regression cases"
    url: "https://github.com/rtl-buddy/rtl-buddy-cdc/blob/3916c663e9d2ff6310782067060d7667866b622c/tests/test_regfile_memory.py"
---

### Implemented operations and boundaries

Without SDC the CLI skips rule evaluation and can return success for a structural summary. --no-findings intentionally suppresses rules; clock-trace depth, unknown domains, blackbox composition, waivers and user-sanctioned synchronizers change analyzed coverage. The safe-interpreter worker and tokenizer fallback are partial SDC reading paths, not arbitrary Tcl execution support.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3).

### Scope and activity review

The exposed operations support Verification. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The earlier meaningful checkpoint was 2026-09-28T05:29:15Z (`df996d55af0e8b824183d03d531426b8601af429`). November 19 supersedes it within the saved capture. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for correcting synchronizer-chain recognition through per-stage synchronous-reset multiplexers. The canonical rule engine retains the reset-mux index and chain-walking logic. This supports AI-ASSISTED. [Credited change](#source-activity) · [Retained implementation](#source-development-retained-20261022).

### November 19 implementation

The slang frontend now lowers top-level interface members to named netlist ports instead of dropping writes or making reads opaque. This preserves observable registers behind those ports; the retained regressions exercise liveness and CDC findings. A separate register-array recognition path identifies supported FIFO storage as memory and avoids a documented class of false positives, with tests comparing frontend verdicts. These are structural recognition and coverage corrections, not proof of general FIFO protocol safety, complete elaboration or signoff readiness. The source follows the 0.8.0 version bump; inclusion in that tagged release is not claimed. No CDC run was independently reproduced. [Integration](#source-interface-fifo-integration) · [Interface tests](#source-interface-regressions) · [FIFO tests](#source-fifo-regressions).
