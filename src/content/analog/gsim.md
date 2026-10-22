---
name: "gsim"
aliases: []
summary: "Simulation interface connecting GDSFactory layouts to electromagnetic solvers through geometry, meshing and port setup."
description: "Simulation interface connecting GDSFactory layouts to electromagnetic solvers through geometry, meshing and port setup. Local and cloud workflows have backend-specific requirements, including GDSFactory+ dependencies; the reviewed package constrains GDSFactory to version 9 rather than supporting arbitrary current core releases."
scope:
  simulation:
    ai: false
access: "Public Python implementation; the declared GDSFactory/GDSFactory+ versions and selected local solver or cloud access are required."
addedAt: "2026-10-22"
reviewedAt: "2026-10-22"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/gdsfactory/gsim"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/gdsfactory/gsim/blob/0b3a3a1c9d8e9e2fe54ff0e766a9b11064dfc97a/README.md"
  - id: "implementation-1"
    title: "Reviewed source: pyproject.toml"
    url: "https://github.com/gdsfactory/gsim/blob/0b3a3a1c9d8e9e2fe54ff0e766a9b11064dfc97a/pyproject.toml"
  - id: "implementation-2"
    title: "Reviewed source: src/gsim/palace/__init__.py"
    url: "https://github.com/gdsfactory/gsim/blob/0b3a3a1c9d8e9e2fe54ff0e766a9b11064dfc97a/src/gsim/palace/__init__.py"
  - id: "activity"
    title: "Reviewed meaningful change: fix(palace): detect connected conductor necks and notches (#384)"
    url: "https://github.com/gdsfactory/gsim/commit/f3e032c5a14a5e769c955f9a49407b82339e53e8"
---

### Implemented operations and boundaries

The reviewed pyproject is version 0.7.0 and requires gdsfactory>=9,<10 and gdsfactoryplus>=1.8.20,<3. These constraints matter because the separately reviewed core main is version 10. Local solver dependencies and authenticated cloud operations are separate paths.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Simulation. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-10-21T17:29:52Z (`f3e032c5a14a5e769c955f9a49407b82339e53e8`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
