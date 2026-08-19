#!/usr/bin/env bash

set -e

echo "======================================================"
echo "   🌐 Site Cloner DNA - Automatic Setup"
echo "======================================================"
echo ""

if ! command -v node &> /dev/null; then
    echo "❌ [ERROR] Node.js not found!"
    echo "Please install Node.js (v18+) from https://nodejs.org/"
    exit 1
fi

echo "✅ [1/3] Node.js version: $(node -v)"
echo ""
echo "📦 [2/3] Installing NPM dependencies..."
npm install

echo ""
echo "🌐 [3/3] Downloading Playwright Chromium browser..."
npx playwright install --with-deps chromium

echo ""
echo "======================================================"
echo "   SETUP COMPLETED SUCCESSFULLY!"
echo "======================================================"
echo ""
echo "Usage examples:"
echo "  npm start"
echo "  node bin/cli.js https://example.com"
echo ""
