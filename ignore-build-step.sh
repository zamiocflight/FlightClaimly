#!/bin/bash
# Vercel Ignored Build Step helper for FlightClaimly.
# Configure Project Settings -> Git -> Ignored Build Step to run:
#   bash ignore-build-step.sh
#
# Exit 0 = skip build
# Exit 1 = proceed with build

set -e

changed_files="$(git diff --name-only HEAD^ HEAD || true)"

# If we cannot establish a meaningful diff, build rather than risk skipping.
if [ -z "$changed_files" ]; then
  echo "No parent diff detected. Proceeding with build."
  exit 1
fi

non_docs_files="$(printf '%s\n' "$changed_files" | grep -Ev '(^docs/|\.md$)' || true)"

if [ -z "$non_docs_files" ]; then
  echo "Only documentation/Markdown changed. Skipping Vercel build."
  exit 0
fi

echo "Application-affecting files changed. Proceeding with Vercel build."
exit 1
