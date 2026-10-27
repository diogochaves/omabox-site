#!/usr/bin/env bash
# The scenario for the video's check report: the Preferences window, one checkpoint.
set -euo pipefail
HERE=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
omabox run -d --wait -- env SAVE_SHIFT="${SAVE_SHIFT:-0}" python3 "$HERE/prefs.py" >/dev/null
omabox wait --timeout 20s window Preferences >/dev/null
omabox check point prefs --window Preferences
