# Checkpoint: the 1.0 site, waiting for omabox 1.0

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

To pick it up: "omabox 1.0 is out, finish the site" in a new session in this checkout, plus any
pointers on what changed. Start from #3.
