---
format: 1920x1080
duration: 60.5s
message: "Your agents get desktops of their own, so they test their apps without touching yours."
arc: Problem → Stakes → Turn → Fix → Uses → 1.0 → Close
audience: developers on Hyprland/Omarchy who run coding agents, on X
---

Design: concept: **the same desktop twice.** One stage box plays "your desktop" in both halves, the
same sentence typed in the same editor; the first time the agent's app lands on it, the second
time the agent works in four boxes and the desktop never moves. A small mono label `your desktop`
sits in its corner both times, so the match is plain.
Palette: frame.md (Tokyo Night); warn #f7768e for the problem half, good #9ece6a after the turn.
Type: Montserrat 900 statements, JetBrains Mono 700 labels, data and commands.
Beat grid: silent; reveals land on named times.

## Frame 1 — Your desktop (0.0–3.5)
- duration: 3.5s (one scene with frame 2: index.html#s1, 0–6.5)
- src: index.html#s1
- motion: footage card, full frame; a slow push (1.0 → 1.08) toward the editor; the window's pop
  at ~1.5 s is the hook (no intro before it: the feed decides in two seconds)
- take: `desk-problem`, `typing` → `pop`
- status: built
You're typing a sentence in your editor. The agent, in the next tile, starts testing omaseed: its
window opens on top of you at ~1.5 s. Label `your desktop` from frame 0. The statement is up from
0.3 s, warn, bottom third, so a muted viewer gets it at once: **"Your agent is testing its app. On
your desktop."** (it stays through frame 2).

## Frame 2 — What it costs (3.5–6.5)
- duration: 3s
- src: index.html#s2
- motion: coordinate-target-zoom on omaseed's Add torrent field as your words land in it
- take: `desk-problem`, `stolen` → `jump`
- status: built
Your "add a speed graph" lands in omaseed: the "a" opens its Add torrent sheet and "dd a speed
graph" fills the field. (The pointer jump was dropped: it happens outside the zoom.)

## Frame 3 — The turn (6.5–10.8)
- duration: 4.3s
- src: index.html#s3
- transition_in: whip
- motion: logo-assemble-lockup, then the pitch line by line
- status: built
The mark and `omabox`, then **"Your agents get desktops of their own. Yours stays untouched."**

## Frame 4 — The same work, in boxes (10.8–21.5)
- duration: 10.7s
- src: index.html#s4
- transition_in: match cut back to the same desktop, label `your desktop` in place
- motion: footage card; at ~13 s it shrinks left (≈60%) and four box cards fan in on the right
  (grid-card-assemble), each a `box-N` take with its name as a mono label; the agent's
  `omabox ls` zooms up at ~18 s
- take: `desk-boxed` `typing` → `done`; `box-1` … `box-4`
- status: built
The same sentence, typed straight through, not one key lost. Meanwhile four agents test omaseed in
four boxes. Statement, good: **"Four agents, four boxes. Nothing moves on yours."**

## Frame 5 — What boxes are for now (21.5–37.0)
- duration: 15.5s
- src: index.html#s4
- motion: a strip of four cards (in from the right, out to the left); the use types on under the
  head, which is in the accent so the two read apart
- status: built
Opens on **"32 releases later, agents use them to"** (accent), then (ink):
1. `film demos` (0.4–3.5): the themes box of frame 4 switching theme, a `● REC omabox record` chip.
2. `test on monitors you don't have` (3.5–6.6): one box, three monitors (`take.sh use-monitors`).
3. `check their own work` (6.6–10.0): a real check (`box/check/`, Save moved 6 px) run in 8K
   boxes; its printed lines and the baseline's and this run's 8K crops, laid out as `report.png`
   (omabox's own report.png stays ~700 px wide at any scale), brackets on the region.
4. `read an app as text` (10.0–15.5, the long one): the agent's `tree --find` lines from frame 4,
   then one scale for the same window: `~17 tokens` as text (a 10 px bar) against `~1,500` as a
   screenshot (the full bar, counting up); the 17 gets a green frame at the end.

## Frame 5b — And much more (37.0–43.5)
- duration: 6.5s
- src: index.html#s4b
- status: built
**"And much more, none of it on your desktop:"** Two previews (the themes box: "any theme, without
changing yours"; omabox.app's interactive.webp: "drive a box yourself, or peek in") and six lines
from the site's Uses and Develop pages: film with sound nobody hears, a web page off your screen,
find the crash before your users do, tray icons/notifications/a keyring, your bar plugin in every
theme, 4K shots on any monitor.

## Frame 6 — 1.0 (43.5–48.5)
- duration: 5s
- src: index.html#s5
- status: built
**omabox 1.0** (the wordmark) / `one Rust binary` / `about 3 ms to step into a box` / `exit codes
and --json: a contract for all of 1.x`.

## Frame 7 — What it does, what it prevents (48.5–55.0)
- duration: 6.5s
- src: index.html#s6
- status: built
omabox.app's hero: the pitch, its one-line description, and three tiles: `0 windows opened` (no
windows popping up, no cursor jumps), `0 focus taken` (no stolen focus, no password prompts), `0
left behind` (nothing left behind when the agent is done).

## Frame 8 — Close (55.0–60.5)
- duration: 5.5s
- src: index.html#s7
- status: built
The mark + the wordmark (Chakra Petch 700, as the site), `omabox.app`, the site's install line,
`free · MIT, every line`, `Today on Omarchy 4 · Hyprland 0.56+ · AMD, Intel or NVIDIA · plain
Hyprland is coming`. No credits (they're post 7).

## Decided (Diogo, 2026-10-27)

- The app is **omaseed**, the real use case. Its takes reuse omaseed-site/promo's stage (a demo
  library in the box; never the real library on :8080 or the playground on :8081).
- **Open on the problem**, no lockup first: the window pops at ~1.5 s, the pitch lands by 7 s.
- **Silent.** X and GitHub start it muted; it must work muted. A track can be added later.
- **No credits on screen**; the thanks are the thread's post 7 only.
- **Four uses**, not five (4K shots dropped: every shot is 4K).

## Round 2 (Diogo, 2026-10-27)

- The wordmark in the site's font (Chakra Petch 700); the typed text that lands in omaseed reads
  cleanly ("a graph of the last hour": the "a" opens Add torrent, the rest is the field's); a crisp
  check report; the uses' head in another colour; the tokens difference made the point of its
  card; an "and much more" slide; the end as the site's hero. Length 60.5 s.
- The project lives in omabox-site (house convention); media are not committed.
