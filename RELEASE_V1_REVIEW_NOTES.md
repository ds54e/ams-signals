# AMS Signals v1 — Release Readiness Review Notes

Temporary companion to `RELEASE_V1.md`. Remove both after the readiness PR is merged.

These notes come from reasoning through the actual private-to-public transition against the current repository state.

## Public means more than the current `main` tree

A repository visibility change exposes more than the files currently visible on `main`.

Before recommending public release, audit:

- current `main` tree;
- reachable Git history, including deleted temporary briefs;
- remote branches;
- closed pull-request titles, bodies, comments, and review threads;
- issue metadata/comments if any;
- commit author/committer metadata where relevant.

Do not assume that deleting a temporary file from `main` makes its historical content private.

The current repository still has these non-main remote branches:

- `bootstrap-v1`
- `source-status-foundation`
- `research/apple-v1`
- `research/wave1-v1`
- `feat/visualization-v1`
- `feat/analysis-v1`

These branches are currently private because the repository is private, but they will become publicly browsable if the repository visibility changes. The readiness PR should identify which are fully merged and safe to delete before publication. Do not delete remote branches automatically unless that cleanup is explicitly part of the approved release action; instead provide the exact cleanup list in the final publication checklist.

Likewise, earlier PR bodies intentionally contain research reasoning, unresolved questions, and hypotheses. That is acceptable only if the audit determines that this material is safe to expose publicly. If a PR body/comment contains genuinely private information, editing the current tree will not solve it.

## Current repository metadata to account for

At the start of this pass the repository is private, Pages is not enabled, and GitHub reports no repository license.

Treat those as explicit release decisions, not implementation bugs.

`noindex, nofollow` on the generated site does not prevent discovery of a public GitHub repository, its branches, commits, or pull requests.

## Dependency reproducibility

The repository currently has no `package-lock.json` even though CI installs npm dependencies.

For v1 readiness, prefer generating and committing the npm lockfile and changing CI to `npm ci` rather than continuing with an unconstrained transitive dependency install.

Keep `"private": true` in `package.json`; it prevents accidental npm publication and is unrelated to GitHub repository visibility.

The package currently reports version `0.1.0`. Before tagging the product as v1.0, either align the package metadata to `1.0.0` in the readiness PR or explain why the package version is intentionally unrelated. Because this is a private npm package, this is consistency metadata rather than a publishing requirement.

## Keep browser smoke tests separate from the fast content check

A small Playwright smoke suite is worthwhile, but do not make ordinary `npm run check` require an installed browser.

Preferred split:

- `npm run check` — deterministic content/schema/link/build checks, fast for research/content work;
- `npm run test:smoke` (or similarly named command) — production-preview browser smoke tests;
- CI runs both, installing only the Chromium browser needed by the smoke suite.

Keep the suite small and behavior-oriented. Do not check exact pixel positions or freeze the current Event count unnecessarily.

If Playwright materially increases CI fragility or runtime, retain a deterministic built-link audit in `npm run check` and run browser smoke in a separate CI job so failures are diagnosable.

## Source availability audit should be risk-based

Most Golden sources were already checked on the current review date. Re-requesting every external URL immediately can create noise from bot protection, locale redirects, authentication walls, rate limits, and transient errors.

For this release pass, prioritize:

- sources already marked `unavailable`;
- secondary/recovery mirrors that carry otherwise-lost historical facts;
- the strongest evidence anchors used in the first Analysis article;
- source URLs that looked unstable during earlier research;
- representative official job/paper/standards/business sources across modalities.

Do not churn `checkedAt` across the whole corpus merely because the release pass ran on the same date.

If broader checking is performed, classify failures carefully before changing `status`.

## License decision may differ for code and editorial/data content

Do not automatically recommend or add MIT, Apache, Creative Commons, or another license merely because the repository will become public.

The owner may want different reuse terms for:

- website/tool source code;
- Golden factual compilation and source summaries;
- Analysis/editorial writing.

A single generic license may therefore be the wrong decision. The readiness PR should state the current no-license condition clearly and leave the reuse-policy choice to the owner unless an explicit instruction exists.

No license is not a technical blocker to making the repository publicly viewable, but it should be an intentional decision rather than an omission.

## README must survive the visibility flip

The current README states that the repository is private while v1.0 is being built. Avoid replacing that with another sentence that becomes false immediately after publication.

Prefer wording that remains accurate before and after the visibility change, for example by describing the publication policy and current deployment state rather than hard-coding repository privacy as a durable fact.

After the readiness PR is merged, changing repository visibility and running the prepared deployment should not require another documentation commit just to correct stale status text.

## Pages workflow should be inert until explicitly invoked

If a Pages workflow is checked in during readiness, it should remain manual-only and must not deploy on `push` to `main` yet.

The intended transition is:

1. readiness PR merged;
2. owner resolves release decisions such as license and branch cleanup;
3. owner intentionally makes the repository public;
4. owner confirms Pages configuration/eligibility;
5. owner manually invokes the prepared deployment workflow;
6. deployed site is smoke-tested;
7. only then create the v1.0 tag/release.

Do not make the repository visibility change itself a prerequisite hidden inside automation.

## Branch cleanup is a release gate, not history erasure

Deleting merged working branches before publication reduces clutter and prevents temporary branch-tip files from being immediately browsable.

It does **not** erase their commits from merged Git history. Therefore:

- first decide whether the historical content is safe;
- then clean up merged remote branches for presentation/hygiene;
- rewrite history only if the audit finds genuinely private or secret material, and never do that automatically in this pass.

## Release recommendation should have explicit blocker classes

The final PR should separate blockers from non-blocking owner decisions.

Examples of **blockers**:

- leaked credential or non-public company data in tree/history/PR metadata;
- broken primary navigation or base-path routing;
- deterministic build/check failure;
- materially unsupported Golden claim found during release audit;
- deployment workflow that cannot produce the configured static site.

Examples of **owner decisions / non-blockers** when explicitly acknowledged:

- choosing no license versus separate code/content licenses;
- keeping `noindex, nofollow`;
- whether to delete already-merged working branches before visibility change;
- whether to expose a repository description/topics;
- exact timing of the v1.0 tag after deployed-site verification.

The recommendation `ready for intentional public release` should mean that no technical/editorial blocker remains and the remaining actions are explicit owner publication choices.

## Minimal final publication sequence

A successful readiness pass should reduce launch to roughly:

1. merge readiness PR;
2. review the audit of history, PR metadata, and merged branches;
3. resolve license/reuse policy and clean merged branches as desired;
4. intentionally make the repository public;
5. configure/confirm Pages and manually deploy;
6. run critical smoke checks on the public URL;
7. confirm `noindex, nofollow` remains present;
8. create the v1.0 tag/release.

If significantly more engineering is still required after the readiness PR, the pass is not complete.