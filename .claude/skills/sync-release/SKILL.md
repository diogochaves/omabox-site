---
name: sync-release
description: Bring omabox.app up to a new omabox release. Reads what changed in the omabox repo since the release the site was last reviewed against (`reviewed-release`), fixes the hand-written pages and site/commands.json, re-checks claims, publishes the artifact and moves the marker. Use when Diogo types /sync-release, when the "Review the site for omabox vX" issue is open, or when asked to update the site for a new omabox version.
---

# Sync the site to an omabox release

The build already follows every release on its own (the daily deploy): the version in every
`<span class="ver">`, `/changelog`, and every command and its help on `/commands`. This skill is for
what the build can't know: the hand-written pages, `site/commands.json`, and the claims in
DIRECTION.md's "Facts to keep right".

`reviewed-release` (one line, a tag like `v0.4.8`) is the release the site was last checked against.
The `release-check` workflow opens an issue when omabox's latest release is newer, and closes it once
`reviewed-release` catches up on main.

## 1. What changed

The omabox repo is at `../omabox` (or clone github.com/diogochaves/omabox). Read it at tags, never its
working tree (main can hold unreleased work):

```bash
O=../omabox; git -C $O fetch --tags -q
FROM=$(cat reviewed-release); TO=$(gh release view -R diogochaves/omabox --json tagName -q .tagName)
git -C $O show $TO:CHANGELOG.md | awk -v f="${FROM#v}" '$0 ~ "^## "f" " {exit} /^## [0-9]/ {p=1} p'
git -C $O diff --stat $FROM $TO
git -C $O diff $FROM $TO -- README.md skill/SKILL.md SECURITY.md plugin/manifest.json
git -C $O diff $FROM $TO -- bin/omabox | grep -E '^[-+].*(printf|^@|usage)'   # output formats, help
node build.mjs --preview   # warns about commands missing from site/commands.json
```

Nothing to do if `FROM` is `TO`.

## 2. Sort every change

Go through the changelog entry by entry, plus the README and skill diffs, and put each in one bin:

- **The build has it**: the version, the changelog, help texts, a command's synopsis. Nothing to do.
- **A page to touch**: say which page and section. Look for, at least:
  - a new command: a group, a `say` line and examples in `site/commands.json` (examples must be valid
    at `TO`: check `omabox help CMD` there);
  - command output the pages show (the `omabox ls` panel on the home page, the typed terminal, the
    widget on /how-it-works) against the `printf` formats and messages at `TO`;
  - what a box gets, what is refused, the network (/how-it-works, /install "What a box can't do",
    the FAQ), against the README at `TO`;
  - install steps and requirements (/install), against the README on **main** (AGENTS.md, Rules);
  - the bar widget's keys, rows and settings face against `plugin/Panel.qml`;
  - the agents the skill supports; anything for plugin, theme or Omarchy developers (/develop);
  - the ai-jail recipe and broker (/compare) when `broker`, `env` or the jail detection changed.
- **A claim to test again** in a box (load the omabox skill): a measured number (boot time, memory),
  a tested recipe, captured terminal output. Re-run it and record the date in DIRECTION.md.
- **Not for the site**: internal fixes, tests, NOTES.md. Most fixes land here: the site isn't a
  changelog (DIRECTION.md: no "new in" on the home page).

Show Diogo the sorted list before editing when anything is his call: new copy on the home page, a
promise about what omabox does, dropping something. Plain additions to /commands, a link, an output
format fix: just do them.

## 3. Edit, look, publish

- Edit the pages (AGENTS.md "Layout" and "Rules"; copy plain, active, specific; "not a security
  boundary" wherever safety comes up). Keep the source's fallback version (`<span class="ver">`) at
  `TO`.
- Update the version references in AGENTS.md ("Rules") and DIRECTION.md ("Facts to keep right") to
  `TO`, and any fact the release changed.
- Look once in a box (AGENTS.md, "Checking a change"), at the pages you touched, desktop and phone
  width.
- Publish the artifact (AGENTS.md, "Publishing"): read it first, same `url`, only the files that
  changed.
- Write `TO` into `reviewed-release` and commit everything in one commit ("Bring the site up to
  omabox X.Y.Z"). Don't push unless Diogo says so: a push deploys omabox.app and closes the issue.

## 4. Report

Tell Diogo, briefly: what changed in each bin, what you edited (page and section), what you re-tested
and how, what you left for him to decide, and the artifact link.
