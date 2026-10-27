# Checkpoint: the 1.0 site, ready for Diogo's last review

Written 2026-10-27, at the end of the session that made it. Delete this file when the 1.0 site is
live.

- **Where:** branch `site-1.0` (not on `main`: `main` deploys omabox.app daily, and these pages
  describe 1.0). Review artifact: <https://claude.ai/artifact/8voq3KwYon5ub3h5V2kGid> (draft 6).
- **The look is final:** Look H (`looks/h-tokyo.html`), in `site/base.css` and every page.
  `DIRECTION.md` has why (2026-10-27 entries); `COPY-1.0.md` is the agreed copy, page by page.
  `looks/` keeps the tries (C to H) for reference.
- **What's left is two issues:**
  - diogochaves/omabox#390, for the omabox side: measure and confirm the site's claims at the 1.0
    tag, a `check` report shot for `/develop`, and omabox.app for agents (`/install.md`,
    `/llms.txt`, Markdown twins).
  - **2026-10-27: #390 is answered** (its comment: every fact, measured on port-rust f4f13bb; several
    claims change: entry ~3 ms, the stock bar 26 px, ai-jail captions). Part 3 is built on this branch:
    `/install.md` from `site/install-agent.md`, `/llms.txt`, a `.md` twin per page, Accept:
    text/markdown in the middleware. `site/media/check-report.webp` is in; /develop still draws it.
  - diogochaves/omabox-site#3, for this repo once 1.0 is out: rebuild against the tag, apply #390's
    answers to the `<!-- check: ... -->` comments, date the 1.0 tab, remake the link card, one
    look, the last review, then merge to `main` on Diogo's go.
- **Settled with Diogo (2026-10-27):** Dux Shell stays named (it is what's coming, not a
  comparison); `/next` keeps its "on a branch, not released" flag lines; no other project but
  ai-jail is named anywhere.

- **2026-10-27, omabox 1.0.0 is out** (tag v1.0.0). #3's work is done on this branch: the build
  reads 1.0's help (`crates/omabox/src/help.txt`), every `<!-- check -->` is settled from #390, the
  1.0 tab is dated, the link card is remade (`og/make.mjs` now dresses the whole home page), one
  look and the GPU measure taken, the artifact republished. **Left, on Diogo's go:** merge into
  `main` and push (it goes live), set `reviewed-release` to `v1.0.0` in that push (closes #2 and the
  "Review the site for omabox v1.0.0" issue), then check omabox.app: `curl -H 'Accept: text/markdown'
  https://omabox.app/install` and `https://omabox.app/llms.txt` (the agent side is untested on real
  Pages), the old anchors (`/#compare`, `/#never`, `/#drive`), Search Console's sitemap, and mark
  draft 5's artifact retired in AGENTS.md. Then delete this file.
- **Until the merge, `main`'s daily deploy fails** (from 2026-10-28's run; 2026-10-27's ran before the tag): its `build.mjs` still reads `bin/omabox`, which
  1.0 made a link, so omabox.app keeps its last deploy (0.9.2's pages). The fix is this branch's
  first 1.0 commit; the merge brings it.

To pick it up: "omabox 1.0 is out, finish the site" in a new session in this checkout, plus any
pointers on what changed. Start from #3.
