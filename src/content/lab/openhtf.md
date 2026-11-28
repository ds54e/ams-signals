---
name: "OpenHTF"
aliases: ["Open Hardware Test Framework"]
description: "Python framework for hardware test stations and production test sequences. Test phases, instrument plugs, measurement validation and run records support distinct failure and incomplete-run outcomes. Experimental PhaseGraph recipes also execute dependency-linked and nested phases concurrently, with explicit teardown behavior."
scope:
  test: { ai: false }
access: "Apache-2.0."
addedAt: "2026-11-24"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical project source"
    url: "https://github.com/google/openhtf"
    purpose: code
  - id: activity
    title: "Reviewed implementation or test change"
    url: "https://github.com/google/openhtf/commit/916885e625130e2b0e2fe7b81b1b96ec3f11c973"
  - id: phase-graph-collections
    title: "October 29 nested phase collections and teardown-aware cancellation"
    url: "https://github.com/google/openhtf/commit/87426bad5bc3d846b3025a2dc18987e020cedb00"
  - id: phase-graph-tests
    title: "Retained nested graph and teardown regression cases"
    url: "https://github.com/google/openhtf/blob/9f7371af4e210fddbba1cd9afdd62700b57d74a2/test/core/phase_graph_test.py"
  - id: phase-graph-example
    title: "November 13 standalone parallel test recipe"
    url: "https://github.com/google/openhtf/commit/2ea7793293e6c076aa59254ad75788eec3ff2c49"
  - id: recipe-visualization
    title: "November 13 recipe topology export without executing phases"
    url: "https://github.com/google/openhtf/commit/bb54f80e84d28f1bf6cda667d9c17e4001bfefa8"
  - id: graph-example-retained
    title: "Retained concurrent sequence and group example"
    url: "https://github.com/google/openhtf/blob/9f7371af4e210fddbba1cd9afdd62700b57d74a2/examples/phase_graph.py"
  - id: related-benchloom-graph
    title: "Benchloom graph-to-Lua compiler"
    url: "https://github.com/criscrafter/benchloom/blob/c06716087f54d39a499e8c433eb32e9634762487/src/benchloom/graph.py"
---

## Scope and limits

Use explicit missing-measurement and incomplete-run handling. Phase outcomes do not establish the physical validity of a fixture.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.

## Reviewed implementation and retention, November 25, 2026

The October 23 concurrent PhaseGraph executor is extended on October 29 to support named sequences, phase groups and nested graphs. Its cancellation path stops unstarted nodes and active non-teardown work while allowing teardown to complete unless forced to stop; retained tests exercise nested execution, sibling failure and abort. November 13 adds topology export without executing phases and a runnable multi-lane example demonstrating state sharing and teardown. Parallel phases remain a beta feature with an evolving API; a software teardown guarantee does not establish safe instrument cleanup or synchronized physical stimulus. [Nested execution](#source-phase-graph-collections) · [Tests](#source-phase-graph-tests) · [Example integration](#source-phase-graph-example) · [Topology export](#source-recipe-visualization) · [Example](#source-graph-example-retained).

The selected meaningful checkpoint in the saved capture is 2026-11-13 UTC. Source inspection only; no physical test, regression or instrument run was independently reproduced.

## Selection boundary

OpenHTF's PhaseGraph example composes Python test phases with dependency edges, shared plug state and teardown. It is not a visual test-program compiler: Benchloom separately compiles user-authored execution and data-flow graphs into Lua. The two provide different test-authoring entry points, even though both use graphs. [Phase graph example](#source-graph-example-retained) · [Benchloom compiler](#source-related-benchloom-graph).
