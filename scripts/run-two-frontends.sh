#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  bash scripts/run-two-frontends.sh <main_dir> <feature_dir> [main_port] [feature_port]

Example:
  bash scripts/run-two-frontends.sh . ../kiveiv-feature 5173 5174

Notes:
  - Expects each dir to contain frontend/app (Vite) with its own node_modules.
  - Runs two Vite dev servers on different ports and forwards logs with prefixes.
EOF
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

main_dir="${1:-}"
feature_dir="${2:-}"
main_port="${3:-5173}"
feature_port="${4:-5174}"

if [[ -z "${main_dir}" || -z "${feature_dir}" ]]; then
  usage
  exit 2
fi

main_app="${main_dir%/}/frontend/app"
feature_app="${feature_dir%/}/frontend/app"

if [[ ! -f "${main_app}/package.json" ]]; then
  echo "ERROR: main_dir not found or missing ${main_app}/package.json" >&2
  exit 2
fi
if [[ ! -f "${feature_app}/package.json" ]]; then
  echo "ERROR: feature_dir not found or missing ${feature_app}/package.json" >&2
  exit 2
fi

if [[ ! -d "${main_app}/node_modules" ]]; then
  echo "WARN: ${main_app}/node_modules not found. Run: (cd \"${main_app}\" && npm install)" >&2
fi
if [[ ! -d "${feature_app}/node_modules" ]]; then
  echo "WARN: ${feature_app}/node_modules not found. Run: (cd \"${feature_app}\" && npm install)" >&2
fi

cleanup() {
  if [[ -n "${main_pid:-}" ]]; then kill "${main_pid}" 2>/dev/null || true; fi
  if [[ -n "${feature_pid:-}" ]]; then kill "${feature_pid}" 2>/dev/null || true; fi
}
trap cleanup EXIT INT TERM

echo "Starting MAIN    on http://localhost:${main_port}  (${main_app})"
echo "Starting FEATURE on http://localhost:${feature_port}  (${feature_app})"
echo "Press Ctrl+C to stop both."

(
  cd "${main_app}"
  npm run dev -- --host 127.0.0.1 --port "${main_port}" --strictPort 2>&1 \
    | sed -e 's/^/[MAIN]    /'
) &
main_pid="$!"

(
  cd "${feature_app}"
  npm run dev -- --host 127.0.0.1 --port "${feature_port}" --strictPort 2>&1 \
    | sed -e 's/^/[FEATURE] /'
) &
feature_pid="$!"

wait "${main_pid}" "${feature_pid}"

