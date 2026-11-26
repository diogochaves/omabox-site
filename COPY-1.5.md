# omabox.app, rewritten around why: the copy

For Diogo to review. Words, sections and order only; no HTML, CSS or artifact. The look (Look H,
`site/base.css`) stays: this changes what the pages say and in what order, not how they look.
Written against omabox **v1.5.3** (README, CHANGELOG 1.1.0 to 1.5.3, the skill's core). Claims
marked **[check]** need a run or a look before they go live.

Notation as in `COPY-1.0.md`: `**H:**` heading, `**L:**` the small mono label above it, `**CTA:**` a
call to action, `**Shows:**` the scene or shot. "Shot" means taken in a box.

---

## Why a rewrite

The 1.0 site tells you omabox keeps agents' windows off your desktop. That is the cure. A visitor
who has never let an agent open a window doesn't have the disease yet, reads "no stolen focus",
and thinks "not my problem". Four things change:

1. **The promise stays first, with one line of why before it.** What only omabox does is leave your
   desktop alone (no stolen focus, cursor or screen) while agents work; Playwright, headless
   browsers and computer-use tools all let an agent see a UI, none of them off your screen. That is
   the reason to pick omabox, so it stays the headline (Diogo, 2026-11-25). But a visitor whose agent
   never opens a window needs one line on why it should: an agent that sees what it built gets UI
   work right; one that can't says "done" when it compiled.
2. **Say who it's for in the first screen.** Four kinds of work, each a door: a desktop app, a web
   app, a shell/plugin/theme, your own Hyprland desktop.
3. **Any Hyprland, today.** 1.3 shipped plain boxes (Arch, Fedora, Debian, openSUSE) and 1.4 your
   own desktop in a box. The hero still says "Plain Hyprland is coming", and `/next` promises what
   already shipped. Omarchy stays the fullest place, not the only one.
4. **Less inventory, more stories.** The home page has eleven sections and six release tabs of
   command-level detail. A first visit needs the story; the detail moves to the pages built for it.

What stays: the hero's scene of boxes over your desktop, the With/Without switch, parallel boxes,
"ask your agent", the big mark, every interactive piece, "not a security boundary" wherever safety
comes up, ai-jail, MIT.

---

## Page map

| Page | Nav label | What it's for | Change |
|---|---|---|---|
| `/` | (the mark) | the promise, its proof (With/Without), for whom, the loop, parallel boxes, install | rewritten; nine sections where it had eleven, "New in" down to one band |
| `/uses` | Use cases | **the why page**: one section per kind of work, each as ask → what the agent does → what you get | rebuilt by who you are; today's media uses become one of its sections |
| `/how-it-works` | How it works | the loop, what a box is, what stays off your desktop, agents on their own, look inside | shorter; hardening, rules and ports move to `/safety` |
| `/desktops` | Desktops | **new, replaces `/omarchy` and `/next`**: three kinds of box (Omarchy, plain, your own desk), where each runs | `/omarchy` and `/next` redirect here |
| `/safety` | Safety | **new, replaces `/compare`**: not a security boundary; what a box can and can't touch; the guard; ports; the ten rules; ai-jail | `/compare` redirects to `/safety#ai-jail` |
| `/develop` | Develop | for people who script it: `look`, `check`, `tree`, `record`, `snapshot`/`diff`, the command log, the contract | gains 1.1–1.5; the contract moves here from `/commands` |
| `/commands` | Commands | every command (generated) | `commands.json` gains 1.1–1.5's commands |
| `/changelog` | (footer, version) | the "New in" tabs, then the generated changelog | gains tabs for 1.3, 1.4, 1.5 |
| `/install` | Install | where it runs, install, check, update, remove, FAQ | the distro list; "Not on another distro yet" goes |

**Nav:** Use cases · How it works · Desktops · Develop · Commands · Safety · Install · GitHub. (Eight,
as now. `/uses` moves first: it is the answer to "why".)

**Every page ends** with the shared install band (not on `/install`), then a **"Tell us your setup"**
strip in place of "What's coming": what you'd want in a box next, and a distro we haven't tested,
both linking omabox's new-issue page. Nothing on the site is promised as coming any more; what 1.0
promised has shipped. **Decided (2026-11-25):** no "coming" strip; one comes back only with a next
promise worth making.

**Redirects** (in `functions/_middleware.js` or `_redirects`, and the home page's old-anchor script):
`/omarchy` → `/desktops#omarchy`, `/next` → `/desktops`, `/compare` → `/safety#ai-jail`,
`/#jail` → `/safety#ai-jail`. Markdown twins and `llms.txt` follow the new set.

**Elsewhere, not the site:** the omabox repo's GitHub description still says "A hidden Omarchy
desktop for your AI agents". Suggested, matching the new hero: "Let your coding agents see what they
build, in an invisible Hyprland desktop of their own. Your desktop stays yours." (Diogo's repo, his
call.)

---

## `/` Home

Nine sections. The hero makes the promise and the With/Without scene proves it at once; then who
it's for and what an agent does with its box; the rest earn trust and get you installed.

### 0. Announcement strip

"New in 1.5 · `omabox look`: did it come out right, in one call →" (to `/changelog#1.5.0`).

### 1. Hero

- **H:** Let your agents see what they build. *Your desktop stays yours.*
- **Text:** omabox gives each coding agent an invisible Hyprland desktop of its own, where it opens,
  clicks and screenshots its work.
- **The promise, one line** (kept from today): No windows popping up, no cursor jumps, no stolen
  focus, no password prompts, nothing left behind.
- **Requirement line:** Any Hyprland 0.56+ · fullest on Omarchy · AMD, Intel or NVIDIA · MIT ·
  Works with Claude Code, Codex, OpenCode, pi, Hermes
- **CTA:** See the difference (to #fixes) · Install
- **Shows:** today's scene, unchanged: your desktop as the floor, boxes rising from each agent's
  terminal. One change to its labels: each box says what its agent is *seeing* ("the toggle covers
  its label", "42 passed", "page threw on load"), not just doing.

### 2. The difference (`#fixes`, id kept)

Today's "The problem", right under the hero: the promise, proved at once.

- **L:** the difference
- **H:** Without omabox, an agent checking its work *checks it on your desktop.*
- **Text:** Its app opens on top of your editor. Your next keystrokes go into it. The cursor jumps,
  the workspace switches, a password prompt waits for you, and the tray fills with icons nobody
  closes. With omabox all of it happens on a screen nobody sees, and you keep typing.
- **Shows:** today's With/Without scene, defaulting to **Without**, so the chaos plays first and the
  switch to **With omabox** is the relief. Counters red, then all at 0.
- **One line under it:** In a box, `pkexec` just says no, and nothing it opens can reach your
  session.

### 3. Who it's for (`#for`)

- **L:** for
- **H:** If your agent builds something with a screen, it needs one.
- **Four cards**, each a door to its section of `/uses`:
  - **A desktop app.** GTK, Qt, Tauri, Electron, a TUI. Your agent launches the build, clicks
    through the change and runs the tests that need a session: tray, notifications, keyring.
    *"Add a dark-mode toggle and show me it works."*
  - **A web app or a game.** It opens the page in a real Chromium, with real frames, and reads the
    console. No browser window on your screen, no headless browser that skips the animation loop.
    *"The canvas flickers on resize. Find out why."*
  - **A shell, a plugin, a theme.** A Quickshell or Waybar config, an Omarchy bar plugin, a theme.
    It loads it in a bar that isn't yours and checks the contrast and the panel before you install
    anything. *"Check my theme in light and dark."*
  - **Your own desktop.** Your Hyprland config and your shell, copied into a box. The agent can try
    a rice change, a keybind, a new layout, and show you, without touching the session you're in.
    *"Try the new bar layout on my setup first."*
- **Under them, one line:** And more than building: demos, 4K screenshots, monitors you don't own.
  → Use cases

### 4. The loop (`#loop`)

What an agent does with its box, and why you'd let it look at all. Replaces "Built for agents" and
the second half of "Ask your agent".

- **L:** the loop
- **H:** Without a screen, "done" means *it compiled.*
- **Text:** An agent that can't see its work reports what it meant to do. With a box it checks what
  it did: one call opens the app in a box, shoots it, collects the errors it logged, and says what
  it found. The agent reads that, fixes, and looks again. You get the last shot, not the first bug.
- **Shows:** a two-pane scene, played once when scrolled to (replay button).
  - Left, the agent's terminal:
    ```
    $ omabox look app -- ./build/app
    screenshot: /…/look-1.png
    window: app "Preferences" 640x480
    problems:
      app: Gtk-WARNING: Negative content width -12 (allocation 120)
    exit 1
    ```
    then the agent's line ("The toggle's label is clipped; the row's min-width is too small."),
    an edit, and the same command again ending `problems: none · exit 0`. **[check]** the exact
    report format against `look app` at 1.5.3 (capture from a real box; window title shortened as
    usual).
  - Right, the two shots side by side, the first with the clipped toggle circled, the second fixed.
- **Three short columns under it:**
  - **Text, when text will do.** `tree` reads the app's controls for about 17 tokens where a
    screenshot costs about 1.5k, so the loop doesn't eat the context.
  - **The same check, every build.** `check` keeps what three runs agree on as the baseline and names
    the button that moved, by how many pixels.
  - **It knows when to stop waiting.** It waits until a window has settled, and a crash says it
    crashed, so an agent never sleeps on a window that will never come.
- **CTA:** How it works →

### 5. Parallel boxes (`#par`)

Today's flagship, shortened: it now proves scale, not the basic idea.

- **L:** parallel
- **H:** One box per agent. *As many agents as you run.*
- **Text:** Each agent session gets a box named after its repo or worktree, up in 3 to 5 s, about
  400 to 600 MB, gone when the agent exits. Four agents check four branches at once while you keep
  typing. A lead agent hands each subagent a box and a 15-line brief, not the whole manual.
- **Shows:** the lanes and the `omabox ls` panel, as now. **[check]** the 400–600 MB and 3–5 s
  figures against 1.5.3 (last measured on 1.0, and on Omarchy only: add one plain-box run).

### 6. You ask (`#ask`)

Kept, shorter: the point is that you never type omabox commands unless you want to.

- **H:** You ask. *Your agent takes a box.*
- **Text:** Install once. A skill your agent already loads tells it when a task needs a screen. Your
  projects and prompts don't change. When you want to see for yourself, ask for a box you can drive,
  or peek at any box live; the agent never notices.
- **Shows:** the three asks as now, plus: "Start the app with the dev server running and give me a
  window I can try." → an interactive box.

### 7. Not a sandbox (`#safe`)

Shorter than today's ai-jail section; the detail is on `/safety`.

- **H:** It keeps windows out. *It doesn't fence the agent in.*
- **Text:** omabox is not a security boundary: a box shares your kernel, your GPU and, by default,
  your network. Your secret stores are never mounted in a box, and an opt-in guard makes a stray
  window fail instead of landing on your screen. To limit what the agent itself can read and reach,
  pair it with ai-jail by Fabio Akita: a jailed agent drives boxes of its own.
- **CTA:** Safety → · ai-jail →

### 8. Install (`#install`)

- **H:** Three minutes. *Then ask your agent.*
- **Where it runs, as four short rows:** Omarchy 4.5 (boxes are Omarchy's desktop) · Arch, Fedora 45,
  Debian sid, openSUSE Tumbleweed (plain boxes, your shell if you want one) · Hyprland 0.56+ with its
  Lua config · an AMD, Intel or NVIDIA GPU.
- **Install bar:** `git clone https://github.com/diogochaves/omabox && cd omabox && ./install.sh`
- **Line:** `./install.sh --check` starts a box, shoots it and takes it down. Then ask your agent to
  check something it built.
- **MIT band** (today's, one line): MIT, every line. Fork it, change it, ship your own.
- **CTA:** Install guide →

### 9. New in 1.5 (one band, before the footer)

Today's six tabs go to `/changelog`. Diogo brought them back to the home page on 2026-10-27; this
undoes that, decided 2026-11-25: a first visit needs the latest release, not the history. One band,
the latest release with something to show, changing each release:

- **1.5 · 2026-11-20 · looks in one call.** `look app`, `look page`, `look plugin`, `look theme`: did
  it come out right, and what did it log. `snapshot`/`diff`: what an app wrote in its HOME. Every
  command against a box, logged with who ran it. → All releases

Removed from the home page: Uses (now section 2 and `/uses`), Built for agents (now the loop and
`/how-it-works`), the Omarchy band (now `/desktops`), What's coming (shipped).

---

## `/uses` Use cases

The page that answers "why would I use this". One section per kind of work, each built the same
way: **what you ask**, **what the agent does in the box**, **what you get**, then the two or three
commands under it for those who want them. A side rail lists the six.

- **Head. H:** A screen for every kind of thing your agent builds.
- **Text:** omabox started as a way to test desktop apps without losing your desktop. Agents use it
  for more now: anything that needs a screen and shouldn't touch yours.

### Desktop apps (`#apps`)
- **Ask:** "Add the settings dialog and make sure it works."
- **The agent:** builds, `look app` to see it, clicks through with `keys`/`click`, reads the result
  as text, fixes, looks again; runs the tests that need a session (`omabox run -- ctest`: tray,
  notifications, D-Bus, a throwaway keyring) in a box that comes and goes with the run.
- **You get:** the shot of the finished dialog and green tests, with your desktop untouched.
- **Commands:** `look app -- ./build/app` · `run -- ctest` · `tree --find 'dark mode'`
- **Shows:** a real box shot of an app (today's `interactive.webp` or a new one).

### Web apps and games (`#web`)
- **Ask:** "The canvas flickers when I resize. Find out why."
- **The agent:** `look page` opens the page in Chromium in the box, with real frames (a headless
  browser runs the animation loop only a few times), holds keys over many frames, takes a contact
  sheet, and reports the page's uncaught exceptions.
- **You get:** the frames where it flickers, the exception, and the fix.
- **Commands:** `look page http://localhost:5173` · `look page game.html --hold Right 2s --shots 6`
- **[check]** the exact flags (`--hold KEY DURATION`, `--shots N`, `--after`) at 1.5.3.

### Shells, plugins and themes (`#shells`)
- **Ask:** "Check my plugin's panel in three themes." / "Is this theme readable?"
- **The agent:** `look plugin DIR --open` loads it in a bar that isn't yours and reads the widget's
  text without a screenshot; `look theme DIR` applies the theme for real and says what a person would
  notice (text too faint, a key with no fallback, a background too bright for a dark theme);
  `snapshot`/`diff` shows what your plugin wrote: autostart entries, units, mimeapps.
- **You get:** shots per theme, a contrast report, and a list of files the install touched.
- Works for Omarchy plugins and themes, and for any Quickshell, DMS, Noctalia, Caelestia or Waybar
  setup in a plain box. → Desktops

### Your own desktop (`#desk`)
- **Ask:** "Move my bar to the left and show me before I switch." / "Why does my workspace rule
  not fire?"
- **The agent:** `up --desktop desk` copies your Hyprland config, your shell and its wallpaper into
  a box (nothing secret, nothing of your HOME mounted), runs it, changes it there, and shows you.
- **You get:** the change, tried on a copy of your setup, with a diff you can apply yourself.
- **Text, one line:** Trying someone else's rice? Load it in a box first; what a box does and
  doesn't block for that is on `/safety`.

### Demos, screenshots and docs (`#media`)
Today's `/uses` content, condensed into one section: film a take with captions and drawn keys
(`record`), with sound nobody hears; shots at 2x or 4K whatever your monitor is; a clean, stock setup
with no name of yours in it (`--clean`); monitors you don't own. Keep the "every picture on this
site was taken in a box" line here.

### Hard bugs (`#crash`)
- **Ask:** "My plugin crashes when a monitor comes back. Find it."
- **The agent:** `output drop --cycles 50` unplugs a monitor until the shell falls over, `gdb --shell`
  for the backtrace; your session never notices.

### Several at once (`#parallel`)
One short section linking back to home's parallel boxes: three branches, three boxes, three shots to
compare; a lead and its subagents, each with a box and a brief.

---

## `/how-it-works`

Shorter: what it is and how the loop goes. The hardening, the rules and ports move to `/safety`.

- **Head. H:** A whole desktop for every agent, *none of it on yours.* (kept)
- **The four steps** (kept, step 3 rewritten): it reaches for a box · it starts one · **it looks,
  fixes, and looks again** (the loop from home, in more depth: `look`, `tree`, `check`, `wait`) · it
  goes with the agent.
- **What a box is** (new, short): a real Hyprland, not a mock, on a private screen and a private
  session bus. Three kinds (→ Desktops): Omarchy's desktop, a plain one, or a copy of yours.
- **What stays off your desktop** (kept: its own screen, pointer and keyboard, nothing opens on your
  session, its own bar). The guard gets one line and a link to `/safety#guard`.
- **What a box gets** (kept, the three lists; "Off until you ask" gains `--net host`, by name only).
- **Agents use it on their own** (kept): the skill (its core is 3.6 KB since 1.5 and opens with the
  four looks), briefs for subagents, "it says what changed", small shots, saves, the command log
  ("when several agents share a box, it says who clicked what"), report what omabox got wrong.
- **Look inside** (kept): ask for one, peek, interactive, the bar widget (Omarchy only).
- Moved out: "Rewritten in Rust, and tighter for it", ports, the ten rules → `/safety`.

---

## `/desktops` (new; replaces `/omarchy` and `/next`)

What 1.0 promised on `/next` and 1.3–1.4 shipped, plus everything Omarchy-specific.

- **Head. H:** Any Hyprland. *Fullest on Omarchy.*
- **Text:** A box is one of three desktops. omabox picks the first one that fits; you can ask for any.
- **Three cards up top**, each with what it is, where it runs and the one line to start it:
  - **An Omarchy box** (`#omarchy`): Omarchy's own Hyprland config and shell, your theme, bar layout
    and terminal settings. On Omarchy 4.5. `omabox up`
  - **A plain box** (`#plain`): Hyprland with a small config of omabox's (its defaults, your
    keyboard layout, a terminal on SUPER+RETURN), and your shell as its bar if you want one. On Arch,
    Fedora 45, Debian sid, openSUSE Tumbleweed, and on Omarchy for an app that must not depend on it.
    `omabox up --shell 'dms run'` · `omabox up --desktop plain`
  - **Your own desk** (`#desk`): your Hyprland config, your shell (DMS, Noctalia, Caelestia, Waybar,
    a Quickshell config) and your wallpaper, copied into a box. Your session never knows.
    `omabox up --desktop desk`

### Omarchy (`#omarchy`)
Today's `/omarchy` content, trimmed: your bar in a box (whole shell, one plugin, its settings, the
bar read as text: `tree --layer omarchy-bar`), your theme live (`--theme-dir`, now with theme
checks), a clean Omarchy for checks, Omarchy's own checkout and stack, the bar widget. "Ready for
4.5" becomes the support line: Omarchy 4.5; 4.0 works until omabox's first release after
2026-12-04. **[check]** by the time this ships, whether 4.0 has been dropped.

### Plain Hyprland (`#plain`)
- What a plain box has and doesn't (no bar unless you give it one; `--shell CMD`, `qs -p DIR`).
- Where it's tested: each distro in a VM of its own, `install.sh` through to real boxes; plain Arch
  runs the whole test suite on a virtual GPU and on a real NVIDIA card. Fedora's Hyprland is from a
  COPR; Debian sid needs Hyprland 0.57.1 (`doctor` warns on 0.57.0).
- Not yet: NixOS. Ubuntu 26.04, Alpine and Void ship no Hyprland with the Lua config.
- `--hyprland DIR`: run another Hyprland build whole (for compositor work → `/develop`).

### Your own desk (`#desk`)
- What's copied, what's left out (secrets, links into secret stores, files with a key's shape, what's
  over the caps), and that `up` says what it left out.
- What runs: your `hyprland.lua` with omabox's settings over it; your autostart through a policy
  (idle, lock, the systemd session and system-bus applets dropped; `omabox log autostart` says each
  decision); one shell.
- Held awake: your shell's idle timeouts can't lock the box between an agent's steps.
- Refused for now: `--clean`, a jailed agent's desk box, `check run --desktop desk`, `--net host`.

### Tell us
Today's "Which shell should come next?" becomes: a shell or distro that doesn't work for you yet →
an issue (`github.com/diogochaves/omabox/issues/new`; omabox has no issue templates).

---

## `/safety` (new; replaces `/compare`)

Everything about trust, in one place, from the README's "What a box can and cannot touch" and
1.0's hardening.

- **Head. H:** Not a security boundary. *Here's exactly what it holds.*
- **Text:** omabox keeps an agent's windows, input and prompts off your desktop. It does not fence
  the agent in: a box shares your kernel, your GPU and, by default, your network, and what the agent
  runs on your host isn't boxed. This page is what a box can touch, what it can't, and how to fence
  the agent too.
- **What a box can touch** (`#touch`): four cards from the README: your files (the repo read-only,
  what you `--ro-bind`; refused whatever you pass: the secret stores, the agents' own config, browser
  profiles, HOME itself), its HOME (fake, seeded with nothing secret, gone at `down`), its session
  (private buses, throwaway keyring, no system bus, no sudo, pacman or polkit), its network
  (connected, isolated, or host by name only; what reaches outside is real).
- **Your seat** (`#seat`): no `/dev/dri/card*`, `/dev/input`, seatd, system bus or your runtime dir;
  that is what keeps its Hyprland off your screens.
- **The guard** (`#guard`): from `/how-it-works`, whole: what it stops, what it doesn't (an agent that
  sets the variables back on purpose, a headed browser MCP, writes to files your shell watches).
- **Ports no box reaches** (`#ports`): kept.
- **The rules, each with its test** (`#rules`): kept (SECURITY.md). **[check]** still ten at 1.5.3;
  1.5.2 added rules about links and fd reads.
- **Rewritten in Rust, and tighter for it** (`#hardening`): kept, condensed.
- **With ai-jail** (`#ai-jail`): today's `/compare`, whole: two questions, two tools; the two tested
  recipes; what a jailed agent can and can't do. Caption updated: "Tested with ai-jail 3.3.0 and
  omabox 1.4 on Linux, and before that with ai-jail 2.2.1 to 2.12.0." **[check]** re-run on 1.5.3
  (1.5.2 changed the broker: it trusts only an ai-jail in its own namespaces).
- **For code you don't trust at all:** a VM. One line.

---

## `/develop`

For people who script omabox, or build Hyprland and shells. Gains 1.1–1.5.

- **Head. H:** Script the loop. *Or test Hyprland itself.*
- **Look, in one call** (`#look`, new, first): the four looks and bare `look`; in your box when it's
  up, a throwaway one otherwise; exit 0 or 1, so it fits a script or a hook.
- **Visual checks** (kept): `check`, baselines from three runs.
- **Text instead of a shot** (kept, plus): `tree --layer` for a bar's text (1.5), `wait notification
  RE` and `log notifications` (1.3).
- **What it wrote** (`#diff`, new): `snapshot` / `diff`, grouped by area; `--seed`; `--json`.
- **Who did what** (`#log`, new): `log commands`, with secrets never logged; `log run JOB`,
  `log autostart`.
- **Videos people can follow** (kept): `record`, marks, holds, `--for`.
- **Every desk you don't have** (kept).
- **Rebuild, restart, look** (kept; `look` replaces the manual rebuild-run-shot steps).
- **Hyprland and compositor work** (kept, plus `--hyprland DIR` runs another build whole, 1.3;
  `lua 'hl.config(...)'` to set an option, 1.5).
- **The contract** (`#contract`, moved from `/commands`): exit codes and `--json` within 1.x,
  `OMABOX_STRICT=1` for CI.
- **What a box can't test** (kept, from the README's list).

---

## `/commands`

Generated as now. `commands.json` gains what 1.1–1.5 added, each with a line and an example, in the
groups as they are: `look` (Seeing it), `snapshot`, `diff` (Seeing it), `window` (Driving it),
`doctor` (You and your desktop), and new `log` subcommands. **[check]** the build's "missing from
commands.json" warnings at v1.5.3 for the full list. The contract block moves to `/develop`; one
line links it.

---

## `/changelog`

The "New in" tabs come here from home, newest first, with three new ones:

- **1.5 · 2026-11-20 · looks in one call:** `look app/page/plugin/theme`; theme checks; a bar's text
  without a shot; `snapshot`/`diff`; the command log.
- **1.4 · 2026-11-07 · your own desktop in a box:** `up --desktop desk`; `window --fullscreen`/
  `--maximize`; `--net host`.
- **1.3 · 2026-11-07 · any Hyprland:** plain boxes on Arch, Fedora, Debian, openSUSE; your shell as a
  plain box's bar; `--hyprland DIR`; notifications as text; real drag-and-drop.
- **[check]** whether 1.1 and 1.2 have anything worth a tab (not read for this draft).

---

## `/install`

- **Head. H:** Three minutes, *then ask your agent.* (was "your agents take it from there")
- **Where it runs** (replaces "Your machine" and "Not on another distro yet"): the README's list,
  word for word in substance: Omarchy 4.5 (4.0 until its drop); Arch without Omarchy, Fedora 45,
  Debian sid, openSUSE Tumbleweed as plain boxes, each tested in a VM; not yet NixOS, Ubuntu 26.04,
  Alpine, Void. Hyprland 0.56+ with its Lua config; AMD and Intel iGPUs and NVIDIA RTX tested.
- **Install and check:** `install.sh` installs what's missing on Arch; elsewhere it prints the
  `apt`/`dnf`/`zypper` line and stops. `./install.sh --check`. `omabox doctor` (with `--smoke`).
- **What setup does** (kept; the bar widget is Omarchy only).
- **From 0.x to 1.0** shrinks to one line and a link to the omabox docs (a month on, few need it).
- **Update and remove** (kept).
- **Your first ask** (new, short): three things to ask your agent once it's installed, one per kind
  of work.
- **What a box can't do** (kept, from the README).
- **Questions people ask first** (kept, plus): "Do I need Omarchy?" (no), "Does it work with my
  shell?" (DMS, Noctalia, Caelestia, Waybar, Quickshell configs), "Is it a sandbox?" (no → Safety).

---

## Before it goes live

- Every **[check]** above, at v1.5.3.
- `install-agent.md` (the agent's setup guide) for the distro list and `doctor`.
- `llms.txt`, the Markdown twins and the sitemap for the new pages and redirects.
- New shots for `/uses` (one per section) and the loop scene, taken in a box.
- `reviewed-release` moves to v1.5.3 with it, closing issue #4.
- `DIRECTION.md` gets a dated "Decisions" entry for whatever Diogo keeps of this.
