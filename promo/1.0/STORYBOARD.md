---
format: 1920x1080
duration: ~60s
message: "Your agents get desktops of their own: they stop taking yours, and they test what they build, the same way every time."
arc: Problem (sepia) → Turn → Pillar 1: hands off your desktop → Pillar 2: visual tests an agent scripts once → More uses → 1.0, free → Close
audience: developers on Hyprland/Omarchy who run coding agents, on X; most have never heard of omabox
tone: cut 2's clear script, cut 3's opening; the infomercial only as visual gags (stickers, a banner, a starburst, fine print), never as whole slides.
---

Design: cut 2's look (Tokyo Night, Montserrat statements, Chakra Petch wordmark, real footage
large and legible). The problem is **sepia**: the same footage, warm and faded with a soft vignette
and a light film grain, readable; colour snaps in at the turn. Gags are stickers on clean slides:
Anton caps in yellow with a black outline, a red slanted banner, starbursts.
Every number real (#390, CHANGELOG, omaseed's baseline); the prices are the only joke number.
Quotes only from Tyler's own post (with his OK), never made up.

## Act A — The problem, in sepia (0.0–8.5)

1. **"Are you tired of your agent stealing your focus…"** (0.0–2.6). `desk-problem`, zoomed on your
   editor so the sentence you type is legible; omaseed's window lands at ~1.8 s and the camera
   pulls back to show it.
2. **"…your keystrokes…"** (2.6–4.4). Zoom on its Add torrent field: "graph of the last hour".
3. **"…and your mouse?"** (4.4–5.8). The pointer jumps from your editor to its window (real
   footage), a motion-line sticker drawn along the jump.
4. **Tyler, first line** (5.8–8.5). The frame dims; a quote card with his avatar, name and handle:
   *"No more agents stealing window focus while I'm mid-sentence. Sounds small until it happens
   50x a day."* — Tyler South, @btsouth.

## Act B — The turn (8.5–11.0)

5. Colour snaps in. The mark and the wordmark, a small **NEW! 1.0** starburst sticker, the pitch:
   "Your agents get desktops of their own. Yours stays untouched." (2.5 s, no separate intro card.)

## Act C — Pillar 1: hands off your desktop (11.0–21.0)

6. `desk-boxed`: the same sentence typed straight through while the agent's terminal runs `omabox
   up`… A **NOT ONE KEY LOST!** sticker (gag) slaps on at ~13 s.
7. The desktop steps aside, four boxes fan in, `omabox ls` lists them. Statement: **"Four agents,
   four boxes. Nothing moves on yours."** Tyler's card again, his last line: *"0 AI-agent-induced
   rage incidents since install 😂"*

## Act D — Pillar 2: visual tests an agent scripts once (21.0–36.0)

Statement over the act: **"And it's how your agent tests what it builds."**
8. **Script it once** (21.0–24.5). A code card: the scenario, a short real script (`box/check/visual.sh`
   or an excerpt of omaseed's `scripts/dev/visual-check.sh`): `omabox run`, `omabox keys`, `omabox
   check point`. Line: "Your agent writes the visual pass once."
9. **Every screen** (24.5–28.5). A wall of omaseed's 28 baseline screens (its library, details,
   menus, palette, help, the add sheet, the bar widget, every Settings page) tiling in. Line:
   "omaseed's agents check 28 screens this way before a person ever looks."
10. **The next version** (28.5–32.0). The 8K check card: `changed prefs: 1 region`, `tree: moved
    +0,+6 button "Save"`, baseline beside this run, brackets. Line: "Run it again on the next
    build: it names what moved, by the pixel."
11. **As text** (32.0–36.0). The tokens card: ~17 tokens as text against ~1,500 as a screenshot.
    Line: "It reads your app as text, too."

## Act E — More uses (36.0–43.5)

12. A **BUT WAIT… THERE'S MORE!** banner slides across (1 s, a gag), then cut 2's "And much more"
    layout, quicker: film demos (REC), monitors you don't own, any theme without changing yours,
    drive a box yourself or peek in; and the six-line list.

## Act F — 1.0, and the price (43.5–50.0)

13. **omabox 1.0** (the wordmark): one Rust binary · about 3 ms to step into a box · exit codes and
    --json, a contract for all of 1.x (3.5 s).
14. The gag (3 s): ~~$99.99~~ → a **FREE!** starburst, "MIT, every line".

## Act G — Close (50.0–58.0)

15. Cut 2's close, as the site's hero: the lockup, the pitch, its one-line description, the three
    zero tiles, omabox.app, "free · MIT, every line", "Today on Omarchy 4 · … plain Hyprland is
    coming". A one-line fine print under it (gag): *"No desktops were harmed in the making of this
    video. Every shot filmed in omabox."*

## Decided (Diogo, 2026-10-27) and built (cut 4, 59.5 s)

- The user quotes are a real post, shown without a name, handle or photo: a generic avatar, "an
  omabox user, on X", under "See what our users are saying". The thread can credit him by name.
- No password prompt: the problem is three real shots (focus, keys, mouse).
- The price gag is a pricing page (Pro $99/mo, Team $499/mo, Enterprise "Call us"), struck out and
  falling away: FREE!, MIT since day one (LICENSE in 0.1.0, 2026-09-25). The plans are the joke.
- The fine print crosses the frame in 1.4 s, five times: unreadable unless paused (the gag), ending
  "You paused to read this. Respect." It also carries real lines: not a sandbox (pair it with
  ai-jail), the requirements, not affiliated with Omarchy or Hyprland.
- Acts are compositions/b1…b7; cut 2 and cut 3 are in cut2/ and cut3/.
- Round 6: the users' card moved after the pitch (problem → product → what users say: b2u); "No pricing plans included. Ever." centred in the space under the struck label. 64 s.
- Round 5: six previews in "and much more" (two new stills: `take.sh use-notify`, a notification;
  `take.sh use-web`, omabox.app built from this checkout into assets/site and opened in Chromium in a
  box); the 1.0 slide gains three tiles (32 releases in 32 days, the tags; 10 security rules with
  their tests, SECURITY.md; 5 agents, the site's "Works with"); the licence leads ("MIT license,
  since day one", FREE!) and a pricing page falls away under it ("No pricing plans included. Ever.");
  the fine print crosses once in 8.6 s, with more puns. 63.5 s.
