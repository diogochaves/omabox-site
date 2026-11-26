# Installing omabox, for an agent

The page for people: https://omabox.app/install. Every page, as Markdown: https://omabox.app/llms.txt

You're an agent, and your user wants omabox: desktops of your own to test GUI work in, off their
screen. Here is how to install it with them.

## Check first

omabox runs on Linux with Hyprland 0.56 or later and its Lua config:

```
$ Hyprland --version
$ cat /etc/os-release
```

- **Omarchy 4.5** (`omarchy-version`): boxes are Omarchy's desktop. 4.0 still works, deprecated, until
  omabox's first release after 2026-12-04; `omarchy update` brings 4.5.
- **Arch without Omarchy, Fedora 45, Debian sid, openSUSE Tumbleweed**: boxes are plain Hyprland. On
  Debian sid, Hyprland 0.57.0 breaks GPU apps in a box: it needs 0.57.1. Fedora's Hyprland is from a
  COPR.
- **Not yet: NixOS, Ubuntu 26.04, Alpine, Void.** Stop and tell your user.

## Install

```
$ git clone https://github.com/diogochaves/omabox && cd omabox && ./install.sh
```

## What is your user's, not yours

- **Packages.** If some are missing, `install.sh` prints them after `missing:` and stops with the
  command that installs them (`sudo pacman -S --needed …`, `sudo apt install …`, `sudo dnf install …`
  or `sudo zypper install …`). Don't run sudo yourself: ask your user to run that command in their
  own terminal, wait for them, then run `./install.sh` again. It ends with `==> Done`.
- **Two choices.** `omabox setup` (`install.sh` runs it) asks nothing without a terminal, and changes
  nothing: it prints the commands it didn't run, `omarchy plugin enable chaves.omabox` for the widget
  in their bar (on Omarchy only) and `omabox guard on` for the agent guard. Ask your user about both,
  and run what they choose. The guard applies to new agent sessions.
- If your shell gives commands a terminal nobody answers, setup's question and sudo wait for ever:
  run `./install.sh </dev/null` there.

## Check it works

```
$ ./install.sh --check
```

It starts a box, takes a screenshot and takes it down: exit 0 means boxes work. On a machine without
GPU rendering (a VM without 3D acceleration) it fails with "box ... died while starting".

If a box won't start, run `omabox doctor`. It checks what a box needs and changes nothing; each check
that fails has a `fix:` line with the command that installs it for this distribution. Show your user
the failing lines and their fixes; the sudo ones are theirs to run. `omabox doctor --smoke` also
starts a box once every check passes.

## Then

Start a new session. The omabox skill loads from then on, and tells you when a task needs a box.

## Safety, said plainly

A box keeps your apps off your user's desktop. It is not a security boundary.

## More

Where it runs in detail, updating and removing it, and what a box can't do:
https://omabox.app/install-page.md. Which desktop a box runs on each distro:
https://omabox.app/desktops.md
