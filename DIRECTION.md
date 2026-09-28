# omabox.com: direction and decisions

The site for [omabox](https://github.com/diogochaves/omabox), launched with omabox **0.2.0** so people
can find it. The domain is `omabox.com`. This folder is its own project on purpose: contributors to
omabox never have to deal with site code.

The page we iterate on is **`site/omabox.html`** (draft 4), published as a claude.ai artifact:
<https://claude.ai/artifact/TvfdLN5NpYnTR6VoLxc17d>. Older drafts are in `reference/`, to mine for
parts (see `reference/README.md`).

## What the site has to say

1. **The promise, first:** the agent never takes control of your system. No windows appearing out
   of nowhere, your cursor never moves, no focus stolen mid-sentence, no password or keyring
   prompts, no notifications or tray icons left behind, no workspace switches.
2. **The main idea: parallel boxes, like git worktrees.** A worktree keeps agents' code apart; a
   box keeps their screens, session buses and test runs apart. Each agent session gets its own box
   (named after its repo or worktree plus the session id, e.g. `app-tray-5cc72cdc`), so visual
   checks and desktop tests run side by side without seeing each other.
3. How an agent drives a box (and what is new in 0.2.0: `wait`, `--window`, shots of covered
   windows, click marks in peek).
4. How you look inside: peek, interactive mode, the bar widget (a playable copy).
5. Agents use it on their own: the skill (Claude Code, Codex, OpenCode, pi, Hermes), the opt-in
   guard, projects unchanged.
6. **Is omabox what you need?** Link out generously and honestly:
   - **Cua** (<https://cua.ai>, <https://github.com/trycua/cua>) when you want an agent to drive
     *your own* desktop without fighting you for the cursor and focus. That is Cua's main selling
     point, and omabox does the opposite (keeps agents off your desktop).
   - **ai-jail** (<https://aijail.io>) to limit what the agent itself can read, write and reach.
     omabox is not a sandbox; ai-jail is.
   - **omarchy-in-omarchy** (<https://github.com/jankeesvw/omarchy-in-omarchy>) when you need a whole
     machine (installer, system services, audio, suspend).
7. What a box gets, install, FAQ, contributors, footer.

Audience: Omarchy users who run coding agents; plugin, theme and app developers on Omarchy; people
arriving from the computer-use crowd (tell them early that omabox is Omarchy-only).

## Decisions (2026-09-27)

- **Release:** 0.2.0 (not "v2"). The site ships with it.
- **Separate project** (this folder), not a `site/` dir in the omabox repo.
- **Contributors:** code contributors only (GitHub contributors API, bots filtered out), identical
  tiles, alphabetical, no counts, Diogo included, no "maintainer" badge.
- **No GitHub organisation for now**; only if the project really grows.
- **Edit and test as an online artifact** for now; hosting on omabox.com (GitHub Pages or
  Cloudflare Pages) comes later.
- **Don't copy btso.dev** (Tyler's site; he is our only other contributor): no headshot hero, no
  daily ship grid, no ASCII bar charts, no ship log.
- **Lightweight is a feature.** cua.ai nearly froze this machine (two always-on WebGL scenes on the
  iGPU starve Hyprland). No WebGL/canvas scenes, no scroll-jacking; animations are transform/opacity
  only, pause when out of view (IntersectionObserver), and respect `prefers-reduced-motion`.

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

- **Dark, neon, "modern cyberpunk".** Tokyo Night by default (the theme the mark is drawn in); the
  swatches switch to Catppuccin, Gruvbox, Retro 82 (values from each theme's `colors.toml` in
  `/usr/share/omarchy/themes/*/`). Dark only, by choice.
- **Type:** Chakra Petch for headings (600, moderate sizes: h1 clamp(34px, 4.3vw, 58px), h2
  clamp(26px, 3vw, 40px); Diogo found big bold headings too much), Instrument Sans for text,
  JetBrains Mono (Omarchy's own font) for code, labels and UI chrome. Labels: mono, uppercase,
  wide tracking, a small glowing dash before them.
- **The logo is the star:** big pixel mark with a glow in the hero, lights up pixel by pixel (click
  to replay). Mark geometry (15x15): outer frame with gaps at the top right and bottom left, inner
  square with a 2-row bar. SVG path is in the page (`<symbol id="m">`) and in the omabox repo's
  `assets/`.
- **Cut frames:** cards, buttons, the install bar, box tiles and avatars have their top-right and
  bottom-left corners cut, echoing the mark's gaps (`.cut` + `.in`, `--cut` size).
- **Box = green frame.** Anything that is a box (tiles, peek windows, pop-ups) is framed in the
  brand green with a green-tinted title bar; your own desktop is neutral.
- Neon glow only on key words and the brand; a faint HUD grid behind the top of the page.

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
- Command output shown must match the CLI (`bin/omabox` in the omabox repo, `cua-ideas` branch for
  0.2.0 syntax). `omabox ls` columns: `NAME MODE SIZE STATE NET IDLE PLUGINS`.
- **To verify before going public:** the Cua descriptions (they come from cua.ai's page and
  Diogo's framing, "designed to work beside you"), ai-jail's platforms (Linux, macOS per its site),
  the omarchy-in-omarchy numbers (from the omabox README table, written 2026-09-24).
- omabox is not a security boundary: always say so where safety comes up.

## Open

- Not yet checked: phone width and the pop-up peeks of draft 4 in a real browser.
- Contributors are hardcoded; the real build fetches them.
- Hosting on omabox.com, a build step (fetch README/CHANGELOG/contributors at a pinned omabox tag).
- Light theme? (Dark only was a choice in drafts 3-4; revisit if asked.)
