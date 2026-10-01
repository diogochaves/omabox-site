# Bring omabox.app up to omabox 0.4.3

Written 2026-10-01. The site launched with omabox **0.2.0** (2026-09-29). omabox is now at **0.4.3**
(seven releases: 0.2.1, 0.3.0–0.3.2, 0.4.0–0.4.3). This is the work list for the update. Read
`AGENTS.md` and `DIRECTION.md` first: their rules hold (light motion, output matching the real CLI,
screenshots from a box, "not a security boundary").

Sources of truth, all in `~/code/omarchy/omabox`: `CHANGELOG.md` (sections 0.2.1 to 0.4.3),
`README.md` (Install, What you need, Related projects), `bin/omabox help`. Line numbers below are
`site/omabox.html` as of commit 57a4718.

## 1. Wrong now (fix first)

Done 2026-10-01 on the single page (the terminal script's capture stays for section 3). The plan for
the rest, pages included, is in `DIRECTION.md`, "Decisions (2026-10-01)"; section 5 is decided there.

- [x] **Version 0.2.0 throughout.** Hero mark "0.2.0 · for Omarchy" (l. 539), the ai-jail caption
  (l. 846), the terminal script's comment (l. 1077, goes with re-capturing it, see 3), the playable
  widget's settings face "omabox 0.2.0" (l. 1133), and `build.mjs` l. 75 (JSON-LD `softwareVersion`). Decide
  whether the page names a version at all (see 5).
- [x] **ai-jail: "Not yet: an agent inside ai-jail driving omabox itself … planned in issue #16"**
  (l. 848). #16 closed on 2026-09-29: since **0.3.0** a jailed agent drives boxes of its
  own through `omabox broker on` (a systemd user socket; it prints the lines for `~/.ai-jail`), no
  change to ai-jail. The broker keeps a jail's boxes to what the jail has: no network when it has
  none, only its project, only its own boxes, gone when it exits. Not for a jailed agent: `host`,
  `peek`, interactive boxes, `guard`, `config` changes. Rewrite the paragraph (README "Related
  projects" has the tested wording) and consider showing it in the ai-jail diagram: today it says
  the agent stays under the guard and only the *apps* go in the jail.
- [x] **Install section** (l. 880–888):
  - "A patched aquamarine until a release ships PR #415": since **0.4.0** boxes run on the system's
    aquamarine; the fix is needed **only for headless boxes on NVIDIA and for confirm-close**
    (`omabox setup --aquamarine` builds it; `install.sh` still runs it). Also carries omabox's fix for
    held keys in interactive boxes (0.4.2).
  - `omarchy plugin enable chaves.omabox # the bar widget`: `install.sh` → `omabox setup` now asks
    whether to put the widget in the bar (0.4.2). The line can go, or become the fallback.
  - "To remove it, see the README": still right, and removal is now `omabox setup --remove` (0.4.0);
    worth one line on the page.
- [x] **Agents card "A skill they already load"** (l. 718): "`install.sh` puts the skill …" →
  `omabox setup` does (install.sh runs it; a package's users run it themselves).
- [x] **Bar widget copy and the playable panel**: the real panel now has `v` (paste your clipboard
  into an interactive box), `c` (copy the box's clipboard out), `f` (keys-to-box), `n` needs pressing
  twice, the icon lights while SUPER keys go to a box, and it says when it is older than the omabox
  installed. The page's copy lists ↑↓ p s d n r. Update the keys and, if cheap, the rows/settings face
  (`plugin/Panel.qml` in omabox).
- [x] **Interactive card** (l. ~187): "SUPER+ALT+ESC sends SUPER keys into it" is still true, but
  0.3.0/0.3.1 added **keys-to-box**: SUPER keys follow focus and the pointer into the box, with a red
  border while they do. Say it.

## 2. Missing: what 0.2.1–0.4.3 added

Pick what earns a place; not everything needs a card. Grouped by who it is for.

Agents (Commands section, "And the rest", the typed terminal):
- [ ] **Saves** (0.3.0): `omabox save SAVE` keeps a box's HOME (signed in, a PIN, a library), `up
  --from SAVE` / `run --from SAVE` start from it; `omabox saves`, `saves rm`. A good card: "sign in
  once, every box starts signed in".
- [ ] **Seeing inside a box** (0.3.0): `omabox log` (Hyprland, shell, apps, `run -d`; `-f`, `--grep`),
  `omabox events` (Hyprland's events, `--mark`/`--since`, `--until RE` waits for one), `omabox lua
  EXPR`.
- [ ] **Input like a hand** (0.3.0): `drag`, `click --steps N` (travel, hover on the way), `--mod ctrl`.
- [ ] **`run -d --replace`** (0.3.0): restart an app after a rebuild in one step. `run --env-file`.
- [ ] **Plugin work** (0.4.3): `up --plugin` and `restart-shell` say *why* a plugin is not in the bar
  (validator or shell message); `ls --json` records what a box tested (Omarchy version, theme, each
  plugin's commit `+dirty`); the skill maps plugin/app steps written for the real desktop to boxes.
- [ ] **Test your Hyprland or Omarchy change** (0.3.0, 0.4.2): `up --hyprland PATH` (a Hyprland build
  of yours), `up --omarchy DIR` (an Omarchy checkout, like `omarchy dev link` without touching your
  system). Fits the "Your projects stay as they are" table or a new card for Hyprland/Omarchy
  contributors.
- [ ] "And the rest" list (l. 168–181) is missing: `lua`, `log`, `events`, `drag`, `save`/`saves`,
  `clip`, `keys-to-box`, `broker`, `setup`. And `up`'s options line: `--from`, `--hyprland`,
  `--omarchy`, `--json`.

You, driving a box:
- [ ] **`omabox clip`** (0.3.0): your clipboard into an interactive box once (a password, a URL), and
  back with `--from-box`; never for agents.
- [ ] keys-to-box (see 1).

Installing:
- [ ] **`omabox setup` / `setup --remove`** (0.4.0) and the read-only system install
  (`/usr/lib/omabox`, `/usr/bin/omabox`).
- [ ] **The omarchy-pkgs path**: PR omacom/omarchy-pkgs#754 (Add omabox) is **open, not merged**
  (waiting for a maintainer). Don't show `pacman -S omabox` until it merges. Prepare the block
  (package install + `omabox setup`; "from a checkout to the package": `omabox setup --remove` in the
  checkout first) so it can go live the day it merges. Decide now whether the page says "coming to
  Omarchy's package repository" before then (see 5).

## 3. Re-check before saying it again

- [ ] "about 500 MB, up in 3–4 s" (parallel section, Compare card): measure a 0.4.3 box.
- [ ] Hardware line: README now says AMD and Intel iGPUs, RTX 4070 SUPER (615.71.09), RTX 5070 Ti
  (610.57.04, open module). The site's FAQ names the 4070 driver only.
- [ ] ai-jail (the app recipe re-run with ai-jail 2.2.1 and omabox 0.4.3 on 2026-10-01, passed; the
  broker still to run): DIRECTION.md says 2.2.1 is current and the page says the recipe was tested with 2.2.0. Check aijail.io /
  their releases, and re-run the recipe (and the broker) with omabox 0.4.3 so the caption can say so.
- [ ] Cua and omarchy-in-omarchy claims ("Written in September 2026"): re-read their pages; update the
  date line if anything moved.
- [ ] The Commands terminal output was captured from a 0.2.0 box (2026-09-28). Re-capture from 0.4.3
  (window titles shortened to `"~"`) or confirm nothing it shows changed. `omabox ls` columns are
  unchanged (`NAME MODE SIZE STATE NET IDLE PLUGINS`), idle default still 2h.
- [ ] Screenshots in `site/media/`: still representative of the 0.4.x widget and boxes?
- [ ] Contributors: only btsouth and diogochaves on the page; the build fetches them, so check the
  hardcoded fallback list still matches.

## 4. Site files that pin 0.2.0

- [ ] `AGENTS.md` "Rules": output must match `bin/omabox` at `v0.2.0` → the new tag (`v0.4.3`).
- [ ] `DIRECTION.md`: "launched with 0.2.0", "Facts to keep right" (tag, captured output), the Open
  list (#16 "planned" is done; "fetch the README/CHANGELOG at the release tag" idea). Add a dated
  "Decisions" block for this update.
- [ ] Commands section rule in DIRECTION: "Not 'new in 0.2.0': … shows the whole CLI". Same idea now:
  no "what's new" list on the page, unless decided otherwise (see 5).

## 5. Decisions for Diogo

- **Name a version on the page?** Each release (three on 2026-10-01 alone) makes it stale. Options:
  keep it and bump on every release; fetch the latest tag at build time (`build.mjs` already calls the
  GitHub API daily for contributors); or drop it from the hero.
- **A "What's new" strip or changelog link** vs. the current rule (the page shows the whole CLI, no
  "new in" labels).
- **omarchy-pkgs before it merges:** say nothing, or "on its way to Omarchy's package repository"?
- **How much of 0.3–0.4 gets its own card:** saves and plugin diagnostics are the strongest stories;
  log/events/lua could be one card ("see inside a box"); drag/steps/mod a line.
- **Hyprland/Omarchy contributors as an audience** (`--hyprland`, `--omarchy`, the Omarchy PR review
  recipe): a card, or only a row in the "Your projects stay as they are" table.

## 6. Then

Check in a box (`AGENTS.md`, "Checking a change": desktop and 412x915), GPU at idle and scrolling
still about 0, publish to the artifact (same `url`) for review, then push to main (deploys
omabox.app).
