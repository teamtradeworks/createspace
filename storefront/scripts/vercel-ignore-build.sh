#!/usr/bin/env sh
# Vercel "Ignored Build Step" for the storefront (wired up in vercel.json).
#
# Vercel runs this from the project's Root Directory (storefront/) before every
# build. Exit 0 skips the deployment, exit 1 lets it build. We only want to
# deploy when something under storefront/ changed: marketing creative, product
# research, docs and skills live outside it and never affect the site.
#
# Compare against the last successful deployment for this branch when Vercel
# tells us what it was (VERCEL_GIT_PREVIOUS_SHA). That covers pushes of several
# commits at once. Fall back to the parent commit when the variable is empty
# (first deployment of a branch) or the commit isn't in the shallow clone.

base="$VERCEL_GIT_PREVIOUS_SHA"

if [ -z "$base" ] || ! git cat-file -e "$base^{commit}" 2>/dev/null; then
  base="HEAD^"
fi

if ! git rev-parse --verify --quiet "$base^{commit}" >/dev/null; then
  echo "No base commit to compare against; building."
  exit 1
fi

if git diff --quiet "$base" HEAD -- .; then
  echo "No changes under storefront/ since $(git rev-parse --short "$base"); skipping build."
  exit 0
fi

echo "Changes under storefront/ since $(git rev-parse --short "$base"); building."
exit 1
