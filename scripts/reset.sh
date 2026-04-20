#!/bin/bash
# DevGym Reset Script
# Usage: ./scripts/reset.sh <git-tag>
# Example: ./scripts/reset.sh ang-01-start
# Example: ./scripts/reset.sh spr-03-start

set -e

TAG="${1}"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [ -z "$TAG" ]; then
  echo ""
  echo "  DevGym Reset Tool"
  echo "  ─────────────────"
  echo ""
  echo "  Usage: ./scripts/reset.sh <task-tag>"
  echo ""
  echo "  Angular tasks:"
  git tag -l 'ang-*' 2>/dev/null | sort | sed 's/^/    /' || echo "    (no tags yet)"
  echo ""
  echo "  Spring tasks:"
  git tag -l 'spr-*' 2>/dev/null | sort | sed 's/^/    /' || echo "    (no tags yet)"
  echo ""
  echo "  Or use special commands:"
  echo "    ./scripts/reset.sh angular-clean    Reset Angular to blank starter"
  echo "    ./scripts/reset.sh spring-clean     Reset Spring to blank starter"
  echo "    ./scripts/reset.sh all-clean        Reset everything"
  echo ""
  exit 0
fi

confirm() {
  read -p "  ⚠️  This will discard uncommitted changes in $1. Continue? [y/N] " answer
  case "$answer" in
    [yY]) return 0 ;;
    *) echo "  Aborted."; exit 1 ;;
  esac
}

case "$TAG" in
  angular-clean)
    confirm "frontend/"
    echo "  Resetting frontend/ to initial state..."
    cd "$ROOT_DIR"
    git checkout -- frontend/
    git clean -fd frontend/src/app/
    echo "  ✅ Angular project reset to clean starter."
    ;;
  spring-clean)
    confirm "backend/"
    echo "  Resetting backend/ to initial state..."
    cd "$ROOT_DIR"
    git checkout -- backend/
    git clean -fd backend/src/
    echo "  ✅ Spring Boot project reset to clean starter."
    ;;
  all-clean)
    confirm "frontend/ and backend/"
    echo "  Resetting both projects..."
    cd "$ROOT_DIR"
    git checkout -- frontend/ backend/
    git clean -fd frontend/src/app/ backend/src/
    echo "  ✅ Both projects reset to clean starter."
    ;;
  ang-*|spr-*)
    TARGET_DIR="frontend"
    [[ "$TAG" == spr-* ]] && TARGET_DIR="backend"
    
    if git rev-parse "$TAG" >/dev/null 2>&1; then
      confirm "$TARGET_DIR/"
      echo "  Restoring $TARGET_DIR/ to tag: $TAG"
      git checkout "$TAG" -- "$TARGET_DIR/"
      echo "  ✅ $TARGET_DIR/ restored to $TAG"
    else
      echo "  ❌ Tag '$TAG' not found."
      echo "  Available tags:"
      git tag -l "${TAG:0:3}-*" 2>/dev/null | sort | sed 's/^/    /' || echo "    (none)"
      exit 1
    fi
    ;;
  *)
    echo "  ❌ Unknown tag format: $TAG"
    echo "  Tags should start with 'ang-' or 'spr-', or use 'angular-clean', 'spring-clean', 'all-clean'"
    exit 1
    ;;
esac
