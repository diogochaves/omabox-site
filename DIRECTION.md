# omabox.app: direction and decisions

The site for [omabox](https://github.com/diogochaves/omabox), launched with omabox **0.2.0** so people
can find it. The domain is `omabox.app` (omabox.com belongs to someone else). This folder is its own project on purpose: contributors to
omabox never have to deal with site code.

The page we iterate on is **`site/omabox.html`** (draft 4), published as a claude.ai artifact:
<https://claude.ai/artifact/TvfdLN5NpYnTR6VoLxc17d>. Older drafts are in `reference/`, to mine for
parts (see `reference/README.md`).

## What the site has to say

Four pages since 2026-10-01 (Decisions 2026-10-01): the home page tells the story; `/commands`,
`/develop` and `/changelog` hold the rest. The other pages' nav: Overview, Commands, Develop,
Changelog, Install, GitHub, and a row of page links in their head (the nav is hidden on phones).
The home page links them from the Commands and Agents sections, the version under the big mark
(to `/changelog`) and the footer.

Home page order (since 2026-09-29). Nav: What it fixes, How it works, Commands, ai-jail, Compare,
Install, GitHub (with its mark).

1. **Hero: the promise.** The agent never takes control of your system. No windows appearing out
   of nowhere, your cursor never moves, no focus stolen mid-sentence, no password or keyring
   prompts, no notifications or tray icons left behind, no workspace switches.
2. **What it fixes, shown** (`#fixes`). The same five agent steps side by side, on your desktop
   (app on top of your editor, your keystrokes in its app, workspace switch, cursor yanked, pkexec
   prompt, notifications and tray icons left) and with omabox (your desktop still, all of it in the
   box). Counters: red on the left, 0 on the right. Plays once when scrolled to, replay button.
3. **The promise, how** (`#never`, "How it works"): each thing kept off (crossed out as it comes
   in), and how; then what a box gets and what stays off until you ask. Not a security boundary;
   points to ai-jail.
4. **The main idea: parallel boxes, like git worktrees.** A worktree keeps agents' code apart; a
   box keeps their screens, session buses and test runs apart. Each agent session gets its own box
   (named after its repo or worktree plus the session id, e.g. `app-tray-5cc72cdc`), so visual
   checks and desktop tests run side by side without seeing each other.
5. Agents use it on their own: the skill (Claude Code, Codex, OpenCode, pi, Hermes), the opt-in
   guard, saves ("sign in once, every box starts signed in"), a pointer to `/develop`, projects
   unchanged.
6. **Commands** (`#drive`): the typed terminal and its peek, then the commands agents use most
   (up/down, run, shot, keys/click, wait, windows), each with a real example, then "Every other
   command" → `/commands`. ("And the rest", a list of the others, moved there on 2026-10-01.)
7. How you look inside: peek, interactive mode, the bar widget (a playable copy).
8. **Better together: ai-jail + omabox.** Praise ai-jail (Fabio Akita, AkitaOnRails): it fences what the agent can touch, omabox decides where it draws. The
   tested recipe (ai-jail 2.2.1, omabox 0.4.3, re-run 2026-10-01): `omabox up; eval "$(omabox env)";
   ai-jail --gpu --rw-map "$WAYLAND_DISPLAY" --env WAYLAND_DISPLAY -- ./build/app` runs a jailed app
   on the box's screen. Since omabox 0.3.0 a jailed *agent* drives boxes of its own through
   `omabox broker on` (wording from the omabox README, "Related projects"; not yet run by us), with
   what it can't do (`host`, `peek`, interactive boxes, guard, config) said plainly.
9. **Is omabox what you need?** Link out generously and honestly:
   - **Cua** (<https://cua.ai>, <https://github.com/trycua/cua>) when you want an agent to drive
     *your own* desktop without fighting you for the cursor and focus. That is Cua's main selling
     point, and omabox does the opposite (keeps agents off your desktop).
   - **ai-jail** (<https://aijail.io>, <https://github.com/akitaonrails/ai-jail>) to limit what the
     agent itself can read, write and reach. omabox is not a sandbox; ai-jail is, and they stack.
   - **omarchy-in-omarchy** (<https://github.com/jankeesvw/omarchy-in-omarchy>) when you need a whole
     machine (the real installer, system services, a reboot).
   Cards only: the comparison table said the same things again and was dropped (2026-09-29); its
   facts (platforms, cost, security boundary) are in the cards.
10. Install, FAQ, contributors, footer.

Audience: Omarchy users who run coding agents; plugin, theme and app developers on Omarchy; people
arriving from the computer-use crowd (tell them early that omabox is Omarchy-only).

## Decisions (2026-10-01): the 0.4.3 update, and pages

omabox went from 0.2.0 to 0.4.3 in three days (three releases on 2026-10-01 alone), and the page's
reference parts went stale with it (the checklist: `UPDATE-0.4.3.md`). Agreed with Diogo:

- **Story by hand, reference generated.** What barely changes between releases (the promise, the
  problem, parallel boxes, ai-jail, compare, install) is written by hand. What changes every release
  (every command, `up`'s options, the changelog, the version) is generated by `build.mjs` from the
  omabox repo at its latest release tag, so it can't go stale.
- **Four pages:**
  - `/`: the story, a little shorter. Commands keeps the typed terminal and the six commands agents
    use most, then "All commands →"; "And the rest" and `up`'s options move out. Agents gets a
    **Saves** card ("sign in once, every box starts signed in"). Look inside gets keys-to-box and
    `clip`. A line points developers to `/develop`.
  - `/commands`: every command and option, generated from `omabox help` at the latest tag, with
    hand-written examples for the most used ones (`log`, `events`, `lua` live here).
  - `/develop`: for plugin, theme and app developers and Hyprland/Omarchy contributors, by hand:
    `up --plugin` diagnostics and `restart-shell`, `ls --json`, saves, `--omarchy`, `--hyprland`.
  - `/changelog`: generated from the omabox `CHANGELOG.md`.
- **The version is fetched at build time** (the latest release), with the source's as the fallback,
  like the contributors. In the hero it will link to `/changelog`.
- **No "new in" on the home page** (the rule stays); what's new lives on `/changelog`.
- **omarchy-pkgs (omacom/omarchy-pkgs#754): say nothing until it merges.** "Coming" would promise a
  maintainer's decision. Have the package install block ready for the day it does.
- **Order:** first fix what was wrong on the single page and ship it (done 2026-10-01: version,
  ai-jail broker, install, skill, widget keys, keys-to-box, `clip`); then the pages (done
  2026-10-01); then re-check the claims in `UPDATE-0.4.3.md` section 3.
- **How the pages came out** (2026-10-01): `/commands` lists all 31 commands of 0.4.3 in six groups,
  each with a line, examples and its exact synopsis. omabox's main branch already has help per
  command (`@` lines in the usage heredoc); 0.4.3 doesn't, so for now the rest of `omabox help`
  shows once, as "The details", and each command gets its own `omabox help CMD` text by itself
  once a release has it. `/changelog` renders `CHANGELOG.md` at the release. `/develop` is plugins,
  themes and apps (the stock bar, plugin diagnostics, `ls --json`, saves, `run -d --replace`,
  `--systemd`, the skill), then Hyprland and Omarchy themselves, and what a box can't test.

## Decisions (2026-09-27)

- **Release:** 0.2.0 (not "v2"). The site ships with it.
- **Separate project** (this folder), not a `site/` dir in the omabox repo.
- **Contributors:** code contributors only (GitHub contributors API, bots filtered out), identical
  tiles, alphabetical, no counts, Diogo included, no "maintainer" badge.
- **No GitHub organisation for now**; only if the project really grows.
- **Edit and test as an online artifact** until launch; then omabox.app on Cloudflare Pages
  (decided 2026-09-28). This repo went public on 2026-09-28, before launch, so Actions could deploy.
- **Don't copy btso.dev** (Tyler's site; he is our only other contributor): no headshot hero, no
  daily ship grid, no ASCII bar charts, no ship log.
- **Lightweight is a feature.** cua.ai nearly froze this machine (two always-on WebGL scenes on the
  iGPU starve Hyprland). No WebGL/canvas scenes, no scroll-jacking; animations are transform/opacity
  only, pause when out of view (IntersectionObserver), and respect `prefers-reduced-motion`.

## Decisions (2026-09-28)

- **Domain: omabox.app, hosted on Cloudflare Pages.** omabox.com is taken.
- **Contributors are fetched at build time** from the omabox repo: people only. Bots and AI agent
  accounts (Claude, Codex, Copilot...) are dropped; human first names (devin, jules, cody) are not
  treated as agents.
- **No marketing video in this version.** The site uses what exists (the 55 s demo, screenshots,
  CSS scenes). A problem-then-fix video may come in a later version, or only for x.com.
- **Show the problem before the promise** (the side-by-side scene), and cover all of 0.2.0.
- **Praise ai-jail and show the two together**, with only what was tested.
- **More motion, still light:** sections fade in once, a glint runs along each section's top edge,
  the header shows scroll progress and the current section, the promise labels get crossed out.
  All transform/opacity, once or paused off screen. Measured: about 2% Chromium GPU at 1080p with
  the hero's loops on screen, near 0 elsewhere.

### Rejected, and why

| Draft | What it tried | Diogo's verdict |
|---|---|---|
| 1 `reference/1-pixel-zoom` | Pixel font (Silkscreen), the logo's lid opening, long sticky scroll zooms from box to box | "Feels old in a bad way", animations take too much scroll, pixel font is bad |
| 2 (artifact v1, see `reference/2-peek-frame`) | IBM Plex, the hero's peek window grows into a frame around the page | First zoom was bad: an empty frame grew, the content didn't grow with it |
| 3 `reference/3-nested-zoom` | Real camera zoom through 7 nested boxes (content inside each box scales with it), Lenis smooth scroll, depth pill | Better, kept as reference, but slow; too much time spent zooming; scroll-locked; nesting depth is not the main idea |
| 4 `site/omabox.html` | Parallel boxes, the promise on top, links out, cut frames, logo highlighted | **The one we iterate on** |

Liked along the way: entering a box (as a feeling, not a long zoom), the typed terminal (herdr.dev
style), the playable widget, the demo playing inside a box, the compare section and linking ai-jail,
aijail.io's plain narrative and compare page as a reference.

## Visual system (draft 4)

- **Dark, neon, "modern cyberpunk", Tokyo Night only** (the theme the mark is drawn in). Dark only,
  by choice. The theme switcher is gone (2026-09-28): four swatches looked cheap, and a nicer menu
  (the mark in each theme's colours) was still more than the page needs.
- **Type:** Chakra Petch for headings (600, moderate sizes: h1 clamp(34px, 4.3vw, 58px), h2
  clamp(26px, 3vw, 40px); Diogo found big bold headings too much), Instrument Sans for text,
  JetBrains Mono (Omarchy's own font) for code, labels and UI chrome. Labels: mono, uppercase,
  wide tracking, a small glowing dash before them.
- **The logo is the star:** one mark only. At the top of the page the big pixel mark (with its glow
  and "0.4.3 · for Omarchy", the version from the build) sits in a see-through header; the first 120 px of scroll shrink it into
  the bar's corner, as if into a box, while the bar's background fades in (2026-09-28). It lights up
  pixel by pixel. Clicked, at any size, it breaks and the page goes back to the very top (2026-09-29): its pixels burst, fall into a heap under it (a different heap each time), blink like loot in a game, vanish, and it powers on again. The wordmark sits 10 px further right at full size so the heap never reaches it (WAAPI transform/opacity on the 75 rects, only while it plays; no measurable GPU cost). Mark geometry (15x15): outer frame with gaps at the top right and bottom left, inner
  square with a 2-row bar. SVG path is in the page (`<symbol id="m">`) and in the omabox repo's
  `assets/`.
- **Cut frames:** cards, buttons, the install bar, box tiles and avatars have their top-right and
  bottom-left corners cut, echoing the mark's gaps (`.cut` + `.in`, `--cut` size).
- **Box = green frame.** Anything that is a box (tiles, peek windows, pop-ups) is framed in the
  brand green with a green-tinted title bar; your own desktop is neutral.
- Neon glow only on key words and the brand. The background is an aurora of the theme's colours,
  drawn once (2026-09-29): green by the mark, blue top right, violet and cyan lower down. It replaced
  a faint square HUD grid Diogo didn't like; also tried: plain, dots, scanlines, scattered pixels,
  grain.
- No horizontal scroll on phones, down to 320 px: grids use `minmax(0, 1fr)` columns so long code
  scrolls in its block, and inline code wraps under 480 px. `overflow-x: clip` on the body hides
  overflow on desktop but not on phones, so it is no fix.

## Interactions (draft 4)

- Hero live view: your desktop (nvim typing, your cursor still, counters stuck at 0) beside three
  busy box tiles (clicking through an app, checking the launcher, running 42 tests). CSS loops,
  paused off screen.
- A box opens in place: clicking a tile grows it (~0.4 s) into a real screenshot of a box; the demo
  video opens the same way, inside a box, not a new window.
- Parallel lanes: worktree → agent → box; "+ Start another agent" boots one, "down" ends one; an
  `omabox ls` panel in the real column format updates.
- Typed terminal (once, when scrolled to; replay button) with a peek that follows it.
- Playable widget: the real panel's rows, actions, keys (↑↓ p s d n r), settings face.

## Facts to keep right

- Every screenshot on the page was taken by omabox in a box (see `site/media/README.md`).
- Command output shown must match the CLI: `bin/omabox` at the latest release tag (`v0.4.3` on
  2026-10-01, <https://github.com/diogochaves/omabox/tree/v0.4.3>).
  The install steps and README links on the page follow main. `omabox ls` columns: `NAME MODE SIZE STATE NET IDLE PLUGINS`. Default idle is 2h
  (`0m/2h`), and a session's box goes down when its agent exits.
- The Drive terminal's output was captured from a real 0.2.0 box on 2026-09-28 (to re-capture
  from 0.4.3, or confirm unchanged: `UPDATE-0.4.3.md` section 3) (window titles
  shortened to `"~"` so no user or host name shows). In a box, `pkexec` prints `pkexec must be
  setuid root` and exits 127: no prompt reaches you.
- Claims about other projects were checked against their own sites and READMEs on 2026-09-29: Cua
  is mainly cloud fleets for training and evals, and its Driver works beside you on your desktop
  (experimental on Hyprland, a few apps); ai-jail runs on Linux, macOS and Windows through WSL2
  (2.2.1 is current; the recipe was re-run with 2.2.1 and omabox 0.4.3 on 2026-10-01); omarchy-in-omarchy installs itself in about
  30 minutes once, then boots in about 18 s (its README doesn't mention audio or suspend).
- omabox is not a security boundary: always say so where safety comes up.

## Open

- The 0.4.3 update: `UPDATE-0.4.3.md` sections 3 (claims to re-check) and 4 (these files) are
  still open; the pages are done (Decisions 2026-10-01).

- Not yet checked: the pop-up peeks in a real browser (phone width checked in a box on 2026-09-28).
- Launched at omabox.app on 2026-09-29, with omabox 0.2.0 out (AGENTS.md, "Hosting").
- SEO: the build writes a description, canonical, Open Graph and Twitter cards, JSON-LD
  (SoftwareApplication), `robots.txt` (Disallow on the preview) and, for omabox.app only,
  `sitemap.xml`. On launch: submit omabox.app to Google Search Console, and link it from the omabox
  repo's website field and README.
- Light theme? (Dark only was a choice in drafts 3-4; revisit if asked.)
