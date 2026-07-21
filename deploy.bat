@echo off
echo ============================================
echo  DEPLOIEMENT ECOB - SITE + DASHBOARD + API
echo ============================================
echo.

echo [1/4] Initialisation Git (site + dashboard)...
cd /d "C:\Users\WORK\Documents\WPSDrive"
git init
git add .
git commit -m "ECOB site + dashboard - initial commit"

echo.
echo [2/4] Creation repo GitHub (site + dashboard)...
gh repo create ecob-site --public --source=. --push

echo.
echo [3/4] Creation repo GitHub (API backend)...
cd /d "C:\Users\WORK\Documents\WPSDrive\backend"
git init
git add .
git commit -m "ECOB API - initial commit"
gh repo create ecob-api --public --source=. --push

echo.
echo [4/4] Instructions suivantes :
echo.
echo "SITE + DASHBOARD (GitHub Pages) :"
echo "  1. Allez sur https://github.com/VOTRE-USERNAME/ecob-site"
echo "  2. Settings > Pages > Source: 'GitHub Actions'"
echo "  3. Le workflow .github/workflows/deploy.yml deploie auto"
echo "  3. Site: https://USERNAME.github.io/ecob-site/"
echo "  4. Dashboard: https://USERNAME.github.io/ecob-site/dashboard.html"
echo.
echo "API BACKEND (Railway) :"
echo "  1. Allez sur https://railway.app"
echo "  2. New Project > Deploy from GitHub > ecob-api"
echo "  3. Variables: PORT=3002, FRONTEND_URL=https://USERNAME.github.io"
echo "  4. Railway donne: https://ecob-api.up.railway.app"
echo.
echo "MISE A JOUR DASHBOARD :"
echo "  Editez dashboard.html ligne ~1070 :"
echo "  const API_BASE = 'https://ecob-api.up.railway.app/api';"
echo "  Puis: git add . && git commit -m 'prod api' && git push"
echo.
pause