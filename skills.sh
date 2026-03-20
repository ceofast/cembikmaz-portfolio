#!/bin/bash
# ══════════════════════════════════════════════════════════════
# cembikmaz.com — Deployment & Development Skills
# ══════════════════════════════════════════════════════════════

set -e
PROJECT_DIR="/Users/sisifos/PycharmProjects/cembikmaz-portfolio"
cd "$PROJECT_DIR"

case "$1" in

  # ── Development ──────────────────────────────────────────
  dev)
    echo "🚀 Starting dev server..."
    npx vite --port 5174
    ;;

  build)
    echo "🔨 Building for production..."
    npx vite build
    echo "✅ Build complete → dist/"
    ;;

  preview)
    echo "👁️ Previewing production build..."
    npx vite preview --port 5174
    ;;

  # ── Deployment ──────────────────────────────────────────
  deploy)
    echo "🔨 Building..."
    npx vite build
    echo "🚀 Deploying to Vercel production..."
    vercel --prod
    echo "✅ Deployed to cembikmaz.com"
    ;;

  deploy-preview)
    echo "🔨 Building..."
    npx vite build
    echo "🔍 Deploying preview..."
    vercel
    echo "✅ Preview deployment ready"
    ;;

  # ── Git + Deploy ────────────────────────────────────────
  ship)
    MSG="${2:-Update site}"
    echo "📦 Staging changes..."
    git add -A
    echo "💾 Committing: $MSG"
    git commit -m "$MSG"
    echo "⬆️ Pushing to GitHub..."
    git push origin main
    echo "🚀 Deploying to production..."
    vercel --prod
    echo "✅ Shipped to cembikmaz.com"
    ;;

  # ── Git Setup (first time) ─────────────────────────────
  git-init)
    echo "🔧 Initializing git repo..."
    git init
    git branch -M main
    echo "📦 Creating GitHub repo..."
    gh repo create ceofast/cembikmaz-portfolio --public --description "Cem BIKMAZ - Kişisel Portföy Sitesi"
    git add -A
    git commit -m "Initial commit: cembikmaz.com portfolio site"
    git remote add origin https://github.com/ceofast/cembikmaz-portfolio.git
    git push -u origin main
    echo "✅ GitHub repo ready: https://github.com/ceofast/cembikmaz-portfolio"
    ;;

  # ── Utilities ───────────────────────────────────────────
  status)
    echo "═══ cembikmaz.com Status ═══"
    echo ""
    echo "📁 Project: $PROJECT_DIR"
    echo "🌐 Domain: cembikmaz.com"
    echo "🔧 Vercel: cembikmaz-portfolio"
    echo ""
    echo "── Git Status ──"
    git status --short 2>/dev/null || echo "  (git not initialized)"
    echo ""
    echo "── Dependencies ──"
    echo "  React $(node -e "console.log(require('./node_modules/react/package.json').version)" 2>/dev/null || echo 'not installed')"
    echo "  Vite $(node -e "console.log(require('./node_modules/vite/package.json').version)" 2>/dev/null || echo 'not installed')"
    echo ""
    echo "── Build ──"
    [ -d "dist" ] && echo "  dist/ exists ($(du -sh dist | cut -f1))" || echo "  dist/ not found (run: bash skills.sh build)"
    ;;

  i18n-check)
    echo "🌍 Checking translation file sync..."
    TR_KEYS=$(node -e "console.log(Object.keys(JSON.parse(require('fs').readFileSync('src/i18n/tr.json'))).length)")
    EN_KEYS=$(node -e "console.log(Object.keys(JSON.parse(require('fs').readFileSync('src/i18n/en.json'))).length)")
    DE_KEYS=$(node -e "console.log(Object.keys(JSON.parse(require('fs').readFileSync('src/i18n/de.json'))).length)")
    echo "  TR: $TR_KEYS keys"
    echo "  EN: $EN_KEYS keys"
    echo "  DE: $DE_KEYS keys"
    [ "$TR_KEYS" = "$EN_KEYS" ] && [ "$TR_KEYS" = "$DE_KEYS" ] && echo "✅ All synced!" || echo "⚠️ Key count mismatch — check translations!"
    ;;

  # ── Help ────────────────────────────────────────────────
  *)
    echo "═══════════════════════════════════════════"
    echo "  cembikmaz.com — Skills"
    echo "═══════════════════════════════════════════"
    echo ""
    echo "  Development:"
    echo "    bash skills.sh dev           Start dev server (:5174)"
    echo "    bash skills.sh build         Build for production"
    echo "    bash skills.sh preview       Preview production build"
    echo ""
    echo "  Deployment:"
    echo "    bash skills.sh deploy        Build + deploy to production"
    echo "    bash skills.sh deploy-preview Build + deploy preview"
    echo "    bash skills.sh ship \"msg\"     Git commit + push + deploy"
    echo ""
    echo "  Setup:"
    echo "    bash skills.sh git-init      Initialize git + GitHub repo"
    echo ""
    echo "  Utilities:"
    echo "    bash skills.sh status        Show project status"
    echo "    bash skills.sh i18n-check    Check translation sync"
    echo ""
    ;;
esac
