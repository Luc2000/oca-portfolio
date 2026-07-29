#!/bin/bash
# AI Blog Generator — generates 1 post per run.
# Designed to be invoked by cron / launchd / systemd / GitHub Actions.
# Audience for the run is determined by the wall-clock hour
# (see src/utils/schedule.ts getAudienceByTime).
#
# By default this runs the Claude CLI (Max subscription) — make sure you are
# logged in with `claude /login`. If you'd rather use the Anthropic API, swap
# src/services/claude.ts for the SDK call (see README).

set -euo pipefail

cd "$(dirname "$0")"

# Locale (cron has none, breaks UTF-8 input/output for claude CLI)
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# Ensure PATH includes Node.js, claude CLI, and homebrew (cron uses minimal PATH)
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.local/bin:$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node 2>/dev/null | tail -1)/bin:/usr/bin:/bin:$PATH"

# Load env vars
if [ -f .env ]; then
  set -a
  source .env
  set +a
fi

echo ""
echo "=========================================="
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting blog generation..."
echo "=========================================="
npx tsx src/index.ts
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Done."
