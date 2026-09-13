## Summary

- add three Analog catalog projects: cocotbext-ams, IHP SG13G2 AMS Chip Template, and gLayout
- add three Digital catalog projects: UVM 2020-3.2 RI, pyuvm, and RTLScout
- refresh Analog and Digital activity snapshots to 2026-09-14 using the existing first-parent activity logic
- reassess Razavi-Bench after its default branch was republished as a parentless root snapshot
- document the bounded 2026-09-14 catalog review

## Validation

- one-shot activity refresh completed successfully for Analog and Digital
- `npm run check` passed after the refreshed activity data was generated
- normal PR CI will run deterministic checks plus production-preview smoke tests

## Boundaries

- no visible page-level "Last updated" UI was added; the catalog snapshot date is updated in the activity data
- UVM 2020-3.2 uses a public-update signal because Accellera's downloadable 3.2 state is newer than the public GitHub release line
- no GitHub Pages deployment is requested by this PR
