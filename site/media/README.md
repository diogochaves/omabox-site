# Media

All taken with omabox, in a box (nothing from a real desktop), on 2026-09-27 unless noted.

| File | What | How |
|---|---|---|
| `desktop.webp` | A box's bare desktop, Tokyo Night, stock bar | `omabox up -b site --stock-bar`, `omabox run -b site -- omarchy-theme-set tokyo-night`, `omabox shot` |
| `term-<theme>.webp` | foot with fastfetch, in tokyo-night, catppuccin, gruvbox, retro-82 | per theme: `omabox run -- omarchy-theme-set <theme>`, `omabox keys super+return`, `omabox keys -t 'clear; fastfetch --structure OS:Kernel:WM:Terminal:Font:Colors' Return`, `omabox shot` (no Title line: it showed the user and host names) |
| `menu.webp` | Omarchy's launcher, Retro 82 | `omabox keys super+alt+space`, `omabox shot` |
| `interactive.webp` | An interactive box next to its terminal | from the omabox repo, `docs/media/interactive.png` (made by `docs/demo.sh`) |
| `demo.mp4`, `demo-poster.webp` | The 55 s demo and its poster | from the omabox repo, `docs/media/demo.mp4` and `preview.png` |
| `avatar-*.jpg` | GitHub avatars of code contributors | `https://avatars.githubusercontent.com/u/<id>?s=96` |

Shots are 1920x1080, converted with `magick <png> -resize 1280x -quality 78 <webp>`.
Don't put fastfetch's hardware lines or the Title line in a public shot.
