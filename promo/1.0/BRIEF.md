---
message: "Your agents get desktops of their own, so they test their apps without touching yours."
destination: x-feed (post 1 of the thread), Discord, the top of the README
aspect: 1920x1080
language: en-GB
audience: developers on Hyprland/Omarchy who run coding agents, scrolling X; most have never heard of omabox
length: 60.5s
arc: problem-fix
music: none (silent; reveals on named times; decided 2026-10-27)
---

## Intent

The 1.0 release video (omabox#401). omabox was made while building omaseed: the agent kept testing
it on the real desktop, popping up windows, moving the cursor, typing into its app. The video
plays that problem on "your desktop" (a stage box, as the 0.2.0 clip did), then the same work done
in boxes while the desktop stays still, then a glimpse of what boxes are used for now, then 1.0.

The one thing to remember: **the agent's windows never land on your desktop.**

## Takes

All 4K (`--size 3840x2160,scale=2`), Tokyo Night, stock bar, `--net isolated`, no host or user
names (`--clean` where a prompt shows), no fastfetch.

- `desk-problem`: a stage box plays your desktop. You type a sentence in a terminal editor; the
  agent (a second terminal) starts omaseed on the same desktop: its window opens over your editor,
  takes focus, the rest of your sentence lands in its search field, the pointer jumps to its
  button. Marks: `typing`, `pop`, `stolen`, `jump`.
- `desk-boxed`: the same stage, the same sentence. The agent starts four boxes inside the stage
  (`omabox up` ×4) and runs its app in each; your editor never loses a key; the agent's terminal
  ends on `omabox ls` with four boxes. Marks: `typing`, `ls`, `done`.
- `box-1` … `box-4`: what each of those four boxes shows meanwhile (recorded in the boxes
  themselves, at the same time): the app under test, each at a different step.
- `use-record`, `use-monitors`, `use-check`, `use-tree`: one short take per use (below).

## Assets

- The mark: `omabox-site/site/media/icon.svg` (Tokyo Night green); the wordmark set in the house
  type.
- The check report: a fresh `omabox check` run as for `check-report.webp` (never the approve run's
  overview, which prints the baseline path).

## Credits

None in the video beyond the close's "free · MIT"; the thanks are post 7 of the thread
(@btsouth, overp0werj0int, who has no X handle, and @AkitaOnRails, cited for ai-jail, not a
contributor). Decided 2026-10-27.

## Notes

- Numbers on screen are 1.0.0's, measured in #390: about 3 ms to enter a box; `tree` about 17
  tokens against about 1.5k for a screenshot. 32 releases, 0.1.0 (2026-09-25) to 1.0.0 (2026-10-27)
  (counted from the tags).
- The pitch line is the site's hero: "Your agents get desktops of their own. Yours stays untouched."
- No "Introducing"; nothing posted by an agent.
