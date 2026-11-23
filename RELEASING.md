# Release and production verification

Production is `https://ams-signals.com/`. GitHub Pages uses the manual-only [Deploy GitHub Pages (manual)](.github/workflows/pages.yml) workflow; normal CI does not publish. A user request can authorize merge and deployment together. Account settings, visibility, licensing, domain/DNS, analytics/Search Console configuration and tags/Releases need their own authorization.

## Publication

1. Confirm the intended main revision and authorized scope. Preserve unrelated changes. Run the relevant local gates in [Testing](docs/TESTING.md), then integrate the verified temporary branch. When PRs are disabled, push the authorized integration directly to main without rewriting history.
2. Confirm that exact main SHA's **Deterministic checks** and **Chromium smoke tests** both succeeded. Success for another revision is insufficient.
3. Read the current Pages source, custom domain, HTTPS state and Actions Variables. Production uses GitHub Actions with `SITE=https://ams-signals.com` and `BASE_URL=/`. Missing variables select the workflow fallback `https://ds54e.github.io/ams-signals/`; do not silently change settings to match this document.
4. Dispatch **Deploy GitHub Pages (manual)** on main. Verify the run's actual `head_sha` matches the validated revision and both artifact build and deployment succeed. If main moved, reconcile and validate the intended revision before publishing.
5. Run the delivery-only deployed-site suite. Supply the full prior production SHA (not a guessed parent), expected deployed SHA, and successful manual deployment run ID. The config checks checkout/build inputs and the successful exact-SHA main deployment via read-only `gh run view`; it never deploys or starts a local server. It does not prove the served SHA by itself, so inspect the run and changed-page results together:

   ```bash
   SITE=https://ams-signals.com BASE_URL=/ PLAYWRIGHT_BASE_URL=https://ams-signals.com/ \
   LIVE_EXPECTED_SHA=<full-deployed-sha> LIVE_PREVIOUS_SHA=<prior-production-sha> \
   LIVE_DEPLOY_RUN_ID=<successful-manual-run-id> npm run test:live
   ```

6. Inspect HTTPS, Home, Timeline, Events, Analog, Digital, Event-to-source navigation and narrow-screen display. Verify indexing and analytics markup below. Report the deployed SHA, CI/deploy run URLs, local/live results and any unperformed confirmation separately.

Documentation-only changes outside build inputs normally need no deployment. Tags/Releases are not part of routine publication. During authorized branch cleanup, check that each temporary branch is fully contained in main and has no unrelated uncommitted work before deletion.

## Public routes and indexing

The HTML routes are `/`, `/timeline/`, `/events/`, `/events/<id>/`, `/analog/`, `/digital/`, `/companies/<id>/` and `/people/<id>/`. Every page emits one robots directive and one self-canonical URL derived from the configured origin/base. Company and Person pages without a linked Golden Event retain their HTTP 200 empty state for readers, emit `noindex, follow`, and are omitted from the sitemap. Other pages emit `index, follow`. Nonempty Company/Person views include their existing factual Event summaries and detail links in a `noscript` fallback; JavaScript-enabled Timeline/Inspector behavior is unchanged. Adding or removing an entity's last linked Event changes its indexing eligibility automatically; do not add filler content or block crawling in robots.txt.

`/sitemap.xml` lists exactly the indexable HTML routes. The retired `/export.json` route must return 404. `/robots.txt` allows crawling and advertises the sitemap. Verify the served endpoints and changed/deleted real routes, not just configuration. Deleted real routes must return 404 and remain blocking checks. The separate synthetic missing-route hosting diagnostic is non-blocking: only 404 confirms it; HTTP 5xx, 429 or request errors are unconfirmed, while other statuses are unexpected. Both non-confirmed outcomes are reported as skipped with a diagnostic attachment, never as passes. Do not automatically retry or follow redirects for this probe. A redirect check is needed when the deployment target itself changes.

## Analytics boundary

`src/lib/analytics.mjs` and `src/layouts/BaseLayout.astro` own Cloudflare beacon emission. Production-origin builds include exactly one correct beacon per HTML page; other targets have none. `npm run check` audits the actual output without contacting a collector.

Production browser smoke intercepts only the exact analytics origins. It verifies served markup and application behavior without fake traffic or collector dependencies; other request/error guards remain active.

Provider-side ingestion is a separate check when requested: make a normal browser visit without interception and confirm resulting Page views/Visits in Cloudflare Web Analytics using authorized access. Missing access means unperformed ingestion verification, not a pass. Code/documentation work does not authorize analytics account changes.

## Recovery

Validate the intended revision through the same local and exact-SHA CI gates, then redeploy it under user authorization. Keep the current target/settings intact unless a domain/DNS change is separately authorized. Do not force-push main or invent an automatic rollback path.

The full browser regression suite remains a blocking exact-SHA CI gate. `test:live` is not a substitute for it. Live checks cover delivery, major surfaces, changed/deleted Golden routes derived from the prior production SHA, indexing, analytics markup, representative interaction and narrow layouts. Keep the prior SHA even when releases skip commits. Failures are not retried automatically; report transient HTTP/provider failures separately without declaring a pass. For existing local Google Chrome, explicitly use `LIVE_CHROME=1`; no browser is installed by this command.
