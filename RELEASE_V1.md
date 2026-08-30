# AMS Signals v1 — Public Release Readiness

Temporary release-readiness brief. Remove after the readiness PR is merged and the durable release rules are folded into the appropriate project docs.

Read `PROJECT_CONTEXT.md` and `AGENTS.md` first.

## Goal

Make the repository technically and editorially ready for an intentional v1.0 public release **without making the repository public or deploying the site in this pass**.

The output should be a reviewable PR after which publication is a small explicit human action, not another engineering project.

Do not change repository visibility, create a GitHub Release/tag, or publish GitHub Pages as part of this task.

## Current state to preserve

The current product already has:

- a factual Golden Timeline;
- 37 Golden Events across 17 company records and one People record;
- multi-company timeline/search/evidence inspection;
- stable Event permalinks;
- a separate Markdown Analysis layer;
- CI validation/build;
- `site: https://ds54e.github.io` and `base: /ams-signals` in Astro;
- `<meta name="robots" content="noindex, nofollow">` on the site.

The release pass should harden this system, not redesign it.

## Publication boundary

Treat these as separate actions:

1. **Release readiness** — this PR.
2. **Repository visibility change** — explicit human decision after review.
3. **Pages deployment** — explicit human action after visibility/plan requirements are confirmed.
4. **v1.0 tag/release** — only after the deployed site has been verified.

Do not collapse them into one automatic workflow.

A public repository is itself discoverable even if the generated website uses `noindex`. `noindex` is not access control. Do not imply otherwise.

## Keep search-engine indexing disabled

For v1, preserve `noindex, nofollow` unless the project owner explicitly changes that policy later.

Public availability and search-engine indexing are separate decisions. The intended first release may be shared directly by URL without intentionally optimizing for discovery.

Do not add sitemap/RSS/analytics merely for launch readiness.

## 1. Repository/publication safety audit

Before preparing deployment, inspect the **current tree and Git history** for material that should not become public.

Check for at least:

- credentials, API keys, tokens, passwords, private URLs, or secrets;
- local absolute paths, machine/user-specific configuration, or accidental environment files;
- private notes, scratch research, raw browser dumps, source snapshots, or downloaded evidence archives;
- internal/non-public semiconductor data or claims that are not based on public sources;
- temporary research/implementation briefs that have already served their purpose;
- accidental personal data beyond what is intentionally present in public sources/repository authorship;
- generated build artifacts or dependency trees accidentally tracked.

Use lightweight repository/history inspection rather than adding a permanent security platform unless a real need appears.

If a secret or genuinely private artifact is found in Git history, do not merely delete it in a new commit and declare the repository safe. Surface it prominently in the PR because history rewriting/credential rotation may be required before publication.

Do not rewrite Git history automatically in this pass.

## 2. Golden/public-source release audit

Perform a final targeted audit of the public factual corpus.

### Fact discipline

Spot-check representative Events across source modalities:

- company-authored paper;
- job posting;
- professional-profile/affiliation Event;
- vendor/customer material;
- standards/ecosystem Event;
- business/M&A Event;
- Event with an unavailable original source;
- multi-source Event;
- shared multi-company Event.

Confirm that source modality is still preserved and no factual Event contains Analysis-like inference.

Do not rewrite good Events merely for stylistic consistency.

### Source availability

Check the current representative source URLs before release.

For each source that is materially important to the public record:

- verify whether it is currently reachable where practical;
- distinguish a genuinely removed source from bot blocking, login/interstitial behavior, locale redirects, or transient network errors;
- update `status` only when the availability conclusion is responsible;
- prefer a stronger stable replacement source when one is available and supports the same factual claim;
- retain historical Events when an original source disappeared if they were responsibly verified and the Event remains supportable;
- do not create a source archive or download evidence into the repository.

Do not add external URL availability checks to CI. External websites are too unstable for deterministic builds.

Because this release pass occurs on the same review date as much of the current corpus, avoid noisy `checkedAt` churn when nothing materially changed.

## 3. Deterministic internal-link audit

Keep internal references deterministic and build-time verifiable.

Validate at least:

- Timeline -> Event;
- Timeline -> Company / Person;
- Analysis index -> article;
- Analysis -> Golden Event;
- Event -> linked Company / Person;
- base-path behavior under `/ams-signals/`;
- all generated pages use canonical internal paths with the expected trailing-slash convention where applicable.

Retain `check:analysis-links`.

If useful, add a small build-output/internal-link audit script, but do not introduce a crawler framework merely for this.

## 4. Check in a small browser smoke suite

The Visualization and Analysis passes used browser testing, but that harness is not yet part of the repository.

Add a **small, stable** browser smoke suite to protect the workflows most likely to break before/after deployment.

Playwright is acceptable as a development/test dependency if it remains narrowly scoped. Do not turn this into a large end-to-end testing project.

Prefer roughly 5–8 durable tests covering behaviors such as:

