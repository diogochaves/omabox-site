# omabox-site: instructions for agents

The site for omabox (omabox.app). Read `DIRECTION.md` first: what the site says, every decision so
far and why the old drafts were dropped. Diogo (the owner) will say what to change; iterate on
`site/omabox.html`.

## Layout

- `site/omabox.html`: the page, as an **artifact source**: no `<!doctype>`, `<html>`, `<head>` or
  `<body>` (the artifact platform wraps it). `<title>` and `<style>` come first.
- `site/media/`: its images and video, referenced as `media/...` (provenance in `site/media/README.md`).
- `reference/`: old drafts to mine (`reference/README.md`). Not maintained.
- `build.mjs`: builds the public site into `dist/` (git-ignored): the page wrapped into a whole
  document (doctype, meta, link card, favicon), its media, and the omabox repo's contributors from
  the GitHub API, people only (bots and AI agent accounts dropped), avatars saved locally. Between
  the `<!-- contributors -->` markers the source keeps a hardcoded list, for the artifact and as the
  fallback when GitHub can't be reached. `node build.mjs` (Node 18+, no dependencies;
  `GITHUB_TOKEN` optional).

## Publishing

The page lives at <https://claude.ai/artifact/TvfdLN5NpYnTR6VoLxc17d>. To update it from a new
session: read it first (Artifact `action: "read"` with that `url`), then publish with the same `url`
and `file_path: site/omabox.html`. Pass `files` only for media that is new or changed
(`{"media/x.webp": "site/media/x.webp"}`); files left out are kept. Don't publish without `url`
(that makes a separate artifact) unless Diogo asks for a new draft, as he did for draft 4.

Platform rules that bite: external scripts only from cdnjs / jsdelivr / unpkg, fonts only from Google
Fonts, other media must be published files; no `window.open`, `alert`, print or downloads; the
viewer adds `[hidden]{display:none!important}` (the page also sets it).

## Hosting

Cloudflare Pages project `omabox` (account 433e2ce2a5dce0c5eae78569eccd4122), deployed by
`.github/workflows/deploy.yml` with wrangler: on every push to main, daily at 06:17 UTC (so new
omabox contributors show up) and by hand (`gh workflow run deploy -R diogochaves/omabox-site`). The
token is the repo secret `CLOUDFLARE_API_TOKEN` (Pages:Edit, DNS:Edit on omabox.app); no Cloudflare
GitHub app.

Until launch the site is at <https://omabox.pages.dev> with noindex (the build adds it for any
`SITE_URL` other than omabox.app), and the artifact stays where Diogo reviews. On launch day: attach
omabox.app to the project, `gh variable set SITE_URL -b https://omabox.app -R diogochaves/omabox-site`,
and rerun the deploy. The repo is public since 2026-09-28 (Actions is free for public repos).

## Checking a change

Never open the page on Diogo's real desktop unless he asks (then `omabox host -- xdg-open ...`).
Look at it in a box (this machine has omabox; load the omabox skill):

```bash
D=$PWD/site
{ echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></head><body>'; cat $D/omabox.html; echo '</body></html>'; } > $D/test.html
omabox up -b look --ro-bind $D
omabox run -b look -d -- chromium --user-data-dir=/tmp/chr --no-first-run --no-default-browser-check --ozone-platform=wayland --app=file://$D/test.html
omabox shot -b look                      # Page_Down with: omabox keys -b look Page_Down
omabox mode -b look 412x915              # phone width
omabox gpu -b look 5                     # GPU cost (draft 4: 0% idle and scrolling at 1080p)
omabox down -b look; rm $D/test.html
```

One look per change, then publish; Diogo reviews on the live page.

## Rules

- Keep it light: transform/opacity animations, paused off screen, `prefers-reduced-motion`
  respected; no WebGL scenes, no scroll-jacking (see DIRECTION.md, "Lightweight is a feature").
- Command output on the page must match the real CLI (omabox repo `bin/omabox`; 0.2.0 syntax on
  its `release-0.2.0` branch).
- Screenshots come from a box (`site/media/README.md`), never from the real desktop, and carry no
  personal details (user or host names, hardware).
- Copy: plain, active, specific; say "not a security boundary" wherever safety comes up.
