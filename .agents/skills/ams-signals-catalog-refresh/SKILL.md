---
name: ams-signals-catalog-refresh
description: Refresh Analog/Digital catalog activity snapshots. Use for activity recapture or month rollover, not general catalog edits or traffic analytics.
---

# Catalog activity refresh

Input: the requested Analog, Digital or both catalogs. Read only the selected domain guide and the shared [activity contract](../../../docs/catalog/CONTRACT.md#reviewed-public-activity). Use existing project records and their source notes, not historical expansion reports. Commands below run from the repository root.

## Review and capture

Inspect the current snapshot, source records and working-tree changes. Preserve unrelated edits. Verify canonical repository identity, actual default branch and substantive first-parent changes before updating any meaningful date/SHA and its matching source. Mechanical latest commits are not automatically meaningful activity. Do not add/remove projects, change Scope/provenance or substitute hosts solely to make a refresh pass.

Use the existing manual command for the selected domain:

```bash
npm run refresh:analog-activity
npm run refresh:digital-activity
```

Run only the requested command(s), not both by default. They use Git/gh, recapture GitHub history, preserve manually reviewed fields and non-GitHub records, then validate and atomically replace the complete snapshot. The scripts derive capture/review dates from actual UTC capture; do not invent historical captures or unsupported command flags. Normal builds must remain offline with respect to repository hosts.

For non-GitHub monthly records, inspect the canonical host directly, pin identity/branch/head/capture time and recapture complete first-parent UTC buckets. Do not borrow mirrors or silently shift old buckets to a new month. On month rollover, coordinate a complete internally consistent candidate snapshot, including manual captures; inspect the existing validator/refresh entry conditions rather than patching production JSON blindly. Point evidence retains its actual reviewed event date/type/source, with no synthetic commits.

A failed capture, changed identity, expired eligibility or inconsistent window is not a successful refresh. Preserve the checked-in snapshot, record the exact blocker and resolve reviewable issues within the request. Do not weaken validation, relabel stale evidence as fresh or publish partial results. A curation decision such as removing an expired project must be explicit in the review, not a hidden consequence of the refresh script.

## Finish

Review the complete JSON and source diff, run the applicable [verification](../../../docs/TESTING.md), and leave the requested reviewable change. Report snapshot/capture dates, refreshed domains, substantive source changes, retained manual records, checks and any unresolved access/eligibility issue. Preserve Golden data, Article bodies, unrelated catalog metadata and `/export.json`. A refresh does not authorize merge, deployment, external model/EDA experiments or account configuration changes.
