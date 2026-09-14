#!/bin/bash
# ============================================================
# Update Backend — jalankan setiap kali ada perubahan kode
# Usage: bash update.sh
# ============================================================

set -e

APP_DIR="/var/www/irma-backend"

echo "🔄 Updating irma-backend..."

cd "$APP_DIR/backend"
git pull origin main
npm install --omit=dev
npm run build

pm2 restart irma-backend
pm2 list

echo "✅ Backend updated!"
echo "   curl https://irma.josapratama.cloud/health"
