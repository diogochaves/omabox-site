# omabox-site: instructions for agents

The site for omabox (omabox.app). Read `DIRECTION.md` first: what the site says, every decision so
far and why the old drafts were dropped. Diogo (the owner) will say what to change; iterate on
`site/omabox.html` and the other pages beside it.

## Layout

- `site/omabox.html`: the home page, as an **artifact source**: no `<!doctype>`, `<html>`, `<head>`
  or `<body>` (the artifact platform wraps it). `<title>`, its links and `<style>` come first.
- `site/base.css`: what every page shares (tokens, type, cut frames, cards, header, footer, motion).
  Each page's `<style>` has only what it uses.
- `site/how-it-works.html`, `site/commands.html`, `site/develop.html`, `site/compare.html`,
  `site/changelog.html`, `site/install.html`: the other pages, as a `<style>` and a `<main>` only (a
  page's `<script>` goes inside its `<main>`); the build adds the head, header, "Keep reading", an
  install call to action (not on /install) and footer, and fills their `<!-- markers -->`. The nav
  (between `<!-- nav -->` markers), "Keep reading" (`<section class="sec more">`, one card per line)
  the footer and the script that lands a link on its section once the fonts are in (between
  `<!-- landing -->` markers) are written once, in the home page, and copied from it. Every page but `/commands`
  and `/changelog` is written by hand. `/commands` and `/changelog` are
  read from the omabox repo at its latest release tag: every command and its help from `bin/omabox`
  (the usage heredoc, not run), the changelog from `CHANGELOG.md`. `site/commands.json` is the
  hand-written half of `/commands`: groups, a line and examples per command (a command missing
  there still shows, under Other, and the build warns).
- Links between pages are written `commands.html`, `index.html#install`: the build makes them
  `/commands`, `/#install` for omabox.app, and leaves them for the artifact.
- `site/media/`: images and video, referenced as `media/...` (provenance in `site/media/README.md`).
- `reference/`: old drafts to mine (`reference/README.md`). Not maintained.
- `build.mjs`: builds the public site into `dist/` (git-ignored): every page wrapped into a whole
  document (doctype, meta, canonical, link card, favicon), `base.css`, the media, the sitemap. The
  version in every `<span class="ver">` is omabox's latest release; the home page gets the omabox
  repo's contributors from the GitHub API, people only (bots and AI agent accounts dropped), avatars
  saved locally. Between the `<!-- contributors -->` markers the source keeps a hardcoded list, for
  the artifact and as the fallback when GitHub can't be reached; the version falls back the same
  way. `/commands` and `/changelog` have no fallback: without GitHub the build stops and the site
  keeps its last deploy. `node build.mjs` (Node 18+, no dependencies; `GITHUB_TOKEN` optional);
  `node build.mjs --preview` writes the other pages into `preview/` (git-ignored) for the artifact.
- The home page sends links to sections that moved to pages (`/#compare`, `/#jail`, `/#never`...)
  on to them, so old links keep working (the omabox README links `/#compare`).

## Publishing

The page lives at <https://claude.ai/artifact/P1SN24Cvz4fqXJoUZo2M8d> (draft 5, the site split into
pages; omabox.app since 2026-10-01). Draft 4, the single page before it, stays at
<https://claude.ai/artifact/TvfdLN5NpYnTR6VoLxc17d> and is no longer updated. To update it from a new session: read it first
(Artifact `action: "read"` with its `url`), then publish with the same `url` and `file_path:
site/omabox.html`. The other pages and the shared CSS go in `files`: run `node build.mjs --preview`,
then pass `{"base.css": "site/base.css", "how-it-works.html": "preview/how-it-works.html",
"commands.html": "preview/commands.html", "develop.html": "preview/develop.html", "compare.html":
"preview/compare.html", "changelog.html": "preview/changelog.html", "install.html":
"preview/install.html"}` (the ones that changed). Pass media only when new or changed
(`{"media/x.webp": "site/media/x.webp"}`); files left out are kept. Don't publish without `url`
(that makes a separate artifact) unless Diogo asks for a new draft, as he did for draft 4.

