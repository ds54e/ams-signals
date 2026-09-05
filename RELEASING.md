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
6. In **Actions**, manually run **Deploy GitHub Pages (manual)** on `main`. It validates the locked dependency tree, builds with the configured `/ams-signals` base, uploads the static artifact, and deploys it with GitHub's Pages actions.
7. Open `https://ds54e.github.io/ams-signals/` and run the critical production smoke suite:

   ```bash
   PLAYWRIGHT_BASE_URL=https://ds54e.github.io/ams-signals/ npx playwright test
   ```

8. Confirm the deployed home page still contains `<meta name="robots" content="noindex, nofollow">` and manually inspect the Timeline, Events view, Articles, `/analog/`, `/digital/`, `/export.json`, one Event-to-source path, and a narrow viewport. Confirm that the built catalog routes are only `/analog/` and `/digital/`, with no compatibility pages or redirects.
9. Create the agreed v1.0 tag and GitHub Release only after the deployed site passes those checks.

Repository description/topics and deletion of already-merged branches are presentation choices. A license or an explicit no-license decision is required owner review, but none of those choices should be hidden inside deployment automation.
