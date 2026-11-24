---
name: "JumperlOS"
aliases: ["Jumperless V5"]
description: "Firmware for Jumperless prototyping hardware with programmable interconnections, GPIO, DAC and ADC functions. It manages routing and saved setups for bench fixtures where low-frequency circuits need repeatable electrical connections and basic measurements."
scope:
  control: { ai: false }
  acquisition: { ai: false }
access: "MIT firmware; Jumperless V5 hardware and documentation have separate licenses."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/Architeuthis-Flux/JumperlOS"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/Architeuthis-Flux/JumperlOS/commit/a0736901096e0440e7a05cb7ceafc77e49d07b2c"
  - id: hardware
    title: "Jumperless V5 hardware and its separate terms"
    url: "https://github.com/Architeuthis-Flux/JumperlessV5"
  - id: automation-migration
    title: "Firmware repository notice of agent automation migration"
    url: "https://github.com/Architeuthis-Flux/JumperlOS/blob/5374d38da2d31d5a481b8eb81be904c4d8bc8ec7/jumperless_skill/jumperless_skill.md"
---

## Scope and limits

The reviewed routing repair refuses an invalid power-net join. Routing resistance, loading and bandwidth matter; this is not a calibrated fast-clock or phase-noise fixture. The published V5 hardware-in-loop instructions are not a result of our own hardware test.

[Reviewed upstream implementation](#source-activity).

Additional context: [Jumperless V5 hardware and its separate terms](#source-hardware).

This listing follows the firmware's routing, stimulation and measurement operations. Board fabrication artifacts belong to the separate hardware repository. The retained agent-skill document is explicitly superseded by a separate automation project, so neither Board coverage nor runtime AI is inherited from those companion repositories. [Automation migration](#source-automation-migration).
