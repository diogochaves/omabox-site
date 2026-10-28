# The README video

41 s, 1920x1080, silent: the top of omabox's README. The 1.0 promo (`../1.0`) without its pitch:
the problem in sepia with plain captions, the turn without the 1.0 sticker, four agents' boxes,
visual tests an agent scripts once, the close without a version or fine print. No more-uses act, no
1.0 slide, no user quote, no starbursts. Nothing in it names a version, so it outlives releases.

Its acts are copies of `../1.0/compositions/` (b1, b2, b3, b4, b7), edited as above; its media are
copies of `../1.0`'s takes (`../1.0/take.sh desk-problem && ../1.0/take.sh desk-boxed`, and the
check stills its README describes), git-ignored here too.

```bash
director render
ffmpeg -i renders/readme.mp4 -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart -an renders/readme-upload.mp4
```

`readme-upload.mp4` (5.4 MB) goes into the README as a GitHub user-attachments link (drag it into a
comment box; under GitHub's 10 MB video limit). Never commit renders.
