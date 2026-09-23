# AMS Signals release checklist

Publication is a sequence of explicit owner actions. Normal CI never deploys the site, and the Pages workflow is manual-only.

## Before changing visibility

1. Merge the release-readiness PR only after its repository/history, source, and browser-test audits are accepted. Once merged, remove the now-completed `RELEASE_V1.md` and `RELEASE_V1_REVIEW_NOTES.md` briefs from `main`; their durable rules live in `AGENTS.md`, `README.md`, and this checklist.
2. Decide the reuse policy. The owner may choose no license or different licenses for the site code and Golden factual compilation.
3. Review the PR metadata/history audit. The following prior branches have trees identical to their merged squash commits and can be deleted for repository hygiene:

   - `bootstrap-v1`
   - `source-status-foundation`
   - `research/apple-v1`
   - `research/wave1-v1`
   - `feat/visualization-v1`

   If the owner chooses to clean them before publication, the exact remote cleanup is:

   ```bash
   git push origin --delete bootstrap-v1 source-status-foundation research/apple-v1 research/wave1-v1 feat/visualization-v1
   ```

   Delete the `feat/release-v1-readiness` PR branch after it is merged as well. Branch deletion reduces public clutter; it does not erase commits already reachable from `main`.
4. Intentionally change repository visibility. Remember that `noindex` is not access control for repository files, commits, branches, or pull requests.

## Publish and verify

5. Confirm the repository's GitHub plan/visibility supports Pages, then select **GitHub Actions** as the Pages source in **Settings → Pages**.
6. In **Actions**, manually run **Deploy GitHub Pages (manual)** on `main`. It validates the locked dependency tree, builds for the deployment target selected by the optional repository Actions Variables `SITE` and `BASE_URL`, uploads the static artifact, and deploys it with GitHub's Pages actions. Production currently sets `SITE=https://ams-signals.com` and `BASE_URL=/`; if those variables are ever unset, the build falls back to `https://ds54e.github.io/ams-signals/`.
7. Open the deployed URL (currently `https://ams-signals.com/`) and run the critical production smoke suite:

   ```bash
   PLAYWRIGHT_BASE_URL=https://ams-signals.com/ npx playwright test
   ```

8. Confirm the indexing boundary on the deployed site. `/`, `/events/`, `/events/<id>/`, `/analog/`, `/digital/`, `/companies/<id>/` and `/people/<id>/` contain `<meta name="robots" content="index, follow">` and exactly one self-referential canonical link. `/articles/` and `/articles/<slug>/` remain live and reachable but contain `<meta name="robots" content="noindex, follow">`. Fetch `/sitemap.xml` and confirm it lists only the indexable routes — no Articles and no `export.json` — then fetch `/robots.txt` and confirm it allows crawling and advertises the sitemap. Finally inspect the Timeline, Events view, one Article by direct URL, `/analog/`, `/digital/`, `/export.json`, one Event-to-source path, and a narrow viewport. Confirm that the built catalog routes are only `/analog/` and `/digital/`, with no compatibility pages or redirects. The old `https://ds54e.github.io/ams-signals/...` forms survive only as compatibility redirects to `https://ams-signals.com/...`.
9. Create the agreed v1.0 tag and GitHub Release only after the deployed site passes those checks.

Repository description/topics and deletion of already-merged branches are presentation choices. A license or an explicit no-license decision is required owner review, but none of those choices should be hidden inside deployment automation.


## Custom-domain cutover

Keep the custom-domain migration separate from search indexing. The site can first move domains while retaining `noindex, nofollow`, then enable indexing in a later reviewed change. The cutover to `https://ams-signals.com/` is now complete, and that separate indexing change has shipped; the steps below record the sequence used and remain the rollback path.

1. Choose and register the domain. Do not change the repository's default deployment yet.
2. Verify domain ownership in GitHub using the account-level Pages domain verification flow and keep the DNS TXT verification record in place.
3. In **Settings → Pages**, add the custom domain before pointing DNS at GitHub Pages. The repository publishes with a custom GitHub Actions workflow, so a committed `CNAME` file is not required.
4. Configure DNS for the chosen apex/subdomain following GitHub Pages' current documented records. Do not use wildcard DNS records. If an apex domain is used, configure the matching `www` variant as well so GitHub can redirect between them.
5. In **Settings → Secrets and variables → Actions → Variables**, set:
   - `SITE=https://<custom-domain>`
   - `BASE_URL=/`
6. Manually run **Deploy GitHub Pages (manual)**. The first custom-domain deployment deliberately kept `noindex, nofollow`; indexing was enabled afterwards in the separate reviewed change described above.
7. Verify the new root deployment and old-URL redirects:
   - `/`
   - `/analog/`
   - `/digital/`
   - `/events/<existing-id>/`
   - `/export.json`
   - the old `https://ds54e.github.io/ams-signals/...` forms of the same routes
8. Verify HTTPS before enabling indexing. A failed custom-domain cutover should be rolled back by clearing the Pages custom domain, unsetting `SITE`/`BASE_URL`, restoring the previous DNS state, and manually redeploying the default target.
9. Search indexing, canonical URLs, sitemap/robots changes, analytics, and Search Console stay a separate post-cutover change. Do not combine them with the DNS move. The indexing half has since shipped on its own; analytics and Search Console remain out of scope.
