# omabox.app: direction and decisions

The site for [omabox](https://github.com/diogochaves/omabox), launched with omabox **0.2.0** so people
can find it. The domain is `omabox.app` (omabox.com belongs to someone else). This folder is its own project on purpose: contributors to
omabox never have to deal with site code.

The page we iterate on is **`site/omabox.html`** (draft 4), published as a claude.ai artifact:
<https://claude.ai/artifact/TvfdLN5NpYnTR6VoLxc17d>. Older drafts are in `reference/`, to mine for
parts (see `reference/README.md`).

## What the site has to say

Page order (since 2026-09-28):

1. **Hero: the promise.** The agent never takes control of your system. No windows appearing out
   of nowhere, your cursor never moves, no focus stolen mid-sentence, no password or keyring
   prompts, no notifications or tray icons left behind, no workspace switches.
2. **The problem, shown.** The same five agent steps side by side, on your desktop (app on top of
   your editor, your keystrokes in its app, workspace switch, cursor yanked, pkexec prompt,
   notifications and tray icons left) and with omabox (your desktop still, all of it in the box).
   Counters: red on the left, 0 on the right. Plays once when scrolled to, replay button.
3. **The promise, how:** each thing kept off (crossed out as it comes in), and how. Not a security
   boundary; points to ai-jail.
4. **The main idea: parallel boxes, like git worktrees.** A worktree keeps agents' code apart; a
   box keeps their screens, session buses and test runs apart. Each agent session gets its own box
   (named after its repo or worktree plus the session id, e.g. `app-tray-5cc72cdc`), so visual
   checks and desktop tests run side by side without seeing each other.
5. How an agent drives a box, with all of 0.2.0: `wait` and `--wait`, `windows` and `--window`,
   covered windows, `shot --fit` + `click --in`, `keys --pass`, click marks and key captions in
   peek, faster shots, NVIDIA.
6. How you look inside: peek, interactive mode, the bar widget (a playable copy).
7. Agents use it on their own: the skill (Claude Code, Codex, OpenCode, pi, Hermes), the opt-in
   guard, projects unchanged.
8. **Better together: ai-jail + omabox.** Praise ai-jail (Fabio Akita, AkitaOnRails): it fences what the agent can touch, omabox decides where it draws. The
   tested recipe (ai-jail 2.2.0): `omabox up; eval "$(omabox env)"; ai-jail --gpu --rw-map
   "$WAYLAND_DISPLAY" --env WAYLAND_DISPLAY -- ./build/app` runs a jailed app on the box's screen.
   Said plainly: a jailed *agent* can't drive omabox yet (the jail's own PID namespace hides the
   box; `omabox` inside it reports the box as dead).
9. **Is omabox what you need?** Link out generously and honestly:
   - **Cua** (<https://cua.ai>, <https://github.com/trycua/cua>) when you want an agent to drive
     *your own* desktop without fighting you for the cursor and focus. That is Cua's main selling
     point, and omabox does the opposite (keeps agents off your desktop).
   - **ai-jail** (<https://aijail.io>, <https://github.com/akitaonrails/ai-jail>) to limit what the
     agent itself can read, write and reach. omabox is not a sandbox; ai-jail is, and they stack.
   - **omarchy-in-omarchy** (<https://github.com/jankeesvw/omarchy-in-omarchy>) when you need a whole
     machine (installer, system services, audio, suspend).
10. What a box gets, install, FAQ, contributors, footer.

Audience: Omarchy users who run coding agents; plugin, theme and app developers on Omarchy; people
arriving from the computer-use crowd (tell them early that omabox is Omarchy-only).

## Decisions (2026-09-27)

- **Release:** 0.2.0 (not "v2"). The site ships with it.
- **Separate project** (this folder), not a `site/` dir in the omabox repo.
- **Contributors:** code contributors only (GitHub contributors API, bots filtered out), identical
  tiles, alphabetical, no counts, Diogo included, no "maintainer" badge.
- **No GitHub organisation for now**; only if the project really grows.
- **Edit and test as an online artifact** until launch; then omabox.app on Cloudflare Pages
  (decided 2026-09-28), and this repo goes public.
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
  0.2.0 syntax). `omabox ls` columns: `NAME MODE SIZE STATE NET IDLE PLUGINS`. Default idle is 2h
  (`0m/2h`), and a session's box goes down when its agent exits.
- The Drive terminal's output was captured from a real 0.2.0 box on 2026-09-28 (window titles
  shortened to `"~"` so no user or host name shows). In a box, `pkexec` prints `pkexec must be
  setuid root` and exits 127: no prompt reaches you.
- **To verify before going public:** the Cua descriptions (they come from cua.ai's page and
  Diogo's framing, "designed to work beside you"), ai-jail's platforms (Linux, macOS per its site),
  the omarchy-in-omarchy numbers (from the omabox README table, written 2026-09-24).
- omabox is not a security boundary: always say so where safety comes up.

## Open

- 0.2.0 isn't released: `cua-ideas` still says "Unreleased" in the CHANGELOG and `VERSION` is
  0.1.0. The site says 0.2.0 throughout.
- A jailed agent driving omabox: planned in omabox issue #16
  (<https://github.com/diogochaves/omabox/issues/16>), a broker on our side, no ai-jail change.

- Not yet checked: the pop-up peeks in a real browser (phone width checked in a box on 2026-09-28).
- omabox.app is registered (2026-09-28). The site deploys to omabox.pages.dev (noindex) until 0.2.0
  ships; attach omabox.app on launch day (AGENTS.md, "Hosting").
- Maybe later: fetch the README/CHANGELOG at a pinned omabox tag in the build.
- Light theme? (Dark only was a choice in drafts 3-4; revisit if asked.)
