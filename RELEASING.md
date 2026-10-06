# Release and production verification

Production is `https://ams-signals.com/`. GitHub Pages uses the manual-only [Deploy GitHub Pages (manual)](.github/workflows/pages.yml) workflow; normal CI does not publish. A user request can authorize merge and deployment together. Account settings, visibility, licensing, domain/DNS, analytics/Search Console configuration and tags/Releases need their own authorization.

## Publication

1. Confirm the intended main revision and authorized scope. Preserve unrelated changes. Run the relevant local gates in [Testing](docs/TESTING.md), then integrate the verified temporary branch. When PRs are disabled, push the authorized integration directly to main without rewriting history.
2. Confirm that exact main SHA's **Deterministic checks** and **Chromium smoke tests** both succeeded. Success for another revision is insufficient.
3. Read the current Pages source, custom domain, HTTPS state and Actions Variables. Production uses GitHub Actions with `SITE=https://ams-signals.com` and `BASE_URL=/`. Missing variables select the workflow fallback `https://ds54e.github.io/ams-signals/`; do not silently change settings to match this document.
4. Dispatch **Deploy GitHub Pages (manual)** on main. Verify the run's actual `head_sha` matches the validated revision and both artifact build and deployment succeed. If main moved, reconcile and validate the intended revision before publishing.
5. Run the deployed-site suite with the production settings:

   ```bash
   SITE=https://ams-signals.com BASE_URL=/ PLAYWRIGHT_BASE_URL=https://ams-signals.com/ npx playwright test
   ```

6. Inspect HTTPS, Timeline, Events, Analog, Digital, Event-to-source navigation, `/export.json` and narrow-screen display. Verify indexing and analytics markup below. Report the deployed SHA, CI/deploy run URLs, local/live results and any unperformed confirmation separately.

Documentation-only changes outside build inputs normally need no deployment. Tags/Releases are not part of routine publication. During authorized branch cleanup, check that each temporary branch is fully contained in main and has no unrelated uncommitted work before deletion.

## Public routes and indexing

The HTML routes are `/`, `/events/`, `/events/<id>/`, `/analog/`, `/digital/`, `/companies/<id>/` and `/people/<id>/`. Every page emits one `index, follow` robots directive and one self-canonical URL derived from the configured origin/base.

`/sitemap.xml` lists exactly those HTML routes; `/export.json` is not listed. `/robots.txt` allows crawling and advertises the sitemap. Verify the served endpoints and unsupported-route 404s, not just configuration. A redirect check is needed when the deployment target itself changes.

## Analytics boundary

`src/lib/analytics.mjs` and `src/layouts/BaseLayout.astro` own Cloudflare beacon emission. Production-origin builds include exactly one correct beacon per HTML page; other targets have none. `npm run check` audits the actual output without contacting a collector.

Production browser smoke intercepts only the exact analytics origins. It verifies served markup and application behavior without fake traffic or collector dependencies; other request/error guards remain active.

Provider-side ingestion is a separate check when requested: make a normal browser visit without interception and confirm resulting Page views/Visits in Cloudflare Web Analytics using authorized access. Missing access means unperformed ingestion verification, not a pass. Code/documentation work does not authorize analytics account changes.

## Recovery

Validate the intended revision through the same local and exact-SHA CI gates, then redeploy it under user authorization. Keep the current target/settings intact unless a domain/DNS change is separately authorized. Do not force-push main or invent an automatic rollback path.
