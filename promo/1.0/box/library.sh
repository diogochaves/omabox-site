#!/usr/bin/env bash
# A demo library for omaseed in a box: a qBittorrent profile with N synthetic torrents
# (omaseed-site/promo/biglib.py) serving its Web UI on PORT, and omaseed's servers.json pointing at it.
# Run inside the box whose HOME is HOME (the stage, or a box inside it, from the stage).
#
#   library.sh HOME PORT N BIGLIB
set -euo pipefail
h=$1 port=$2 n=$3 biglib=$4
mkdir -p "$h/.local/share/qbt/qBittorrent/config" "$h/Torrents"
cat >"$h/.local/share/qbt/qBittorrent/config/qBittorrent.conf" <<CONF
[LegalNotice]
Accepted=true

[BitTorrent]
Session\\Port=27100
Session\\DefaultSavePath=/home/sbx/Torrents
Session\\QueueingSystemEnabled=false
Session\\DHTEnabled=false
Session\\PeXEnabled=false
Session\\LSDEnabled=false

[Preferences]
WebUI\\Enabled=true
WebUI\\Address=127.0.0.1
WebUI\\Port=$port
WebUI\\LocalHostAuth=false
CONF
python3 "$biglib" "$h/.local/share/qbt" "$h/Torrents" /home/sbx/Torrents "$n" >/dev/null 2>&1
mkdir -p "$h/.config/omaseed"; chmod 700 "$h/.config/omaseed"
cat >"$h/.config/omaseed/servers.json" <<JSON
{"version":1,"defaultId":"pc","servers":[
{"id":"pc","name":"This PC","url":"http://127.0.0.1:$port","authMode":"none","username":"","pathMap":[],"isDefault":true,"addedAt":"2026-09-23T00:00:00Z"}]}
JSON
chmod 600 "$h/.config/omaseed/servers.json"
