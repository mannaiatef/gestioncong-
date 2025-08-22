# Frontend (Angular)

UI d'administration (dashboard) pour RH, chefs, gestion magasin et statistiques.

## Prérequis
- Node 18+ (recommandé LTS). Vérifier: `node -v`
- npm 9+ (ou pnpm/yarn). Vérifier: `npm -v`
- Angular CLI: `npm i -g @angular/cli`

## Structure du dépôt
Le frontend se trouve dans le dossier `BackSchult/` à la racine du repo.

## Installation rapide

```bash
# Depuis la racine du repo
cd BackSchult

# Installe les dépendances (utilisez npm ci en CI)
npm install

# Optionnel: vérifiez que Angular CLI est installé
ng version
```

## Lancement en développement

```bash
# Toujours dans BackSchult/
ng serve -o --port 4200
```
- Application: `http://localhost:4200`
- API par défaut: `http://localhost:8089`

## Configuration de l'API
Ce projet utilise un fichier simple pour l'URL API:
- Fichier: `src/app/service/environment.ts`
- Exemple:
```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8089'
};
```
Modifiez `apiUrl` si votre backend écoute ailleurs.

### (Optionnel) Proxy Angular pour éviter CORS
Créez un fichier `proxy.conf.json` dans `BackSchult/`:
```json
{
  "/api": {
    "target": "http://localhost:8089",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```
Adaptez vos appels en `environment.apiUrl: '/api'` puis lancez:
```bash
ng serve -o --proxy-config proxy.conf.json
```

## Styles & Librairies UI
Le projet utilise PrimeNG, PrimeIcons, Font Awesome et Chart.js. Les styles sont déclarés dans `angular.json`:
- `node_modules/primeicons/primeicons.css`
- `node_modules/primeng/resources/themes/lara-light-blue/theme.css`
- `node_modules/primeng/resources/primeng.min.css`
- `node_modules/@fortawesome/fontawesome-free/css/all.min.css`

## Scripts utiles (package.json)
- `ng serve -o` → démarre le serveur dev
- `ng build` → build production dans `dist/`

## Build production

```bash
# Depuis BackSchult/
ng build --configuration production
# Sortie: dist/ (dossier d'artefacts à déployer)
```

## Authentification côté front
- Intercepteur HTTP: ajoute automatiquement `Authorization: Bearer <token>`
- Guard de route: protège les pages selon les rôles
- Stockage token: localStorage (service `token-storage`)

## Fonctionnalités principales
- Dashboard (stats + Chart.js) via `/admin/stats`
- Gestion des congés: création/validation/refus/suppression (selon rôle)
- Gestion magasin: Fournisseurs, Matériaux, Stocks, Commandes, Factures (CRUD)
- Profil utilisateur: modification des infos + upload avatar (`POST /admin/{id}/avatar`)

## Routes (exemples)
- `/dashboard/home` → stats & graphiques
- `/dashboard/fournisseurs`, `/materials`, `/stock`, `/commandes`, `/factures`
- `/dashboard/demandes-conge` → RH/ADMIN
- `/dashboard/profile` → profil utilisateur

## Dépendances principales
- Angular 17.x
- PrimeNG / PrimeIcons
- Chart.js
- Font Awesome
- jsPDF (export PDF)
- Bootstrap

## Dépannage (FAQ)
- Icônes manquantes: vérifiez les imports dans `angular.json` (PrimeIcons/FontAwesome)
- 403/401 API: assurez-vous d'être connecté et de posséder le rôle requis; le header `Authorization` doit être présent
- CORS en dev: utilisez le `proxy.conf.json` ou autorisez CORS côté backend
- `npm install` échoue: supprimez `node_modules` + `package-lock.json`, puis `npm install` (ou `npm ci`)
- Graphiques vides: vérifiez que `/admin/stats` renvoie des données et que le rôle les autorise
- Upload avatar: envoyez `multipart/form-data` avec le champ `file` vers `/admin/{id}/avatar`

## Tests manuels rapides
- Congés: CHEF → créer demande; RH → valider/refuser
- Magasin: CRUD fournisseurs/matériaux/stocks/commandes/factures
- Dashboard: vérifier stats/graphiques
- Profil: modifier infos + avatar; rafraîchir pour vérifier la persistance

## Structure (rappel)
```
BackSchult/
├── src/
│   ├── app/
│   │   ├── component/
│   │   ├── model/
│   │   └── service/
│   ├── assets/
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
└── tsconfig.json
``` 