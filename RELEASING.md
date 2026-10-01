# Release and production verification

Publication is owner-controlled. Normal CI does not deploy; [the Pages workflow](.github/workflows/pages.yml) is manual-only. Repository visibility, reuse licensing, domain/DNS settings, analytics/Search Console configuration, tags and GitHub Releases are separate owner decisions. This checklist is for the current site, not the completed first-publication or domain-cutover project.

## Routine publication

1. Confirm authorization and the intended `main` revision. Merge only within that authorization; preserve unrelated changes. Confirm the exact merged revision's **Deterministic checks** and **Chromium smoke tests** are successful. Mergeability alone is not a passing CI result.
2. Confirm the configured deployment target and Pages source. The documented production configuration is GitHub Actions with repository Actions Variables `SITE=https://ams-signals.com` and `BASE_URL=/`. Verify current settings rather than changing them to match this prose. If variables are unset, the workflow falls back to `https://ds54e.github.io/ams-signals/`.
3. Dispatch **Deploy GitHub Pages (manual)** for the intended `main` revision. Check the run's actual `head_sha`; if `main` moved, reconcile the target rather than deploying an unreviewed commit. The workflow installs locked dependencies, runs `npm run check` for its configured target and deploys that built artifact. CI success for another SHA is not a substitute.
4. Verify deployment success, HTTPS and the served routes. Run authorized deployed-site smoke with the same target:

   ```bash
   SITE=https://ams-signals.com BASE_URL=/ PLAYWRIGHT_BASE_URL=https://ams-signals.com/ npx playwright test
   ```

5. Inspect Timeline, Events, a representative Event-to-source path, Analog, Digital, an Article by direct URL, `/export.json` and a narrow viewport. Verify the indexing and analytics boundaries below. Report deployed SHA, workflow result, route checks and any missing ingestion evidence separately.

Documentation/guidance-only changes outside build inputs normally need no production deployment. Do not create a tag or GitHub Release as routine housekeeping. Merged temporary branches are removed by the repository's automatic-delete setting, not kept as archives.

## Indexing and route boundary

`/`, `/events/`, `/events/<id>/`, `/analog/`, `/digital/`, `/companies/<id>/` and `/people/<id>/` are indexable with `index, follow` and one self-referential canonical URL derived from the configured deployment target. `/articles/` and `/articles/<slug>/` remain live with `noindex, follow`, outside the sitemap and primary navigation. Do not block Article crawling in robots.txt: crawlers must be able to read their directive.

`/sitemap.xml` lists the indexable HTML routes, not Articles or `/export.json`; `/robots.txt` allows crawling and advertises the sitemap. Verify those generated endpoints, not just source configuration. Only the canonical Analog/Digital routes exist; no catalog alias pages are added. Check legacy `ds54e.github.io/ams-signals/...` redirects when release work affects the deployment target. `noindex` is not access control for repository files, commits or PRs.

## Analytics verification

`src/lib/analytics.mjs` and `src/layouts/BaseLayout.astro` own the Cloudflare beacon emission rule; `tools/check-analytics.mjs` audits it. Builds for the production origin include exactly one correct beacon per HTML page; fallback and CI root-shape builds have none. Counts are derived from the actual output, not an old fixed page total.

A production-shaped `SITE=https://ams-signals.com BASE_URL=/ npm run check` verifies markup. Deployed browser smoke narrowly intercepts the exact Cloudflare analytics origins so tests do not generate fake traffic or depend on collector availability. It verifies the served application and beacon markup, not live ingestion; other external-request and browser-error guards remain intact.

When ingestion confirmation is part of the release, make a normal real-browser visit without Playwright interception and verify resulting Page views/Visits in Cloudflare Web Analytics. Lack of provider access is an unperformed ingestion check, not a passing one. A documentation cleanup does not authorize analytics API calls or account configuration changes.

## Target changes and recovery

Treat a domain/DNS change as a separate owner-approved operation. Preserve the prior settings, verify domain ownership and HTTPS, and consult current hosting-provider instructions before changing DNS or Pages. Keep indexing policy and analytics changes independently reviewable; do not reapply a historical `noindex, nofollow` cutover step to an already published site.

For recovery, identify a known-good revision and target, validate the intended revision through the normal gates and redeploy under authorization. Changing code-level target variables alone does not restore DNS/Pages settings. Clearing a custom domain, unsetting variables or restoring DNS needs the corresponding owner approval and current evidence. Do not force-push history or invent an automatic rollback path.
