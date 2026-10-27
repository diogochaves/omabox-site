# Installing omabox, for an agent

The page for people: https://omabox.app/install. Every page, as Markdown: https://omabox.app/llms.txt

You're an agent, and your user wants omabox: desktops of your own to test GUI work in, off their
screen. Here is how to install it with them.

## Check first

This machine must run Omarchy 4 with Hyprland 0.56 or later:

```
$ omarchy-version
$ Hyprland --version
```

If it doesn't, stop and tell your user: plain Hyprland boxes are coming, not shipped.

## Install

```
$ git clone https://github.com/diogochaves/omabox && cd omabox && ./install.sh
```

## What is your user's, not yours

- **Packages.** If some are missing, `install.sh` stops at once and prints them after `missing:`. Don't
  run sudo yourself: ask your user to run `sudo pacman -S --needed` with those packages in their own
  terminal, wait for them, then run `./install.sh` again. It ends with `==> Done`.
- **Two choices.** `omabox setup` (`install.sh` runs it) asks nothing without a terminal, and changes
  nothing: it prints the commands it didn't run, `omarchy plugin enable chaves.omabox` for the widget
  in their bar and `omabox guard on` for the agent guard. Ask your user about both, and run what they
  choose. The guard applies to new agent sessions.
- If your shell gives commands a terminal nobody answers, setup's question and sudo wait for ever:
  run `./install.sh </dev/null` there.

## Check it works

```
$ ./install.sh --check
```

It starts a box, takes a screenshot and takes it down: exit 0 means boxes work. On a machine without
GPU rendering (a VM without 3D acceleration) it fails with "box ... died while starting".

## Then

Start a new session. The omabox skill loads from then on, and tells you when a task needs a box.

## Safety, said plainly

A box keeps your apps off your user's desktop. It is not a security boundary.

## More

What omabox needs in detail, upgrading from 0.x, updating and removing it, and what a box can't
do: https://omabox.app/install-page.md
