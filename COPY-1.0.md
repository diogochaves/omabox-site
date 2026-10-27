# omabox.app for 1.0: the copy

For Diogo to review. Words, sections, highlights and order only; no HTML, CSS or artifact. The
design pass and the X thread come later.

Structure agreed on 2026-10-26:

- **Hero:** the promise is for anyone on Hyprland who runs coding agents; one honest line says it
  runs on Omarchy 4 today and plain Hyprland is coming.
- **Pages:** draft 5's set, plus `/omarchy` (why it's fullest there) and `/next` (what's coming).
- **New in:** one 1.0 tab that sums up 0.6 to 1.0, with the older tabs kept.
- **Coming:** three promises, each with what has run so far and what hasn't.

Then, after the first draft (Diogo, 2026-10-26):

- **A shorter home page, straight to the point,** with a fresher, more modern look (duxlabs.dev as
  a reference, not a model). Seven sections where draft 5 had thirteen.
- **Agent-first, said plainly.** Any developer can type omabox's commands, but it's built for agents
  to drive. Even to drive a box yourself, the best way in is to ask your agent to start it with what
  you need running, and to change things while you test.
- **Every page ends with what's coming.** It's the new default.

Sources: omabox `port-rust` (CHANGELOG from Unreleased down to 0.6.0, README, SECURITY.md), branch
`desk-plain` (NOTES findings 534 to 536), omabox #247 and #321. The site was last reviewed against
0.5.2, so everything from 0.5.3 on is new to the hand-written pages. Claims marked **[check]** are
on the re-check list at the end.

Notation: `**H:**` is a heading, `**L:**` the small mono label above it, `**CTA:**` a call to action,
`**Shows:**` the screenshot or scene. "Shot" means taken in a box, with nothing personal in it.

---

## Page map

| Page | Nav label | What it's for | New or changed |
|---|---|---|---|
| `/` | Overview | short and agent-first: the promise, parallel boxes (the problem, solved), ask your agent, built for agents, ai-jail, Omarchy, MIT, install, what's coming | rewritten, ends with Coming (2026-10-27: What it is not dropped; ai-jail and MIT added) |
| `/how-it-works` | How it works | the four steps (from home); what it keeps off your desktop and how; what a box gets; 1.0's hardening; protected ports; the ten rules; agents on their own; look inside | 1.0 hardening, protect-ports, S1-S10, brief, the smaller skill, "ask your agent" for interactive boxes |
| `/omarchy` | Omarchy | **new:** born there, fullest there: the bar, plugins, themes, `--desk-shell`, the widget, Omarchy 4.5 | new page (parts moved from `/develop` and `/how-it-works`) |
| `/commands` | Commands | the typed terminal, then every command (generated) | a "stable contract" block; 7 new commands in `commands.json` |
| `/develop` | Develop | app, plugin and theme testing (check, tree, record, audio, cpu); Hyprland and compositor work | 0.6-0.9's test tooling; Omarchy-only parts point to `/omarchy` |
| `/compare` | ai-jail | omabox and ai-jail: why they pair, the two recipes, the broker | Cua and omarchy-in-omarchy dropped (2026-10-27); recipes re-run on 1.0 |
| `/next` | Coming | **new:** omabox beyond Omarchy: plain Hyprland boxes, your own shell, your own desktop | new page |
| `/changelog` | Changelog | the "New in" tabs (hand-written, from home), then the generated changelog | gains the tabs, with a 1.0 tab |
| `/install` | Install | what you need (now Rust too), install, upgrade from 0.x, remove, limits, then the FAQ (from home) | upgrade-to-1.0 block; Rust; new limits; FAQ |

**Nav, on every page:** How it works · Omarchy · Commands · Develop · ai-jail · Coming · Install ·
GitHub. (Compare's label became ai-jail on 2026-10-27; the URL stays `/compare`.) (Changelog moves to the footer and the version under the wordmark, which already link it, to
keep the nav at eight.)

**Every page ends the same way:** the shared install call to action (not on `/install`), then the
"What's coming" strip (not on `/next`). See "Every other page" under Home.

**Footer line:** "An independent community project, not affiliated with or endorsed by Omarchy or
Hyprland. Every screenshot here was taken by omabox, in a box."

---

## `/` Home

Shorter and straight to the point (Diogo, 2026-10-26): seven sections where draft 5 had thirteen.
It's agent-first: omabox is a CLI any developer can type, but it's built for agents to drive, so
the page shows what you *ask*, not what you type. It ends with what's coming, and so does every
page.

Moved off the home page: the four-step How it works (to `/how-it-works`), the "New in" tabs (to
the hand-written head of `/changelog`), the FAQ (to `/install`), Keep reading (the nav covers it),
the Omarchy band's detail (to `/omarchy`), and Built by (a row in the footer).

### 0. Announcement strip (top of the page, one line)

"omabox 1.0 · a contract your scripts can keep →" (to `/changelog#1.0.0`). It changes with each
release worth one, and replaces the hero's "New in" pointer.

### 1. Hero

Since Look E (2026-10-27) the words sit across the top and a full-width 3D scene sits under them:
your desktop lies flat as the floor (an editor you type in, your agents' terminals), and each
agent's terminal sends up a box that works above it (a dialog opened, tests passing, a take filmed),
an agent can start a second one for its subagent, and a finished box folds back into its terminal.
Nothing lands on the floor; the scene's label keeps every counter of your desktop at 0. "Ask another
agent" adds a box; clicking a box takes it down.

- **H:** Your agents get desktops of their own. Yours stays untouched.
- **Text:** omabox gives every coding agent a whole Hyprland desktop to test its work in:
  invisible, one per agent, gone when the agent is.
- **The promise, one line:** No windows popping up, no cursor jumps, no stolen focus, no password
  prompts, nothing left behind.
- **Agent row** (logos or wordmarks): Works with Claude Code · Codex · OpenCode · pi · Hermes
- **Install bar:** `git clone https://github.com/diogochaves/omabox && cd omabox && ./install.sh`
- **Requirement line:** Today on Omarchy 4 · Hyprland 0.56+ · an AMD, Intel or NVIDIA GPU · MIT ·
  Plain Hyprland is coming →
- **CTA:** Watch it · Install guide
- **Shows:** the live view: your desktop with every counter at 0, beside three busy box tiles.

### 2. Parallel boxes: the problem, solved (the flagship)

Diogo, 2026-10-27: this is the flagship. It shows several agents doing several things at once, each
in its own box, on their own, with nothing reaching your desktop. The problem is still told, as the
"Without" side of the same scene.

- **H:** Every agent gets a desktop. *None of them is yours.*
- **Text:** Without omabox, an agent testing a desktop app tests it on your desktop. With it, each
  agent takes a box of its own: four agents, four apps, four test runs, all at once, while you keep
  typing.
- **Shows:** one live workspace. Your desktop on the left (an editor you keep typing in, counters
  for windows, focus, workspace, cursor and prompts, all at 0) beside four agents' boxes: Claude
  Code as lead opens the app and clicks into Settings; its subagent gets `omabox brief` and runs
  42 tests; Codex runs `check` and is told a button moved 6 px; pi films a take with `record`. A
  feed under them prints each `omabox` call and its answer. A switch, "With omabox / Without", plays
  the old problem scene on the left: windows on your editor, your cursor yanked, a workspace switch,
  a password prompt, counters going red, the boxes gone.
- **Three columns under it:**
  - **On their own.** Agents take a box when a task needs a desktop, wait until a window has settled
    instead of sleeping, and put it down when they exit. No prompt stops them: in a box, `pkexec`
    just says no.
  - **Checks side by side.** Tests, visual checks and videos run in parallel, each on its own screen
    and session bus. None sees another's windows, and none sees yours.
  - **Handed on.** A lead agent gives each subagent a box and `omabox brief`: about 15 lines with
    its windows and the rules, not the whole skill.
- "Agents talking to each other" is said only as what omabox does: a lead hands a subagent a box
  and a brief. omabox has no channel between agents.

### 3. Ask your agent

The heart of the page: what using omabox looks like. You ask in your own words, and the agent does
the rest.

- **L:** How you use it
- **H:** You ask. Your agent takes a box.
- **Text:** Install once. A skill your agent already loads tells it when a task needs a desktop. You
  don't change your projects or your prompts.
- **Three exchanges**, each a prompt and what follows (a chat bubble, then two or three terminal
  lines and a result):
  1. **"Check the new settings dialog and show me."** It starts a box, runs your build, opens the
     dialog, reads it, takes a shot, and the box goes when it's done. You kept typing the whole time.
  2. **"Start a box with the app and the dev server running. I want to try it."** A window opens on
     workspace 9 without taking your focus: a desktop you drive yourself. Say "make the sidebar
     narrower", and it rebuilds and restarts the app in that same box while you watch.
  3. **"Try all three branches."** Three agents, three worktrees, three boxes, side by side. None
     sees another's screen, and none sees yours.
- **The straight line, under them:** Every command is yours to type too. But omabox is built to be
  driven by an agent: one call per step, answers in text, waits instead of sleeps. Even to drive a
  box yourself, the fastest way in is to ask.
- **CTA:** How it works →
- **Shows:** the three exchanges as small scenes. Scene 2 uses `interactive.webp` (a box as a window
  beside a terminal); scene 3 the parallel lanes, shrunk.

### 3b. Uses (new, 2026-10-27)

Diogo: a menu item and a home section with examples of what one can use omabox for beyond testing:
filming an app or plugin without touching your desktop, capturing at 2x or more, a vanilla setup
that shows none of your data, and the rest we already use it for. It becomes a page, `/uses`; the
home page has six cards, each a small picture, a line and the real commands.

- **H:** A desktop to spare, *for whatever you're making.*
- **Text:** Testing is where omabox started. Any job that needs a screen and shouldn't touch yours
  fits in a box too: these are a few we use it for.
- **Film what you made.** `record start`, `record mark`, `record stop --show-input --captions`.
- **Shots at 2x, or 4K.** `up --size 3840x2160,scale=2`, `shot --window app`.
- **A clean setup, not yours.** `up --clean --stock-bar --theme tokyo-night`. Not anonymous in 1.0: a terminal's prompt still
  shows your user and host names and your git identity is in the box (hiding them is on `desk-plain`),
  so the card says to keep a terminal out of the shot.
- **Monitors you don't have.** `up --monitor 1080x1920 --monitor 2560x1440,scale=1.6,below`.
- **Look at a web page, off your screen.** `run -d --wait -- chromium --app=URL`, `keys Page_Down`.
- **Find the crash first.** `output drop --cycles 50`, `gdb --shell`.
- **Under them:** Every screenshot on this site was taken in a box, too. More uses →
- `/uses` to write: these six at length, plus the link card and this site's shots made in a box,
  director's footage, plugin and theme screenshots for a README. **[check]** every command at the tag.

### 3c. New in (back on the home page, 2026-10-27)

Diogo: people should see the project has new things, not only what's coming. This undoes moving
the tabs to `/changelog` (they stay there too). A tab per release with something to show, newest
open: 1.0 (the panel under `/changelog` below), 0.9 (briefs, short help, one exit-code meaning,
`record hold`), 0.8 (visual checks, `--quickshell`, fonts in every box), 0.7 (held keys, your
binds in a box), 0.6 (`tree`, videos with sound and marks, `--desk-shell`), 0.5 (several monitors),
then "0.4 and earlier →" to `/changelog`. The hero's pill opens it.

### 4. Built for agents

Four cards, a title and one line each, every one linking to its page. This replaces Parallel boxes,
"What an agent can check" and the New in tabs.

- **L:** Built for agents
- **H:** Everything an agent needs to test its work, and nothing of yours.
- **One box per session.** Named after its worktree and session, 400 to 700 MB, up in 3 to 5 s,
  down when the agent exits. Subagents get a box and a brief each. → /how-it-works
- **Answers in text.** After a click, omabox says what changed: a window opened, a menu, or nothing.
  `tree` reads the app's controls for about 17 tokens, where a shot costs about 1.5k. → /develop
- **Checks and videos.** `check` compares every screen with a baseline and names the button that
  moved. `record` films a take with your marks as captions and a contact sheet. → /develop
- **A contract your scripts can keep.** In 1.x, exit codes and `--json` fields only grow, and a
  change warns for one release first. Rewritten in Rust for 1.0. → /commands#contract

### 5. Born on Omarchy (one band)

- **H:** Fullest on Omarchy.
- **Text:** On Omarchy a box is your desktop: Omarchy's own config and shell, your theme and bar,
  your plugins with `--desk-shell`, and a widget in your bar that lists every box.
- **CTA:** omabox on Omarchy →
- **Shows:** a box running a plugin in Omarchy's bar, cropped to the bar.

### 6. Better with ai-jail (replaces What it is not, 2026-10-27)

Diogo: drop What it is not and stop naming Cua (its product changed, and keeping up with other
projects isn't the site's job); omarchy-in-omarchy goes with it (someone who wants a whole VM has a
preference already). ai-jail stays: it pairs with omabox.

- **H:** Not a sandbox. *Pair it with ai-jail.*
- **Text:** omabox keeps an agent's windows off your desktop, but it is not a security boundary: a
  box shares your kernel, GPU and network. ai-jail, by Fabio Akita, fences what the agent itself can
  read, write and reach. Together, a jailed agent tests in boxes of its own.
- **Shows:** a diagram (your machine; inside it ai-jail around the agent, with what it can and can't
  reach; the omabox broker; its box) and the two recipes: a jailed app drawn in a box, and
  `omabox broker on` then `ai-jail claude`. Caption: the versions they were tested with, and that a
  jailed agent can't use `host`, `peek` or interactive boxes. **[check]** on 1.0 (item 8).
- **Line under the diagram:** ai-jail decides what the agent can touch. omabox decides where it draws.
- **CTA:** omabox and ai-jail → (`/compare`)

### 6b. MIT, every line (new, 2026-10-27)

Diogo: stress that all of it is MIT, that people can help, fork it and do their own thing since it's
their computer, and that this is why omabox won't stay Omarchy-only.

- **H:** MIT, every line. *It's your computer.*
- **Text:** omabox is built by builders, to make other builders' lives easier. All of it is MIT:
  read it, fork it, bend it to your machine, ship your own. Every fix someone sends makes it better
  for the next person. That's why it won't stay on Omarchy alone: the builders on Hyprland are who
  it's for. (Diogo, 2026-10-27: it isn't one person's tool, it's everyone's who contributes.)
- **Shows:** a git graph (main; a fork going its own way; a fix your machine found coming back as a
  PR, merged), the head of the LICENSE, the contributors' avatars with an empty one for you, and
  "Your machine is the test we don't have: a GPU, a distro, a shell we never ran."
- **CTA:** Read the code · Contributing →
- The hero's line under the button says "Free and MIT, every line."

### 7. Install

- **H:** Give every agent a desktop of its own.
- Install bar and requirement line as in the hero.
- **CTA:** Install guide · GitHub

### 8. What's coming (the last section)

- **L:** What's coming
- **H:** omabox beyond Omarchy.
- **Text:** omabox was born on Omarchy, but it can help many more people, so it's growing. Here's
  what's coming next. (Diogo, 2026-10-27. "Nothing here has shipped, and there's no date" stays on
  `/next`; the cards keep their "What has run, and what hasn't" link.)
- **Three cards:**
  - **Plain Hyprland boxes.** Aimed at any distro with Hyprland 0.56+ (Lua config). For Hyprland
    plugin and compositor developers.
  - **Your own shell.** One shell at a time, Dux Shell (DankMaterialShell) first.
  - **Your own Hyprland desktop, in a box.** Your config, your binds, your shell: your agent tries a
    change to your desktop in a box first.
- **Under them:** Each has run in a spike, with Dux Shell (formerly DankMaterialShell) and the config it sets up for new
  users. → What has run, and what hasn't
- **CTA:** Tell us your shell (omabox #321) · What's coming →
- **Shows:** Dux Shell (DankMaterialShell) in a plain box, taken with `--clean` (`user@omabox`).

### Footer

Nav links, "Built by" as a row of contributor avatars with "Your machine is the test we don't have
→ contributing", the MIT line, and "An independent community project, not affiliated with or
endorsed by Omarchy or Hyprland. Every screenshot here was taken by omabox, in a box." The
`omabox down --all` terminal stays as the footer's art.

### Every other page

Each one ends the same way: the shared install call to action, then a slim "What's coming" strip
(the three cards' titles in one line, → `/next`). On `/next` itself, the strip is left out.

### Visual direction, for the design session

**Look H** (`looks/h-tokyo.html`, <https://claude.ai/artifact/KbDBx7porFe6j6Xx8mB3VJ>): G's colours and
type (Tokyo Night with the aurora, Chakra Petch, mono uppercase labels and buttons) on F's shapes
(rounded panels, soft shadows, no cut corners). Its Omarchy band shows Omarchy's own logo (from
`/usr/share/omarchy/logo.svg`) under our mark, in place of the launcher screenshot (Diogo).

**Look G** (`looks/g-cyber.html`, <https://claude.ai/artifact/GECRd9uoMdQE7NtXkPrgYr>) is Look F in the
current omabox.app's dress, for Diogo to compare side by side before the look is set: Chakra Petch
headings, mono uppercase labels and buttons, Tokyo Night with its aurora, and every rectangle with
the cut corners (the mark's two gaps). Same layout, copy and scenes as F. One of F or G becomes the
look.

**2026-10-27, last: Look F** (`looks/f-home.html`, <https://claude.ai/artifact/Mw4yGgM2Vv5R5M3CdiEpKu>),
meant as the home page's final look; the other pages move to it next. From E, after Diogo's review:
the old site's big mark is back, under the menu at the top of the page, shrinking into it over the
first 120 px of scroll and breaking when clicked (an homage to drafts 4 and 5; the Omarchy band
loses its own breaking mark). The hero has no install line ("why install on arrival?"): the heading
runs across the page, then the lead and three topic lines share one top edge, with "See them work"
and "How it works". In the 3D scene the boxes' edges and tethers are thicker, your still cursor is
drawn as a cursor with a "your cursor · still" tag, and a full scene says the limit is the
drawing's, not omabox's. New sections: Uses (4) and New in (5). The nav gains Uses.

**2026-10-27, later: Look E** (`looks/e-desk.html`, <https://claude.ai/artifact/AKGB3jfKWz1WAxDdruMxxP>).
Diogo on D: better, but it read as a cua.ai ripoff. E keeps D's sections and drops what came from
cua: the keycap icons, the floating keycap cubes, the bottom dock, and the Outfit + Instrument
Serif pair. In their place: a normal menu at the top (a Menu button under 960 px); headings in
Bricolage Grotesque with the second phrase in a dimmer silver; every section a Hyprland workspace
(the rail on the left names the one on screen, and a "2 parallel boxes" label sits over each
heading); and the hero as a full-width 3D desk scene (Home, 1. Hero). CSS 3D only, transform and
opacity, paused off screen; measured in a box at 1080p: Chromium at 0.8% of an RTX GPU with the
hero playing. D stays as it is for comparison.

**2026-10-27: Look D** (`looks/d-workspace.html`, <https://claude.ai/artifact/9MfPEiL5kZj3eQoePDTwfM>),
Look C rebuilt after Diogo pointed to the new <https://cua.ai> as a reference for fonts, icons,
graphics and motion: every section is a small live workspace showing omabox doing its thing. Taken
from it: Outfit headings with one Instrument Serif italic phrase, a little box icon before each
heading (our take on its keycaps; the mark's bar is on its lid), floating boxes in a rounded hero
stage, a floating dock for the nav, a numbered rail of sections, a heading beside its text above a
wide scene, three short columns under a scene. Kept from C: the black stage, the brand green for
what is a box, the box in glass, the typed agent tabs, the lanes and `omabox ls`, glow cards, the
mark that breaks. Measured in a box at 1080p: Chromium at about 1.4% of an RTX GPU with the
flagship scene playing. Waiting on Diogo's review; C stays for comparison.

**Chosen on 2026-10-26: Look C** (`looks/c-glass.html`, <https://claude.ai/artifact/JoBDQsA9P61ZVh9rhoGxts>),
modelled on <https://resend.com>: a black stage, silver serif headings, a glass box in the hero, the
interactive pieces of today's site (the replayed side-by-side, typed agent tabs with a box's screen,
the lanes and `omabox ls`, the mark that breaks), glow cards, a slow beam over grain. Diogo: "this is
the way", to be polished in a session of its own before every page moves to it. Looks A
(`looks/a-refined.html`) and B (`looks/b-desk.html`) were the other two tries; their notes below
stay for reference.

Diogo first pointed to <https://duxlabs.dev/> as a reference for a fresher, more modern look: not to copy.

- **Worth taking:** sparse copy (a heading, a line or two, then a picture); a one-line announcement
  strip; a row of logos saying who it works with (theirs is compositors; ours would be agents); a
  terminal block in the hero; card grids with one line each; generous space between sections.
- **Not ours:** their product-suite grid, the light and dark screenshot pairs, the support pitch.
  omabox is one tool, so the page is one story.
- **Still binding (DIRECTION.md):** lightweight (transform and opacity only, paused off screen,
  `prefers-reduced-motion`, no WebGL or scroll-jacking), the logo as the star, every screenshot
  from a box. Whether the Tokyo Night dark-only look, the cut frames and the aurora stay is the
  design session's question, for Diogo.

---

## omabox.app for agents (new)

Agreed on 2026-10-26, from Resend: resend.com answers an agent's fetch with Markdown written for
agents (a setup guide, its skills, an `llms.txt`), not the designed page. omabox is built for
agents, so its site should read well to them too. Each page then has two readers: a person sees the
designed page, an agent gets its words as Markdown.

What the build adds (no copy of its own beyond the guide below; every page's words are the ones in
this file):

- **`/llms.txt`**: what omabox is in three lines, then a link per page with one line each, and the
  setup guide first. It follows the llms.txt convention (a title, a summary, then sections of links).
- **A Markdown twin of every page**: `/install.md`, `/next.md`... made by `build.mjs` from the same
  source, so they never drift. `/commands.md` and `/changelog.md` come straight from the omabox repo
  at the release tag, as their pages do.
- **The same URL, by request:** a fetch that sends `Accept: text/markdown` gets the Markdown twin.
  `functions/_middleware.js` (it now only sends www to omabox.app) would do this.
- **A line in each page's head** pointing to its twin (`<link rel="alternate" type="text/markdown">`).

### `/install.md`: the setup guide for agents (copy)

- **Title:** Installing omabox, for an agent
- **Text:** You're an agent, and your user wants omabox: desktops of your own to test GUI work in, off
  their screen. Here is how to install it with them.
- **Check first:** this machine runs Omarchy 4 with Hyprland 0.56+ (`omarchy-version`,
  `Hyprland --version`). If it doesn't, stop and tell your user: plain Hyprland boxes are coming, not
  shipped.
- **Install:** `git clone https://github.com/diogochaves/omabox && cd omabox && ./install.sh`
- **What is your user's, not yours:**
  - If packages are missing, `install.sh` runs `sudo pacman`. Don't run sudo yourself: tell your user
    which packages, and let them run it.
  - `omabox setup` asks whether to put the widget in their bar and to turn on the agent guard. Those
    are your user's choices: ask them.
- **Check it works:** `./install.sh --check` starts a box, takes a screenshot and takes it down.
- **Then:** start a new session. The omabox skill loads from then on, and tells you when a task
  needs a box.
- **Safety, said plainly:** a box keeps your apps off your user's desktop. It is not a security
  boundary.

### On `/install`, for people

- **A line under the install bar:** Or ask your agent: "Install omabox. The guide is at
  omabox.app/install.md." It stops for you where sudo or a choice of yours comes up. **[check]**

---

## `/how-it-works`

Keeps its sections (its own screen, pointer and keyboard, nothing on your session, no system bus,
its own bar, the guard; what a box gets; agents on their own; one box per session; look inside).
What changes:

### Head

- **H:** A whole desktop for every agent, none of it on yours.
- **Text:** A box is a real Hyprland desktop: its own compositor, its own session bus, on a screen
  only it can see. On Omarchy it is Omarchy's, with your theme and bar. Here is what it keeps off your
  desktop, and how.

### New: The four steps (moved from the home page)

- **H:** The agent starts a box, works in it, and the box goes when the agent does.
- **1. It reaches for a box.** Whenever a task touches the desktop: a GUI app, a screenshot, a bar
  plugin, tests that need a tray or a keyring.
- **2. It starts one.** A whole desktop only it can see, on one screen or as many monitors as the
  test needs. Up in a few seconds. `$ omabox up`
- **3. It works in it.** It launches, clicks, types and reads what changed. Your cursor, keyboard
  and focus are never touched. `$ omabox run -d -- ./build/app` · `$ omabox click 600 300 --wait`
- **4. It goes with the agent.** When the agent's session exits, its box goes too, notifications and
  tray icons included.

### Look inside (changes)

- **H:** Look inside any box, or take the wheel.
- **New first line:** The easiest way in is to ask. "Start a box with the app and the dev server
  running, I want to try it" gets you an interactive box: a window on workspace 9 that you drive,
  opened without taking your focus. Your agent can still click, type and take shots in it, and
  rebuild the app in place (`run -d --replace`) while you test. It starts one only when you ask.
- Peek, interactive and the widget follow as now. The widget's detail moves to `/omarchy`.

### What a box gets (additions to the lists)

- In the box: **your fonts**, read-only, so a theme's or a plugin's faces draw as on your desktop.
- Off until you ask: **sound** (`--audio`: its own PipeWire, a speaker nobody hears, a silent
  microphone); **addresses of its own** for an isolated box (`--addr`, documentation ranges only).
- Never in a box: **your agents' and browsers' own stores** (`~/.claude`, `~/.codex`, browser
  profiles, `~/.pki`) whichever way you try to mount them; **plugin settings that look like a key,
  token or password**.

### New: 1.0 holds tighter (`#hardening`)

- **L:** 1.0
- **H:** Rewritten in Rust, and tighter for it.
- **Text:** 1.0 is one binary built from Rust. The commands are the ones you know. Underneath, a box
  reaches less of yours and leaves less behind.
- **Card: Your terminal stays yours.** A command in a box runs in a session of its own, with no
  controlling terminal. It can't read what you type, write to your terminal or signal it. Ctrl-C
  still reaches it.
- **Card: Its display, and only its display.** `omabox env` points at the box's Wayland socket
  through a hard link the box can't swap, so a host tool never lands on another display.
- **Card: Nothing half-done.** Stop omabox at any step, with Ctrl-C or a signal, and it undoes that
  step: an interrupted `up` takes its box down, a recording keeps the video so far, a half-made
  monitor goes, temporary files go.
- **Card: No crash notifications from a box.** The tools omabox runs against a box (grim, hyprctl,
  gdb) get the box's crash limits, so a crash in one doesn't reach your desktop's notifications.
- **Card: Faster in.** omabox enters a box itself, without nsenter: `run -- true` in about 24 ms.
  **[check]**

### New: Ports no box reaches (`#ports`)

- **H:** Name the ports a box must not reach.
- **Text:** A connected box reaches your network and your host's servers, like any app. If a
  database or an admin panel listens on your machine, protect its port:
  `omabox config protect-ports 5432,8080`. No connected box reaches those ports, on loopback or
  through any of your host's other addresses (a Docker bridge, a VPN), TCP or UDP. None are
  protected by default; it needs nftables. An address your host gains after a box started is not
  covered. It's still not a security boundary: for a box with no network but the ports you choose,
  use `--net isolated --allow`.

### New: The ten rules (`#rules`)

- **H:** Ten rules, each with the code that holds it and the test that proves it.
- **Text:** omabox promises one thing: a box never reaches your real desktop. SECURITY.md lists each
  rule behind that promise, from "Hyprland never gets your seat" to "a connected box reaches no
  protected port", where omabox enforces it, and which test proves it. They keep a box from reaching
  your desktop by mistake or through an app that misbehaves. They are not a defence against code
  written to escape: a box is not a security boundary.
- **List:** S1 to S10 as one-line titles, each linking to SECURITY.md.
- **CTA:** Read SECURITY.md · Report a way around one (privately)

### Agents use it on their own (changes)

- **The skill:** "about 2k tokens fewer since 0.9: the core every task needs, the rest in a reference
  the agent reads by section". **[check]** the size claim (the page now says about 4k tokens).
- **New card: Subagents get a brief.** `omabox brief -b NAME` prints what a subagent needs: the box,
  its windows, each with a word that finds it, and the rules. It costs a quarter of the skill or less.
- **New card: It says what changed.** After a click or keys with `--wait`, omabox says what changed:
  a window opened and took focus, a menu opened, or nothing did. The agent doesn't need a shot to
  learn that nothing happened.
- **New card: A server that died is said.** A `run -d` job that dies in its first 30 s is one
  warning on the box's next command, with its exit status and log.
- **Opt-in: report what omabox got wrong.** `omabox setup --feedback-skill` adds `/omabox-feedback`.
  Your agent looks back through the session for omabox failures, takes your paths, names and tokens
  out, and files them on your yes.

---

## `/omarchy` (new)

- **L:** omabox on Omarchy
- **H:** Born on Omarchy, fullest there.
- **Text:** omabox started as a way to test Omarchy plugins without touching the bar you work in.
  On Omarchy, a box is Omarchy: its own Hyprland config and shell (bar, menu, tray, notifications),
  with your theme, bar layout and terminal settings. What's on this page is Omarchy's alone.

### Your bar, in a box

- **Your whole shell.** `up --desk-shell` brings every plugin in `~/.config/omarchy/plugins`, your
  `shell.json` as it is, and the files your plugins read. Never `api-keys.env`, nor anything named
  or holding a key, token, secret or password. `up` lists what went in and what didn't, and why.
- **One plugin, in a bar that isn't yours.** `--plugin` mounts it read-only and says why the shell
  didn't load it: a manifest it refuses, a QML error.
- **Its settings, said.** A box gets your plugins' settings; `up` names each one a plugin reads, and
  `--no-seed extensions` starts a box as a new Omarchy user.
- **Read the bar as text.** `tree --layer omarchy-bar` reads a panel's or plugin's accessibility
  tree, for items that set a role. (Omarchy's own bar publishes none today; a plugin can.)

### Your theme, live

- `--theme-dir` puts the theme you are editing in the box, every save with it; `--theme` starts a
  box on the theme you name, whatever your desktop is on.

### A clean Omarchy, for checks

- `up --clean`: Omarchy's bar on tokyo-night, a solid magenta wallpaper (any of it inside a window is
  a hole), the bar's clock frozen at Friday 12:00, English in UTC, no pointer, no network, no fonts of
  yours, no animations. A baseline is the same image on every machine. `--keep` takes back what a
  test needs.

### Omarchy's own checkout and stack

- `up --omarchy DIR` runs a box on that tree's config, shell and scripts, as `omarchy dev link`
  would, without touching your system.
- `up --quickshell PATH` runs the box's shell on a Quickshell build of yours.
- Omarchy's own binds work in a box: the browser bind opens the browser there, the shell restart
  restarts the box's shell. Omarchy's own shell tests pass in one.

### On Omarchy 4.5

- **H:** Ready for Omarchy 4.5.
- **Text:** Boxes run on Omarchy 4.0 and 4.5. On 4.5, a box's windows can open on a workspace of
  omabox's own, `special:omabox`, opened by the widget's Show. The first shot after `up` waits for
  4.5's intro cover. **[check]** which 1.0.x carries this, and that 4.0 is still supported (1.1
  drops it, omabox #312).

### The bar widget

- The omabox mark in your bar lists every box, with peek, screenshot and down for each, keys-to-box
  and the clipboard for an interactive one, and an orphan box (one nobody will take down) said on its
  row.
- **Shows:** the playable widget, as on `/how-it-works` now (move it here, link from there).

### What stays Omarchy's when plain boxes come

- **Text:** When plain Hyprland boxes ship, the bar, `--desk-shell`, `--plugin`, `--theme` and the
  stock-bar checks stay Omarchy's. On a plain box they are refused, with what they need.
- **CTA:** What's coming →

---

## `/commands`

The generated list stays. Hand-written additions:

### New: The contract (`#contract`), above the list

- **H:** What your scripts can rely on.
- **Text:** omabox is mostly used by agents, which read its warnings; a script or CI reads exit codes
  and `--json`. From 1.0, within 1.x:
  - **Kept, or only added to:** exit codes (0 done, 1 failed, 2 called wrongly, 124 not in time;
    `run`'s 125 for its own failures) and every `--json` field.
  - **Changed only after a warning:** commands, options, config keys and `OMABOX_*` variables. The
    old form works for one more minor release, with `omabox: deprecated:` on stderr naming the new
    one; `OMABOX_STRICT=1` refuses it at once, for CI.
  - **Saves and baselines carry over:** a save or a `check` baseline made by a 1.x works with any
    later 1.x.
  - **Not covered:** message wording, help text, defaults, and what Hyprland and other programs
    report through omabox.
- **CTA:** `omabox help exit-codes`

### `commands.json`: the seven commands it lacks

Each gets a group, a line and an example. **[check]** each example against `help CMD` at the tag.

| Command | Group | Line | Example |
|---|---|---|---|
| `tree` | Run, look and wait | A window's or a layer's accessibility tree, as text: ask before you look. | `omabox tree --find 'dark mode'` |
| `check` | Run, look and wait | Visual checks: a scenario's checkpoints against a baseline, said same or changed. | `omabox check run --approve -- ./scenario.sh` |
| `record` | Run, look and wait | A video of the box, with marks, captions, input drawn in and a contact sheet. | `omabox record start -o demo.mp4` |
| `audio` | Run, look and wait | Listens to a box with `--audio` and says whether it made a sound, when and how loud. | `omabox audio 3` |
| `cpu` | Run, look and wait | CPU and memory of a box's processes, per thread with `--threads`. | `omabox cpu --app myapp --threads` |
| `calibrate` | You and your desktop | Does this model need `--fit` to click right? A test card it reads, then the answer. | `omabox calibrate` |
| `brief` | Setup and agents | The lines a subagent needs to drive a box, instead of the whole skill. | `omabox brief -b NAME` |

---

## `/develop`

Head reframed: for people testing apps, and for people changing Hyprland itself. Omarchy plugins and
themes move to `/omarchy`, with one card here pointing there.

- **H:** Test your app in a box, and Hyprland itself.
- **Text:** For app developers whose agents need to see their work, and for people changing Hyprland
  or writing plugins for it. Omarchy plugins and themes have their own page.

### Every desk you don't have

Kept as it is (monitors, `output drop --cycles`, gdb).

### New: Checks that don't need you to look (`#check`)

- **H:** Visual checks, without looking at every screen.
- **Text:** Write a scenario: a script that drives the box and calls `omabox check point ID` where a
  shot should match. `check run --approve` runs it three times in a clean box and keeps what most runs
  agree on. From then on, `check run` says same or changed for each checkpoint. Each changed region
  is marked, and for an app with an accessibility tree it names the element (`moved -6,+0 button
  "Save"`). One report image shows every change, the baseline beside the new shot.
- **Highlights:** a 2 px spacing change is caught, and so is a colour a few levels off; what the
  approve runs disagreed on is left out and said; holes (the wallpaper showing through a window) fail
  a check; `--json` for CI; exit 4 when there is no baseline.
- **Shows:** the report image (same new media as home section 5).

### New: Ask the app (`#tree`)

- **H:** Text instead of a shot.
- **Text:** `omabox tree` reads a window's accessibility tree: each control's role, name, text, value
  and state, with bounds a click takes. `tree --find 'dark mode'` prints the one line that answers
  the question, about 17 tokens where a shot costs about 1.5k. For GTK and Qt apps, Chromium or
  Electron with accessibility on, and egui apps on eframe 0.37+. `tree --layer` reads a shell's panel.
- **Line:** `omabox calibrate` tells an agent whether its model needs `--fit` to click right, for any
  model and harness.

### New: Film it, hear it (`#record`)

- **H:** Videos people can follow.
- **Text:** `omabox record` films a box, one monitor or all of them at once. `--show-input` draws in
  the clicks and keys, `--captions` puts your marks on screen, `--cut-idle` cuts the still stretches,
  and `--glide` makes the pointer travel instead of jump. `record stop --sheet` makes a contact sheet,
  so an agent can check a take without watching it. With `up --audio`, the sound goes in the video.
  It plays to a speaker nobody hears, never yours.
- **Line:** `omabox audio 3` says whether the box made a sound in three seconds, when and how loud:
  a notification sound checked without hearing it.

### Rebuild, restart, look (kept), plus

- `keys down:KEY` / `up:KEY` hold a key across commands, for a bind on release.
- `omabox log journal`: a box has its own journal sockets, so programs that log only there work.
- `omabox cpu --threads`: a Qt Quick app's main thread apart from its render thread.
- Your fonts are in every box, so shots don't fall back silently.

### Hyprland and compositor work

Kept (`--hyprland`, gdb, `lua`, `events`), plus one line: "Plain Hyprland boxes, for Hyprland plugin
and compositor developers on any distro, are coming. → What's coming"

### Limits (additions)

- wgpu apps (eframe's default renderer, iced, Bevy) don't start in a box on NVIDIA: use a GL renderer,
  or a box on the AMD or Intel GPU.
- A box turns PipeWire's realtime module off for its clients.

---

## `/compare`

Becomes **omabox and ai-jail** (nav label "ai-jail", 2026-10-27). The comparison cards go: Cua and
omarchy-in-omarchy are no longer named anywhere on the site, and the "If you came for agent computer
use" card planned here is dropped with them. Changes:

- **Head text:** omabox keeps an agent's windows off your desktop; ai-jail fences what the agent can
  read, write and reach. They stack.
- **ai-jail recipes:** captions say the versions they were re-run with on 1.0. **[check]** both
  recipes with 1.0 (the relay now takes values on a file descriptor; a jail's `config` hides
  `protect-ports`).
- **"Not a security boundary"** stays in the ai-jail intro.

---

## `/next` Coming (new)

- **L:** What's coming
- **H:** omabox beyond Omarchy.
- **Text:** omabox was born on Omarchy, and 1.0 runs there. But most of it has nothing to do with
  Omarchy: the boxes, the keys and clicks, the shots, the waits, gdb. Only the config a box boots and
  the shell it runs are Omarchy's. Here is what comes next, what has run so far, and what hasn't.
  None of it has shipped, and there is no date.

### 1. Plain Hyprland boxes

- **H:** A box without Omarchy.
- **For:** Hyprland plugin and compositor developers, and anyone on Hyprland whose agent needs a
  desktop to test in.
- **Text:** A plain box boots its own small Hyprland config: Hyprland's defaults, a terminal on
  SUPER+RETURN, no Omarchy look or binds. Every command you'd use to test works the same: `keys`,
  `click`, `shot`, `wait`, `events`, `lua`, `gdb`, `--hyprland` with your build. Reproduce a
  plugin's crash or a compositor bug without losing your session.
- **Aimed at:** any distro with Hyprland 0.56+ and its Lua config. Lua because `keys`, `click` and
  `monitor` work through `hyprctl eval`, which a `.conf` config refuses.
- **What has run:** a plain box on our Omarchy machine, with Omarchy's files hidden from the box, as
  if they weren't installed. No config errors, and `keys` opened a terminal.
- **Not yet:** a run on a machine without Omarchy; an install that doesn't assume pacman (a
  `doctor` that says what's missing, per distro); tests in the suite.

### 2. Your own shell

- **H:** The shell you use, in a box.
- **For:** people who write or use Hyprland shells, and shell plugin authors.
- **Text:** `up --shell CMD` runs a shell of your choice in place of Omarchy's. Shells will be
  supported one at a time, each checked in a box before it's listed. Dux Shell (formerly
  DankMaterialShell) is first.
- **What has run:** Dux Shell 2.0 in a plain box, up to its bar in about 4 s. Its bar, dash,
  launcher and control center were driven with `click` and its own IPC, and `restart-shell` brought
  its bar back. Its control center can be read as text (`tree`). A box has no system bus, so
  network, Bluetooth and sound read "Not connected", "No adapters" and "No output device", and the
  shell keeps running. (DankMaterialShell 1.6.3 ran the same way before the rename.)
- **Not yet:** a second shell. Shells with their own idle and lock need omabox to hold those off.

### 3. Your own Hyprland desktop, in a box

- **H:** Your desktop, your agent, none of it on your session.
- **For:** anyone whose agent edits their dotfiles, binds or shell.
- **Text:** `--desktop desk` boots your `hyprland.lua` in a box: your binds, your input settings,
  your shell, and the look your config and shell give it. What would reach your session is left
  out: `systemctl --user` and uwsm lines, idle and lock daemons, polkit agents. Everything else runs,
  and each decision is logged. A reload in the box is clean. Your agent tries a change to your
  desktop in a box first, and you look at it there.
- **What has run:** the config Dux Shell 2.0 sets up for a new user (127 binds), booted in a box
  with Dux as its shell. No config errors, and only its two systemd lines were dropped. Its own
  SUPER+space opened Dux's Spotlight launcher, and a reload kept every bind with nothing started
  twice. An earlier run on DankMaterialShell 1.6.3 also brought back its wallpaper and light mode,
  with the box's HOME at your real path. That HOME is still a copy, never your real one: the host's
  `~/.ssh` and the rest were absent.
- **Not yet:** a config from a real machine rather than one made in a box; configs that run
  commands while they load; finding the shell from the config; tests in the suite.

### What stays the same

- **Text:** The same rules hold on every desktop. A box never gets your seat, your secrets or your
  session, and it is not a security boundary. On Omarchy, everything on `/omarchy` stays.

### Tell us

- **H:** Which shell should come next?
- **Text:** Shells will be supported one at a time. Tell us yours, and whether your agents already
  edit it.
- **CTA:** omabox #321 (your own desktop) · omabox #247 (plain Hyprland) · Watch the repo
- **Shows:** Dux Shell 2.0 in a plain box, its control center open: `looks/media/dux2-control-center.png`
  (taken 2026-10-26 with `--clean`, so `user @ omabox`; weather, host CPU/RAM and uptime turned off).
  Not the Spotlight launcher: its search lists the host's apps.

---

## `/changelog`

The generated changelog gets a hand-written head: the "New in" tabs that left the home page.

- **H:** What each release added.
- **Text:** What you would notice, newest first. Every fix is in the changelog below.
- **Tabs:** 1.0, 0.5.0, 0.4.3, 0.4.2, 0.4.0, 0.3.0, 0.2.0, 0.1.1, 0.1.0 (the older panels as they
  are on today's home page).

**1.0 panel**

- **Line:** `1.0.0 · [date] · a contract your scripts can keep · changelog →` (date filled at
  release; no date promised before).
- **Caption:** Everything from 0.6 to 1.0 that you would notice, in one tab.
- **A contract your scripts can keep.** Within 1.x, exit codes and `--json` fields stay as they are
  or only grow. A command or option that has to change warns for one release first;
  `OMABOX_STRICT=1` makes that warning an error, for CI. → `/commands#contract`
- **One binary, in Rust.** Stopped mid-step, omabox undoes that step: an interrupted `up` takes its
  box down, a stopped recording keeps its video. Entering a box is its own now, not nsenter's:
  `run -- true` in about 24 ms. **[check]**
- **Ports no box reaches.** `omabox config protect-ports 5432,8080`: your database stays out of
  every box, on loopback or any of your host's addresses. → `/how-it-works#ports`
- **The app answers in text.** `tree`, `check`, `record` and `audio`, from 0.6 to 0.9: an agent asks
  the app, compares it with a baseline, films it and hears it. → `/develop`

---

## `/install`

- **H:** Three minutes, then your agents take it from there.

### What you need (changes)

- **Your machine:** Omarchy 4 on Arch, with Hyprland 0.56 or later. **[check]** 4.0 and 4.5 both.
- **A GPU:** AMD, Intel or NVIDIA (no models or driver versions, as decided on 2026-10-01).
- **Rust:** omabox 1.0 is one binary, built by `./install.sh`. If there's no `cargo`, it installs
  Arch's `rust`; the first build fetches its crates.
- **For protected ports:** `nft` (nftables), only if you set them.
- **On NVIDIA:** as now (the aquamarine fix that `install.sh` builds).
- **Not on another distro yet:** plain Hyprland boxes are coming. → What's coming

### New: Upgrading from 0.x to 1.0

- **H:** From 0.x to 1.0.
- Take your boxes down first: `omabox down --all`.
- Pull and build in one go: `git pull && ./install.sh`. Until it has run, `omabox` is missing, new
  agent sessions start without the guard, and agents in ai-jail don't start.
- Restart agents running in ai-jail.
- Scripts that used a form 0.9 warned about get a line naming what to write instead. The changelog
  lists each one.
- Every path in your home stays where it was.

### What a box can't do (additions)

- wgpu apps on NVIDIA (see `/develop`).
- A box has no system bus, so apps that need system services open with errors.
- (Keep the existing items: virtual monitors, suspend, the lock screen's password.)

### Questions (moved from the home page)

- **Do I type omabox commands myself?** You can, but you'll rarely need to. Ask your agent: "start
  a box with the app running so I can try it" gets you a window you drive, and the agent keeps
  changing the app in it while you test.
- **Does it work without Omarchy?** Not yet. A 1.0 box runs your host's own Omarchy: its Hyprland
  config, its shell and your theme. Plain Hyprland boxes are coming, aimed at any distro with
  Hyprland 0.56+ (the Lua config). → What's coming
- **Does it run my own shell or dotfiles?** Not yet. Your own shell and your own Hyprland config in a
  box are coming, one shell at a time, Dux Shell first. → What's coming
- **Is omabox part of Omarchy?** No. omabox is an independent community project and is not made or
  endorsed by the Omarchy project. Report problems on omabox's GitHub, not to Omarchy.
- **Will 1.0 break my scripts?** Exit codes and `--json` fields keep their meaning within 1.x, and
  only grow. 1.0 itself removed the forms 0.9 warned about, each refused with a line naming what to
  write. → The contract
- **Why Rust?** One binary, built by `./install.sh`. It leaves nothing half-done when you stop it,
  enters a box without nsenter, and keeps a box's commands off your terminal. The commands are the
  same.
- **Can two agents test at the same time?** Yes. Each Claude Code or Codex session gets its own box,
  named after its repo or worktree and its session. Subagents take a box each, with `omabox brief`.
- **Is it a sandbox?** No, it is not a security boundary. It keeps apps off your desktop and never
  gets your secrets, input devices or seat, but it shares your kernel, GPU and, unless you pass
  `--net isolated`, your network. For a fence around the agent, use ai-jail; for hostile code, a VM.
- **Which GPUs does it work on?** AMD, Intel and NVIDIA. On NVIDIA, headless boxes need a fix to
  aquamarine that `install.sh` builds for you.
- **Does peeking slow the agent down?** No. Peek only copies frames out of the box.

---

## Facts to re-check at the 1.0 release

1. **Which release holds what.** On `port-rust` the CHANGELOG has "Unreleased" above "1.0.1 —
   unreleased" above "1.0.0 — unreleased". Find out which of protect-ports, the Rust binary, the
   hardening and the 4.5 work land in 1.0.0, so the 1.0 tab and `/omarchy`'s 4.5 section name the
   right version.
2. **Box entry timing.** NOTES (port-rust, ~line 9832) measures `run -b B -- true` at 35.1 ms before
   omabox's own entry and 24.2 ms after (Rust both times). The CHANGELOG says "about a third less
   time". The bash figure of 47 ms isn't in the notes: measure it, or quote only "about 24 ms".
3. **Box size and start time** ("400 to 700 MB, up in 3 to 5 s"), measured on 0.5.2: re-measure on
   1.0, iGPU and NVIDIA, three starts each.
4. **The "ask your agent" scenes** on the home page: run each of the three prompts for real (Claude
   Code, in a box playing the desktop) and take the scenes' lines from what happened, the `--wait`
   line included. Scene 2 especially: the agent starts an interactive box only when asked, then
   rebuilds with `run -d --replace` while you drive it.
5. **The skill's size** for `/how-it-works` (it says about 4k tokens; 0.9.1 says SKILL.md went to
   8 kB, ~2k tokens fewer). Measure 1.0's.
6. **`tree` claims:** ~17 tokens against ~1.5k for a shot (0.6.0's figure); which toolkits work;
   egui needs eframe 0.37+ on at-spi2-core 2.61+.
7. **Omarchy versions:** 4.0 and 4.5 both run in 1.0.x (finding 422), with 4.0 dropped in 1.1
   (#312). Does `/install` say "Omarchy 4" or "Omarchy 4.5"?
8. **ai-jail recipes** on `/compare`: re-run both with 1.0 and the current ai-jail, and update their
   captions.
9. **Upgrade steps** from 0.9.2 to 1.0, run once on a real upgrade, including whether the guard
   needs `omabox guard on`.
10. **The seven new `commands.json` examples** against `omabox help CMD` at the tag.
11. **SECURITY.md:** still ten rules (S1-S10), with the same titles, at the tag.
12. **The README's requirements** at the tag, as `/install` follows main.
13. **Contributors:** whether anyone new shipped code between 0.5.2 and 1.0 (the build fetches them;
    the hardcoded fallback list may need them).
14. **The coming page, against the branch at the time:** what `desk-plain` has merged, renamed or
    dropped (`--desktop plain|desk`, `--shell`, `--clean`'s `user@omabox`). Any flag named on `/next`
    must exist under that name, at least on the branch. If plain boxes ship before the site does,
    move them from `/next` to the pages.
15. **Dux Shell.** Re-run on 2.0.0 on 2026-10-26 (from the release files, `desk-plain` at
    76aa761): the plain box, no system bus and the desk spikes hold; the HOME-path spike was not
    re-run, so `/next` credits it to 1.6.3. Check again at the site's release against the Dux version
    then current. Don't say: that every system widget reads empty (its power tile reads "Balanced"
    with no daemon); that SUPER+space opens "the launcher" (it's Spotlight); that a user's config
    keeps its own look (Dux rewrites `hypr/dms/layout.lua` and `input.lua` at start). On a host with
    an older `dms` on PATH, the new one has to come first (Dux's QML calls `dms` by name).
16. **The Dux Shell shot for `/next`:** `looks/media/dux2-control-center.png` is clean as taken
    (`user @ omabox`, no host figures). A stock 2.0 bar shows host CPU/RAM, weather, host name,
    uptime and a `/usr` disk tile, so any new shot needs those off in the box's
    `~/.config/dms/settings.json`. Its clock shows the real time.
17. **The hero clip** is still 0.2.0's 43 s clip. Keep it or replace it (the director session).
18. **Wording to drop everywhere:** "for Omarchy" in the wordmark, the FAQ's "No" to "without
    Omarchy?", "Only for Omarchy", and every mention of Cua and omarchy-in-omarchy (pages,
    `commands.json`, `build.mjs`, `/llms.txt` and the Markdown twins). Search the pages and `build.mjs` (the
    JSON-LD and the link card's description) for the old words.
19. **An agent installing omabox:** run the `/install.md` guide with a real agent on a machine
    without omabox (a VM). Does `install.sh` stop cleanly at `sudo` without a terminal, and what
    does `omabox setup` do with its two questions when nobody is at a terminal? The guide and the
    line on `/install` say only what that run shows.
20. **Look C's cost:** measure its GPU use idle and scrolling at 1080p (`omabox gpu`), with the
    beam and the glass box running. Draft 4 was 0% idle; the rule is "lightweight is a feature".

## Open questions for you

- **The nav:** Changelog leaves the nav to make room for Omarchy and Coming. It stays linked from
  the announcement strip, the version and the footer.
- **Built by in the footer.** Contributors and "Your machine is the test we don't have" become a
  row in the footer, so the home page can end on what's coming. They could go on `/install`
  instead.

## Next session: polishing Look C

(2026-10-27: done as Look D, `looks/d-workspace.html`; see Visual direction. Once Diogo approves it,
the steps below apply to D.)

Diogo will bring references and a list of fixes and changes. Start that session from only this
file and `looks/c-glass.html`:

- the copy here is agreed; change it only where Diogo's list says so;
- polish the home page in `looks/c-glass.html` first, then carry the look to `site/base.css` and
  every page, in the new page map;
- before anything goes live: the re-check list above, a look at phone width, and the GPU measure
  (item 20).
