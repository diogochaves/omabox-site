# The omabox 1.0 video

64 s, 1920x1080, silent: the problem (sepia), the product, what users say, the two halves of omabox
(agents off your desktop; visual tests an agent scripts once), more uses, 1.0, the close. Made with
director (HyperFrames), every shot from omabox boxes. `STORYBOARD.md` is the plan as built, with
every decision; `cut2/` and `cut3/` are earlier cuts, kept for reference.

Media are not in git (`.gitignore`): `take.sh` re-records them.

```bash
./take.sh desk-problem && ./take.sh desk-boxed            # the footage (and the four box-*.mp4)
./take.sh use-monitors && ./take.sh use-notify && ./take.sh use-web && ./take.sh use-interactive
director render                                           # renders/1.0.mp4
ffmpeg -i renders/1.0.mp4 -c:v libx264 -preset slow -crf 21 -pix_fmt yuv420p -movflags +faststart renders/1.0-post.mp4
```

The rest of `assets/stills/`, by hand:

- `check-base.png`, `check-run.png`: `box/check/` run in 8K boxes, then each shot cropped round the
  changed region:
  `omabox check run --approve --size 7680x4320,scale=4 --base B -- ./visual.sh`, then
  `SAVE_SHIFT=6 omabox check run --size 7680x4320,scale=4 --base B -o O -- ./visual.sh`;
  `magick B/prefs.png -crop 640x340+6944+3780 +repage check-base.png` (and `O/run1/prefs.png`).
- `tree-find.png`: `desk-boxed.mp4` at 17.8 s, `crop=1110:157:1795:452`.
- `shot-thumb.png`: `box-omaseed-5cc72cdc.mp4` at 12 s, 480 px wide.
- `omaseed-visual/`: omaseed's visual-check baseline (`.local/visual/*.png`), 480 px wide.
- `interactive.webp`: omabox.app's `site/media/interactive.webp`.

The thread's stills (`renders/stills/`, 2560x1440): `./take.sh use-interactive` for post 5; posts 2-4
are frames of the 4K render (`director render --4k`) at 19.0 s (four boxes), 43.5 s (more uses),
33.0 s (the check card; 28.4 s, the wall of omaseed's screens, as the alternative), each
`magick FRAME -resize 2560x1440 -strip`.

Fonts are OFL (`assets/fonts/OFL-*.txt`): Montserrat, JetBrains Mono, Chakra Petch, Anton.