Platform rules that bite: external scripts only from cdnjs / jsdelivr / unpkg, fonts only from Google
Fonts, other media must be published files; no `window.open`, `alert`, print or downloads; the
viewer adds `[hidden]{display:none!important}` (the page also sets it).

## Hosting

Cloudflare Pages project `omabox` (account 433e2ce2a5dce0c5eae78569eccd4122), deployed by
`.github/workflows/deploy.yml` with wrangler: on every push to main, daily at 06:17 UTC (so a new
omabox release, its commands and changelog, and new contributors show up) and by hand (`gh workflow run deploy -R diogochaves/omabox-site`). The
token is the repo secret `CLOUDFLARE_API_TOKEN` (Pages:Edit, DNS:Edit on omabox.app); no Cloudflare
GitHub app.

Launched on 2026-09-29: <https://omabox.app>. The repo variable `SITE_URL` is `https://omabox.app`
(it sets the site's own address: canonical, link card, robots and sitemap; the page's GitHub links
always go to diogochaves/omabox), and the workflow's last step keeps omabox.app and www.omabox.app attached to
the project and their DNS pointed at it. www only redirects to omabox.app (301), in
`functions/_middleware.js`; `dist/_routes.json` keeps `/media/*` out of it. The build adds noindex for any other `SITE_URL`. The artifact
stays where Diogo reviews.

## A new omabox release

The daily deploy picks up a release by itself: the version, `/changelog` and every command on
`/commands`. The hand-written pages it can't know about. `reviewed-release` holds the release the
site was last checked against; `.github/workflows/release-check.yml` (daily at 06:47 UTC) opens an
issue "Review the site for omabox vX" when a newer one is out, and closes it once `reviewed-release`
on main catches up. `/sync-release` (`.claude/skills/sync-release/`) does the review: what changed
since that release, sorted into what the build has, pages to touch and claims to test again, then
the edits, a look, the artifact and the marker.

## Checking a change

Never open the page on Diogo's real desktop unless he asks (then `omabox host -- xdg-open ...`).
Look at it in a box (this machine has omabox; load the omabox skill):

```bash
node build.mjs --preview                 # the other pages, as the artifact gets them
L=$(mktemp -d); cp -r site/media site/base.css preview/*.html $L/
{ echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></head><body>'; cat site/omabox.html; echo '</body></html>'; } > $L/index.html
omabox up -b look --ro-bind $L
omabox run -b look -d -- chromium --user-data-dir=/tmp/chr --no-first-run --no-default-browser-check --ozone-platform=wayland --app=file://$L/index.html
# another page: omabox run -b look -- pkill -x chromium, then the same with $L/compare.html
omabox shot -b look                      # Page_Down with: omabox keys -b look Page_Down
omabox mode -b look 412x915              # phone width
omabox gpu -b look 5                     # GPU cost (draft 4: 0% idle and scrolling at 1080p)
omabox down -b look; rm -r $L
```

One look per change, then publish; Diogo reviews on the live page.

## Rules

- Keep it light: transform/opacity animations, paused off screen, `prefers-reduced-motion`
  respected; no WebGL scenes, no scroll-jacking (see DIRECTION.md, "Lightweight is a feature").
- Command output on the page must match the real CLI: `bin/omabox` at the omabox repo's latest
  release tag (`v0.5.2` on 2026-10-09, <https://github.com/diogochaves/omabox/tree/v0.5.2>). Install
  steps and README links follow its main branch. The build writes that release's version into every
  `<span class="ver">` and the JSON-LD; the source keeps the last one as the fallback.
- Screenshots come from a box (`site/media/README.md`), never from the real desktop, and carry no
  personal details (user or host names, hardware).
- Copy: plain, active, specific; say "not a security boundary" wherever safety comes up.
