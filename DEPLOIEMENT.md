# ECOB - Site + Dashboard + API

## Structure
```
/ (racine)
├── index.html          # Site principal
├── dashboard.html      # Dashboard admin
├── *.png               # Images (logo, campus, hero, galerie, map, sino-logo)
├── .github/workflows/  # GitHub Pages deploy
└── backend/            # API Node.js (déployé séparément sur Railway)
    ├── src/
    │   ├── server.js
    │   ├── routes/
    │   ├── controllers/
    │   ├── models/
    │   └── middleware/
    ├── package.json
    └── railway.json
```

## Déploiement

### 1. Site + Dashboard → GitHub Pages (gratuit)

```bash
# Dans C:\Users\WORK\Documents\WPSDrive
git init
git add .
git commit -m "ECOB site + dashboard"
gh repo create ecob-site --public --source=. --push
```

Puis activez **GitHub Pages** :
- Settings → Pages → Source: **GitHub Actions**
- Le workflow `.github/workflows/deploy.yml` déploie automatiquement à chaque push

**URLs** :
- Site : `https://USERNAME.github.io/ecob-site/`
- Dashboard : `https://USERNAME.github.io/ecob-site/dashboard.html`

### 2. API Backend → Railway (5$/mois après trial)

```bash
# Dans C:\Users\WORK\Documents\WPSDrive\backend
git init
git add .
git commit -m "ECOB API"
gh repo create ecob-api --public --source=. --push
```

Sur **railway.app** :
1. New Project → Deploy from GitHub → `ecob-api`
2. Variables d'environnement :
   ```
   PORT=3002
   FRONTEND_URL=https://USERNAME.github.io
   ```
3. Railway donne : `https://ecob-api.up.railway.app`

### 3. Mettre à jour l'URL API dans le dashboard

Dans `dashboard.html`, ligne ~1070 :
```javascript
const API_BASE = 'https://ecob-api.up.railway.app/api';
```

Puis push :
```bash
git add dashboard.html
git commit -m "Update API URL for production"
git push
```

## URLs finales
| Composant | URL |
|-----------|-----|
| Site principal | `https://USERNAME.github.io/ecob-site/` |
| Dashboard | `https://USERNAME.github.io/ecob-site/dashboard.html` |
| API | `https://ecob-api.up.railway.app/api` |

## Commandes utiles
```bash
# Déployer site + dashboard
git add . && git commit -m "update" && git push

# Déployer API (depuis dossier backend)
cd backend && git add . && git commit -m "api update" && git push
```

## Note importante
- **GitHub Pages = statique uniquement** (HTML/CSS/JS)
- **Railway = Node.js backend** (API, base de données)
- Les deux sont gratuits au début (Railway offre $5/mois de crédit)