1. global Timeline loads and internal routes honor `/ams-signals/`;
2. URL-backed company focus/search survives reload;
3. a shared Event remains one unique record and can be selected from multiple lanes;
4. a sparse zero-Event company page renders the explicit researched-sparse state;
5. an unavailable source is not presented as a live original link;
6. Analysis index -> article -> Golden Event navigation works;
7. Person page opens People-first;
8. a narrow/mobile viewport shows the chronological record without horizontal document overflow.

Avoid brittle tests based on exact pixel positions or all current Event counts unless the count itself is the behavior being tested.

The smoke suite should run against the production build/preview, not only the dev server.

Integrate it into CI if runtime remains reasonable.

## 5. CI cleanup

Review `.github/workflows/ci.yml` for v1.

In particular:

- remove obsolete branch-specific bootstrap configuration;
- keep pull-request and `main` validation clear;
- use deterministic dependency installation where the repository lockfile supports it;
- run the existing content/build checks;
- run the small browser smoke suite if added;
- keep CI independent of flaky external source availability.

Do not add deployment to the normal CI workflow.

## 6. Prepare GitHub Pages deployment, but do not publish

Prepare the repository so Pages deployment can be enabled with an explicit human action after review.

A separate Pages workflow may be added if it can remain safely manual-only (`workflow_dispatch`) while the repository is private/unpublished.

Requirements if a workflow is added:

- build the static Astro site using the existing `/ams-signals` base;
- use GitHub's supported Pages artifact/deployment actions;
- request only the permissions needed for Pages deployment;
- do not run automatically on every `main` push yet;
- do not assume private-repository Pages entitlement;
- document the exact manual steps needed after repository visibility/plan requirements are confirmed.

If a dormant/manual workflow would be confusing or unsafe, document the exact workflow to add at publication time instead. Prefer the simpler option.

## 7. Release metadata and repository presentation

Review the public-facing README and site metadata as if a technical peer opened the repository without prior context.

The README should make clear, compactly:

- what AMS Signals is;
- fact vs Analysis separation;
- how to inspect evidence;
- how Golden research is maintained;
- local development/check commands;
- current publication/deployment state;
- source-availability limitations;
- that absence of a Golden Event is not proof of absence of internal activity.

Do not turn the README into a long product pitch.

Review page titles/descriptions and basic navigation. Preserve `noindex, nofollow` for this release policy.

Do not add SEO machinery, analytics, social tracking, RSS, or a CMS.

## 8. License is an explicit owner decision

Check whether the repository has a license.

Do **not** invent or add a software/content license without an explicit owner decision.

If no license exists, call this out in the PR summary and explain succinctly that a public GitHub repository without a license is publicly viewable but does not automatically grant reuse rights.

Keep this as a publication decision for the owner unless a license has already been specified elsewhere in the repository.

## 9. Public-release checklist

Create a short durable checklist only if it will remain useful after this temporary brief is removed.

The final human publication sequence should be explicit and small, for example:

1. review/merge readiness PR;
2. decide license policy;
3. make repository public intentionally;
4. confirm GitHub Pages eligibility/settings;
5. run/enable the prepared Pages deployment;
6. open the deployed site and repeat critical smoke checks;
7. verify `noindex, nofollow` is still present;
8. create/tag v1.0 only after the deployed site is confirmed good.

Do not perform steps 3–8 automatically in this task.

## 10. Release acceptance scenarios

Before opening the PR, exercise the release candidate against the production preview.

At minimum:

- global Timeline;
- Apple + SiTime + Skyworks comparison URL;
- `RNM`, `model validation`, and `PLL` searches;
- UVM-MS shared Event;
- SiTime/Renesas shared business Event;
- Sony Semiconductor Solutions or OMNIVISION sparse page;
- Toshi Kawashima People page;
- first Analysis article and several Event links;
- Event with multiple sources;
- Event with unavailable original source;
- mobile/narrow viewport;
- light/dark mode;
- base-path navigation under `/ams-signals/`.

Run `npm run check` plus the checked-in browser smoke suite if added.

## Scope discipline

This is a release-hardening pass, not another feature wave.

Do not:

- add more companies merely to increase coverage;
- create another Analysis article;
- redesign the Timeline;
- add semantic search;
- add technology taxonomy or maturity scoring;
- add a backend/database;
- add evidence archives;
- change factual content unless the release audit finds a genuine defect;
- make the repository public;
- deploy Pages;
- create the v1.0 tag/release.

## Deliverable

Open a reviewable release-readiness PR.

The PR description should summarize:

- repository/history safety-audit result;
- Golden/source audit result and any factual corrections;
- source availability changes, if any;
- internal-link/base-path audit;
- browser smoke tests added and CI runtime/coverage;
- CI cleanup;
- Pages preparation and the exact remaining human publish steps;
- current robots/indexing policy;
- license status/decision still required, if applicable;
- remaining release risks;
- a clear recommendation: `ready for intentional public release` or `not ready`, with blockers.
