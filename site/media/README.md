# Media

All taken with omabox, in a box (nothing from a real desktop), on 2026-09-27 unless noted.

| File | What | How |
|---|---|---|
| `desktop.webp` | A box's bare desktop, Tokyo Night, stock bar | `omabox up -b site --stock-bar`, `omabox run -b site -- omarchy-theme-set tokyo-night`, `omabox shot` |
| `term-tokyo-night.webp` | foot with fastfetch, in tokyo-night | `omabox keys super+return`, `omabox keys -t 'clear; fastfetch --structure OS:Kernel:WM:Terminal:Font:Colors' Return`, `omabox shot` (no Title line: it showed the user and host names) |
| `menu.webp` | Omarchy's launcher, Retro 82 | `omabox keys super+alt+space`, `omabox shot` |
| `interactive.webp` | An interactive box next to its terminal | from the omabox repo, `docs/media/interactive.png` (made by `docs/demo.sh`) |
| `clip.mp4`, `clip-poster.webp` | The 43 s clip (0.2.0, 2026-09-29): an agent testing an app on your desktop, then in a box | from the omabox repo, `docs/media/clip-0.2.0.mp4` and `clip-0.2.0.png` (the 55 s demo it replaced, from 0.1.0, was dropped on 2026-10-01) |
| `avatar-*.jpg` | GitHub avatars of code contributors, for the artifact (the build fetches fresh ones into `dist/media/avatars/`) | `https://avatars.githubusercontent.com/u/<id>?s=96` |
| `og.png` | The link card (1200x630), 2026-09-28 | a card made from the page's own styles (mark, headline, the hero's live view), opened in chromium `--kiosk` in a box started with `--size 1200x630`, `omabox shot` |
| `icon.svg` | The favicon: the mark in Tokyo Night green | the page's `<symbol id="m">` path |

Shots are 1920x1080, converted with `magick <png> -resize 1280x -quality 78 <webp>`.
Don't put fastfetch's hardware lines or the Title line in a public shot.
