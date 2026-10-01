---
name: "EQY"
aliases: []
description: "Yosys-based formal equivalence-checking flow that matches and partitions reference and transformed designs. Configurable proof strategies work on the partitions, making it possible to inspect which portions were proven and which remain failed, timed out or unproven."
scope:
  verification:
    ai: false
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Canonical EQY repository"
    url: "https://github.com/YosysHQ/eqy"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/YosysHQ/eqy/blob/7a92d8441aa442dd1b5543458d6f1060a8f85dd1/README.md"
  - id: "implementation"
    title: "Reviewed implementation: src/eqy.py"
    url: "https://github.com/YosysHQ/eqy/blob/7a92d8441aa442dd1b5543458d6f1060a8f85dd1/src/eqy.py"
  - id: "activity"
    title: "Fix Windows CRLF in summary_targets.list breaking bash while-read (#100)"
    url: "https://github.com/YosysHQ/eqy/commit/4a72eb94fc253062464afee4d0018359017bb846"
  - id: "website"
    title: "Official project documentation"
    url: "https://yosyshq.readthedocs.io/projects/eqy/"
    purpose: "official"
---


### Implementation context

EQY prepares gold and gate designs with Yosys, matches their state and signals, partitions the comparison and schedules configured proof strategies. Per-partition logs and summaries preserve passed, failed, timed-out and unproven results rather than flattening them into one successful proof. [Driver implementation](#source-implementation); [project overview](#source-readme).

### Release boundary

Reviewed October 1, 2026 at `7a92d8441aa442dd1b5543458d6f1060a8f85dd1`. The September 16 head loosens a timeout regression match to accommodate differing partition names. The retained September 3 meaningful change fixes Windows CRLF handling in generated summary targets; proof outcomes still distinguish success, timeout and failure. [Current project source](#source-readme); [meaningful activity](#source-activity).

### Scope classification

Partitioned equivalence proofs are the user-facing task. Yosys preparation and transformations serve that proof flow, not a separate synthesis deliverable. [Reviewed source](#source-readme).

Partitioned equivalence checking is conventional Verification. Synthesis preparation is an internal dependency, not another user-facing stage or AI operation. [AI/stage evidence](#source-readme).
