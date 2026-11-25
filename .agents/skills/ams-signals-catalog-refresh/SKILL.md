---
name: ams-signals-catalog-refresh
description: Capture Analog, Digital or Lab catalog activity snapshots. Use for new-article registration, targeted recapture or month rollover after editorial selection, not general catalog edits or traffic analytics.
---

# Catalog activity refresh

Input: the requested Analog, Digital and/or Lab catalogs. Read only the selected domain guide and the shared [activity contract](../../../docs/catalog/CONTRACT.md#reviewed-public-activity). Use current project records and their source notes. Commands below run from the repository root.

## Prepare the capture

Inspect the current snapshot, source records and working-tree changes. Preserve unrelated edits. Verify canonical repository identity, actual default branch and substantive first-parent changes before updating any meaningful date/SHA and its matching source. Mechanical latest commits are not automatically meaningful activity. Do not add/remove projects, change Scope/provenance or substitute hosts solely to make a refresh pass.

When a task includes selection or retention, apply the shared [selection and retention criteria](../../../docs/catalog/CONTRACT.md#project-selection-and-retention) to existing and new entries before capture. Resolve the editorial decision first; development-branch evidence can support it but must not be added to the default-branch snapshot.

Resolve repository moves against the canonical metadata and numeric identity; old README install URLs and redirected namespaces do not establish separate projects. Keep the reviewed implementation revision distinct from the meaningful activity checkpoint. Inspect the selected change and its retained code/tests; a substantive commit visible in an API listing can still be on a merged side branch and fail the first-parent requirement.

## Distinguish editorial review from recapture

For an updated checkpoint inside the existing captured first-parent history, follow the shared activity contract: edit the meaningful date/SHA and matching primary source, preserving the raw counts, head and timestamps. Keep historical source IDs used by article links or development evidence. A source revision beyond the captured head may be discussed in the article but needs a verified recapture before advancing the stored checkpoint. Digital and Lab do not accept activity-record `notes`; retain reasoning in the article. Analog's optional notes are not a shared capture field.

For existing Digital/Lab entries, the current validator requires the article review date not to follow the snapshot review date. When a later-day editorial update would exceed that date, capture first against the previously valid article and checkpoint, then apply the reviewed metadata and meaningful-source update. Do not backdate a review or relabel a capture to bypass the constraint.

## Capture GitHub activity

Use the existing manual command for the selected domain:

```bash
npm run refresh:analog-activity
npm run refresh:digital-activity
npm run refresh:lab-activity
```

Run only the requested command(s), not all by default. They use Git and GitHub metadata, recapture GitHub history, preserve manually reviewed fields and non-GitHub records, then validate and atomically replace the complete snapshot. Use `-- --project=<slug>` for a targeted recapture; untouched GitHub records retain their actual capture timestamps. New catalog articles register from their canonical GitHub Code source and explicit `activity` commit source. The scripts derive capture/review dates from actual UTC capture; do not invent historical captures. Normal builds must remain offline with respect to repository hosts.

Repeat `--project=<slug>` for multiple targets. Finish coordinated additions and removals before running a domain's capture; keep existing article dates/checkpoints valid for its preflight as described above. Use one writer per snapshot. Registration also discovers every new or `unfetched` article in that domain during targeted runs; inspect that complete set, not just the named targets. Before accepting a same-month diff, compare unselected records with the original snapshot, allowing only an explicit individual `capturedAt` that preserves the original observation time.

## Non-GitHub evidence and month rollover

For non-GitHub monthly records, inspect the canonical host directly, pin identity/branch/head/capture time and recapture complete first-parent UTC buckets. Do not borrow mirrors or silently shift old buckets to a new month. On month rollover, coordinate a complete internally consistent candidate snapshot, including manual captures; inspect the existing validator/refresh entry conditions rather than patching production JSON blindly. Point evidence retains its actual reviewed event date/type/source, with no synthetic commits.

Before month rollover, identify existing records whose only visible signal will fall out of the twelve-month band. Check canonical upstream first. Pending pull requests must not contribute repository buckets. Documentation-only commits remain in captured first-parent counts, but do not by themselves advance meaningful activity or renew eligibility. If a record no longer qualifies, curate the article and activity record together before retrying the refresh.

## Validate and finish

A failed existing capture, changed identity, expired eligibility or inconsistent window is not a successful refresh. Preserve the checked-in snapshot, record the exact blocker and resolve reviewable issues within the request. A failed new GitHub capture may register as `unfetched`, visibly without synthetic activity; retry it before claiming reviewed freshness. Do not weaken validation or relabel stale evidence as fresh. A curation decision such as removing an expired project must be explicit in the review, not a hidden consequence of the refresh script.

Review the complete JSON and source diff, run the applicable [verification](../../../docs/TESTING.md), and leave the requested reviewable change. Report snapshot/capture dates, refreshed domains, substantive source changes, retained manual records, checks and any unresolved access/eligibility issue. Preserve Golden data and unrelated catalog metadata. A refresh does not authorize merge, deployment, external model/EDA experiments or account configuration changes.
