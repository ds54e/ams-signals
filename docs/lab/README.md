# Lab catalog

Lab catalogs public technical projects for evaluation boards and fixtures, instrument and DUT control, measurement acquisition and analysis, and test automation. Its hidden H1 is `Lab` and browser title `Lab · AMS Signals`. It is independent of the Golden Events corpus. See the [shared catalog contract](../catalog/CONTRACT.md) and [AI-development policy](../AI_DEVELOPMENT.md).

Classify by the primary operation and inputs/outputs. A network or EM field solver remains Analog even if it takes board files; an RTL or on-chip DFT tool remains Digital. A program that controls a DUT, acquires measurements or processes tester records belongs in Lab. A GUI and a separately usable API may each have an entry, but shared engines, parsers and instrument stacks are not independent evidence; record their relationships in notes and sources.

## Scope

| Scope | Meaning |
| --- | --- |
| Board & Fixture (`board`) | Evaluation board or fixture designs, calibration hardware, and concrete fabrication or assembly outputs |
| Control (`control`) | Configuration, stimulation, programming or control of an instrument, DUT, fixture, power or thermal system |
| Acquisition (`acquisition`) | Capturing or retrieving values, traces or timestamps through an active instrument, DUT or live data path |
| Analysis (`analysis`) | Inspecting, interpreting, decoding or converting recorded measurements as a distinct operation |
| Test Automation (`test`) | Executable measurement/test procedures, fixture scheduling, test cases, verdicts or results |

Reading a saved TDMS or WFM file is Analysis, not Acquisition. Export or decompression that only exposes a live capture is part of Acquisition, not a second Analysis workflow. Issuing flash, reset or switch commands is Control; allowing calls from a script does not make the tool a test runner. An implemented test harness, virtual instrument for driver regression, or reservation and coordination of shared fixtures can qualify as Test Automation. Listing support for a target board does not make an SDK a source of board designs.

Board & Fixture requires implemented schematic, PCB, fabrication, assembly or fixture-design outputs. Firmware, FPGA board definitions and instrument SDKs do not inherit that stage from the hardware they target. ERC/DRC preflight and fabrication-package checks remain part of the Board workflow; they do not independently establish Test Automation. Ordinary package unit tests also do not add that stage. Instrument-driver fixtures and executable DUT or measurement procedures are distinct user-facing test workflows.

Reusable measurement procedures that coordinate settings, parameter sweeps, acquisition and persisted results can establish Test Automation without a pass/fail verdict. An incidental capture loop or general scriptable API does not establish that separate procedure workflow.

Use the [strict Lab schema](../../src/lib/lab/schema.ts). Require at least one functional stage. Each stage records runtime AI separately from evidence-backed AI-ASSISTED development. Keep descriptions concise, in English, and distinguish public source from hardware, calibration, instrument specifications and third-party dependencies. Put limits and references in article notes; do not imply that simulation, source inspection or a synthetic check demonstrates hardware accuracy.

## Active-list eligibility

Apply the shared [selection and retention criteria](../catalog/CONTRACT.md#project-selection-and-retention), including [freshness and active-list eligibility](../catalog/CONTRACT.md#freshness-and-active-list-eligibility), to new and existing entries. For Lab, review a meaningful public implementation or test change.

Use the canonical implementation, not a mirror or companion repository. For a reviewed maintained fork used as the canonical implementation, bind the refresh allowance to its catalog slug, repository name and exact GitHub ID. Link the origin separately when it explains lineage, without adding its activity to the maintained fork's counts. The manual refresh entrypoint owns the exact exceptions.

Run `npm run validate:lab` for the content and snapshot contract and `npm run refresh:lab-activity` only when explicitly collecting activity. Use the [catalog refresh skill](../../.agents/skills/ams-signals-catalog-refresh/SKILL.md) for new registrations, captures and rollover. A failed new fetch remains marked unfetched without guessed counts; an existing good snapshot is not overwritten on failure. Build and tests work from checked-in records without contacting repository hosts.

The public surface is `/lab/`. Search, functional Scope filters, `#<id>--name` anchors and primary links follow the shared catalog index. No public ranking, status taxonomy, project detail route or JSON export is defined.
