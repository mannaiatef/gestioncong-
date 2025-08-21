# Frontend (Angular)

UI d'administration (dashboard) pour RH, chefs, gestion magasin et statistiques.

## Prérequis
- Node 18+, npm 9+
- Angular CLI (recommandé): `npm i -g @angular/cli`

## Installation & Lancement

```bash
npm install
ng serve -o
```

## Configuration
- API par défaut: `http://localhost:8089`
- `angular.json` (styles):
  - `node_modules/primeicons/primeicons.css`
  - `node_modules/primeng/resources/themes/lara-light-blue/theme.css`
  - `node_modules/primeng/resources/primeng.min.css`
  - `node_modules/@fortawesome/fontawesome-free/css/all.min.css`
- Intercepteur HTTP: ajoute `Authorization: Bearer <token>` automatiquement.

## Fonctionnalités
- Dashboard:
  - Cards stats + Chart.js (bar, pie, line, radar) depuis `/admin/stats`.
- Gestion des congés:
  - `chef-list`: création de demande pour employés du chef.
  - `demande-conge`: table modernisée (badges, actions), RH/ADMIN: valider/refuser/supprimer.
- Gestion magasin:
  - Fournisseurs, Matériaux, Stocks, Commandes, Factures: listes + formulaires CRUD.
  - Tables modernisées (coins arrondis, header sticky-like, hover, icônes d'action rondes).
  - Export PDF (fournisseurs) via jsPDF & `jspdf-autotable`.
- Profil utilisateur:
  - Édition `username, email, firstName, lastName`.
  - Upload avatar: input fichier (affichage immédiat), envoi `POST /admin/{id}/avatar`.

## Routes (exemples)
- `/dashboard/home` → stats & graphiques
- `/dashboard/fournisseurs`, `/materials`, `/stock`, `/commandes`, `/factures`
- `/dashboard/demandes-conge` → RH/ADMIN
- `/dashboard/profile` → profil utilisateur

## Services (extraits)
- `dashboard.service.ts` → `/admin/stats`
- `commande.service.ts` → `/commande` (CRUD)
- `facture.service.ts` → `/facture` (CRUD)
- `fournisseur.service.ts` → `/fournisseur` (CRUD)
- `materials.service.ts` → `/materials` (CRUD)
- `stock.service.ts` → `/stock` (CRUD)
- `conge.service.ts` → `getAllDemandes`, `validerDemande`, `refuserDemande`, `supprimerDemande`, `creerDemande`
- `user-profile.service.ts` → `getUserProfile`, `updateProfile`, `uploadAvatar(file, userId)`

## UX & Styles
- Tables `.modern-table`, boutons `.icon-btn`, badges `.status-badge`.
- PrimeNG + PrimeIcons, Font Awesome.
- Chart.js natif pour graphiques (bar, pie, line, radar).

## Build

```bash
ng build
```

## Dépannage
- Icônes absentes: vérifier imports CSS (PrimeIcons/FontAwesome).
- 403 API: vérifier token/roles (front envoie bien le header `Authorization`).
- Graphiques vides: endpoint `/admin/stats` accessible, rôle correct.
- Upload avatar: `multipart/form-data`, champ `file`, endpoint `/admin/{id}/avatar`.

## Tests manuels (exemples)
- Congés: connecter CHEF → créer demande; connecter RH → valider/refuser.
- Magasin: CRUD fournisseurs/matériaux/stocks/commandes/factures.
- Dashboard: vérifier stats/graphs.
- Profil: modifier infos + avatar, persistance après refresh.

## Structure du Projet

```
BackSchult/
├── src/
│   ├── app/
│   │   ├── component/
│   │   │   ├── auth-animation/
│   │   │   ├── chef-list/
│   │   │   ├── commande-detail/
│   │   │   ├── commande-form/
│   │   │   ├── commande-list/
│   │   │   ├── dashboard/
│   │   │   ├── demande-conge/
│   │   │   ├── facture-form/
│   │   │   ├── facture-list/
│   │   │   ├── fournisseur-form/
│   │   │   ├── fournisseur-list/
│   │   │   ├── home/
│   │   │   ├── login/
│   │   │   ├── materials-form/
│   │   │   ├── materials-list/
│   │   │   ├── notification-dropdown/
│   │   │   ├── register/
│   │   │   ├── stock-form/
│   │   │   ├── stock-list/
│   │   │   ├── user-management/
│   │   │   └── user-profile/
│   │   ├── model/
│   │   │   ├── demande-conge.model.ts
│   │   │   └── user.model.ts
│   │   ├── service/
│   │   │   ├── api.service.ts
│   │   │   ├── auth.guard.ts
│   │   │   ├── auth.interceptor.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── chef-employees.service.ts
│   │   │   ├── commande.service.ts
│   │   │   ├── conge.service.ts
│   │   │   ├── dashboard.service.ts
│   │   │   ├── facture.service.ts
│   │   │   ├── fournisseur.service.ts
│   │   │   ├── materials.service.ts
│   │   │   ├── notification.service.ts
│   │   │   ├── stock.service.ts
│   │   │   ├── token-storage.service.ts
│   │   │   ├── user-management.service.ts
│   │   │   └── user-profile.service.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── assets/
│   │   └── images/
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
└── tsconfig.json
```

## Dépendances Principales

- **Angular**: 17.x
- **PrimeNG**: Composants UI
- **Chart.js**: Graphiques
- **Font Awesome**: Icônes
- **jsPDF**: Export PDF
- **Bootstrap**: Responsive design

## Configuration de l'Environnement

Le fichier `environment.ts` contient la configuration de l'API :

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8089'
};
```

## Authentification

- Intercepteur HTTP automatique pour les tokens JWT
- Guard de route pour protéger les pages
- Service d'authentification avec gestion des rôles
- Stockage sécurisé des tokens

## Responsive Design

- Interface adaptée mobile/tablette/desktop
- Navigation adaptative
- Tables avec scroll horizontal sur mobile
- Formulaires optimisés pour tous les écrans 