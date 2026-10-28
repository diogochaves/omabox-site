#!/usr/bin/env bash
# The omabox 1.0 video's takes. Each is recorded in an omabox box, never on the real desktop.
#
#   ./take.sh NAME            # writes assets/footage/NAME.mp4, NAME.marks.tsv, NAME.sheet.png
#   SETUP_ONLY=1 ./take.sh NAME   stages the box and stops (it stays up)
#   KEEP=1 ./take.sh NAME     leaves the box up after the take
#
# Takes (STORYBOARD.md):
#   desk-problem  a stage box plays your desktop: you type in nvim, the agent starts omaseed on the
#                 same desktop, its window takes your keys (the "a" opens Add torrent, the rest of
#                 your sentence lands in its field), the pointer jumps to it.
#   desk-boxed    the same desktop and sentence; the agent starts its box inside the stage and
#                 tests omaseed there; other agents' boxes come up too; nothing lands on yours.
#                 Also writes box-<name>.mp4, what each of the four inner boxes showed.
#   use-monitors  a still: one box, three monitors.
#   use-notify    a still: a notification on a desktop (its corner, 16:9).
#   use-web       a still: omabox.app (built from this checkout into assets/site) in Chromium.
#   use-interactive  a still: an interactive box on your desktop, the agent rebuilding in it.
#   use-boxes     two stills for the README and post 2: your desktop with the agent's `omabox ls` and
#                 the bar widget listing four agents' boxes (use-boxes.png), then the four boxes
#                 live in peek windows on a workspace of their own (use-peeks.png).
# Not take.sh: box/check/ (the check scenario, run with omabox check at 8K, README.md says how) and
# the 28 omaseed screens (a copy of omaseed's .local/visual baseline, thumbnailed).
#
# omaseed is the Release build in the checkout beside this repo (OMASEED_DIR), on a demo library:
# a qBittorrent in the box with 400 synthetic torrents (omaseed-site/promo/biglib.py). Nothing
# here talks to the real library (:8080) or the playground (:8081): the box has no network.
set -euo pipefail
NAME=${1:?NAME of the take}
HERE=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
CODE=$(cd "$HERE/../../.." && pwd)                 # ~/code/omarchy: omabox-site's parent
ROOT=${OMABOX_DIR:-$CODE/omabox}                    # the omabox checkout whose bin/omabox the stage runs
SEED=${OMASEED_DIR:-$CODE/omaseed}
BIN=$SEED/build-release/omaseed
BIGLIB=$CODE/omaseed-site/promo/biglib.py
OUT=$HERE/assets/footage
STAGE=take-omabox-1.0
# Boxes inside the stage, named as agent sessions name theirs (repo or worktree, then the session).
AGENTBOX=omaseed-5cc72cdc
OTHERS=(add-sheet-9f01d2e4 tray-icon-3b7a6c11 themes-7d20e815)
mkdir -p "$OUT"
[ -x "$BIN" ] || { echo "take: no $BIN (build omaseed Release first)" >&2; exit 1; }

ob() { omabox -b "$STAGE" "$@"; }

# --- The stage: your desktop -----------------------------------------------------------------------

# The agent's terminal: a command per line through a FIFO (SHOWN<TAB>RUN to show one and run
# another), typed out as it runs, the way an agent's tool calls appear. Not key events, which would
# take your focus.
SENT=0
agent() { SENT=$((SENT + 1)); printf '%s\n' "$1" >"$H/agent.fifo"; }
agent_done() { [ "$(wc -l <"$H/agent.done" 2>/dev/null || echo 0)" -ge "$SENT" ]; }
until_ok() { local n=$(($1 * 5)); shift; while ! "$@" 2>/dev/null; do n=$((n - 1)); [ $n -gt 0 ] || { echo "take: timed out on: $*" >&2; exit 1; }; sleep 0.2; done; }

