# ============================================
# DEPLOIEMENT ECOB - SITE + DASHBOARD + API
# ============================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  DEPLOIEMENT ECOB - SITE + DASHBOARD + API" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# 1. Site + Dashboard
Write-Host "[1/4] Initialisation Git (site + dashboard)..." -ForegroundColor Yellow
Set-Location "C:\Users\WORK\Documents\WPSDrive"
git init
git add .
git commit -m "ECOB site + dashboard - initial commit"

Write-Host ""
Write-Host "[2/4] Creation repo GitHub (site + dashboard)..." -ForegroundColor Yellow
gh repo create ecob-site --public --source=. --push

# 2. API Backend
Write-Host ""
Write-Host "[3/4] Creation repo GitHub (API backend)..." -ForegroundColor Yellow
Set-Location "C:\Users\WORK\Documents\WPSDrive\backend"
git init
git add .
git commit -m "ECOB API - initial commit"
gh repo create ecob-api --public --source=. --push

# 3. Instructions
Write-Host ""
Write-Host "[4/4] ETAPES SUIVANTES MANUELLES :" -ForegroundColor Green
Write-Host ""
Write-Host "SITE + DASHBOARD (GitHub Pages - GRATUIT) :" -ForegroundColor Cyan
Write-Host "  1. https://github.com/VOTRE-USERNAME/ecob-site" -ForegroundColor White
Write-Host "  2. Settings > Pages > Source: 'GitHub Actions'" -ForegroundColor White
Write-Host "  3. Workflow .github/workflows/deploy.yml deploy auto" -ForegroundColor White
Write-Host "  4. Site: https://USERNAME.github.io/ecob-site/" -ForegroundColor White
Write-Host "  5. Dashboard: https://USERNAME.github.io/ecob-site/dashboard.html" -ForegroundColor White
Write-Host ""
Write-Host "API BACKEND (Railway - 5$/mois apres trial) :" -ForegroundColor Cyan
Write-Host "  1. https://railway.app" -ForegroundColor White
Write-Host "  2. New Project > Deploy from GitHub > ecob-api" -ForegroundColor White
Write-Host "  3. Variables: PORT=3002, FRONTEND_URL=https://USERNAME.github.io" -ForegroundColor White
Write-Host "  4. Railway donne: https://ecob-api.up.railway.app" -ForegroundColor White
Write-Host ""
Write-Host "MISE A JOUR DASHBOARD POUR PRODUCTION :" -ForegroundColor Yellow
Write-Host "  Editez dashboard.html ligne ~1070 :" -ForegroundColor White
Write-Host "  const API_BASE = 'https://ecob-api.up.railway.app/api';" -ForegroundColor White
Write-Host "  Puis: git add . && git commit -m 'prod api' && git push" -ForegroundColor White
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  PRET ! Suivez les etapes ci-dessus." -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan