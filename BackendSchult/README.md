# BackendSchult

API Spring Boot (Java 17) pour la gestion RH (congés) et magasin (fournisseurs, matériaux, stocks, commandes, factures), avec sécurité JWT et MySQL.

## Prérequis
- Java 17, Maven 3.9+
- MySQL 8.x (base et utilisateur créés)
- Port par défaut: 8089

## Configuration
Crée/complète `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/schult?useSSL=false&serverTimezone=UTC
spring.datasource.username=your_user
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# JWT
app.jwt.secret=change-me
app.jwt.expiration-ms=3600000
```

## Lancement
- Dev: `mvn spring-boot:run`
- Build: `mvn clean package` puis `java -jar target/BackendSchult-0.0.1-SNAPSHOT.jar`
- Swagger UI (si activé): `http://localhost:8089/swagger-ui/index.html`

## Sécurité
- Authentification JWT (login/register).
- Roles: `ADMIN`, `RH`, `CHEF`, `EMPLOYE`.
- Exemples de règles:
  - `/admin/**`: `hasAnyRole('ADMIN','RH')`
  - `/conge/**`: `hasAnyRole('ADMIN','RH')`
  - Création de congé côté chef via endpoints/services dédiés.

## Domaines et Endpoints (principaux)

### Gestion des congés (Chef ↔ RH)
- Statuts: `EN_ATTENTE`, `VALIDEE`, `REFUSEE`.
- RH/ADMIN:
  - `GET /conge` → liste des demandes
  - `POST /conge/valider/{id}` → valider
  - `POST /conge/refuser/{id}` → refuser
  - `DELETE /conge/{id}` → supprimer
- Création côté Chef:
  - via service (ex: `UserService.creerDemandeConge(employeId, dateDebut, dateFin, motif)`).
  - optionnel: exposer un endpoint `POST /chef/demande` selon vos besoins.

### Gestion du magasin
- Fournisseur:
  - `GET /fournisseur/list`, `POST /fournisseur/ajouter`, `PUT /fournisseur/{id}`, `DELETE /fournisseur/{id}`
- Matériaux:
  - `GET /materials/list`, `POST /materials/ajouter`, `PUT /materials/{id}`, `DELETE /materials/{id}`
- Stocks:
  - `GET /stock`, `POST /stock/add`, `PUT /stock/{id}`, `DELETE /stock/{id}`
- Commandes:
  - `GET /commande`, `GET /commande/{id}`, `POST /commande/add`, `PUT /commande/{id}`, `DELETE /commande/{id}`
  - Création: envoyer `fournisseur` sous forme `{ "id": number }`
- Factures:
  - `GET /facture`, `GET /facture/{id}`, `POST /facture`, `PUT /facture/{id}`, `DELETE /facture/{id}`

### Admin / Utilisateurs / Stats / Avatar
- Users:
  - `GET /admin` → liste
  - `GET /admin/getUserById/{id}`
  - `POST /admin/addUser`
  - `PUT /admin/updateUser/{id}`
  - `DELETE /admin/deleteUser/{id}`
  - `PUT /admin/assignEmployeToChef?employeId=&chefId=`
- Stats Dashboard:
  - `GET /admin/stats` → `{ commandes, factures, utilisateurs, stocks, materiaux, fournisseurs }`
- Upload Avatar (réel, URL simulée):
  - `POST /admin/{id}/avatar` (multipart `file`)
  - Réponse: `{ "avatarUrl": "http://localhost:8089/uploads/<file>" }`
  - À remplacer par stockage réel (dossier `uploads` servi par Spring, S3, ...).

## Conseils
- 403 Forbidden: vérifier JWT/roles + règles `SecurityConfig`.
- CORS: `.cors()` et origins si front sur `4200`.
- Formats dates: ISO `yyyy-MM-dd` pour le front.

## Notes de renommage
- groupId: `tn.schult`, artifactId: `BackendSchult`, classe main: `tn.schult.BackendSchultApplication`.
- Refactor recommandé: packages en `tn.schult` (controllers, services, repositories, entities, DAO, config, aspects).
- Renommer le dossier physique (si ouvert par l'IDE, fermer l'application avant).

## Structure du Projet

```
BackendSchult/
├── src/main/java/tn/schult/BackendSchult/
│   ├── BackendSchultApplication.java
│   ├── Config/
│   │   ├── CorsConfig.java
│   │   ├── JwtAuthenticationFilter.java
│   │   ├── MailConfig.java
│   │   └── SecurityConfig.java
│   ├── controllers/
│   │   ├── AdminController.java
│   │   ├── ChefController.java
│   │   ├── CommandeController.java
│   │   ├── DemandeController.java
│   │   ├── FactureController.java
│   │   ├── FournisseurController.java
│   │   ├── LibreTranslateController.java
│   │   ├── MaterialsController.java
│   │   ├── RegistrationLoginController.java
│   │   └── StockController.java
│   ├── DAO/
│   │   ├── CommandeRepository.java
│   │   ├── FactureRepository.java
│   │   ├── FournisseurRepository.java
│   │   ├── IDemandeConge.java
│   │   ├── MaterialsRepository.java
│   │   └── StockRepository.java
│   ├── entities/
│   │   ├── Categorie.java
│   │   ├── Commande.java
│   │   ├── DemandeConge.java
│   │   ├── DemandeCongeDTO.java
│   │   ├── EmailRequest.java
│   │   ├── Facture.java
│   │   ├── Fournisseur.java
│   │   ├── Genre.java
│   │   ├── Materials.java
│   │   ├── Role.java
│   │   ├── StatusDemande.java
│   │   ├── Stock.java
│   │   └── User.java
│   ├── repositories/
│   │   └── UserRepo.java
│   └── services/
│       ├── CommandeFunctionality.java
│       ├── CommandeFunImpl.java
│       ├── CustomUserDetailsService.java
│       ├── DemandeCongeService.java
│       ├── EmailService.java
│       ├── FactureFunctionality.java
│       ├── FactureFunImpl.java
│       ├── FournisseurFunctionality.java
│       ├── FournisseurFunImpl.java
│       ├── IDemandeCongeService.java
│       ├── IUserService.java
│       ├── JwtUtil.java
│       ├── MaterialsFunctionality.java
│       ├── MaterialsFunImpl.java
│       ├── StockFunctionality.java
│       ├── StockFunImpl.java
│       └── UserService.java
└── pom.xml
```

## Dépendances Maven

Le projet utilise Spring Boot 3.x avec les dépendances suivantes :
- Spring Boot Starter Web
- Spring Boot Starter Data JPA
- Spring Boot Starter Security
- Spring Boot Starter Mail
- MySQL Connector
- JWT
- Validation 