# You, typing in your editor: a few characters per key event, at a fast typist's pace.
you() {
  local s=$1 i
  for ((i = 0; i < ${#s}; i += 2)); do ob keys -t "${s:i:2}" >/dev/null; sleep 0.05; done
}

n_foot() { ob windows --json | jq -e --argjson n "$1" '[.[] | select(.class == "foot")] | length == $n' >/dev/null; }

stage_desk() {
  ob down >/dev/null 2>&1 || true
  omabox up "$STAGE" --size 3840x2160,scale=2 --theme tokyo-night --stock-bar --idle 0 \
    --clean --keep animations,bar,wallpaper,pointer --ro-bind "$SEED" --ro-bind "$ROOT" ${STAGE_PLUGIN:+--plugin "$ROOT/plugin"} >/dev/null
  H=$(ob path --home)
  mkdir -p "$H/.local/bin" "$H/notes"
  ln -sfn "$ROOT/bin/omabox" "$H/.local/bin/omabox"
  cp "$BIGLIB" "$HERE/box/library.sh" "$H/"   # the stage sees neither omaseed-site nor (in its boxes' runs) this folder
  BIGLIB=/home/sbx/biglib.py
  ob run -- /home/sbx/library.sh /home/sbx 8090 400 "$BIGLIB"
  ob run -d -- qbittorrent-nox --profile=/home/sbx/.local/share/qbt >/dev/null
  ob wait --timeout 60s until -- curl -sf http://127.0.0.1:8090/api/v2/app/version >/dev/null
  # The agent's app floats over whatever is there, as a dialog-sized window does.
  ob lua 'o.window("^io\\.github\\.diogochaves\\.omaseed$", { float = true, size = {1440, 860}, center = true })' >/dev/null

  cat >"$H/notes/omaseed.md" <<'EOF'
# omaseed 0.5

- [x] seed console: a year of history
- [x] say why a torrent errored
- [x] every Omarchy theme, live
EOF
  rm -f "$H/agent.fifo" "$H/agent.done"; mkfifo "$H/agent.fifo"
  cat >"$H/agent.sh" <<EOF
#!/usr/bin/env bash
unset OMABOX_NAME
export OMABOX=$AGENTBOX
cd $SEED
header() { printf '\e[2J\e[H\e[1;30;44m agent \e[0m \e[2mtesting omaseed\e[0m\n\n'; }
header
exec 3<>~/agent.fifo
while IFS= read -r line <&3; do
  [ "\$line" = clear ] && { header; echo >>~/agent.done; continue; }
  show=\${line%%\$'\t'*} run=\${line#*\$'\t'}
  printf '\e[1;34m❯\e[0m '
  for ((i = 0; i < \${#show}; i++)); do printf '%s' "\${show:i:1}"; sleep 0.018; done
  printf '\n'
  eval "\$run" || true
  echo >>~/agent.done
done
EOF
  chmod +x "$H/agent.sh"
  ob lua 'hl.config({ dwindle = { default_split_ratio = 0.92 } })' >/dev/null
  ob run -d -- foot -o font=monospace:size=13 -D /home/sbx/notes nvim --clean \
    -c 'set number noshowmode wrap linebreak' -c 'syntax on' -c 'normal G' omaseed.md >/dev/null
  until_ok 10 n_foot 1
  ob run -d -- foot -o font=monospace:size=11 -D "$SEED" bash /home/sbx/agent.sh >/dev/null
  until_ok 10 n_foot 2
  ob wait still --timeout 10s >/dev/null || true
  # Your cursor in the editor, on a new line.
  ob click --window "title:omaseed.md" 300 300 >/dev/null 2>&1 || ob pointer -- move 500 500 >/dev/null
  ob keys G o >/dev/null
  ob wait still --timeout 5s >/dev/null || true
}

# A box inside the stage: omabox as the stage's own (an agent's) omabox runs it.
inner() { local b=$1; shift; ob run -- env -u OMABOX_NAME omabox -b "$b" "$@"; }
# Its demo library, its qBittorrent and (with "app") omaseed.
inner_stage() {
  local b=$1 ih
  ih=$(inner "$b" path --home)
  ob run -- /home/sbx/library.sh "$ih" 8090 200 "$BIGLIB"
  inner "$b" run -d -- qbittorrent-nox --profile=/home/sbx/.local/share/qbt >/dev/null
  inner "$b" wait --timeout 60s until -- curl -sf http://127.0.0.1:8090/api/v2/app/version >/dev/null
  [ "${2:-}" != app ] || inner "$b" run -d --wait -- "$BIN" >/dev/null
}

stage_boxes() {  # the other agents' boxes, up before the take, each testing omaseed
  local b
  for b in "${OTHERS[@]}"; do
    # Up from a process that stays (as an agent session does), so ls does not call it an orphan.
    ob run -d -- env -u OMABOX_NAME bash -c "omabox up $b --ro-bind $SEED >/dev/null 2>&1; exec sleep infinity" >/dev/null
    until_ok 30 inner "$b" wait --timeout 1s until -- true
    inner_stage "$b" app
  done
}

# use-monitors: one box, three monitors you may not have (a 1440p at scale 1.6 below, a portrait
# beside), omaseed on the big one, the launcher on the first, hyprctl's list on the portrait. A still.
take_monitors() {
  ob down >/dev/null 2>&1 || true
  omabox up "$STAGE" --size 1920x1080 --theme tokyo-night --stock-bar --idle 0 --clean --keep bar,wallpaper \
    --ro-bind "$SEED" --monitor 2560x1440,scale=1.6,below --monitor 1080x1920,1920,0 >/dev/null
  H=$(ob path --home)
  cp "$BIGLIB" "$HERE/box/library.sh" "$H/"
  ob run -- /home/sbx/library.sh /home/sbx 8090 400 /home/sbx/biglib.py
  ob run -d -- qbittorrent-nox --profile=/home/sbx/.local/share/qbt >/dev/null
  ob wait --timeout 60s until -- curl -sf http://127.0.0.1:8090/api/v2/app/version >/dev/null
  local mons
  mons=$(ob hyprctl -j monitors | jq -r '.[].name' | tr '\n' ' ')
  read -r m1 m2 m3 <<<"$mons"
  ob hyprctl dispatch "hl.dsp.focus({ monitor = \"$m3\" })" >/dev/null
  ob run -d -- foot -o font=monospace:size=12 sh -c 'hyprctl monitors | grep -E "^Monitor|^\s+[0-9]+x[0-9]+@|scale:|transform:"; exec sleep infinity' >/dev/null
  ob wait --timeout 10s window foot >/dev/null
  ob hyprctl dispatch "hl.dsp.focus({ monitor = \"$m2\" })" >/dev/null
  ob run -d --wait -- "$BIN" >/dev/null
  ob hyprctl dispatch "hl.dsp.focus({ monitor = \"$m1\" })" >/dev/null
  ob keys --wait super+space >/dev/null
  ob wait still --timeout 5s >/dev/null || true
  ob shot -o "$HERE/assets/stills/use-monitors.png"
}

# use-notify, use-web: two stills for the "and much more" slide. A notification on a desktop; and
# omabox.app itself (built from this checkout into assets/site, served inside the box) in Chromium.
take_still() {
  [ "$1" != use-web ] || [ -f "$HERE/assets/site/index.html" ] || (cd "$CODE/omabox-site" && OUT="$HERE/assets/site" node build.mjs >/dev/null)
  ob down >/dev/null 2>&1 || true
  omabox up "$STAGE" --size 3840x2160,scale=2 --theme tokyo-night --stock-bar --idle 0 --clean --keep bar,wallpaper \
    >/dev/null
  case $1 in
    use-notify)
      ob run -d -- foot -o font=monospace:size=13 -D /home/sbx sh -c 'printf "\e[1;34m❯\e[0m make test\nok: 48 passed\n"; exec sleep infinity' >/dev/null
      ob wait --timeout 10s window foot >/dev/null
      ob run -- notify-send -a omaseed "Download finished" "Field Recordings Vol. 3 [FLAC] is in ~/Torrents" >/dev/null
      ob wait --timeout 10s layer omarchy-notifications >/dev/null || true
      ob wait still --timeout 5s >/dev/null || true ;;
    use-web)
      ob run -d -- python3 -m http.server 8123 --bind 127.0.0.1 --directory "$HERE/assets/site" >/dev/null
      ob wait --timeout 20s until -- curl -sf http://127.0.0.1:8123/ >/dev/null
      ob run -d -- chromium --no-first-run --no-default-browser-check --user-data-dir=/home/sbx/.chr --app=http://127.0.0.1:8123/ >/dev/null
      ob wait --timeout 30s until -- sh -c "hyprctl -j clients | grep -qi chrom" >/dev/null || true
      ob wait still --timeout 15s >/dev/null || true ;;
  esac
  ob shot -o "$HERE/assets/stills/$1.png" >/dev/null
  # The notification is small on a whole screen: its corner of the 4K shot, 16:9.
  [ "$1" != use-notify ] || magick "$HERE/assets/stills/$1.png" -crop 1280x720+2560+0 +repage "$HERE/assets/stills/$1.png"
}

# use-interactive: a still for post 5. Your desktop (a stage box); the agent asks for a box you can
# drive (an interactive box, its window on your workspace), starts omaseed in it, then rebuilds and
# replaces it while the window stays yours to click.
take_interactive() {
  stage_desk
  ob run -- omabox config workspace 1 >/dev/null
  # The agent's box: interactive, with its own library.
  agent $'omabox up --interactive --size 1220x760 --ro-bind .\tomabox up --interactive --size 1220x760 --ro-bind . 2>&1 | grep -v -e "^omabox: note" -e "^omabox: up:"'
  until_ok 30 agent_done
  # Its window, floated large over your editor, where you would put it to drive it (omabox places an
  # interactive window itself, so a window rule does not win: dispatches, once it is there).
  local e
  for e in 'hl.dsp.window.float({ action = "enable", window = "class:aquamarine" })' \
           'hl.dsp.window.resize({ x = 1220, y = 760, window = "class:aquamarine" })' \
           'hl.dsp.window.move({ x = 30, y = 290, window = "class:aquamarine" })'; do
    ob hyprctl dispatch "$e" >/dev/null
  done
  agent $'omabox run -d -- qbittorrent-nox   # a demo library\t'"/home/sbx/library.sh \$(omabox path --home) 8090 200 $BIGLIB && omabox run -d -- qbittorrent-nox --profile=/home/sbx/.local/share/qbt >/dev/null 2>&1 && omabox wait --timeout 60s until -- curl -sf http://127.0.0.1:8090/api/v2/app/version >/dev/null"
  until_ok 60 agent_done
  agent $'omabox run -d --wait -- ./build-release/omaseed\tomabox run -d --wait -- '"$BIN"' 2>&1 | grep "^satisfied" | sed "s/ (last change[^)]*)//"'
  until_ok 30 agent_done
  agent $'# you try it; I rebuild\ttrue'
  until_ok 10 agent_done
  agent $'omabox run -d --replace --wait -- ./build-release/omaseed\tomabox run -d --replace --wait -- '"$BIN"' 2>&1 | grep "^satisfied" | sed "s/ (last change[^)]*)//"'
  until_ok 30 agent_done
  ob wait still --timeout 10s >/dev/null || true
  ob shot -o "$HERE/assets/stills/use-interactive.png" >/dev/null
}

# use-boxes: the agent's box and three more agents' boxes, each at work on omaseed; on your desktop
# only the agent's `omabox ls` and the bar widget's list say so. Then each box in a peek window.
take_boxes() {
  STAGE_PLUGIN=1 stage_desk
  stage_boxes
  agent $'omabox up --ro-bind .\tomabox up --ro-bind . 2>&1 | grep -v -e "^omabox: note" -e "^omabox: up:"'
  until_ok 30 agent_done
  agent $'omabox run -d -- qbittorrent-nox   # a demo library\t'"/home/sbx/library.sh \$(omabox path --home) 8090 200 $BIGLIB && omabox run -d -- qbittorrent-nox --profile=/home/sbx/.local/share/qbt >/dev/null 2>&1 && omabox wait --timeout 60s until -- curl -sf http://127.0.0.1:8090/api/v2/app/version >/dev/null"
  until_ok 60 agent_done
  agent $'omabox run -d --wait -- ./build-release/omaseed\tomabox run -d --wait -- '"$BIN"' 2>&1 | grep "^satisfied" | sed "s/ (last change[^)]*)//"'
  until_ok 30 agent_done
  # The other agents at work: two themes (a light one, so the four peeks differ at a glance), the Add
  # torrent sheet with a magnet typed, a row picked.
  inner "${OTHERS[2]}" run -- omarchy-theme-set catppuccin-latte >/dev/null 2>&1 || true
  inner "${OTHERS[1]}" run -- omarchy-theme-set gruvbox >/dev/null 2>&1 || true
  inner "${OTHERS[0]}" keys --wait a >/dev/null
  inner "${OTHERS[0]}" keys -t "magnet:?xt=urn:btih:7db27d6c0fcbc5c726bd" >/dev/null
  inner "${OTHERS[1]}" keys j j j j j >/dev/null
  agent 'omabox ls'
  until_ok 20 agent_done
  ob pointer hide >/dev/null
  ob run -- omarchy-shell chaves.omabox open >/dev/null
  ob wait --timeout 10s layer omarchy-panel >/dev/null 2>&1 || true
  ob wait still --timeout 10s >/dev/null || true
  ob shot -o "$HERE/assets/stills/use-boxes.png" >/dev/null
  ob keys Escape >/dev/null
  # The peeks, on workspace 2 of your desktop, the agent's box first.
  local b
  for b in "$AGENTBOX" "${OTHERS[@]}"; do
    ob run -d -- env -u OMABOX_NAME omabox peek -b "$b" --workspace 2 >/dev/null
  done
  until_ok 30 ob wait --timeout 1s until -- sh -c "hyprctl -j clients | jq -e '[.[] | select(.workspace.id == 2)] | length == 4' >/dev/null"
  # An even 2x2 of 16:9 windows (dwindle tiles them unevenly, with bars): 910x512 each, in the
  # 1920x1054 under the bar.
  local spec x y w e
  for spec in "$AGENTBOX 45 36" "${OTHERS[2]} 965 36" "${OTHERS[0]} 45 558" "${OTHERS[1]} 965 558"; do
    read -r b x y <<<"$spec"; w="title:omabox peek: $b"
    for e in "hl.dsp.window.float({ action = \"enable\", window = \"$w\" })" \
             "hl.dsp.window.resize({ x = 910, y = 512, window = \"$w\" })" \
             "hl.dsp.window.move({ x = $x, y = $y, window = \"$w\" })"; do
      ob hyprctl dispatch "$e" >/dev/null
    done
  done
  ob hyprctl dispatch 'hl.dsp.focus({ workspace = 2 })' >/dev/null
  ob wait still --timeout 10s >/dev/null || true
  ob shot -o "$HERE/assets/stills/use-peeks.png" >/dev/null
}

# --- The takes -------------------------------------------------------------------------------------

act_desk_problem() {
  ob record mark typing
  you "- [ ] tray icon: show the upload rate, "
  agent $'./build-release/omaseed &\t'"$BIN"' >/dev/null 2>&1 &'
  ob wait window io.github.diogochaves.omaseed --timeout 10s >/dev/null
  ob record mark pop
  ob record hold 400ms
  ob record mark stolen
  you "a graph of the last hour"
  ob record hold 1200ms
  ob record mark jump
  ob pointer -- move 1150 790 >/dev/null
  ob record hold 2s
  ob record mark end
}

act_desk_boxed() {
  local b
  for b in "${OTHERS[@]}"; do inner "$b" record start -o "/home/sbx/rec-$b.mp4" --fps 30 >/dev/null; done
  ob record mark typing
  agent $'omabox up --ro-bind .\tomabox up --ro-bind . 2>&1 | grep -v -e "^omabox: note" -e "^omabox: up:"'
  you "- [ ] tray icon: show the upload rate, "
  until_ok 20 agent_done
  inner "$AGENTBOX" record start -o "/home/sbx/rec-$AGENTBOX.mp4" --fps 30 >/dev/null
  agent $'omabox run -d -- qbittorrent-nox   # a demo library\t'"/home/sbx/library.sh \$(omabox path --home) 8090 200 $BIGLIB && omabox run -d -- qbittorrent-nox --profile=/home/sbx/.local/share/qbt >/dev/null 2>&1 && omabox wait --timeout 60s until -- curl -sf http://127.0.0.1:8090/api/v2/app/version >/dev/null"
  you "a graph of the last hour"
  ( inner "${OTHERS[2]}" run -- omarchy-theme-set catppuccin >/dev/null 2>&1 ) &
  ( inner "${OTHERS[0]}" keys --wait a >/dev/null; inner "${OTHERS[0]}" keys -t "magnet:?xt=urn:btih:7db27d6c0fcbc5c726bd" >/dev/null ) &
  ( for _ in 1 2 3 4 5 6 7 8; do inner "${OTHERS[1]}" keys j >/dev/null; sleep 0.25; done ) &
  until_ok 60 agent_done
  agent $'omabox run -d --wait -- ./build-release/omaseed\tomabox run -d --wait -- '"$BIN"' 2>&1 | grep "^satisfied" | sed "s/ (last change[^)]*)//"'
  ob keys Return >/dev/null; you "  next to the speeds in the bar"
  until_ok 30 agent_done
  agent $'omabox keys --window omaseed --wait a\tomabox keys --window omaseed --wait a 2>&1 | grep "^satisfied" | sed "s/ (last change[^)]*)//"'
  until_ok 20 agent_done
  agent 'omabox tree --find "Add torrent"'
  until_ok 20 agent_done
  ( inner "${OTHERS[2]}" run -- omarchy-theme-set gruvbox >/dev/null 2>&1 ) &
  ob record mark ls
  agent 'omabox ls'
  until_ok 20 agent_done
  ob record hold 2500ms
  ob record mark 'done'
  wait
  for b in "${OTHERS[@]}" "$AGENTBOX"; do inner "$b" record stop >/dev/null; done
  for b in "$AGENTBOX" "${OTHERS[@]}"; do cp "$H/rec-$b.mp4" "$OUT/box-$b.mp4"; done
}

cleanup() { [ -n "${KEEP:-}${SETUP_ONLY:-}" ] || ob down >/dev/null 2>&1 || true; }
trap cleanup EXIT
case $NAME in
  use-monitors) take_monitors; [ -n "${KEEP:-}" ] || ob down >/dev/null; exit 0 ;;
  use-notify | use-web) take_still "$NAME"; [ -n "${KEEP:-}" ] || ob down >/dev/null; exit 0 ;;
  use-interactive) take_interactive; exit 0 ;;
  use-boxes) take_boxes; exit 0 ;;
  desk-problem) stage_desk ;;
  desk-boxed) stage_desk; stage_boxes ;;
  *) echo "take: no take named $NAME" >&2; exit 2 ;;
esac
if [ -n "${SETUP_ONLY:-}" ]; then ob shot --fit 1456; exit 0; fi

ob record start -o "$OUT/$NAME.mp4" --fps 30
ob record hold 1s
case $NAME in
  desk-problem) act_desk_problem ;;
  desk-boxed) act_desk_boxed ;;
esac
ob record stop --sheet
echo "take: $OUT/$NAME.mp4 (marks: $NAME.marks.tsv, sheet: $NAME.sheet.png)"
