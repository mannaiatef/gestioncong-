# Gestion Congé & Magasin

Système complet de gestion des ressources humaines (congés) et de gestion de magasin (fournisseurs, matériaux, stocks, commandes, factures) développé avec Spring Boot et Angular.

## 🏗️ Architecture

Ce projet est composé de deux parties principales :

- **BackendSchult** : API REST Spring Boot (Java 17) avec sécurité JWT
- **BackSchult** : Interface utilisateur Angular avec dashboard moderne

## 🚀 Fonctionnalités

### Gestion RH (Congés)
- Demande de congés par les employés
- Validation/refus par les RH et administrateurs
- Gestion des rôles (ADMIN, RH, CHEF, EMPLOYE)
- Workflow de validation hiérarchique

### Gestion Magasin
- **Fournisseurs** : CRUD complet avec export PDF
- **Matériaux** : Gestion du catalogue
- **Stocks** : Suivi des quantités
- **Commandes** : Gestion des achats
- **Factures** : Suivi financier

### Dashboard & Statistiques
- Tableaux de bord avec graphiques Chart.js
- Statistiques en temps réel
- Interface responsive et moderne

## 🛠️ Technologies

### Backend
- Java 17
- Spring Boot 3.x
- Spring Security + JWT
- MySQL 8.x
- Maven

### Frontend
- Angular 17
- PrimeNG (composants UI)
- Chart.js (graphiques)
- Bootstrap (responsive)

## 📋 Prérequis

- Java 17+
- Node.js 18+
- MySQL 8.x
- Maven 3.9+
- Angular CLI

## 🚀 Installation Rapide

### 1. Cloner le repository
```bash
git clone https://github.com/mannaiatef/gestioncong-.git
cd gestioncong-
```

### 2. Backend (Spring Boot)
```bash
cd BackendSchult
# Configurer application.properties
mvn spring-boot:run
```

### 3. Frontend (Angular)
```bash
cd BackSchult
npm install
ng serve
```

## 📖 Documentation

- [Documentation Backend](./BackendSchult/README.md)
- [Documentation Frontend](./BackSchult/README.md)

## 🔐 Sécurité

- Authentification JWT
- Gestion des rôles et permissions
- CORS configuré
- Validation des données

## 📱 Interface

- Dashboard moderne et responsive
- Tables avec tri et filtrage
- Formulaires de saisie intuitifs
- Graphiques et statistiques
- Export de données (PDF)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Atef Mannai** - [GitHub](https://github.com/mannaiatef)

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.

---

⭐ N'oubliez pas de donner une étoile au projet si vous le trouvez utile ! 