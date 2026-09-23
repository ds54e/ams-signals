# Custom-domain migration preparation (2026-09-23)

Status: preparation only. No DNS, GitHub Pages custom-domain setting, production URL, indexing policy, or deployment has been changed by this work.

## Current production contract

- Hosting: GitHub Pages via the manual `Deploy GitHub Pages (manual)` workflow.
- Current public target: `https://ds54e.github.io/ams-signals/`.
- Current build defaults: `SITE=https://ds54e.github.io`, `BASE_URL=/ams-signals`.
- Current indexing policy: `<meta name="robots" content="noindex, nofollow">`.
- Deployment is owner-controlled and workflow-dispatch only.

RF1 already made the build origin/base configurable. This preparation connects that existing configuration to optional repository Actions Variables so a future root-domain deployment does not require rewriting the workflow.

## Preparation added now

The manual Pages workflow reads two optional repository Actions Variables:

- `SITE`
- `BASE_URL`

When both are unset, behavior stays exactly as it is today. For a future root-domain cutover:

```text
SITE=https://<custom-domain>
BASE_URL=/
```

CI also performs a second static build/link audit against:

```text
SITE=https://migration-test.invalid
BASE_URL=/
```

This keeps root-domain path handling under continuous regression coverage without duplicating the browser suite.

## Cutover sequence

1. Register the selected AMS Signals domain.
2. Verify ownership using GitHub's Pages domain verification and retain the verification TXT record.
3. Add the custom domain under repository **Settings → Pages** before pointing DNS at GitHub.
4. Configure only the DNS records required by GitHub Pages. Do not use wildcard DNS.
5. If using the apex domain, also configure `www`; GitHub Pages can redirect between the configured apex and `www` variant.
6. Set the repository Actions Variables:
   - `SITE=https://<custom-domain>`
   - `BASE_URL=/`
7. Manually deploy.
8. Verify HTTPS and route parity while the site is still `noindex, nofollow`.
9. Verify the previous `ds54e.github.io/ams-signals/...` URLs redirect to the new custom domain.
10. Only after the migration is stable, perform a separate search-indexing/SEO change.

## Required route checks

Verify both the new domain and the corresponding old GitHub Pages URL for at least:

```text
/
 /analog/
 /digital/
 /articles/
 /events/<existing-id>/
 /export.json
```

For HTML pages, confirm styles/scripts load and internal links remain on the expected origin/base. For `export.json`, confirm generated `recordUrl` values use the new domain.

## Search-indexing follow-up

Do not enable indexing in the DNS migration itself. The later SEO change should be independently reviewable and should cover, at minimum:

- remove/replace `noindex, nofollow`;
- canonical URL generation from the configured public site;
- `robots.txt`;
- `sitemap.xml`;
- Google Search Console ownership/submission;
- any lightweight analytics chosen by the owner.

Keeping these separate makes rollback of the domain move independent from search-engine publication.

## GitHub Pages notes

- With a custom GitHub Actions publishing workflow, a committed `CNAME` file is not required.
- GitHub recommends verifying the custom domain before attaching DNS to the Pages site.
- Domain-verification TXT records should remain in DNS after verification.
- DNS changes may take time to propagate.
- Wildcard DNS records are intentionally out of scope because GitHub warns they increase takeover risk.

## Rollback

Before indexing is enabled, rollback should remain simple:

1. clear the custom domain in GitHub Pages;
2. unset repository Actions Variables `SITE` and `BASE_URL`;
3. remove/restore custom-domain DNS records as appropriate;
4. manually run the Pages workflow again;
5. verify `https://ds54e.github.io/ams-signals/` and the critical route set.

No content or data-model rollback is expected for the domain migration itself.
