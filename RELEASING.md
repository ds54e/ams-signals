# AMS Signals release checklist

Publication is a sequence of explicit owner actions. Normal CI never deploys the site, and the Pages workflow is manual-only.

## Before changing visibility

1. Merge the release-readiness PR only after its repository/history, source, and browser-test audits are accepted. Once merged, remove the now-completed `RELEASE_V1.md` and `RELEASE_V1_REVIEW_NOTES.md` briefs from `main`; their durable rules live in `AGENTS.md`, `README.md`, and this checklist.
2. Decide the reuse policy. The owner may choose no license or different licenses for the site code and Golden factual compilation.
3. Review the PR metadata/history audit. Merged PR head branches are deleted automatically by the repository setting `delete_branch_on_merge`, so no manual cleanup step is required. Completed work branches are not retained as historical archives; `main` history and the pull requests themselves are the normal historical record.
4. Intentionally change repository visibility. Remember that `noindex` is not access control for repository files, commits, branches, or pull requests.

## Publish and verify

5. Confirm the repository's GitHub plan/visibility supports Pages, then select **GitHub Actions** as the Pages source in **Settings → Pages**.
6. Wait for the merged `main` commit's **Deterministic checks** and **Chromium smoke tests** to pass. Then, in **Actions**, manually run **Deploy GitHub Pages (manual)** on that `main` commit. The workflow validates the locked dependency tree, builds for the deployment target selected by the optional repository Actions Variables `SITE` and `BASE_URL`, uploads the static artifact, and deploys it with GitHub's Pages actions. Production currently sets `SITE=https://ams-signals.com` and `BASE_URL=/`; if those variables are ever unset, the build falls back to `https://ds54e.github.io/ams-signals/`.
7. Open the deployed URL (currently `https://ams-signals.com/`) and run the critical production smoke suite:

   ```bash
   SITE=https://ams-signals.com BASE_URL=/ PLAYWRIGHT_BASE_URL=https://ams-signals.com/ npx playwright test
   ```

8. Confirm the indexing boundary on the deployed site. `/`, `/events/`, `/events/<id>/`, `/analog/`, `/digital/`, `/companies/<id>/` and `/people/<id>/` contain `<meta name="robots" content="index, follow">` and exactly one self-referential canonical link. `/articles/` and `/articles/<slug>/` remain live and reachable but contain `<meta name="robots" content="noindex, follow">`. Fetch `/sitemap.xml` and confirm it lists only the indexable routes — no Articles and no `export.json` — then fetch `/robots.txt` and confirm it allows crawling and advertises the sitemap. Finally inspect the Timeline, Events view, one Article by direct URL, `/analog/`, `/digital/`, `/export.json`, one Event-to-source path, and a narrow viewport. Confirm that the built catalog routes are only `/analog/` and `/digital/`, with no compatibility pages or redirects. The old `https://ds54e.github.io/ams-signals/...` forms survive only as compatibility redirects to `https://ams-signals.com/...`.
9. Successful deployment does not require a Git tag or GitHub Release, and the normal publication process creates neither. Create a tag or Release only on explicit owner decision, when a stable public release point is actually needed.

Repository description/topics are presentation choices. A license or an explicit no-license decision is required owner review, but none of those choices should be hidden inside deployment automation.


## Custom-domain cutover

Keep the custom-domain migration separate from search indexing. The cutover to `https://ams-signals.com/` is complete; indexing is maintained as a separate reviewed post-cutover change, and the steps below record the sequence used and remain the rollback path.

1. Choose and register the domain. Do not change the repository's default deployment yet.
2. Verify domain ownership in GitHub using the account-level Pages domain verification flow and keep the DNS TXT verification record in place.
3. In **Settings → Pages**, add the custom domain before pointing DNS at GitHub Pages. The repository publishes with a custom GitHub Actions workflow, so a committed `CNAME` file is not required.
4. Configure DNS for the chosen apex/subdomain following GitHub Pages' current documented records. Do not use wildcard DNS records. If an apex domain is used, configure the matching `www` variant as well so GitHub can redirect between them.
5. In **Settings → Secrets and variables → Actions → Variables**, set:
   - `SITE=https://<custom-domain>`
   - `BASE_URL=/`
6. Manually run **Deploy GitHub Pages (manual)**. The first custom-domain deployment keeps `noindex, nofollow`; indexing is maintained as a separate reviewed change.
7. Verify the new root deployment and old-URL redirects:
   - `/`
   - `/analog/`
   - `/digital/`
   - `/events/<existing-id>/`
   - `/export.json`
   - the old `https://ds54e.github.io/ams-signals/...` forms of the same routes
8. Verify HTTPS before enabling indexing. A failed custom-domain cutover should be rolled back by clearing the Pages custom domain, unsetting `SITE`/`BASE_URL`, restoring the previous DNS state, and manually redeploying the default target.
9. Search indexing, canonical URLs, sitemap/robots changes, analytics, and Search Console stay a separate post-cutover change. Do not combine them with the DNS move. Once that separate indexing change is deployed, verify the indexing contract; analytics and Search Console remain out of scope.
