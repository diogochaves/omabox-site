# The link card

`site/media/og.png` (1200x630) is what a link to omabox.app shows on X, Discord and the rest.
`make.mjs` builds `card.html` from the home page itself: the whole page, with a stylesheet over it
that keeps the lockup, the hero's headline and its live scene (run by the page's own script), so a
change to the hero reaches the card the next time it is made. The card has no
version: it shows wherever a link is shared, long after a release.

```bash
node og/make.mjs                                   # og/card.html (git-ignored)
omabox up og-card --size 1200x630                  # from this repo, so it is mounted
omabox -b og-card run -d --wait -- chromium --kiosk --no-first-run --no-default-browser-check \
  --user-data-dir=/tmp/ogc --hide-scrollbars "file://$PWD/og/card.html"
omabox -b og-card pointer -- move 1199 629         # the box's own pointer, out of the picture
omabox -b og-card shot --burst 14 --every 700ms --sheet   # the scene moves: pick a frame
cp /tmp/omabox-og-card-burst-…/frame-NNN.png site/media/og.png
omabox down og-card
```

Pick a frame with four boxes up and the code in the editor typed out (2026-10-27: frame 9).
The build puts a hash of the card in its address (`og.png?v=…`), so X fetches a new card instead of
the one it keeps for days.
